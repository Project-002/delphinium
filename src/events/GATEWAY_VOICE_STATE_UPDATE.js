const Event = require('../structures/Event');

class GATEWAY_VOICE_STATE_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'discord:VOICE_STATE_UPDATE', enabled: true, gateway: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.d.guild_id);
		await queue.player.join(packet.d.channel_id);
		if (packet.d.channel_id) {
			await this.client.cache.storage.upsert('players', [{ guild_id: packet.d.guild_id, channel_id: packet.d.channel_id }]);
		} else {
			const players = await this.client.cache.storage.get('players', { type: 'arr' });
			const index = players.findIndex(player => player.guild_id === packet.d.guild_id);
			console.log(players);
			players.splice(index, 1);
			if (players.length === 0) await this.client.cache.storage.delete('players');
			else await this.client.cache.storage.set('players', players);
		}
		queue.player.on('event', d => console.log(d));
		ack();
	}
}

module.exports = GATEWAY_VOICE_STATE_UPDATE;
