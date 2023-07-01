function detailpost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");

  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`http://localhost:8000/api/posts/${postId}`, config)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let rows = data;
      $("#detailpost").empty();
      let post_id = rows.post_id;
      let user_id = rows["user_id"];
      let title = rows["title"];
      let content = rows["content"];
      // let category = rows["category"];
      let foodtype = rows["foodtype"];
      let createdAt = rows["createdAt"];
      let nickname = rows["nickname"];

      let temp_html = `
                  <div class="board_title">
                  <p>우리 음식으로 소통해요! "메뉴를 고민하는 사람들" , MEGOSA!</p>
                  </div>
                  <div class="board_view">
                   <div class="title">${title}</div>
                   <div class="info">
                     <dl>
                       <dt>카테고리</dt>

                     </dl>
                     <dl>
                       <dt>닉네임</dt>
                       <dd>${nickname}</dd>
                     </dl>
                     <dl>
                       <dt>작성일</dt>
                       <dd>${createdAt}</dd>
                     </dl>
                   </div>
                   <div class="cont">
                   ${content}
                   </div>
                 </div>
                 <div class="bt_wrap" id="bt_wrap">
                  <button id="updateBtn" onclick="postUpdate()">수정</button>
                  <button id="deleteBtn" onclick="deleteBtn(${post_id})">삭제</button>
                 </div>
                `;
      $("#detailpost").append(temp_html);
    });
}

detailpost();
