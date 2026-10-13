/* ============================================================
 * 壁纸画廊 - 主脚本
 * 功能：壁纸数据维护、动态渲染卡片、点击预览模态框、加载更多
 * ============================================================ */

// ============ 1. 壁纸数据（使用 picsum.photos 占位图） ============
const wallpapers = [
  { id: 1, title: '宁静湖泊', category: '风景', seed: 'lake1', w: 800, h: 1000 },
  { id: 2, title: '城市霓虹', category: '城市', seed: 'city1', w: 800, h: 600 },
  { id: 3, title: '极简几何', category: '极简', seed: 'mini1', w: 800, h: 800 },
  { id: 4, title: '山林晨雾', category: '风景', seed: 'mount1', w: 800, h: 1100 },
  { id: 5, title: '动漫少女', category: '动漫', seed: 'anime1', w: 800, h: 1000 },
  { id: 6, title: '色彩流体', category: '抽象', seed: 'abs1', w: 800, h: 600 },
  { id: 7, title: '科技未来', category: '科技', seed: 'tech1', w: 800, h: 900 },
  { id: 8, title: '小猫写真', category: '动物', seed: 'cat1', w: 800, h: 800 },
  { id: 9, title: '雪山日出', category: '风景', seed: 'mount2', w: 800, h: 1000 },
  { id: 10, title: '夜空银河', category: '风景', seed: 'sky1', w: 800, h: 1200 },
  { id: 11, title: '未来城市', category: '城市', seed: 'city2', w: 800, h: 1000 },
  { id: 12, title: '抽象油画', category: '抽象', seed: 'abs2', w: 800, h: 800 },
];

// 每页显示数量
const PAGE_SIZE = 8;
let currentIndex = 0;
let activeCategory = '全部';

// ============ 2. 获取 DOM ============
const grid = document.getElementById('wallpaper-grid');
const loadMoreBtn = document.getElementById('load-more');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalMeta = document.getElementById('modal-meta');
const modalDownload = document.getElementById('modal-download');
const closeBtn = document.getElementById('close-modal');
const categoryBtns = document.querySelectorAll('#categories button');

// ============ 3. 构造图片 URL ============
function getImageUrl(item, w, h) {
  return `https://picsum.photos/seed/${item.seed}/${w}/${h}`;
}

// ============ 4. 渲染单张卡片 ============
function renderCard(item, index) {
  const card = document.createElement('div');
  card.className = 'wallpaper-card';
  card.style.animationDelay = `${index * 0.05}s`;

  card.innerHTML = `
    <img src="${getImageUrl(item, item.w, item.h)}" alt="${item.title}" loading="lazy" />
    <div class="card-overlay">
      <span class="card-tag">${item.category}</span>
      <div class="card-info">
        <h3 class="font-semibold text-lg">${item.title}</h3>
        <p class="text-xs text-white/70 mt-1">${item.w} × ${item.h} · 高清</p>
      </div>
    </div>
    <a class="download-btn" href="${getImageUrl(item, 1920, 1080)}" download title="下载壁纸">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </a>
  `;

  // 点击卡片打开预览
  card.addEventListener('click', (e) => {
    // 点击下载按钮不触发预览
    if (e.target.closest('.download-btn')) return;
    openModal(item);
  });

  return card;
}

// ============ 5. 渲染一批卡片 ============
function renderBatch() {
  // 按分类筛选
  const filtered = activeCategory === '全部'
    ? wallpapers
    : wallpapers.filter(w => w.category === activeCategory);

  // 取本页数据
  const batch = filtered.slice(currentIndex, currentIndex + PAGE_SIZE);

  batch.forEach((item, i) => {
    grid.appendChild(renderCard(item, i));
  });

  currentIndex += batch.length;

  // 没有更多数据时隐藏按钮
  if (currentIndex >= filtered.length) {
    loadMoreBtn.textContent = '已经到底啦';
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
}

// ============ 6. 模态框逻辑 ============
function openModal(item) {
  modalImg.src = getImageUrl(item, 1600, 1000);
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalMeta.textContent = `1920 × 1080 · ${item.category}`;
  modalDownload.href = getImageUrl(item, 1920, 1080);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  modalImg.src = '';
  document.body.style.overflow = '';
}

// 关闭事件
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============ 7. 分类切换 ============
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 切换按钮样式
    categoryBtns.forEach(b => {
      b.className = 'px-5 py-2 rounded-full bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:border-indigo-300 hover:text-indigo-500 transition';
    });
    btn.className = 'px-5 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium shadow-md shadow-indigo-200';

    // 重置状态并重新渲染
    activeCategory = btn.textContent.trim();
    grid.innerHTML = '';
    currentIndex = 0;
    loadMoreBtn.textContent = '加载更多';
    loadMoreBtn.disabled = false;
    loadMoreBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    renderBatch();
  });
});

// ============ 8. 加载更多 ============
loadMoreBtn.addEventListener('click', renderBatch);

// ============ 9. 初始化首屏 ============
renderBatch();
