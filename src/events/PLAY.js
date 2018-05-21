const Event = require('../structures/Event');

class PLAY extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:PLAY', enabled: true, lava: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.guild);
		await queue.add([packet.track]);
		await queue.start();
		ack();
	}
}

module.exports = PLAY;
