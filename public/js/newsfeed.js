function newsfeed() {
  const config = {
    method: "get",
  };
  fetch("http://localhost:8000/api/posts", config)
    .then((response) => response.json())
    .then((data) =>
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/posts",
        data: { data },
        success: function (response) {
          let rows = response;
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
            <div id="box" data-post-id="${post_id}" onclick="detailview()">
             <img class="img" src="../img/pexels-photo-3138578.jpeg" alt="나중에 이미지">
            <p class="heading">${title}</p>
           <p class="texts">
           ${content}
              </p>
              <div class="data"></div>
              <span class="date">${createdAt}</span>
             <span class="nickname">${nickname}</span>
            </div>
           </div>
           <script>
           function detailview(){
            location.href = "http://localhost:8000/detailpost?&post_id=${post_id}"
           }
          </script>
            `;
            $("#cardLists").append(temp_html);
          }
          // $("#cardLists").on("click", "#box", function () {
          // let apost_id = $(this).data("post-id");
          // const result = rows.find((x) => x.post_id === apost_id);
          // $("#cardLists").empty();
          //   let temp_html = `
          //   <div class="board_title" onclick=datailview();>
          //   <p>우리 음식으로 소통해요! "메뉴를 고민하는 사람들" , MEGOSA!</p>
          //   </div>
          //   <div class="board_view">
          //    <div class="title">${result.title}</div>
          //    <div class="info">
          //      <dl>
          //        <dt>카테고리</dt>
          //        <dd>${result.category}</dd>
          //      </dl>
          //      <dl>
          //        <dt>닉네임</dt>
          //        <dd>${result.nickname}</dd>
          //      </dl>
          //      <dl>
          //        <dt>작성일</dt>
          //        <dd>${result.createdAt}</dd>
          //      </dl>
          //    </div>
          //    <div class="cont">
          //    ${result.content}
          //    </div>
          //  </div>
          //  <div class="bt_wrap" >
          //   <button id="updateBtn" onclick="updateview()">수정</button>
          //   <button id="deleteBtn">삭제</button>
          //  </div>
          //  <script>
          //  function datailview(){
          //   location.href = "http://localhost:8000/detailpost?&post_id=${result.post_id}"
          //  }
          // function updateview() {
          // location.href = "http://localhost:8000/update?&post_id=${result.post_id}"
          // }
          // </script>
          //   `;
          // $("#cardLists").append(temp_html);
          // });
        },
      })
    )
    .catch((error) => console.log(error));
}
