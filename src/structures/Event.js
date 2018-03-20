/**
 * An event that will be processed by the {@link Delphinium} instance.
 */
class Event {
	/**
	 * Options that are passed when creating a new event
	 * @typedef {object} EventOptions
	 * @prop {string} [name] The event name
	 * @prop {boolean} [enabled=null] If the event should be enabled
	 * @prop {boolean} [gateway=null] If this event is a gateway event
	 * @prop {boolean} [lava=null] If this event is a LavaPlayer event
	 * @prop {boolean} [rpc=null] If this event is an RPc event
	 */

	/**
	 * Creates an instance of Event.
	 * @param {Delphinium} client The client
	 * @param {EventOptions} [options={}] The event options
	 * @memberof Event
	 */
	constructor(client, options = {}) {
		/**
		 * The client instance
		 * @type {Delphinium}
		 */
		this.client = client;

		/**
		 * The event name
		 * @type {string}
		 */
		this.name = options.name;

		/**
		 * If this event is enabled
		 * @type {boolean}
		 * @default false
		 */
		this.enabled = Boolean(options.enabled);

		/**
		 * If this event is a gateway event
		 * @type {boolean}
		 * @default false
		 */
		this.gateway = Boolean(options.gateway);

		/**
		 * If this event is a LavaPlayer event
		 * @type {boolean}
		 * @default false
		 */
		this.lava = Boolean(options.lava);

		/**
		 * If this event is a RPC event
		 * @type {boolean}
		 * @default false
		 */
		this.rpc = Boolean(options.rpc);
	}

	/**
	 * Runs the event if it is enabled.
	 * @param {Array<*>} args The arguments received
	 * @private
	 * @memberof Event
	 */
	async _run(...args) {
		if (this.enabled) {
			try {
				await this.run(...args);
			} catch (error) {
				/**
				 * Emmited when there was an error
				 * @event Delphinium#error
				 * @param {?(Error|TypeError|RangeError)} error The error received
				 */
				this.client.emit('error', error);
			}
		}
	}

	/**
	 * Function that takes the event input and processes it.
	 * @param {Array<*>} args The raw arguments received
	 * @abstract
	 * @memberof Event
	 */
	run(...args) {} // eslint-disable-line no-unused-vars
}

module.exports = Event;
