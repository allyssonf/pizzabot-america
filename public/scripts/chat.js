// Initialize chat header on click
// to allow hide/show of message box.
$(document).ready(function () {
    var isOpen = false;
    $('.chat-header').click(function () {
        if (isOpen) {
            isOpen = false;
            $('.chat-popup').css({
                "animation-name": "popup_close"
            });
        } else {
            isOpen = true;
            $('.chat-popup').css({
                "animation-name": "popup_open"
            });
        }
    });
});

// Send message to Watson API
function sendMessage(msg) {
    // Axios is a package for HTTP requests.
    // This API must be a POST as we send
    // free text as parameter to API.
    axios({
        url: '/api/watson',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { msg }
    })
    .then(response => {
        // console.log(response);
        if (response.data && response.data.message) {
            displayMessage(response.data.message, false);
        } else {
            displayMessage('Erro ao processar requisição', false);
        }
    })
    .catch(error => {
        // console.log(error);
        displayMessage('Erro ao processar requisição', false);
    });
}

function newMessage(event) {
    // Only check for a return/enter press - Event 13
    if (event.which === 13 || event.keyCode === 13) {
        var userInput = document.getElementById('chatInput');

        // Get input text and  remove erroneous characters
        text = userInput.value.replace(/(\r\n|\n|\r)/gm, "");

        // If we have any text, show it on message box and
        // send to server.
        if (text) {
            displayMessage(text, true);
            sendMessage(text);

            // Clear input.
            userInput.value = '';
        } else {
            // Blank user message. Do nothing.
            console.error("No message.");
            userInput.value = '';
            return false;
        }
    }
}

function displayMessage(text, user) {
    var chat_body = document.getElementById('chat-body');
    var bubble = document.createElement('div');

    bubble.setAttribute("class", "bubble");

    if (user) {
        bubble.className += " user";
    } else {
        bubble.className += " watson";
    }

    bubble.innerHTML = text;
    chat_body.appendChild(bubble);
    chat_body.scrollTop = chat_body.scrollHeight;
}

sendMessage('');