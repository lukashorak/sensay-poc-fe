<svelte:options accessors/>
<script>
  import { createEventDispatcher, onMount } from "svelte";

  import { lastRecording } from "../../utilities/DataStore";

  let recordings = [];
  let recordAudio = [];
  let recordCount = 0;

  export let audioControlDuration;

  const workerOptions = {
    OggOpusEncoderWasmPath:
      "https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OggOpusEncoder.wasm",
    WebMOpusEncoderWasmPath:
      "https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/WebMOpusEncoder.wasm",
  };

  window.MediaRecorder = OpusMediaRecorder;
  let recorder;

  // shim for AudioContext when it's not avb.
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioContext; //audio context to help us record

  let lastFilename;
  let lastBlob;
  let lastAudio;

  const time = 90;
  let remainingTime = time;
  let countDownTimerObject;
  let countDownTimerText = "0:90";

  let recordingButtonState = "starting";

  const dispatch = createEventDispatcher();

  function clickRecordAudio() {
    console.log("clickRecordAudio", recordAudio);
    if (recordAudio) {
      recordCount++;
      recordings = [
        ...recordings,
        { id: recordCount, file: "ABC", duration: 123 },
      ];
      console.log(recordings);
    }

    recordAudio = !recordAudio;
  }

  export function startRecording() {
    remainingTime = time;

    navigator.mediaDevices
      .getUserMedia({ audio: { channelCount: 1 }, video: false })
      .then((stream) => {
        let options = { mimeType: "audio/ogg;codecs=opus" };
        // Start recording
        recorder = new MediaRecorder(stream, options, workerOptions);
        recorder.start();
        // Set record to <audio> when recording will be finished
        recorder.addEventListener("dataavailable", (e) => {
          //   console.log("dataavailable", e);

          createDownloadLink(e.data);
        });
        console.log("Recording started");
        recordingButtonState = "recording";
      })
      .catch(function (err) {
        //enable the record button if getUserMedia() fails
        recordingButtonState = "error";
      });

    countDownTimerObject = setInterval(function () {
      var c = remainingTime--;

      if (remainingTime < 0) {
        stopRecording();
        countDownTimerText = "Finished";
      } else {
        countDownTimerText = "0:" + (c + "").padStart(2, "0");
      }
    }, 1000);
  }

  export function stopRecording() {
    clearInterval(countDownTimerObject);
    console.log("stopButton clicked");

    //disable the stop button, enable the record too allow for new recordings
    recordingButtonState = "stop";

    recorder.stop();
    // Remove “recording” icon from browser tab
    recorder.stream.getTracks().forEach((i) => i.stop());
    dispatch("recordingStop");
  }

  function createDownloadLink(blob) {
    let url = URL.createObjectURL(blob);
    lastBlob = blob;
    //var au = document.createElement('audio');
    //var li = document.createElement('div');

    //name of .wav file to use during upload and download (without extendion)
    let filename = new Date().toISOString();
    lastFilename = filename;

    const newReocrding = { blob: blob, filename: filename, url: url };
    $lastRecording = newReocrding;

    dispatch("recordingAvailable", newReocrding);
  }

  function clickSubmitCalculate() {
    console.log("clickSubmitCalculate");
  }
</script>

<div>
  <div>remainingTime:{countDownTimerText}</div>
  <div>lastRecording:{JSON.stringify($lastRecording)}</div>
  {#if $lastRecording}
    <audio controls="controls" bind:duration={audioControlDuration}>
      <track kind="captions" />
      <source src={$lastRecording.url} type="audio/wav" />
    </audio>
  {/if}
</div>
