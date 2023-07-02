function mypage() {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://localhost:8000/apis/myuser", config)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let rows = data;
      $("#profile_wrap").empty();
      let nickname = rows.nickname;
      let comment = rows.comment;
      let image_url = rows.image_url;
      let temp_html = `
      <div class="profile_box1">
        <div type="file" id="image" name="image" accept="image/*" alt="이미지 파일 없음"></div>
        <div class="right">
          아이디 : <h1>id불러와야함 ㄱㄷ</h1>
          닉네임 : <p>${nickname}</p>
        </div>
      </div>
      <div class="commenttext" id="commenttext">${comment}</div>
      <button id="myupdateBtn" onclick="myupdate()">수정</button>
      `;
      $("#profile_wrap").append(temp_html);
    });
  fetch("http://localhost:8000/apis/posts/myuser", config)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let rows = data;
      $("#cardLists").empty();
      for (let i = rows.length - 1; i >= 0; i--) {
        let post_id = rows[i]["post_id"];
        let title = rows[i]["title"];
        let content = rows[i]["content"];
        let pimage_url = rows[i]["pimage_url"];
        let createdAt = rows[i]["createdAt"];
        let a = createdAt.substring(0, 10);
        let nickname = rows[i]["nickname"];

        let temp_html = `
      <div id="box" onclick="datailpostBtn(${post_id})">
          <img id="img" src="${pimage_url}" alt="나중에 이미지">
          <p class="heading">${title}</p>
          <p class="texts">${content}</p>
          <div class="data"></div>
          <span class="date">${a}</span>
          <span class="nickname">${nickname}</span>
      </div>`;
        $("#cardLists").append(temp_html);
      }
    });
}

mypage();
