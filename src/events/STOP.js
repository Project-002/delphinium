const Event = require('../structures/Event');

class STOP extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:STOP', enabled: true, lava: true });
	}

	run(packet, { ack }) {
		const player = this.client.lavalink.players.get(packet.guild);
		if (!player) {
			ack();
			return;
		}
		player.stop();
		ack();
	}
}

module.exports = STOP;
