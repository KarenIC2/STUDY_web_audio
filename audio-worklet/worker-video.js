// let ws = new WebSocket("ws://localhost:3000");

// ws.onopen = () => {
//   console.log("[V worker] websocket open connection");

//   setTimeout(function name(params) {
//       ws.send('Hello!');
//   }, 5000);
// };
// ws.onclose = () => {
//   console.log("[V worker] websocket close connection");
// };

// ws.onmessage = (event) => {
//   console.log("[V worker] Receive from websocket:", event.data);
// };

postMessage("I'm video working before postMessage('video').");

onmessage = function (oEvent) {
  postMessage("Hi " + oEvent.data);
};
