(() => {
  const trackedLinks = [
    ['a[href*="goodnovel.com/book/"]', 'click-goodnovel', 'Read The Vampires’ Obsession on GoodNovel'],
    ['a[href*="inkitt.com/stories/"]', 'click-inkitt', 'Read The Alpha’s Second Choice on Inkitt'],
    ['a[href*="B0HLT2HT7S"]', 'click-amazon-book-one', 'Read Book One on Amazon'],
    ['a[href*="B0HLT5R6ML"]', 'click-amazon-book-two', 'Read Book Two on Amazon'],
    ['a[href*="facebook.com/"]', 'click-facebook', 'Open Facebook'],
    ['a[href*="instagram.com/"]', 'click-instagram', 'Open Instagram'],
    ['a[href*="tiktok.com/"]', 'click-tiktok', 'Open TikTok']
  ];
  trackedLinks.forEach(([selector, path, title]) => {
    document.querySelectorAll(selector).forEach(link => {
      link.dataset.goatcounterClick = path;
      link.dataset.goatcounterTitle = title;
    });
  });
  const analytics = document.createElement('script');
  analytics.async = true;
  analytics.src = 'https://gc.zgo.at/count.js';
  analytics.dataset.goatcounter = 'https://christinedawnraven.goatcounter.com/count';
  analytics.addEventListener('load', () => {
    if (!window.goatcounter?.count || !('IntersectionObserver' in window)) return;
    const sections = [
      ['.books .books-head', 'section-books', 'Homepage section: Dark Romance books'],
      ['#unmatched-in-the-nine-kingdoms .books-head', 'section-nine-kingdoms', 'Homepage section: Nine Kingdoms'],
      ['.socials', 'section-social', 'Homepage section: Social links']
    ];
    const seen = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
        const config = sections.find(([selector]) => entry.target.matches(selector));
        if (!config || seen.has(config[1])) return;
        seen.add(config[1]);
        window.goatcounter.count({path: config[1], title: config[2], event: true});
        observer.unobserve(entry.target);
      });
    }, {threshold: 0.5});
    const startSections = () => sections.forEach(([selector]) => {
      const section = document.querySelector(selector);
      if (section) observer.observe(section);
    });
    const gate = document.getElementById('ageGate');
    if (!gate || gate.classList.contains('hidden')) startSections();
    else document.getElementById('enterBtn')?.addEventListener('click', startSections, {once: true});
  });
  document.head.appendChild(analytics);
})();
