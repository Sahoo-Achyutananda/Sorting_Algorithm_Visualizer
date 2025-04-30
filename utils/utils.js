export let mainBox = document.querySelector(".main_box");
export let countSlider = document.querySelector("#count_slider");
export let countText = document.querySelector("#count_value");
export let speedSlider = document.querySelector("#speed");


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

export function swapStyles(div1,div2){

    let temp = div1.style.height;
    div1.style.height = `${parseInt(div2.style.height)}px`;
    div2.style.height = temp;
}
