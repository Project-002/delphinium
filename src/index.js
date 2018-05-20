require('dotenv').config();
const Delphinium = require('./structures/Client');
const { join } = require('path');

process.on('unhandledRejection', console.error);

const client = new Delphinium({
	token: process.env.DISCORD_TOKEN,
	eventPath: join(__dirname, 'events'),
	cache: true,
	voice: true
});

client.on('error', console.error);

client.login(process.env.RABBITMQ,
	[
		'discord:VOICE_STATE_UPDATE',
		'lavalink:PLAY',
		'lavalink:VOLUME',
		'lavalink:PAUSE',
		'lavalink:RESUME',
		'lavalink:STOP',
		'lavalink:SKIP'
	],
	['stats:PROCESS']);

// Only for debugging purposes
global.delphinium = client;
