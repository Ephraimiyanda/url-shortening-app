const OptionBtn= document.querySelector(".options")
const dropdownLinks = document.querySelector(".headingLinks")

function showLinks(){
    dropdownLinks.classList.toggle("remove");
}
OptionBtn.addEventListener("click",showLinks)