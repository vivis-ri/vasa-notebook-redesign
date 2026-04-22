const projects = [
  {
    title: "너 여기 가야돼",
    description: "일정·장소 등록하면 위젯이 알려줘요. 너 n분 후에 여기 가야돼",
    tags: ["Android", "Widget", "일정관리"],
    images: ["./assets/projects/neoyogi.png"],
  },
  {
    title: "QuestLife",
    description: "todo + 알람 + 루틴을 게임처럼! ADHD를 위한 퀘스트형 일상 앱",
    tags: ["ADHD", "게임", "루틴"],
    images: ["./assets/projects/questlife.png"],
  },
  {
    title: "AutoMemo",
    description: "메모 내용을 자동으로 카테고리 분류하고 제목까지 작성해주는 사이트",
    tags: ["Claude", "메모", "자동화"],
    images: ["./assets/projects/auto-memo.png"],
    link: "https://autotomemo.netlify.app",
  },
  {
    title: "PDF to Blog",
    description: "PDF 넣으면 블로그 글로 바꿔주는 사이트",
    tags: ["Claude", "PDF", "블로그"],
    images: ["./assets/projects/pdf2blog.png"],
    link: "https://pdf2blog.streamlit.app",
  },
  {
    title: "브랜드 블로그 글 생성기",
    description: "브랜드 정보를 입력하면 맞춤 블로그 글을 자동 생성해주는 툴",
    tags: ["Claude API", "블로그", "마케팅"],
    images: ["./assets/projects/brand-blog.png"],
  },
  {
    title: "Font Lab",
    description: "로컬 폰트를 한눈에 비교할 수 있는 도구",
    tags: ["디자인", "폰트", "도구"],
    images: ["./assets/projects/font-lab.jpg"],
    link: "https://font-lab-delta.vercel.app",
  },
  {
    title: "Word Chat",
    description: "Word UI 기반 채팅 웹사이트",
    tags: ["Claude", "채팅", "UI"],
    images: [
      "./assets/projects/word-chat-1.jpg",
      "./assets/projects/word-chat-2.jpg",
      "./assets/projects/word-chat-3.jpg",
    ],
    link: "https://word-chat-l2aa.onrender.com",
  },
  {
    title: "PPT Chat",
    description: "PPT UI 기반 채팅 웹사이트",
    tags: ["Claude", "채팅", "UI"],
    images: ["./assets/projects/ppt-chat.png"],
    link: "https://ppt-chat.onrender.com",
  },
  {
    title: "X 알림 숨기기",
    description: "트위터 사용 중 불필요한 알림을 없애주는 크롬 확장프로그램",
    tags: ["크롬 확장", "트위터", "생산성"],
    images: ["./assets/projects/x-notice.jpg"],
    link: "https://chromewebstore.google.com",
  },
  {
    title: "함께하는 습관 트래커",
    description: "친구들과 함께 습관을 트래킹할 수 있는 사이트",
    tags: ["습관", "Firebase", "친구"],
    images: ["./assets/projects/habit-together-1.jpg", "./assets/projects/habit-together-2.jpg"],
    link: "https://habit-tracker-together.web.app",
  },
  {
    title: "imbroke",
    description: "잔고랑 월급날만 넣으면 하루에 얼마 쓸 수 있는지 바로 알려주는 사이트",
    tags: ["가계부", "예산", "생존"],
    images: ["./assets/projects/imbroke.jpg"],
    link: "https://imbroke.netlify.app",
  },
  {
    title: "SNS 카드뉴스 메이커",
    description: "구글 뉴스 기반으로 SNS용 카드뉴스를 자동 생성하는 프로그램",
    tags: ["뉴스", "카드뉴스", "자동화"],
    images: [],
  },
  {
    title: "인스타 카드뉴스 에이전트",
    description: "인스타그램 카드뉴스를 함께 만드는 AI 에이전트 팀",
    tags: ["인스타그램", "AI 에이전트", "카드뉴스"],
    images: ["./assets/projects/insta-card-news.png"],
  },
  {
    title: "블로그 자동발행 파이프라인",
    description: "블로그 주제 선정부터 작성, 예약발행까지 한 번에 처리해주는 사이트",
    tags: ["블로그", "자동화", "예약발행"],
    images: ["./assets/projects/blog-automation-web.png"],
  },
  {
    title: "블로그 소통 도우미",
    description: "키워드로 최신 글 검색, AI가 사람처럼 댓글 작성. 창 열어서 댓글 달면 리스트에서 자동 체크",
    tags: ["블로그", "AI 댓글", "소통"],
    images: ["./assets/projects/naver-comment-assistant.png"],
  },
  {
    title: "바이브코딩 AI 팀",
    description: "바이브코딩을 대신 해주는 AI 에이전트 팀",
    tags: ["AI 에이전트", "바이브코딩", "자동화"],
    images: [],
  },
];

const grid = document.querySelector("#portfolioGrid");
const modal = document.querySelector("#projectModal");
const modalMedia = document.querySelector("#modalMedia");
const modalControls = document.querySelector("#modalControls");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalTags = document.querySelector("#modalTags");
const modalLink = document.querySelector("#modalLink");
const slideCurrent = document.querySelector("#slideCurrent");
const slideTotal = document.querySelector("#slideTotal");
const closeTargets = document.querySelectorAll("[data-close]");
const slideButtons = document.querySelectorAll("[data-slide]");

let activeButton = null;
let activeProject = null;
let activeSlide = 0;

function createIcon(className) {
  const icon = document.createElement("span");
  icon.className = className;
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

function renderProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";

  const media = document.createElement("button");
  media.className = "project-media";
  media.type = "button";
  media.setAttribute("aria-label", `${project.title} 사진 크게 보기`);
  media.addEventListener("click", () => openModal(project, media));

  if (project.images.length) {
    const image = document.createElement("img");
    image.src = project.images[0];
    image.alt = `${project.title} 화면`;
    image.loading = index > 3 ? "lazy" : "eager";
    media.appendChild(image);

    if (project.images.length > 1) {
      const count = document.createElement("span");
      count.className = "image-count";
      count.textContent = `${project.images.length}장`;
      media.appendChild(count);
    }
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "project-placeholder";
    placeholder.textContent = project.title;
    media.appendChild(placeholder);
  }

  const body = document.createElement("div");
  body.className = "project-body";

  const number = document.createElement("p");
  number.className = "project-index";
  number.textContent = String(index + 1).padStart(2, "0");

  const title = document.createElement("h3");
  title.className = "project-title";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "project-desc";
  description.textContent = project.description;

  const tagList = document.createElement("div");
  tagList.className = "project-tags";
  project.tags.forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    tagList.appendChild(item);
  });

  const actions = document.createElement("div");
  actions.className = "project-actions";

  if (project.link) {
    const link = document.createElement("a");
    link.href = project.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.setAttribute("aria-label", `${project.title} 사이트 열기`);
    link.appendChild(createIcon("arrow-mark"));
    actions.appendChild(link);
  }

  body.append(number, title, description, tagList);
  if (project.link) {
    body.appendChild(actions);
  }
  card.append(media, body);
  return card;
}

function renderGrid() {
  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => fragment.appendChild(renderProjectCard(project, index)));
  grid.appendChild(fragment);
}

function renderModalImage() {
  modalMedia.replaceChildren();

  if (activeProject.images.length) {
    const image = document.createElement("img");
    image.src = activeProject.images[activeSlide];
    image.alt = `${activeProject.title} 화면 ${activeSlide + 1}`;
    modalMedia.appendChild(image);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "project-placeholder";
    placeholder.textContent = activeProject.title;
    modalMedia.appendChild(placeholder);
  }

  slideCurrent.textContent = String(activeSlide + 1);
  slideTotal.textContent = String(Math.max(activeProject.images.length, 1));
  modalControls.hidden = activeProject.images.length <= 1;
}

function openModal(project, button) {
  activeButton = button;
  activeProject = project;
  activeSlide = 0;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.replaceChildren();

  project.tags.forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    modalTags.appendChild(item);
  });

  if (project.link) {
    modalLink.href = project.link;
    modalLink.hidden = false;
  } else {
    modalLink.hidden = true;
  }

  renderModalImage();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (activeButton) {
    activeButton.focus();
  }
}

function moveSlide(direction) {
  if (!activeProject || activeProject.images.length <= 1) return;
  activeSlide = (activeSlide + direction + activeProject.images.length) % activeProject.images.length;
  renderModalImage();
}

closeTargets.forEach((target) => {
  target.addEventListener("click", closeModal);
});

slideButtons.forEach((button) => {
  button.addEventListener("click", () => moveSlide(Number(button.dataset.slide)));
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) return;

  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowLeft") moveSlide(-1);
  if (event.key === "ArrowRight") moveSlide(1);
});

renderGrid();
