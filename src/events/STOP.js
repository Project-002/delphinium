const Event = require('../structures/Event');

class STOP extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:STOP', enabled: true, lava: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.guild);
		await queue.stop();
		ack();
	}
}

module.exports = STOP;
