const Event = require('../structures/Event');

class GUILD_ROLE_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_ROLE_UPDATE', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.roles.upsert(message);
		await this.client.consumer.publish('discord:GUILD_ROLE_UPDATE', message, { expiration: '60000' });
	}
}

module.exports = GUILD_ROLE_UPDATE;
