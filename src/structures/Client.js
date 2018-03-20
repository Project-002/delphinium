const { Client } = require('@spectacles/gateway');
const { Amqp } = require('@spectacles/brokers');
const { Client: Cache } = require('@spectacles/cache');
const { readdirSync } = require('fs');
const { extname, join } = require('path');
const { LavaLink } = require('voice');

/**
 * The Delphinium client.
 * @extends {@spectacles/gateway.Client}
 */
class Delphinium extends Client {
	/**
	 * Options passed to Delphinium when creating a new instance
	 * @typedef {Object} DelphiniumOptions
	 * @prop {string} [token] The token
	 * @prop {string} [eventPath] The event path
	 * @prop {boolean} [cache=null] If caching should be enabled
	 * @prop {boolean} [voice=null] If voice support should be enabled
	 */

	/**
	 * Creates an instance of Delphinium.
	 * @param {DelphiniumOptions} [options={}] The client options
	 * @memberof Delphinium
	 */
	constructor(options = {}) {
		super(options.token, options);

		/**
		 * If the Delphinium instance is ready
		 * @type {boolean}
		 * @default fales
		 */
		this.ready = false;

		/**
		 * The event path where event files are located
		 * @type {string}
		 */
		this.eventPath = options.eventPath;

		/**
		 * The consumer for this client
		 * @type {Amqp}
		 */
		this.consumer = new Amqp('consumer');

		/**
		 * The publisher for this client
		 * @type {Amqp}
		 */
		this.publisher = new Amqp('publisher');

		/**
		 * The RPC client for this client
		 * @type {Amqp}
		 */
		this.rpc = new Amqp('rpc', { rpc: true });

		/**
		 * If caching is enabled
		 * @type {boolean}
		 */
		this.enableCache = Boolean(options.cache);

		if (this.enableCache) {
			/**
			 * The Redis cache instance of thsi client
			 * @type {?Redis}
			 */
			this.cache = new Cache({
				port: 6379,
				host: process.env.REDIS,
				db: 0
			});
		}

		/**
		 * If voice is enabled
		 * @type {boolean}
		 */
		this.enableVoice = Boolean(options.voice);

		if (this.enableVoice) {
			/**
			 * The LavaLink instance for this client
			 * @type {?LavaLink}
			 */
			this.lavalink = new LavaLink(this);
			this.lavalink.createNode({
				gateway: process.env.GATEWAY,
				shards: process.env.SHARDS,
				user: process.env.USER,
				password: process.env.PASSWORD,
				host: process.env.HOST
			});

			/**
			 * A map of voice sessions
			 * @type {Map<>}
			 */
			this.voiceSessions = new Map();
		}

		/**
		 * A map of all unavailable guilds at READY
		 * @type {Map<string, Object>}
		 */
		this.unavailableGuilds = new Map();
		this.once('READY', packet => this._ready(packet));
	}

	/**
	 * Handles the READY event.
	 * @param {Object} packet The ready packet
	 * @private
	 * @memberof Delphinium
	 */
	_ready(packet) {
		packet.guilds.forEach(guild => {
			if (guild.unavailable) this.unavailableGuilds.set(guild.id, guild);
			else this.unavailableGuilds.delete(guild.id);
		});

		this.ready = true;
		this.emitReady();
	}

	/**
	 * Emits the ready event for this client.
	 * @private
	 * @memberof Delphinium
	 */
	emitReady() {
		const files = readdirSync(this.eventPath);
		for (let event of files) {
			if (extname(event) !== '.js') continue;
			event = require(join(this.eventPath, event));
			if (typeof event === 'function') event = new event(this);
			if (
				event.enabled && !event.rpc && !(event.gateway || event.lava)
			) this.on(event.name, event._run.bind(event));
			if (
				event.enabled && !event.rpc && (event.gateway || event.lava)
			) this.publisher.on(event.name, event._run.bind(event));
			if (
				event.enabled && event.rpc && !(event.gateway || event.lava)
			) this.rpc.on(event.name, event._run.bind(event));
		}
	}

	/**
	 * Connects to the message broker.
	 * @param {string} [url='localhost'] The URL of the message broker
	 * @param {Array<string>} events Array of events
	 * @param {Array<string>} rpcEvents Array of RPC events
	 * @memberof Delphinium
	 */
	async login(url = 'localhost', events, rpcEvents) {
		try {
			const connection = await this.consumer.connect(url);
			await this.publisher.connect(connection);
			await this.rpc.connect(connection);

			await this.publisher.subscribe(events);
			await this.rpc.subscribe(rpcEvents);

			await this.spawn();
		} catch (error) {
			/**
			 * Emmited when Delphinium encounters an error
			 * @event Delphinium#error
			 * @param {Event|Error|TypeError|RangeError} errorOrInstance The received error or the instance where the error occured
			 * @param {?Array<*>} args The received args, if any
			 * @prop {?Error|TypeError|RangeError} error The error received
			 */
			this.emit('error', error);
		}
	}
}

module.exports = Delphinium;
