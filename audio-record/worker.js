import Module from "./simple-kernel.wasmmodule.js";
console.log(Module);

let ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => {
  console.log("[A worker] websocket open connection");
};
ws.onclose = () => {
  console.log("[A worker] websocket close connection");
};

ws.onmessage = (event) => {
  //   console.log(event);
  postMessage(event.data);
};

onmessage = function (oEvent) {
  const blob = oEvent.data;
  console.log(blob);

  //   ws.send(oEvent.data);
};
