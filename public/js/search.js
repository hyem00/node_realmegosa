const openModalBtn = document.getElementById("openModalBtn");
const searchModal = document.getElementById("searchModal");
const closeModal = document.querySelector(".close");

openModalBtn.addEventListener("click", function () {
  searchModal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  searchModal.style.display = "none";
});

function searchBtn() {
  fetch("http://localhost:8000/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {return response.json()})
    .then((data) => {
      let rows = data;
      // 검색어 filtering에 사용할 빈 배열 'array_for_filtering'를 생성합니다.
      let array_for_filtering = [];
      document.getElementById("cardLists").innerHTML = "";

      // HTML에서 ID가 "search_input"인 요소의 값을 가져와서 'search_string' 변수에 할당합니다.
      // 이는 사용자가 입력한 검색어를 나타냅니다.
      let search_string = document.querySelector("#bbisearch").value;
      console.log(search_string)
      // 검색어를 소문자로 변환하여 'lower_search' 변수에 할당합니다.
      let lower_search = search_string.toLowerCase();

      // 'rows' 배열을 반복하여 각 게시글 제목을 소문자로 변환하여 'array_for_filtering' 배열에 추가합니다.
      for (i = 0; i < rows.length; i++) {
        array_for_filtering.push(rows[i]["title"].toLowerCase());
      }

      // 'array_for_filtering' 배열에서 검색어를 포함하는 게시글 제목만 filtering하여,
      // 새로운 배열인 'filtered_title_array'를 생성합니다.
      let filtered_title_array = array_for_filtering.filter(function (
        this_post
      ) {
        return this_post.includes(lower_search);
      });

      // 'filtered_title_array'가 비어있을 경우, "해당 게시글을 찾을 수 없습니다!"라는 알림이 표시됩니다.
      if (filtered_title_array.length == 0) {
        alert("해당 게시글을 찾을 수 없습니다!");
        return;
      }

      // 검색어가 입력되지 않았을 경우, "게시글의 제목을 입력해주세요!"이라는 알림이 표시됩니다.
      if (search_string == false) {
        alert("게시글의 제목을 입력해주세요!");
        return;
      }

      rows.forEach((a) => {
        let title = a["title"];
        // 현재 영화 제목을 소문자로 변환하여 'lower_title' 변수에 저장합니다.
        // 이는 검색어를 소문자로 변환하여 대소문자 구분 없이 검색을 수행하기 위함입니다.
        let lower_title = title.toLowerCase();
        let content = a["content"];
        let createdAt = a["createdAt"];
        let nickname = a["nickname"];

        let temp_html = `
        <div id="box" onclick="detailPost()" >
          <img class="img" src="../img/pexels-photo-3138578.jpeg" alt="나중에 이미지">
          <p class="heading">${title}</p>
          <p class="texts">${content}</p>
          <div class="data">
            <span class="date">${createdAt}</span>
            <span class="nickname">${nickname}</span>
          </div>
        </div>`;
        // 현재 게시글 제목이 검색어를 포함하는 경우에만 다음 내용을 실행합니다.
        if (lower_title.includes(lower_search)) {
          // 모달 창 닫힘.
          searchModal.style.display = "none";
          document
            .getElementById("cardLists")
            .insertAdjacentHTML("beforeend", temp_html);
        }
      });
    });
}
