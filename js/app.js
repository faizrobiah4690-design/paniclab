// ============================================================================
// PanicLab — Pengawal Aplikasi Utama, SOS Modal, Triaj DSM-5-TR, Kafein, CBT & Kuiz
// Menyokong Dwibahasa (BM | EN) & Dwi-Mod (Mudah Faham | Mod Klinikal)
// ============================================================================

(function () {
  "use strict";

  const langCallbacks = [];

  function isEn() {
    return window.currentLang === "en";
  }

  // Mastery Progress Tracking
  const exploredSet = new Set(
    JSON.parse(localStorage.getItem("paniclab_explored") || '["wave"]')
  );

  window.markModuleExplored = function (modKey) {
    exploredSet.add(modKey);
    try {
      localStorage.setItem("paniclab_explored", JSON.stringify(Array.from(exploredSet)));
    } catch (_) {}
    updateMasteryBar();
  };

  function updateMasteryBar() {
    const total = 8; // sos, wave, neuro, dsm, caffeine, cbt, pharm, quiz
    const pct = Math.min(100, Math.round((exploredSet.size / total) * 100));
    const fill = document.getElementById("masteryProgressFill");
    const pctLbl = document.getElementById("masteryProgressPct");
    if (fill) fill.style.width = pct + "%";
    if (pctLbl) pctLbl.textContent = pct + "%";
  }

  // --------------------------------------------------------------------------
  // BILINGUAL (BM | EN) & AUDIENCE MODE CONTROLLER
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
      el.innerHTML = en ? el.getAttribute("data-en") : el.dataset.ms;
    });

    document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
      if (el.dataset.msPlaceholder === undefined) {
        el.dataset.msPlaceholder = el.getAttribute("placeholder") || "";
      }
      el.setAttribute("placeholder", en ? el.getAttribute("data-en-placeholder") : el.dataset.msPlaceholder);
    });

    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang-switch") === (en ? "en" : "ms"));
    });
  }

  window.setAppLanguage = function (lang) {
    const target = lang === "en" ? "en" : "ms";
    try {
      localStorage.setItem("paniclab_lang", target);
    } catch (_) {}
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
    ["calmModeToggleBtn", "modalCalmModeBtn"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.classList.toggle("active", isCalm);
        btn.textContent = isCalm
          ? en ? "🧘 Calm Mode: ON" : "🧘 Mod Tenang: AKTIF"
          : en ? "🧘 Pause Animations" : "🧘 Jeda Animasi";
      }
    });
  }

  function initTopControls() {
    // Audience mode
    const savedAudience = localStorage.getItem("paniclab_audience") || "layman";
    function setAudience(mode) {
      const m = mode === "clinical" ? "clinical" : "layman";
      document.body.classList.toggle("mode-clinical", m === "clinical");
      document.body.classList.toggle("mode-layman", m !== "clinical");
      document.querySelectorAll("[data-audience-mode]").forEach((b) => {
        b.classList.toggle("active", b.getAttribute("data-audience-mode") === m);
      });
      try {
        localStorage.setItem("paniclab_audience", m);
      } catch (_) {}
    }
    document.querySelectorAll("[data-audience-mode]").forEach((btn) => {
      btn.addEventListener("click", () => setAudience(btn.getAttribute("data-audience-mode")));
    });
    setAudience(savedAudience);

    // Language buttons
    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      btn.addEventListener("click", () => window.setAppLanguage(btn.getAttribute("data-lang-switch")));
    });

    // Theme button
    if (localStorage.getItem("paniclab_theme") === "light") {
      document.body.classList.add("light-theme");
    }
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("light-theme");
        try {
          localStorage.setItem(
            "paniclab_theme",
            document.body.classList.contains("light-theme") ? "light" : "dark"
          );
        } catch (_) {}
        syncThemeAndCalmLabels();
        if (window.refreshPanicSimulators) window.refreshPanicSimulators();
      });
    }

    // Calm motion buttons
    ["calmModeToggleBtn", "modalCalmModeBtn"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", function () {
          window.__panicCalmMode = !window.__panicCalmMode;
          syncThemeAndCalmLabels();
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // SOS QUICK-HELP MODAL, 4-2-6 BREATHER, 5-4-3-2-1, DIVE REFLEX & DOCTOR NOTE
  // --------------------------------------------------------------------------
  function initQuickSosModal() {
    const modal = document.getElementById("quickHelpModal");
    if (!modal) return;

    let breathTimer = null;
    let breathRunning = false;
    let phaseIdx = 0;
    let secLeft = 4;
    let cyclesDone = 0;

    const PHASES = [
      { msLabel: "Tarik Nafas Hidung (Perut Kembang)", enLabel: "Inhale Gently Through Nose", secs: 4, scale: 1.24, freq: 528 },
      { msLabel: "Tahan Tenang", enLabel: "Hold Softly", secs: 2, scale: 1.24, freq: 440 },
      { msLabel: "Hembus Perlahan Ikut Mulut", enLabel: "Slow Extended Exhale", secs: 6, scale: 0.76, freq: 396 }
    ];

    function updateBreatherDisplay() {
      const orb = document.getElementById("sosBreathingOrb");
      const phaseTxt = document.getElementById("sosBreathingPhase");
      const countTxt = document.getElementById("sosBreathingSec");
      const cycleTxt = document.getElementById("sosCycleCounter");
      const toggleBtn = document.getElementById("sosBreathToggleBtn");
      const audioBtn = document.getElementById("sosAudioToggleBtn");
      const p = PHASES[phaseIdx];

      if (phaseTxt) {
        phaseTxt.textContent = breathRunning
          ? isEn() ? p.enLabel : p.msLabel
          : isEn() ? "Ready: 4s Inhale • 2s Hold • 6s Exhale" : "Sedia: 4s Tarik • 2s Tahan • 6s Hembus";
      }
      if (countTxt) countTxt.textContent = secLeft + "s";
      if (orb) {
        orb.style.transitionDuration = breathRunning && !window.__panicCalmMode ? "0.95s" : "0.2s";
        orb.style.transform = breathRunning ? `scale(${p.scale})` : "scale(0.85)";
      }
      if (cycleTxt) {
        cycleTxt.textContent = isEn()
          ? `Completed calm cycles: ${cyclesDone} (Target: 6–10 cycles)`
          : `Kitaran nafas tenang selesai: ${cyclesDone} (Sasaran: 6–10 kitaran)`;
      }
      if (toggleBtn) {
        toggleBtn.textContent = breathRunning
          ? isEn() ? "⏸️ Pause Breather" : "⏸️ Jeda Kiraan Nafas"
          : isEn() ? "▶️ Start 4-2-6 Breather" : "▶️ Mula Panduan Nafas 4-2-6";
      }
      if (audioBtn) {
        audioBtn.textContent = window.__panicAudioEnabled
          ? isEn() ? "🔔 Chime: ON" : "🔔 Nada Lembut: AKTIF"
          : isEn() ? "🔕 Chime: OFF" : "🔕 Nada Lembut: MATI";
      }
    }

    function startBreather() {
      if (breathRunning) return;
      breathRunning = true;
      updateBreatherDisplay();
      if (window.playPanicGentleTone) window.playPanicGentleTone(PHASES[phaseIdx].freq, 260);
      clearInterval(breathTimer);
      breathTimer = setInterval(function () {
        secLeft--;
        if (secLeft <= 0) {
          phaseIdx = (phaseIdx + 1) % PHASES.length;
          if (phaseIdx === 0) cyclesDone++;
          secLeft = PHASES[phaseIdx].secs;
          if (window.playPanicGentleTone) window.playPanicGentleTone(PHASES[phaseIdx].freq, 280);
        }
        updateBreatherDisplay();
      }, 1000);
    }

    function stopBreather() {
      breathRunning = false;
      clearInterval(breathTimer);
      updateBreatherDisplay();
    }

    const toggleBtn = document.getElementById("sosBreathToggleBtn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        if (breathRunning) stopBreather();
        else startBreather();
      });
    }

    const audioBtn = document.getElementById("sosAudioToggleBtn");
    if (audioBtn) {
      audioBtn.addEventListener("click", function () {
        window.__panicAudioEnabled = !window.__panicAudioEnabled;
        if (window.__panicAudioEnabled && window.playPanicGentleTone) {
          window.playPanicGentleTone(528, 220);
        }
        updateBreatherDisplay();
      });
    }

    // Tab switching
    function openSosTab(tabKey) {
      document.querySelectorAll("[data-qh-tab]").forEach((b) => {
        b.classList.toggle("active", b.getAttribute("data-qh-tab") === tabKey);
      });
      document.querySelectorAll("[data-qh-pane]").forEach((pane) => {
        pane.hidden = pane.getAttribute("data-qh-pane") !== tabKey;
      });
    }

    document.querySelectorAll("[data-open-quickhelp]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetTab = btn.getAttribute("data-open-quickhelp") || "step1";
        modal.hidden = false;
        openSosTab(targetTab);
        if (targetTab === "step1" && !breathRunning) startBreather();
        if (window.markModuleExplored) window.markModuleExplored("sos");
      });
    });

    document.querySelectorAll("[data-close-quickhelp]").forEach((btn) => {
      btn.addEventListener("click", function () {
        modal.hidden = true;
        stopBreather();
      });
    });

    modal.addEventListener("click", function (ev) {
      if (ev.target === modal) {
        modal.hidden = true;
        stopBreather();
      }
    });

    document.querySelectorAll("[data-qh-tab]").forEach((btn) => {
      btn.addEventListener("click", () => openSosTab(btn.getAttribute("data-qh-tab")));
    });

    document.querySelectorAll("[data-qh-goto]").forEach((btn) => {
      btn.addEventListener("click", () => openSosTab(btn.getAttribute("data-qh-goto")));
    });

    // 5-4-3-2-1 Interactive Sensory Cards
    const groundingState = { g5: false, g4: false, g3: false, g2: false, g1: false };
    function renderGroundingCards() {
      const wrap = document.getElementById("sosGroundingGrid");
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
          (it) => `<button type="button" class="grounding-card ${groundingState[it.id] ? "done" : ""}" data-ground-id="${it.id}">
            <div class="grounding-num">${groundingState[it.id] ? "✓" : it.n}</div>
            <strong style="font-size:0.83rem; display:block;">${it.label}</strong>
            <span style="font-size:0.74rem; color:var(--text-muted);">${it.sub}</span>
          </button>`
        )
        .join("");

      wrap.querySelectorAll("[data-ground-id]").forEach((b) => {
        b.addEventListener("click", function () {
          const k = b.getAttribute("data-ground-id");
          groundingState[k] = !groundingState[k];
          renderGroundingCards();
        });
      });
    }

    // Mammalian Dive Reflex 20-second countdown
    let diveTimer = null;
    let diveSec = 20;
    const diveBtn = document.getElementById("diveReflexBtn");
    function updateDiveBtn() {
      if (!diveBtn) return;
      if (!diveTimer) {
        diveBtn.textContent = isEn()
          ? "🧊 Start 20s Cold-Pack Dive Reflex Timer"
          : "🧊 Mula Pemasa 20s Pek Sejuk (Dive Reflex)";
      } else {
        diveBtn.textContent = isEn()
          ? `🧊 Hold Cool Pack on Cheeks/Eyes: ${diveSec}s...`
          : `🧊 Tekap Pek Sejuk Di Pipi/Mata: ${diveSec}s...`;
      }
    }
    if (diveBtn) {
      diveBtn.addEventListener("click", function () {
        if (diveTimer) {
          clearInterval(diveTimer);
          diveTimer = null;
          diveSec = 20;
          updateDiveBtn();
          return;
        }
        diveSec = 20;
        diveTimer = setInterval(function () {
          diveSec--;
          if (diveSec <= 0) {
            clearInterval(diveTimer);
            diveTimer = null;
            diveSec = 20;
            if (window.playPanicGentleTone) window.playPanicGentleTone(528, 350);
          }
          updateDiveBtn();
        }, 1000);
        updateDiveBtn();
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
          ? "✅ <strong>No Immediate Red Flags Ticked:</strong> If a doctor has previously confirmed panic attacks, stay seated safely, avoid fleeing, and use the <strong>4-2-6 Breather</strong>—this adrenaline surge will peak and settle within 15–20 minutes."
          : "✅ <strong>Tiada Tanda Merah Ditandakan:</strong> Jika doktor pernah mengesahkan simptom panik sebelum ini, duduk tenang, elakkan melarikan diri, dan gunakan <strong>Panduan Nafas 4-2-6</strong>—gelombang adrenalin ini pasti surut dalam 15–20 minit.";
      } else {
        box.className = "alert-banner alert-danger";
        box.innerHTML = isEn()
          ? `🚨 <strong>MEDICAL RED FLAG DETECTED (${checked.length} selected):</strong> Do NOT assume this is just panic! Call <strong>999</strong> or go to the nearest Emergency Department immediately for an <strong>ECG, vital signs, and medical rule-out</strong>. Never breathe into a paper bag.`
          : `🚨 <strong>TANDA AMARAN MERAH DIKESAN (${checked.length} ditanda):</strong> JANGAN anggap ini panik semata-mata! Hubungi <strong>999</strong> atau ke Jabatan Kecemasan Hospital segera untuk saringan <strong>ECG & pemeriksaan doktor</strong>. Jangan guna beg kertas.`;
      }
    }

    document.querySelectorAll(".sos-redflag-cb").forEach((cb) => {
      cb.addEventListener("change", function () {
        cb.closest(".check-tile").classList.toggle("checked", cb.checked);
        evaluateSosRedFlags();
      });
    });

    // Doctor / MENTARI Visit Summary Note Generator
    function generateDoctorNote() {
      const freq = document.getElementById("docFreq")?.selectedOptions[0]?.text || "";
      const peak = document.getElementById("docPeak")?.selectedOptions[0]?.text || "";
      const trig = document.getElementById("docTrigger")?.selectedOptions[0]?.text || "";
      const avoid = document.getElementById("docAvoid")?.selectedOptions[0]?.text || "";
      const meds = document.getElementById("docMeds")?.value.trim() || (isEn() ? "None reported" : "Tiada dinyatakan");
      const preview = document.getElementById("docNotePreview");
      if (!preview) return;

      const dsmChecked = Array.from(document.querySelectorAll(".dsm-sym-cb:checked")).length;

      if (isEn()) {
        preview.value = [
          "=== PATIENT VISIT SUMMARY (PANIC / ANXIETY EVALUATION) ===",
          `Date Generated: ${new Date().toLocaleDateString("en-GB")}`,
          `1. Episode Frequency: ${freq}`,
          `2. Time-to-Peak & Duration: ${peak}`,
          `3. Trigger Context: ${trig}`,
          `4. DSM-5-TR Symptoms Checked in Playbook: ${dsmChecked} / 13 symptoms`,
          `5. 1-Month Worry / Avoidance Impact: ${avoid}`,
          `6. Caffeine, Meds & Medical History: ${meds}`,
          "",
          "Questions for Doctor:",
          "- Could we check baseline ECG, thyroid (TSH), and fasting glucose to rule out medical mimics?",
          "- Would Panic-Focused CBT, guided self-help, or a first-line SSRI be appropriate for me?"
        ].join("\n");
      } else {
        preview.value = [
          "=== RINGKASAN SIMPTOM PESAKIT UNTUK DOKTOR / KLINIK / MENTARI ===",
          `Tarikh Dijana: ${new Date().toLocaleDateString("ms-MY")}`,
          `1. Kekerapan Episod: ${freq}`,
          `2. Masa Memuncak & Tempoh: ${peak}`,
          `3. Pencetus Situasi: ${trig}`,
          `4. Bilangan Simptom DSM-5-TR Ditanda: ${dsmChecked} / 13 simptom`,
          `5. Kesan Kebimbangan ≥1 Bulan / Pengelakan: ${avoid}`,
          `6. Kafein, Ubat Semasa & Sejarah Kesihatan: ${meds}`,
          "",
          "Soalan Untuk Doktor:",
          "- Bolehkah kita buat saringan asas (ECG, fungsi tiroid TSH, glukosa darah) untuk menolak punca organik?",
          "- Adakah rujukan terapi CBT atau rawatan barisan pertama sesuai untuk keadaan saya?"
        ].join("\n");
      }
    }

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
        const orig = copyBtn.textContent;
        copyBtn.textContent = isEn() ? "✅ Copied to Clipboard!" : "✅ Berjaya Disalin!";
        setTimeout(() => {
          copyBtn.textContent = orig;
        }, 2400);
      });
    }

    const printBtn = document.getElementById("printDocNoteBtn");
    if (printBtn) {
      printBtn.addEventListener("click", () => window.print());
    }

    langCallbacks.push(function () {
      updateBreatherDisplay();
      renderGroundingCards();
      updateDiveBtn();
      evaluateSosRedFlags();
      generateDoctorNote();
    });

    updateBreatherDisplay();
    renderGroundingCards();
    updateDiveBtn();
    evaluateSosRedFlags();
    setTimeout(generateDoctorNote, 50);
  }

  // --------------------------------------------------------------------------
  // CHAPTER 1: 3-WAY SPECTRUM CARDS (PANIC ATTACK vs DISORDER vs AGORAPHOBIA)
  // --------------------------------------------------------------------------
  function renderSpectrumSection() {
    const container = document.getElementById("spectrumCardsGrid");
    if (!container) return;
    const cards = window.getPanicData().spectrumCards;
    container.innerHTML = cards
      .map(
        (c) => `<article class="panel-card" style="display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
              <span class="pill-badge ${c.badgeClass}">${c.badge}</span>
            </div>
            <h3 style="margin:0 0 6px;">${c.title}</h3>
            <div class="layman-only" style="font-size:0.88rem; color:var(--text-secondary);">${c.layman}</div>
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
  // CHAPTER 2: DSM-5-TR 13-SYMPTOM TRIAGE & DIFFERENTIAL MATRIX
  // --------------------------------------------------------------------------
  const selectedDsmIds = new Set(["s1", "s4", "s8", "s10"]);

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
          cb.closest(".check-tile").classList.toggle("checked", cb.checked);
          evaluateDsmPattern();
          if (window.markModuleExplored) window.markModuleExplored("dsm");
        });
      });
    }

    function evaluateDsmPattern() {
      const count = selectedDsmIds.size;
      const unexp = document.getElementById("dsmUnexpectedCb")?.checked;
      const oneMonth = document.getElementById("dsmOneMonthCb")?.checked;
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
          ? `🩺 <strong>Medical Exclusion Priority (Criterion C):</strong> Because first onset >45 yrs, true fainting, or cardiac/thyroid/substance factors are ticked, a doctor MUST run medical rule-out tests (ECG, TSH thyroid panel, blood glucose) before attributing symptoms to panic.`
          : `🩺 <strong>Utamakan Saringan Perubatan Doktor (Kriteria C):</strong> Oleh kerana faktor usia >45 tahun, pitam sebenar, atau disyaki tiroid/jantung/kafein ditandakan, doktor WAJIB melakukan ujian ECG, fungsi tiroid, dan glukosa darah terlebih dahulu.`;
      } else if (count < 4) {
        verdict.className = "alert-banner alert-warn";
        verdict.innerHTML = isEn()
          ? `ℹ️ <strong>Limited-Symptom Pattern (${count}/13 — Below 4-Symptom Threshold):</strong> DSM-5-TR defines a full panic attack as ≥4 of 13 symptoms peaking within minutes. Fewer than 4 symptoms is termed a <em>limited-symptom attack</em>.`
          : `ℹ️ <strong>Corak Simptom Terhad (${count}/13 — Bawah Ambang 4 Simptom):</strong> Kriteria rasmi DSM-5-TR memerlukan sekurang-kurangnya 4 daripada 13 simptom memuncak dalam beberapa minit. Kurang daripada 4 dipanggil <em>limited-symptom attack</em>.`;
      } else if (unexp && oneMonth) {
        verdict.className = "alert-banner alert-safe";
        verdict.innerHTML = isEn()
          ? `📌 <strong>Educational Match — Consistent with Panic Disorder Criteria (${count}/13 symptoms + ≥1 Month Impact):</strong> Recurrent unexpected surges plus ≥1 month of worry or avoidance align with DSM-5-TR / ICD-11 (<code>6B01</code>) Panic Disorder. Use the <strong>Doctor Summary Note</strong> button to bring these details to a GP, MENTARI clinic, or psychiatrist for proper confirmation.`
          : `📌 <strong>Padanan Pendidikan — Selari Kriteria Kecelaruan Panik (${count}/13 simptom + Kesan ≥1 Bulan):</strong> Serangan mengejut berulang berserta kebimbangan/pengelakan ≥1 bulan menepati ciri DSM-5-TR / ICD-11 (<code>6B01</code>). Gunakan <strong>Penjana Nota Doktor</strong> di atas untuk dibawa ke Klinik Kesihatan, MENTARI, atau pakar psikiatri.`;
      } else {
        verdict.className = "alert-banner";
        verdict.innerHTML = isEn()
          ? `⚡ <strong>Matches an Acute Panic Attack Episode (${count}/13 symptoms):</strong> Experiencing a panic attack (~13% of adults) does NOT automatically mean you have Panic Disorder unless unexpected attacks repeat and cause ≥1 month of persistent worry or avoidance.`
          : `⚡ <strong>Menepati Ciri Satu Episod Serangan Panik (${count}/13 simptom):</strong> Mengalami serangan panik (~13% orang dewasa) BUKAN bermakna anda menghidap Kecelaruan Panik melainkan ia berulang secara mengejut dan mengganggu hidup selama ≥1 bulan.`;
      }
    }

    ["dsmUnexpectedCb", "dsmOneMonthCb", "dsmOrganicCb"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
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
      tbody.innerHTML = rows
        .map(
          (r) => `<tr>
            <td><strong style="color:var(--text-primary);">${r.feature}</strong></td>
            <td>${r.panic}</td>
            <td>${r.anxiety}</td>
            <td style="color:${isEn() || true ? "var(--text-primary)" : ""}; border-left:2px solid rgba(239,68,68,0.3);">${r.acs}</td>
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
  // CHAPTER 3: CAFFEINE CALCULATOR (KLEVEBRANT & FRICK, 2022) & MYTHS
  // --------------------------------------------------------------------------
  const selectedCaffeineIds = new Set(["kopi_kaw", "teh_tarik"]);

  function initCaffeineAndMyths() {
    function renderCaffeine() {
      const list = document.getElementById("caffeineItemList");
      if (!list) return;
      const items = window.getPanicData().caffeineItems;
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
          cb.closest(".check-tile").classList.toggle("checked", cb.checked);
          updateCaffeineVerdict();
          if (window.markModuleExplored) window.markModuleExplored("caffeine");
        });
      });
      updateCaffeineVerdict();
    }

    function updateCaffeineVerdict() {
      const items = window.getPanicData().caffeineItems;
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
              ? "linear-gradient(90deg, #14b8a6, #f59e0b)"
              : "linear-gradient(90deg, #14b8a6, #38bdf8)";
      }
      if (!msgEl) return;

      if (total >= 400) {
        msgEl.className = "alert-banner alert-danger";
        msgEl.innerHTML = isEn()
          ? `🚨 <strong>High Provocation Zone (${total} mg):</strong> Meta-analysis by <em>Klevebrant & Frick (2022)</em> proved that ~400–480 mg caffeine directly triggers full panic attacks in <strong>>51% of panic disorder patients</strong> (by blocking calming adenosine receptors). Taper down gradually!`
          : `🚨 <strong>Zon Pencetus Tinggi (${total} mg):</strong> Meta-analisis <em>Klevebrant & Frick (2022)</em> mengesahkan dos ~400–480 mg kafein mencetuskan serangan panik secara langsung pada <strong>melebihi separuh (>51%) pesakit kecelaruan panik</strong>! Kurangkan secara berperingkat.`;
      } else if (total >= 200) {
        msgEl.className = "alert-banner alert-warn";
        msgEl.innerHTML = isEn()
          ? `⚠️ <strong>Moderate Trigger Zone (${total} mg):</strong> If you are prone to palpitations or nocturnal panic, consider keeping daily caffeine under 100–150 mg and avoiding stimulants after 12:00 PM.`
          : `⚠️ <strong>Zon Sensitif Sederhana (${total} mg):</strong> Jika anda mudah berdebar atau sukar tidur, hadkan bawah 100–150 mg sehari dan elakkan kafein selepas jam 12:00 tengah hari.`;
      } else {
        msgEl.className = "alert-banner alert-safe";
        msgEl.innerHTML = isEn()
          ? `✅ <strong>Low Stimulant Load (${total} mg):</strong> Gentle on your autonomic nervous system. Remember to also watch out for sleep deprivation and decongestant cold tablets (pseudoephedrine).`
          : `✅ <strong>Beban Perangsang Rendah (${total} mg):</strong> Mesra sistem saraf autonomik. Pastikan juga tidur mencukupi (7–8 jam) dan semak label ubat selesema dekongestan.`;
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

    langCallbacks.push(function () {
      renderCaffeine();
      renderMyths();
    });

    renderCaffeine();
    renderMyths();
  }

  // --------------------------------------------------------------------------
  // CHAPTER 4: CBT INTEROCEPTIVE TIMER, FEAR LADDER & DELIVERY FORMATS
  // --------------------------------------------------------------------------
  function initCbtEngine() {
    let activeInteroIdx = 0;
    let interoTimer = null;
    let interoSecLeft = 60;

    function renderInteroLab() {
      const listEl = document.getElementById("interoPresetButtons");
      const cardEl = document.getElementById("interoActiveDetail");
      if (!listEl || !cardEl) return;

      const labs = window.getPanicData().interoceptiveLabs;
      const cur = labs[activeInteroIdx] || labs[0];
      if (!interoTimer) interoSecLeft = cur.duration;

      listEl.innerHTML = labs
        .map(
          (l, i) => `<button type="button" class="chip-btn ${i === activeInteroIdx ? "active" : ""}" data-intero-idx="${i}">
            ${l.title} (${l.duration}s)
          </button>`
        )
        .join("");

      listEl.querySelectorAll("[data-intero-idx]").forEach((btn) => {
        btn.addEventListener("click", function () {
          clearInterval(interoTimer);
          interoTimer = null;
          activeInteroIdx = parseInt(btn.getAttribute("data-intero-idx"), 10) || 0;
          renderInteroLab();
          if (window.markModuleExplored) window.markModuleExplored("cbt");
        });
      });

      cardEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
          <strong style="font-size:0.98rem;">🎯 ${cur.title}</strong>
          <span class="pill-badge pill-info" id="interoCountdownBadge">${interoSecLeft}s</span>
        </div>
        <p style="margin:6px 0; font-size:0.85rem; color:var(--text-secondary);">
          <strong>${isEn() ? "Target Sensation:" : "Sensasi Sasaran:"}</strong> ${cur.sensation}<br/>
          <strong>${isEn() ? "Brain Lesson:" : "Pengajaran Otak:"}</strong> ${cur.disconfirms}
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
          <button type="button" class="btn-primary" id="startInteroTimerBtn">
            ${interoTimer ? (isEn() ? "⏹️ Stop Exercise" : "⏹️ Henti Latihan") : (isEn() ? `▶️ Start ${cur.duration}s Safe Trial` : `▶️ Mula Latihan ${cur.duration}s`)}
          </button>
          <button type="button" class="btn-secondary" id="sendToLadderBtn">
            ${isEn() ? "➕ Add to Fear Ladder" : "➕ Masuk Tangga Ketakutan"}
          </button>
        </div>
      `;

      document.getElementById("startInteroTimerBtn")?.addEventListener("click", function () {
        if (interoTimer) {
          clearInterval(interoTimer);
          interoTimer = null;
          renderInteroLab();
          return;
        }
        interoSecLeft = cur.duration;
        interoTimer = setInterval(function () {
          interoSecLeft--;
          const b = document.getElementById("interoCountdownBadge");
          if (b) b.textContent = interoSecLeft + "s";
          if (interoSecLeft <= 0) {
            clearInterval(interoTimer);
            interoTimer = null;
            if (window.playPanicGentleTone) window.playPanicGentleTone(528, 360);
            renderInteroLab();
          }
        }, 1000);
        renderInteroLab();
      });

      document.getElementById("sendToLadderBtn")?.addEventListener("click", function () {
        const taskInput = document.getElementById("ladderTaskInput");
        const safetyInput = document.getElementById("ladderSafetyInput");
        const sudsInput = document.getElementById("ladderSudsInput");
        if (taskInput) taskInput.value = cur.title;
        if (safetyInput) {
          safetyInput.value = isEn() ? "No pulse checking / sitting down early" : "Tanpa semak jam pintar / berhenti awal";
        }
        if (sudsInput) sudsInput.value = cur.sudsDefault;
      });
    }

    // Graded Fear Ladder State
    let ladderSteps = JSON.parse(
      localStorage.getItem("paniclab_ladder") ||
        JSON.stringify([
          { id: 1, task: "Naik lif seorang diri 3 tingkat / Ride elevator 3 floors alone", safety: "Tanpa genggam telefon / No phone clutching", baseSuds: 45, done: true, postSuds: 15 },
          { id: 2, task: "Beratur di pasar raya waktu puncak / Supermarket checkout queue", safety: "Tanpa botol air & duduk tepi pintu / No exit-hovering", baseSuds: 70, done: false, postSuds: 30 }
        ])
    );

    function saveLadder() {
      try {
        localStorage.setItem("paniclab_ladder", JSON.stringify(ladderSteps));
      } catch (_) {}
    }

    function renderLadder() {
      const tbody = document.getElementById("ladderTableBody");
      if (!tbody) return;
      const sorted = ladderSteps.slice().sort((a, b) => a.baseSuds - b.baseSuds);
      tbody.innerHTML = sorted
        .map(
          (st) => `<tr>
            <td>
              <strong style="color:var(--text-primary);">${st.task}</strong><br/>
              <small style="color:var(--text-muted);">${isEn() ? "Drop crutch:" : "Buang tongkat:"} ${st.safety}</small>
            </td>
            <td><span class="pill-badge pill-warn">${st.baseSuds}/100</span></td>
            <td>
              ${
                st.done
                  ? `<span class="pill-badge pill-safe">✓ ${st.postSuds}/100</span>`
                  : `<button type="button" class="chip-btn" data-complete-step="${st.id}">${isEn() ? "✓ Mark Practiced" : "✓ Tandakan Selesai"}</button>`
              }
            </td>
            <td>
              <button type="button" class="chip-btn" data-delete-step="${st.id}">✕</button>
            </td>
          </tr>`
        )
        .join("");

      tbody.querySelectorAll("[data-complete-step]").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = Number(btn.getAttribute("data-complete-step"));
          const found = ladderSteps.find((x) => x.id === id);
          if (found) {
            found.done = true;
            found.postSuds = Math.max(10, Math.round(found.baseSuds * 0.35));
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
  // CHAPTER 5: STEPPED PHARMACOTHERAPY NAVIGATOR
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
          (s) => `<button type="button" class="hotspot-btn ${s.id === activeScenId ? "active" : ""}" data-pharm-scen="${s.id}">
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
          <strong>🛡️ ${isEn() ? "Clinical Safety Guardrail:" : "Peringatan Keselamatan Klinikal:"}</strong> ${cur.guardrail}
        </div>
      `;
    }

    function renderPharmTable() {
      const tbody = document.getElementById("pharmMatrixBody");
      if (!tbody) return;
      const rows = window.getPanicData().pharmMatrix.filter(
        (r) => tierFilter === "all" || r.tier === tierFilter
      );
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
            <td><span class="pill-badge ${cls}">${r.tierLabel}</span></td>
            <td><strong style="color:var(--text-primary);">${r.agents}</strong></td>
            <td>${r.evidence}</td>
            <td>${r.notes}</td>
          </tr>`;
        })
        .join("");
    }

    document.querySelectorAll("[data-pharm-filter]").forEach((btn) => {
      btn.addEventListener("click", function () {
        tierFilter = btn.getAttribute("data-pharm-filter") || "all";
        document.querySelectorAll("[data-pharm-filter]").forEach((b) => {
          b.classList.toggle("active", b.getAttribute("data-pharm-filter") === tierFilter);
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
  // CHAPTER 6 & 7: 3 VISUAL ANALOGIES & 5-SCENARIO CLINICAL QUIZ
  // --------------------------------------------------------------------------
  function initAnalogiesAndQuiz() {
    const answers = {};

    function renderAnalogies() {
      const grid = document.getElementById("analogiesGrid");
      if (!grid) return;
      const list = window.getPanicData().analogies;
      grid.innerHTML = list
        .map(
          (a) => `<article class="panel-card">
            <div style="font-size:1.85rem; margin-bottom:6px;">${a.icon}</div>
            <div style="font-size:0.74rem; font-weight:700; color:var(--accent-teal); text-transform:uppercase; margin-bottom:4px;">${a.tag}</div>
            <h3 style="margin:0 0 8px;">${a.title}</h3>
            <p class="layman-only" style="margin:0; font-size:0.88rem; color:var(--text-secondary);">${a.layman}</p>
            <p class="clinical-only" style="margin:0; font-size:0.88rem; color:var(--text-secondary);">${a.clinical}</p>
          </article>`
        )
        .join("");
    }

    function renderQuiz() {
      const wrap = document.getElementById("clinicalQuizContainer");
      const scoreEl = document.getElementById("quizScoreDisplay");
      if (!wrap) return;

      const questions = window.getPanicData().quizScenarios;
      let correctCount = 0;
      questions.forEach((q) => {
        if (answers[q.id] === q.correctIndex) correctCount++;
      });

      if (scoreEl) {
        scoreEl.textContent = isEn()
          ? `Mastery Score: ${correctCount} / ${questions.length}`
          : `Skor Kefahaman: ${correctCount} / ${questions.length}`;
      }

      wrap.innerHTML = questions
        .map((q) => {
          const chosen = answers[q.id];
          const answered = chosen !== undefined;
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

          return `<div class="quiz-card">
            <strong style="font-size:0.93rem; display:block;">${q.scenario}</strong>
            <div class="quiz-opt-list">${optsHtml}</div>
            ${
              answered
                ? `<div class="alert-banner ${chosen === q.correctIndex ? "alert-safe" : "alert-warn"}" style="margin-top:10px;">
                    ${q.explanation}
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
      renderAnalogies();
      renderQuiz();
    });

    renderAnalogies();
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
    initCbtEngine();
    initPharmacotherapy();
    initAnalogiesAndQuiz();
    updateMasteryBar();
    window.setAppLanguage(window.currentLang || "ms");
  });
})();
