// ── BOOKS TIMELINE ────────────────────────────────────────
const LINE_Y = 280, COL_W = 195, START = 80, LEAD = 60, CARD_H = 140;

const books = [
  // 2023
  {id:'as-a-man-thinketh',year:2023,pos:'above',type:'nonfiction',title:'As a Man Thinketh',author:'James Allen',desc:"A foundational self-help classic from 1903. Allen argues that a person's thoughts directly shape their character, circumstances, and destiny. Short but dense with practical wisdom about the power of directed thinking."},
  {id:'time-enough-for-love',year:2023,pos:'below',type:'fiction',title:'Time Enough for Love',author:'Robert A. Heinlein',desc:"Heinlein's longest novel follows Lazarus Long, the oldest man alive, through centuries of adventures. A sprawling meditation on love, mortality, and what it means to keep finding reasons to live across thousands of years."},
  {id:'the-stranger',year:2023,pos:'above',type:'fiction',title:'The Stranger',author:'Albert Camus',desc:"Meursault kills a man on a beach and faces trial — not so much for the murder as for his emotional detachment. A cornerstone of existentialist literature and absurdist philosophy."},
  {id:'count-zero',year:2023,pos:'below',type:'fiction',title:'Count Zero',author:'William Gibson',desc:"The second Sprawl Trilogy novel, set seven years after Neuromancer. Three storylines weave through a fractured cyberspace where something new — possibly divine — has emerged in the matrix."},
  {id:'gardens-of-the-moon',year:2023,pos:'above',type:'fiction',title:'Gardens of the Moon',author:'Steven Erikson',desc:"First book in the massive Malazan Book of the Fallen. Erikson drops you into a fully-formed world mid-campaign — gods, armies, assassins, and ancient magic collide across a dying empire. No hand-holding."},
  {id:'the-expanse',year:2023,pos:'below',type:'fiction',isSeries:true,title:'The Expanse Series',author:'James S.A. Corey',series:["Leviathan Wakes","Caliban's War","Abaddon's Gate","Cibola Burn","Nemesis Games","Babylon's Ashes","Persepolis Rising","Tiamat's Wrath","Leviathan Falls"],desc:"Nine-book space opera set when humanity has colonized the solar system. Masterful blend of hard sci-fi, political thriller, and character drama. The tension between Earth, Mars, and the Belt feels frighteningly real."},
  {id:'throne-of-glass',year:2023,pos:'above',type:'fiction',isSeries:true,title:'Throne of Glass Series',author:'Sarah J. Maas',series:["Throne of Glass","Crown of Midnight","Heir of Fire","Queen of Shadows","Empire of Storms","Tower of Dawn","Kingdom of the Wicked"],desc:"Fantasy series following Celaena Sardothien, an assassin forced to compete in a deadly tournament. Grows significantly darker and more complex as the series progresses."},
  {id:'faithful-fallen',year:2023,pos:'below',type:'fiction',isSeries:true,title:'The Faithful and the Fallen',author:'John Gwynne',series:["Malice","Valour","Ruin","Wrath"],desc:"Epic grimdark fantasy set on the edge of a prophesied war. Old-school epic fantasy with brutal battles, complex loyalties, and genuine emotional stakes."},
  // 2024
  {id:'guards-guards',year:2024,pos:'above',type:'fiction',title:"Guards! Guards!",author:'Terry Pratchett',desc:"The Night Watch of Ankh-Morpork faces a dragon. Pratchett uses the chaos to skewer heroism, monarchy, and bureaucracy with characteristic wit."},
  {id:'neuromancer',year:2024,pos:'below',type:'fiction',title:'Neuromancer',author:'William Gibson',desc:"The novel that invented cyberpunk. Case, a burned-out hacker, gets a second chance at jacking into cyberspace for an impossible heist. Won the Hugo, Nebula, and Philip K. Dick awards."},
  {id:'passing',year:2024,pos:'above',type:'fiction',title:'Passing',author:'Nella Larsen',desc:"A 1929 Harlem Renaissance novella about two Black women — one passing as white — who reconnect after years apart. Tense, psychologically rich examination of race, identity, and desire."},
  {id:'drowning-empire',year:2024,pos:'below',type:'fiction',isSeries:true,title:'The Drowning Empire Trilogy',author:'Andrea Stewart',series:["The Bone Shard Daughter","The Bone Shard Emperor","The Bone Shard War"],desc:"An Asian-inspired empire built on bone shard magic. The emperor's heir fights to reclaim her birthright while revolution spreads. Rich worldbuilding and a genuinely inventive magic system."},
  {id:'first-law',year:2024,pos:'above',type:'fiction',isSeries:true,title:'The First Law Trilogy',author:'Joe Abercrombie',series:["The Blade Itself","Before They Are Hanged","Last Argument of Kings"],desc:"Grimdark fantasy that deconstructs every epic fantasy trope. Nobody gets what they deserve. Abercrombie is relentlessly cynical and completely riveting."},
  {id:'mort',year:2024,pos:'below',type:'fiction',title:'Mort',author:'Terry Pratchett',desc:"Death takes on an apprentice named Mort, then takes a holiday. A Discworld classic — makes you laugh and think hard about mortality at the same time."},
  {id:'psychology-of-money',year:2024,pos:'above',type:'nonfiction',title:'The Psychology of Money',author:'Morgan Housel',desc:"19 short essays on how people think about money — why smart people make bad financial decisions, why luck matters more than we admit, and why behavior matters more than knowledge."},
  {id:'red-rising',year:2024,pos:'below',type:'fiction',isSeries:true,title:'Red Rising Series',author:'Pierce Brown',series:["Red Rising","Golden Son","Morning Star","Iron Gold","Dark Age","Light Bringer"],desc:"Future humanity colonizes the solar system under a rigid color-coded caste system. Darrow infiltrates the ruling class to destroy it from within. Relentlessly paced with genuine political complexity."},
  // 2025
  {id:'babel',year:2025,pos:'above',type:'fiction',title:'Babel',author:'R.F. Kuang',desc:"Dark academic fantasy set in alternate 1830s Oxford where silver bars engraved with translation magic power the British Empire. Dense, angry, and brilliant examination of colonialism and resistance."},
  {id:'chronicles-of-amber',year:2025,pos:'below',type:'fiction',reviewed:true,rating:'8/10',reviewLink:'/posts/chronicles-of-amber-review/',isSeries:true,title:'The Chronicles of Amber',author:'Roger Zelazny',series:["Nine Princes in Amber","The Guns of Avalon","Sign of the Unicorn","The Hand of Oberon","The Courts of Chaos"],desc:"A fantasy series spanning two opposing true worlds — Amber and Chaos — with infinite shadow worlds between them. Strong first five books, weaker second half."},
  {id:'space-trilogy',year:2025,pos:'above',type:'fiction',reviewed:true,rating:'2.6/10',reviewLink:'/posts/space-trilogy-review/',isSeries:true,title:'The Space Trilogy',author:'C.S. Lewis',series:["Out of the Silent Planet","Perelandra","That Hideous Strength"],desc:"Felt more like a Christian allegory than the alien battles and spaceships expected going in. Writing style didn't connect. Did not finish."},
  {id:'ubik',year:2025,pos:'below',type:'fiction',reviewed:true,rating:'4.2/10',reviewLink:'/posts/ubik-review/',title:'Ubik',author:'Philip K. Dick',desc:"Reality breaks down, time regresses, and a product called Ubik keeps appearing. Provocative questions about entropy and identity, unsatisfying narrative. Not where to start with Dick."},
  {id:'black-company',year:2025,pos:'above',type:'fiction',reviewed:true,rating:'8.5/10',reviewLink:'/posts/black-company-review/',isSeries:true,title:'The Black Company',author:'Glen Cook',series:["The Black Company","Shadows Linger","The White Rose","Shadow Games"],desc:"Grimdark fantasy told through the Company's Annalist. No map, no magic system explained, no heroes. Cook writes with a jarring time-skipping pace that becomes the whole charm. Sheer gritty badassery."},
  {id:'scanner-darkly',year:2025,pos:'below',type:'fiction',reviewed:true,rating:'6.35/10',reviewLink:'/posts/scanner-darkly-review/',title:'A Scanner Darkly',author:'Philip K. Dick',desc:"An undercover cop in Orange County becomes addicted to the drug he's investigating, losing the ability to distinguish himself from his own surveillance target. One of Dick's most personal novels."},
  {id:'orlans-inheritance',year:2025,pos:'above',type:'fiction',title:'Orléans Inheritance',author:'Aline Ohanesian',desc:"A novel by Aline Ohanesian."},
  {id:'stormlight',year:2025,pos:'below',type:'fiction',isSeries:true,title:'The Stormlight Archive',author:'Brandon Sanderson',series:["The Way of Kings","Words of Radiance","Oathbringer","Rhythm of War","Wind and Truth"],desc:"Sanderson's magnum opus — a 5-book epic set on the storm-ravaged world of Roshar. Ancient evils return, Knights Radiant reborn, massive political conflicts unfold. Enormously ambitious with an incredibly detailed magic system."},
  // 2026
  {id:'sirens-of-titan',year:2026,pos:'above',type:'fiction',reviewed:true,rating:'4.5/10',reviewLink:'/posts/sirens-of-titan-review/',title:'The Sirens of Titan',author:'Kurt Vonnegut',desc:"Vonnegut's absurdist take on fate, free will, and abuse of power. Malachi Constant is swept across the solar system by forces beyond his control. Classic Vonnegut — entertaining but hard to parse."},
  {id:'between-two-fires',year:2026,pos:'below',type:'fiction',reviewed:true,rating:'5/10',reviewLink:'/posts/between-two-fires-review/',title:'Between Two Fires',author:'Christopher Buehlman',desc:"A knight and a girl cross plague-stricken France encountering angels, demons, and questions about why God would allow such suffering. Horror meets historical fiction. Outside the usual comfort zone."},
  {id:'farseer',year:2026,pos:'above',type:'fiction',isSeries:true,title:'Farseer Trilogy',author:'Robin Hobb',series:["Assassin's Apprentice","Royal Assassin","Assassin's Quest"],desc:"FitzChivalry Farseer, the illegitimate son of a prince, apprenticed to the king's assassin. One of the most emotionally devastating fantasy series ever written — Hobb is merciless with her characters."},
  {id:'moonbound',year:2026,pos:'below',type:'fiction',title:'Moonbound',author:'Robin Sloan',desc:"A far-future adventure told by a narrator who has been asleep for a thousand years. A dragon, a quest, and a world grown wild over millennia. Sloan's characteristic playful prose throughout."},
  {id:'dungeon-crawler-carl',year:2026,pos:'above',type:'fiction',isSeries:true,title:'Dungeon Crawler Carl',author:'Matt Dinniman',series:["Dungeon Crawler Carl","Carl's Doomsday Scenario","The Dungeon Anarchist's Cookbook","The Gate of the Feral Gods","The Butcher's Masquerade","The Eye of the Bedlam Bride","This Inevitable Ruin","A Parade of Horribles"],desc:"Aliens demolish Earth and rebuild it as an 18-level dungeon for an intergalactic reality show. Carl and his ex-girlfriend's cat Princess Donut fight, level up, and entertain the galaxy to survive. Wildly funny and surprisingly emotional."},
  {id:'gaea-trilogy',year:2026,pos:'below',type:'fiction',reviewed:true,rating:'7/10',reviewLink:'/posts/gaea-series-review/',isSeries:true,title:'The Gaea Trilogy',author:'John Varley',series:["Titan","Wizard","Demon"],desc:"A human crew discovers a sentient megastructure near Saturn with its own ecosystems and a godlike intelligence. Book 2 nearly ended the reading experience. Book 3 redeemed everything."},
  {id:'amina-al-sirafi',year:2026,pos:'above',type:'fiction',reviewed:true,rating:'6.6/10',reviewLink:'/posts/amina-al-sirafi-review/',title:'The Adventures of Amina al-Sirafi',author:'Shannon Chakraborty',desc:"A legendary pirate returns to the Arabian Sea for one final score. High seas adventure with treasure, ransoms, demons, and sea monsters. Surprisingly well-researched — every bit of magic rooted in mythology and Arab culture."},
  {id:'hierarchy',year:2026,pos:'below',type:'fiction',isSeries:true,title:'The Hierarchy Series',author:'James Islington',series:["The Will of the Many","The Strength of the Few"],desc:"Roman-inspired society where lower classes cede mental and physical energy to those above them. Vis Telimus infiltrates the prestigious Catenan Academy with a hidden agenda. One of 2023's most lauded fantasy novels; the sequel is reportedly even better."},
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

// year bands + labels
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
    ${b.reviewed ? `<div class="modal-rating">${b.rating}</div>` : ''}
    <div class="modal-desc">${b.desc}</div>
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

// dark mode
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

// drag scroll
const outer = document.getElementById('timelineOuter');
let down=false, sx, sl;
outer.addEventListener('mousedown', e => { down=true; sx=e.pageX-outer.offsetLeft; sl=outer.scrollLeft; });
outer.addEventListener('mouseleave', () => down=false);
outer.addEventListener('mouseup', () => down=false);
outer.addEventListener('mousemove', e => { if(!down)return; e.preventDefault(); outer.scrollLeft=sl-(e.pageX-outer.offsetLeft-sx); });
