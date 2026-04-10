/* ── LOADER ── */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 2000);
});

/* ── PARTICLES ── */
const pc = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-duration: ${6 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: 0;
        background: ${['#a78bfa', '#06b6d4', '#f472b6', '#34d399'][Math.floor(Math.random() * 4)]};
    `;
    pc.appendChild(p);
}

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('#hero, #about, #skills, #projects, #blog, #contact');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    sections.forEach(s => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === '#' + s.id) a.classList.add('active');
            });
        }
    });
});

/* ── THEME ── */
function toggleTheme() {
    const h = document.documentElement;
    const t = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    h.setAttribute('data-theme', t);
    document.getElementById('themeToggle').textContent = t === 'dark' ? '🌙' : '☀️';
}

/* ── MOBILE MENU ── */
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const burger = document.getElementById('hamburger');
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    if (menu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('mobileMenu').classList.remove('open');
        document.getElementById('hamburger').classList.remove('open');
        document.body.style.overflow = '';
    }
});

/* ── TYPED ── */
const phrases = ['UI/UX Designer', 'Product Thinker', 'Design Systems Architect', 'User Advocate', 'Interaction Designer'];
let pi = 0, ci = 0, del = false;

function typeIt() {
    const el = document.getElementById('typed');
    if (!el) return;
    const ph = phrases[pi];
    if (!del && ci < ph.length) {
        el.textContent = ph.slice(0, ++ci);
        setTimeout(typeIt, 70);
    } else if (!del && ci === ph.length) {
        del = true;
        setTimeout(typeIt, 2000);
    } else if (del && ci > 0) {
        el.textContent = ph.slice(0, --ci);
        setTimeout(typeIt, 40);
    } else {
        del = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(typeIt, 500);
    }
}

setTimeout(typeIt, 1800);

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('shown');
            if (e.target.querySelectorAll('.skill-fill').length) {
                e.target.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.dataset.w);
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => ro.observe(el));



/* ── PROJECT FILTER ── */
function filterProj(btn, cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.proj-card').forEach(c => {
        if (cat === 'all' || c.dataset.cat === cat) {
            c.classList.remove('faded');
        } else {
            c.classList.add('faded');
        }
    });
}

/* ── MODALS ── */
function closeModal() {
    document.getElementById('projectModal').classList.remove('open');
    document.body.style.overflow = '';
}

function openSecureCloudModal() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="section-label">Deep Dive</div>
        <h2 class="section-title" style="font-size: 2rem; margin-bottom: 1rem;">Secure Cloud Data Storage</h2>
        <p style="color: var(--muted); margin-bottom: 2rem; line-height: 1.8;">
            The goal was to build a secure cloud data storage application using hybrid encryption (AES + RSA). 
            The challenge was maintaining a high level of cryptographic security while keeping the interface modern, 
            intuitive, and highly responsive through an advanced glassmorphism-inspired web UI.
        </p>
        <div class="case-meta" style="display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem; padding: 1.25rem; background: var(--glass); border-radius: var(--r); border: 1px solid var(--border);">
            <div class="case-meta-item" style="font-size: 0.82rem;"><span style="display: block; color: var(--subtle); font-family: var(--ff-mono); font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 4px;">Project</span><strong style="color: var(--text);">Secure Cloud Storage</strong></div>
            <div class="case-meta-item" style="font-size: 0.82rem;"><span style="display: block; color: var(--subtle); font-family: var(--ff-mono); font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 4px;">Role</span><strong style="color: var(--text);">Lead Developer & UI Designer</strong></div>
            <div class="case-meta-item" style="font-size: 0.82rem;"><span style="display: block; color: var(--subtle); font-family: var(--ff-mono); font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 4px;">Platform</span><strong style="color: var(--text);">Web Platform</strong></div>
            <div class="case-meta-item" style="font-size: 0.82rem;"><span style="display: block; color: var(--subtle); font-family: var(--ff-mono); font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 4px;">Tools</span><strong style="color: var(--text);">Flask, AES + RSA Encryption, SQLite</strong></div>
        </div>

        <!-- NEW INFO SECTIONS -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
            <!-- Key Features -->
            <div style="background: var(--glass2); padding: 1.5rem; border-radius: var(--rL); border: 1px solid var(--border2); text-align: left; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
                <h4 style="font-family: var(--ff-head); font-size: 1.2rem; margin-bottom: 1.25rem; color: var(--text);"><i class="fas fa-star" style="color: var(--a1); margin-right: 8px;"></i> Key Features</h4>
                <ul style="list-style: none; padding: 0; color: var(--muted); font-size: 0.9rem; line-height: 1.8;">
                    <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--a4); margin-right: 8px;"></i> Role-Based Access Control (Admin, User)</li>
                    <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--a4); margin-right: 8px;"></i> Secure File Management & Sharing</li>
                    <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--a4); margin-right: 8px;"></i> Comprehensive Audit Logs</li>
                    <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--a4); margin-right: 8px;"></i> Responsive Admin Dashboard</li>
                </ul>
            </div>
            <!-- Security Features -->
            <div style="background: var(--glass2); padding: 1.5rem; border-radius: var(--rL); border: 1px solid var(--border2); text-align: left; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
                <h4 style="font-family: var(--ff-head); font-size: 1.2rem; margin-bottom: 1.25rem; color: var(--text);"><i class="fas fa-shield-alt" style="color: var(--a3); margin-right: 8px;"></i> Security Architecture</h4>
                <ul style="list-style: none; padding: 0; color: var(--muted); font-size: 0.9rem; line-height: 1.8;">
                    <li style="margin-bottom: 8px;"><i class="fas fa-lock" style="color: var(--a3); margin-right: 8px;"></i> Hybrid Encryption (AES-256 + RSA-2048)</li>
                    <li style="margin-bottom: 8px;"><i class="fas fa-lock" style="color: var(--a3); margin-right: 8px;"></i> Secure Key Management System</li>
                    <li style="margin-bottom: 8px;"><i class="fas fa-lock" style="color: var(--a3); margin-right: 8px;"></i> Encrypted Local Storage & Database</li>
                    <li style="margin-bottom: 8px;"><i class="fas fa-lock" style="color: var(--a3); margin-right: 8px;"></i> Session Handling & Authentication</li>
                </ul>
            </div>
        </div>

        <div style="margin-top: 3.5rem;">
            <h4 style="font-family: var(--ff-head); font-size: 1.25rem; margin-bottom: 1.5rem; color: var(--text);">Technologies Used</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.8rem;">
                <span style="background: rgba(0,240,255,0.08); color: var(--a1); border: 1px solid rgba(0,240,255,0.2); border-radius: 100px; padding: 6px 18px; font-size: 0.85rem; font-weight: 600;">Python</span>
                <span style="background: rgba(0,240,255,0.08); color: var(--a1); border: 1px solid rgba(0,240,255,0.2); border-radius: 100px; padding: 6px 18px; font-size: 0.85rem; font-weight: 600;">Flask Engine</span>
                <span style="background: rgba(0,240,255,0.08); color: var(--a1); border: 1px solid rgba(0,240,255,0.2); border-radius: 100px; padding: 6px 18px; font-size: 0.85rem; font-weight: 600;">Cryptography</span>
                <span style="background: rgba(0,240,255,0.08); color: var(--a1); border: 1px solid rgba(0,240,255,0.2); border-radius: 100px; padding: 6px 18px; font-size: 0.85rem; font-weight: 600;">SQLite</span>
                <span style="background: rgba(0,240,255,0.08); color: var(--a1); border: 1px solid rgba(0,240,255,0.2); border-radius: 100px; padding: 6px 18px; font-size: 0.85rem; font-weight: 600;">Glassmorphism CSS</span>
                <span style="background: rgba(0,240,255,0.08); color: var(--a1); border: 1px solid rgba(0,240,255,0.2); border-radius: 100px; padding: 6px 18px; font-size: 0.85rem; font-weight: 600;">Modern JS Elements</span>
            </div>
        </div>

        <div style="margin-top: 3.5rem; background: var(--bg3); border-radius: var(--rL); padding: 2rem; border: 1px solid var(--border2); border-left: 4px solid var(--a2); box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
            <h4 style="font-family: var(--ff-head); font-size: 1.25rem; margin-bottom: 1rem; color: var(--text);">Outcomes Achieved</h4>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.95rem; line-height: 1.8; margin: 0;">
                Developed as an academic major project, this application demonstrates a strong understanding of cybersecurity concepts, hybrid AES + RSA encryption, role-based access control, secure file handling, and responsive UI design. It successfully showcases the integration of rigorous backend cryptography with modern, accessible front-end user experiences.
            </p>
        </div>
    `;
    document.getElementById('projectModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

/* ── CONTACT SUBMIT ── */
function sendContactMessage(e) {
    e.preventDefault();
    const btn = e.target;
    
    // Grab details
    let fName = document.getElementById('fname').value || '';
    let lName = document.getElementById('lname').value || '';
    let email = document.getElementById('email').value || '';
    let pType = document.getElementById('ptype').value || '';
    let pBudget = document.getElementById('pbudget').value || '';
    let msg = document.getElementById('pmessage').value || '';
    
    // Construct message
    let text = `Hello Arun, I am interested in collaborating!\n\n`;
    text += `*Name:* ${fName} ${lName}\n`;
    if(email) text += `*Email:* ${email}\n`;
    if(pType !== 'Select project type...') text += `*Project Type:* ${pType}\n`;
    if(pBudget) text += `*Budget:* ${pBudget}\n`;
    if(msg) text += `\n*Message:* ${msg}\n`;
    
    let encodedText = encodeURIComponent(text);
    
    // Visual feedback
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Redirecting... ✦';
    btn.style.background = 'linear-gradient(135deg, #34d399, #06b6d4)';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        window.open(`https://wa.me/917981947497?text=${encodedText}`, '_blank');
    }, 1000);
}

/* ── TILT EFFECT ── */
document.querySelectorAll('.proj-card, .testi-card, .achieve-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
