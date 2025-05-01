import * as util from "../utils/utils.js" ;

export async function bubbleSort(signal){
    let boxes = document.querySelectorAll(".box");
    let heights = [];

    boxes.forEach((box)=>{
        heights.push(parseInt(box.style.height));
    })

    let swaps = 0;
    let comparisons = 0;
    let currentNum = document.getElementById("current_num");
    let neighbourNum = document.getElementById("adjacent_num");
    let swapNum = document.getElementById("swap_num");
    let comparisonNum = document.getElementById("comparison_num");
    
    for(let i = 0;i< heights.length -1; i++){
        for(let j = 0; j <heights.length - i - 1; j++){

            if(signal.aborted)
                return;

            let speed = document.querySelector("#speed_slider").value;
            let speedFactor = 1/speed ;

            boxes[j].classList.add('current');
            currentNum.textContent = parseInt(boxes[j].style.height);

            if(boxes[j+1]){
                boxes[j+1].classList.add('compared');
                neighbourNum.textContent = parseInt(boxes[j+1].style.height);
            }
            await util.randomDelay(500*speedFactor);

            comparisons++;
            comparisonNum.textContent = comparisons;

            if(parseInt(window.getComputedStyle(boxes[j]).height) > parseInt(window.getComputedStyle(boxes[j+1]).height)){
                boxes[j].classList.add('swap');
                boxes[j+1].classList.add('swap');

                util.swapStyles(boxes[j],boxes[j+1]);

                swaps++;
                swapNum.textContent = swaps;

                document.getElementById("swap_num").classList.add('swapped'); // expecting a blinking effect whenever a swap happens

                await util.randomDelay(500*speedFactor);
                boxes[j].classList.remove('swap');
                boxes[j+1].classList.remove('swap');
                document.getElementById("swap_num").classList.remove('swapped');
            }
        
            boxes[j].classList.remove('current');

            if(boxes[j+1])
                boxes[j+1].classList.remove('compared');

            await util.randomDelay(500*speedFactor);
            
        }
    }

    neighbourNum.textContent = "";
    currentNum.textContent = "";
    
    
}