const Event = require('../structures/Event');

class PLAY extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:PLAY', enabled: true, lava: true });
	}

	run(packet, { ack }) {
		const player = this.client.lavalink.players.get(packet.guild);
		if (!player) {
			ack();
			return;
		}
		player.play(packet.track, packet.options);
		ack();
	}
}

module.exports = PLAY;
