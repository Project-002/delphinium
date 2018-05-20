const Event = require('../structures/Event');

class GUILD_MEMBERS_CHUNK extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_MEMBERS_CHUNK', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.members.upsert(message);
		await this.client.consumer.publish('discord:GUILD_MEMBERS_CHUNK', message, { expiration: '60000' });
	}
}

module.exports = GUILD_MEMBERS_CHUNK;
