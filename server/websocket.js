const ws = require('ws')

const wss = new ws.Server({
	port: 5000,
}, () => console.log('Websocket server started on 5000 PORT'))

wss.on('connection', function connection(ws) {
	ws.on('message', function (message) {
		message = JSON.parse(message)
		switch (message.event) {
			case ('message'):
				broadcastMessage(message, ws.roomId)
				break;
			case ('connection'):
				ws.roomId = message.roomId
				broadcastMessage(message, ws.roomId)
				break;
		}
	})
})

function broadcastMessage(message, roomId) {
	wss.clients.forEach(client => {
		if (client.roomId === roomId) {
			client.send(JSON.stringify(message))
		}
	})
}