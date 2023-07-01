function detailview(post_id) {
  const config = {
    method: "get",
  };

  fetch("http://localhost:8000/api/posts/" + post_id, config)
    .then((response) => response.json())
    .then((data) =>
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/posts/" + post_id,
        data: { data },
        success: function () {
          let rows = [data];
          $("#cardLists").empty();
          for (let i = rows.length - 1; i >= 0; i--) {
            let post_id = rows[i]["post_id"];
            let user_id = rows[i]["user_id"];
            let title = rows[i]["title"];
            let content = rows[i]["content"];
            let category = rows[i]["category"];
            let foodtype = rows[i]["foodtype"];
            let createdAt = rows[i]["createdAt"];
            //닉네임 고치기
            let nickname = rows[i]["nickname"];

            let temp_html = `
            <div class="board_title">
            <p>우리 음식으로 소통해요! "메뉴를 고민하는 사람들" , MEGOSA!</p>
            </div>
            <div class="board_view">
             <div class="title">${title}</div>
             <div class="info">
               <dl>
                 <dt>카테고리</dt>
                 <dd>${category}</dd>
               </dl>
               <dl>
                 <dt>닉네임</dt>
                 <dd></dd>
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
            <button id="updateBtn" onclick="updateBtn(${post_id})">수정</button>
            <button id="deleteBtn" onclick="deleteBtn(${post_id})">삭제</button>
           </div>
          `;
            $("#cardLists").append(temp_html);
          }
        },
      })
    );
}
