const http = require('http');
const WebSocket = require('ws');
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    // Gestisci eventuali richieste HTTP
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Gestisci i messaggi in arrivo da un client
    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            console.log('Messaggio decodificato:', parsedMessage);

            // Invia il messaggio a tutti i client connessi
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        } catch (error) {
            console.error('Errore durante la decodifica del messaggio JSON:', error);
        }
    });
});

server.listen(port, () => {
    console.log('Server listening on port 3000');
});
