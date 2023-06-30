const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", async () => {
  //e.preventDefault();
  const loginPayload = new FormData(loginForm);
  const mloginForm = {};
  await loginPayload.forEach((value, key) => (mloginForm[key] = value));

  fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mloginForm),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.message === "존재하지 않는 아이디입니다.") {
        alert("존재하지 않는 아이디입니다.");
      } else if (res.message === "비밀번호가 일치하지 않습니다.") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 되었습니다.");
        hideModal();
        localStorage.setItem("token", res.token);
      }

      // 로그인 상태 확인 함수
      function isLoggedIn() {
        const token = localStorage.getItem("token");
        // 토큰의 존재 여부로 로그인 상태를 확인할 수 있습니다.
        return token !== null;
      }

      // 로그인/로그아웃 버튼 텍스트 변경 함수
      function updateLoginButton() {
        const loginButton = document.querySelector("#login-btn");
        if (isLoggedIn()) {
          loginButton.textContent = "로그아웃";
        } else {
          loginButton.textContent = "로그인";
        }
      }

      // 회원가입 버튼 숨기기 함수
      function hideJoinButton() {
        const joinButton = document.querySelector("button[data-join]");
        if (isLoggedIn()) {
          joinButton.style.display = "none";
        } else {
          joinButton.style.display = "block";
        }
      }

      // 로그인/로그아웃 버튼 클릭 이벤트 처리
      const loginButton = document.querySelector("#login-btn");
      loginButton.addEventListener("click", handleLoginButtonClick);

      // 로그인/로그아웃 버튼 클릭 이벤트 핸들러
      function handleLoginButtonClick() {
        if (isLoggedIn()) {
          // 로그아웃 처리
          localStorage.removeItem("token");
          location.reload();
        }
      }

      // 초기 로그인 버튼 텍스트 업데이트
      updateLoginButton();
      // 초기 회원가입 버튼 숨기기
      hideJoinButton();
    });
});
