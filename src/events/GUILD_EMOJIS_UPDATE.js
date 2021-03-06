const Event = require('../structures/Event');

class GUILD_EMOJIS_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_EMOJIS_UPDATE', enabled: true });
	}

	async run(message) {
		if (this.client.enableCache) await this.client.cache.actions.emojis.upsert(message);
		await this.client.consumer.publish('discord:GUILD_EMOJIS_UPDATE', message, { expiration: '60000' });
	}
}

module.exports = GUILD_EMOJIS_UPDATE;
