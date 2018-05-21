const Event = require('../structures/Event');

class SKIP extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:SKIP', enabled: true, lava: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.guild);
		await queue.next();
		ack();
	}
}

module.exports = SKIP;
