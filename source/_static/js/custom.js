// Create chat-widget div
var chatWidgetDiv = document.createElement("div");
chatWidgetDiv.className = "chat-widget";
chatWidgetDiv.innerHTML = `
    <button id="openChatBtn">Ask AI</button>
`
document.body.appendChild(chatWidgetDiv);

// Create chat-popup div
var chatPopupDiv = document.createElement("div");
chatPopupDiv.className = "chat-popup";
chatPopupDiv.id = "chatPopup";
chatPopupDiv.innerHTML = `
    <div class="chatHeader bg-light p-2">
        Ray Docs AI - Ask a question
        <button id="closeChatBtn">x</button>
    </div>
    <div>
        <input type="text" placeholder="Search">
        <button id="searchBtn">Ask AI</button>
    </div>
    <div id="result"></div>
`
document.body.appendChild(chatPopupDiv);


document.getElementById('openChatBtn').addEventListener('click', function() {
    console.log("close");
    document.getElementById('chatPopup').style.display = 'block';
    document.querySelector('.container-xl').classList.add('blurred');
});

document.getElementById('closeChatBtn').addEventListener('click', function() {
    console.log("close");
    document.getElementById('chatPopup').style.display = 'none';
    document.querySelector('.container-xl').classList.remove('blurred');
});

document.getElementById('searchBtn').addEventListener('click', function() {
    console.log('Form submitted');
    
    var searchTerm = searchBar.value;

    var resultDiv = getElementById('result')
    resultDiv.textContent = ''; // Clear previous result
    resultDiv.textContent = `
        Processing your question... please wait 10-15 seconds.
        Please note that the results of this bot are automated &
        may be incorrect or contain inappropriate information.`; 

    // Send POST request
    fetch('https://ray-qa-fb271b21669b.herokuapp.com/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({body: searchTerm})
    })
    .then(response => {
        console.log('Response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Data:', data);
        resultDiv.textContent = '';

        // Simulate streaming effect
        var text = data["answer"];
        var i = 0;
        function typeWriter() {
            if (i < text.length) {
                resultDiv.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 10);
            }
        }
        typeWriter();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});