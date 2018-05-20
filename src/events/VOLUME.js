const Event = require('../structures/Event');

class VOLUME extends Event {
	constructor(...args) {
		super(...args, { name: 'lavalink:VOLUME', enabled: true, lava: true });
	}

	run(packet, { ack }) {
		const player = this.client.lavalink.players.get(packet.guild);
		if (!player) {
			ack();
			return;
		}
		player.volume(packet.volume);
		ack();
	}
}

module.exports = VOLUME;
