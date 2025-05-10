let hamburger = document.querySelector(".hamburger");
let closeSidebar = document.querySelector(".close_sidebar");
let sidebar = document.querySelector(".sidebar");
let main = document.querySelector(".main");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeSidebar.addEventListener("click", (e) => {
  sidebar.classList.remove("active");
});

// document.addEventListener("click", (e) => {
//   let cond =
//     sidebar.classList.contains("active") && !sidebar.contains(e.target);
//   console.log(cond);
//   //   if (cond) {
//   //     console.log("inside");
//   //     sidebar.classList.remove("active");
//   //   }
// });

/*What was the problem ?? in the above implementation ?? 

When you click on the hamburger button:

    1. It adds the class .active immediately.

    2. Then the global document.addEventListener("click", …) also fires right after — 
    and since the hamburger is not inside the sidebar, your cond becomes true, and 
    it immediately closes the sidebar again.

*/

document.addEventListener("click", (e) => {
  const isSidebarActive = sidebar.classList.contains("active");
  const clickedOutsideSidebar = !sidebar.contains(e.target);
  const clickedHamburger = hamburger.contains(e.target);

  if (isSidebarActive && clickedOutsideSidebar && !clickedHamburger) {
    sidebar.classList.remove("active");
  }
});
