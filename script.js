const OptionBtn= document.querySelector(".hamburger");
const dropdownLinks = document.querySelector(".headingLinks");
const myBtns = document.querySelector(".myBtns");
const ShortenBtn = document.querySelector(".enterBtn");
const input = document.querySelector("input");
const working =  document.querySelector(".working");
const h1 =document.querySelector("h1");
const middleSection =document.querySelector(".middleSection");


function showLinks(){
    dropdownLinks.classList.toggle("block");
    myBtns.classList.toggle("remove");
    working.classList.toggle("blank");
 h1.classList.toggle("h1marging")
}
OptionBtn.addEventListener("click",showLinks)


function link(){
     return input.textContent;
    }
const url = input.textContent
//check for link
async function urlShortening(url){
    try{
        const response = await fetch(`https//api.shrtcoi.de/v2/shorten?url=${url}`);
        const data = await response.json();
        const newLink  = document.createElement("div");
        newLink.innerHTML= `
        <div><p class="link">${data.result.ShortenBtn_link}</p><button class="copy"></button>
        </div>
        `
        middleSection.appendChild(newLink);
        if(!response.ok){
            throw new error(`HTTP error:${response.status}`);
        }
    }
        catch(error){
            console.error(`cannot find link data ${error}`)
        }
    }

function shortenFunction(){
    if(link() > 0){
        urlShortening();
    }
}

ShortenBtn.addEventListener("click", shortenFunction)