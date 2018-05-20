const Event = require('../structures/Event');

class PROCESS extends Event {
	constructor(...args) {
		super(...args, { name: 'stats:PROCESS', enabled: true, rpc: true });
	}

	run(packet, { ack, reply }) {
		const heap = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
		ack();
		reply({ heap });
	}
}

module.exports = PROCESS;
