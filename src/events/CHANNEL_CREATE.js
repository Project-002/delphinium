const Event = require('../structures/Event');

class CHANNEL_CREATE extends Event {
	constructor(...args) {
		super(...args, { name: 'CHANNEL_CREATE', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.channels.upsert(message);
		await this.client.consumer.publish('discord:CHANNEL_CREATE', message, { expiration: '60000' });
	}
}

module.exports = CHANNEL_CREATE;
