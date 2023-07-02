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
      console.log(res);
      if (res.message === "존재하지 않는 아이디입니다.") {
        alert("존재하지 않는 아이디입니다.");
      } else if (res.message === "비밀번호가 일치하지 않습니다.") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 되었습니다.");
        hideModal();
        localStorage.setItem("token", res.token);
        location.reload();
      }
    });
});

document.addEventListener('DOMContentLoaded', function () {
  logincheck();
});

function logincheck() {
  const checkToken = document.cookie.split('=')[1];
  const topBar = document.querySelector('.signBox');
  console.log(checkToken);
  let temp = ``;
  if (checkToken) {
    temp = `<li><a href="#"><img src="../img/pngwing.com.png" onclick="post()"></a></li>
            <button onclick="mypage()">마이페이지</button>
            <button onclick="logout()">로그아웃</button>
          `;
  } else {
    temp = `<button onclick="join()">회원가입</button>
            <button onclick="showModal()">로그인</button>
          `;
  }
  topBar.innerHTML += temp;
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
  console.log(res);
  alert("로그아웃 되었습니다.");
  localStorage.removeItem("token");
  location.reload();
  })
}