// let ws = new WebSocket("ws://localhost:3000");

// ws.onopen = () => {
//   console.log("[A worker] websocket open connection");
// };
// ws.onclose = () => {
//   console.log("[A worker] websocket close connection");
// };

// ws.onmessage = (event) => {
//   console.log("[A worker] Receive from websocket:", event.data);
// };

postMessage("I'm audio working before postMessage('audio').");

onmessage = function (oEvent) {
  postMessage("Hi " + oEvent.data);
};
