const Event = require('../structures/Event');

class GATEWAY_VOICE_STATE_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'discord:VOICE_STATE_UPDATE', enabled: true, gateway: true });
	}

	run(packet, { ack }) {
		if (packet.d.channel_id) {
			this.client.lavalink.join({
				shard: packet.shard,
				op: packet.op,
				d: packet.d,
				host: process.env.HOST
			});
		} else {
			this.client.lavalink.leave({
				shard: packet.shard,
				op: packet.op,
				d: packet.d
			});
		}
		ack();
	}
}

module.exports = GATEWAY_VOICE_STATE_UPDATE;
