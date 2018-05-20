const Event = require('../structures/Event');

class GUILD_CREATE extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_CREATE', enabled: true });
	}

	async run(message) {
		if (this.client.ready) {
			if (this.client.unavailableGuilds.delete(message.id)) {
				// LUL DO NOTHING
				// JK DO SOMETHING
				if (this.client.enableCache) await this.client.cache.actions.guilds.upsert(message);
			} else {
				if (this.client.enableCache) await this.client.cache.actions.guilds.upsert(message);
				await this.client.consumer.publish('discord:GUILD_CREATE', message, { expiration: '60000' });
			}
		}
	}
}

module.exports = GUILD_CREATE;
