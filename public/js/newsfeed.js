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
          console.log(rows);
          $("#cardLists").empty();
          for (let i = rows.length - 1; i >= 0; i--) {
            let post_id = rows[i]["post_id"];
            let user_id = rows[i]["user_id"];
            let title = rows[i]["title"];
            let content = rows[i]["content"];
            let category = rows[i]["category"];
            let foodtype = rows[i]["foodtype"];
            let createdAt = rows[i]["createdAt"];
            let updatedAt = rows[i]["updatedAt"];

            let temp_html = `
            <div id="cards">
              <h4>${title}</h4>
              <div>${content}</div>
              <div>${updatedAt}</div>
            </div>
            `;
            $("#cardLists").append(temp_html);
          }
        },
      })
    )
    .catch((error) => console.log(error));
}

// function a() {
//   $.ajax({
//     type: "GET",
//     url: "/guestbook",
//     data: {},
//     success: function (response) {
//       // app.py #보여주기의 key 값인 names 를 함수 변수 response에 넣어주고 rows에 넣어줌
//       let rows = response["result"];
//       $("#comment-list").empty();

//       // [{name : 두혁, id: 123, 13살}, {병일, 3살}]
//       // i를 0으로 지정 rows.length = rows 의 길이만큼돌리고, i++ = i에 1추가, for = 이걸 반복
//       //[{0} {1} {2} {3}]
//       //for (let i = 0; i < rows.length; i++) {     //
//       for (let i = rows.length - 1; i >= 0; i--) {
//         let name = rows[i]["name"];
//         let id = rows[i]["_id"];
//         let comment = rows[i]["comment"];
//         let group = rows[i]["group"];
//         // console.log(rows)
//         // ${name} = rows[i]['name'] , ${id} = rows[i]['_id']
//         let temp_html = `
//         <div class="mycard" >
//           <div class="my-card-body">
//             <div class="blockquote mb-0">
//               <p id=${comment}>${comment}</p>
//               <footer class="blockquote-footer">${group}조 ${name}</footer>

//             </div>
//             <div class="delete_button_box" id='${id}'>
//                 <button onclick="delete_list(${id})" id="delete_button" type="button" class="btn btn-danger">
//                   삭제
//                 </button>
//                 <button onclick="onclickUpdateBtn(${id})" id="delete_button" type="button" class="btn btn-danger">
//                   수정
//                 </button>
//               </div>
//           </div>
//         </div>`;

//         $("#comment-list").append(temp_html);
//       }
//     },
//   });
// }
