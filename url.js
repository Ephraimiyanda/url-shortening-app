const input = $('#shortenURL');
const submitBtn = $('#shorten');
const error = $('#emptyMsg');

let empty = true;



let mobileMenuStatut = false;
$('#hamburger').click(function () {
    if (mobileMenuStatut) {
        $('.mobileMenue').css("opacity", 0);
        mobileMenuStatut = false;
    } else {
        $('.mobileMenue').css("opacity", 1);
        mobileMenuStatut = true;
    }

});

// Check for url typing
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

// POST method implementation:
async function postData(url = '', data = {}) {

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

// Shorten URL
function fetchURL() {
    const urlin = ""+input.val();
    if (urlin === "") {
        if (empty) {
            callError();
        }

    } else if (validURL(urlin)) {
        postData('https://rel.ink/api/links/', {
                url: urlin
            })
            .then(data => {
                const shortURL = "https://rel.ink/" + data.hashid;
                $('.bottom').prepend('<div class="short-section" id="section"><p class="original-url">' + urlin + '</p><p class="short-section-url">' + shortURL + '</p><button id="btnCopy" class="active square" >copy</button></div>');
                $("#btnCopy").on("click", function () {
                    navigator.clipboard.writeText(shortURL); //Copy text to clipboard using chrome API
                    $("#btnCopy").addClass("copy");
                    $("#btnCopy").removeClass("active");
                    $("#btnCopy").text("Copied!");
                });
            });
        input.removeClass("empty");
        $("#emptyMsg").remove();
        empty = true;


    } else {
        callError();
    }
}

function copyToClipboard() {
    copyURL.addClass("copied");
}

// Empty text Error
function callError() {
    if (empty) {
        input.addClass("empty");
        input.after('<p id="emptyMsg">Please add a link</p>');
        empty = false;
    }
}

submitBtn.on("click", fetchURL);