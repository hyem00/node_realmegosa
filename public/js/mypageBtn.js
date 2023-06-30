const btn = document.querySelector("#open_close");
const box2 = document.querySelector(".profile_box2");
btn.addEventListener("click", () => {
  box2.classList.toggle("profile_box2_active");
});
