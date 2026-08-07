/* ============================================================================
   The Slip — investor demo. One Saturday fourball, slip to settlement.
   Self-contained: no dependencies, no network beyond images/fonts.
   The ledger is real: standings fold from per-hole events, settlement nets
   from standings, and both are asserted zero-sum at load. The canonical path
   reproduces the concept screens on the investment page to the dollar.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------- DATA-START */

  var PLAYERS = [
    { id: "J", name: "Johannes", ini: "JR", ava: "",       hc: 12, note: "HC 12 · organiser" },
    { id: "D", name: "Dave",     ini: "DK", ava: "ava--d", hc: 18, note: "HC 18 · gets 6 strokes" },
    { id: "M", name: "Markus",   ini: "MB", ava: "ava--m", hc: 8,  note: "HC 8 · gives 4" },
    { id: "P", name: "Piet",     ini: "PV", ava: "ava--p", hc: 21, note: "HC 21 · gets 9 strokes" }
  ];

  // Games on the slip. Exposure caps: skins 12x, nassau 7x (3 bets + 4 presses),
  // dots 32x — table-stakes caps, shown before anyone accepts.
  var GAMES = [
    { id: "skins",  name: "Skins",  sub: "carryovers on",                stake: 10, capX: 12 },
    { id: "nassau", name: "Nassau", sub: "presses allowed",              stake: 5,  capX: 7  },
    { id: "dots",   name: "Dots",   sub: "greenies · sandies · the snake", stake: 1, capX: 32 }
  ];

  var TIERS = [
    { entry: 1,   prize: 500 },
    { entry: 5,   prize: 2500 },
    { entry: 10,  prize: 10000 },
    { entry: 50,  prize: 50000 },
    { entry: 100, prize: 100000 }
  ];

  // Holes 1–6, scripted. deltas = [J, D, M, P], each hole zero-sum.
  var FRONT = [
    { h: 1, label: "1st halved — skin carries",                              deltas: [0, 0, 0, 0] },
    { h: 2, label: "2nd · skin $20 — Johannes, carried from the 1st",        deltas: [13, -4, -4, -5] },
    { h: 3, label: "3rd · dots trade — sandie Markus",                       deltas: [-2, 2, 2, -2] },
    { h: 4, label: "4th · greenie Johannes · three-putt: the snake → Markus", deltas: [5, -2, -1, -2] },
    { h: 5, label: "5th · skin $10 — Dave · net birdie · sandie dot",        deltas: [-3, 9, -3, -3] },
    { h: 6, label: "6th halved — skin carries, $20 rides on the 7th",        deltas: [3, 4, 2, -9] }
  ];

  // Holes 8–18, scripted. Rebased on top of wherever hole 7 actually lands.
  var BACK = [
    { h: 8,  label: "8th · skin $10 — Johannes · Dave finds the water",      deltas: [4, -6, 1, 1] },
    { h: 9,  label: "9th · front nine closes — Johannes takes the nassau",   deltas: [6, -8, 1, 1] },
    { h: 10, label: "10th · greenie Markus · sandie Johannes",               deltas: [2, -3, 2, -1] },
    { h: 11, label: "11th · skin $10 — Johannes",                            deltas: [6, -7, 0, 1] },
    { h: 12, label: "12th · dots run — Piet: greenie + sandie",              deltas: [-2, -2, -1, 5] },
    { h: 13, label: "13th halved — the snake passes to Dave",                deltas: [2, -4, 2, 0] },
    { h: 14, label: "14th · skin $20 — Johannes, carried",                   deltas: [7, -8, 1, 0] },
    { h: 15, label: "15th · sandie Markus · Dave presses the back",          deltas: [1, -3, 1, 1] },
    { h: 16, label: "16th · Dave's press goes wrong",                        deltas: [3, -4, 1, 0] },
    { h: 17, label: "17th halved — skin carries",                            deltas: [2, -3, 1, 0] },
    { h: 18, label: "18th · skin $10 — Johannes · the snake bites Dave",     deltas: [5, -1, 0, -4] }
  ];

  // The skins line, hole by hole — who took the skin, where it carried.
  // "C" = halved, skin carries. Hole 7 is the staged hole: Dave's verified
  // ace takes the skin and the carry with it.
  var SKINS = [
    { h: 1, s: "C" }, { h: 2, s: "J" }, { h: 3, s: "M" }, { h: 4, s: "J" },
    { h: 5, s: "D" }, { h: 6, s: "C" }, { h: 7, s: "D", gold: true },
    { h: 8, s: "J" }, { h: 9, s: "M" }, { h: 10, s: "M" }, { h: 11, s: "J" },
    { h: 12, s: "P" }, { h: 13, s: "C" }, { h: 14, s: "J" }, { h: 15, s: "M" },
    { h: 16, s: "J" }, { h: 17, s: "C" }, { h: 18, s: "J" }
  ];

  // The concept-screen settlement card, used verbatim on the canonical path.
  var CANONICAL_NETS = [41, -7, -6, -28];
  var CANONICAL_TRANSFERS = [
    { from: "P", to: "J", amt: 28, rail: "SnapScan", sub: "skins · nassau · dots" },
    { from: "D", to: "J", amt: 13, rail: "EFT",      sub: "net of the front-nine press" },
    { from: "M", to: "D", amt: 6,  rail: "Pay link", sub: "back-nine nassau" }
  ];

  var SEASON = [
    { id: "D", rounds: 27, amt: 240, note: "the ace round included" },
    { id: "M", rounds: 27, amt: 85,  note: "steady since March" },
    { id: "P", rounds: 27, amt: -60, note: "he owns the 12th" }
  ];

  /* --------------------------------------------------------------- DATA-END */

  /* ------------------------------------------------------------------ ENGINE */

  function fold(rows, base) {
    var t = (base || [0, 0, 0, 0]).slice();
    rows.forEach(function (r) { for (var i = 0; i < 4; i++) t[i] += r.deltas[i]; });
    return t;
  }
  function zeroSum(rows) {
    return rows.every(function (r) {
      return r.deltas[0] + r.deltas[1] + r.deltas[2] + r.deltas[3] === 0;
    });
  }
  // Greedy minimal netting — used whenever the round diverges from the script.
  function greedyNet(nets) {
    var cred = [], deb = [], out = [];
    nets.forEach(function (n, i) {
      if (n > 0) cred.push({ i: i, n: n });
      if (n < 0) deb.push({ i: i, n: -n });
    });
    cred.sort(function (a, b) { return b.n - a.n; });
    deb.sort(function (a, b) { return b.n - a.n; });
    while (deb.length && cred.length) {
      var d = deb[0], c = cred[0], amt = Math.min(d.n, c.n);
      out.push({ from: PLAYERS[d.i].id, to: PLAYERS[c.i].id, amt: amt, rail: "Pay link", sub: "netted" });
      d.n -= amt; c.n -= amt;
      if (!d.n) deb.shift();
      if (!c.n) cred.shift();
      deb.sort(function (a, b) { return b.n - a.n; });
      cred.sort(function (a, b) { return b.n - a.n; });
    }
    return out;
  }
  function settle(nets) {
    var canon = nets.length === 4 && nets.every(function (n, i) { return n === CANONICAL_NETS[i]; });
    var transfers = canon ? CANONICAL_TRANSFERS : greedyNet(nets);
    // Invariant: per-player flow conservation — what each player pays and
    // receives across the card must equal their net position exactly.
    var flow = { J: 0, D: 0, M: 0, P: 0 };
    transfers.forEach(function (t) { flow[t.from] -= t.amt; flow[t.to] += t.amt; });
    PLAYERS.forEach(function (p, i) {
      if (flow[p.id] !== nets[i]) throw new Error("settlement does not reconcile for " + p.id + ": " + flow[p.id] + " vs " + nets[i]);
    });
    return transfers;
  }
  // Data self-checks (run at load; a broken script never renders a wrong card).
  (function verify() {
    if (!zeroSum(FRONT) || !zeroSum(BACK)) throw new Error("hole deltas not zero-sum");
    var thru6 = fold(FRONT);
    var canonical7 = [-11, 33, -11, -11];
    var final = fold(BACK, fold([{ deltas: canonical7 }], thru6));
    var ok6 = [16, 9, -4, -21].every(function (v, i) { return thru6[i] === v; });
    var okF = CANONICAL_NETS.every(function (v, i) { return final[i] === v; });
    if (!ok6 || !okF) throw new Error("round script off checkpoint: " + thru6 + " / " + final);
    settle(final);
  })();

  function exposureParts() {
    return GAMES.map(function (g) { return { name: g.name, amt: g.stake * g.capX }; });
  }
  function exposureTotal() {
    return exposureParts().reduce(function (s, p) { return s + p.amt; }, 0);
  }

  /* ------------------------------------------------------------------- STATE */

  var S = {
    act: 0,
    mode: "story",            // story | free
    tab: "slip",
    tier: TIERS[4],           // $100 → $100,000
    jackpotIn: true,
    thru6: fold(FRONT),
    hole7: null,              // deltas actually scored on the 7th
    scores: { J: 3, D: 1, M: 3, P: 4 },
    sandieM: false,
    entered: false,
    confirmed: false,
    final: null,
    transfers: null,
    paid: {},                 // transfer index -> "paid" | "iou"
    seasonBumped: false,
    storyDone: false
  };

  function hole7Deltas() {
    // Dave's verified 1 always takes the pot: $20 carried + $10 skin, $10 from
    // each of the other three, plus the greenie dot ($1 from each). Optional
    // sandie for Markus if the group scores it that way.
    var d = [-11, 33, -11, -11];
    if (S.sandieM) { d = [d[0] - 1, d[1] - 1, d[2] + 3, d[3] - 1]; }
    return d;
  }
  function computeFinal() {
    var after7 = fold([{ deltas: S.hole7 || hole7Deltas() }], S.thru6);
    S.final = fold(BACK, after7);
    S.transfers = settle(S.final);
  }

  /* --------------------------------------------------------------------- DOM */

  var $screen = document.getElementById("screen");
  var $tabs = document.getElementById("tabs");
  var $coach = document.getElementById("coach");
  var $coachText = document.getElementById("coach-text");
  var $coachDots = document.getElementById("coach-dots");
  var $sbTime = document.getElementById("sb-time");
  var $sbDay = document.getElementById("sb-day");
  var $sbBatt = document.getElementById("sb-batt-fill");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function h(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; }
  function money(n) { return (n < 0 ? "−$" : "+$") + Math.abs(n); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function $(sel) { return $screen.querySelector(sel); }
  function $all(sel) { return Array.prototype.slice.call($screen.querySelectorAll(sel)); }

  function revealPulse() {
    // When a step hands the golfer a pulsing CTA, make sure it is on screen.
    var el = $screen.querySelector(".pulse");
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
  }
  function setClock(day, time, batt) {
    $sbDay.textContent = day; $sbTime.textContent = time;
    if (batt) $sbBatt.style.width = batt + "%";
  }
  function setTab(tab) {
    S.tab = tab;
    Array.prototype.forEach.call($tabs.children, function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-tab") === tab);
    });
  }
  function toast(msg) {
    var device = document.getElementById("device");
    var old = device.querySelector(".toast");
    if (old) old.remove();
    var el = h('<div class="toast">' + msg + "</div>").firstChild;
    device.appendChild(el);
    setTimeout(function () { el.remove(); }, 2400);
  }
  function confetti() {
    if (reduceMotion) return;
    var wrap = h('<div class="confetti"></div>').firstChild;
    var colors = ["#eefa5a", "#c9a94e", "#e8d48b", "#f5f0e1"];
    for (var i = 0; i < 26; i++) {
      var f = document.createElement("i");
      f.style.left = (3 + Math.random() * 94) + "%";
      f.style.background = colors[i % 4];
      f.style.animationDelay = (Math.random() * 0.5) + "s";
      f.style.transform = "rotate(" + Math.random() * 180 + "deg)";
      wrap.appendChild(f);
    }
    document.getElementById("device").appendChild(wrap);
    setTimeout(function () { wrap.remove(); }, 2600);
  }
  function countUp(el, to, ms) {
    if (reduceMotion) { el.textContent = "$" + to.toLocaleString("en-US"); return; }
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / ms);
      k = 1 - Math.pow(1 - k, 3);
      el.textContent = "$" + Math.round(to * k).toLocaleString("en-US");
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ----------------------------------------------------------------- WIDGETS */

  function playerRow(p, right, subOverride) {
    return '<div class="row"><span class="ava ' + p.ava + '">' + p.ini + "</span>" +
      '<span class="who">' + p.name + "<small>" + esc(subOverride || p.note) + "</small></span>" + (right || "") + "</div>";
  }
  function standingsCard(t, cap, reasons) {
    var order = [0, 1, 2, 3].sort(function (a, b) { return t[b] - t[a]; });
    return '<div class="card enter"><span class="cap">' + cap + "</span>" +
      order.map(function (i) {
        var p = PLAYERS[i], v = t[i];
        return '<div class="row"><span class="ava ' + p.ava + '">' + p.ini + "</span>" +
          '<span class="who">' + p.name + "<small>" + esc(reasons[p.id] || "") + "</small></span>" +
          '<span class="amt ' + (v >= 0 ? "up" : "dn") + '">' + money(v) + "</span></div>";
      }).join("") + "</div>";
  }
  function holeStory(hn) {
    if (hn === 7) return "The staged hole. Dave's verified ace — the skin, the carry, and the group's $" + (S.tier.prize / 1000) + "K ticket, all his and theirs.";
    var r = FRONT.concat(BACK).filter(function (x) { return x.h === hn; })[0];
    return r ? r.label : "Halved — the skin carries.";
  }
  function attestPair(hn) {
    // Deterministic pair per hole: someone enters, someone else confirms.
    var order = ["J", "D", "M", "P"];
    var a = order[hn % 4], b = order[(hn + 1) % 4];
    var name = function (id) { return PLAYERS.filter(function (p) { return p.id === id; })[0].name; };
    return "Entered by " + name(a) + " · confirmed by " + name(b);
  }
  function skinsBoardCard(extraClass) {
    function cell(x) {
      var cls = "scell" + (x.s === "C" ? " scell--carry" : "") + (x.gold ? " scell--gold" : "");
      var body;
      if (x.s === "C") body = "<b>→</b>";
      else {
        var p = PLAYERS.filter(function (q) { return q.id === x.s; })[0];
        body = '<span class="sini" style="background:var(--ava-' + x.s.toLowerCase() + ')">' + p.ini + "</span>";
      }
      return '<button class="' + cls + '" data-hole="' + x.h + '"><small>' + x.h + "</small>" + body + "</button>";
    }
    return '<div class="card ' + (extraClass || "") + '"><span class="cap">Skins · hole by hole — tap a hole</span>' +
      '<div class="sboard">' + SKINS.slice(0, 9).map(cell).join("") + "</div>" +
      '<div class="sboard">' + SKINS.slice(9).map(cell).join("") + "</div>" +
      '<div class="sboard-legend"><span>initials — skin won</span><span>→ halved · carries</span><span style="color:var(--gold-soft)">7 — the $' + (S.tier.prize / 1000) + "K hole</span></div></div>";
  }
  function openHoleSheet(hn) {
    var x = SKINS[hn - 1];
    var result = x.s === "C"
      ? "Halved — no skin paid; the pot rides to the next hole."
      : PLAYERS.filter(function (p) { return p.id === x.s; })[0].name + " takes the skin.";
    openSheet(
      "<h3>Hole " + hn + (x.gold ? ' · the $' + (S.tier.prize / 1000) + "K hole" : "") + "</h3>" +
      '<div class="card card--flat" style="margin-top:0.2rem">' +
      '<div class="row row--bare"><span class="who">' + esc(holeStory(hn)) + "</span></div>" +
      '<div class="row"><span class="who">Skins</span><span class="state">' + esc(result) + "</span></div>" +
      '<div class="row"><span class="who" style="font-weight:600;color:var(--cream-mut);font-size:0.78rem">' + esc(attestPair(hn)) +
      " — two attestations on every hole. The app keeps score and adjudicates nothing.</span>" +
      (x.gold ? '<span class="chip chip--optic">Verified</span>' : "") + "</div></div>" +
      '<button class="btn btn--sm" id="hole-back" style="margin-top:0.5rem">All 18</button>',
      function (sheet) {
        sheet.querySelector("#hole-back").addEventListener("click", openBoardSheet);
      }
    );
  }
  function openBoardSheet() {
    openSheet(
      "<h3>The skins line</h3>" + skinsBoardCard("card--flat") +
      '<p class="note">Every skin traces to an entered-and-confirmed hole. Halved holes carry the pot — the reason the 7th had $20 riding before anyone swung.</p>',
      function (sheet) {
        sheet.querySelectorAll("[data-hole]").forEach(function (b) {
          b.addEventListener("click", function () { openHoleSheet(+b.getAttribute("data-hole")); });
        });
      }
    );
  }
  function wireBoard(root) {
    (root || $screen).querySelectorAll("[data-hole]").forEach(function (b) {
      b.addEventListener("click", function () { openHoleSheet(+b.getAttribute("data-hole")); });
    });
  }
  function feedCard(rows, cap) {
    return '<div class="card feed enter-2"><span class="cap">' + (cap || "The round so far") + "</span>" +
      rows.map(function (r) {
        var gold = r.gold ? " hno--gold" : "";
        return '<div class="row"><span class="hno' + gold + '">' + r.h + '</span><span class="who">' + esc(r.label) + "</span></div>";
      }).join("") + "</div>";
  }

  /* ----------------------------------------------------------------- SCREENS */

  function renderCover() {
    setTab("slip");
    $screen.innerHTML =
      '<div class="cover">' +
      '<img class="cover__logo enter" src="assets/img/logo-dark-bg.webp" alt="Get Lucky Golf Club">' +
      '<p class="cover__kicker enter-2">Product demo · the app this raise builds</p>' +
      '<h2 class="cover__title enter-2">The<br>Slip</h2>' +
      '<p class="cover__sub enter-3">One Saturday fourball, slip to settlement — with $100,000 riding on the 7th.</p>' +
      '<button class="btn enter-4" id="start">Tap through Saturday</button>' +
      '<button class="linkline enter-5" id="roam">Or explore on your own</button>' +
      '<p class="cover__foot">Concept build · no live accounts · peer money never touched</p>' +
      "</div>";
    $("#start").addEventListener("click", function () { S.mode = "story"; go(1); });
    $("#roam").addEventListener("click", function () { S.mode = "free"; finishData(); go(9); });
  }

  function renderBuilder() {
    setTab("slip");
    var exp = exposureTotal();
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">The Slip</span><span class="appbar__hint">Sat 07:30 · Boschenmeer</span></div>' +

      '<div class="card enter"><span class="cap">The four · handicaps applied</span>' +
      PLAYERS.map(function (p, i) {
        var chip = i === 3 ? '<span class="chip">Invited</span>' : '<span class="chip chip--on">In</span>';
        return playerRow(p, chip);
      }).join("") +
      '<div class="row row--bare"><span class="who" style="font-weight:600;color:var(--cream-mut);font-size:0.78rem">Rematch of last Saturday — same four, one tap. Handicaps pulled; every allowance is a house rule away.</span></div></div>' +

      '<div class="card enter-2"><span class="cap">The games · tap a stake</span>' +
      GAMES.map(function (g, i) {
        return '<div class="row"><span class="who">' + g.name + "<small>" + g.sub + "</small></span>" +
          '<span class="stake" data-g="' + i + '"><button data-d="-1" aria-label="lower stake">−</button><b>$' + g.stake + "</b>" +
          '<button data-d="1" aria-label="raise stake">+</button></span></div>';
      }).join("") + "</div>" +

      '<div class="card card--gold enter-3" id="jackpot-card"><span class="cap">The house layer · insured</span>' +
      '<div class="row row--bare"><span class="who">$' + S.tier.prize.toLocaleString("en-US") + ' hole-in-one · the 7th' +
      "<small>$" + S.tier.entry + " each · any ace pays the group · Santam</small></span>" +
      '<span class="chip chip--gold" id="tier-open">' + (S.jackpotIn ? "4 in · $" + S.tier.entry : "Add") + "</span></div></div>" +

      '<div class="exposure enter-4"><span class="exposure__label">Your max exposure today — shown before anyone accepts</span>' +
      '<span style="display:flex;align-items:center;gap:0.5rem"><span class="exposure__amt" id="exp">$' + exp + '</span>' +
      '<button class="exposure__info" id="exp-open" aria-label="how it is worked out">i</button></span></div>' +

      '<button class="btn enter-5" id="send">Send to the fourball</button>';

    $all(".stake button").forEach(function (b) {
      b.addEventListener("click", function () {
        var wrap = b.parentElement, gi = +wrap.getAttribute("data-g");
        var g = GAMES[gi];
        var steps = g.id === "dots" ? [1, 2, 5] : g.id === "nassau" ? [2, 5, 10, 20] : [2, 5, 10, 20, 50];
        var idx = steps.indexOf(g.stake);
        idx = Math.min(steps.length - 1, Math.max(0, idx + (+b.getAttribute("data-d"))));
        g.stake = steps[idx];
        wrap.querySelector("b").textContent = "$" + g.stake;
        var exp = document.getElementById("exp");
        exp.textContent = "$" + exposureTotal();
        exp.classList.remove("flash");
        void exp.offsetWidth;
        exp.classList.add("flash");
      });
    });
    $("#exp-open").addEventListener("click", openExposureSheet);
    $("#tier-open").addEventListener("click", openTierSheet);
    $("#send").addEventListener("click", function () { go(2); });
    coachFor(1);
  }

  function openExposureSheet() {
    var parts = exposureParts();
    openSheet(
      "<h3>Worked out, not guessed</h3>" +
      '<div class="card card--flat" style="margin-top:0.2rem">' +
      parts.map(function (p) {
        var sub = p.name === "Skins" ? "carryover pot · table-stakes cap" : p.name === "Nassau" ? "front · back · overall + presses" : "greenies · sandies · the snake";
        return '<div class="row"><span class="who">' + p.name + "<small>" + sub + '</small></span><span class="amt">$' + p.amt + "</span></div>";
      }).join("") +
      '<div class="row"><span class="who"><b>Worst case, capped</b><small>no accepted slip can cost more than this</small></span><span class="amt up">$' + exposureTotal() + "</span></div></div>" +
      '<p class="note">The group jackpot is separate — a $' + S.tier.entry + " ticket you choose to buy, never exposure. Self-set loss limits and cooling-off live in Settings.</p>"
    );
  }
  function openTierSheet() {
    openSheet(
      "<h3>The group ticket</h3>" +
      '<div class="tier">' + TIERS.map(function (t) {
        return '<button data-e="' + t.entry + '" class="' + (t.entry === S.tier.entry ? "is-on" : "") + '">$' + t.entry +
          "<small>$" + (t.prize >= 1000 ? (t.prize / 1000) + "k" : t.prize) + "</small></button>";
      }).join("") + "</div>" +
      '<p class="note">Each of the four buys one swing on the 7th at this entry — separate paid entries, never part of the subscription. Any ace pays the whole group. Filmed from the tee, verified by Get Lucky, paid by Santam.</p>' +
      '<button class="btn btn--sm" id="tier-done" style="margin-top:0.5rem">Done</button>',
      function (sheet) {
        sheet.querySelectorAll(".tier button").forEach(function (b) {
          b.addEventListener("click", function () {
            var e = +b.getAttribute("data-e");
            S.tier = TIERS.filter(function (t) { return t.entry === e; })[0];
            sheet.querySelectorAll(".tier button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
          });
        });
        sheet.querySelector("#tier-done").addEventListener("click", function () { closeSheet(); renderBuilder(); });
      }
    );
  }

  function renderSent() {
    setTab("slip");
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">Slip sent</span><span class="appbar__hint">Thu 21:14 · group chat</span></div>' +
      '<div class="card enter" id="accepts"><span class="cap">Saturday fourball · Boschenmeer</span>' +
      playerRow(PLAYERS[1], '<span class="state state--dim" id="st-D">Sent</span>', '"skins are mine this week"') +
      playerRow(PLAYERS[2], '<span class="state state--dim" id="st-M">Sent</span>', "accepted in one tap") +
      playerRow(PLAYERS[3], '<span class="state state--dim" id="st-P">Sent</span>', "plays free as your guest today") +
      playerRow(PLAYERS[0], '<span class="chip chip--gold" id="st-all">1 of 4</span>', "organiser") +
      "</div>" +
      '<div class="card enter-2"><span class="cap">Shown before anyone taps accept</span>' +
      '<div class="row"><span class="who">Your maximum exposure<small>skins · nassau with presses · dots — capped</small></span><span class="amt">$' + exposureTotal() + "</span></div>" +
      '<div class="row"><span class="who">Group jackpot · $' + S.tier.entry + ' each<small>opt-in · an ace pays the group</small></span><span class="amt up">$' + S.tier.prize.toLocaleString("en-US") + "</span></div></div>" +
      '<div class="card card--gold enter-3"><div class="row row--bare"><span class="who">The slip locks at the first tee<small>Saturday 07:30 — no edits after that</small></span><span class="chip" id="lock-chip">Waiting</span></div></div>' +
      '<p class="note enter-4" style="text-align:center;color:var(--cream-mut);font-size:0.78rem;margin:0.2rem 0 0.6rem">Three of the four never paid a cent to be here — <b style="color:var(--cream)">guests ride free</b></p>' +
      '<button class="btn enter-5" id="to-sat" disabled>Saturday, 07:30 — first tee</button>';

    var seq = [
      { id: "st-M", t: 900,  label: "Accepted ✓" },
      { id: "st-D", t: 2100, label: "Accepted ✓" },
      { id: "st-P", t: 3400, label: "Accepted ✓" }
    ];
    seq.forEach(function (s, i) {
      setTimeout(function () {
        var el = document.getElementById(s.id);
        if (!el) return;
        el.textContent = s.label; el.className = "state";
        var all = document.getElementById("st-all");
        all.textContent = (i + 2) + " of 4";
        if (i === seq.length - 1) {
          all.textContent = "4 of 4";
          var lock = document.getElementById("lock-chip");
          lock.textContent = "Locked in"; lock.className = "chip chip--on";
          var btn = document.getElementById("to-sat");
          btn.disabled = false; btn.classList.add("pulse");
          coachFor(2.5);
          revealPulse();
        }
      }, reduceMotion ? 50 * (i + 1) : s.t);
    });
    $("#to-sat").addEventListener("click", function () { go(3); });
    coachFor(2);
  }

  function renderLedger() {
    setTab("ledger");
    var visible = FRONT.slice(3).map(function (r) { return { h: r.h, label: r.label }; }).reverse();
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">Live ledger</span><span class="appbar__hint">Thru 6 · pot $34</span></div>' +
      standingsCard(S.thru6, "Standings · thru 6", {
        J: "2 skins · greenie", D: "birdie from the bunker", M: "holds the snake", P: "pressed the front nine"
      }) +
      feedCard(visible) +
      '<div class="card card--gold enter-3"><div class="row row--bare"><span class="who">Next · the 7th is the $' +
      (S.tier.prize / 1000) + 'K hole<small>group ticket armed · tee cam ready</small></span><span class="chip chip--live"><span class="dot"></span>Live</span></div></div>' +
      '<button class="btn enter-4" id="to-shot">Head to the 7th tee</button>' +
      '<p class="note" style="text-align:center;color:var(--cream-mut);font-size:0.75rem">Every line above is two attestations — one enters, one confirms. The app keeps score and never touches the pot.</p>';
    $("#to-shot").addEventListener("click", function () { go(4); });
    coachFor(3);
  }

  function renderShotArmed() {
    setTab("shot");
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">The $' + (S.tier.prize / 1000) + 'K hole</span><span class="appbar__hint">7th · Par 3 · 141 yd</span></div>' +
      '<div class="view enter"><img src="assets/img/courses/boschenmeer.webp" alt=""><div class="view__grad"></div>' +
      '<span class="view__tag">Hole 7 · flag back-left</span>' +
      '<div class="view__bar" id="arm-bar"><span id="arm-1">GPS locating…</span></div></div>' +
      '<div class="card card--gold enter-2"><div class="row row--bare"><span class="who">Group ticket<small>4 × $' + S.tier.entry + " · any ace pays the group</small></span>" +
      '<span class="amt up">$' + S.tier.prize.toLocaleString("en-US") + "</span></div></div>" +
      '<div class="card enter-3"><span class="cap">Swing order · every swing filmed</span>' +
      playerRow(PLAYERS[0], '<span class="state state--dim" id="sw-J">Up first</span>', "HC 12") +
      playerRow(PLAYERS[2], '<span class="state state--dim" id="sw-M">Waiting</span>', "HC 8") +
      playerRow(PLAYERS[1], '<span class="state state--dim" id="sw-D">Waiting</span>', "HC 18") +
      playerRow(PLAYERS[3], '<span class="state state--dim" id="sw-P">Waiting</span>', "HC 21 · guest") +
      "</div>" +
      '<button class="btn enter-4" id="film" disabled>Film the swings</button>' +
      '<p class="note" style="text-align:center;color:var(--cream-mut);font-size:0.75rem">Underwritten by Santam — paid by the insurer, never from anyone\'s pocket.</p>';

    var bar = document.getElementById("arm-bar");
    var steps = ['<span class="ok">GPS ✓ inside the 7th</span>', '<span class="ok">Ball GL-07 registered ✓</span>', '<span class="ok">Tee cam locked ✓</span>'];
    steps.forEach(function (html, i) {
      setTimeout(function () {
        if (!bar.isConnected) return;
        if (i === 0) bar.innerHTML = html; else bar.innerHTML += " · " + html;
        if (i === steps.length - 1) {
          var btn = document.getElementById("film");
          btn.disabled = false; btn.classList.add("pulse");
          coachFor(4.5);
          revealPulse();
        }
      }, reduceMotion ? 40 * (i + 1) : 650 * (i + 1));
    });
    $("#film").addEventListener("click", function () { go(5); });
    coachFor(4);
  }

  function tracerPlay(svg, pathD, ms, cb) {
    svg.innerHTML = '<path d="' + pathD + '"/><circle class="ball" r="4" cx="0" cy="0"/>';
    var path = svg.querySelector("path"), ball = svg.querySelector("circle");
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    if (reduceMotion) {
      path.style.strokeDashoffset = 0;
      var pEnd = path.getPointAtLength(len);
      ball.setAttribute("cx", pEnd.x); ball.setAttribute("cy", pEnd.y);
      if (cb) setTimeout(cb, 60);
      return;
    }
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / ms);
      var e = 1 - Math.pow(1 - k, 2.2);
      path.style.strokeDashoffset = len * (1 - e);
      var p = path.getPointAtLength(len * e);
      ball.setAttribute("cx", p.x); ball.setAttribute("cy", p.y);
      if (k < 1) requestAnimationFrame(step); else if (cb) cb();
    }
    requestAnimationFrame(step);
  }

  function renderFilming() {
    setTab("shot");
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">The 7th</span><span class="appbar__hint" id="swing-no">Swing 1 of 4 · Johannes</span></div>' +
      '<div class="view enter"><img src="assets/img/courses/boschenmeer.webp" alt=""><div class="view__grad"></div><div class="crosshair"></div>' +
      '<svg class="tracer" id="tracer" viewBox="0 0 390 256" preserveAspectRatio="none"></svg>' +
      '<span class="rec"><span class="dot"></span><span id="rec-t">Rec 00:00</span></span>' +
      '<span class="view__tag" id="view-note">Tee cam locked · ball GL-07 · GPS ✓</span>' +
      '<div class="view__bar" id="shot-result"></div></div>' +
      '<div class="card enter-2"><span class="cap">Swing order</span>' +
      playerRow(PLAYERS[0], '<span class="state" id="fs-J">—</span>', "HC 12") +
      playerRow(PLAYERS[2], '<span class="state" id="fs-M">—</span>', "HC 8") +
      playerRow(PLAYERS[1], '<span class="state" id="fs-D">—</span>', "HC 18") +
      playerRow(PLAYERS[3], '<span class="state" id="fs-P">—</span>', "HC 21 · guest") +
      "</div>" +
      '<p class="note" style="text-align:center;color:var(--cream-mut);font-size:0.75rem">Four entries, four swings, one staged hole — a moment the group wants to film.</p>';

    var recT = document.getElementById("rec-t"), rec = 0;
    var recTimer = setInterval(function () {
      rec++; if (!recT.isConnected) { clearInterval(recTimer); return; }
      recT.textContent = "Rec 00:" + (rec < 10 ? "0" : "") + rec;
    }, 1000);

    var svg = document.getElementById("tracer");
    var seq = [
      { id: "J", label: "Swing 1 of 4 · Johannes", path: "M 30 236 C 120 60, 240 40, 306 96",  result: "On the green — 9 ft", ms: 1500 },
      { id: "M", label: "Swing 2 of 4 · Markus",   path: "M 30 236 C 110 90, 250 80, 336 150", result: "Bunker, front lip",    ms: 1400 },
      { id: "D", label: "Swing 3 of 4 · Dave",     path: "M 30 236 C 130 34, 258 26, 300 118", result: "", ms: 1900, ace: true }
    ];
    var states = { J: "fs-J", M: "fs-M", D: "fs-D", P: "fs-P" };
    var i = 0;
    function next() {
      if (i >= seq.length) return;
      var s = seq[i];
      document.getElementById("swing-no").textContent = s.label;
      var st = document.getElementById(states[s.id]);
      st.innerHTML = '<span class="dot"></span>Recording'; st.className = "state state--live";
      tracerPlay(svg, s.path, reduceMotion ? 1 : s.ms, function () {
        if (s.ace) {
          document.getElementById("shot-result").innerHTML = '<span style="color:var(--optic);font-weight:800">Tracking… it\'s tight on the flag —</span>';
          clearInterval(recTimer);
          setTimeout(function () {
            var view = $screen.querySelector(".view");
            if (view) view.insertAdjacentHTML("beforeend", '<span class="in-flash">In!!</span>');
            setTimeout(function () { go(6); }, reduceMotion ? 80 : 850);
          }, reduceMotion ? 40 : 550);
          return;
        }
        st.textContent = "Filmed ✓"; st.className = "state";
        document.getElementById("shot-result").textContent = s.result;
        i++;
        setTimeout(next, reduceMotion ? 80 : 700);
      });
    }
    setTimeout(next, reduceMotion ? 60 : 500);
  }

  function renderAce() {
    setTab("shot");
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">The 7th</span><span class="appbar__hint">Swing 3 of 4 · Dave</span></div>' +
      '<div class="ace enter"><div class="ace-glow"></div>' +
      '<span class="ace__badge">Verified ace</span>' +
      '<span class="ace__word">Ace!</span>' +
      '<span class="ace__amt" id="ace-amt">$0</span>' +
      '<span class="ace__sub">to the fourball — $' + (S.tier.prize / 4).toLocaleString("en-US") + " each</span></div>" +
      '<div class="card enter-2"><span class="cap">Verification &amp; claim</span>' +
      '<div class="row"><span class="who">Shot video · tee cam</span><span class="state state--dim" id="v-1">Checking…</span></div>' +
      '<div class="row"><span class="who">Ball GL-07 holed · GPS match</span><span class="state state--dim" id="v-2">—</span></div>' +
      '<div class="row"><span class="who">Claim opened with Santam</span><span class="state state--dim" id="v-3">—</span></div></div>' +
      '<p class="note enter-3" style="text-align:center;color:var(--cream-mut);font-size:0.78rem">Paid by the insurer — <b style="color:var(--cream)">never from anyone\'s pocket</b>. Piet still hit his, for pride: fringe, 14 ft.</p>' +
      '<button class="btn enter-4" id="to-scores" disabled>Enter hole 7 scores</button>';

    countUp(document.getElementById("ace-amt"), S.tier.prize, 1200);
    confetti();
    var checks = [
      { id: "v-1", label: "Verified ✓", t: 900 },
      { id: "v-2", label: "Verified ✓", t: 1800 },
      { id: "v-3", label: "FSP 3416 ✓", t: 2700 }
    ];
    checks.forEach(function (c, i) {
      setTimeout(function () {
        var el = document.getElementById(c.id);
        if (!el) return;
        el.textContent = c.label; el.className = "state";
        if (i === checks.length - 1) {
          var btn = document.getElementById("to-scores");
          btn.disabled = false; btn.classList.add("pulse");
          coachFor(6.5);
          revealPulse();
        }
      }, reduceMotion ? 60 * (i + 1) : c.t);
    });
    $("#to-scores").addEventListener("click", function () { go(7); });
    coachFor(6);
  }

  function renderScoreEntry() {
    setTab("ledger");
    var ids = ["J", "D", "M", "P"];
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">Hole 7</span><span class="appbar__hint">Par 3 · the $' + (S.tier.prize / 1000) + "K hole</span></div>" +
      '<div class="card enter"><span class="cap">Gross scores · one enters, one confirms</span>' +
      ids.map(function (id) {
        var p = PLAYERS.filter(function (x) { return x.id === id; })[0];
        var v = S.scores[id];
        if (id === "D") {
          return '<div class="scorer"><span class="ava ' + p.ava + '">' + p.ini + "</span>" +
            '<span class="who">' + p.name + '<small>verified ace — locked by the tee cam</small></span>' +
            '<span class="stepper"><b class="is-ace">1</b><span class="chip chip--optic">Verified</span></span></div>';
        }
        return '<div class="scorer"><span class="ava ' + p.ava + '">' + p.ini + "</span>" +
          '<span class="who">' + p.name + "</span>" +
          '<span class="stepper" data-p="' + id + '"><button data-d="-1" aria-label="minus">−</button><b>' + v + '</b><button data-d="1" aria-label="plus">+</button></span></div>';
      }).join("") + "</div>" +
      '<div class="card enter-2"><span class="cap">Dots on the 7th</span>' +
      '<div class="row"><span class="who">Greenie — Dave<small>on the green in one, no argument there</small></span><span class="dotchip is-on">Auto</span></div>' +
      '<div class="row"><span class="who">Sandie — Markus<small>up and down from the front bunker?</small></span><button class="dotchip' + (S.sandieM ? " is-on" : "") + '" id="sandie">' + (S.sandieM ? "On" : "Off") + "</button></div></div>" +
      '<div class="attest enter-3" id="attest">' +
      '<span class="ava">JR</span><span class="attest__note">Entering as <b>Johannes</b>. One enters, one confirms — the fourball is the referee, the app just keeps score.</span>' +
      "</div>" +
      '<button class="btn enter-3" id="enter-btn">Enter scores</button>';

    $all(".stepper[data-p] button").forEach(function (b) {
      b.addEventListener("click", function () {
        var wrap = b.parentElement, id = wrap.getAttribute("data-p");
        S.scores[id] = Math.max(1, Math.min(9, S.scores[id] + (+b.getAttribute("data-d"))));
        wrap.querySelector("b").textContent = S.scores[id];
      });
    });
    $("#sandie").addEventListener("click", function () {
      S.sandieM = !S.sandieM;
      var el = document.getElementById("sandie");
      el.classList.toggle("is-on", S.sandieM);
      el.textContent = S.sandieM ? "On" : "Off";
    });
    $("#enter-btn").addEventListener("click", function () {
      if (!S.entered) {
        S.entered = true;
        document.getElementById("attest").innerHTML =
          '<span class="ava ava--m">MB</span><span class="attest__note"><b>Markus confirms.</b> Same numbers on his screen — one tap and the hole is on the record.</span>';
        var btn = document.getElementById("enter-btn");
        btn.textContent = "Confirm as Markus";
        btn.classList.add("pulse");
        coachFor(7.5);
        revealPulse();
      } else if (!S.confirmed) {
        S.confirmed = true;
        S.hole7 = hole7Deltas();
        toast("Hole 7 confirmed — two attestations on the record");
        setTimeout(function () { go(8); }, reduceMotion ? 150 : 900);
      }
    });
    coachFor(7);
  }

  function renderRunHome() {
    setTab("ledger");
    var after7 = fold([{ deltas: S.hole7 || hole7Deltas() }], S.thru6);
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">Live ledger</span><span class="appbar__hint" id="thru-hint">Thru 7</span></div>' +
      standingsCard(after7, "Standings · thru 7", {
        J: "2 skins · greenie", D: "the ace — and the skin pot", M: S.sandieM ? "sandie on the 7th" : "holds the snake", P: "pressed the front nine"
      }) +
      '<div class="card feed enter-2" id="run-feed"><span class="cap">The back nine, as it happened</span></div>' +
      '<button class="btn enter-3" id="to-settle" disabled>The 18th — settle up</button>';

    var feed = document.getElementById("run-feed");
    var shown = 0;
    var picks = [BACK[1], BACK[4], BACK[5], BACK[6], BACK[10]];
    function drip() {
      if (!feed.isConnected) return;
      if (shown >= picks.length) {
        computeFinal();
        var hint = document.getElementById("thru-hint");
        if (hint) hint.textContent = "18 holes · " + money(S.final[0]);
        feed.insertAdjacentHTML("afterend", skinsBoardCard("enter"));
        wireBoard();
        var btn = document.getElementById("to-settle");
        btn.disabled = false; btn.classList.add("pulse");
        coachFor(8.5);
        revealPulse();
        return;
      }
      var r = picks[shown];
      feed.insertAdjacentHTML("beforeend",
        '<div class="row enter"><span class="hno' + (r.h === 14 ? " hno--gold" : "") + '">' + r.h + '</span><span class="who">' + esc(r.label) + "</span></div>");
      shown++;
      setTimeout(drip, reduceMotion ? 60 : 850);
    }
    setTimeout(drip, reduceMotion ? 60 : 600);
    $("#to-settle").addEventListener("click", function () { go(9); });
  }

  function railChip(t, idx) {
    var st = S.paid[idx];
    if (st === "paid") return '<span class="chip chip--paid">Paid ✓</span>';
    if (st === "iou") return '<span class="chip">IOU · Sat</span>';
    return '<button class="chip chip--pay" data-t="' + idx + '">' + t.rail + "</button>";
  }
  function renderSettlement() {
    setTab("ledger");
    if (!S.final) { computeFinal(); }
    var names = { J: "Johannes", D: "Dave", M: "Markus", P: "Piet" };
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">Settlement</span><span class="appbar__hint">18 holes · ' + money(S.final[0]) + "</span></div>" +
      '<div class="card card--gold enter"><span class="cap">From the insurer · separate from your game</span>' +
      '<div class="row row--bare"><span class="who">Dave\'s ace — the group ticket paid<small>$' + (S.tier.prize / 4).toLocaleString("en-US") + " each · Santam claim in process</small></span>" +
      '<span class="amt up">$' + S.tier.prize.toLocaleString("en-US") + "</span></div></div>" +
      '<div class="card enter-2" id="transfers"><span class="cap">The money game · netted to ' + S.transfers.length + " transfers</span>" +
      S.transfers.map(function (t, i) {
        return '<div class="row transfer"><span class="who">' + names[t.from] + " → " + names[t.to] +
          "<small>" + esc(t.sub) + '</small></span><span class="amt">$' + t.amt + "</span>" + railChip(t, i) + "</div>";
      }).join("") + "</div>" +
      '<button class="linkline enter-3" id="board-open">Skins, hole by hole →</button>' +
      '<div class="card enter-3"><span class="cap">Season ledger · updated</span>' +
      '<div class="row"><span class="ava ava--d">DK</span><span class="who">You vs Dave · all-time<small>27 rounds</small></span><span class="amt up" id="szn-dave">' + (S.seasonBumped ? "+$240" : "+$227") + "</span></div>" +
      '<div class="row"><span class="who">Same four, Saturday 07:30?<small>one-tap rematch — the IOU rides along</small></span><span class="chip chip--gold" id="rematch">Send</span></div></div>' +
      '<p class="note" style="text-align:center;color:var(--cream-mut);font-size:0.75rem">Deep-links into the payment app each pair already uses. Get Lucky routes nothing and holds nothing.</p>';

    if (!S.seasonBumped) {
      setTimeout(function () {
        var dave = document.getElementById("szn-dave");
        S.seasonBumped = true;
        if (dave && dave.isConnected) dave.textContent = "+$240";
      }, reduceMotion ? 100 : 1400);
    }

    $all("[data-t]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-t");
        var t = S.transfers[i];
        var chipHtml;
        if (i === 1) {
          S.paid[i] = "iou";
          chipHtml = '<span class="chip">IOU · Sat</span>';
          toast("No stress — carried to Saturday as an IOU");
        } else {
          S.paid[i] = "paid";
          chipHtml = '<span class="chip chip--paid">Paid ✓</span>';
          toast(t.rail + " opens — $" + t.amt + " prefilled, reference “Boschenmeer Sat”");
        }
        b.outerHTML = chipHtml; // surgical: no re-render, nothing else moves
        coachFor(9.5);
      });
    });
    $("#board-open").addEventListener("click", openBoardSheet);
    $("#rematch").addEventListener("click", function () { go(10); });
    coachFor(9);
  }

  function renderSeason() {
    setTab("season");
    var names = { D: "Dave", M: "Markus", P: "Piet" };
    var max = 240;
    $screen.innerHTML =
      '<div class="appbar"><span class="appbar__title">Season</span><span class="appbar__hint">The Saturday Regulars</span></div>' +
      '<div class="card enter"><div class="row row--bare"><span class="crest">SR</span><span class="who">The Saturday Regulars<small>est. March · 27 rounds · Boschenmeer</small></span><span class="chip chip--gold">Crest</span></div></div>' +
      '<div class="card enter-2"><span class="cap">Lifetime, mate by mate</span>' +
      SEASON.map(function (s) {
        var p = PLAYERS.filter(function (x) { return x.id === s.id; })[0];
        var w = Math.round(Math.abs(s.amt) / max * 100);
        return '<div class="row"><span class="ava ' + p.ava + '">' + p.ini + '</span>' +
          '<span class="who" style="flex:0 0 5.2rem">' + names[s.id] + "<small>" + s.rounds + ' rounds</small></span>' +
          '<span class="pair__bar"><i style="' + (s.amt >= 0 ? "left:0" : "right:0;background:var(--clay)") + ";width:" + w + '%"></i></span>' +
          '<span class="amt ' + (s.amt >= 0 ? "up" : "dn") + '">' + money(s.amt) + "</span></div>";
      }).join("") +
      '<div class="row row--bare"><span class="who" style="font-weight:600;color:var(--cream-mut);font-size:0.78rem">"You are $240 up on Dave since March." Nobody deletes the app while he is down to Dave.</span></div></div>' +
      '<div class="card iou enter-3"><span class="cap">Riding on next Saturday</span>' +
      '<div class="row"><span class="who">Dave → you · $13<small>folded into the next slip</small></span><span class="chip">IOU</span></div>' +
      '<div class="row"><span class="who">The snake<small>Dave holds it into the new round</small></span><span class="chip chip--optic">Live</span></div></div>' +
      '<button class="btn enter-4 pulse" id="send-rematch">Same four, Saturday 07:30 — send</button>';
    $("#send-rematch").addEventListener("click", function () { go(11); });
    coachFor(10);
    revealPulse();
  }

  function renderEnd() {
    setTab("slip");
    $screen.innerHTML =
      '<div class="cover">' +
      '<p class="cover__kicker enter">Thursday, 21:04 — the slip is already in the chat</p>' +
      '<h2 class="cover__title enter-2">That\'s<br>the loop</h2>' +
      '<p class="cover__sub enter-3">Slip → Saturday → settle → rematch. Every week, every fourball — and the insured jackpot riding on one staged hole.</p>' +
      '<button class="btn enter-4" id="replay">Play it again</button>' +
      '<button class="linkline enter-5" id="free">Explore the app free-roam</button>' +
      '<p class="cover__foot">Peer games free forever · verified jackpot underwritten by Santam</p>' +
      "</div>";
    S.storyDone = true;
    $("#replay").addEventListener("click", function () { reset(); go(1); });
    $("#free").addEventListener("click", function () { S.mode = "free"; finishData(); go(9); });
    coach(null);
  }

  /* ------------------------------------------------------------------- SHEET */

  var sheetEls = null;
  function openSheet(inner, wire) {
    closeSheet();
    var veil = h('<div class="sheet-veil"></div>').firstChild;
    var sheet = h('<div class="sheet" role="dialog"><div class="sheet__grab"></div>' + inner + "</div>").firstChild;
    veil.addEventListener("click", closeSheet);
    var device = document.getElementById("device");
    device.appendChild(veil); device.appendChild(sheet);
    sheetEls = [veil, sheet];
    if (wire) wire(sheet);
  }
  function closeSheet() {
    if (sheetEls) { sheetEls.forEach(function (e) { e.remove(); }); sheetEls = null; }
  }

  /* ------------------------------------------------------------------- STORY */

  var ACTS = [
    { i: 0,  day: "Thu", time: "21:02", batt: 86, render: renderCover },
    { i: 1,  day: "Thu", time: "21:04", batt: 86, render: renderBuilder },
    { i: 2,  day: "Thu", time: "21:14", batt: 84, render: renderSent },
    { i: 3,  day: "Sat", time: "10:12", batt: 78, render: renderLedger },
    { i: 4,  day: "Sat", time: "10:24", batt: 76, render: renderShotArmed },
    { i: 5,  day: "Sat", time: "10:26", batt: 75, render: renderFilming },
    { i: 6,  day: "Sat", time: "10:27", batt: 74, render: renderAce },
    { i: 7,  day: "Sat", time: "10:31", batt: 73, render: renderScoreEntry },
    { i: 8,  day: "Sat", time: "13:21", batt: 67, render: renderRunHome },
    { i: 9,  day: "Sat", time: "13:38", batt: 65, render: renderSettlement },
    { i: 10, day: "Thu", time: "19:00", batt: 91, render: renderSeason },
    { i: 11, day: "Thu", time: "21:04", batt: 90, render: renderEnd }
  ];

  var COACH = {
    1:   "Thursday night: a <strong>rematch</strong> slip. Nudge a stake, tap the <strong>i</strong> for the maths, then <strong>send it</strong>.",
    2:   "The slip lands in the group chat — watch the accepts come in. <strong>Piet rides free.</strong>",
    2.5: "All four in, exposure shown first. <strong>It locks at the first tee.</strong>",
    3:   "Saturday. The ledger runs itself — and <strong>$20 rides on the 7th</strong>.",
    4:   "The staged hole: <strong>GPS, marked ball, tee cam</strong>. Everyone films everyone.",
    4.5: "Armed. <strong>Film the swings.</strong>",
    6:   "Watch the verification tick — <strong>video, ball, GPS, claim</strong>.",
    6.5: "Claim open. Now <strong>enter the hole like any other</strong>.",
    7:   "Dave's 1 is <strong>locked by the tee cam</strong>. Score the rest in two taps.",
    7.5: "One enters, one confirms — <strong>hand it to Markus</strong>.",
    8.5: "Eleven more holes, zero arguments. Tap a hole on the board, then <strong>settle</strong>.",
    9:   "Insurer money on top, the game below — three transfers. <strong>Tap a rail.</strong>",
    9.5: "One paid, one an <strong>IOU</strong>. See the skins line, then <strong>rematch</strong>.",
    10:  "The memory: ledgers, crest, the IOU riding forward. <strong>Send Saturday's slip.</strong>"
  };

  function coach(key) {
    var device = document.getElementById("device");
    if (S.mode !== "story" || key == null || !(key in COACH)) {
      $coach.hidden = true;
      device.classList.remove("has-coach");
      return;
    }
    $coach.hidden = false;
    device.classList.add("has-coach");
    $coachText.innerHTML = COACH[key];
    var steps = [1, 2, 3, 4, 6, 7, 9, 10];
    $coachDots.innerHTML = steps.map(function (s) {
      return "<i" + (Math.floor(key) >= s ? ' class="on"' : "") + "></i>";
    }).join("");
  }
  function coachFor(key) { coach(key); }

  function finishData() {
    S.hole7 = S.hole7 || hole7Deltas();
    S.entered = true; S.confirmed = true;
    computeFinal();
  }
  function reset() {
    S.tier = TIERS[4]; S.jackpotIn = true;
    GAMES[0].stake = 10; GAMES[1].stake = 5; GAMES[2].stake = 1;
    S.hole7 = null; S.scores = { J: 3, D: 1, M: 3, P: 4 }; S.sandieM = false;
    S.entered = false; S.confirmed = false; S.final = null; S.transfers = null; S.paid = {};
    S.seasonBumped = false;
  }

  function go(i) {
    closeSheet();
    var act = ACTS[i];
    if (!act) return;
    S.act = i;
    setClock(act.day, act.time, act.batt);
    $screen.scrollTop = 0;
    $screen.classList.remove("screen--in");
    void $screen.offsetWidth;
    $screen.classList.add("screen--in");
    act.render();
  }

  /* -------------------------------------------------------------------- TABS */

  var TAB_HOME = { slip: 1, ledger: 3, shot: 4, season: 10 };
  var TAB_DONE = { slip: 11, ledger: 9, shot: 6, season: 10 };
  $tabs.addEventListener("click", function (e) {
    var b = e.target.closest(".tab");
    if (!b) return;
    var tab = b.getAttribute("data-tab");
    if (S.mode === "free" || S.storyDone) {
      finishData();
      b.classList.add("is-flash");
      setTimeout(function () { b.classList.remove("is-flash"); }, 900);
      go(TAB_DONE[tab]);
      return;
    }
    // In story mode the tabs follow the story — flash where you are headed.
    if (tab === S.tab) return;
    b.classList.add("is-flash");
    setTimeout(function () { b.classList.remove("is-flash"); }, 900);
    if (S.act >= (TAB_HOME[tab] || 99)) { go(TAB_HOME[tab]); }
  });

  document.getElementById("coach-skip").addEventListener("click", function () {
    // Jump the story forward one beat without breaking state.
    var jump = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11 };
    if (S.act === 7 && !S.confirmed) { S.hole7 = hole7Deltas(); S.confirmed = true; }
    go(jump[S.act] || 11);
  });

  /* -------------------------------------------------------------------- BOOT */

  go(0);
})();
