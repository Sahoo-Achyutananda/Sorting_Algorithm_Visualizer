import { fillContainer, clearContainer, getRandomHeight, sayHello } from "../utils/utils.js";

let mainBox = document.querySelector(".main_box");
let countSlider = document.querySelector("#count_slider");
let countText = document.querySelector("#count_value");
let speedSlider = document.querySelector("#speed");

let startBtn = document.querySelector(".start");
let resetBtn =document.querySelector(".reset");

window.onload = function(){
    fillContainer();
}

// updating slider value based on input value and viceversa
countSlider.addEventListener("input", ()=>{
    countText.value = countSlider.value;
    clearContainer();
    fillContainer(countText.value);
})

countText.addEventListener("input", ()=>{
    countText.value = countSlider.value;
    clearContainer();
    fillContainer(countSlider.value);
})



