const Event = require('../structures/Event');

class GUILD_BAN_REMOVE extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_BAN_REMOVE', enabled: true });
	}

	async run(message) {
		await this.client.consumer.publish('discord:GUILD_BAN_REMOVE', message, { expiration: '60000' });
	}
}

module.exports = GUILD_BAN_REMOVE;
