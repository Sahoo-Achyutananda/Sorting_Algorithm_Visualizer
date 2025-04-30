import { fillContainer, clearContainer, getRandomHeight, sayHello } from "../utils/utils.js";
import {bubbleSort} from "./bubble_sort.js";

let mainBox = document.querySelector(".main_box");
let countSlider = document.querySelector("#count_slider");
let countText = document.querySelector("#count_value");
let speedSlider = document.querySelector("#speed");

let startBtn = document.querySelector(".start");
let resetBtn =document.querySelector(".reset");


let currentNum = document.getElementById("current_num");
let neighbourNum = document.getElementById("adjacent_num");
let swapNum = document.getElementById("swap_num");
let comparisonNum = document.getElementById("comparison_num");

let controller = null;

window.onload = function(){
    fillContainer();
}

resetBtn.addEventListener("click",()=>{

    if(controller) {
        controller.abort(); // stop the current sort
    }

    currentNum.textContent = "";
    neighbourNum.textContent = "";
    swapNum.textContent = "";
    comparisonNum.textContent = "";

    startBtn.disabled = false;
    countText.value = countSlider.value;
    clearContainer();
    fillContainer(countText.value);

})

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

startBtn.addEventListener("click", ()=>{
    clearContainer();
    fillContainer(countText.value);
    startBtn.disabled = true;

    controller = new AbortController()
    bubbleSort(controller.signal);
})



