let mainBox = document.querySelector(".main_box");
let countSlider = document.querySelector("#count_slider");
let countText = document.querySelector("#count_value");
let speedSlider = document.querySelector("#speed_slider");

let currentNum = document.getElementById("current_num");
let neighbourNum = document.getElementById("adjacent_num");
let currentArray = document.getElementById("current_array");
let swapNum = document.getElementById("swap_num");
let comparisonNum = document.getElementById("comparison_num");

export function initializeValues() {
    const boxes = document.querySelectorAll(".box");
    let values = [];
    boxes.forEach((x)=>{
        values.push(parseInt(x.style.height));
    })

    return values;
  }

export function randomDelay(time){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(true);
        },time)
    })
}

export function getRandomHeight(){
    let h = Math.floor(Math.random()*300);
    return `${h}px`;
}

export function fillContainer(value = 20){

    countSlider.value = value;
    countText.value = value;

    for(let i = 1; i <=value; i++){
        let box = document.createElement('div');
        box.classList.add("box");
        box.style.width = `${(parseInt(window.getComputedStyle(mainBox).width)/value)}px`;
        box.style.height = getRandomHeight();

        mainBox.appendChild(box);
    }
    // speedSlider.value = "1" ;
}

export function fillContainerWithIndex(value = 20){
    countSlider.value = value;
    countText.value = value;

    for(let i = 0; i <value; i++){
        let main_div = document.createElement('div');
        let box = document.createElement('div');
        let index = document.createElement('span');

        main_div.classList.add('main_div');
        
        main_div.appendChild(index);
        main_div.appendChild(box);

        box.classList.add("box");
        index.classList.add('index');
        index.textContent = `${i}` ;

        box.style.width = `${(parseInt(window.getComputedStyle(mainBox).width)/value -2)}px`;
        index.style.width = `${(parseInt(window.getComputedStyle(mainBox).width)/value -2)}px`;

        box.style.height = getRandomHeight();

        mainBox.appendChild(main_div);
    }
}

export function clearContainer(){

    if(currentNum)
        currentNum.textContent = "";
    if(neighbourNum)
        neighbourNum.textContent = "";
    if(currentArray)
        currentArray.textContent = "";
    swapNum.textContent = "";
    comparisonNum.textContent = "";

    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box)=>{
        mainBox.removeChild(box);
    })
}

export function clearContainerWithIndex(){

    if(currentNum)
        currentNum.textContent = "";
    if(neighbourNum)
        neighbourNum.textContent = "";
    if(currentArray)
        currentArray.textContent = "";
    swapNum.textContent = "";
    comparisonNum.textContent = "";

    let boxes = document.querySelectorAll(".main_div");
    boxes.forEach((box)=>{
        mainBox.removeChild(box);
    })
}

export function sayHello(){
    console.log("Hii");
}

export function swapStyles(div1,div2){

    let temp = div1.style.height;
    div1.style.height = `${parseInt(div2.style.height)}px`;
    div2.style.height = temp;
}

export function checkSpeed(){
    let speed = document.querySelector("#speed_slider").value;
    let speedFactor = 1/speed ;
    return speedFactor;
}

export function updateTransitions(speedFactor){
    const boxes = document.querySelectorAll(".box");
    const transitionTime = 500*speedFactor;

    boxes.forEach((box)=>{
        box.style.transition = `height ${transitionTime}ms ease, background-color ${transitionTime}ms linear`;
    })
}