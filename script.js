// script.js: 페이지별 동작 및 서버 연동(스프레드시트 연동은 추후 구현 필요)

// 예시: 폼 제출 방지 및 안내
if (document.getElementById('teacher-signup-form')) {
  document.getElementById('teacher-signup-form').onsubmit = function(e) {
    e.preventDefault();
    alert('회원가입 기능은 추후 구현됩니다.');
  };
}
if (document.getElementById('teacher-login-form')) {
  document.getElementById('teacher-login-form').onsubmit = function(e) {
    e.preventDefault();
    alert('로그인 기능은 추후 구현됩니다.');
  };
}
if (document.getElementById('student-login-form')) {
  document.getElementById('student-login-form').onsubmit = function(e) {
    e.preventDefault();
    alert('학생 로그인 기능은 추후 구현됩니다.');
  };
}
if (document.getElementById('class-select-form')) {
  document.getElementById('search-btn').onclick = function() {
    alert('조회 기능은 추후 구현됩니다.');
  };
  document.getElementById('register-btn').onclick = function() {
    alert('등록 기능은 추후 구현됩니다.');
  };
}
if (document.getElementById('excel-upload')) {
  document.getElementById('excel-upload').onchange = function() {
    alert('엑셀 업로드 기능은 추후 구현됩니다.');
  };
}
if (document.getElementById('board-form')) {
  document.getElementById('board-form').onsubmit = function(e) {
    e.preventDefault();
    alert('게시판 글쓰기 기능은 추후 구현됩니다.');
  };
}

// 문의사항 게시판 페이징 및 글쓰기 UI
const BOARD_STORAGE_KEY = 'board-posts';
const POSTS_PER_PAGE = 20;

function getPosts() {
  return JSON.parse(localStorage.getItem(BOARD_STORAGE_KEY) || '[]');
}
function setPosts(posts) {
  localStorage.setItem(BOARD_STORAGE_KEY, JSON.stringify(posts));
}

function renderBoard(page = 1) {
  const boardList = document.getElementById('board-list');
  const pagination = document.getElementById('pagination');
  if (!boardList || !pagination) return;
  const posts = getPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, end);
  let html = '<ul>';
  if (pagePosts.length === 0) {
    html += '<li>게시글이 없습니다.</li>';
  } else {
    pagePosts.forEach((post, idx) => {
      html += `<li>${start + idx + 1}. ${post.title}</li>`;
    });
  }
  html += '</ul>';
  boardList.innerHTML = html;
  // 페이지네이션
  let pHtml = '';
  for (let i = 1; i <= totalPages; i++) {
    pHtml += `<button class="${i === page ? 'active' : ''}" onclick="renderBoard(${i})">${i}</button>`;
  }
  pagination.innerHTML = pHtml;
}

if (document.getElementById('board-list')) {
  renderBoard();
}

// 글쓰기 버튼 및 폼
if (document.getElementById('write-btn')) {
  const writeBtn = document.getElementById('write-btn');
  const boardForm = document.getElementById('board-form');
  const cancelBtn = document.getElementById('cancel-btn');
  writeBtn.onclick = () => {
    boardForm.style.display = 'flex';
    writeBtn.style.display = 'none';
  };
  cancelBtn.onclick = () => {
    boardForm.style.display = 'none';
    writeBtn.style.display = 'block';
  };
  boardForm.onsubmit = function(e) {
    e.preventDefault();
    const title = boardForm.title.value.trim();
    const content = boardForm.content.value.trim();
    if (!title || !content) return;
    const posts = getPosts();
    posts.unshift({ title, content, date: new Date().toISOString() });
    setPosts(posts);
    boardForm.reset();
    boardForm.style.display = 'none';
    writeBtn.style.display = 'block';
    renderBoard(1);
  };
}
