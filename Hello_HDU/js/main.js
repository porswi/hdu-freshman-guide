// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== 移动端菜单 =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// 点击链接后关闭菜单
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== 数字滚动计数器 =====
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step     = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, step);
}

// 用 IntersectionObserver 触发，只跑一次
setTimeout(() => {
  document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
}, 400);

// ===== 院系卡片颜色注入 =====
document.querySelectorAll('.college-card[data-color]').forEach(card => {
  card.style.setProperty('--card-color', card.dataset.color);
});

// ===== 校园生活 Tab 切换 =====
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});

// ===== 滚动入场动画 =====
const fadeTargets = [
  '.info-card', '.college-card', '.life-card',
  '.timeline-item', '.contact-card', '.about-text p',
  '.tips-box', '.section-header'
];

fadeTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('fade-up');
  });
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // 同批次元素错开出现
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0));
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  // 同一父容器内的兄弟元素依次延迟
  el.dataset.delay = (i % 4) * 80;
  fadeObserver.observe(el);
});

// ===== 导航高亮当前区块 =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.background = '';
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.background = '#eff6ff';
          a.style.color = 'var(--primary)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
