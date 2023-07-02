function mypage() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");
  
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    fetch(`http://localhost:8000/api/user/${userId}`, config)
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
                <div class="photo"><img src="${image_url}" ></div>
                <div class="right">
                    아이디 : <h1>${category}i</h1>
                    닉네임 : <p>${nickname}</p>
                </div>
                <button type="button" id="open_close">열기</button>
                <button type="button" id="correction">수정</button>
            </div>
            <div class="profile_box2">
                <a href="https://github.com/hyem00/node_realmegosa.git">GitHub</a>
                <a href="#">블로그</a>
                <textarea placeholder="코멘트를 입력해주세요." class="commenttext">${comment}</textarea>
                <button type="submit" class="commentBtn">확인</button>
            </div>`;
        $("#profile_wrap").append(temp_html);
      });

      fetch(`http://localhost:8000/api/posts/${userId}`, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let rows = data
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