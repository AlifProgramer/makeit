(function () {
  "use strict";

  var preloader = document.getElementById("preloader");
  var shareButton = document.getElementById("share-button");
  var shareLabel = document.getElementById("share-label");
  var scrollIndicator = document.getElementById("scroll-indicator");

  /* ---------- Preloader ---------- */
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.setTimeout(function () {
    preloader.classList.add("preloader--hidden");
    preloader.setAttribute("aria-hidden", "true");
  }, reduceMotion ? 100 : 1450);

  /* ---------- Scroll indicator ---------- */
  function checkOverflow() {
    var show =
      document.documentElement.scrollHeight > window.innerHeight + 24 &&
      window.scrollY < 32;

    scrollIndicator.classList.toggle("scroll-indicator--visible", show);
    scrollIndicator.setAttribute("aria-hidden", String(!show));
    scrollIndicator.setAttribute("tabindex", show ? "0" : "-1");
  }

  checkOverflow();
  window.addEventListener("resize", checkOverflow);
  window.addEventListener("scroll", checkOverflow, { passive: true });

  /* ---------- Tombol Bagikan ---------- */
  function setShareLabel(text) {
    shareLabel.textContent = text;
    shareButton.setAttribute("aria-label", text);
  }

  function resetShareLabelLater() {
    window.setTimeout(function () {
      setShareLabel("Bagikan");
    }, 1800);
  }

  shareButton.addEventListener("click", async function () {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "MAKE IT FEST III - UNSAM",
          text: "Portal resmi MAKE IT FEST III - UNSAM",
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setShareLabel("Tersalin");
      resetShareLabelLater();
    } catch (error) {
      if (!error || error.name !== "AbortError") {
        setShareLabel("Gagal disalin");
        resetShareLabelLater();
      }
    }
  });
})();
