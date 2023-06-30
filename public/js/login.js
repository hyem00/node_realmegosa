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
        localStorage.setItem('token', res.token);
    });
});