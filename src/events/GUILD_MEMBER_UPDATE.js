const Event = require('../structures/Event');

class GUILD_MEMBER_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_MEMBER_UPDATE', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.members.upsert(message);
		await this.client.consumer.publish('discord:GUILD_MEMBER_UPDATE', message, { expiration: '60000' });
	}
}

module.exports = GUILD_MEMBER_UPDATE;
