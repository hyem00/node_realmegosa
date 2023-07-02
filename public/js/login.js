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

      // // 로그인 상태 확인 함수
      // function isLoggedIn() {
      //   const token = localStorage.getItem("token");
      //   const kakologin = localStorage.getItem(
      //     "kakao_eacc25aabf6087a59d0785e34de0a93b"
      //   );
      //   // 토큰의 존재 여부로 로그인 상태를 확인할 수 있습니다.
      //   return token !== null;
      //   return kakao_eacc25aabf6087a59d0785e34de0a93b !== null;
      // }

      // // 로그인/로그아웃 버튼 텍스트 변경 함수
      // function updateLoginButton() {
      //   const loginButton = document.querySelector("#login-btn");
      //   if (isLoggedIn()) {
      //     loginButton.textContent = "로그아웃";
      //   } else {
      //     loginButton.textContent = "로그인";
      //   }
      // }

      // function hideJoinButton() {
      //   const joinButton = document.querySelector("#joinBtn");
      //   if (isLoggedIn()) {
      //     joinButton.textContent = "마이페이지";
      //     joinButton.addEventListener("click", redirectToMyPage);
      //   } else {
      //     joinButton.textContent = "회원가입";
      //   }
      // }

      function redirectToMyPage() {
        const myPageURL = "/mypage";
        window.location.href = myPageURL;
      }

      // 로그인/로그아웃 버튼 클릭 이벤트 처리
      const loginButton = document.querySelector("#login-btn");
      loginButton.addEventListener("click", handleLoginButtonClick);

      // 로그인/로그아웃 버튼 클릭 이벤트 핸들러
      function handleLoginButtonClick() {
        if (isLoggedIn()) {
          // 로그아웃 처리
          fetch("http://localhost:8000/api/logout", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              alert("로그아웃 되었습니다.");
              localStorage.removeItem("token");
              location.reload();
            });
        }
      }

      // 초기 로그인 버튼 텍스트 업데이트
      updateLoginButton();
      // 초기 회원가입 버튼 숨기기
      hideJoinButton();
    });
});

// Kakao.init("683d473caa873ed84400194b1b27aab0");
// document.getElementById().addEventListener("click", () => {
//   // 카카오 로그인 실행
//   Kakao.Auth.loginForm({
//     scope: "profile_nickname, account_email, gender, profile_image",
//     success: function (authObj) {
//       console.log(authObj);
//       Kakao.API.request({
//         url: "/v2/user/me",
//         success: (res) => {
//           const kakao_account = res.kakao_account;
//           console.log(kakao_account);
//           hideModal();
//         },
//       });
//     },
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  logincheck();
});

function logincheck() {
  const checkToken = document.cookie.split("=")[1];
  const topBar = document.querySelector(".signBox");
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
      localStorage.removeItem("kakao_eacc25aabf6087a59d0785e34de0a93b");
      location.reload();
    });
}
