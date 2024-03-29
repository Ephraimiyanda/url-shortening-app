const OptionBtn= document.querySelector(".hamburger");
const dropdownLinks = document.querySelector(".headingLinks");
const myBtns = document.querySelector(".myBtns");
const ShortenBtn = document.querySelector(".enterBtn");
const input = document.querySelector(".input");
const working =  document.querySelector(".working");
const h1 =document.querySelector("h1");
const middleSection =document.querySelector(".middleSection");
const form  = document.querySelector("form")
const workingDiv = document.querySelector(".workingDiv")
function showLinks(){
    dropdownLinks.classList.toggle("block");
    myBtns.classList.toggle("remove");
    working.classList.toggle("blank");
 h1.classList.toggle("h1marging");
 OptionBtn.classList.toggle("rotate");
 workingDiv.classList.toggle("reduce_bottom")
}
OptionBtn.addEventListener("click",showLinks)

//check for link


ShortenBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const url = input.value;
    shorten(url);
    console.log(input.value);
});


async function shorten(url){

        try{
            const res= await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
            const data = await res.json();
            const newLink  = document.createElement("div");
            localStorage.setItem('newlink', JSON.stringify(newLink));
             const items = JSON.parse(localStorage.getItem('newlink')) || [];
            newLink.innerHTML= `<div class="linkDiv"><p class="originalLink">${data.result.original_link}</p><p class="shortenedLink">${data.result.short_link}</p><button class="copy">copy</button></div>`;
            middleSection.prepend(newLink)
            const copyBtn = document.querySelector(".copy");
            input.value="";
            

            copyBtn.addEventListener("click", ()=>{
                copyBtn.style.backgroundColor="rgb(48, 53, 70)";
                copyBtn.innerHTML=`copied!`
                navigator.clipboard.writeText(data.result.short_link);
            });
            

        }
            catch(error){
                console.error(`cannot find link data ${error}`)
            }
           
        
        

    }

