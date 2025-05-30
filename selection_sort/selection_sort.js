import * as util from "../utils/utils.js" ;

function checkSpeed(){
    let speed = document.querySelector("#speed_slider").value;
    let speedFactor = 1/speed ;
    return speedFactor;
}

export async function selectionSort(signal){
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
    
    for(let i = 0;i< heights.length -1; i++){

        if(signal.aborted){
            swapNum.textContent = "";
            comparisonNum.textContent = "";
            minNum.textContent = "";
            return;
        }

        let min_index = i;
        speedFactor = checkSpeed();
        
        boxes[i].classList.add('current');
        currentNum.textContent = parseInt(boxes[i].style.height);
        

        for(let j = i+1; j <heights.length; j++){
            speedFactor = checkSpeed();
            // detect RESET and abort the current execution
            if(signal.aborted){
                swapNum.textContent = "";
                comparisonNum.textContent = "";
                minNum.textContent = "";
                return;
            }

            boxes.forEach(box => {
                box.style.transition = `height ${500*speedFactor}ms ease`;
            });

            boxes[j].classList.add('compared');
            await util.randomDelay(500*speedFactor);
            neighbourNum.textContent = parseInt(boxes[j].style.height);
            
            comparisons++;
            comparisonNum.textContent = comparisons;

            if(parseInt(window.getComputedStyle(boxes[j]).height) < parseInt(window.getComputedStyle(boxes[min_index]).height)){
                let prevMins = document.querySelectorAll(".min_element");
                if(prevMins){
                    prevMins.forEach((x)=>{
                        x.classList.remove('min_element');
                    });
                }
                min_index = j;
                minNum.textContent = parseInt(window.getComputedStyle(boxes[min_index]).height);
                boxes[min_index].classList.add('min_element');
            }
            boxes[j].classList.remove('compared');
        }
    
        boxes[i].classList.add('swap');
        boxes[min_index].classList.add('swap');

        // the following line has to be here - not before add "swap" 
        boxes[min_index].classList.remove('min_element');
        minNum.textContent = "";
        
        if(i != min_index){
            util.swapStyles(boxes[i],boxes[min_index]);
            swaps++;
            swapNum.textContent = swaps;
        }

        document.getElementById("swap_num").classList.add('swapped'); // expecting a blinking effect whenever a swap happens
        await util.randomDelay(500*speedFactor);


        boxes[i].classList.remove('swap');
        boxes[min_index].classList.remove('swap');
        document.getElementById("swap_num").classList.remove('swapped');

        boxes[i].classList.remove('current');

        if(boxes[min_index])
            boxes[min_index].classList.remove('compared');

        await util.randomDelay(500*speedFactor);
    }
    
}