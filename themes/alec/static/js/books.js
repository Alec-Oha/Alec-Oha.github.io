const LINE_Y = 280, COL_W = 195, START = 80, LEAD = 60, CARD_H = 140;

const books = [
  // 2023
  {id:'as-a-man-thinketh',year:2023,pos:'above',type:'nonfiction',title:'As a Man Thinketh',author:'James Allen',published:1903,subgenre:'Self-Help'},
  {id:'time-enough-for-love',year:2023,pos:'below',type:'fiction',title:'Time Enough for Love',author:'Robert A. Heinlein',published:1973,subgenre:'Science Fiction'},
  {id:'the-stranger',year:2023,pos:'above',type:'fiction',title:'The Stranger',author:'Albert Camus',published:1942,subgenre:'Literary Fiction / Absurdism'},
  {id:'count-zero',year:2023,pos:'below',type:'fiction',title:'Count Zero',author:'William Gibson',published:1986,subgenre:'Cyberpunk'},
  {id:'gardens-of-the-moon',year:2023,pos:'above',type:'fiction',title:'Gardens of the Moon',author:'Steven Erikson',published:1999,subgenre:'Epic Fantasy'},
  {id:'the-expanse',year:2023,pos:'below',type:'fiction',isSeries:true,title:'The Expanse Series',author:'James S.A. Corey',published:2011,subgenre:'Space Opera',series:["Leviathan Wakes","Caliban's War","Abaddon's Gate","Cibola Burn","Nemesis Games","Babylon's Ashes","Persepolis Rising","Tiamat's Wrath","Leviathan Falls"]},
  {id:'throne-of-glass',year:2023,pos:'above',type:'fiction',isSeries:true,title:'Throne of Glass Series',author:'Sarah J. Maas',published:2012,subgenre:'Young Adult Fantasy',series:["Throne of Glass","Crown of Midnight","Heir of Fire","Queen of Shadows","Empire of Storms","Tower of Dawn","Kingdom of the Wicked"]},
  {id:'faithful-fallen',year:2023,pos:'below',type:'fiction',isSeries:true,title:'The Faithful and the Fallen',author:'John Gwynne',published:2012,subgenre:'Grimdark Fantasy',series:["Malice","Valour","Ruin","Wrath"]},
  // 2024
  {id:'guards-guards',year:2024,pos:'above',type:'fiction',title:"Guards! Guards!",author:'Terry Pratchett',published:1989,subgenre:'Comic Fantasy'},
  {id:'neuromancer',year:2024,pos:'below',type:'fiction',title:'Neuromancer',author:'William Gibson',published:1984,subgenre:'Cyberpunk'},
  {id:'passing',year:2024,pos:'above',type:'fiction',title:'Passing',author:'Nella Larsen',published:1929,subgenre:'Literary Fiction'},
  {id:'drowning-empire',year:2024,pos:'below',type:'fiction',isSeries:true,title:'The Drowning Empire Trilogy',author:'Andrea Stewart',published:2020,subgenre:'Epic Fantasy',series:["The Bone Shard Daughter","The Bone Shard Emperor","The Bone Shard War"]},
  {id:'first-law',year:2024,pos:'above',type:'fiction',isSeries:true,title:'The First Law Trilogy',author:'Joe Abercrombie',published:2006,subgenre:'Grimdark Fantasy',series:["The Blade Itself","Before They Are Hanged","Last Argument of Kings"]},
  {id:'mort',year:2024,pos:'below',type:'fiction',title:'Mort',author:'Terry Pratchett',published:1987,subgenre:'Comic Fantasy'},
  {id:'psychology-of-money',year:2024,pos:'above',type:'nonfiction',title:'The Psychology of Money',author:'Morgan Housel',published:2020,subgenre:'Personal Finance'},
  {id:'red-rising',year:2024,pos:'below',type:'fiction',isSeries:true,title:'Red Rising Series',author:'Pierce Brown',published:2014,subgenre:'Science Fiction / Dystopia',series:["Red Rising","Golden Son","Morning Star","Iron Gold","Dark Age","Light Bringer"]},
  // 2025
  {id:'babel',year:2025,pos:'above',type:'fiction',title:'Babel',author:'R.F. Kuang',published:2022,subgenre:'Dark Academic Fantasy'},
  {id:'chronicles-of-amber',year:2025,pos:'below',type:'fiction',reviewed:true,rating:'8/10',reviewLink:'/posts/chronicles-of-amber-review/',isSeries:true,title:'The Chronicles of Amber',author:'Roger Zelazny',published:1970,subgenre:'Fantasy',series:["Nine Princes in Amber","The Guns of Avalon","Sign of the Unicorn","The Hand of Oberon","The Courts of Chaos"]},
  {id:'space-trilogy',year:2025,pos:'above',type:'fiction',reviewed:true,rating:'2.6/10',reviewLink:'/posts/space-trilogy-review/',isSeries:true,title:'The Space Trilogy',author:'C.S. Lewis',published:1938,subgenre:'Science Fiction / Allegory',series:["Out of the Silent Planet","Perelandra","That Hideous Strength"]},
  {id:'ubik',year:2025,pos:'below',type:'fiction',reviewed:true,rating:'4.2/10',reviewLink:'/posts/ubik-review/',title:'Ubik',author:'Philip K. Dick',published:1969,subgenre:'Science Fiction'},
  {id:'black-company',year:2025,pos:'above',type:'fiction',reviewed:true,rating:'8.5/10',reviewLink:'/posts/black-company-review/',isSeries:true,title:'The Black Company',author:'Glen Cook',published:1984,subgenre:'Grimdark Fantasy',series:["The Black Company","Shadows Linger","The White Rose","Shadow Games"]},
  {id:'scanner-darkly',year:2025,pos:'below',type:'fiction',reviewed:true,rating:'6.35/10',reviewLink:'/posts/scanner-darkly-review/',title:'A Scanner Darkly',author:'Philip K. Dick',published:1977,subgenre:'Science Fiction'},
  {id:'orhans-inheritance',year:2025,pos:'above',type:'fiction',title:"Orhan's Inheritance",author:'Aline Ohanesian',published:2015,subgenre:'Historical Fiction'},
  {id:'stormlight',year:2025,pos:'below',type:'fiction',isSeries:true,title:'The Stormlight Archive',author:'Brandon Sanderson',published:2010,subgenre:'Epic Fantasy',series:["The Way of Kings","Words of Radiance","Oathbringer","Rhythm of War","Wind and Truth"]},
  // 2026
  {id:'sirens-of-titan',year:2026,pos:'above',type:'fiction',reviewed:true,rating:'4.5/10',reviewLink:'/posts/sirens-of-titan-review/',title:'The Sirens of Titan',author:'Kurt Vonnegut',published:1959,subgenre:'Science Fiction / Satire'},
  {id:'between-two-fires',year:2026,pos:'below',type:'fiction',reviewed:true,rating:'5/10',reviewLink:'/posts/between-two-fires-review/',title:'Between Two Fires',author:'Christopher Buehlman',published:2012,subgenre:'Historical Horror'},
  {id:'farseer',year:2026,pos:'above',type:'fiction',isSeries:true,title:'Farseer Trilogy',author:'Robin Hobb',published:1995,subgenre:'Epic Fantasy',series:["Assassin's Apprentice","Royal Assassin","Assassin's Quest"]},
  {id:'moonbound',year:2026,pos:'below',type:'fiction',title:'Moonbound',author:'Robin Sloan',published:2024,subgenre:'Science Fantasy'},
  {id:'dungeon-crawler-carl',year:2026,pos:'above',type:'fiction',isSeries:true,title:'Dungeon Crawler Carl',author:'Matt Dinniman',published:2020,subgenre:'LitRPG / Science Fiction',series:["Dungeon Crawler Carl","Carl's Doomsday Scenario","The Dungeon Anarchist's Cookbook","The Gate of the Feral Gods","The Butcher's Masquerade","The Eye of the Bedlam Bride","This Inevitable Ruin","A Parade of Horribles"]},
  {id:'gaea-trilogy',year:2026,pos:'below',type:'fiction',reviewed:true,rating:'7/10',reviewLink:'/posts/gaea-series-review/',isSeries:true,title:'The Gaea Trilogy',author:'John Varley',published:1979,subgenre:'Science Fiction',series:["Titan","Wizard","Demon"]},
  {id:'amina-al-sirafi',year:2026,pos:'above',type:'fiction',reviewed:true,rating:'6.6/10',reviewLink:'/posts/amina-al-sirafi-review/',title:'The Adventures of Amina al-Sirafi',author:'Shannon Chakraborty',published:2023,subgenre:'Historical Fantasy'},
  {id:'hierarchy',year:2026,pos:'below',type:'fiction',isSeries:true,title:'The Hierarchy Series',author:'James Islington',published:2023,subgenre:'Epic Fantasy',series:["The Will of the Many","The Strength of the Few"]},
];

// assign x positions
let xi = 0;
[2023,2024,2025,2026].forEach(yr => {
  books.filter(b => b.year === yr).forEach(b => { b._x = xi++; });
});

const canvas = document.getElementById('tlCanvas');
const totalW = START + xi * COL_W + START;
canvas.style.minWidth = totalW + 'px';
canvas.style.height = '620px';
document.getElementById('tlLine').style.top = LINE_Y + 'px';

let xi2 = 0;
[2023,2024,2025,2026].forEach(yr => {
  const grp = books.filter(b => b.year === yr);
  const bandLeft = START + xi2 * COL_W - COL_W * 0.5;
  const midX = START + (xi2 + grp.length/2 - 0.5) * COL_W;
  const band = document.createElement('div');
  band.className = 'year-band';
  band.style.cssText = `left:${bandLeft}px;width:${grp.length*COL_W}px;`;
  canvas.appendChild(band);
  const marker = document.createElement('div');
  marker.className = 'year-marker';
  marker.style.cssText = `left:${midX}px;top:${LINE_Y}px;`;
  marker.innerHTML = `<div class="year-tick"></div><div class="year-label">${yr}</div>`;
  canvas.appendChild(marker);
  xi2 += grp.length;
});

function getTag(b) {
  if (b.reviewed) return {bg:'var(--c-reviewed-bg)',c:'var(--c-reviewed)',label:'⭐ Reviewed'};
  if (b.type === 'nonfiction') return {bg:'var(--c-nonfic-bg)',c:'var(--c-nonfic)',label:'Non-Fiction'};
  return {bg:'var(--c-fiction-bg)',c:'var(--c-fiction)',label:'Fiction'};
}
function getDot(b) {
  if (b.reviewed) return {size:14,border:'2.5px solid var(--text)'};
  if (b.type === 'nonfiction') return {size:10,border:'2px solid var(--c-nonfic)'};
  return {size:10,border:'2px solid var(--c-fiction)'};
}

books.forEach(b => {
  const px = START + b._x * COL_W;
  const isAbove = b.pos === 'above';
  const dc = getDot(b);
  const ts = getTag(b);

  const dot = document.createElement('div');
  dot.className = 'event-dot';
  dot.style.cssText = `left:${px}px;top:${LINE_Y}px;width:${dc.size}px;height:${dc.size}px;border:${dc.border};background:var(--bg);`;
  dot.addEventListener('click', () => openModal(b));
  canvas.appendChild(dot);

  const leader = document.createElement('div');
  leader.style.cssText = `position:absolute;width:1px;background:var(--border-mid);left:${px}px;top:${isAbove?LINE_Y-LEAD:LINE_Y}px;height:${LEAD}px;transform:translateX(-50%);`;
  canvas.appendChild(leader);

  const card = document.createElement('div');
  card.className = 'event-card';
  card.style.cssText = `left:${px}px;top:${isAbove?LINE_Y-LEAD-CARD_H-10:LINE_Y+LEAD+8}px;`;

  let seriesHtml = '';
  if (b.isSeries && b.series) {
    const show = b.series.slice(0,3);
    const more = b.series.length - 3;
    seriesHtml = `<div class="sub-books">${show.map(s=>`<div class="sub-book">${s}</div>`).join('')}${more>0?`<div class="sub-book">+${more} more</div>`:''}</div>`;
  }

  card.innerHTML = `
    <span class="card-tag" style="background:${ts.bg};color:${ts.c};">${ts.label}</span>
    <div class="card-title">${b.title}</div>
    <div class="card-author">${b.author}</div>
    ${b.reviewed ? `<div class="card-rating">${b.rating}</div>` : ''}
    ${seriesHtml}
  `;
  card.addEventListener('click', () => openModal(b));
  canvas.appendChild(card);
});

function openModal(b) {
  const ts = getTag(b);
  let seriesHtml = '';
  if (b.isSeries && b.series) {
    seriesHtml = `<div class="modal-series-list"><div class="modal-series-title">Books in series</div>${b.series.map(s=>`<div class="modal-series-book">${s}</div>`).join('')}</div>`;
  }

  document.getElementById('modalInner').innerHTML = `
    <div class="modal-cover-placeholder">Loading cover...</div>
    <span class="modal-tag" style="background:${ts.bg};color:${ts.c};">${ts.label}</span>
    <div class="modal-title">${b.title}</div>
    <div class="modal-author">${b.author}</div>
    <div class="modal-meta">
      <div class="modal-meta-item"><strong>Published:</strong> ${b.published}</div>
      <div class="modal-meta-item"><strong>Genre:</strong> ${b.subgenre}</div>
      ${b.isSeries ? `<div class="modal-meta-item"><strong>Books:</strong> ${b.series.length}</div>` : ''}
    </div>
    ${b.reviewed ? `<div class="modal-rating">${b.rating}</div>` : ''}
    ${b.reviewed && b.reviewLink ? `<a href="${b.reviewLink}" class="modal-review-link">Read full review →</a>` : ''}
    ${seriesHtml}
  `;

  const q = encodeURIComponent(b.title.replace(/\s+(series|trilogy)$/i,''));
  const a = encodeURIComponent(b.author.split(' ').pop());
  fetch(`https://openlibrary.org/search.json?title=${q}&author=${a}&limit=1&fields=cover_i`)
    .then(r => r.json()).then(data => {
      const id = data?.docs?.[0]?.cover_i;
      const ph = document.querySelector('.modal-cover-placeholder');
      if (id && ph) {
        const img = document.createElement('img');
        img.className = 'modal-cover';
        img.src = `https://covers.openlibrary.org/b/id/${id}-L.jpg`;
        img.alt = b.title;
        img.onerror = () => img.style.display = 'none';
        ph.replaceWith(img);
      } else if (ph) { ph.textContent = 'Cover unavailable'; }
    }).catch(() => { const ph = document.querySelector('.modal-cover-placeholder'); if(ph) ph.textContent = 'Cover unavailable'; });

  document.getElementById('modalOverlay').classList.add('open');
}

document.getElementById('modalClose').addEventListener('click', () => document.getElementById('modalOverlay').classList.remove('open'));
document.getElementById('modalOverlay').addEventListener('click', e => { if(e.target.id==='modalOverlay') document.getElementById('modalOverlay').classList.remove('open'); });

const toggle = document.getElementById('themeToggle');
const moon = document.getElementById('iconMoon');
const sun = document.getElementById('iconSun');
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme','dark');
  moon.style.display = 'none'; sun.style.display = 'block';
}
toggle.addEventListener('click', () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (dark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme','light');
    moon.style.display = 'block'; sun.style.display = 'none';
  } else {
    document.documentElement.setAttribute('data-theme','dark');
    localStorage.setItem('theme','dark');
    moon.style.display = 'none'; sun.style.display = 'block';
  }
});

const outer = document.getElementById('timelineOuter');
let down=false, sx, sl;
outer.addEventListener('mousedown', e => { down=true; sx=e.pageX-outer.offsetLeft; sl=outer.scrollLeft; });
outer.addEventListener('mouseleave', () => down=false);
outer.addEventListener('mouseup', () => down=false);
outer.addEventListener('mousemove', e => { if(!down)return; e.preventDefault(); outer.scrollLeft=sl-(e.pageX-outer.offsetLeft-sx); });
