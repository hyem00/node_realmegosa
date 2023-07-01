const form = document.getElementById("signup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = new FormData(form);

  const myForm = {};
  await payload.forEach((value, key) => (myForm[key] = value));

  fetch("http://localhost:8000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myForm),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (
        res.errorMessage ===
        "닉네임에는 2글자 이상 16글자 이하이며 특수문자는 불가능합니다."
      ) {
        alert("닉네임에는 2글자 이상 16글자 이하이며 특수문자는 불가능합니다.");
      } else if (
        res.errorMessage === "패스워드가 패스워드 확인란과 다릅니다."
      ) {
        alert("패스워드가 패스워드 확인란과 다릅니다.");
      } else if (res.errorMessage === "이미 존재하는 아이디입니다.") {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("회원가입이 되었습니다.");
        location.href = "/";
      }
    });
});
