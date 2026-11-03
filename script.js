/* =========================================================
   EMAAN IS MY FAVOURITE - CUSTOM CONFIGURATION & LOGIC
   ========================================================= */

// Grouped Photo Collections with Support for Single & Multiple Photos
const PHOTOS = [
  { imgs: ["picture1.jpg"], c: "Us matching on Eid hehe" },
  { imgs: ["picture2.jpg", "picture6.jpg"], c: "My favourite pictures of us" },
  { imgs: ["picture3.jpg"], c: "you looking like an absolute smokeshow" },
  { imgs: ["picture4.jpg", "picture5.jpg"], c: "Us being goofy" },
  { imgs: ["picture7.jpg"], c: "my lil graduate" },
  { imgs: ["picture8.jpg", "picture9.jpg", "picture13.jpg"], c: "with the fam" },
  { imgs: ["picture10.jpg", "picture11.jpg", "picture12.jpg"], c: "your smiles" },
  { imgs: ["picture14.jpg", "picture15.jpg", "picture16.jpg", "picture17.jpg"], c: "your funniest pictures hehehehe" },
  { imgs: ["picture18.jpg", "picture19.jpg"], c: "you and your gorgeousness" }
];

// 12 Reasons why you're my favourite
const REASONS = [
  "Youre always there for me, no matter what happens you give me the feeling that youre my lil supporter.",
  "Youve taught me so much over the years and Id be a completely different person (for the worse) if it wasnt for you",
  "Youre always super considerate of others, even if they may not show it back to you.",
  "You make everyone around you feel like u the lil life of the party.",
  "Youre like... ultra hot",
  "Youve done sooooo much for me over the years whenever I feeling down you always try your best to make my moo better",
  "You put up with allll my my shiz for so long, and still put up with it even though i super stupid ya.",
  "Weve never had issues of trust when we were date, and that says alot about you and the kind of person you are",
  "Ive always felt like your my bestest friend ever and that was super soon after we met.",
  "You always did everything you could to make me feel special on all occasions.",
  "Youre so so so forgiving of me and my shenanigans all the time (even though u shouldnt be)",
  "Youve made me a better person overall and I dont think I could have acheived that without you, and I know theres still a lot I can learn from u over time."
];

// Section E: Snapshots of Us (Replacing "Our Story")
const US_PHOTOS = [
  { img: "picture20.jpg", caption: "You & Me ♥" },
  { img: "picture21.jpg", caption: "Hehe" },
  { img: "picture22.jpg", caption: "Us in our lil hub" },
  { img: "picture23.jpg", caption: "My best bday" }
];

// Main Letter (Verbatim)
const LETTER = {
  title: "Dear Emaan,",
  body: [
    "I hope you know that youre lillaly the most important person in my whoooleee life and I would never ever knowingly do anything to hurt you. Im super sorry about all my stupidness recently, I really did want you to come.",
    "I was just so confused with everything going on, your family, the homelessness, what is better for you in the long run or short run, i just got so overloaded. I know its too late now but I hope you know that you always have a place with me, wherever you are in the world and wherever I am you can always come crash and live with me wheneverrrr you want, no restrictions i pomise.",
    "Youre the most quirky most intelligent most beautiful person Ive ever met and I know this Birthday may not be the best but I know theres lotss of amazing birthdays in your future to look forward to. I love you and I wish you a very happy birthday."
  ],
  sign: "Always yours.\nAli"
};

// Things I Owe You (Coupons)
const COUPONS = [
  { t: "One back massage", x: "any time, any place, you name it" },
  { t: "Movie night", x: "(you can pick a rom com nws)" },
  { t: "Ramen and Dumpling date", x: "(and some bee) hehe" },
  { t: "One ultra big huggie", x: "(redeemable forever)" },
  { t: "One actual date night", x: "(properly planned)" },
  { t: "The \"shutup, im right\" coupon", x: "redeemable any time you wanna end conversation and win argument" }
];

/* ===================== ENGINE & INTERACTIVITY ===================== */

const $ = (s) => document.querySelector(s);
const make = (tag, cls, html) => { 
  const e = document.createElement(tag); 
  if (cls) e.className = cls; 
  if (html != null) e.innerHTML = html; 
  return e; 
};
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

// Autumn Warm Placeholder Generator if images aren't present yet
const ph = (t, i) => {
  const c = [["#c8642b", "#f3d9a4"], ["#8a2b2b", "#f0c9a0"], ["#6b7a3a", "#efe2b4"], ["#b9852f", "#f7e6c4"]][i % 4];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='750'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c[1]}'/><stop offset='1' stop-color='${c[0]}'/></linearGradient></defs><rect width='600' height='750' fill='url(#g)'/><text x='300' y='360' font-size='110' text-anchor='middle'>☕🍂</text><text x='300' y='470' font-size='32' text-anchor='middle' fill='#fff' font-family='Georgia'>${esc(t)}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

const pic = (f, t, i) => {
  const e = new Image(); 
  e.alt = t; 
  e.loading = "lazy"; 
  e.src = f.includes("/") ? f : f;
  e.onerror = () => { e.onerror = null; e.src = ph(t, i); };
  return e;
};

/* Lightbox Modal & Navigatable Carousel */
const lb = $("#lb");
let currentGroup = [];
let currentIdx = 0;

function openCarousel(group, startIdx, caption) {
  currentGroup = group;
  currentIdx = startIdx;
  renderCarousel(caption);
  lb.classList.add("on");
}

function renderCarousel(caption) {
  lb.innerHTML = "";
  const box = make("div", "box");
  const closeBtn = make("button", "x", "×");
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.onclick = hide;

  const pol = make("div", "pol lb-pol");
  const imgNode = pic(currentGroup[currentIdx], caption, currentIdx);
  pol.append(imgNode, make("span", "", esc(caption)));

  // Add navigation controls if multiple images exist in this card group
  if (currentGroup.length > 1) {
    const navBar = make("div", "carousel-nav");
    const prevBtn = make("button", "c-btn prev", "‹");
    const nextBtn = make("button", "c-btn next", "›");
    const counter = make("span", "c-counter", `${currentIdx + 1} / ${currentGroup.length}`);

    prevBtn.onclick = (e) => {
      e.stopPropagation();
      currentIdx = (currentIdx - 1 + currentGroup.length) % currentGroup.length;
      renderCarousel(caption);
    };

    nextBtn.onclick = (e) => {
      e.stopPropagation();
      currentIdx = (currentIdx + 1) % currentGroup.length;
      renderCarousel(caption);
    };

    navBar.append(prevBtn, counter, nextBtn);
    pol.append(navBar);
  }

  box.append(pol, closeBtn);
  lb.append(box);
}

const hide = () => lb.classList.remove("on");
lb.addEventListener("click", (e) => { if (e.target === lb) hide(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("on")) return;
  if (e.key === "Escape") hide();
  if (e.key === "ArrowLeft" && currentGroup.length > 1) {
    currentIdx = (currentIdx - 1 + currentGroup.length) % currentGroup.length;
    renderCarousel("");
  }
  if (e.key === "ArrowRight" && currentGroup.length > 1) {
    currentIdx = (currentIdx + 1) % currentGroup.length;
    renderCarousel("");
  }
});

/* Photo Wall (Chapter One) */
const rots = [-3, 2, -1.5, 3, -2.5, 1.5, -3.5, 2.5, -1];
PHOTOS.forEach((p, i) => {
  const b = make("button", "pol");
  b.style.setProperty("--rot", rots[i % rots.length] + "deg");
  
  // Display count badge if multiple images exist
  if (p.imgs.length > 1) {
    b.append(make("span", "stack-badge", `📸 ${p.imgs.length} photos`));
    b.classList.add("multi-card");
  }
  
  b.append(pic(p.imgs[0], p.c, i), make("span", "pol-caption", esc(p.c)));
  b.onclick = () => openCarousel(p.imgs, 0, p.c);
  $("#wall").append(b);
});

/* Reason Flip Cards (Chapter Two) */
REASONS.forEach((r, i) => {
  const b = make("button", "rc", `<div><p class="a">♥</p><p class="b">${esc(r)}</p></div>`);
  b.setAttribute("aria-label", "Reveal reason " + (i + 1));
  b.onclick = () => b.classList.toggle("f");
  $("#cards").append(b);
});

let lastReason = -1;
$("#spark").onclick = () => {
  let n; 
  do { n = Math.floor(Math.random() * REASONS.length); } 
  while (n === lastReason && REASONS.length > 1);
  lastReason = n; 
  $("#sparkout").textContent = REASONS[n];
};

/* Chapter Three: Us & Memories Scrapbook */
US_PHOTOS.forEach((item, i) => {
  const card = make("div", "us-card");
  card.style.setProperty("--rot", rots[(i + 2) % rots.length] + "deg");
  const imgNode = pic(item.img, item.caption, i + 20);
  const cap = make("span", "hand us-cap", esc(item.caption));
  card.append(imgNode, cap);
  card.onclick = () => openCarousel([item.img], 0, item.caption);
  $("#usGallery").append(card);
});

/* Main Letter (Chapter Four) */
const L = $("#mainLetter");
L.append(make("h3", "", esc(LETTER.title)));
LETTER.body.forEach((t) => L.append(make("p", "", esc(t))));
L.append(make("p", "sign-p", esc(LETTER.sign).replace(/\n/g, "<br>")));

/* Coupons (Chapter Five) */
COUPONS.forEach((c) => {
  const d = make("div", "cp", `<h3>${esc(c.t)}</h3><p>${esc(c.x)}</p>`);
  const b = make("button", "", "Redeem ♥");
  b.onclick = () => { 
    d.classList.toggle("used"); 
    b.textContent = d.classList.contains("used") ? "Redeemed ✓" : "Redeem ♥"; 
  };
  d.append(b); 
  $("#cp").append(d);
});

/* Falling Autumn Leaves & Dynamic Floating Art */
if (!matchMedia("(prefers-reduced-motion:reduce)").matches) {
  const set = ["🍂", "🍁", "🍃", "☕", "✨"];
  for (let i = 0; i < 18; i++) {
    const l = make("i", "", set[i % set.length]);
    l.style.cssText = `left:${Math.random() * 100}%;font-size:${16 + Math.random() * 22}px;animation-duration:${10 + Math.random() * 12}s;animation-delay:${-Math.random() * 20}s;--dx:${(Math.random() - .5) * 240}px;--r:${(Math.random() > .5 ? 1 : -1) * (240 + Math.random() * 360)}deg`;
    $("#leaves").append(l);
  }
}

/* Gate & Smooth Navigation */
$("#open").onclick = () => { 
  $("#gate").classList.add("open"); 
  document.body.classList.remove("locked"); 
  window.scrollTo(0, 0); 
};

const nav = $("#nav");
const onScroll = () => nav.classList.toggle("sc", window.scrollY > 40);
onScroll(); 
addEventListener("scroll", onScroll, { passive: true });