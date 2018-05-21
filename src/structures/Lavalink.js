const { Client: Lavaqueue } = require('lavaqueue');
const idToBinary = require('../util/idToBinary');

class Lavalink extends Lavaqueue {
	constructor(options = {}) {
		super({
			userID: options.user,
			password: options.password,
			hosts: {
				rest: options.rest,
				ws: options.ws,
				redis: options.redis
			}
		});

		Object.defineProperty(this, 'client', { value: options.client });
	}

	send(guildID, packet) {
		const shard = parseInt(idToBinary(guildID).slice(0, -22), 2) % this.client.shards;
		this.client.connections.get(shard).send(packet);
	}
}

module.exports = Lavalink;
