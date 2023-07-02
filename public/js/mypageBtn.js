function mypagePost() {
  fetch("http://localhost:8000/apis/myuser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
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
            <div class="right">
              <div class="loginId">아이디
                <div>${nickname}</div>
              </div >
              <div class="mynickname">닉네임
                <input name="nickname" id = "nicknamedy" value="${nickname}">
              </div>
            </div>
        </div>
        <textarea placeholder="소개글을 작성해주세요." class="commenttext" id="commenttext">${comment}</textarea>
        <button type="submit" id="myupdateBtn" onclick="test()">수정 완료</button>
        `;
      $("#profile_wrap").append(temp_html);
    });
}
mypagePost();
