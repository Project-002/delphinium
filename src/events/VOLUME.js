const Event = require('../structures/Event');

class VOLUME extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:VOLUME', enabled: true, lava: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.guild);
		await queue.player.setVolume(packet.volume);
		ack();
	}
}

module.exports = VOLUME;
