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

window.addEventListener('load', () => {
    if (performance.getEntriesByType('navigation') === 'reload') {
        // Reload detected
        util.fillContainerWithIndex(); 
    
    }
});

async function partition(signal,l, r) {
    if(signal.aborted){
        swapNum.textContent = "";
        comparisonNum.textContent = "";
        minNum.textContent = "";
        return;
    }
    let speedFactor = util.checkSpeed();
    util.updateTransitions(speedFactor);

    var boxes = document.querySelectorAll(".box");
    // console.log(boxes);
    let pivot  = values[r];
    boxes[r].classList.add('current');
    let i = l - 1;

    for(let j = l; j<=r-1;j++){
        
        comparisons++;
        comparisonNum.textContent = `${comparisons}`;

        await util.randomDelay(500*speedFactor);
        // boxes[j].classList.add('compared');
        // boxes[r].classList.add('compared');
        if(values[j]<pivot){
            i++;
            await util.randomDelay(500*speedFactor);

            // boxes[i].classList.add('swap');
            // boxes[j].classList.add('swap');
            util.swapStyles(boxes[i],boxes[j]);
            swap(values,i,j);

            await util.randomDelay(500*speedFactor);
            swaps++;
            swapNum.textContent = `${swaps}`;
            // boxes[i].classList.remove('swap');
            // boxes[j].classList.remove('swap');
        }
        // boxes[j].classList.remove('compared');
        // boxes[r].classList.remove('compared');
    }

    boxes[r].classList.remove("current");

    await util.randomDelay(500*speedFactor);
    util.swapStyles(boxes[i+1],boxes[r]);
    swap(values,i+1,r);
    swaps++;

    swapNum.textContent = `${swaps}`;
    return i+1;

}

function swap(arr, i, j)
{
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export async function quickSort(signal, left, right) {
    var boxes = document.querySelectorAll(".box");
    

    neighbourNum.textContent = `index[${left}, ${right}]`
    if(signal.aborted){
        neighbourNum.textContent = "";
        swapNum.textContent = "";
        comparisonNum.textContent = "";
        minNum.textContent = "";
        return;
    }
  if (left >= right) return;
  
  for(let i = left; i<right;i++){
    boxes[i].classList.add('compared');
  }
  boxes[right].classList.add('current');
  const pi = await partition(signal,left,right);
  
  currentNum.textContent = `${pi}`;

  for(let i = left; i<right;i++){
    boxes[i].classList.remove('compared');
  }
  boxes[right].classList.remove('current');
//   boxes[pi].classList.remove('current');
  await quickSort(signal, left, pi-1);
  await quickSort(signal, pi + 1, right);
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
      await quickSort(controller.signal, 0, values.length - 1);
    } catch (error) {
      console.log("Sorting stopped:", error);
    } finally {
        neighbourNum.textContent = "";
      startBtn.disabled = false;
    }
  });