const btn = document.querySelector("#open_close");
const box2 = document.querySelector(".profile_box2");
btn.addEventListener("click", () => {
  box2.classList.toggle("profile_box2_active");
});

const correctionBtn = document.getElementById("correction");
const nicknameElement = document.querySelector(".right p");

correctionBtn.addEventListener("click", () => {
  const newNickname = prompt("새로운 닉네임을 입력하세요.");
  if (newNickname) {
    nicknameElement.textContent = newNickname;
  }
});
