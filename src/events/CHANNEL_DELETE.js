const Event = require('../structures/Event');

class CHANNEL_DELETE extends Event {
	constructor(...args) {
		super(...args, { name: 'CHANNEL_DELETE', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.channels.delete(message);
		await this.client.consumer.publish('discord:CHANNEL_DELETE', message, { expiration: '60000' });
	}
}

module.exports = CHANNEL_DELETE;
