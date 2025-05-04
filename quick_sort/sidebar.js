let hamburger = document.querySelector('.hamburger');
let sidebar = document.querySelector('.sidebar');

hamburger.addEventListener("click",()=>{
    sidebar.classList.toggle('active');
})