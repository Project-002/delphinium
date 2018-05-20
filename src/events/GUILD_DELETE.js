const Event = require('../structures/Event');

class GUILD_DELETE extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_DELETE', enabled: true });
	}

	async run(message) {
		if (this.client.ready) {
			if (message.unavailable) {
				// LUL DO NOTHING
				// JK DO SOMETHING
				this.client.unavailableGuilds.set(message.id);
			} else {
				if (this.client.enableCache) await this.client.cache.actions.guilds.delete(message);
				await this.client.consumer.publish('discord:GUILD_DELETE', message, { expiration: '60000' });
			}
		}
	}
}

module.exports = GUILD_DELETE;
