const Event = require('../structures/Event');

class GUILD_BAN_ADD extends Event {
	constructor(...args) {
		super(...args, { name: 'GUILD_BAN_ADD', enabled: true });
	}

	async run(message) {
		await this.client.consumer.publish('discord:GUILD_BAN_ADD', message, { expiration: '60000' });
	}
}

module.exports = GUILD_BAN_ADD;
