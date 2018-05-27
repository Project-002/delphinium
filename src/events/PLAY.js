const Event = require('../structures/Event');

class PLAY extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:PLAY', enabled: true, lava: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.guild);
		await queue.add(...packet.tracks.map(p => p.track));
		if (!queue.player.playing && !queue.player.paused) await queue.start();
		ack();
	}
}

module.exports = PLAY;
