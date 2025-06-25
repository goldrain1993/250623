// script.js: 페이지별 동작 및 서버 연동(스프레드시트 연동은 추후 구현 필요)

// 예시: 폼 제출 방지 및 안내
if (document.getElementById('teacher-signup-form')) {
  document.getElementById('teacher-signup-form').onsubmit = async function(e) {
    e.preventDefault();
    const id = this.id.value.trim();
    const name = this.name.value.trim();
    const password = this.password.value.trim();
    if (!id || !name || !password) {
      alert('모든 항목을 입력하세요.');
      return;
    }
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzOtdE0_jFDTRSzxTXWRlKC9EyOVPBVg2110p6yr0Qt8pKG7CP3oDI2_77aEdaPdwNUzg/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, password })
      });
      const result = await response.json();
      if (result.success) {
        alert('회원가입이 완료되었습니다!');
        window.location.href = 'teacher_login.html';
      } else {
        alert(result.message || '회원가입 실패');
      }
    } catch (err) {
      alert('서버 오류: ' + err);
    }
  };
}
if (document.getElementById('teacher-login-form')) {
  document.getElementById('teacher-login-form').onsubmit = async function(e) {
    e.preventDefault();
    const id = this.id.value.trim();
    const password = this.password.value.trim();
    if (!id || !password) {
      alert('ID와 비밀번호를 입력하세요.');
      return;
    }
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzOtdE0_jFDTRSzxTXWRlKC9EyOVPBVg2110p6yr0Qt8pKG7CP3oDI2_77aEdaPdwNUzg/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'login', id, password })
      });
      const result = await response.json();
      if (result.success) {
        alert('로그인 성공! ' + (result.name ? result.name + '님 환영합니다.' : ''));
        localStorage.setItem('teacherName', result.name || '');
        window.location.href = 'teacher_dashboard.html';
      } else {
        alert(result.message || '로그인 실패');
      }
    } catch (err) {
      alert('서버 오류: ' + err);
    }
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
      const postIdx = start + idx;
      html += `<li onclick="window.location='board_view.html?idx=${postIdx}'" style='cursor:pointer;'><strong>${post.title}</strong><br><span style='font-size:0.9em;color:#888;'>${new Date(post.date).toLocaleString()}</span></li>`;
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
if (document.getElementById('board-write-form')) {
  document.getElementById('board-write-form').onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('write-title').value.trim();
    const content = document.getElementById('write-content').value.trim();
    if (!title || !content) return;
    const posts = JSON.parse(localStorage.getItem('board-posts') || '[]');
    posts.unshift({ title, content, date: new Date().toISOString() });
    localStorage.setItem('board-posts', JSON.stringify(posts));
    alert('작성되었습니다.');
    window.location.href = 'board.html';
  };
}
