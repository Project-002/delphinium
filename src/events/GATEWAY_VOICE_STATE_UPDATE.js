const Event = require('../structures/Event');

class GATEWAY_VOICE_STATE_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'discord:VOICE_STATE_UPDATE', enabled: true, gateway: true });
	}

	async run(packet, { ack }) {
		const queue = this.client.lavalink.queues.get(packet.d.guild_id);
		await queue.player.join(packet.d.channel_id);
		queue.player.on('event', d => console.log(d));
		queue.player.on('error', console.error);
		const players = await this.client.cache.storage.get('players', { type: 'arr' });
		let index;
		if (Array.isArray(players)) index = players.findIndex(player => player.guild_id === packet.d.guild_id);
		if (((!players && !index) || index < 0) && packet.d.channel_id) {
			await this.client.cache.storage.upsert('players', [{ guild_id: packet.d.guild_id, channel_id: packet.d.channel_id }]);
		} else if (players && typeof index !== 'undefined' && index >= 0 && !packet.d.channel_id) {
			players.splice(index, 1);
			if (players.length === 0) await this.client.cache.storage.delete('players');
			else await this.client.cache.storage.set('players', players);
			queue.player.removeAllListeners();
		}
		ack();
	}
}

module.exports = GATEWAY_VOICE_STATE_UPDATE;
