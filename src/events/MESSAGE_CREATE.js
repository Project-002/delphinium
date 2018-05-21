const Event = require('../structures/Event');

class MESSAGE_CREATE extends Event {
	constructor(...args) {
		super(...args, { name: 'MESSAGE_CREATE', enabled: true });
	}

	async run(shard, message) {
		await this.client.consumer.publish('discord:MESSAGE_CREATE', message, { expiration: '60000' });
	}
}

module.exports = MESSAGE_CREATE;
