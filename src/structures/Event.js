class Event {
	constructor(client, options = {}) {
		this.client = client;
		this.name = options.name;
		this.enabled = Boolean(options.enabled);
		this.gateway = Boolean(options.gateway);
		this.lava = Boolean(options.lava);
		this.rpc = Boolean(options.rpc);
	}

	async _run(...args) {
		if (this.enabled) {
			try {
				await this.run(...args);
			} catch (error) {
				this.client.emit('error', this, args, error);
			}
		}
	}

	run(...args) {} // eslint-disable-line no-unused-vars
}

module.exports = Event;
