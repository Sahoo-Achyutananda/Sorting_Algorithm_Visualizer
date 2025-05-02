import * as util from "../utils/utils.js";

let values = []; // This should be at the top of your mergeSort.js file
let speedFactor = 500;
let swaps = 0;
let comparisons = 0;
let startBtn = document.querySelector(".start");

import { fillContainer, clearContainer, initializeValues, getRandomHeight, sayHello } from "../utils/utils.js";
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

    fillContainer(); // affects only when the page is loaded for the first time , for reloads it doesnt work
}

function clearUp(){

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
    countText.value = countSlider.value;
    clearUp();
})

// updating speed value based on input value and viceversa
speedSlider.addEventListener("input", ()=>{
    speedValue.value = speedSlider.value;

})

speedValue.addEventListener("input", ()=>{
    speedSlider.value = speedValue.value;
})



// startBtn.addEventListener("click", async ()=>{
//     // clearContainer();
//     // fillContainer(countText.value);

//     // let boxes = document.querySelectorAll(".box");
//     startBtn.disabled = "true";
//     swapNum.textContent = "";
//     comparisonNum.textContent = "";

//     let boxes = initializeValues();
//     console.log(boxes);
//     controller = new AbortController();
//     await mergeSort(controller.signal,boxes,0,boxes.length-1);

//     // let h = []
//     // boxes.forEach((x)=>{
//     //     h.push(x.style.height);
//     // })

//     console.log(h);

//     currentNum.textContent = "";
//     neighbourNum.textContent = "";
//     // comparisonNum.textContent = "";

//     startBtn.disabled = false;
// })



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

async function merge(signal,l, m, r) {
    if(signal.aborted){
        swapNum.textContent = "";
        comparisonNum.textContent = "";
        minNum.textContent = "";
        return;
    }

  const boxes = document.querySelectorAll(".box");
  const L = values.slice(l, m + 1);
  const R = values.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < L.length && j < R.length) {
    comparisons++;
    // comparisonNum.textContent = comparisons;
    
    await util.randomDelay(speedFactor);
    
    if (L[i] <= R[j]) {
      values[k] = L[i];
      boxes[k].style.height = `${L[i]}px`;
      i++;
    } else {
      values[k] = R[j];
      boxes[k].style.height = `${R[j]}px`;
      j++;
      swaps++;
    //   swapNum.textContent = swaps;
    }
    k++;
  }

  while (i < L.length) {
    values[k] = L[i];
    boxes[k].style.height = `${L[i]}px`;
    i++;
    k++;
  }

  while (j < R.length) {
    values[k] = R[j];
    boxes[k].style.height = `${R[j]}px`;
    j++;
    k++;
  }
}

export async function mergeSort(signal, left, right) {
  if (signal.aborted || left >= right) return;
  
  const mid = left + Math.floor((right - left) / 2);
  await mergeSort(signal, left, mid);
  await mergeSort(signal, mid + 1, right);
  await merge(signal,left, mid, right);
}

startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;
    // swapNum.textContent = "0";
    // comparisonNum.textContent = "0";
    
    // Initialize values from DOM
    values = util.initializeValues(); // Now using the util version
    
    const controller = new AbortController();
    
    try {
      await mergeSort(controller.signal, 0, values.length - 1);
    } catch (error) {
      console.log("Sorting stopped:", error);
    } finally {
      startBtn.disabled = false;
    }
  });