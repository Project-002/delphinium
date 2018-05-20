const Event = require('../structures/Event');

class VOICE_SERVER_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'VOICE_SERVER_UPDATE', enabled: true });
	}

	async run(message) {
		await this.client.consumer.publish('discord:VOICE_SERVER_UPDATE', message, { expiration: '60000' });
		if (this.client.enableVoice) {
			this.client.lavalink.players.get(message.guild_id).on('error', console.error);
			this.client.lavalink.players.get(message.guild_id).on('end', async packet => {
				await this.client.consumer.publish('lavalink:END', packet, { expiration: '60000' });
			});
		}
	}
}

module.exports = VOICE_SERVER_UPDATE;
