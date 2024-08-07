const port = 8080;
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port });
const websocketStream = require('websocket-stream');

wss.on('connection', function (ws, req) {
    const clientIP = req.connection.remoteAddress; // Get client's IP address

    // Get current time in GMT+5:30
    const currentTime = new Date();
    const offset = 5.5 * 60; // Offset in minutes (5 hours and 30 minutes)
    currentTime.setMinutes(currentTime.getMinutes() + offset);

    console.log('Client connected from IP:', clientIP);
    console.log('Current time (GMT+5:30):', currentTime.toISOString());

    ws.on('message', function (message) {
        console.log('Received from client: %s', message);
        ws.send('Server received from client: ' + message);
    });
});

console.log("WebSocket Server started on port " + port);
