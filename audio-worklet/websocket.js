let ws = new WebSocket("ws://localhost:3000");
// ws.binaryType = "arraybuffer";

ws.onopen = () => {
  console.log("open connection");
};

ws.onclose = () => {
  console.log("close connection");
};

ws.onmessage = (event) => {
  if (event.data instanceof Blob) {
    const reader = new FileReader();
    reader.addEventListener("loadend", async function () {
      const msg = new Uint8Array(reader.result);
      let result = "";
      for (const v of msg) {
        result = result + String.fromCharCode(v);
      }
      //   console.log(msg);
      //   console.log(result);

      result = JSON.parse(result);
      let unitArray = [];
      Object.values(result.data).forEach((value) => {
        unitArray.push(value);
      });

      const typedArray = new Uint8Array(unitArray);
      playAudio(typedArray);
    });
    reader.readAsArrayBuffer(event.data);
  } else {
    console.log(event.data);
  }
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let nextStartTime = 0;

function playAudio(typedArray) {
  if (!nextStartTime) {
    // we've not yet started the queue - just queue this up,
    // leaving a "latency gap" so we're not desperately trying
    // to keep up.  Note if the network is slow, this is going
    // to fail.  Latency gap here is 1 second.
    nextStartTime = audioContext.currentTime + 1;
  }

  const source = audioCtx.createBufferSource();
  const audioData = withWaveHeader(typedArray.buffer, 1, audioCtx.sampleRate);

  audioCtx.decodeAudioData(
    audioData,
    function (buffer) {
      //   console.log("buffer", buffer);

      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(nextStartTime);
      nextStartTime += buffer.duration;
    },
    function (e) {
      console.log("Error with decoding audio data" + e);
    }
  );
}
