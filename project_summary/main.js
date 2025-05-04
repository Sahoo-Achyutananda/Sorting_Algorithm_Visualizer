
let title = document.querySelectorAll('.title');
let description = document.querySelectorAll('.description');
let icons = document.querySelectorAll('.expand');

// console.log(title);

title.forEach((acc, index)=>{
    // let pos = title.indexOf(acc);
    acc.addEventListener("click", ()=>{
        if(window.getComputedStyle(description[index]).display === 'none'){
            description[index].style.display = 'block';
            icons[index].style.transform = "rotate(-90deg)"
        }
        else{
            description[index].style.display = 'none';
            icons[index].style.transform = "rotate(0deg)"
        }
    });
})
