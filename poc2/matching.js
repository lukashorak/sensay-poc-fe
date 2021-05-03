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
	
function evaluateMatch(){

	console.log("evalute");
	
	document.getElementById("evaluateButton").disabled = true;
	document.getElementById("apiResult").innerHTML = "";
	document.getElementById("apiPre").innerHTML = "Start processing";
	
	
	let textValue = document.getElementById("textAreaInput").value;
	
	let lines = document.getElementById("textAreaKeywords").value.split(/\n/)
	
	let keywords = lines.map(line=>{return line.split(" ");});	
	
	callSpacy(textValue, keywords);
}	
	

function callSpacy(text, keywords){
	
	let spacyData = {"text": text, "words": keywords};
		
	postJsonFile(
				"https://kudo-spacy-api.herokuapp.com/spacyMatcher",
				{ "Content-Type": "application/json" },
				{},
				spacyData
			)
				.then((data) => {
					console.log("send data to api", data);
					document.getElementById("apiResult").innerHTML = "Result: "+data.result+" ("+data.matchCount+"/"+data.wordCount+")";
					if (data.result){
						document.getElementById("apiResult").className = "good";
					}else{
						document.getElementById("apiResult").className = "bad";
					}
					
					document.getElementById("apiPre").innerHTML = JSON.stringify(data, undefined, 2);
					document.getElementById("evaluateButton").disabled = false;
				})
				.catch((error) => {
					console.log("error sending data to api", error);
				});	
	
}


