const WsServer = require('ws').Server

/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require("express");
const app = express();

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
const server = app.listen(3000, () => {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

// webSocket open
const webskt = new WsServer({ port: 5040 })

// event websocket connete
webskt.on('connection', (ws) => {
    console.log('Websocket: Connected');
    app.post("/", (req, res, next) => {
        console.log("postReceive");
        webskt.clients.forEach((client) => {
            client.send(JSON.stringify({ "from": "server", "message": "servo" }));
            res.json(JSON.stringify({ "result": "succeed" }));
        });
    });

    // event close
    ws.on('close', () => {
        console.log('I lost a client')
    })
})
console.log('Websocket server is running')