import * as util from "../utils/utils.js" ;

function checkSpeed(){
    let speed = document.querySelector("#speed_slider").value;
    let speedFactor = 1/speed ;
    return speedFactor;
}

export async function insertionSort(signal){
    let boxes = document.querySelectorAll(".box");
    let heights = [];
    let speedFactor = checkSpeed();

    boxes.forEach((box)=>{
        heights.push(parseInt(box.style.height));
    })

    let swaps = 0;
    let comparisons = 0;

    let currentNum = document.getElementById("current_num");
    let neighbourNum = document.getElementById("adjacent_num");
    let minNum = document.getElementById("minimum_num");
    let swapNum = document.getElementById("swap_num");
    let comparisonNum = document.getElementById("comparison_num");

    let startBtn = document.querySelector(".start");
    
    for(let i = 1; i< heights.length; i++){

        if(signal.aborted){
            return;
        }

        let key = parseInt(boxes[i].style.height);
        let j = i - 1;
        // console.log(key);
        speedFactor = checkSpeed();
        
        boxes[i].classList.add('current');
        currentNum.textContent = parseInt(boxes[i].style.height);
        await util.randomDelay(500*speedFactor);
        boxes[i].classList.remove('current');
        

        while(j >=0 && parseInt(boxes[j].style.height) > key){
            speedFactor = checkSpeed();
            boxes.forEach(box => {
                box.style.transition = `height ${500*speedFactor}ms ease`;
            });
            // detect RESET and abort the current execution
            if(signal.aborted){
                return;
            }
            

            neighbourNum.textContent = `${parseInt(boxes[j+1].style.height)}, ${parseInt(boxes[j].style.height)}`
            boxes[j+1].classList.add('compared');
            boxes[j].classList.add('compared');
            await util.randomDelay(500*speedFactor);
            boxes[j+1].classList.remove('compared');
            boxes[j].classList.remove('compared');
            
            comparisons++;
            comparisonNum.textContent = comparisons;


            boxes[j+1].classList.add('swap');
            boxes[j].classList.add('swap');
            swaps++;
            swapNum.textContent = swaps;

            boxes[j+1].style.height = boxes[j].style.height;
            document.getElementById("swap_num").classList.add('swapped');
            await util.randomDelay(500*speedFactor);
            boxes[j+1].classList.remove('swap');
            boxes[j].classList.remove('swap');
            await util.randomDelay(500*speedFactor);
            document.getElementById("swap_num").classList.remove('swapped');

            j = j-1;

            
        }

         // expecting a blinking effect whenever a swap happens
        boxes[j+1].style.height = `${key}px`;
        

        await util.randomDelay(500*speedFactor);
    }
    
}