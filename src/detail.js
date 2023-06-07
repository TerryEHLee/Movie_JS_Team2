/* detail HTML UPDATE & */
const displayDetail = (data) => {
  const containerDetail = document.querySelector("#movie-info");
  //console.log(movie);
  let movieDetail = createMovieDetail(data.movie);
  //console.log(movieDetail);
  containerDetail.innerHTML = movieDetail;
};

/*detail 페이지를 구성할 HTML*/

const createMovieDetail = (movie) => {
  //console.log(movie.poster_path);
  let detail_html = `
        <img
        src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
        alt="영화이미지"
        class="movie-img"
    />
    <div class="movie-info">
        <h4 class="movie-rate">⭐ ${movie.vote_average}</h4>
        <h2 class="movie-title">${movie.original_title}</h2>
        <h3 class="movie-desc">
        ${movie.overview}
        </h3>
    </div>
      `;
  return detail_html;
};

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // 영화 id 출력됨
  let movie = JSON.parse(localStorage.getItem(id));
  //console.log(id);
  //console.log(movie);
  displayDetail(movie);
});

// ----------------------------------------------------------------------------------
/* 리뷰 */
const posting = () => {
  const textarea = document.getElementById("write-comment");
  const password = document.getElementById("comment-pw1");
  const writer = document.getElementById("comment-name");
  const urlParams = new URLSearchParams(window.location.search);

  const review = textarea.value;
  const name = writer.value;
  const pw = password.value;
  const id = urlParams.get("id");

  let movie = localStorage.getItem(id); // 이전에 저장된 movie 데이터 가져오기
  movie = movie ? JSON.parse(movie) : {};

  // 기존 댓글이 있을 경우에는 배열에 추가, 없을 시 새로운 배열로 추가
  if (movie.comments) {
    movie.comments.push({ review, name, pw });
  } else {
    movie.comments = [{ review, name, pw }];
  }
  localStorage.setItem(id, JSON.stringify(movie));

  alert("리뷰가 저장되었습니다.");

  textarea.value = ""; // 입력값 초기화
  password.value = "";
  writer.value = "";
};

// --------------------------------------------------------------------------------------------------------------

// const displayComments = () => {
//   // 이전에 저장된 댓글 가져오기
//   const urlParams = new URLSearchParams(window.location.search);
//   const id = urlParams.get("id");

//   let movie = localStorage.getItem(id); // 이전에 저장된 movie 데이터 가져오기
//   movie = movie ? JSON.parse(movie) : {};

//   // 리뷰들을 가져오기 위해 movie 객체 내의 review 배열을 참조합니다.
//   const reviews = movie.review || [];

//   // 댓글을 표시할 HTML 요소 선택
//   const reviewContainer = document.getElementById("review-comment");

//   // 댓글 템플릿 생성
//   const commentsHTML = reviews.map((review) => {
//     return `
//     <p class="review-comment" id="review-comment">${review}</p>
//     `;
//   });

//   // 댓글을 HTML에 삽입
//   reviewContainer.innerHTML = commentsHTML.join("");
// };

// // 페이지 로드 시 댓글 표시
// window.onload = function () {
//   displayComments();
// };

// ---------------------------------------------------------------------------------------------------------------
// 1. 리뷰 저장
//     1. id를 key으로 저장되어 있던 데이터에 review 배열 추가
//        객체 불러오기-> 객체에 value 추가 -> 객체 저장

//         1. 기존에 배열이 있을 시 배열에 객체 추가, 기존 배열 없을 시 배열 추가
//         2. 입력값 없을 시 유효성 검사
//         3. 저장 후 input 값 없애기
// 2. 리뷰 불러오기
//     1. card id 와 비교하여 일치하는 key 내의 review 배열 내의 객체를 listing