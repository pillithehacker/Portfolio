import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()


# Rewrite the 576px and 480px block hero specifics
old_576_hero = """    /* Lock the Hero to 100VH bounds effectively wiping About off the primary load screen */
    .hero { 
        padding: 0 5vw 0rem; 
        min-height: calc(100vh - 50px); /* Account for mobile nav / ticker */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    /* Side-by-side Hero structure */
    .hero-inner {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.35rem 0.5rem;
        align-items: center;
        text-align: left;
        width: 100%;
    }
    
    .hero-text { display: contents; }
    .hero-visual { display: contents; }
    
    .hero-badge { grid-column: 1 / -1; grid-row: 1; margin: 0; justify-self: start; animation: fadeUpStagger 0.6s ease forwards; opacity: 0; font-size: 0.65rem; padding: 4px 10px;}
    .hero h1 { grid-column: 1 / -1; grid-row: 2; margin: 0; animation: fadeUpStagger 0.6s ease forwards 0.1s; opacity: 0; }
    
    .hero-visual-container { grid-column: 2; grid-row: 3 / 5; align-self: start; margin-top: 0.5rem; width: 105px; height: 105px; animation: scaleInPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s; opacity: 0; position: relative; }
    .profile-circle { width: 100%; height: 100%; border: 2px solid rgba(0, 240, 255, 0.3); box-shadow: 0 0 20px rgba(0, 240, 255, 0.2), inset 0 0 10px rgba(255,255,255,0.1); }
    
    .hero-sub { grid-column: 1; grid-row: 3; width: 100%; font-size: 0.78rem; max-width: 95%; line-height: 1.4; margin: 0.5rem 0 0 0; animation: fadeUpStagger 0.6s ease forwards 0.2s; opacity: 0;}
    .type-wrap { grid-column: 1; grid-row: 4; justify-content: flex-start; margin: 0.2rem 0 0 0; font-size: 0.72rem; animation: fadeUpStagger 0.6s ease forwards 0.3s; opacity: 0;}
    
    .hero-btns { grid-column: 1 / -1; grid-row: 5; flex-direction: column; width: 100%; gap: 6px; margin-top: 0.5rem; animation: fadeUpStagger 0.6s ease forwards 0.4s; opacity: 0; }
    
    .social-section { grid-column: 1 / -1; grid-row: 6; width: 100%; text-align: center; margin-top: 0.25rem; animation: fadeUpStagger 0.6s ease forwards 0.5s; opacity: 0; }
    .social-section .hero-socials { justify-content: center; gap: 8px; }
    
    .btn-glow, .btn-outline { width: 100%; text-align: center; padding: 0.6rem; font-size: 0.8rem; border-radius: 20px; }
    .btn-outline { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px); }
    .btn-outline:hover { background: rgba(255,255,255,0.08); box-shadow: 0 0 15px rgba(0,240,255,0.3); }
    .btn-glow { box-shadow: 0 4px 15px rgba(0,240,255,0.4); background: linear-gradient(135deg, var(--a1), var(--a2)); }
    
    .hero h1 .line, .grad-text { font-size: clamp(1.6rem, 7vw, 2.8rem); line-height: 1.05; }
    .grad-text { background: -webkit-linear-gradient(135deg, var(--a1), #8a2be2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
    
    /* Ultimate Minimalist Floating Pills */
    .float-icon { width: 28px; height: 28px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; background: rgba(20,20,30,0.8); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 4px 12px var(--glow1), inset 0 2px 4px rgba(255,255,255,0.1); margin:0; animation: scaleInPop 0.5s ease forwards 0.5s; opacity: 0; }
    .float-icon i { font-size: 0.75rem; }
    .float-figma { top: -5%; right: -5%; } 
    .float-anti { top: 30%; left: -10%; box-shadow: 0 4px 12px rgba(244,114,182,0.4); }
    .float-cursor { bottom: 0%; left: -5%; }
    .float-vscode { bottom: 5%; right: -5%; box-shadow: 0 4px 12px rgba(6,182,212,0.4); }
    .float-canva, .float-github { display: none; }"""

new_576_hero = """    /* Lock the Hero to 100VH bounds effectively wiping About off the primary load screen */
    .hero { 
        padding: 0 3vw 0rem; 
        min-height: calc(100vh - 40px); /* Account for mobile nav / ticker */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    /* Side-by-side Hero structure */
    .hero-inner {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.2rem 1rem;
        align-items: center;
        text-align: left;
        width: 100%;
        max-width: 100%;
    }
    
    .hero-text { display: contents; }
    .hero-visual { display: contents; }
    
    .hero-badge { grid-column: 1 / -1; grid-row: 1; margin: 0; justify-self: start; animation: fadeUpStagger 0.6s ease forwards; opacity: 0; font-size: 0.65rem; padding: 4px 10px;}
    .hero h1 { grid-column: 1 / -1; grid-row: 2; margin: 0; animation: fadeUpStagger 0.6s ease forwards 0.1s; opacity: 0; }
    
    /* Increase profile image size, push it up slightly, move far right */
    .hero-visual-container { grid-column: 2; grid-row: 3 / 6; justify-self: end; align-self: start; margin-top: 0; width: 140px; height: 140px; animation: scaleInPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s; opacity: 0; position: relative; }
    .profile-circle { width: 100%; height: 100%; border: 2px solid rgba(0, 240, 255, 0.3); box-shadow: 0 0 20px rgba(0, 240, 255, 0.2), inset 0 0 10px rgba(255,255,255,0.1); }
    
    /* Widen paragraph text and make it fill left column fully */
    .hero-sub { grid-column: 1; grid-row: 3; width: 100%; font-size: 0.8rem; max-width: 100%; line-height: 1.5; margin: 0.5rem 0 0 0; animation: fadeUpStagger 0.6s ease forwards 0.2s; opacity: 0;}
    .type-wrap { grid-column: 1; grid-row: 4; justify-content: flex-start; margin: 0.5rem 0 0 0; font-size: 0.75rem; animation: fadeUpStagger 0.6s ease forwards 0.3s; opacity: 0;}
    
    /* Bring buttons tight under paragraph */
    .hero-btns { grid-column: 1; grid-row: 5; flex-direction: column; width: 100%; gap: 8px; margin-top: 0.5rem; animation: fadeUpStagger 0.6s ease forwards 0.4s; opacity: 0; }
    
    /* Pull icons up directly underneath the blocks */
    .social-section { grid-column: 1 / -1; grid-row: 6; width: 100%; text-align: center; margin-top: 0.75rem; animation: fadeUpStagger 0.6s ease forwards 0.5s; opacity: 0; }
    .social-section .hero-socials { justify-content: center; gap: 8px; }
    
    .btn-glow, .btn-outline { width: 100%; text-align: center; padding: 0.6rem; font-size: 0.8rem; border-radius: 20px; }
    .btn-outline { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px); }
    .btn-outline:hover { background: rgba(255,255,255,0.08); box-shadow: 0 0 15px rgba(0,240,255,0.3); }
    .btn-glow { box-shadow: 0 4px 15px rgba(0,240,255,0.4); background: linear-gradient(135deg, var(--a1), var(--a2)); }
    
    .hero h1 .line, .grad-text { font-size: clamp(1.8rem, 8vw, 3rem); line-height: 1.05; }
    .grad-text { background: -webkit-linear-gradient(135deg, var(--a1), #8a2be2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
    
    /* Perfect circular layout for floating pills */
    .float-icon { width: 32px; height: 32px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; background: rgba(20,20,30,0.8); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 4px 12px var(--glow1), inset 0 2px 4px rgba(255,255,255,0.1); margin:0; animation: scaleInPop 0.5s ease forwards 0.5s; opacity: 0; }
    .float-icon i { font-size: 0.85rem; }
    .float-figma { top: -8%; right: 20%; } 
    .float-anti { top: 20%; left: -12%; box-shadow: 0 4px 12px rgba(244,114,182,0.4); }
    .float-cursor { bottom: 15%; left: -10%; }
    .float-vscode { bottom: -10%; right: 20%; box-shadow: 0 4px 12px rgba(6,182,212,0.4); }
    .float-canva, .float-github { display: none; }"""

if old_576_hero in css:
    css = css.replace(old_576_hero, new_576_hero)
else:
    print("Warning: old_576_hero block could not be perfectly matched. You may have structural differences...")


# Update 480px block
old_480_hero = """@media(max-width: 480px) {
    .section, .section-full { padding: 1rem 5vw 1.25rem; }
    .hero h1 .line, .grad-text { font-size: clamp(1.5rem, 6.5vw, 2.0rem); }
    .hero-badge { font-size: 0.65rem; padding: 3px 10px; }
    
    /* Further compacting the very specific components on the smallest screens */
    .hero-inner { gap: 0.15rem 0.35rem; }
    .hero-visual-container { width: 95px; height: 95px; margin-top: 0.75rem; }
    .btn-glow, .btn-outline { padding: 0.55rem; font-size: 0.75rem; }
    
    .proj-card { box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important; }
    .proj-card .proj-thumb { height: 160px !important; }
    .proj-cats { flex-wrap: wrap; }
    
    .contact-item { flex-direction: column; text-align: center; gap: 0.5rem; justify-content: center; padding: 0.8rem; }
    .contact-icon-wrap { margin: 0 auto; }
    
    .social-icon { width: 30px; height: 30px; font-size: 12px; }
    .social-section .hero-socials { gap: 5px; }
}"""

new_480_hero = """@media(max-width: 480px) {
    .section, .section-full { padding: 1rem 5vw 1.25rem; }
    .hero h1 .line, .grad-text { font-size: clamp(1.7rem, 7.5vw, 2.2rem); }
    .hero-badge { font-size: 0.65rem; padding: 3px 10px; }
    
    /* Fill out the gap width fully */
    .hero-inner { gap: 0.2rem 0.6rem; }
    /* Bring image logic to 125px */
    .hero-visual-container { width: 125px; height: 125px; margin-top: 0; }
    .btn-glow, .btn-outline { padding: 0.55rem; font-size: 0.75rem; }
    
    .proj-card { box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important; }
    .proj-card .proj-thumb { height: 160px !important; }
    .proj-cats { flex-wrap: wrap; }
    
    .contact-item { flex-direction: column; text-align: center; gap: 0.5rem; justify-content: center; padding: 0.8rem; }
    .contact-icon-wrap { margin: 0 auto; }
    
    .social-icon { width: 30px; height: 30px; font-size: 12px; }
    .social-section .hero-socials { gap: 5px; margin-top: 0.5rem;}
}"""

if old_480_hero in css:
    css = css.replace(old_480_hero, new_480_hero)
else:
    print("Warning: old_480_hero block could not be matched!")


with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Grid layout expanded successfully.")
