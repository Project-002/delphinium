const Event = require('../structures/Event');

class PAUSE extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:PAUSE', enabled: true, lava: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.guild);
		await queue.player.pause();
		ack();
	}
}

module.exports = PAUSE;
