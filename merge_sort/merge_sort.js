import * as util from "../utils/utils.js";
import { fillContainer, clearContainer, initializeValues, getRandomHeight, sayHello } from "../utils/utils.js";


let values = [];
let speedFactor = 500;
let swaps = 0;
let comparisons = 0;
let startBtn = document.querySelector(".start");

// import {mergeSort} from "./merge_sort.js";

let mainBox = document.querySelector(".main_box");
let countSlider = document.querySelector("#count_slider");
let countText = document.querySelector("#count_value");

let speedSlider = document.querySelector("#speed_slider");
let speedValue = document.querySelector('#speed_value');

// let startBtn = document.querySelector(".start");
let resetBtn =document.querySelector(".reset");


let currentNum = document.getElementById("current_num");
let neighbourNum = document.getElementById("adjacent_num");
let swapNum = document.getElementById("swap_num");
let comparisonNum = document.getElementById("comparison_num");



let controller = null;

window.onload = function(){

    util.fillContainerWithIndex(); // affects only when the page is loaded for the first time , for reloads it doesnt work
}

function clearUp(){

    if(controller) {
        controller.abort(); // stop the current sort
    }

    // currentNum.textContent = "";
    neighbourNum.textContent = "";
    swaps = 0;
    comparisons = 0;
    swapNum.textContent = "";
    comparisonNum.textContent = "";
    neighbourNum.textContent = "";

    startBtn.disabled = false;
    countText.value = countSlider.value;
    util.clearContainerWithIndex();
    util.fillContainerWithIndex(countText.value);

}

resetBtn.addEventListener("click", ()=>{
    clearUp();
})

// updating slider value based on input value and viceversa
countSlider.addEventListener("input", ()=>{
    countText.value = countSlider.value;
    clearUp();
})

countText.addEventListener("input", ()=>{
    countSlider.value = countText.value;
    clearUp();
})

// updating speed value based on input value and viceversa
speedSlider.addEventListener("input", ()=>{
    speedValue.value = speedSlider.value;

})

speedValue.addEventListener("input", ()=>{
    speedSlider.value = speedValue.value;
})

window.addEventListener('load', () => {
    if (performance.getEntriesByType('navigation') === 'reload') {
        // Reload detected
        util.fillContainerWithIndex(); 
    
    }
});

async function merge(signal,l, m, r) {
    if(signal.aborted){
        swapNum.textContent = "";
        comparisonNum.textContent = "";
        minNum.textContent = "";
        return;
    }
    let speedFactor = util.checkSpeed();
    util.updateTransitions(speedFactor);

    const boxes = document.querySelectorAll(".box");
    const L = values.slice(l, m + 1);
    const R = values.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    for(let i = l; i<= r; i++){
        boxes[i].classList.add('compared');
    }
    neighbourNum.textContent = `index[${l}, ${r}]`;

    while (i < L.length && j < R.length) {
        comparisons++;
        comparisonNum.textContent = comparisons;

        await util.randomDelay(500*speedFactor);

        if (L[i] <= R[j]) {
            values[k] = L[i];
            boxes[k].style.height = `${L[i]}px`;
            i++;
        } else {
            values[k] = R[j];
            boxes[k].style.height = `${R[j]}px`;
            j++;
            swaps++;
            swapNum.textContent = swaps;
        }
        k++;
    }
    

    while (i < L.length) {
        // boxes[k].classList.add('swap');
        values[k] = L[i];
        boxes[k].style.height = `${L[i]}px`;
        await util.randomDelay(500*speedFactor);
        // boxes[k].classList.remove('swap');
        i++;
        k++;
    }

    while (j < R.length) {
        // boxes[k].classList.add('swap');
        values[k] = R[j];
        boxes[k].style.height = `${R[j]}px`;
        await util.randomDelay(500*speedFactor);
        // boxes[k].classList.remove('swap');
        j++;
        k++;
    }

    for(let i = l; i<= r; i++){
        boxes[i].classList.remove('compared');
    }
}

export async function mergeSort(signal, left, right) {
    if(signal.aborted){
        neighbourNum.textContent = "";
        swapNum.textContent = "";
        comparisonNum.textContent = "";
        minNum.textContent = "";
        return;
    }
  if (left >= right) return;
  
  const mid = left + Math.floor((right - left) / 2);
  await mergeSort(signal, left, mid);
  await mergeSort(signal, mid + 1, right);
  await merge(signal,left, mid, right);
}

startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;
    swapNum.textContent = "0";
    comparisonNum.textContent = "0";
    neighbourNum.textContent = "";
    swaps = 0;
    comparisons = 0;
    
    values = util.initializeValues();
    
    controller = new AbortController();
    
    try {
      await mergeSort(controller.signal, 0, values.length - 1);
    } catch (error) {
      console.log("Sorting stopped:", error);
    } finally {
        neighbourNum.textContent = "";
      startBtn.disabled = false;
    }
  });