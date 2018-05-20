const Event = require('../structures/Event');

class CHANNEL_PINS_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'CHANNEL_PINS_UPDATE', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.channels.upsert(message);
		await this.client.consumer.publish('discord:CHANNEL_PINS_UPDATE', message, { expiration: '60000' });
	}
}

module.exports = CHANNEL_PINS_UPDATE;
