(() => {
  'use strict';
  lucide.createIcons();
  const menu = document.querySelector('.menu-button');
  const navigation = document.querySelector('.navigation');
  function closeMenu() {
    navigation.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    menu.title = 'Open navigation';
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.title = open ? 'Close navigation' : 'Open navigation';
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('[data-nav]').forEach(link => {
        if (link.dataset.nav === entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-12% 0px -50% 0px' });
  ['work', 'about', 'contact'].forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
  if (document.body.classList.contains('about-page')) {
    document.querySelector('[data-nav="about"]').setAttribute('aria-current', 'page');
  }
  if (!document.getElementById('hero-map')) return;

  const map = L.map('hero-map', {
    zoomControl: false, attributionControl: false, dragging: false,
    scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false,
    boxZoom: false, keyboard: false, zoomSnap: 0.1, preferCanvas: true
  });
  const renderer = L.canvas({ padding: 0.3 });
  const boundary = L.geoJSON(portfolioGeo.boundary, {
    renderer, interactive: false, style: { color: '#aebacc', weight: 1.1, fillColor: '#edf1f7', fillOpacity: 0.6 }
  }).addTo(map);
  const graticule = L.layerGroup();
  for (let longitude = -82.0; longitude <= -80.6; longitude += 0.2) {
    L.polyline([[25.5, longitude], [26.8, longitude]], { renderer, color:'#dfe6ef', weight:0.6, interactive:false }).addTo(graticule);
  }
  for (let latitude = 25.6; latitude <= 26.8; latitude += 0.2) {
    L.polyline([[latitude,-82.2], [latitude,-80.6]], { renderer, color:'#dfe6ef', weight:0.6, interactive:false }).addTo(graticule);
  }
  graticule.addTo(map);
  boundary.bringToFront();
  const label = L.marker([26.15,-81.15], { interactive:false, icon:L.divIcon({ className:'county-label', html:'Collier County', iconSize:[110,16] }) }).addTo(map);
  let contours;
  function selectYear(year) {
    if (contours) map.removeLayer(contours);
    contours = L.layerGroup(portfolioGeo.years[year].map((feature, index) => L.geoJSON(feature, {
      renderer, interactive:false, style:{ color:['#9db4ee','#6086e5','#2854db'][index], weight:[1.0,1.3,1.7][index], opacity:1, fill:false }
    }))).addTo(map);
    document.querySelectorAll('[data-year]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.year === String(year))));
    document.getElementById('map-count').textContent = ({2020:'1,957',2023:'6,080',2026:'3,715'})[year];
    document.getElementById('map-year-label').textContent = year;
    document.getElementById('hero-map').dataset.year = year;
  }
  document.querySelectorAll('[data-year]').forEach(button => button.addEventListener('click', () => selectYear(button.dataset.year)));
  function frameMap() {
    map.invalidateSize({animate:false});
    const {x:width,y:height} = map.getSize();
    const mobile = width <= 760;
    map.fitBounds(boundary.getBounds(), {
      paddingTopLeft: mobile ? [width*0.27, height*0.49] : [width*0.50, 24],
      paddingBottomRight: mobile ? [2, 48] : [38, 72],
      animate:false
    });
    label.setOpacity(mobile ? 0 : 1);
  }
  new ResizeObserver(frameMap).observe(document.getElementById('hero-map'));
  selectYear(2026);
  frameMap();
})();
