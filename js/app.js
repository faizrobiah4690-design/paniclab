// ============================================================================
// PanicLab — Pengawal Aplikasi Utama, SOS Modal, Triaj DSM-5-TR, Kafein,
// Somatic/GERD Clinic Drawer, 8+1 Coping Cards, CBT Inhibitory Learning & Kuiz
// Menyokong Dwibahasa (BM | EN) & 3-Lens UX (Saya | Keluarga | Klinikal)
// ============================================================================

(function () {
  "use strict";

  const langCallbacks = [];

  function isEn() {
    return window.currentLang === "en";
  }

  // --------------------------------------------------------------------------
  // SAFE STORAGE & XSS SANITIZATION HELPERS
  // --------------------------------------------------------------------------
  function escapeHtml(raw) {
    return String(raw == null ? "" : raw)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeGetStorage(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function safeSetStorage(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (_) {}
  }

  function safeParseJSON(raw, fallback) {
    try {
      const parsed = JSON.parse(raw);
      return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function flashButtonFeedback(btn, msToast, enToast, restoreFn, delayMs) {
    if (!btn) return;
    if (btn.__toastTimer) clearTimeout(btn.__toastTimer);
    btn.textContent = isEn() ? enToast : msToast;
    btn.__toastTimer = setTimeout(function () {
      btn.__toastTimer = null;
      if (typeof restoreFn === "function") {
        restoreFn();
      } else if (btn.dataset.ms !== undefined || btn.hasAttribute("data-en")) {
        btn.innerHTML = isEn() ? btn.getAttribute("data-en") : btn.dataset.ms || btn.innerHTML;
      }
    }, delayMs || 2000);
  }

  // Mastery Progress Tracking
  const initialExplored = safeParseJSON(safeGetStorage("paniclab_explored", '["wave"]'), ["wave"]);
  const exploredSet = new Set(Array.isArray(initialExplored) ? initialExplored : ["wave"]);

  window.markModuleExplored = function (modKey) {
    exploredSet.add(modKey);
    safeSetStorage("paniclab_explored", JSON.stringify(Array.from(exploredSet)));
    updateMasteryBar();
  };

  function updateMasteryBar() {
    const total = 9; // sos, wave, neuro, dsm, caffeine, cr, cbt, pharm, quiz
    const pct = Math.min(100, Math.round((exploredSet.size / total) * 100));
    const fill = document.getElementById("masteryProgressFill");
    const pctLbl = document.getElementById("masteryProgressPct");
    if (fill) fill.style.width = pct + "%";
    if (pctLbl) pctLbl.textContent = pct + "%";
  }

  // --------------------------------------------------------------------------
  // BILINGUAL (BM | EN) & 3-LENS AUDIENCE MODE CONTROLLER
  // --------------------------------------------------------------------------
  function applyDomTranslations(lang) {
    const en = lang === "en";
    document.documentElement.lang = en ? "en" : "ms";
    document.title = en
      ? "PanicLab — Trusted Guided Playbook on Panic Attacks & Panic Disorder"
      : "PanicLab — Playbook Pintar, Interaktif & Panduan Serangan Panik";

    document.querySelectorAll("[data-en]").forEach((el) => {
      if (el.dataset.ms === undefined) {
        el.dataset.ms = el.innerHTML;
      }
      if (el.__toastTimer) {
        clearTimeout(el.__toastTimer);
        el.__toastTimer = null;
      }
      el.innerHTML = en ? el.getAttribute("data-en") : el.dataset.ms;
    });

    document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
      if (el.dataset.msPlaceholder === undefined) {
        el.dataset.msPlaceholder = el.getAttribute("placeholder") || "";
      }
      el.setAttribute("placeholder", en ? el.getAttribute("data-en-placeholder") : el.dataset.msPlaceholder);
    });

    document.querySelectorAll("[data-en-title]").forEach((el) => {
      if (el.dataset.msTitle === undefined) {
        el.dataset.msTitle = el.getAttribute("title") || "";
      }
      el.setAttribute("title", en ? el.getAttribute("data-en-title") : el.dataset.msTitle);
    });

    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      const isAct = btn.getAttribute("data-lang-switch") === (en ? "en" : "ms");
      btn.classList.toggle("active", isAct);
      btn.setAttribute("aria-pressed", isAct ? "true" : "false");
    });
  }

  window.setAppLanguage = function (lang) {
    const target = lang === "en" ? "en" : "ms";
    safeSetStorage("paniclab_lang", target);
    if (window.setPanicLangData) window.setPanicLangData(target);
    applyDomTranslations(target);
    syncThemeAndCalmLabels();
    langCallbacks.forEach((fn) => {
      try {
        fn();
      } catch (_) {}
    });
    if (window.refreshPanicSimulators) window.refreshPanicSimulators();
  };

  function syncThemeAndCalmLabels() {
    const en = isEn();
    const isLight = document.body.classList.contains("light-theme");
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.textContent = isLight
        ? en ? "🌙 Dark Mode" : "🌙 Mod Gelap"
        : en ? "☀️ Light Mode" : "☀️ Mod Cerah";
    }

    const isCalm = !!window.__panicCalmMode;
    document.body.classList.toggle("calm-motion", isCalm);
    const graphBtn = document.getElementById("graphMotionToggleBtn");
    if (graphBtn) {
      graphBtn.classList.toggle("active", isCalm);
      graphBtn.setAttribute("aria-pressed", isCalm ? "true" : "false");
      graphBtn.textContent = isCalm
        ? en ? "▶️ Resume Graph Motion" : "▶️ Gerakkan Semula Graf"
        : en ? "⏸️ Freeze Graph Motion" : "⏸️ Henti Gerakan Graf";
    }
  }

  function renderAudienceLensUI() {
    const m = window.currentAudienceMode || "layman";
    const data = window.getPanicData();
    const bannerTxt = document.getElementById("activeLensBannerText");
    if (bannerTxt && data.lensMeta) {
      bannerTxt.innerHTML = data.lensMeta[m] || data.lensMeta.layman;
    }
    if (data.chapterLens) {
      ["ch2", "ch3", "ch4", "ch5", "ch6", "ch8"].forEach((chKey) => {
        const el = document.getElementById("lensCallout-" + chKey);
        if (el && data.chapterLens[chKey]) {
          el.innerHTML = data.chapterLens[chKey][m] || data.chapterLens[chKey].layman;
        }
      });
    }
  }

  function initTopControls() {
    const rawSaved = safeGetStorage("paniclab_audience", "layman");
    const savedAudience = ["layman", "family", "clinical"].includes(rawSaved) ? rawSaved : "layman";

    function setAudience(mode) {
      const m = ["layman", "family", "clinical"].includes(mode) ? mode : "layman";
      window.currentAudienceMode = m;
      document.body.classList.toggle("mode-layman", m === "layman");
      document.body.classList.toggle("mode-family", m === "family");
      document.body.classList.toggle("mode-clinical", m === "clinical");

      document.querySelectorAll("[data-audience-mode]").forEach((b) => {
        const isAct = b.getAttribute("data-audience-mode") === m;
        b.classList.toggle("active", isAct);
        b.setAttribute("aria-pressed", isAct ? "true" : "false");
      });

      document.querySelectorAll("details[data-clinical-open]").forEach((det) => {
        det.open = m === "clinical";
      });

      safeSetStorage("paniclab_audience", m);
      renderAudienceLensUI();
      renderSpectrumSection();
    }

    document.querySelectorAll("[data-audience-mode]").forEach((btn) => {
      btn.addEventListener("click", () => setAudience(btn.getAttribute("data-audience-mode")));
    });
    setAudience(savedAudience);
    langCallbacks.push(renderAudienceLensUI);

    // Language buttons
    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      btn.addEventListener("click", () => window.setAppLanguage(btn.getAttribute("data-lang-switch")));
    });

    // Theme button
    if (safeGetStorage("paniclab_theme", "dark") === "light") {
      document.body.classList.add("light-theme");
    }
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("light-theme");
        safeSetStorage("paniclab_theme", document.body.classList.contains("light-theme") ? "light" : "dark");
        syncThemeAndCalmLabels();
        if (window.refreshPanicSimulators) window.refreshPanicSimulators();
      });
    }

    // Graph motion freeze button (right beside Bab 1 live canvas)
    const graphBtn = document.getElementById("graphMotionToggleBtn");
    if (graphBtn) {
      graphBtn.addEventListener("click", function () {
        window.__panicCalmMode = !window.__panicCalmMode;
        syncThemeAndCalmLabels();
        if (window.syncPanicSimulatorLoops) window.syncPanicSimulatorLoops();
        if (window.refreshPanicSimulators) window.refreshPanicSimulators();
      });
    }

    // Privacy local-data reset button in footer
    const clearBtn = document.getElementById("clearLocalDataBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        const msg = isEn()
          ? "Clear all saved PanicLab preferences, custom Coping Card, Thought Records, and Fear Ladder steps from this browser?"
          : "Padam semua pilihan bahasa/tema, Kad Peribadi, rekod Thought Record, dan langkah Tangga Latihan daripada pelayar ini?";
        if (!window.confirm(msg)) return;
        try {
          Object.keys(localStorage).forEach((k) => {
            if (k.startsWith("paniclab_")) localStorage.removeItem(k);
          });
        } catch (_) {}
        window.location.reload();
      });
    }
  }

  // --------------------------------------------------------------------------
  // SOS QUICK-HELP MODAL, 4-RHYTHM BREATHER, 5-4-3-2-1, DIVE REFLEX & DOC NOTE
  // --------------------------------------------------------------------------
  const selectedDsmIds = new Set(["s1", "s4", "s8", "s10"]);

  function initQuickSosModal() {
    const modal = document.getElementById("quickHelpModal");
    if (!modal) return;

    let lastFocusedOpener = null;
    let activeTabKey = "step1";
    let breathTimer = null;
    let breathRunning = false;
    let activeRhythmKey = safeGetStorage("paniclab_rhythm", "exhale642");
    let phaseIdx = 0;
    let secLeft = 6;
    let cyclesDone = 0;

    // 4 Clinically Grounded Breathing Rhythms (including zero-hold option!)
    const RHYTHMS = {
      exhale642: {
        msTab: "😮‍💨 6-4-2 Hembus Dulu",
        enTab: "😮‍💨 6-4-2 Exhale First",
        msSub: "Mulakan Dengan Hembus Udara Dada (6s → 4s → 2s)",
        enSub: "Start By Exhaling Trapped Chest Air (6s → 4s → 2s)",
        msReady: "Sedia: 6s Hembus • 4s Tarik • 2s Tahan",
        enReady: "Ready: 6s Exhale • 4s Inhale • 2s Hold",
        phases: [
          { msLabel: "1. Hembus Perlahan Ikut Mulut (Kosongkan Dada)", enLabel: "1. Exhale Slowly Through Mouth (Empty Chest)", secs: 6, scale: 0.74, freq: 396, vib: [55] },
          { msLabel: "2. Tarik Nafas Hidung Perlahan (Perut Kembang)", enLabel: "2. Inhale Gently Through Nose (Belly Rises)", secs: 4, scale: 1.24, freq: 528, vib: [30, 45, 30] },
          { msLabel: "3. Tahan Lembut (Jatuhkan Bahu)", enLabel: "3. Hold Softly (Drop Shoulders)", secs: 2, scale: 1.24, freq: 440, vib: [20] }
        ]
      },
      gentle34: {
        msTab: "🌿 3-4 Lembut (Tanpa Tahan)",
        enTab: "🌿 3-4 Gentle (No Hold)",
        msSub: "Rentak Paling Lembut Tanpa Tahan Nafas (3s Tarik → 4s Hembus)",
        enSub: "Gentlest Zero-Hold Rhythm (3s Inhale → 4s Exhale)",
        msReady: "Sedia: 3s Tarik Lembut • 4s Hembus Perlahan (Tiada Tahan)",
        enReady: "Ready: 3s Gentle Inhale • 4s Slow Exhale (No Hold)",
        phases: [
          { msLabel: "1. Tarik Nafas Hidung Lembut (3 Saat)", enLabel: "1. Inhale Softly Through Nose (3s)", secs: 3, scale: 1.2, freq: 528, vib: [30, 40] },
          { msLabel: "2. Hembus Perlahan & Kendurkan Bahu (4 Saat)", enLabel: "2. Exhale Gently & Drop Shoulders (4s)", secs: 4, scale: 0.76, freq: 396, vib: [50] }
        ]
      },
      classic426: {
        msTab: "🌊 4-2-6 Klasik",
        enTab: "🌊 4-2-6 Classic",
        msSub: "Nafas Diafragma Klasik Saraf Vagus (4s → 2s → 6s)",
        enSub: "Classic Diaphragmatic Vagal Pace (4s → 2s → 6s)",
        msReady: "Sedia: 4s Tarik • 2s Tahan • 6s Hembus",
        enReady: "Ready: 4s Inhale • 2s Hold • 6s Exhale",
        phases: [
          { msLabel: "1. Tarik Nafas Hidung Perlahan (Perut Kembang)", enLabel: "1. Inhale Gently Through Nose (Belly Rises)", secs: 4, scale: 1.24, freq: 528, vib: [30, 45, 30] },
          { msLabel: "2. Tahan Lembut Tanpa Meneran", enLabel: "2. Hold Softly Without Straining", secs: 2, scale: 1.24, freq: 440, vib: [20] },
          { msLabel: "3. Hembus Panjang Ikut Mulut (6 Saat)", enLabel: "3. Exhale Slowly Through Pursed Lips (6s)", secs: 6, scale: 0.74, freq: 396, vib: [55] }
        ]
      },
      box4444: {
        msTab: "🔲 4-4-4-4 Kotak",
        enTab: "🔲 4-4-4-4 Box",
        msSub: "Nafas Kotak Sekata Fokus Minda (4s × 4 Fasa)",
        enSub: "Steady Box Breathing Focus Pace (4s × 4 Phases)",
        msReady: "Sedia: 4s Tarik • 4s Tahan • 4s Hembus • 4s Rehat",
        enReady: "Ready: 4s Inhale • 4s Hold • 4s Exhale • 4s Rest",
        phases: [
          { msLabel: "1. Tarik Nafas Sekata (4 Saat)", enLabel: "1. Inhale Steadily (4s)", secs: 4, scale: 1.22, freq: 528, vib: [30, 40] },
          { msLabel: "2. Tahan Tenang (4 Saat)", enLabel: "2. Hold Calmly (4s)", secs: 4, scale: 1.22, freq: 440, vib: [20] },
          { msLabel: "3. Hembus Perlahan (4 Saat)", enLabel: "3. Exhale Gently (4s)", secs: 4, scale: 0.76, freq: 396, vib: [50] },
          { msLabel: "4. Rehat Lembut Sebelum Tarik (4 Saat)", enLabel: "4. Rest Softly Before Inhale (4s)", secs: 4, scale: 0.76, freq: 440, vib: [20] }
        ]
      }
    };

    if (!RHYTHMS[activeRhythmKey]) activeRhythmKey = "exhale642";

    function curRhythm() {
      return RHYTHMS[activeRhythmKey] || RHYTHMS.exhale642;
    }

    function renderRhythmSelector() {
      const wrap = document.getElementById("sosRhythmTabs");
      if (!wrap) return;
      wrap.innerHTML = Object.keys(RHYTHMS)
        .map((k) => {
          const r = RHYTHMS[k];
          const act = k === activeRhythmKey;
          return `<button type="button" class="chip-btn ${act ? "active" : ""}" data-rhythm-pick="${k}" aria-pressed="${act ? "true" : "false"}" style="font-size:0.74rem; padding:5px 9px;">
            ${isEn() ? r.enTab : r.msTab}
          </button>`;
        })
        .join("");

      wrap.querySelectorAll("[data-rhythm-pick]").forEach((btn) => {
        btn.addEventListener("click", function () {
          const picked = btn.getAttribute("data-rhythm-pick");
          if (!RHYTHMS[picked]) return;
          activeRhythmKey = picked;
          safeSetStorage("paniclab_rhythm", picked);
          phaseIdx = 0;
          secLeft = curRhythm().phases[0].secs;
          renderRhythmSelector();
          if (breathRunning) {
            triggerCue(curRhythm().phases[0]);
          }
          updateBreatherDisplay();
        });
      });
    }

    function triggerCue(phaseObj) {
      if (!window.__panicAudioEnabled || !phaseObj) return;
      if (window.playPanicGentleTone) window.playPanicGentleTone(phaseObj.freq, 280);
      try {
        if (navigator.vibrate) navigator.vibrate(phaseObj.vib || [35]);
      } catch (_) {}
    }

    function updateBreatherDisplay() {
      const orb = document.getElementById("sosBreathingOrb");
      const subEl = document.getElementById("sosRhythmSubtitle");
      const phaseTxt = document.getElementById("sosBreathingPhase");
      const countTxt = document.getElementById("sosBreathingSec");
      const cycleTxt = document.getElementById("sosCycleCounter");
      const toggleBtn = document.getElementById("sosBreathToggleBtn");
      const audioBtn = document.getElementById("sosAudioToggleBtn");
      const r = curRhythm();
      const phases = r.phases;
      if (phaseIdx >= phases.length) phaseIdx = 0;
      const p = phases[phaseIdx];

      if (subEl) {
        subEl.textContent = isEn() ? r.enSub : r.msSub;
      }
      if (phaseTxt) {
        phaseTxt.textContent = breathRunning
          ? isEn() ? p.enLabel : p.msLabel
          : isEn() ? r.enReady : r.msReady;
      }
      if (countTxt) countTxt.textContent = secLeft + "s";
      if (orb) {
        orb.style.transitionDuration = breathRunning && !window.__panicCalmMode ? "0.95s" : "0.2s";
        orb.style.transform = breathRunning ? `scale(${p.scale})` : "scale(0.88)";
      }
      if (cycleTxt) {
        cycleTxt.textContent = isEn()
          ? `Completed calm cycles: ${cyclesDone} (Target: 6–10 cycles)`
          : `Kitaran nafas tenang selesai: ${cyclesDone} (Sasaran: 6–10 kitaran)`;
      }
      if (toggleBtn) {
        toggleBtn.textContent = breathRunning
          ? isEn() ? "⏸️ Pause Breather" : "⏸️ Jeda Kiraan Nafas"
          : isEn() ? "▶️ Start Guided Breather" : "▶️ Mula Panduan Nafas";
      }
      if (audioBtn) {
        audioBtn.textContent = window.__panicAudioEnabled
          ? isEn() ? "📳 Haptic & Chime: ON (Close Eyes OK)" : "📳 Getar & Nada: AKTIF (Boleh Pejam Mata)"
          : isEn() ? "🔕 Enable Haptic & Chime" : "🔕 Hidupkan Getar & Nada";
      }
    }

    function startBreather() {
      if (breathRunning) return;
      breathRunning = true;
      const phases = curRhythm().phases;
      if (phaseIdx >= phases.length) phaseIdx = 0;
      updateBreatherDisplay();
      triggerCue(phases[phaseIdx]);
      clearInterval(breathTimer);
      breathTimer = setInterval(function () {
        secLeft--;
        const activePhases = curRhythm().phases;
        if (secLeft <= 0) {
          phaseIdx = (phaseIdx + 1) % activePhases.length;
          if (phaseIdx === 0) cyclesDone++;
          secLeft = activePhases[phaseIdx].secs;
          triggerCue(activePhases[phaseIdx]);
        }
        updateBreatherDisplay();
      }, 1000);
    }

    function stopBreather() {
      breathRunning = false;
      clearInterval(breathTimer);
      breathTimer = null;
      updateBreatherDisplay();
    }

    document.getElementById("sosBreathToggleBtn")?.addEventListener("click", function () {
      if (breathRunning) stopBreather();
      else startBreather();
    });

    document.getElementById("sosAudioToggleBtn")?.addEventListener("click", function () {
      window.__panicAudioEnabled = !window.__panicAudioEnabled;
      if (window.__panicAudioEnabled) triggerCue(curRhythm().phases[phaseIdx]);
      updateBreatherDisplay();
    });

    // Mammalian Dive Reflex 20-second countdown + progress bar
    let diveTimer = null;
    let diveSec = 20;
    const diveBtn = document.getElementById("diveReflexBtn");
    const diveBar = document.getElementById("diveProgressBar");

    function stopDiveReflex() {
      if (diveTimer) {
        clearInterval(diveTimer);
        diveTimer = null;
      }
      diveSec = 20;
      if (diveBar) diveBar.style.width = "0%";
      updateDiveBtn();
    }

    function updateDiveBtn() {
      if (!diveBtn) return;
      if (!diveTimer) {
        diveBtn.textContent = isEn()
          ? "🧊 Start 20s Cold-Pack Dive Reflex Timer"
          : "🧊 Mula Pemasa 20s Pek Sejuk (Dive Reflex)";
      } else {
        diveBtn.textContent = isEn()
          ? `🧊 Cool Cheeks/Closed Eyes: ${diveSec}s (Tap to Stop)`
          : `🧊 Tekap Sejuk Di Pipi/Mata: ${diveSec}s (Klik Untuk Henti)`;
      }
    }

    if (diveBtn) {
      diveBtn.addEventListener("click", function () {
        if (diveTimer) {
          stopDiveReflex();
          return;
        }
        diveSec = 20;
        if (diveBar) diveBar.style.width = "5%";
        updateDiveBtn();
        diveTimer = setInterval(function () {
          diveSec--;
          const pct = Math.min(100, Math.round(((20 - diveSec) / 20) * 100));
          if (diveBar) diveBar.style.width = pct + "%";
          if (diveSec === 10) {
            try {
              if (navigator.vibrate) navigator.vibrate([30]);
            } catch (_) {}
          }
          if (diveSec <= 0) {
            clearInterval(diveTimer);
            diveTimer = null;
            diveSec = 20;
            if (window.playPanicGentleTone) window.playPanicGentleTone(528, 350);
            try {
              if (navigator.vibrate) navigator.vibrate([45, 60, 45]);
            } catch (_) {}
            setTimeout(function () {
              if (!diveTimer && diveBar) diveBar.style.width = "0%";
            }, 1200);
          }
          updateDiveBtn();
        }, 1000);
      });
    }

    // Accessible Tab Switching + Timer Hygiene
    function openSosTab(tabKey, focusTabBtn) {
      activeTabKey = tabKey;
      const tabs = Array.from(document.querySelectorAll("[data-qh-tab]"));
      tabs.forEach((b) => {
        const isSel = b.getAttribute("data-qh-tab") === tabKey;
        b.classList.toggle("active", isSel);
        b.setAttribute("aria-selected", isSel ? "true" : "false");
        b.setAttribute("tabindex", isSel ? "0" : "-1");
        if (isSel && focusTabBtn) b.focus();
      });
      document.querySelectorAll("[data-qh-pane]").forEach((pane) => {
        pane.hidden = pane.getAttribute("data-qh-pane") !== tabKey;
      });
      if (tabKey !== "step1" && breathRunning) stopBreather();
      if (tabKey !== "step2" && diveTimer) stopDiveReflex();
      if (tabKey === "step5") generateDoctorNote();
    }

    function openModal(targetTab, openerEl) {
      lastFocusedOpener = openerEl || document.activeElement;
      modal.hidden = false;
      document.body.classList.add("modal-open");
      if (window.syncPanicSimulatorLoops) window.syncPanicSimulatorLoops();
      openSosTab(targetTab || "step1", false);
      generateDoctorNote();
      if ((targetTab || "step1") === "step1" && !breathRunning) {
        phaseIdx = 0;
        secLeft = curRhythm().phases[0].secs;
        startBreather();
      }
      if (window.markModuleExplored) window.markModuleExplored("sos");
      const activeTabEl = modal.querySelector(`[data-qh-tab="${targetTab || "step1"}"]`);
      setTimeout(() => (activeTabEl || modal.querySelector("[data-close-quickhelp]"))?.focus(), 20);
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
      stopBreather();
      stopDiveReflex();
      if (window.syncPanicSimulatorLoops) window.syncPanicSimulatorLoops();
      if (lastFocusedOpener && typeof lastFocusedOpener.focus === "function") {
        lastFocusedOpener.focus();
      }
    }

    document.querySelectorAll("[data-open-quickhelp]").forEach((btn) => {
      btn.addEventListener("click", function () {
        openModal(btn.getAttribute("data-open-quickhelp") || "step1", btn);
      });
    });

    document.querySelectorAll("[data-close-quickhelp]").forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });

    // Deliberately do NOT close modal on backdrop click so trembling hands never dismiss SOS accidentally!
    // Keyboard: Escape closes modal + Tab/Shift+Tab focus trap inside modal + ArrowLeft/Right on tabs
    document.addEventListener("keydown", function (ev) {
      if (modal.hidden) return;
      if (ev.key === "Escape") {
        ev.preventDefault();
        closeModal();
        return;
      }
      if (ev.key === "Tab") {
        const focusables = Array.from(
          modal.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.closest("[hidden]") && el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (ev.shiftKey && document.activeElement === first) {
          ev.preventDefault();
          last.focus();
        } else if (!ev.shiftKey && document.activeElement === last) {
          ev.preventDefault();
          first.focus();
        }
      }
    });

    const tabButtons = Array.from(document.querySelectorAll("[data-qh-tab]"));
    tabButtons.forEach((btn, idx) => {
      btn.addEventListener("click", () => openSosTab(btn.getAttribute("data-qh-tab"), false));
      btn.addEventListener("keydown", function (ev) {
        if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft" && ev.key !== "Home" && ev.key !== "End") return;
        ev.preventDefault();
        let nextIdx = idx;
        if (ev.key === "ArrowRight") nextIdx = (idx + 1) % tabButtons.length;
        else if (ev.key === "ArrowLeft") nextIdx = (idx - 1 + tabButtons.length) % tabButtons.length;
        else if (ev.key === "Home") nextIdx = 0;
        else if (ev.key === "End") nextIdx = tabButtons.length - 1;
        openSosTab(tabButtons[nextIdx].getAttribute("data-qh-tab"), true);
      });
    });

    document.querySelectorAll("[data-qh-goto]").forEach((btn) => {
      btn.addEventListener("click", () => openSosTab(btn.getAttribute("data-qh-goto"), true));
    });

    // 5-4-3-2-1 Interactive Sensory Cards + Completion Feedback
    const groundingState = { g5: false, g4: false, g3: false, g2: false, g1: false };
    function renderGroundingCards() {
      const wrap = document.getElementById("sosGroundingGrid");
      const statusBox = document.getElementById("sosGroundingStatus");
      if (!wrap) return;
      const items = isEn()
        ? [
            { id: "g5", n: "5", label: "Things You SEE", sub: "Tap after naming 5 neutral objects" },
            { id: "g4", n: "4", label: "Surfaces You TOUCH", sub: "Feet on floor, chair, fabric" },
            { id: "g3", n: "3", label: "Sounds You HEAR", sub: "Fan hum, distant traffic, breath" },
            { id: "g2", n: "2", label: "Scents You SMELL", sub: "Soap, air, or 2 gentle nasal breaths" },
            { id: "g1", n: "1", label: "Taste / Safe Truth", sub: "'Uncomfortable, never dangerous'" }
          ]
        : [
            { id: "g5", n: "5", label: "Objek Anda NAMPAK", sub: "Klik lepas sebut 5 benda di depan mata" },
            { id: "g4", n: "4", label: "Permukaan DISENTUH", sub: "Tapak kaki di lantai, kerusi, baju" },
            { id: "g3", n: "3", label: "Bunyi Anda DENGAR", sub: "Kipas, kenderaan jauh, hembusan nafas" },
            { id: "g2", n: "2", label: "Bau Di Sekitar", sub: "Sabun, udara, atau 2 nafas hidung" },
            { id: "g1", n: "1", label: "Rasa / Ayat Fakta", sub: "'Cuma adrenalin sementara, saya selamat'" }
          ];

      wrap.innerHTML = items
        .map(
          (it) => `<button type="button" class="grounding-card ${groundingState[it.id] ? "done" : ""}" data-ground-id="${it.id}" aria-pressed="${groundingState[it.id] ? "true" : "false"}">
            <div class="grounding-num">${groundingState[it.id] ? "✓" : it.n}</div>
            <strong style="font-size:0.83rem; display:block;">${it.label}</strong>
            <span style="font-size:0.74rem; color:var(--text-muted);">${it.sub}</span>
          </button>`
        )
        .join("");

      const doneCount = Object.values(groundingState).filter(Boolean).length;
      if (statusBox) {
        if (doneCount === 5) {
          statusBox.innerHTML = `<div class="alert-banner alert-safe" style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; padding:9px 12px;">
            <span>${
              isEn()
                ? "✅ <strong>All 5/5 Senses Anchored!</strong> Notice how your surroundings are solid and safe while the adrenaline wave settles."
                : "✅ <strong>Lengkap 5/5 Deria Dikesan!</strong> Perhatikan persekitaran anda kekal kukuh dan selamat sementara baki debaran beransur turun."
            }</span>
            <button type="button" class="chip-btn" id="resetGroundingBtn">${isEn() ? "🔄 Reset" : "🔄 Ulang Semula"}</button>
          </div>`;
        } else if (doneCount > 0) {
          statusBox.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; gap:8px; font-size:0.8rem; color:var(--text-muted);">
            <span>${isEn() ? `Progress: ${doneCount} / 5 senses anchored` : `Kemajuan Grounding: ${doneCount} / 5 deria selesai`}</span>
            <button type="button" class="chip-btn" id="resetGroundingBtn" style="padding:3px 9px; font-size:0.74rem;">${isEn() ? "Reset" : "Reset"}</button>
          </div>`;
        } else {
          statusBox.innerHTML = "";
        }
        statusBox.querySelector("#resetGroundingBtn")?.addEventListener("click", function () {
          Object.keys(groundingState).forEach((k) => {
            groundingState[k] = false;
          });
          renderGroundingCards();
        });
      }

      wrap.querySelectorAll("[data-ground-id]").forEach((b) => {
        b.addEventListener("click", function () {
          const k = b.getAttribute("data-ground-id");
          groundingState[k] = !groundingState[k];
          renderGroundingCards();
        });
      });
    }

    // 30-Second Red Flag Emergency Verdict
    function evaluateSosRedFlags() {
      const checked = Array.from(document.querySelectorAll(".sos-redflag-cb:checked"));
      const box = document.getElementById("sosEmergencyVerdict");
      if (!box) return;
      if (checked.length === 0) {
        box.className = "alert-banner alert-safe";
        box.innerHTML = isEn()
          ? "✅ <strong>No Immediate Red Flags Ticked:</strong> If a doctor has previously confirmed panic attacks, stay seated safely, avoid fleeing, and use the <strong>Guided Breather</strong>—this adrenaline surge will peak and settle within 15–20 minutes."
          : "✅ <strong>Tiada Tanda Merah Ditandakan:</strong> Jika doktor pernah mengesahkan simptom panik sebelum ini, duduk tenang, elakkan melarikan diri, dan gunakan <strong>Panduan Nafas</strong>—gelombang adrenalin ini pasti surut dalam 15–20 minit.";
      } else {
        box.className = "alert-banner alert-danger";
        box.innerHTML = isEn()
          ? `🚨 <strong>MEDICAL RED FLAG DETECTED (${checked.length} selected):</strong> Do NOT assume this is just panic! Seek immediate hospital ECG &amp; medical evaluation (never breathe into a paper bag). <div style="margin-top:8px;"><a href="tel:999" class="btn-sos-primary" style="text-decoration:none;">🚑 Tap to Call 999 Immediately</a></div>`
          : `🚨 <strong>TANDA AMARAN MERAH DIKESAN (${checked.length} ditanda):</strong> JANGAN anggap ini panik biasa! Dapatkan pemeriksaan ECG &amp; doktor di Jabatan Kecemasan segera (jangan guna beg kertas). <div style="margin-top:8px;"><a href="tel:999" class="btn-sos-primary" style="text-decoration:none;">🚑 Tekan Untuk Dail 999 Sekarang</a></div>`;
      }
    }

    document.querySelectorAll(".sos-redflag-cb").forEach((cb) => {
      cb.addEventListener("change", function () {
        cb.closest(".check-tile")?.classList.toggle("checked", cb.checked);
        evaluateSosRedFlags();
      });
    });

    // Doctor / MENTARI Visit Summary Note Generator (Independent BM / EN Note Toggle!)
    let docNoteLangOverride = null; // null = follow app language unless user clicks toggle

    function getDocNoteLang() {
      return docNoteLangOverride || (isEn() ? "en" : "ms");
    }

    function syncDocNoteLangButtons() {
      const nl = getDocNoteLang();
      document.querySelectorAll("[data-doc-lang]").forEach((b) => {
        const act = b.getAttribute("data-doc-lang") === nl;
        b.classList.toggle("active", act);
        b.setAttribute("aria-pressed", act ? "true" : "false");
      });
    }

    document.querySelectorAll("[data-doc-lang]").forEach((btn) => {
      btn.addEventListener("click", function () {
        docNoteLangOverride = btn.getAttribute("data-doc-lang") === "en" ? "en" : "ms";
        syncDocNoteLangButtons();
        generateDoctorNote();
      });
    });

    function getSelectOptionInLang(selectId, targetLang) {
      const sel = document.getElementById(selectId);
      const opt = sel?.selectedOptions?.[0];
      if (!opt) return "";
      if (targetLang === "en") {
        return opt.getAttribute("data-en") || opt.textContent.trim();
      }
      return (opt.dataset.ms !== undefined ? opt.dataset.ms : opt.textContent).trim();
    }

    function generateDoctorNote() {
      const preview = document.getElementById("docNotePreview");
      if (!preview) return;
      syncDocNoteLangButtons();

      const noteLang = getDocNoteLang();
      const noteEn = noteLang === "en";
      const freq = getSelectOptionInLang("docFreq", noteLang);
      const peak = getSelectOptionInLang("docPeak", noteLang);
      const trig = getSelectOptionInLang("docTrigger", noteLang);
      const avoid = getSelectOptionInLang("docAvoid", noteLang);
      const rawMeds = document.getElementById("docMeds")?.value.trim();
      const meds = rawMeds || (noteEn ? "None reported" : "Tiada dinyatakan");

      const dsmChecked = selectedDsmIds.size;
      const langData = window.PANIC_DATA_BY_LANG?.[noteLang] || window.getPanicData();
      const symNames = (langData.dsmSymptoms || [])
        .filter((s) => selectedDsmIds.has(s.id))
        .map((s) => "  • " + s.label)
        .join("\n");

      if (noteEn) {
        preview.value = [
          "=== PATIENT VISIT SUMMARY (PANIC / SOMATIC EVALUATION) ===",
          `Date Generated: ${new Date().toLocaleDateString("en-GB")}`,
          `1. Episode Frequency: ${freq}`,
          `2. Time-to-Peak & Duration: ${peak}`,
          `3. Trigger Context: ${trig}`,
          `4. Peak Symptoms Ticked (${dsmChecked} / 13):`,
          symNames || "  • None ticked yet",
          `5. 1-Month Worry / Avoidance Impact: ${avoid}`,
          `6. Caffeine, Gastric/GERD, Meds & History: ${meds}`,
          "",
          "Questions for Doctor (KK / GP / MENTARI):",
          "- Could we check baseline ECG, thyroid (TSH), fasting glucose, and blood count/ferritin to rule out physical look-alikes?",
          "- Would Panic-Focused CBT (MENTARI / psychology referral) or a first-line SSRI be appropriate for me?"
        ].join("\n");
      } else {
        preview.value = [
          "=== RINGKASAN SIMPTOM PESAKIT UNTUK DOKTOR / KLINIK KESIHATAN / MENTARI ===",
          `Tarikh Dijana: ${new Date().toLocaleDateString("ms-MY")}`,
          `1. Kekerapan Episod: ${freq}`,
          `2. Masa Memuncak & Tempoh: ${peak}`,
          `3. Situasi Pencetus: ${trig}`,
          `4. Senarai Simptom Kemuncak (${dsmChecked} / 13 simptom):`,
          symNames || "  • Belum ditanda",
          `5. Kesan Kebimbangan ≥1 Bulan / Mengelak Tempat: ${avoid}`,
          `6. Kafein, Gastrik/GERD, Ubat Semasa & Sejarah Kesihatan: ${meds}`,
          "",
          "Soalan Untuk Doktor (Klinik Kesihatan / GP / MENTARI):",
          "- Bolehkah kita buat ujian asas (ECG jantung, darah tiroid TSH, gula darah & darah penuh/zat besi) untuk pastikan badan sihat?",
          "- Adakah rujukan terapi CBT (MENTARI / kaunseling klinikal) atau ubat barisan pertama sesuai untuk saya?"
        ].join("\n");
      }
    }

    window.refreshDoctorNotePreview = generateDoctorNote;

    ["docFreq", "docPeak", "docTrigger", "docAvoid", "docMeds"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", generateDoctorNote);
        el.addEventListener("input", generateDoctorNote);
      }
    });

    const copyBtn = document.getElementById("copyDocNoteBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        const preview = document.getElementById("docNotePreview");
        if (!preview) return;
        navigator.clipboard?.writeText(preview.value);
        flashButtonFeedback(copyBtn, "✅ Berjaya Disalin!", "✅ Copied to Clipboard!");
      });
    }

    const printBtn = document.getElementById("printDocNoteBtn");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        generateDoctorNote();
        const noteEn = getDocNoteLang() === "en";
        const text = document.getElementById("docNotePreview")?.value || "";
        const win = window.open("", "_blank", "width=760,height=680");
        if (!win) {
          window.print();
          return;
        }
        const escaped = escapeHtml(text);
        const docTitle = noteEn
          ? "PanicLab — Patient Clinical Visit Summary"
          : "PanicLab — Ringkasan Temu Janji Klinik / MENTARI";
        win.document.write(
          `<!DOCTYPE html><html lang="${noteEn ? "en" : "ms"}"><head><meta charset="UTF-8"><title>${docTitle}</title>
          <style>body{font-family:Segoe UI,Arial,sans-serif;padding:32px;color:#0f2230;line-height:1.6}pre{white-space:pre-wrap;font-family:inherit;font-size:14px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:20px}</style>
          </head><body><h2 style="margin-top:0;">${docTitle}</h2><pre>${escaped}</pre></body></html>`
        );
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 200);
      });
    }

    langCallbacks.push(function () {
      renderRhythmSelector();
      updateBreatherDisplay();
      renderGroundingCards();
      updateDiveBtn();
      evaluateSosRedFlags();
      generateDoctorNote();
    });

    renderRhythmSelector();
    updateBreatherDisplay();
    renderGroundingCards();
    updateDiveBtn();
    evaluateSosRedFlags();
    setTimeout(generateDoctorNote, 50);

    // PWA / Deep-Link Auto-Open (?sos=1)
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("sos") === "1") {
        setTimeout(() => openModal("step1", null), 80);
      }
    } catch (_) {}
  }

  // --------------------------------------------------------------------------
  // CHAPTER 1: 3-WAY SPECTRUM CARDS (PANIC ATTACK vs DISORDER vs AGORAPHOBIA)
  // --------------------------------------------------------------------------
  function renderSpectrumSection() {
    const container = document.getElementById("spectrumCardsGrid");
    if (!container) return;
    const isClin = window.currentAudienceMode === "clinical";
    const cards = window.getPanicData().spectrumCards;
    container.innerHTML = cards
      .map(
        (c) => `<article class="panel-card" style="display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
              <span class="pill-badge ${c.badgeClass}">${isClin && c.clinicalBadge ? c.clinicalBadge : c.badge}</span>
            </div>
            <h3 style="margin:0 0 6px;">${c.title}</h3>
            <div class="layman-only" style="font-size:0.88rem; color:var(--text-secondary);">${c.layman}</div>
            <div class="family-only" style="font-size:0.88rem; color:var(--text-secondary);">${c.family || c.layman}</div>
            <div class="clinical-only" style="font-size:0.88rem; color:var(--text-secondary);">${c.clinical}</div>
          </div>
          <div style="padding-top:10px; border-top:1px solid var(--border-subtle); font-size:0.8rem; font-weight:700; color:var(--accent-teal);">
            📊 ${c.stat}
          </div>
        </article>`
      )
      .join("");
  }

  // --------------------------------------------------------------------------
  // CHAPTER 2: DSM-5-TR 13-SYMPTOM TRIAGE (CRITERIA A–D) & DIFFERENTIAL MATRIX
  // --------------------------------------------------------------------------
  function initDsmCheckerAndDiffTable() {
    function renderDsmList() {
      const wrap = document.getElementById("dsmSymptomsGrid");
      if (!wrap) return;
      const items = window.getPanicData().dsmSymptoms;
      wrap.innerHTML = items
        .map((s) => {
          const isChk = selectedDsmIds.has(s.id);
          return `<label class="check-tile ${isChk ? "checked" : ""}">
            <input type="checkbox" class="dsm-sym-cb" value="${s.id}" ${isChk ? "checked" : ""} />
            <span>${s.label}</span>
          </label>`;
        })
        .join("");

      wrap.querySelectorAll(".dsm-sym-cb").forEach((cb) => {
        cb.addEventListener("change", function () {
          if (cb.checked) selectedDsmIds.add(cb.value);
          else selectedDsmIds.delete(cb.value);
          cb.closest(".check-tile")?.classList.toggle("checked", cb.checked);
          evaluateDsmPattern();
          if (window.refreshDoctorNotePreview) window.refreshDoctorNotePreview();
          if (window.markModuleExplored) window.markModuleExplored("dsm");
        });
      });
    }

    function evaluateDsmPattern() {
      const count = selectedDsmIds.size;
      const unexp = document.getElementById("dsmUnexpectedCb")?.checked;
      const oneMonth = document.getElementById("dsmOneMonthCb")?.checked;
      const notSingleCue = document.getElementById("dsmSpecificPhobiaCb")?.checked !== false;
      const redFlagOrg = document.getElementById("dsmOrganicCb")?.checked;

      const badge = document.getElementById("dsmCountBadge");
      const fill = document.getElementById("dsmProgressBar");
      const verdict = document.getElementById("dsmTriageVerdict");

      if (badge) {
        badge.textContent = isEn() ? `${count} / 13 Symptoms` : `${count} / 13 Simptom`;
        badge.className = "pill-badge " + (count >= 4 ? "pill-safe" : "pill-info");
      }
      if (fill) {
        fill.style.width = Math.round((count / 13) * 100) + "%";
      }
      if (!verdict) return;

      if (redFlagOrg) {
        verdict.className = "alert-banner alert-danger";
        verdict.innerHTML = isEn()
          ? `🩺 <strong>Medical Checkup Priority (Criterion C):</strong> Because first onset >45 yrs, true fainting, or cardiac/thyroid/stimulant factors are ticked, please have a doctor run basic rule-out tests (ECG, TSH thyroid panel, blood glucose) first.`
          : `🩺 <strong>Utamakan Pemeriksaan Doktor Dahulu (Kriteria C):</strong> Oleh kerana faktor usia >45 tahun, pitam sebenar, atau risiko jantung/tiroid ditandakan, sila jalankan ujian asas doktor (ECG, darah tiroid, gula darah) terlebih dahulu.`;
      } else if (count < 4) {
        verdict.className = "alert-banner alert-warn";
        verdict.innerHTML = isEn()
          ? `ℹ️ <strong>Limited-Symptom Surge (${count}/13 — Below 4-Symptom Threshold):</strong> DSM-5-TR defines a full panic attack as ≥4 of 13 symptoms peaking within minutes. Fewer than 4 symptoms is called a <em>limited-symptom attack</em>.`
          : `ℹ️ <strong>Simptom Terhad (${count}/13 — Bawah Ambang 4 Simptom):</strong> Kriteria DSM-5-TR menetapkan sekurang-kurangnya 4 daripada 13 simptom memuncak dalam beberapa minit. Kurang daripada 4 dipanggil <em>limited-symptom attack</em>.`;
      } else if (!notSingleCue) {
        verdict.className = "alert-banner alert-warn";
        verdict.innerHTML = isEn()
          ? `🧭 <strong>Cued / Situational Panic Specifier (Criterion D):</strong> When panic attacks happen <em>only</em> in response to one specific phobia or public speaking, doctors evaluate for Specific Phobia or Social Anxiety with panic attacks rather than standalone Panic Disorder.`
          : `🧭 <strong>Serangan Panik Berpencetus Khusus (Kriteria D):</strong> Jika serangan berlaku <em>hanya</em> apabila berdepan satu fobia tertentu atau berucap di pentas sahaja, doktor lazimnya menilai Fobia Spesifik atau Keresahan Sosial (bukan Panic Disorder berulang tanpa amaran).`;
      } else if (unexp && oneMonth) {
        verdict.className = "alert-banner alert-safe";
        verdict.innerHTML = isEn()
          ? `📌 <strong>Initial Screening — Consistent with Panic Disorder (${count}/13 symptoms + ≥1 Month Impact):</strong> Recurrent unexpected surges plus ≥1 month of worry or avoidance match DSM-5-TR / ICD-11 (<code>6B01</code>) features. Open <strong>5. Doctor Note</strong> in SOS to share a clean summary at Klinik Kesihatan, GP, or MENTARI.`
          : `📌 <strong>Saringan Awal — Menepati Ciri Panic Disorder (${count}/13 simptom + Kesan ≥1 Bulan):</strong> Serangan mengejut berulang berserta kebimbangan/mengelak tempat ≥1 bulan selari dengan ciri DSM-5-TR / ICD-11 (<code>6B01</code>). Gunakan <strong>Nota Doktor</strong> untuk dibawa ke Klinik Kesihatan, GP, atau MENTARI.`;
      } else {
        verdict.className = "alert-banner";
        verdict.innerHTML = isEn()
          ? `⚡ <strong>Matches a Single / Situational Panic Attack (${count}/13 symptoms):</strong> Having a panic attack (~13% of adults) does NOT mean you have Panic Disorder unless unexpected attacks repeat and cause ≥1 month of ongoing worry or avoidance.`
          : `⚡ <strong>Menepati Ciri Episod Panic Attack (${count}/13 simptom):</strong> Mengalami Panic Attack (~13% orang dewasa) BUKAN bermakna anda menghidap Panic Disorder melainkan serangan mengejut berulang dan mengganggu hidup selama ≥1 bulan.`;
      }
    }

    ["dsmUnexpectedCb", "dsmOneMonthCb", "dsmSpecificPhobiaCb", "dsmOrganicCb"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.closest(".check-tile")?.classList.toggle("checked", el.checked);
        el.addEventListener("change", function () {
          el.closest(".check-tile")?.classList.toggle("checked", el.checked);
          evaluateDsmPattern();
        });
      }
    });

    function renderDiffTable() {
      const tbody = document.getElementById("diffMatrixBody");
      if (!tbody) return;
      const rows = window.getPanicData().diffRows;
      const col1 = isEn() ? "Feature" : "Ciri";
      const col2 = "⚡ Panic Attack";
      const col3 = isEn() ? "💭 Everyday Anxiety" : "💭 Keresahan Biasa";
      const col4 = isEn() ? "🚨 Heart Attack (999)" : "🚨 Serangan Jantung (999)";

      tbody.innerHTML = rows
        .map(
          (r) => `<tr>
            <td data-col="${col1}"><strong style="color:var(--text-primary);">${r.feature}</strong></td>
            <td data-col="${col2}">${r.panic}</td>
            <td data-col="${col3}">${r.anxiety}</td>
            <td data-col="${col4}" style="color:var(--text-primary); border-left:2px solid rgba(239,68,68,0.3);">${r.acs}</td>
          </tr>`
        )
        .join("");
    }

    langCallbacks.push(function () {
      renderDsmList();
      evaluateDsmPattern();
      renderDiffTable();
    });

    renderDsmList();
    evaluateDsmPattern();
    renderDiffTable();
  }

  // --------------------------------------------------------------------------
  // CHAPTER 3: CAFFEINE CALCULATOR, NON-CAFF TRIGGERS & 4 CLINIC QUESTIONS DRAWER
  // --------------------------------------------------------------------------
  const selectedCaffeineIds = new Set(["kopi_kaw", "teh_tarik"]);

  function initCaffeineAndMyths() {
    let activeSomaticId = "gerd";

    function renderCaffeine() {
      const list = document.getElementById("caffeineItemList");
      const nonCaffBox = document.getElementById("nonCaffTriggersBox");
      if (!list) return;
      const d = window.getPanicData();
      const items = d.caffeineItems || [];

      list.innerHTML = items
        .map((it) => {
          const chk = selectedCaffeineIds.has(it.id);
          return `<label class="check-tile ${chk ? "checked" : ""}">
            <input type="checkbox" data-caff-id="${it.id}" ${chk ? "checked" : ""} />
            <span><strong>${it.name}</strong><br/><small style="color:var(--accent-teal);">~${it.mg} mg</small></span>
          </label>`;
        })
        .join("");

      list.querySelectorAll("[data-caff-id]").forEach((cb) => {
        cb.addEventListener("change", function () {
          const id = cb.getAttribute("data-caff-id");
          if (cb.checked) selectedCaffeineIds.add(id);
          else selectedCaffeineIds.delete(id);
          cb.closest(".check-tile")?.classList.toggle("checked", cb.checked);
          updateCaffeineVerdict();
          if (window.markModuleExplored) window.markModuleExplored("caffeine");
        });
      });

      if (nonCaffBox && d.nonCaffTriggers) {
        nonCaffBox.innerHTML = `
          <div class="reasoning-box" style="padding:11px 13px; font-size:0.82rem;">
            <strong style="display:block; margin-bottom:6px; color:var(--text-primary);">
              ${isEn() ? "💊 Non-Caffeine Adrenaline Mimics (0 mg Caffeine, Same Racing Heart):" : "💊 Pencetus Lain Tanpa Kafein (0 mg Kopi, Tapi Buat Jantung Laju):"}
            </strong>
            <div style="display:grid; gap:6px; color:var(--text-secondary);">
              ${d.nonCaffTriggers.map((t) => `<div><strong>${t.name}:</strong> ${t.note}</div>`).join("")}
            </div>
          </div>
        `;
      }

      updateCaffeineVerdict();
    }

    function updateCaffeineVerdict() {
      const items = window.getPanicData().caffeineItems || [];
      let total = 0;
      items.forEach((it) => {
        if (selectedCaffeineIds.has(it.id)) total += it.mg;
      });
      const valEl = document.getElementById("caffeineTotalVal");
      const barEl = document.getElementById("caffeineProgressFill");
      const msgEl = document.getElementById("caffeineAdviceMsg");

      if (valEl) valEl.textContent = `${total} mg`;
      if (barEl) {
        const pct = Math.min(100, Math.round((total / 480) * 100));
        barEl.style.width = pct + "%";
        barEl.style.background =
          total >= 400
            ? "linear-gradient(90deg, #f59e0b, #ef4444)"
            : total >= 200
              ? "linear-gradient(90deg, #0d9488, #f59e0b)"
              : "linear-gradient(90deg, #0d9488, #0284c7)";
      }
      if (!msgEl) return;

      if (total >= 400) {
        msgEl.className = "alert-banner alert-danger";
        msgEl.innerHTML = isEn()
          ? `🚨 <strong>High Provocation Zone (${total} mg):</strong> Meta-analysis by <em>Klevebrant &amp; Frick (2022)</em> proved that ~400–480 mg of caffeine directly triggers panic attacks in <strong>&gt;51% of panic disorder patients</strong> (by blocking calming adenosine receptors). Taper down gradually over 1–2 weeks!`
          : `🚨 <strong>Zon Pencetus Tinggi (${total} mg):</strong> Kajian <em>Klevebrant &amp; Frick (2022)</em> mengesahkan ~400–480 mg kafein mencetuskan Panic Attack secara langsung pada <strong>lebih separuh (&gt;51%) pesakit</strong>! Kurangkan secara berperingkat dalam 1–2 minggu.`;
      } else if (total >= 200) {
        msgEl.className = "alert-banner alert-warn";
        msgEl.innerHTML = isEn()
          ? `⚠️ <strong>Moderate Trigger Zone (${total} mg):</strong> If you experience palpitations, gastric reflux, or nocturnal panic, keep daily caffeine below 100–150 mg and stop before 12:00 PM.`
          : `⚠️ <strong>Zon Sensitif Sederhana (${total} mg):</strong> Jika anda mudah berdebar, ada gastrik, atau kerap terjaga malam, hadkan bawah 100–150 mg sehari dan elakkan kafein selepas 12:00 tengah hari.`;
      } else {
        msgEl.className = "alert-banner alert-safe";
        msgEl.innerHTML = isEn()
          ? `✅ <strong>Low Caffeine Load (${total} mg):</strong> Gentle on your nervous system. Also watch out for skipped meals, poor sleep, and decongestant cold tablets below.`
          : `✅ <strong>Beban Kafein Rendah (${total} mg):</strong> Mesra sistem saraf anda. Pastikan juga makan ikut waktu, cukup tidur, dan semak pencetus bukan kafein di bawah.`;
      }
    }

    function renderMyths() {
      const grid = document.getElementById("mythsCardsGrid");
      if (!grid) return;
      const list = window.getPanicData().mythsAndTraps;
      grid.innerHTML = list
        .map(
          (m) => `<div class="myth-card">
            <div><span class="pill-badge ${m.badgeClass}">${m.badge}</span></div>
            <strong style="font-size:0.94rem;">${m.title}</strong>
            <div style="font-size:0.82rem; color:var(--text-muted); font-style:italic;">${m.myth}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary);">${m.truth}</div>
          </div>`
        )
        .join("");
    }

    function renderSomaticDrawer() {
      const tabsEl = document.getElementById("somaticDrawerTabs");
      const stageEl = document.getElementById("somaticDrawerStage");
      if (!tabsEl || !stageEl) return;

      const list = window.getPanicData().somaticClinicDrawer || [];
      if (!list.length) return;
      const cur = list.find((x) => x.id === activeSomaticId) || list[0];

      tabsEl.innerHTML = list
        .map(
          (item) => `<button type="button" class="chip-btn ${item.id === cur.id ? "active" : ""}" data-somatic-pick="${item.id}" aria-pressed="${item.id === cur.id ? "true" : "false"}">
            ${item.tabLabel}
          </button>`
        )
        .join("");

      tabsEl.querySelectorAll("[data-somatic-pick]").forEach((btn) => {
        btn.addEventListener("click", function () {
          activeSomaticId = btn.getAttribute("data-somatic-pick");
          renderSomaticDrawer();
          if (window.markModuleExplored) window.markModuleExplored("caffeine");
        });
      });

      stageEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:6px;">
          <strong style="font-size:0.98rem; color:var(--text-primary);">${cur.title}</strong>
          <span class="pill-badge pill-info">${cur.badge}</span>
        </div>
        <div class="layman-only" style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6;">${cur.layman}</div>
        <div class="family-only" style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6;">${cur.family || cur.layman}</div>
        <div class="clinical-only" style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6;">${cur.clinical}</div>
      `;
    }

    langCallbacks.push(function () {
      renderCaffeine();
      renderMyths();
      renderSomaticDrawer();
    });

    renderCaffeine();
    renderMyths();
    renderSomaticDrawer();
  }

  // --------------------------------------------------------------------------
  // CHAPTER 4: 8+1 COPING CARDS (WITH PERSONAL CARD), BASE-RATE & THOUGHT RECORD
  // --------------------------------------------------------------------------
  function initCopingCardsAndThoughtRecord() {
    let activeCardId = "traffic";
    const readCounts = {};
    let customCard = safeParseJSON(safeGetStorage("paniclab_custom_card", "null"), null);
    let editingCustomCard = false;

    function getDefaultCustomCard() {
      return isEn()
        ? {
            title: "My Personal Calm Script",
            line1: "My racing heart and tingling hands are an adrenaline false alarm—my ECG/body is safe.",
            line2: "I have survived 100% of past episodes without fainting or losing control.",
            line3: "Drop my shoulders, exhale slowly for 6 seconds, and stay right here until the wave settles."
          }
        : {
            title: "Kad Tenang Peribadi Saya",
            line1: "Jantung laju dan tangan kebas ini cuma penggera palsu adrenalin—badan & jantung saya selamat.",
            line2: "Saya sudah selamat 100% dalam semua episod sebelum ini tanpa pengsan atau hilang kawalan.",
            line3: "Jatuhkan bahu, hembus nafas perlahan 6 saat, dan kekal tenang di sini sehingga gelombang surut."
          };
    }

    function renderCopingWidget(tabsId, stageId) {
      const tabsEl = document.getElementById(tabsId);
      const stageEl = document.getElementById(stageId);
      if (!tabsEl || !stageEl) return;

      const cards = window.getPanicData().copingCards || [];
      const isCustom = activeCardId === "custom";
      const cur = !isCustom ? cards.find((c) => c.id === activeCardId) || cards[0] : null;
      const curId = isCustom ? "custom" : cur.id;
      const reads = readCounts[curId] || 0;
      const overLimit = reads >= 2;

      tabsEl.innerHTML =
        cards
          .map(
            (c) => `<button type="button" class="chip-btn ${!isCustom && c.id === cur.id ? "active" : ""}" data-coping-pick="${c.id}" aria-pressed="${!isCustom && c.id === cur.id ? "true" : "false"}">
              ${c.icon} ${c.shortLabel}
            </button>`
          )
          .join("") +
        `<button type="button" class="chip-btn ${isCustom ? "active" : ""}" data-coping-pick="custom" aria-pressed="${isCustom ? "true" : "false"}">
          ✍️ ${isEn() ? "My Card" : "Kad Saya"}
        </button>`;

      tabsEl.querySelectorAll("[data-coping-pick]").forEach((btn) => {
        btn.addEventListener("click", function () {
          activeCardId = btn.getAttribute("data-coping-pick");
          editingCustomCard = false;
          renderAllCopingWidgets();
          if (window.markModuleExplored) window.markModuleExplored("cr");
        });
      });

      if (isCustom) {
        const cc = customCard || getDefaultCustomCard();
        if (!customCard || editingCustomCard) {
          stageEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
              <strong style="font-size:0.96rem;">✍️ ${isEn() ? "Build Your Personal 60-Second Coping Card" : "Bina Coping Card 60 Saat Peribadi Anda"}</strong>
              <span class="pill-badge pill-info">${isEn() ? "Saved on This Device" : "Disimpan Dalam Pelayar Ini"}</span>
            </div>
            <div style="display:grid; gap:8px; margin-bottom:10px;">
              <input type="text" class="form-input" data-cc-field="title" value="${escapeHtml(cc.title)}" placeholder="${isEn() ? "Situation title (e.g., Picking up kids / Supermarket)" : "Tajuk situasi (cth: Ambil anak sekolah / Pasar raya)"}" />
              <input type="text" class="form-input" data-cc-field="line1" value="${escapeHtml(cc.line1)}" placeholder="${isEn() ? "1. What is happening in my body?" : "1. Apa sebenarnya sedang berlaku dalam badan?"}" />
              <input type="text" class="form-input" data-cc-field="line2" value="${escapeHtml(cc.line2)}" placeholder="${isEn() ? "2. Why am I medically safe? (Doctor / past proof)" : "2. Kenapa saya selamat? (Bukti doktor / rekod lepas)"}" />
              <input type="text" class="form-input" data-cc-field="line3" value="${escapeHtml(cc.line3)}" placeholder="${isEn() ? "3. My calm next step right now" : "3. Apa langkah tenang saya sekarang?"}" />
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button type="button" class="btn-primary" data-save-custom-card>${isEn() ? "💾 Save My Coping Card" : "💾 Simpan Kad Saya"}</button>
              ${customCard ? `<button type="button" class="btn-secondary" data-cancel-custom-card>${isEn() ? "Cancel" : "Batal"}</button>` : ""}
            </div>
          `;

          stageEl.querySelector("[data-save-custom-card]")?.addEventListener("click", function () {
            const getF = (f, fb) => stageEl.querySelector(`[data-cc-field="${f}"]`)?.value.trim() || fb;
            const def = getDefaultCustomCard();
            customCard = {
              title: getF("title", def.title),
              line1: getF("line1", def.line1),
              line2: getF("line2", def.line2),
              line3: getF("line3", def.line3)
            };
            safeSetStorage("paniclab_custom_card", JSON.stringify(customCard));
            editingCustomCard = false;
            readCounts.custom = 0;
            renderAllCopingWidgets();
          });

          stageEl.querySelector("[data-cancel-custom-card]")?.addEventListener("click", function () {
            editingCustomCard = false;
            renderAllCopingWidgets();
          });
          return;
        }

        const customPlain = `${cc.title}\n• ${cc.line1}\n• ${cc.line2}\n• ${cc.line3}`;
        stageEl.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
            <strong style="font-size:0.98rem;">✍️ ${escapeHtml(cc.title)}</strong>
            <span class="pill-badge ${overLimit ? "pill-warn" : "pill-safe"}">
              ${isEn() ? `Read Count: ${reads} / 2 Max` : `Kiraan Baca: ${reads} / 2 Maksimum`}
            </span>
          </div>
          <ul class="coping-beat-list">
            <li class="coping-beat-item">💓 ${escapeHtml(cc.line1)}</li>
            <li class="coping-beat-item">🛡️ ${escapeHtml(cc.line2)}</li>
            <li class="coping-beat-item">👣 ${escapeHtml(cc.line3)}</li>
          </ul>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <button type="button" class="btn-primary" data-mark-read="custom">
              ${overLimit ? (isEn() ? "✅ 2/2 Reads Done — Stay & Let It Settle!" : "✅ Cukup 2x Baca — Kekal Tenang!") : isEn() ? `✓ Mark Read (${reads}/2)` : `✓ Tandakan Sudah Baca (${reads}/2)`}
            </button>
            <button type="button" class="btn-secondary" data-copy-custom>${isEn() ? "📋 Copy Card" : "📋 Salin Kad"}</button>
            <button type="button" class="chip-btn" data-edit-custom>${isEn() ? "✏️ Edit" : "✏️ Ubah"}</button>
            ${reads > 0 ? `<button type="button" class="chip-btn" data-reset-read="custom">${isEn() ? "Reset Counter" : "Reset Kiraan"}</button>` : ""}
          </div>
          ${
            overLimit
              ? `<div class="alert-banner alert-warn" style="margin-top:10px;">${
                  isEn()
                    ? "🛡️ <strong>2x Read Limit Reached:</strong> Put the card down, soften your shoulders, and stay where you are so your brain sees real proof that you are safe."
                    : "🛡️ <strong>Had Baca 2 Kali Dicapai:</strong> Simpan semula skrin ini, jatuhkan bahu, dan kekal di tempat anda supaya otak melihat bukti nyata anda selamat tanpa mengulang kad."
                }</div>`
              : ""
          }
        `;

        stageEl.querySelector("[data-mark-read]")?.addEventListener("click", function () {
          readCounts.custom = Math.min(3, (readCounts.custom || 0) + 1);
          renderAllCopingWidgets();
        });
        stageEl.querySelector("[data-reset-read]")?.addEventListener("click", function () {
          readCounts.custom = 0;
          renderAllCopingWidgets();
        });
        stageEl.querySelector("[data-edit-custom]")?.addEventListener("click", function () {
          editingCustomCard = true;
          renderAllCopingWidgets();
        });
        stageEl.querySelector("[data-copy-custom]")?.addEventListener("click", function (ev) {
          navigator.clipboard?.writeText(customPlain);
          flashButtonFeedback(ev.currentTarget, "✅ Kad Disalin!", "✅ Card Copied!", renderAllCopingWidgets, 1800);
        });
        return;
      }

      const beatsHtml = Array.isArray(cur.beats) && cur.beats.length
        ? `<ul class="coping-beat-list">${cur.beats.map((b) => `<li class="coping-beat-item">${b}</li>`).join("")}</ul>`
        : `<div class="coping-script-quote">"${escapeHtml(cur.script)}"</div>`;

      stageEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <strong style="font-size:0.98rem;">${cur.icon} ${cur.title}</strong>
          <span class="pill-badge ${overLimit ? "pill-warn" : "pill-safe"}">
            ${isEn() ? `Read Count: ${reads} / 2 Max` : `Kiraan Baca: ${reads} / 2 Maksimum`}
          </span>
        </div>
        ${beatsHtml}
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn-primary" data-mark-read="${cur.id}">
            ${
              overLimit
                ? isEn() ? "✅ 2/2 Reads Done — Now Stay & Act!" : "✅ Cukup 2x Baca — Kekal & Teruskan Urusan!"
                : isEn() ? `✓ Mark Read (${reads}/2)` : `✓ Tandakan Sudah Baca (${reads}/2)`
            }
          </button>
          <button type="button" class="btn-secondary" data-copy-card="${cur.id}">
            ${isEn() ? "📋 Copy to Phone Notes" : "📋 Salin Ke Nota Telefon"}
          </button>
          ${
            reads > 0
              ? `<button type="button" class="chip-btn" data-reset-read="${cur.id}">${isEn() ? "Reset Counter" : "Reset Kiraan"}</button>`
              : ""
          }
        </div>
        ${
          overLimit
            ? `<div class="alert-banner alert-warn" style="margin-top:10px;">
                ${
                  isEn()
                    ? "🛡️ <strong>Anti-Crutch Discipline:</strong> You have read this card twice! Stop repeating it—now drop your shoulders, stay safely in place, and let your brain witness that you survive on your own."
                    : "🛡️ <strong>Elak Jadi Safety Behavior:</strong> Anda sudah membacanya 2 kali! Berhenti mengulang kad—sekarang jatuhkan bahu, kekal di lokasi selamat, dan biarkan otak melihat bukti anda selamat sendiri."
                }
              </div>`
            : ""
        }
      `;

      stageEl.querySelector("[data-mark-read]")?.addEventListener("click", function () {
        readCounts[cur.id] = Math.min(3, (readCounts[cur.id] || 0) + 1);
        renderAllCopingWidgets();
        if (window.markModuleExplored) window.markModuleExplored("cr");
      });

      stageEl.querySelector("[data-reset-read]")?.addEventListener("click", function () {
        readCounts[cur.id] = 0;
        renderAllCopingWidgets();
      });

      stageEl.querySelector("[data-copy-card]")?.addEventListener("click", function (ev) {
        navigator.clipboard?.writeText(`${cur.title}\n\n${cur.script}`);
        flashButtonFeedback(
          ev.currentTarget,
          "✅ Disalin Untuk Nota Telefon!",
          "✅ Copied for Phone Notes!",
          renderAllCopingWidgets,
          1800
        );
      });
    }

    function renderAllCopingWidgets() {
      renderCopingWidget("sosCopingTabs", "sosCopingStage");
      renderCopingWidget("pageCopingTabs", "pageCopingStage");
    }

    // 4 Misinterpretation Clusters
    function renderCrClusters() {
      const grid = document.getElementById("crClustersGrid");
      if (!grid) return;
      const list = window.getPanicData().crClusters;
      grid.innerHTML = list
        .map(
          (c) => `<div class="myth-card">
            <strong style="font-size:0.93rem; color:var(--accent-teal);">${c.title}</strong>
            <div style="font-size:0.82rem; color:var(--accent-danger); font-weight:600;">${c.distortion}</div>
            <div style="font-size:0.84rem; color:var(--text-secondary);">${c.reality}</div>
            <div style="font-size:0.8rem; color:var(--accent-cyan); padding-top:4px; border-top:1px solid var(--border-subtle);">${c.socratic}</div>
          </div>`
        )
        .join("");
    }

    // Amygdala Base-Rate Calculator
    function updateBaseRateCalc() {
      const pastEl = document.getElementById("baseRatePastInput");
      const actEl = document.getElementById("baseRateActualInput");
      const outEl = document.getElementById("baseRateVerdict");
      if (!pastEl || !actEl || !outEl) return;

      const past = Math.max(1, parseInt(pastEl.value || "20", 10) || 20);
      const actual = Math.max(0, Math.min(past, parseInt(actEl.value || "0", 10) || 0));
      const falseRate = Math.round(((past - actual) / past) * 100);

      outEl.className = actual === 0 ? "alert-banner alert-safe" : "alert-banner alert-warn";
      outEl.innerHTML =
        actual === 0
          ? isEn()
            ? `🏆 <strong>Historical Track Record:</strong> Out of <strong>${past}</strong> episodes where your fear alarm predicted disaster, you survived <strong>${past} / ${past} (100%)</strong> safely. Your brain's disaster prediction has a <strong>${falseRate}% False-Alarm Rate</strong>!`
            : `🏆 <strong>Rekod Bukti Sejarah:</strong> Daripada <strong>${past}</strong> serangan lalu di mana penggera cemas meramalkan bencana, anda selamat <strong>${past} / ${past} kali (100%)</strong>. Sangkaan buruk itu meleset sebanyak <strong>${falseRate}%</strong>!`
          : isEn()
            ? `🩺 <strong>Medical Note:</strong> Always ensure any true medical events (${actual} noted) have been evaluated by a doctor (ECG/blood workup) so you can confidently separate harmless adrenaline surges.`
            : `🩺 <strong>Nota Doktor:</strong> Pastikan sebarang insiden kesihatan sebenar (${actual} direkodkan) telah diperiksa doktor supaya anda dapat membezakan sensasi panik yang tidak berbahaya dengan yakin.`;
    }

    ["baseRatePastInput", "baseRateActualInput"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateBaseRateCalc);
    });

    // 10-Step Post-Attack Panic Thought Record
    const rawTr = safeParseJSON(safeGetStorage("paniclab_thought_records", "[]"), []);
    let savedRecords = Array.isArray(rawTr) ? rawTr : [];
    let isSampleLoaded = false;
    const trFieldIds = ["trLoc", "trVuln", "trTrigger", "trCatastrophe", "trSafety", "trEvidence", "trPhysio", "trOutcome"];

    function syncTrSliders() {
      const ib = document.getElementById("trInitBelief")?.value || "85";
      const isuds = document.getElementById("trInitSuds")?.value || "8";
      const fb = document.getElementById("trFinalBelief")?.value || "10";
      const fsuds = document.getElementById("trFinalSuds")?.value || "2";

      const ibLbl = document.getElementById("trInitBeliefVal");
      const isLbl = document.getElementById("trInitSudsVal");
      const fbLbl = document.getElementById("trFinalBeliefVal");
      const fsLbl = document.getElementById("trFinalSudsVal");
      if (ibLbl) ibLbl.textContent = ib + "%";
      if (isLbl) isLbl.textContent = isuds + "/10";
      if (fbLbl) {
        fbLbl.textContent = fb + "%" + (Number(fb) <= 15 ? " ✓ (<15%)" : "");
      }
      if (fsLbl) fsLbl.textContent = fsuds + "/10";
    }

    ["trInitBelief", "trInitSuds", "trFinalBelief", "trFinalSuds"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", syncTrSliders);
    });

    trFieldIds.forEach((id) => {
      document.getElementById(id)?.addEventListener("input", function () {
        isSampleLoaded = false;
      });
    });

    // Emotional reasoning detector on Evidence input
    document.getElementById("trEvidence")?.addEventListener("input", function (ev) {
      const val = ev.target.value.toLowerCase();
      const warnEl = document.getElementById("trEmotionWarn");
      if (!warnEl) return;
      const emotionalTriggers = ["lain macam", "tak sedap hati", "rasa macam", "feels different", "gut feeling", "just feel"];
      const hit = emotionalTriggers.some((w) => val.includes(w));
      warnEl.hidden = !hit;
    });

    function populateSampleIntoForm() {
      const s = window.getPanicData().thoughtRecordSample;
      if (!s) return;
      const setVal = (id, v) => {
        const el = document.getElementById(id);
        if (el) el.value = v;
      };
      setVal("trLoc", s.loc);
      setVal("trVuln", s.vuln);
      setVal("trTrigger", s.trigger);
      setVal("trCatastrophe", s.catastrophe);
      setVal("trInitBelief", s.initBelief);
      setVal("trInitSuds", s.initSuds);
      setVal("trSafety", s.safety);
      setVal("trEvidence", s.evidence);
      setVal("trPhysio", s.physio);
      setVal("trOutcome", s.outcome);
      setVal("trFinalBelief", s.finalBelief);
      setVal("trFinalSuds", s.finalSuds);
      const warnEl = document.getElementById("trEmotionWarn");
      if (warnEl) warnEl.hidden = true;
      syncTrSliders();
    }

    document.getElementById("trLoadSampleBtn")?.addEventListener("click", function () {
      const trDet = document.getElementById("trDisclosure");
      if (trDet) trDet.open = true;
      isSampleLoaded = true;
      populateSampleIntoForm();
      if (window.markModuleExplored) window.markModuleExplored("cr");
    });

    function buildTrPlaintext() {
      const g = (id) => document.getElementById(id)?.value.trim() || "-";
      if (isEn()) {
        return [
          "PANIC THOUGHT RECORD (POST-ATTACK EVIDENCE CHECK)",
          `1. Date, Time & Location: ${g("trLoc")}`,
          `2. Body State Before Surge: ${g("trVuln")}`,
          `3. Earliest Internal Body Sensation: ${g("trTrigger")}`,
          `4. Specific Catastrophe Prediction: ${g("trCatastrophe")}`,
          `5. Peak Scores: Catastrophe Belief ${g("trInitBelief")}% | Peak SUDS ${g("trInitSuds")}/10`,
          `6. Safety Behaviors Used (to drop next time): ${g("trSafety")}`,
          `7. Real Medical Facts & Past Survival Proof: ${g("trEvidence")}`,
          `8. Real Body Explanation (Harmless Biology): ${g("trPhysio")}`,
          `9. Actual Outcome After 15–20 Mins: ${g("trOutcome")}`,
          `10. Re-Rated Scores: Catastrophe Belief ${g("trFinalBelief")}% (Target <15%) | Current SUDS ${g("trFinalSuds")}/10`
        ].join("\n");
      }
      return [
        "REKOD SEMAKAN BUKTI PANIK (PANIC THOUGHT RECORD)",
        `1. Tarikh, Masa & Lokasi: ${g("trLoc")}`,
        `2. Keadaan Badan Sebelum Serangan: ${g("trVuln")}`,
        `3. Sensasi Badan Pertama Disedari: ${g("trTrigger")}`,
        `4. Sangkaan Buruk Spesifik: ${g("trCatastrophe")}`,
        `5. Skor Awal Kemuncak: Keyakinan Sangkaan ${g("trInitBelief")}% | SUDS ${g("trInitSuds")}/10`,
        `6. Tabiat Pelindung Palsu (Safety Behaviors): ${g("trSafety")}`,
        `7. Bukti Pemeriksaan Doktor & Rekod Selamat: ${g("trEvidence")}`,
        `8. Punca Sebenar Dalam Badan (Tidak Bahaya): ${g("trPhysio")}`,
        `9. Hasil Sebenar Selepas 15–20 Minit: ${g("trOutcome")}`,
        `10. Skor Penilaian Semula: Keyakinan Sangkaan ${g("trFinalBelief")}% (Sasaran <15%) | SUDS Semasa ${g("trFinalSuds")}/10`
      ].join("\n");
    }

    document.getElementById("trCopyBtn")?.addEventListener("click", function (ev) {
      navigator.clipboard?.writeText(buildTrPlaintext());
      flashButtonFeedback(ev.currentTarget, "✅ Teks Berjaya Disalin!", "✅ Plaintext Copied!");
      if (window.markModuleExplored) window.markModuleExplored("cr");
    });

    function renderSavedTrLogs() {
      const box = document.getElementById("trSavedHistoryList");
      if (!box) return;
      if (!savedRecords.length) {
        box.innerHTML = `<small style="color:var(--text-muted);">${
          isEn()
            ? "No saved Thought Records yet. Click 'View Filled Example' or save your own record above."
            : "Belum ada rekod disimpan. Klik 'Lihat Contoh Siap Isi' atau simpan rekod anda di atas."
        }</small>`;
        return;
      }
      box.innerHTML = savedRecords
        .slice(0, 5)
        .map(
          (r) => `<div class="stat-box" style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
            <div style="flex:1 1 200px;">
              <strong style="font-size:0.84rem;">${escapeHtml(r.loc)}</strong><br/>
              <small style="color:var(--text-muted);">${escapeHtml(r.catastrophe)}</small>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="pill-badge pill-safe">${escapeHtml(r.initBelief)}% → ${escapeHtml(r.finalBelief)}% • SUDS ${escapeHtml(r.initSuds)}→${escapeHtml(r.finalSuds)}</span>
              <button type="button" class="chip-btn" data-del-tr="${Number(r.id)}" title="${isEn() ? "Delete" : "Padam"}">✕</button>
            </div>
          </div>`
        )
        .join("");

      box.querySelectorAll("[data-del-tr]").forEach((b) => {
        b.addEventListener("click", function () {
          const id = Number(b.getAttribute("data-del-tr"));
          savedRecords = savedRecords.filter((x) => x.id !== id);
          safeSetStorage("paniclab_thought_records", JSON.stringify(savedRecords));
          renderSavedTrLogs();
        });
      });
    }

    document.getElementById("trSaveBtn")?.addEventListener("click", function (ev) {
      const loc = document.getElementById("trLoc")?.value.trim() || new Date().toLocaleString();
      const cat =
        document.getElementById("trCatastrophe")?.value.trim() ||
        (isEn() ? "False alarm disconfirmed" : "Sangkaan buruk dipatahkan");
      savedRecords.unshift({
        id: Date.now(),
        loc: loc,
        catastrophe: cat,
        initBelief: document.getElementById("trInitBelief")?.value || "85",
        finalBelief: document.getElementById("trFinalBelief")?.value || "10",
        initSuds: document.getElementById("trInitSuds")?.value || "8",
        finalSuds: document.getElementById("trFinalSuds")?.value || "2"
      });
      savedRecords = savedRecords.slice(0, 15);
      safeSetStorage("paniclab_thought_records", JSON.stringify(savedRecords));
      renderSavedTrLogs();
      flashButtonFeedback(ev.currentTarget, "✅ Rekod Disimpan!", "✅ Saved to History!");
      if (window.markModuleExplored) window.markModuleExplored("cr");
    });

    langCallbacks.push(function () {
      renderAllCopingWidgets();
      renderCrClusters();
      updateBaseRateCalc();
      if (isSampleLoaded) populateSampleIntoForm();
      else syncTrSliders();
      renderSavedTrLogs();
    });

    renderAllCopingWidgets();
    renderCrClusters();
    updateBaseRateCalc();
    syncTrSliders();
    renderSavedTrLogs();
  }

  // --------------------------------------------------------------------------
  // CHAPTER 5: CBT INHIBITORY LEARNING IE LAB (9 EXERCISES), FEAR LADDER & FORMATS
  // --------------------------------------------------------------------------
  function initCbtEngine() {
    let activeInteroIdx = 0;
    let interoTimer = null;
    let interoMode = "idle"; // 'trial' | 'rest' | 'idle'
    let interoSecLeft = 60;
    let currentRound = 1;
    let loggingStepId = null;

    function renderInteroLab() {
      const listEl = document.getElementById("interoPresetButtons");
      const cardEl = document.getElementById("interoActiveDetail");
      const mistakesEl = document.getElementById("ieMistakesGrid");
      if (!listEl || !cardEl) return;

      const d = window.getPanicData();
      const labs = d.interoceptiveLabs;
      const cur = labs[activeInteroIdx] || labs[0];
      if (interoMode === "idle") interoSecLeft = cur.duration;

      listEl.innerHTML = labs
        .map(
          (l, i) => `<button type="button" class="ie-card-btn ${i === activeInteroIdx ? "active" : ""}" data-intero-idx="${i}" aria-pressed="${i === activeInteroIdx ? "true" : "false"}">
            <div>
              <strong style="font-size:0.84rem; display:block; color:var(--text-primary);">${l.title}</strong>
              <span style="font-size:0.75rem; color:var(--text-muted);">${l.sensation}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:4px; width:100%; flex-wrap:wrap;">
              <span class="pill-badge pill-info">${l.duration}s</span>
              <small style="font-size:0.7rem; color:var(--accent-amber); font-weight:600;">${l.contra}</small>
            </div>
          </button>`
        )
        .join("");

      listEl.querySelectorAll("[data-intero-idx]").forEach((btn) => {
        btn.addEventListener("click", function () {
          clearInterval(interoTimer);
          interoTimer = null;
          interoMode = "idle";
          currentRound = 1;
          activeInteroIdx = parseInt(btn.getAttribute("data-intero-idx"), 10) || 0;
          renderInteroLab();
          if (window.markModuleExplored) window.markModuleExplored("cbt");
        });
      });

      cardEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
          <strong style="font-size:0.98rem;">🎯 ${cur.title}</strong>
          <div style="display:flex; gap:6px; align-items:center;">
            <span class="pill-badge pill-safe">${isEn() ? `Round ${currentRound} / 5` : `Pusingan ${currentRound} / 5`}</span>
            <span class="pill-badge ${interoMode === "rest" ? "pill-warn" : "pill-info"}" id="interoCountdownBadge">
              ${interoMode === "rest" ? (isEn() ? "Rest " : "Rehat ") : ""}${interoSecLeft}s
            </span>
          </div>
        </div>
        <p style="margin:8px 0; font-size:0.84rem; color:var(--text-secondary); display:grid; gap:4px;">
          <span><strong>${isEn() ? "Method:" : "Kaedah:"}</strong> ${cur.method}</span>
          <span style="color:var(--accent-amber);"><strong>⚠️ ${cur.contra}</strong></span>
          <span><strong>${isEn() ? "Prediction Tested:" : "Sangkaan Diuji:"}</strong> <em>"${cur.hypothesis}"</em></span>
          <span><strong>${isEn() ? "What Your Brain Learns:" : "Apa Otak Belajar:"}</strong> ${cur.disconfirms}</span>
        </p>
        <div class="alert-banner alert-warn" style="margin:8px 0; padding:9px 12px; font-size:0.8rem;">
          ${
            isEn()
              ? "🚫 <strong>Zero Safety Behaviors During Trial:</strong> Do NOT use soothing breathing, smartwatch checks, water, or fans during this exercise—observe sensations openly!"
              : "🚫 <strong>Tanpa Safety Behavior Semasa Berlatih:</strong> JANGAN guna nafas penenang, jangan tengok smartwatch, dan jangan buka kipas semasa sesi latihan ini!"
          }
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
          <button type="button" class="btn-primary" id="startInteroTimerBtn">
            ${
              interoMode === "trial"
                ? isEn() ? "⏹️ Stop Round" : "⏹️ Henti Pusingan"
                : isEn() ? `▶️ Start ${cur.duration}s Exercise` : `▶️ Mula Latihan ${cur.duration}s`
            }
          </button>
          <button type="button" class="btn-secondary" id="interoPlus15Btn">
            ${isEn() ? "🔥 +15s Courage Bonus" : "🔥 +15s Cabaran Berani"}
          </button>
          <button type="button" class="btn-secondary" id="interoRest60Btn">
            ${isEn() ? "⏳ 60s Rest (Next Round)" : "⏳ Rehat 60s (Ulang 3–5x)"}
          </button>
          <button type="button" class="chip-btn" id="sendToLadderBtn">
            ${isEn() ? "➕ Add to Ladder" : "➕ Masuk Tangga"}
          </button>
        </div>
      `;

      function runCountdown(seconds, modeName) {
        clearInterval(interoTimer);
        interoMode = modeName;
        interoSecLeft = seconds;
        renderInteroLab();
        interoTimer = setInterval(function () {
          interoSecLeft--;
          const b = document.getElementById("interoCountdownBadge");
          if (b) b.textContent = (interoMode === "rest" ? (isEn() ? "Rest " : "Rehat ") : "") + interoSecLeft + "s";
          if (interoSecLeft <= 0) {
            clearInterval(interoTimer);
            interoTimer = null;
            if (interoMode === "rest") currentRound = Math.min(5, currentRound + 1);
            interoMode = "idle";
            if (window.playPanicGentleTone) window.playPanicGentleTone(528, 360);
            renderInteroLab();
          }
        }, 1000);
      }

      document.getElementById("startInteroTimerBtn")?.addEventListener("click", function () {
        if (interoMode !== "idle") {
          clearInterval(interoTimer);
          interoTimer = null;
          interoMode = "idle";
          renderInteroLab();
          return;
        }
        runCountdown(cur.duration, "trial");
      });

      document.getElementById("interoPlus15Btn")?.addEventListener("click", function () {
        if (interoMode === "trial") {
          interoSecLeft += 15;
          const b = document.getElementById("interoCountdownBadge");
          if (b) b.textContent = interoSecLeft + "s";
        } else {
          runCountdown(cur.duration + 15, "trial");
        }
      });

      document.getElementById("interoRest60Btn")?.addEventListener("click", function () {
        runCountdown(60, "rest");
      });

      document.getElementById("sendToLadderBtn")?.addEventListener("click", function (ev) {
        const btn = ev.currentTarget;
        if (!ladderSteps.some((x) => x.interoId === cur.id || x.task === cur.title)) {
          ladderSteps.push({
            id: Date.now(),
            interoId: cur.id,
            task: cur.title,
            safety: "",
            baseSuds: cur.sudsDefault || 60,
            done: false,
            postSuds: 20
          });
          saveLadder();
          renderLadder();
        }
        flashButtonFeedback(
          btn,
          "✅ Ditambah ke Tangga!",
          "✅ Added to Ladder!",
          function () {
            btn.textContent = isEn() ? "➕ Add to Ladder" : "➕ Masuk Tangga";
          },
          1800
        );
        if (window.markModuleExplored) window.markModuleExplored("cbt");
      });

      if (mistakesEl && d.ieMistakes) {
        mistakesEl.innerHTML = d.ieMistakes
          .map(
            (m) => `<div class="myth-card">
              <strong style="font-size:0.86rem; color:var(--accent-amber);">⚠️ ${m.title}</strong>
              <div style="font-size:0.81rem; color:var(--text-secondary);">${m.desc}</div>
            </div>`
          )
          .join("");
      }
    }

    // Graded Fear Ladder State
    const defaultSeed = [
      { id: 1, isDefault: true, baseSuds: 45, done: true, postSuds: 15 },
      { id: 2, isDefault: true, baseSuds: 70, done: false, postSuds: 30 }
    ];
    const parsedLadder = safeParseJSON(safeGetStorage("paniclab_ladder_v2", ""), defaultSeed);
    let ladderSteps = Array.isArray(parsedLadder) && parsedLadder.length ? parsedLadder : defaultSeed;

    function saveLadder() {
      safeSetStorage("paniclab_ladder_v2", JSON.stringify(ladderSteps));
    }

    function renderLadder() {
      const tbody = document.getElementById("ladderTableBody");
      if (!tbody) return;
      const d = window.getPanicData();
      const defs = d.defaultLadderSteps || [];
      const labs = d.interoceptiveLabs || [];
      const sorted = ladderSteps.slice().sort((a, b) => a.baseSuds - b.baseSuds);

      tbody.innerHTML = sorted
        .map((st) => {
          const defMatch = st.isDefault ? defs.find((x) => x.id === st.id) : null;
          const interoMatch = st.interoId ? labs.find((x) => x.id === st.interoId) : null;

          const taskHtml = defMatch
            ? defMatch.task
            : interoMatch
              ? interoMatch.title
              : escapeHtml(st.task);
          const safetyHtml = defMatch
            ? defMatch.safety
            : interoMatch
              ? isEn()
                ? "Zero soothing breathing / no smartwatch check"
                : "Tanpa nafas penenang / tanpa semak smartwatch"
              : escapeHtml(st.safety);

          let statusCell = "";
          if (loggingStepId === st.id) {
            statusCell = `
              <div style="display:flex; gap:4px; align-items:center; flex-wrap:wrap;">
                <input type="number" class="form-input" data-post-suds-input="${st.id}" min="0" max="100" value="${st.postSuds ?? 20}" style="width:64px; padding:4px 6px; font-size:0.78rem;" title="Post-practice SUDS (0–100)" />
                <button type="button" class="chip-btn active" data-save-post-suds="${st.id}" style="padding:4px 8px;">✓</button>
              </div>
            `;
          } else if (st.done) {
            const grad = Number(st.postSuds) <= 20;
            statusCell = `<button type="button" class="pill-badge ${grad ? "pill-safe" : "pill-info"}" data-edit-suds="${st.id}" style="cursor:pointer;" title="${isEn() ? "Click to update post-practice SUDS" : "Klik untuk kemas kini skor SUDS selepas latihan"}">
              ${grad ? (isEn() ? `🎓 Graduated (${st.postSuds}/100)` : `🎓 Lulus (${st.postSuds}/100)`) : `✓ ${st.postSuds}/100`}
            </button>`;
          } else {
            statusCell = `<button type="button" class="chip-btn" data-complete-step="${st.id}">${isEn() ? "✓ Log Outcome" : "✓ Tandakan Selesai"}</button>`;
          }

          return `<tr>
            <td>
              <strong style="color:var(--text-primary);">${taskHtml}</strong><br/>
              <small style="color:var(--text-muted);">${isEn() ? "Drop safety behavior:" : "Tinggalkan Safety Behavior:"} ${safetyHtml}</small>
            </td>
            <td><span class="pill-badge pill-warn">${Number(st.baseSuds)}/100</span></td>
            <td>${statusCell}</td>
            <td>
              <button type="button" class="chip-btn" data-delete-step="${st.id}" title="${isEn() ? "Remove" : "Padam"}">✕</button>
            </td>
          </tr>`;
        })
        .join("");

      tbody.querySelectorAll("[data-complete-step], [data-edit-suds]").forEach((btn) => {
        btn.addEventListener("click", function () {
          loggingStepId = Number(btn.getAttribute("data-complete-step") || btn.getAttribute("data-edit-suds"));
          renderLadder();
        });
      });

      tbody.querySelectorAll("[data-save-post-suds]").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = Number(btn.getAttribute("data-save-post-suds"));
          const inp = tbody.querySelector(`[data-post-suds-input="${id}"]`);
          const found = ladderSteps.find((x) => x.id === id);
          if (found) {
            const v = Math.max(0, Math.min(100, parseInt(inp?.value || "20", 10) || 0));
            found.done = true;
            found.postSuds = v;
            loggingStepId = null;
            saveLadder();
            renderLadder();
          }
        });
      });

      tbody.querySelectorAll("[data-delete-step]").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = Number(btn.getAttribute("data-delete-step"));
          ladderSteps = ladderSteps.filter((x) => x.id !== id);
          saveLadder();
          renderLadder();
        });
      });
    }

    document.getElementById("addLadderStepBtn")?.addEventListener("click", function () {
      const taskEl = document.getElementById("ladderTaskInput");
      const safEl = document.getElementById("ladderSafetyInput");
      const sudsEl = document.getElementById("ladderSudsInput");
      const task = taskEl?.value.trim();
      if (!task) return;
      ladderSteps.push({
        id: Date.now(),
        task: task,
        safety: safEl?.value.trim() || (isEn() ? "Stay until wave drops" : "Kekal hingga debaran turun"),
        baseSuds: Math.max(5, Math.min(100, parseInt(sudsEl?.value || "60", 10) || 60)),
        done: false,
        postSuds: 20
      });
      if (taskEl) taskEl.value = "";
      if (safEl) safEl.value = "";
      saveLadder();
      renderLadder();
      if (window.markModuleExplored) window.markModuleExplored("cbt");
    });

    function renderCbtFormats() {
      const grid = document.getElementById("cbtFormatsGrid");
      if (!grid) return;
      const formats = window.getPanicData().cbtFormats;
      grid.innerHTML = formats
        .map(
          (f) => `<div class="myth-card">
            <div style="display:flex; justify-content:space-between; gap:6px; flex-wrap:wrap;">
              <span class="pill-badge ${f.badgeClass}">${f.badge}</span>
              <small style="font-weight:700; color:var(--accent-teal);">${f.stat}</small>
            </div>
            <strong style="font-size:0.92rem;">${f.name}</strong>
            <div style="font-size:0.83rem; color:var(--text-secondary);">${f.desc}</div>
          </div>`
        )
        .join("");
    }

    langCallbacks.push(function () {
      renderInteroLab();
      renderLadder();
      renderCbtFormats();
    });

    renderInteroLab();
    renderLadder();
    renderCbtFormats();
  }

  // --------------------------------------------------------------------------
  // CHAPTER 6: STEPPED PHARMACOTHERAPY NAVIGATOR
  // --------------------------------------------------------------------------
  function initPharmacotherapy() {
    let activeScenId = "ssri_first";
    let tierFilter = "all";

    function renderScenarios() {
      const btnWrap = document.getElementById("pharmScenarioBtns");
      const detail = document.getElementById("pharmScenarioDetail");
      if (!btnWrap || !detail) return;

      const list = window.getPanicData().pharmScenarios;
      btnWrap.innerHTML = list
        .map(
          (s) => `<button type="button" class="hotspot-btn ${s.id === activeScenId ? "active" : ""}" data-pharm-scen="${s.id}" aria-pressed="${s.id === activeScenId ? "true" : "false"}">
            <div>
              <span class="pill-badge ${s.badgeClass}" style="margin-bottom:4px;">${s.badge}</span>
              <strong style="display:block; font-size:0.88rem;">${s.title}</strong>
            </div>
          </button>`
        )
        .join("");

      btnWrap.querySelectorAll("[data-pharm-scen]").forEach((b) => {
        b.addEventListener("click", function () {
          activeScenId = b.getAttribute("data-pharm-scen");
          renderScenarios();
          if (window.markModuleExplored) window.markModuleExplored("pharm");
        });
      });

      const cur = list.find((x) => x.id === activeScenId) || list[0];
      detail.innerHTML = `
        <span class="pill-badge ${cur.badgeClass}">${cur.badge}</span>
        <h3 style="margin:8px 0;">${cur.headline}</h3>
        <p style="margin:0 0 12px; font-size:0.89rem; color:var(--text-secondary);">${cur.body}</p>
        <div class="alert-banner alert-warn">
          <strong>🛡️ ${isEn() ? "Important Safety Guardrail:" : "Peringatan Keselamatan Penting:"}</strong> ${cur.guardrail}
        </div>
      `;
    }

    function renderPharmTable() {
      const tbody = document.getElementById("pharmMatrixBody");
      if (!tbody) return;
      const rows = window.getPanicData().pharmMatrix.filter(
        (r) => tierFilter === "all" || r.tier === tierFilter
      );
      const c1 = isEn() ? "Tier" : "Tahap";
      const c2 = isEn() ? "Class & Examples" : "Kelas & Contoh";
      const c3 = isEn() ? "Clinical Evidence" : "Bukti Kajian";
      const c4 = isEn() ? "Safety Notes" : "Nota Keselamatan";

      tbody.innerHTML = rows
        .map((r) => {
          const cls =
            r.tier === "First-line"
              ? "pill-safe"
              : r.tier === "Bridge"
                ? "pill-warn"
                : r.tier === "Discouraged"
                  ? "pill-danger"
                  : "pill-info";
          return `<tr>
            <td data-col="${c1}"><span class="pill-badge ${cls}">${r.tierLabel}</span></td>
            <td data-col="${c2}"><strong style="color:var(--text-primary);">${r.agents}</strong></td>
            <td data-col="${c3}">${r.evidence}</td>
            <td data-col="${c4}">${r.notes}</td>
          </tr>`;
        })
        .join("");
    }

    document.querySelectorAll("[data-pharm-filter]").forEach((btn) => {
      btn.addEventListener("click", function () {
        tierFilter = btn.getAttribute("data-pharm-filter") || "all";
        document.querySelectorAll("[data-pharm-filter]").forEach((b) => {
          const act = b.getAttribute("data-pharm-filter") === tierFilter;
          b.classList.toggle("active", act);
          b.setAttribute("aria-pressed", act ? "true" : "false");
        });
        renderPharmTable();
      });
    });

    langCallbacks.push(function () {
      renderScenarios();
      renderPharmTable();
    });

    renderScenarios();
    renderPharmTable();
  }

  // --------------------------------------------------------------------------
  // CHAPTER 7 & 8: FAMILY GUIDE, 3 VISUAL ANALOGIES & 7-SCENARIO CLINICAL QUIZ
  // --------------------------------------------------------------------------
  function initAnalogiesAndQuiz() {
    const answers = {};

    function renderAnalogiesAndFamily() {
      const grid = document.getElementById("analogiesGrid");
      if (grid) {
        const list = window.getPanicData().analogies;
        grid.innerHTML = list
          .map(
            (a) => `<article class="panel-card">
              <div style="font-size:1.85rem; margin-bottom:6px;">${a.icon}</div>
              <div style="font-size:0.74rem; font-weight:700; color:var(--accent-teal); text-transform:uppercase; margin-bottom:4px;">${a.tag}</div>
              <h3 style="margin:0 0 8px;">${a.title}</h3>
              <p class="layman-only" style="margin:0; font-size:0.88rem; color:var(--text-secondary);">${a.layman}</p>
              <p class="family-only" style="margin:0; font-size:0.88rem; color:var(--text-secondary);">${a.family || a.layman}</p>
              <p class="clinical-only" style="margin:0; font-size:0.88rem; color:var(--text-secondary);">${a.clinical}</p>
            </article>`
          )
          .join("");
      }

      const famGrid = document.getElementById("familyGuideGrid");
      if (famGrid && window.getPanicData().familyGuide) {
        famGrid.innerHTML = window.getPanicData().familyGuide
          .map(
            (f) => `<article class="panel-card">
              <div style="font-size:1.75rem; margin-bottom:6px;">${f.icon}</div>
              <span class="pill-badge pill-info" style="margin-bottom:6px;">${f.tag}</span>
              <h3 style="margin:4px 0 8px;">${f.title}</h3>
              <p style="margin:0; font-size:0.87rem; color:var(--text-secondary);">${f.body}</p>
            </article>`
          )
          .join("");
      }
    }

    function renderQuiz() {
      const wrap = document.getElementById("clinicalQuizContainer");
      const scoreEl = document.getElementById("quizScoreDisplay");
      const progEl = document.getElementById("quizProgressFill");
      if (!wrap) return;

      const questions = window.getPanicData().quizScenarios;
      let correctCount = 0;
      let answeredCount = 0;
      questions.forEach((q) => {
        if (answers[q.id] !== undefined) {
          answeredCount++;
          if (answers[q.id] === q.correctIndex) correctCount++;
        }
      });

      if (scoreEl) {
        scoreEl.textContent = isEn()
          ? `Answered ${answeredCount}/${questions.length} • Score: ${correctCount}/${questions.length}`
          : `Dijawab ${answeredCount}/${questions.length} • Skor: ${correctCount}/${questions.length}`;
      }
      if (progEl) {
        progEl.style.width = Math.round((answeredCount / questions.length) * 100) + "%";
      }

      wrap.innerHTML = questions
        .map((q) => {
          const chosen = answers[q.id];
          const answered = chosen !== undefined;
          const isRight = chosen === q.correctIndex;
          const optsHtml = q.options
            .map((opt, idx) => {
              let cls = "";
              if (answered) {
                if (idx === q.correctIndex) cls = "correct";
                else if (idx === chosen) cls = "wrong";
              }
              return `<button type="button" class="quiz-opt-btn ${cls}" data-qid="${q.id}" data-opt="${idx}" ${answered ? "disabled" : ""}>
                ${opt}
              </button>`;
            })
            .join("");

          const prefix = isRight
            ? isEn() ? "<strong>✅ Correct — </strong>" : "<strong>✅ Tepat — </strong>"
            : isEn() ? "<strong>💡 Key Takeaway — </strong>" : "<strong>💡 Info Penting — </strong>";

          return `<div class="quiz-card">
            <strong style="font-size:0.93rem; display:block;">${q.scenario}</strong>
            <div class="quiz-opt-list">${optsHtml}</div>
            ${
              answered
                ? `<div class="alert-banner ${isRight ? "alert-safe" : "alert-warn"}" style="margin-top:10px;">
                    ${prefix}${q.explanation}
                  </div>`
                : ""
            }
          </div>`;
        })
        .join("");

      wrap.querySelectorAll("[data-qid]").forEach((btn) => {
        btn.addEventListener("click", function () {
          const qid = btn.getAttribute("data-qid");
          const opt = parseInt(btn.getAttribute("data-opt"), 10);
          answers[qid] = opt;
          renderQuiz();
          if (window.markModuleExplored) window.markModuleExplored("quiz");
        });
      });
    }

    document.getElementById("quizResetBtn")?.addEventListener("click", function () {
      Object.keys(answers).forEach((k) => delete answers[k]);
      renderQuiz();
    });

    langCallbacks.push(function () {
      renderAnalogiesAndFamily();
      renderQuiz();
    });

    renderAnalogiesAndFamily();
    renderQuiz();
  }

  // --------------------------------------------------------------------------
  // BOOTSTRAP
  // --------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    initTopControls();
    renderSpectrumSection();
    langCallbacks.push(renderSpectrumSection);
    initQuickSosModal();
    initDsmCheckerAndDiffTable();
    initCaffeineAndMyths();
    initCopingCardsAndThoughtRecord();
    initCbtEngine();
    initPharmacotherapy();
    initAnalogiesAndQuiz();
    updateMasteryBar();
    window.setAppLanguage(window.currentLang || "ms");
  });
})();
