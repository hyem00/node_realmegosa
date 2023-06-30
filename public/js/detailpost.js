const d = document.getElementById("box");

d.addEventListener("click", function (event) {
  const config = {
    method: "get",
  };
  const url = window.location.href;
  const apost_id = Number(url.substr(url.length - 1));
  fetch("http://localhost:8000/api/posts", config)
    .then((response) => response.json())
    .then((data) =>
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/posts",
        data: { data },
        success: function (response) {
          let rows = response;
          console.log(apost_id);
          const result = rows.find((x) => (x.post_id = apost_id));
          $(".board_view_wrap").empty();
          let temp_html = `
            <div class="board_view">
             <div class="title">${result.title}</div>
             <div class="info">
               <dl>
                 <dt>카테고리</dt>
                 <dd>${result.category}</dd>
               </dl>
               <dl>
                 <dt>닉네임</dt>
                 <dd>${result.nickname}</dd>
               </dl>
               <dl>
                 <dt>작성일</dt>
                 <dd>${result.createdAt}</dd>
               </dl>
             </div>
             <div class="cont">
             ${result.content}
             </div>
           </div>
               `;
          $(".board_view_wrap").append(temp_html);
        },
      })
    )
    .catch((error) => console.log(error));
});
