import { fillContainer, clearContainer, getRandomHeight, sayHello } from "../utils/utils.js";
import {selectionSort} from "./selection_sort.js";

let mainBox = document.querySelector(".main_box");
let countSlider = document.querySelector("#count_slider");
let countText = document.querySelector("#count_value");

let speedSlider = document.querySelector("#speed_slider");
let speedValue = document.querySelector('#speed_value');

let startBtn = document.querySelector(".start");
let resetBtn =document.querySelector(".reset");


let currentNum = document.getElementById("current_num");
let neighbourNum = document.getElementById("adjacent_num");
let swapNum = document.getElementById("swap_num");
let comparisonNum = document.getElementById("comparison_num");
let minNum = document.getElementById("minimum_num");

let controller = null;

window.onload = function(){

    fillContainer(); // affects only when the page is loaded for the first time , for reloads it doesnt work
}

resetBtn.addEventListener("click",()=>{

    if(controller) {
        controller.abort(); // stop the current sort
    }

    startBtn.disabled = false;
    countText.value = countSlider.value;
    clearContainer();
    fillContainer(countText.value);

})

// updating slider value based on input value and viceversa
countSlider.addEventListener("input", ()=>{
    countText.value = countSlider.value;
    if(controller) {
        controller.abort(); // stop the current sort
    }
    clearContainer();
    fillContainer(countText.value);

})

countText.addEventListener("input", ()=>{
    countSlider.value = countText.value;
    clearContainer();
    fillContainer(countSlider.value);
})

// updating speed value based on input value and viceversa
speedSlider.addEventListener("input", ()=>{
    speedValue.value = speedSlider.value;

})

speedValue.addEventListener("input", ()=>{
    speedSlider.value = speedValue.value;
})

startBtn.addEventListener("click", async ()=>{
    // clearContainer();
    // fillContainer(countText.value);
    
    
    startBtn.disabled = "true";
    swapNum.textContent = "";
    comparisonNum.textContent = "";
    minNum.textContent = "";

    controller = new AbortController();
    await selectionSort(controller.signal);

    document.getElementById("current_num").textContent = "";
    document.getElementById("adjacent_num").textContent = "";
    // swapNum.textContent = "";
    // comparisonNum.textContent = "";
    // minNum.textContent = "";
    // swapNum.textContent = "";
    // comparisonNum.textContent = "";
    startBtn.disabled = false;
    // console.log("Done");
})



// reloading + function invokation : but this solution works only when there is a button in the page
// that reloads the page ||| it wont work when the browser's reload button is pressed !

// function reloadPage(){
//     sessionStorage.setItem("reload", "true");
// }

// window.onload = function(){
//     const reloading = sessionStorage.getItem("reloading");
//     if(reloading){
//         sessionStorage.removeItem("reloading");
//         fillContainer();
//     }
// }

window.addEventListener('load', () => {
    if (performance.getEntriesByType('navigation') === 'reload') {
        // Reload detected
        fillContainer(); 
    
    }
});