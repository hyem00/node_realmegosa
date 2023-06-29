// document.addEventListener("DOMContentLoaded", function () {
//   const config = {
//     method: "get",
//   };
// const url = window.location.href;
//   //   urlSearchParams.get("post_id");
//   //   console.log("들어옴" + url);
//   // 페이지 넘어올때 페이지아이디 가지고 넘어와서 데이터 찾아서 뿌려주는 방식 해야함
//   // 현재 뉴스피드에서 글 클릭하면 페이지 로드하게끔 설계되어있음
//   // 현재 html만 로드되게 되어있음 board_view_wrap 뒤에 붙여줘야함
//   fetch("http://localhost:8000/api/posts", config)
//     .then((response) => response.json())
//     .then((data) =>
//       $.ajax({
//         type: "GET",
//         url: "http://localhost:8000/api/posts",
//         data: { data },
//         success: function (response) {
//           let rows = response;
//           const result = rows.find((x) => (x.post_id = post_id));
//           console.log(result);
//           $("#board_view_wrap").empty();
//           //   for (let i = rows.length - 1; i >= 0; i--) {
//           //     let post_id = rows[i]["post_id"];
//           //     let user_id = rows[i]["user_id"];
//           //     let title = rows[i]["title"];
//           //     let content = rows[i]["content"];
//           //     let category = rows[i]["category"];
//           //     let foodtype = rows[i]["foodtype"];
//           //     let createdAt = rows[i]["createdAt"];

//           //     let temp_html = `
//           //                <div class="board_view">
//           //                 <div class="title">제목을 입력해주세요.</div>
//           //                 <div class="info">
//           //                   <dl>
//           //                     <dt>번호</dt>
//           //                     <dd>1</dd>
//           //                   </dl>
//           //                   <dl>
//           //                     <dt>닉네임</dt>
//           //                     <dd>장블리</dd>
//           //                   </dl>
//           //                   <dl>
//           //                     <dt>작성일</dt>
//           //                     <dd>2023.06.29</dd>
//           //                   </dl>
//           //                   <dl>
//           //                     <dt>좋아요</dt>
//           //                     <dd>33</dd>
//           //                   </dl>
//           //                 </div>
//           //                 <div class="cont">
//           //                   글 내용이 들어갑니다<br/>
//           //                   글 내용이 들어갑니다<br/>
//           //                   글 내용이 들어갑니다<br/>
//           //                   글 내용이 들어갑니다<br/>
//           //                   글 내용이 들어갑니다<br/>
//           //                   글 내용이 들어갑니다<br/>
//           //                   글 내용이 들어갑니다<br/>
//           //                   글 내용이 들어갑니다
//           //                 </div>
//           //               </div>

//           //                   `;
//           //     $("#board_view_wrap").append(temp_html);
//           //   }
//         },
//       })
//     )
//     .catch((error) => console.log(error));
// });

// // function detailpost() {
// //   const config = {
// //     method: "get",
// //   };
// //   fetch("http://localhost:8000/api/posts", config)
// //     .then((response) => response.json())
// //     .then((data) =>
// //       $.ajax({
// //         type: "GET",
// //         url: "http://localhost:8000/api/posts",
// //         data: { data },
// //         success: function (response) {
// //           let rows = response;
// //           console.log(rows);
// //           $("#board_view_wrap").empty();
// //           for (let i = rows.length - 1; i >= 0; i--) {
// //             let post_id = rows[i]["post_id"];
// //             let user_id = rows[i]["user_id"];
// //             let title = rows[i]["title"];
// //             let content = rows[i]["content"];
// //             let category = rows[i]["category"];
// //             let foodtype = rows[i]["foodtype"];
// //             let createdAt = rows[i]["createdAt"];

// //             //
// //             let temp_html = `
// //             <!-- <div class="board_view">
// //             <div class="title">제목을 입력해주세요.</div>
// //             <div class="info">
// //               <dl>
// //                 <dt>번호</dt>
// //                 <dd>1</dd>
// //               </dl>
// //               <dl>
// //                 <dt>닉네임</dt>
// //                 <dd>장블리</dd>
// //               </dl>
// //               <dl>
// //                 <dt>작성일</dt>
// //                 <dd>2023.06.29</dd>
// //               </dl>
// //               <dl>
// //                 <dt>좋아요</dt>
// //                 <dd>33</dd>
// //               </dl>
// //             </div>
// //             <div class="cont">
// //               글 내용이 들어갑니다<br/>
// //               글 내용이 들어갑니다<br/>
// //               글 내용이 들어갑니다<br/>
// //               글 내용이 들어갑니다<br/>
// //               글 내용이 들어갑니다<br/>
// //               글 내용이 들어갑니다<br/>
// //               글 내용이 들어갑니다<br/>
// //               글 내용이 들어갑니다
// //             </div> -->
// //           </div>

// //               `;
// //             $("#board_view_wrap").append(temp_html);
// //           }
// //         },
// //       })
// //     )
// //     .catch((error) => console.log(error));
// // }
