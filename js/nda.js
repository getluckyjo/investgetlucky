/* NDA gate for the dataroom.
   Pattern: client-side session gate (deterrent + audit trail, not real auth).
   Interface kept compatible with the donafuego module so it can be swapped in:
     recordNda(payload) -> Promise, hasNdaSession() -> bool.

   Optional server-side recorder: set NDA_ENDPOINT to a Formspree/Resend-backed
   URL (e.g. "https://formspree.io/f/XXXX") and every signature is POSTed there
   as JSON. Left empty, signatures are stored in localStorage only. */

(function () {
  "use strict";

  var NDA_ENDPOINT = ""; // e.g. "https://formspree.io/f/yourFormId"
  var SESSION_KEY = "gl-nda-accepted";
  var AUDIT_KEY = "gl-nda-audit";

  function hasNdaSession() {
    try { return sessionStorage.getItem(SESSION_KEY) === "yes"; } catch (e) { return false; }
  }

  function recordNda(payload) {
    try {
      sessionStorage.setItem(SESSION_KEY, "yes");
      var audit = [];
      try { audit = JSON.parse(localStorage.getItem(AUDIT_KEY) || "[]"); } catch (e) { /* fresh */ }
      audit.push(payload);
      localStorage.setItem(AUDIT_KEY, JSON.stringify(audit));
    } catch (e) { /* storage unavailable — gate still opens for this view */ }

    if (!NDA_ENDPOINT) return Promise.resolve();
    return fetch(NDA_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    }).catch(function (err) {
      console.warn("NDA recorder unreachable — local record kept", err);
    });
  }

  window.GL_NDA = { recordNda: recordNda, hasNdaSession: hasNdaSession };

  // ---- page wiring ----------------------------------------------------------
  var wall = document.getElementById("nda-wall");
  var room = document.getElementById("dataroom");
  if (!wall || !room) return;

  function show(el) { el.hidden = false; }
  function hide(el) { el.hidden = true; }

  if (hasNdaSession()) { show(room); } else { show(wall); }

  var form = document.getElementById("nda-form");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var name = document.getElementById("nda-name").value.trim();
    var email = document.getElementById("nda-email").value.trim();
    var company = document.getElementById("nda-company").value.trim();
    var agree = document.getElementById("nda-agree").checked;
    var error = document.getElementById("nda-error");
    var valid = name.length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && agree;
    if (!valid) { error.style.display = "block"; return; }
    error.style.display = "none";
    recordNda({
      name: name,
      email: email,
      company: company,
      document: "Get Lucky Golf investor dataroom NDA",
      acceptedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    }).then(function () {
      hide(wall);
      show(room);
      window.scrollTo({ top: 0 });
      loadSources();
    });
  });

  // ---- sources list (from data/research.json) -------------------------------
  var sourcesLoaded = false;
  function loadSources() {
    if (sourcesLoaded) return;
    sourcesLoaded = true;
    var list = document.getElementById("sources-list");
    if (!list) return;
    fetch("data/research.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        data.claims.forEach(function (c) {
          var a = document.createElement("a");
          if (c.url) {
            a.href = c.url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
          }
          var claim = document.createElement("span");
          claim.textContent = c.claim + " — " + c.source;
          var type = document.createElement("span");
          type.className = "type";
          type.textContent = c.url ? "Source" : "Company";
          a.appendChild(claim);
          a.appendChild(type);
          list.appendChild(a);
        });
      })
      .catch(function () {
        list.innerHTML = "<p class='small'>Source list unavailable offline — see data/research.json in the repository.</p>";
      });
  }
  if (hasNdaSession()) loadSources();
})();
