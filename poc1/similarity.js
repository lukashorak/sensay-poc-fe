function intialize() {
   
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
	
function evaluateSimilarity(){

	console.log("evalute");
	
	document.getElementById("evaluateButton").disabled = true;
	document.getElementById("apiResult").innerHTML = "";
	document.getElementById("apiPre").innerHTML = "Start processing";
	
	
	let textValueExpected = document.getElementById("textAreaExpected").value;
	
	let textValueInput = document.getElementById("textAreaInput").value;
	
	callSpacy(textValueExpected, textValueInput);
}	
	

function callSpacy(textValueExpected, textValueInput){
	
	
	let resultLocal = similarity(textValueExpected, textValueInput);
	document.getElementById("localResult").innerHTML = "Result (Local): "+resultLocal;
	
	let spacyData = {"textExpected": textValueExpected, "textInput": textValueInput};
		
	postJsonFile(
				"https://kudo-spacy-api.herokuapp.com/spacySimilarity",
				{ "Content-Type": "application/json" },
				{},
				spacyData
			)
				.then((data) => {
					console.log("send data to api", data);
					document.getElementById("apiResult").innerHTML = "Result (API): "+data.similarity;					
					
					document.getElementById("apiPre").innerHTML = JSON.stringify(data, undefined, 2);
					document.getElementById("evaluateButton").disabled = false;
				})
				.catch((error) => {
					console.log("error sending data to api", error);
				});	
	
}

function similarity(s1 = '', s2 = '') {
	let longer = s1;
	let shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	let longerLength = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	let costs = new Array();
	for (let i = 0; i <= s1.length; i++) {
		let lastValue = i;
		for (let j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					let newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue),
							costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}


