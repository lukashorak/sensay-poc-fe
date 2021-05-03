let subscriptionKey;
let serviceRegion = "eastasia";
let authorizationToken = "";
let SpeechSDK;
let synthesizer;
let player;
let audioConfig;
let ttsToken;
let speechCounter = 0;
let recognizer;


function intialize() {
        if (!!window.SpeechSDK) {
            SpeechSDK = window.SpeechSDK;
            ttsButtonState = "starting";

            initPlayPage();
        } else {
            ttsButtonState = "error";
            console.log("error with SpeechSDK");
        }
    }

function initPlayPage() {
	let data = {
		"Ocp-Apim-Subscription-Key": "ee0147cdfbe34f8bb1483f4ef7bb48a9",
	};
	postToken(
		"https://eastasia.api.cognitive.microsoft.com/sts/v1.0/issuetoken",
		data
	)
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

async function postToken(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
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
	console.log("postToken - status", response.status);
	//uploadStatus.innerHTML = response.status;
	return response.text(); // parses JSON response into native JavaScript objects
}

async function postJsonFile(url = '', headersValue={}, params = {}, data = {}) {

        var urlValue = new URL(url);
        urlValue.search = new URLSearchParams(params).toString();

        // Default options are marked with *
        const response = await fetch(urlValue, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit		        		
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            headers: headersValue,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
    }
	
async function postJsonFileReturnHtml(url = '', headersValue={}, params = {}, data = {}) {

        var urlValue = new URL(url);
        urlValue.search = new URLSearchParams(params).toString();

        // Default options are marked with *
        const response = await fetch(urlValue, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit		        		
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            headers: headersValue,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.text(); // parses JSON response into native JavaScript objects
    }

function fromMic() {
	let speechConfig;
	
	if (ttsToken) {
          speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(ttsToken, 'eastasia');
        } else {
          if (ttsToken === "" || ttsToken === "subscription") {
            alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
            return;
          }
          speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, serviceRegion.value);
        }
		
	speechConfig.speechRecognitionLanguage = "en-US";	
	
    let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    
    console.log('Speak into your microphone.');    
	
	recognizer.recognizing = (s, e) => {
		console.log(`RECOGNIZING: Text=${e.result.text}`);
		document.getElementById("resultPre").innerHTML = "RECOGNIZING:"+e.result.text;		
		
		callSpacy(e.result.text);
		
	};
	
	recognizer.recognized = (s, e) => {
		if (e.result.reason == ResultReason.RecognizedSpeech) {
			console.log(`RECOGNIZED: Text=${e.result.text}`);
			document.getElementById("resultPre").innerHTML = "RECOGNIZED:"+e.result.text;
		}
		else if (e.result.reason == ResultReason.NoMatch) {
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

	
	recognizer.startContinuousRecognitionAsync();
}

function callSpacy(text){
	
	spacyData = {"text": text};
		
	postJsonFile(
				"https://kudo-spacy-api.herokuapp.com/spacy2",
				{ "Content-Type": "application/json" },
				{},
				spacyData
			)
				.then((data) => {
					console.log("send data to api", data);
					document.getElementById("spacyPre").innerHTML = "SPACY:"+JSON.stringify(data);
				})
				.catch((error) => {
					console.log("error sending data to api", error);
				});
	
	postJsonFileReturnHtml(
				"https://kudo-spacy-api.herokuapp.com/spacyEnt",
				{ "Content-Type": "application/json" },
				{},
				spacyData
			)
				.then((data) => {
					console.log("send data to api", data);
					document.getElementById("divEnt").innerHTML = (data);
				})
				.catch((error) => {
					console.log("error sending data to api", error);
				});
	
}


function record(){
	console.log("test");
	
	document.getElementById("stopButton").disabled = false;
	document.getElementById("resultPre").innerHTML = "Start recording";
	
	fromMic();
	
}

function stop(){

	document.getElementById("stopButton").disabled = true;
	document.getElementById("resultPre").innerHTML = "Stop recording";
	recognizer.stopContinuousRecognitionAsync();

}
