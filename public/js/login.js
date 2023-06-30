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
    .then(res => {
        console.log("로그인완료");
    });
});

function logout () {
    fetch("http://localhost:8000/api/logout", {
        method: "GET"
    })
    .then((res) => res.json())
    .then(res => {
        console.log("로그아웃완료");
    })
}