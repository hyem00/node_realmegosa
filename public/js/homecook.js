async function homecook() {
  const config = {
    method: "get",
  };
  await fetch("http://localhost:8000/api/posts", config)
    .then((response) => response.json())
    .then((data) =>
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/posts",
        data: { data },
        success: function (response) {
          let rows = response;
          $("#cardLists").empty();
          const result = rows.filter((x) => x.category === "homecook");
          console.log(result);
          for (let i = result.length - 1; i >= 0; i--) {
            let post_id = result[i]["post_id"];
            let user_id = result[i]["user_id"];
            let title = result[i]["title"];
            let content = result[i]["content"];
            let category = result[i]["category"];
            let foodtype = result[i]["foodtype"];
            let createdAt = result[i]["createdAt"];
            let a = createdAt.substring(0, 10);
            //닉네임 고치기
            let nickname = result[i]["nickname"];
            let temp_html = `
                <div id="box" data-post-id="${post_id}">
                 <img class="img" src="../img/pexels-photo-3138578.jpeg" alt="나중에 이미지">
                <p class="heading">${title}</p>
               <p class="texts">
               ${content}
                  </p>
                  <div class="data"></div>
                  <span class="date">${a}</span>
                 <span class="nickname">${nickname}</span>
                </div>
               </div>
                `;
            $("#cardLists").append(temp_html);
          }
        },
      })
    )
    .catch((error) => console.log(error));
}
