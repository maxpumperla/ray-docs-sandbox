// Create chat-widget div
var chatWidgetDiv = document.createElement("div");
chatWidgetDiv.className = "chat-widget";

// Create openChatBtn button
var openChatBtn = document.createElement("button");
openChatBtn.id = "openChatBtn";
openChatBtn.innerHTML = "Ask AI";

chatWidgetDiv.appendChild(openChatBtn);
document.body.appendChild(chatWidgetDiv);

// Create chat-popup div
var chatPopupDiv = document.createElement("div");
chatPopupDiv.className = "chat-popup";
chatPopupDiv.id = "chatPopup";

var headerDiv = document.createElement("div");
headerDiv.innerHTML = "Ray Docs AI - Ask a question"
headerDiv.className = "header bg-light p-2";
headerDiv.style.position = "relative";

// Create closeChatBtn button
var closeChatBtn = document.createElement("button");
closeChatBtn.id = "closeChatBtn";
closeChatBtn.innerHTML = "x";
headerDiv.appendChild(closeChatBtn);


// Create search bar and button
var searchDiv = document.createElement("div");

var searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.placeholder = "Search";

var searchBtn = document.createElement("button");
searchBtn.id = "searchBtn";
searchBtn.innerHTML = "Ask AI";

searchDiv.appendChild(searchBar);
searchDiv.appendChild(searchBtn);


var resultDiv = document.createElement("div");
resultDiv.id = "result";

chatPopupDiv.appendChild(headerDiv);
chatPopupDiv.appendChild(searchDiv);
chatPopupDiv.appendChild(resultDiv);

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

    // Send POST request
    fetch('https://ray-qa-fb271b21669b.herokuapp.com/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({body: searchTerm})
    })
    .then(response => {
        console.log('Response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Data:', data);
        var resultDiv = document.getElementById('result');
        resultDiv.textContent = ''; // Clear previous result

        // Simulate streaming effect
        var text = data.text;
        var i = 0;
        function typeWriter() {
            if (i < text.length) {
                resultDiv.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});