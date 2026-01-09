document.addEventListener('DOMContentLoaded', () => {

  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =====================
     THEME TOGGLE
  ====================== */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      themeToggle.textContent =
        document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    });
  }

  /* =====================
     ORDER BUTTON
  ====================== */
  const orderBtn = document.getElementById('orderBtn');
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      launchConfetti();
      orderBtn.textContent = 'Ordered ✨';
      setTimeout(() => orderBtn.textContent = 'Order Now', 2500);
    });
  }

  /* =====================
     MENU → PRODUCT MODAL
  ====================== */
  document.querySelectorAll('.menu-grid li').forEach(li => {
    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      const name =
        li.dataset.name || li.querySelector('strong')?.textContent || '';

      const price = parseInt(
        li.dataset.price ||
        li.querySelector('span')?.textContent.replace(/[^\d]/g, '') ||
        0
      );

      const img =
        li.dataset.img || li.querySelector('img')?.src || '';

      const formatIDR = (value) =>
        new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(value);

      document.getElementById('modalName').textContent = name;
      document.getElementById('modalPrice').textContent = formatIDR(price);
      document.getElementById('buyPrice').textContent = formatIDR(price);
      document.getElementById('modalImg').src = img;
      document.getElementById('modalImg').alt = name;

      openModal('productModal');
    });
  });

  /* =====================
     BUY → PAYMENT MODAL
  ====================== */
  const buyBtn = document.getElementById('buyBtn');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      const item = document.getElementById('modalName').textContent;
      const price = document.getElementById('modalPrice').textContent;
      document.getElementById('payItem').textContent = `${item} — ${price}`;
      closeModal('productModal');
      openModal('paymentModal');
    });
  }

  /* =====================
     CONFIRM PAYMENT
  ====================== */
  const confirmPay = document.getElementById('confirmPay');
  if (confirmPay) {
    confirmPay.addEventListener('click', () => {
      closeModal('paymentModal');
      launchConfetti();
      setTimeout(() => alert('Payment confirmed — thank you! ✨'), 600);
    });
  }

});

/* =====================
   CONFETTI
===================== */
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti';
  document.body.appendChild(container);

  const colors = ['#FFD1E6','#C8F7FF','#FFF2C8','#FDE9FF','#E8FFD8'];

  for (let i = 0; i < 32; i++) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.width = Math.random() * 10 + 6 + 'px';
    el.style.height = Math.random() * 8 + 6 + 'px';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = '-10%';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.opacity = Math.random() * 0.9 + 0.3;
    el.style.borderRadius = Math.random() > .5 ? '50%' : '6px';
    el.style.transition = `transform ${2 + Math.random()}s, top ${2 + Math.random()}s`;
    container.appendChild(el);

    requestAnimationFrame(() => {
      el.style.top = (70 + Math.random() * 30) + '%';
      el.style.transform =
        `translateX(${(Math.random() - 0.5) * 30}vw) rotate(${Math.random() * 720}deg)`;
    });
  }

  setTimeout(() => container.remove(), 3000);
}

/* =====================
   CONTACT FORM
===================== */
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  alert(`Thanks ${name}! We'll get back to you ✨`);
  e.target.reset();
}

/* =====================
   MODAL UTILS
===================== */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (el) el.setAttribute('aria-hidden', 'true');
}

/* =====================
   GLOBAL CLOSE
===================== */
document.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) {
    const modal = e.target.closest('.modal');
    if (modal) closeModal(modal.id);
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document
      .querySelectorAll('.modal[aria-hidden="false"]')
      .forEach(m => closeModal(m.id));
  }
});
