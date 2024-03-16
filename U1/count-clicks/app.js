
const container_clicks = document.getElementById("clicks"); 


const add = document.querySelector(".button-primary"); 
const sub = document.querySelector(".button-seconday"); 
const reset = document.querySelector(".button-reset"); 

let counter = 0;

add.onclick = function() {
    counter ++;
    container_clicks.innerText = counter;
};

