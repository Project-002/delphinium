const Event = require('../structures/Event');

class VOICE_STATE_UPDATE extends Event {
	constructor(...args) {
		super(...args, { name: 'VOICE_STATE_UPDATE', enabled: true });
	}

	async run(message) {
		if (this.client.enableVoice) this.client.voiceSessions.set(message.guild_id, message.session_id);
		if (this.client.enableCache) await this.client.cache.actions.voiceStates.upsert(message);
		await this.client.consumer.publish('discord:VOICE_STATE_UPDATE', message, { expiration: '60000' });
	}
}

module.exports = VOICE_STATE_UPDATE;
