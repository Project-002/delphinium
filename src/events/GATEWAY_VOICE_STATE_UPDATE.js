const Event = require('../structures/Event');

class GATEWAY_VOICE_STATE_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'discord:VOICE_STATE_UPDATE', enabled: true, gateway: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.d.guild_id);
		await queue.player.join(packet.d.channel_id);
		queue.player.on('event', d => console.log(d));
		ack();
	}
}

module.exports = GATEWAY_VOICE_STATE_UPDATE;
