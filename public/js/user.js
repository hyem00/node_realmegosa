const form = document.getElementById("signup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = new FormData(form);
  console.log([...payload]);

  const myForm = {};
  await payload.forEach((value, key) => (myForm[key] = value));
  console.log(myForm);

  fetch("http://localhost:8000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myForm),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});

// user.html 에서 받은 id password passwordconfirm 정보를 FormData에 담아 POST 하려 했으나 실패함
