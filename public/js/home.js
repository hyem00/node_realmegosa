function startBtn() {
  location.href = "main";
}
////////////////////

// 모달 창 보이기
function showModal() {
  const modal = document.getElementById("login_modal");
  modal.classList.add("show");
}

// 모달 창 숨기기
function hideModal() {
  const modal = document.getElementById("login_modal");
  modal.classList.remove("show");
}

// // 모달창 제어 버튼
// const loginButton = document.getElementById("login-btn");
// loginButton.addEventListener("click", login);
