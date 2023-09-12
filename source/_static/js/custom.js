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
    <div class="chatHeader bg-light p-2 d-flex justify-content-between align-items-center">
        <div style="width: 30px;"></div>
        <div class="text-center w-100">
            <b>Ray Docs AI - Ask a question</b>
        </div>
        <button id="closeChatBtn" class="btn">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <div class="chatContentContainer">
        <div class="input-group">
            <input id="searchBar" type="text" class="form-control" placeholder="Search">
            <div class="input-group-append">
                <button id="searchBtn" class="btn btn-primary">Ask AI</button>
            </div>
        </div>
        <div id="result"></div>
    </div>
    <div class="chatFooter text-right p-2">
        © Copyright 2023, The Ray Team.
    </div>
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

function rayqa(event) {
    
    if (event.type === 'click' || event.type === 'keydown' && event.key === 'Enter'){
        var searchBar = document.getElementById('searchBar')
        var searchTerm = searchBar.value;
    
        var resultDiv = document.getElementById('result')
        resultDiv.textContent = '';
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
    
            // Streaming effect
            var text = data["answer"];
            var html = marked.parse(text);
            html = DOMPurify.sanitize(html);
    
            var i = 0;
            function typeWriter() {
                if (i < html.length) {
                    if (i % 10 == 0){
                        resultDiv.innerHTML = html.slice(0, i);
                    }
                    i++;
                    setTimeout(typeWriter, 5);
                }
                else {                
                    // resultDiv.innerText += "\n\nSources:\n\n"
                    const ul = document.createElement('ul');
                    const sources = data["sources"];
                    sources.forEach(item => {
                        const li = document.createElement('li');
                        li.innerHTML = `<a href="${item}" target="_blank">${item}</a>`;
                        ul.appendChild(li);
                    });
                    resultDiv.appendChild(ul);
                }
            }
            typeWriter();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
};

document.getElementById('searchBtn').addEventListener('click', rayqa);
document.getElementById('searchBar').addEventListener('keydown', rayqa);