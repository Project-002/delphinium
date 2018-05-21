const Event = require('../structures/Event');

class RESUME extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:RESUME', enabled: true, lava: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.guild);
		await queue.player.pause(false);
		ack();
	}
}

module.exports = RESUME;
