/* Get Lucky pitch — global-app phone demo.
   Auto-advances through the four concept screens while in view; the step
   buttons jump to a screen and restart the clock. Hovering the phone pauses.
   Respects prefers-reduced-motion (no autoplay — steps stay clickable). */

(function () {
  "use strict";

  var demo = document.querySelector("[data-appdemo]");
  if (!demo) return;

  var screens = Array.prototype.slice.call(demo.querySelectorAll(".appscreen"));
  var steps = Array.prototype.slice.call(demo.querySelectorAll(".appstep"));
  var segs = Array.prototype.slice.call(demo.querySelectorAll(".appphone__progress i"));
  var phone = demo.querySelector(".appphone");
  if (!screens.length || screens.length !== steps.length) return;

  var INTERVAL = 4200;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var idx = 0;
  var timer = null;
  var inView = false;
  var paused = false;

  demo.style.setProperty("--appdemo-interval", INTERVAL + "ms");

  function render() {
    screens.forEach(function (s, k) {
      s.classList.toggle("is-active", k === idx);
      s.setAttribute("aria-hidden", k === idx ? "false" : "true");
    });
    steps.forEach(function (b, k) {
      b.classList.toggle("is-active", k === idx);
      if (k === idx) b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
    });
    segs.forEach(function (el, k) {
      el.classList.remove("is-active", "is-done");
      void el.offsetWidth; // restart the fill animation when a segment re-activates
      if (k < idx) el.classList.add("is-done");
      else if (k === idx) el.classList.add(timer ? "is-active" : "is-done");
    });
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function play() {
    if (reduceMotion || timer || !inView || paused) return;
    timer = setInterval(function () {
      idx = (idx + 1) % screens.length;
      render();
    }, INTERVAL);
  }

  steps.forEach(function (b, k) {
    b.addEventListener("click", function () {
      stop();
      idx = k;
      play();
      render();
    });
  });

  if (phone) {
    phone.addEventListener("pointerenter", function () { paused = true; stop(); render(); });
    phone.addEventListener("pointerleave", function () { paused = false; play(); render(); });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        inView = entry.isIntersecting;
        if (inView) play(); else stop();
        render();
      });
    }, { threshold: 0.3 });
    io.observe(demo);
  } else {
    inView = true;
    play();
    render();
  }

  render();
})();
