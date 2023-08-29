// Create chat-widget div
var chatWidgetDiv = document.createElement("div");
chatWidgetDiv.className = "chat-widget";


// Create openChatBtn button
var openChatBtn = document.createElement("button");
openChatBtn.id = "openChatBtn";
openChatBtn.innerHTML = "Ask AI";

// Create SVG element
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "20");
svg.setAttribute("height", "20");
svg.setAttribute("viewBox", "0 0 10 10");

// Create path element
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M1 7L5 3L9 7");
path.setAttribute("stroke", "white");
path.setAttribute("stroke-width", "2");
svg.appendChild(path);

// Append SVG to button
openChatBtn.appendChild(svg);

chatWidgetDiv.appendChild(openChatBtn);

// Append created elements to the body
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
chatPopupDiv.appendChild(closeChatBtn);

// Create search bar and button
var searchForm = document.createElement("form");
searchForm.className = "form-inline";

var searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.className = "form-control";
searchBar.placeholder = "Search";

var searchBtn = document.createElement("button");
searchBtn.type = "submit";
searchBtn.className = "btn btn-primary ml-2";
searchBtn.textContent = "Ask AI";

searchForm.appendChild(searchBar);
searchForm.appendChild(searchBtn);


var resultDiv = document.createElement("div");
resultDiv.id = "result";

// Append elements to chatPopupDiv
chatPopupDiv.appendChild(headerDiv);
chatPopupDiv.appendChild(searchForm);
chatPopupDiv.appendChild(resultDiv);


document.body.appendChild(chatPopupDiv);


document.getElementById('openChatBtn').addEventListener('click', function() {
    document.getElementById('chatPopup').style.display = 'block';
    document.querySelector('.container-xl').classList.add('blurred');
});

document.getElementById('closeChatBtn').addEventListener('click', function() {
    document.getElementById('chatPopup').style.display = 'none';
    document.querySelector('.container-xl').classList.remove('blurred');
});


searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var searchTerm = searchBar.value;
    console.log(searchTerm);

    // Send POST request
    fetch('https://api.example.com/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({search: searchTerm})
    })
    .then(response => response.json())
    .then(data => {
        console.log("success")
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
