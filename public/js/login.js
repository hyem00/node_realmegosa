const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginPayload = new FormData(loginForm);
  const mloginForm = {};
  loginPayload.forEach((value, key) => (mloginForm[key] = value));
  fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mloginForm),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === "존재하지 않는 아이디입니다.") {
        alert("존재하지 않는 아이디입니다.");
      } else if (res.message === "비밀번호가 일치하지 않습니다.") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 되었습니다.");
        hideModal();
        localStorage.setItem("token", res.token);
        updateButton(); // 버튼 업데이트
      }
    });
});

Kakao.init("683d473caa873ed84400194b1b27aab0");
document.getElementById("kakao-login-btn").addEventListener("click", () => {
  // 카카오 로그인 실행
  Kakao.Auth.loginForm({
    scope: "profile_nickname, account_email, gender, profile_image",
    success: function (authObj) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          console.log("카카오 로그인");
          hideModal();
          localStorage.setItem(
            "kakao_eacc25aabf6087a59d0785e34de0a93b",
            "kakao_token"
          ); // 카카오 토큰 저장
          updateButton(); // 버튼 업데이트
        },
      });
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  updateButton();
});

function updateButton() {
  const checkToken = document.cookie.split("=")[1];
  const kakaoToken = localStorage.getItem(
    "kakao_eacc25aabf6087a59d0785e34de0a93b"
  );
  const topBar = document.querySelector(".signBox");
  const existingButtons = document.querySelectorAll(".dynamic-button");

  existingButtons.forEach((button) => {
    button.remove();
  });

  if (checkToken || kakaoToken) {
    const myPageButton = document.createElement("button");
    myPageButton.innerHTML = "마이페이지";
    myPageButton.className = "dynamic-button";
    myPageButton.addEventListener("click", mypage);
    topBar.appendChild(myPageButton);
    const logoutButton = document.createElement("button");
    logoutButton.innerHTML = "로그아웃";
    logoutButton.className = "dynamic-button";
    logoutButton.addEventListener("click", logout);
    topBar.appendChild(logoutButton);

  } else {
    const joinButton = document.createElement("button");
    joinButton.innerHTML = "회원가입";
    joinButton.className = "dynamic-button";
    joinButton.addEventListener("click", join);
    topBar.appendChild(joinButton);

    const loginButton = document.createElement("button");
    loginButton.innerHTML = "로그인";
    loginButton.className = "dynamic-button";
    loginButton.addEventListener("click", showModal);
    topBar.appendChild(loginButton);
  }
}

function mypage() {
  location.href = "mypage";
}

function logout() {
  fetch("http://localhost:8000/api/logout", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      alert("로그아웃 되었습니다.");
      localStorage.removeItem("token");
      localStorage.removeItem("kakao_eacc25aabf6087a59d0785e34de0a93b");
      updateButton(); // 버튼 업데이트
    });
}
