const Event = require('../structures/Event');

class GUILD_ROLE_CREATE extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_ROLE_CREATE', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.roles.upsert(message);
		await this.client.consumer.publish('discord:GUILD_ROLE_CREATE', message, { expiration: '60000' });
	}
}

module.exports = GUILD_ROLE_CREATE;
