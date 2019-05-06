/*
 WebSocket test-code for client(Moddable/ECMAScript)
*/

import { Client } from 'websocket'
import WiFi from "wifi"
import Net from "net"
import Servo from "pins/servo";
import Timer from "timer";

const host = '' // IP address
const port = 5040 // Port number

new WiFi({ ssid: "", password: "" }, msg => {
  switch (msg) {
    case "connect":
      trace('Connected wifi\n')
      break; // still waiting for IP address
    case "gotIP":
      trace(`IP address ${Net.get("IP")}\n`);
      wsFunc();
      break;
    case "disconnect":
      trace(`try reconnect WiFi\n`)
      break;  // connection lost
  }
});

const wsFunc = () => {
  let ws = new Client({ host, port })
  ws.callback = function (message, value) {
    switch (message) {
      case 1:
        trace("Client: socket connect.\n")
        break
      case 2:
        trace("Client: websocket handshake success\n")
        break
      case 3:
        if (JSON.parse(value).message === "servo") {
          let servo = new Servo({ pin: 12 });
          servo.write(25);
          Timer.set(() => {
            servo.write(0)
          }, 1000);

          trace(`${value}\n`);
          ws.write(JSON.stringify({ "result": "succeed" }));
        }
        break
      case 4:
        trace("WebSocket close\n")
        break
    }
  }
  trace(`socket created.\n`)
};