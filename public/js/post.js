function post() {
  location.href = "/post";
}

function postBtn() {
  const form = document.getElementById("post-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = new FormData(form);
    const myForm = {};
    await payload.forEach((value, key) => (myForm[key] = value));

    fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myForm),
    });
    alert("게시글이 작성 되었습니다.");
  });
}

// window.onload = function () {
//   const form = document.getElementById("post-form");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const payload = new FormData(form);
//     const myForm = {};
//     await payload.forEach((value, key) => (myForm[key] = value));

//     fetch("http://localhost:8000/api/posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(myForm),
//     });
//     alert("게시글이 작성 되었습니다.");
//   });
// };
