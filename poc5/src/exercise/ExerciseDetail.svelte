<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  import {
    userLogin,
    userToken,
    pin,
    pinFromUrl,
  } from "../utilities/DataStore";
  import SpeechToTextOpus from "./components/SpeechToTextOpus.svelte";

  export let loginDetail;
  export let lessonId;
  export let exercisePin;
  let exerciseDetail;

  let SpeechSDK;

  let ttsToken;

  let ttsButtonState;
  let errorMsg;

  let parts = [];
  let aggregateScore;

  let recognitionResults = [];
  let recognitionResultsFinal = writable([]);

  let speechToTextOpus = undefined;

  let recognizer;

  const unsubscribe = recognitionResultsFinal.subscribe((value) => {
    formatResult(value);
  });

  onMount(async () => {
    console.log("loginDetail", loginDetail, exercisePin);
    loadData();

    if (!!window.SpeechSDK) {
      SpeechSDK = window.SpeechSDK;
      ttsButtonState = "starting";
      initPlayPage();
    } else {
      ttsButtonState = "error";
      console.log("error with SpeechSDK");
    }
  });

  function initPlayPage() {
    getToken("https://kudo-poc3.hop2.website/api/azureToken")
      .then((data) => {
        console.log("token", data);
        ttsToken = data;
        ttsButtonState = "ready";
      })
      .catch((error) => {
        console.log("token", error);
        ttsButtonState = "error";
      });
  }

  async function getToken(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        //'Content-Type': 'application/json'
        "Content-Type": "application/x-www-form-urlencoded",
        ...data,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    console.log("getToken", response);
    //uploadStatus.innerHTML = response.status;
    return response.text(); // parses JSON response into native JavaScript objects
  }

  function loadData() {
    fetch(`https://sensay.tw/public/api/exercises/?key=` + exercisePin)
      .then((response) => {
        if (!response.ok) {
          console.log("response error");
          throw new Error("Network response was not ok");
        }
        console.log("response ok", response);
        return response.json();
      })
      .then((data) => {
        exerciseDetail = data;
      })
      .catch((error) => {
        console.log("catch error", error);
        errorMsg = "Missing PIN";
        exerciseDetail = undefined;
      });
  }

  function onChangeCleanUnicodeText(event) {
    //Here add more required trasnformations
    event.target.value = event?.target?.value.replace(/\u2019/g, "'");
    exerciseDetail.selfPracticeText = event.target.value;
  }

  function startRecognition() {
    $recognitionResultsFinal = [];
    recognitionResults.push("START");
    recognitionResults = recognitionResults;
    fromMic();
    speechToTextOpus.startRecording();
  }

  function stopRecognition(fromTimer = false) {
    ttsButtonState = "stop";
    recognitionResults.push("STOP");
    recognitionResults = recognitionResults;
    speechToTextOpus.stopRecording();
    //console.log("finalResult", JSON.stringify(recognitionResults));
    recognizer.stopContinuousRecognitionAsync();

    // console.log(
    //   "recognitionResultsFinal",
    //   JSON.stringify($recognitionResultsFinal)
    // );
  }

  function formatResult(r) {
    const sum = (arr) => arr.reduce((p, c) => p + c, 0);  
    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;    
    
     

    parts = r.flatMap((part) => {
      if (part?.NBest.length > 0) {
        if (part.NBest[0].PronunciationAssessment) {
          return {
            recognitionStatus: part.RecognitionStatus,
            offset: part.Offset,
            duration: part.Duration,
            displayText: part.DisplayText,
            confidence: part.NBest[0].Confidence,
            accuracyScore: part.NBest[0].PronunciationAssessment.AccuracyScore,
            fluencyScore: part.NBest[0].PronunciationAssessment.FluencyScore,
            completenessScore:
              part.NBest[0].PronunciationAssessment.CompletenessScore,
            pronScore: part.NBest[0].PronunciationAssessment.PronScore,
            words: part.NBest[0].Words,
            wordCount: part.NBest[0].Words.length,
          };
        } else {
          return {
            recognitionStatus: part.RecognitionStatus,
            offset: part.Offset,
            duration: part.Duration,
            displayText: part.DisplayText,
            confidence: part.NBest[0].Confidence,
            words: part.NBest[0].Words,
            wordCount: part.NBest[0].Words?.length
              ? part.NBest[0].Words?.length
              : 0,
          };
        }
      } else {
        let x = {
          recognitionStatus: part.RecognitionStatus,
          offset: part.Offset,
          duration: part.Duration,
          displayText: part.DisplayText,
        };
        return [];
      }
    });

    // console.log("parts", JSON.stringify(parts));
    

    aggregateScore = {
      start: Math.min(...parts.flatMap((e) => (e?.offset))),
      end: Math.max(...parts.flatMap((e) => (e?.offset + e?.duration))),
      
      confidence: average(
        parts.flatMap((e) => (e?.confidence ? e?.confidence : []))
      ).toFixed(2),
      accuracyScore: average(
        parts.flatMap((e) => (e?.accuracyScore ? e?.accuracyScore : []))
      ).toFixed(0),
      fluencyScore: average(
        parts.flatMap((e) => (e?.fluencyScore ? e?.fluencyScore : []))
      ).toFixed(0),
      completenessScore: average(
        parts.flatMap((e) => (e?.completenessScore ? e?.completenessScore : []))
      ).toFixed(0),
      pronScore: average(
        parts.flatMap((e) => (e?.pronScore ? e?.pronScore : []))
      ).toFixed(0),
    };

    aggregateScore.duration = ((aggregateScore?.end - aggregateScore?.start) /10000000).toFixed(2);
    aggregateScore.wordDurationSum = (sum(parts.flatMap((e) => e.words).map((w) => w.Duration)) /10000000).toFixed(2);

    aggregateScore.audioDuration = speechToTextOpus?.audioControlDuration;

    console.log("aggregateScore", JSON.stringify(aggregateScore));
  }

  function fromMic() {
    let speechConfig;

    if (ttsToken) {
      speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
        ttsToken,
        "eastus"
      );
    } else {
      if (ttsToken === "" || ttsToken === "subscription") {
        alert(
          "Please enter your Microsoft Cognitive Services Speech subscription key!"
        );
        return;
      }
      speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        subscriptionKey.value,
        serviceRegion.value
      );
    }

    speechConfig.speechRecognitionLanguage = "en-US";
    speechConfig.setProfanity(2);

    var pronunciationAssessmentConfig =
      new SpeechSDK.PronunciationAssessmentConfig(
        "",
        SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,
        SpeechSDK.PronunciationAssessmentGranularity.Phoneme,
        true
      );

    let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    pronunciationAssessmentConfig.applyTo(recognizer);

    console.log("Speak into your microphone.");

    recognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);

      // var pronunciationAssessmentResult =
      //   SpeechSDK.PronunciationAssessmentResult.fromResult(e);
      // console.log(
      //   `pronunciationAssessmentResult: ${JSON.stringify(
      //     pronunciationAssessmentResult
      //   )}`
      // );
      // recognitionResults.push({
      //   pronunciationAssessmentResult: pronunciationAssessmentResult,
      // });
      // recognitionResults = recognitionResults;
    };

    // recognizer.speechStartDetected = (s, e) => {
    //   console.log(`speechStartDetected: Text=${e.result.text}`);
    //   recognitionResults.push({ speechStartDetected: e?.result });
    // };

    recognizer.recognized = (s, e) => {
      if (e.result.reason == SpeechSDK.ResultReason.RecognizedSpeech) {
        //Here add logic to process final result from Azure
        //TODO

        console.log(`RECOGNIZED: Text=${e.result.text}`);
        recognitionResults.push({ recognized: e?.result });

        var pronunciationAssessmentResult = JSON.parse(e.result.json);
        //SpeechSDK.PronunciationAssessmentResult.fromResult(e);
        // console.log(
        //   `pronunciationAssessmentResult: ${JSON.stringify(
        //     pronunciationAssessmentResult
        //   )}`
        // );
        recognitionResults.push({
          pronunciationAssessmentResult: pronunciationAssessmentResult,
        });
        recognitionResults = recognitionResults;

        $recognitionResultsFinal.push(pronunciationAssessmentResult);
        $recognitionResultsFinal = $recognitionResultsFinal;

        // console.log("recognitionResults", JSON.stringify(recognitionResults));
      } else if (e.result.reason == SpeechSDK.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    recognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason == CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log("CANCELED: Did you update the subscription info?");
      }

      recognizer.stopContinuousRecognitionAsync();
    };

    ttsButtonState = "recording";
    recognizer.startContinuousRecognitionAsync();
  }
</script>

<div>
  <div class="container">
    <div class="row align-items-center">
      <div class="col">
        <div class="exercise-title">
          {#if exerciseDetail}
            <span class="exercise-name">{exerciseDetail?.courseName}</span><span
              class="exercise-name"
            >
              >
            </span><span class="exercise-name"
              >{exerciseDetail?.lessonName}</span
            ><span class="exercise-name"> > </span><span
              >{exerciseDetail?.title}
              ({exerciseDetail?.type})</span
            >
          {/if}
        </div>
      </div>
      <div class="col-auto exercise-detail-box">
        <div class="exercise-detail float-right">
          {#if lessonId}
            <p>Lesson: {lessonId}</p>
          {/if}
          <p>Exercise: {exercisePin}</p>
          <div>{$userLogin}</div>
        </div>
      </div>
    </div>

    {#if !exerciseDetail}
      No data
    {:else}
      <div class="row">
        <div class="col">
          {ttsButtonState} - {ttsToken}
        </div>
        <div class="col">
          <button on:click={startRecognition}>Start</button>
          <button on:click={stopRecognition}>Stop</button>
          <SpeechToTextOpus bind:this={speechToTextOpus} />
        </div>
      </div>
      <div class="row">
        <div class="col">
          Result: {#key aggregateScore}{JSON.stringify(aggregateScore)}{/key}
        </div>
      </div>
      <div class="row">
        <div class="col">
          Parts:
          {#each parts as p, i}
            <div>
              {i} - {#if p.confidence} {p?.confidence.toFixed(2)} {/if} - {p.displayText}
              <span style="display: none;">{JSON.stringify(p)}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  @media (max-width: 768px) {
    .exercise-detail-box {
      display: none;
    }
  }

  .exercise-title {
    font-weight: 600;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .exercise-name {
      display: none;
    }
  }

  .exercise-detail {
    border: 1px;
    border-color: #9d9fa2;
    border-style: solid;
    border-radius: 5px;
    margin: 0.5em;
    padding: 0.5em;
  }

  @font-face {
    font-family: "Hanzi-Pinyin";
    src: url("../assets/fonts/Hanzi-Pinyin-Font.top.woff2") format("woff");
  }
</style>
