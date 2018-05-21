const Event = require('../structures/Event');

class VOICE_SERVER_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'VOICE_SERVER_UPDATE', enabled: true });
	}

	async run(shard, message) {
		await this.client.consumer.publish('discord:VOICE_SERVER_UPDATE', message, { expiration: '60000' });
		if (this.client.enableVoice) {
			this.client.lavalink.voiceServerUpdate(message);
		}
	}
}

module.exports = VOICE_SERVER_UPDATE;
