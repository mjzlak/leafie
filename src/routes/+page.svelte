<script>
  import { fade, fly } from 'svelte/transition';
  import { enhance } from '$app/forms';
  export let form;
  const services = [
    { title: 'Développement web', desc: "Sites & apps rapides, modernes et accessibles.", icon: '💻' },
    { title: 'Consulting', desc: "Architecture, audit de code, accompagnement produit.", icon: '🧭' },
    { title: 'Maintenance', desc: "Sécurité, mises à jour, monitoring & amélioration continue.", icon: '🛠️' }
  ];
  const projects = [
    { title: 'Site vitrine moderne', tag: 'Svelte • SEO • Perf', href: '#', img: '' },
    { title: 'Task manager for work or personal use', tag: 'Typescript • JS • MongoDB', href: '#', img: '' },
    { title: 'Pantry manager with a recipe recommendation', tag: 'Svelte • PocketBase', href: '#', img: '' }
  ];
  function scrollToSelector(sel) {
    const el = document.querySelector(sel);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
</script>

<style>
  :root{ --blue:#1b1f3b; --midnight:#1b1f3b; --leaf:#5ca3ff; --beige:#5ca3ff; --gray:#444444; }
  *{ box-sizing:border-box } html,body{ margin:0; padding:0; color:var(--gray); background:var(--beige) }
  a{ color:inherit; text-decoration:none } button{ cursor:pointer }
  header{ position:sticky; top:0; z-index:10; backdrop-filter:saturate(130%) blur(8px); background:rgba(255,255,255,.7); border-bottom:1px solid #0001 }
  .container{ max-width:1120px; margin:0 auto; padding:0 20px } .nav{ display:flex; align-items:center; justify-content:space-between; height:64px }
  .brand{ display:flex; align-items:center; gap:12px; font-weight:700; color:var(--midnight) }
  .brand .logo{ width:32px; height:32px; border-radius:10px; background:linear-gradient(135deg,var(--blue),#5ca3ff); display:grid; place-items:center }
  .brand .logo svg{ width:18px; height:18px; fill:#fff } .menu{ display:flex; gap:20px; font-weight:600 }
  .cta{ padding:10px 16px; border-radius:12px; background:var(--blue); color:#fff; border:none; font-weight:700 }
  .hero{ position:relative; overflow:hidden; padding:88px 0 72px; background:radial-gradient(1200px 500px at 20% -10%,#fff,transparent 60%),linear-gradient(180deg,#fff 0%,#f9fbff 40%,var(--beige) 100%) }
  .hero-grid{ display:grid; grid-template-columns:1.1fr 0.9fr; gap:36px; align-items:center }
  .eyebrow{ color:var(--leaf); font-weight:800; letter-spacing:.06em; text-transform:uppercase; font-size:12px }
  h1{ font-size:clamp(32px,6vw,56px); line-height:1.05; margin:10px 0 16px; color:var(--midnight) }
  .lead{ font-size:clamp(16px,2vw,20px); color:#2e2e2e; max-width:46ch }
  .actions{ margin-top:26px; display:flex; gap:12px; flex-wrap:wrap } .btn{ padding:12px 18px; border-radius:14px; border:1px solid #0002; font-weight:700 }
  .btn.primary{ background:var(--blue); color:#fff; border-color:rgba(0,0,0,.1) } .btn.ghost{ background:#fff }
  .hero-card{ border-radius:24px; background:#fff; padding:22px; border:1px solid #0001; box-shadow:0 10px 30px #00000012 }
  .hero-card h3{ margin:0 0 6px; color:var(--midnight) } .hero-card p{ margin:0; color:#444 }
  section{ padding:72px 0 } .section-title{ font-size:28px; color:var(--midnight); margin:0 0 22px } .muted{ color:#555 }
  .cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px } .card{ background:#fff; border:1px solid #0001; border-radius:20px; padding:20px; transition:transform .25s, box-shadow .25s }
  .card:hover{ transform:translateY(-4px); box-shadow:0 14px 30px #00000014 } .icon{ width:44px; height:44px; display:grid; place-items:center; border-radius:12px; background:#e9f2ff }
  .portfolio{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px } .portfolio a{ display:block; background:#fff; border:1px solid #0001; border-radius:18px; overflow:hidden }
  .thumb{ aspect-ratio:16/10; background:linear-gradient(135deg,#e9f2ff,#fff) } .meta{ padding:14px 16px } .tag{ display:inline-block; font-size:12px; background:#00000008; border:1px solid #0001; padding:4px 8px; border-radius:999px }
  .why{ display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:center } .pill{ display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:999px; background:#fff; border:1px solid #0001; font-weight:700 }
  .list{ display:grid; gap:12px; margin-top:14px } .list li{ list-style:none; background:#fff; border:1px solid #0001; padding:12px 14px; border-radius:14px }
  .contact{ display:grid; grid-template-columns:1.1fr 0.9fr; gap:20px } form{ background:#fff; border:1px solid #0001; border-radius:16px; padding:18px; display:grid; gap:12px }
  label{ font-weight:700; font-size:14px; color:var(--midnight) } input,textarea{ width:100%; padding:12px 14px; border-radius:12px; border:1px solid #0002; font:inherit }
  textarea{ min-height:120px; resize:vertical } .submit{ align-self:start } footer{ padding:32px 0; border-top:1px solid #0001; background:#fff }
  .foot{ display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap } .small{ font-size:13px; color:#555 }
  @media (max-width:960px){ .hero-grid,.why,.contact{ grid-template-columns:1fr } .cards{ grid-template-columns:1fr } .portfolio{ grid-template-columns:1fr } }
</style>

<header>
  <div class="container nav">
    <a class="brand" href="#" on:click|preventDefault={() => scrollToSelector('body')}>
      <div class="logo" aria-hidden="true">
        <img src="/leafie.svg" alt="Leafie" style="width:32px;height:32px" />
      </div>
      <span>Leafie</span>
    </a>
    <nav class="menu">
      <a href="#services" on:click|preventDefault={() => scrollToSelector('#services')}>Services</a>
      <a href="#realisations" on:click|preventDefault={() => scrollToSelector('#realisations')}>Réalisations</a>
      <a href="#contact" on:click|preventDefault={() => scrollToSelector('#contact')}>Contact</a>
      <!--<button class="menu" on:click={() => scrollToSelector('#contact')}>Discutons</button>-->
    </nav>
  </div>
</header>

<main>
  <section class="hero">
    <div class="container hero-grid">
      <div in:fade={{ duration: 350 }}>
        <div class="eyebrow">Développement • Accompagnement • Conseil</div>
        <h1>Nous faisons grandir vos projets digitaux</h1>
        <p class="lead">Développement web, consulting technique et maintenance continue. Des expériences rapides, accessibles et pensées pour durer.</p>
        <div class="actions">
          <a class="btn primary" href="#contact" on:click|preventDefault={() => scrollToSelector('#contact')}>Discutons</a>
          <a class="btn ghost" href="#realisations" on:click|preventDefault={() => scrollToSelector('#realisations')}>Regardez nos réalisations</a>
        </div>
      </div>
      <div in:fly={{ y: 20, duration: 400 }}>
        <div class="hero-card">
          <h3>Qui est derrière Leafie ?</h3>
          <p>Trois étudiants diplômés mais surtout passionnés par le développement web et l'accompagnement des projets digitaux de petites et moyennes entreprises.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="services">
    <div class="container">
      <h2 class="section-title">Nos services</h2>
      <p class="muted">Du prototype à la mise en production, nous vous accompagnons à chaque étape. Performance, accessibilité, rapidité. Nous créons des interfaces qui allient modernité et sobriété numérique pour vous accompagner au mieux.</p>
      <div class="cards" style="margin-top:18px">
        {#each services as s, i}
          <article class="card" in:fly={{ y: 12, duration: 250, delay: 50 * i }}>
            <div class="icon" aria-hidden="true">{s.icon}</div>
            <h3 style="margin:12px 0 6px; color:var(--midnight)">{s.title}</h3>
            <p class="muted">{s.desc}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section id="realisations" style="background:#fff">
    <div class="container">
      <h2 class="section-title">Réalisations</h2>
      <p class="muted">Un aperçu de nos travaux.</p>
      <div class="portfolio" style="margin-top:18px">
        {#each projects as p, i}
          <a class="item" href={p.href} on:click|preventDefault in:fade={{ duration:250, delay:70*i }}>
            <div class="thumb"></div>
            <div class="meta">
              <strong style="color:var(--midnight)">{p.title}</strong>
              <div style="margin-top:6px" class="tag">{p.tag}</div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section>
    <div class="container why">
      <div in:fade={{ duration:300 }}>
        <span class="pill">🌿 Durable & Moderne</span>
        <h2 class="section-title" style="margin-top:12px">Conçus pour durer, pensés pour l’utilisateur</h2>
        <p class="muted">Nous privilégions l’accessibilité, la performance et une empreinte technique mesurée. Du conseil au déploiement, on s’occupe de la qualité du code comme de l’expérience.</p>
        <ul class="list">
          <li>Performance Web Vitals (LCP, CLS, INP)</li>
          <li>Accessibilité (ARIA, contrastes, navigation clavier)</li>
          <li>Maintenance évolutive & documentation</li>
        </ul>
      </div>
      <div in:fly={{ x: 16, duration: 350 }}>
        <div class="hero-card"><h3>Stack</h3><p>SvelteKit, TypeScript, JS, HTML/CSS, CI/CD (Vercel/Netlify), MongoDB.</p></div>
        <div class="hero-card" style="margin-top:14px"><h3>Engagement</h3><p>Transparence, délais réalistes, accompagnement avant et après mise en ligne.</p></div>
      </div>
    </div>
  </section>

  <section id="contact">
    <div class="container contact">
      <div>
        <h2 class="section-title">Discutons de votre projet</h2>
        <p class="muted">Dites‑nous où vous en êtes et ce dont vous avez besoin. Réponse sous 24–48h ouvrées.</p>
        <form method="POST" use:enhance>
          <style>
            .hp { position:absolute; left:-9999px; opacity:0; width:1px; height:1px; }
          </style>
          <input type="text" name="website" class="hp" autocomplete="off" tabindex="-1" aria-hidden="true">
          <div><label for="name">Votre nom</label><input id="name" name="name" placeholder="Prénom Nom" required></div>
          <div><label for="email">Email</label><input id="email" type="email" name="email" placeholder="prénom.nom@email.fr" required></div>
          <div><label for="message">Message</label><textarea id="message" name="message" placeholder="Parlez‑nous de votre projet…" required></textarea></div>
          <button class="cta submit" type="submit">Envoyer</button>
        </form>
        {#if form?.ok}<p style="margin-top:12px;color:green">✅ Message envoyé. Merci !</p>
        {:else if form?.error}<p style="margin-top:12px;color:#b00020">❌ {form.error}</p>{/if}
      </div>
      <div>
        <div class="hero-card"><h3>Contact spontané</h3><p><strong>Email :</strong> contact.leafie@gmail.fr<br><strong>Commercial :</strong> hello@leafie.fr</p></div>
        <div class="hero-card" style="margin-top:14px"><h3>Réseaux</h3><p>LinkedIn • GitHub • X</p></div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="container foot">
    <div class="brand"><div class="logo" aria-hidden="true">
      <img src="/leafie.svg" alt="Leafie" style="width:32px;height:32px" />
    </div><span>Leafie</span></div>
    <div class="small">© {new Date().getFullYear()} Leafie — Tous droits réservés • <a href="#">Mentions légales</a></div>
  </div>
</footer>
