const Event = require('../structures/Event');

class RESUME extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:RESUME', enabled: true, lava: true });
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

module.exports = RESUME;
