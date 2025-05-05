let hamburger = document.querySelector('.hamburger');
let sidebar = document.querySelector('.sidebar');
let main = document.querySelector('.main');

hamburger.addEventListener("click",()=>{
    sidebar.classList.toggle('active');
});