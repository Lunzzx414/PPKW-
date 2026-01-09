// Small interactions: theme toggle, order button confetti, and contact form mock
document.addEventListener('DOMContentLoaded',()=>{
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click',()=>{
    document.documentElement.classList.toggle('dark');
    themeToggle.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  });

  const orderBtn = document.getElementById('orderBtn');
  orderBtn.addEventListener('click',()=>{
    launchConfetti();
    orderBtn.textContent = 'Ordered ✨';
    setTimeout(()=> orderBtn.textContent = 'Order Now', 2500);
  });
});

function launchConfetti(){
  const container = document.createElement('div');
  container.className = 'confetti';
  document.body.appendChild(container);
  const colors = ['#FFD1E6','#C8F7FF','#FFF2C8','#FDE9FF','#E8FFD8'];
  for(let i=0;i<32;i++){
    const el = document.createElement('div');
    el.style.position='absolute';
    el.style.width = Math.random()*10 + 6 + 'px';
    el.style.height = Math.random()*8 + 6 + 'px';
    el.style.left = Math.random()*100 + '%';
    el.style.top = '-10%';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.opacity = Math.random()*0.9 + 0.3;
    el.style.borderRadius = Math.random()>.5? '50%':'6px';
    el.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
    el.style.transition = `transform ${2+Math.random()*1.5}s cubic-bezier(.2,.8,.2,1), top ${2+Math.random()*1.5}s linear, opacity 1s ease`;
    container.appendChild(el);
    requestAnimationFrame(()=>{
      el.style.top = (70 + Math.random()*30) + '%';
      el.style.transform = `translateY(0) translateX(${(Math.random()-0.5)*30}vw) rotate(${Math.random()*720}deg)`;
    });
  }
  setTimeout(()=>{container.remove();},3000);
}

function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  alert(`Thanks ${name}! We'll get back to you ✨`);
  e.target.reset();
}

// Modal & purchase flow
function openModal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.setAttribute('aria-hidden','false');
}
function closeModal(el){
  if(typeof el === 'string') el = document.getElementById(el);
  if(!el) return;
  el.setAttribute('aria-hidden','true');
}

document.addEventListener('click', (e)=>{
  // close buttons / backdrop
  const close = e.target.closest('[data-close]');
  if(close){
    const modal = e.target.closest('.modal');
    if(modal) closeModal(modal.id);
  }
});

// open product modal from menu items
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-grid li').forEach(li => {
    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      const name = li.dataset.name || li.querySelector('strong')?.textContent;

      // ambil harga jadi angka (hapus $, Rp, titik, dll)
      const price = parseInt(
        li.dataset.price ||
        li.querySelector('span')?.textContent.replace(/[^\d]/g, '')
      );

      const img = li.dataset.img || li.querySelector('img')?.src;

      // format Rupiah
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
});

  // buy -> open payment
  document.getElementById('buyBtn').addEventListener('click', ()=>{
    const item = document.getElementById('modalName').textContent;
    const price = document.getElementById('modalPrice').textContent;
    document.getElementById('payItem').textContent = `${item} — ${price}`;
    closeModal('productModal');
    openModal('paymentModal');
  });

  // confirm payment (mock)
  document.getElementById('confirmPay').addEventListener('click', ()=>{
    closeModal('paymentModal');
    // small success flow
    const buyBtn = document.getElementById('orderBtn');
    launchConfetti();
    setTimeout(()=> alert('Payment confirmed — thank you! ✨'), 600);
  });

  // keyboard ESC to close
  document.addEventListener('keydown',(ev)=>{
    if(ev.key === 'Escape'){
      document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m=> closeModal(m.id));
    }
  });

});

