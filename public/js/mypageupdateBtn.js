function test() {
const mynickname = document.querySelector("#nicknamedy").value
const commenttext = document.querySelector("#commenttext").value
console.log(mynickname )
console.log(commenttext )

    fetch("http://localhost:8000/apis/myuser", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nickname : mynickname,comment : commenttext}),
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        if (res.errorMessage === "해당 유저가 존재하지 않습니다.") {
                alert("해당 유저가 존재하지 않습니다.");
            } 
            else {
                alert("수정완료.");
                location.href = `http://localhost:8000/main`;
            }
    });
}

