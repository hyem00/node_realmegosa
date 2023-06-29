
const form = document.getElementById("signup");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = new FormData(form);

    console.log([...payload]);

    fetch("http://localhost:8000/api/users", {
        method : "POST",
        headers : {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body : JSON.stringify( payload )
    })
    .then(res => res.json())
    .then(data => console.log(data));
});

// user.html 에서 받은 id password passwordconfirm 정보를 FormData에 담아 POST 하려 했으나 실패함