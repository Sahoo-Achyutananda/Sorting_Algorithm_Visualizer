let mainBox = document.querySelector(".main_box");
let countSlider = document.querySelector("#count_slider");
let countText = document.querySelector("#count_value");
let speedSlider = document.querySelector("#speed");

export function randomDelay(time){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            // do Nothing - Eat 5Star
        },time)
    })
}

export function getRandomHeight(){
    let h = Math.floor(Math.random()*300);
    // console.log(h);
    return `${h}px`;
}
export function fillContainer(value = 20){
    for(let i = 1; i <=value; i++){
        let box = document.createElement('div');
        box.classList.add("box");
        box.style.width = `${(parseInt(window.getComputedStyle(mainBox).width)/value)}px`;
        box.style.height = getRandomHeight();

        mainBox.appendChild(box);
    }

}

export function clearContainer(){
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box)=>{
        mainBox.removeChild(box);
    })
}

export function sayHello(){
    console.log("Hii");
}