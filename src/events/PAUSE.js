const Event = require('../structures/Event');

class PAUSE extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:PAUSE', enabled: true, lava: true });
	}

	run(packet, { ack }) {
		const player = this.client.lavalink.players.get(packet.guild);
		if (!player) {
			ack();
			return;
		}
		player.pause(packet.pause);
		ack();
	}
}

module.exports = PAUSE;
