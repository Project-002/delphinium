const Event = require('../structures/Event');

class USER_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'USER_UPDATE', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.users.upsert(message);
		await this.client.consumer.publish('discord:USER_UPDATE', message, { expiration: '60000' });
	}
}

module.exports = USER_UPDATE;
