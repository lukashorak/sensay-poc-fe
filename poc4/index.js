function intialize() {
       
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


function callTwilio(){
	
	let number = document.getElementById("number").value;;
	let message = document.getElementById("message").value;;
	let spacyData = {"number": number, "message": message};
		
	postJsonFile(
				"https://sensay-spacy-api.herokuapp.com/callTwilio",
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
	
	
	
}
