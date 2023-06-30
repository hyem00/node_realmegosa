const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
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
    .then(res => {
        console.log(res)
        localStorage.setItem("token", res.token)
        localStorage.setItem("id", JSON.stringify(mloginForm))
        alert("로그인되었습니다.")
    });
});

function logout () {
    fetch("http://localhost:8000/api/logout", {
        method: "GET"
    })
    .then((res) => res.json())
    .then(res => {
        console.log("로그아웃완료")
        alert("로그아웃되었습니다.")
    })
}
