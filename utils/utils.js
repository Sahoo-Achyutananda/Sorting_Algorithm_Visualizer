let mainBox = document.querySelector(".main_box");
let countSlider = document.querySelector("#count_slider");
let countText = document.querySelector("#count_value");
let speedSlider = document.querySelector("#speed_slider");

let currentNum = document.getElementById("current_num");
let neighbourNum = document.getElementById("adjacent_num");
let swapNum = document.getElementById("swap_num");
let comparisonNum = document.getElementById("comparison_num");


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

export function clearContainer(){

    currentNum.textContent = "";
    neighbourNum.textContent = "";
    swapNum.textContent = "";
    comparisonNum.textContent = "";

    let boxes = document.querySelectorAll(".box");
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
