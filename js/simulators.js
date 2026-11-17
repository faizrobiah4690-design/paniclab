// ============================================================================
// PanicLab — Simulator Visual Interaktif (Gelombang Adrenalin/CO₂, Peta Organ & Lengkung CBT)
// Dioptimumkan dengan IntersectionObserver & prefers-reduced-motion (0% pembaziran bateri)
// ============================================================================

(function () {
  "use strict";

  const reducedMotionQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

  window.__panicCalmMode = !!(reducedMotionQuery && reducedMotionQuery.matches);

  const refreshSimHooks = [];
  const loopSyncHooks = [];

  if (reducedMotionQuery && typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", function (e) {
      window.__panicCalmMode = !!e.matches;
      window.syncPanicSimulatorLoops();
    });
  }

  function isEn() {
    return window.currentLang === "en";
  }

  function isLight() {
    return document.body.classList.contains("light-theme");
  }

  function shouldAnimate(isVisible) {
    return (
      isVisible &&
      !window.__panicCalmMode &&
      !document.hidden &&
      !document.body.classList.contains("modal-open")
    );
  }

  if (typeof CanvasRenderingContext2D !== "undefined" && !CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      const radius = Math.min(r || 0, w / 2, h / 2);
      this.moveTo(x + radius, y);
      this.arcTo(x + w, y, x + w, y + h, radius);
      this.arcTo(x + w, y + h, x, y + h, radius);
      this.arcTo(x, y + h, x, y, radius);
      this.arcTo(x, y, x + w, y, radius);
      this.closePath();
      return this;
    };
  }

  function setupHiDPICanvas(canvas, logicalW, logicalH) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  window.playPanicGentleTone = function (freq, durationMs) {
    if (!window.__panicAudioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window.__panicAudioCtx) {
        window.__panicAudioCtx = new AudioCtx();
      }
      const ctx = window.__panicAudioCtx;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq || 440;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (durationMs || 300) / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (durationMs || 300) / 1000 + 0.02);
    } catch (_) {
      // Abaikan sekatan autoplay pelayar
    }
  };

  // --------------------------------------------------------------------------
  // 1. SIMULATOR GELOMBANG ADRENALIN, PARAS CO₂ & KITARAN PANIK
  // --------------------------------------------------------------------------
  function initPanicWaveSimulator() {
    const canvas = document.getElementById("panicWaveCanvas");
    if (!canvas) return;

    const W = 560;
    const H = 265;
    const ctx = setupHiDPICanvas(canvas, W, H);

    let currentPresetKey = "hyperventilation";
    let phaseOffset = 0;
    let isVisible = true;
    let rafId = null;

    function drawFrame() {
      const light = isLight();
      const d = window.getPanicData();
      const preset = d.wavePresets[currentPresetKey] || d.wavePresets.calm;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = light ? "#f8fafc" : "#071320";
      ctx.fillRect(0, 0, W, H);

      const padL = 54;
      const padR = 18;
      const padT = 38;
      const padB = 34;
      const plotW = W - padL - padR;
      const plotH = H - padT - padB;

      // Zon Kurang CO2 (jalur bawah)
      ctx.fillStyle = light ? "rgba(168, 85, 247, 0.09)" : "rgba(167, 139, 250, 0.12)";
      ctx.fillRect(padL, padT + plotH * 0.66, plotW, plotH * 0.34);

      // Garisan Grid & Label Paksi-Y
      ctx.strokeStyle = light ? "rgba(15, 35, 52, 0.1)" : "rgba(148, 184, 206, 0.12)";
      ctx.lineWidth = 1;
      const yLabels = isEn() ? ["High", "", "Normal", "", "Low"] : ["Tinggi", "", "Normal", "", "Rendah"];
      ctx.font = "600 9.5px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#4b6374" : "#8da6b8";
      for (let i = 0; i <= 4; i++) {
        const y = padT + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(W - padR, y);
        ctx.stroke();
        if (yLabels[i]) {
          ctx.fillText(yLabels[i], 8, y + 3);
        }
      }

      // Penanda Kemuncak 10 Minit
      const peakX = padL + plotW * 0.38;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = light ? "rgba(180, 83, 9, 0.45)" : "rgba(245, 158, 11, 0.45)";
      ctx.beginPath();
      ctx.moveTo(peakX, padT);
      ctx.lineTo(peakX, padT + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Petunjuk Warna (Legend)
      ctx.font = "700 11px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(20, 18, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = light ? "#0f2230" : "#e2f1f8";
      ctx.fillText(isEn() ? "Adrenaline Wave" : "Gelombang Adrenalin", 30, 22);

      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(isEn() ? 148 : 178, 18, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = light ? "#0f2230" : "#e2f1f8";
      ctx.fillText(
        isEn() ? "Blood CO₂ Level (Drops When Over-Breathing)" : "Paras Gas CO₂ Darah (Turun Bila Nafas Laju)",
        isEn() ? 158 : 188,
        22
      );

      ctx.font = "600 10px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#b45309" : "#fbbf24";
      ctx.fillText(
        isEn() ? "Peaks ~10 min, ALWAYS comes down" : "Kemuncak ~10 min, PASTI turun sendiri",
        peakX - 68,
        padT + 13
      );

      ctx.fillStyle = light ? "#6d28d9" : "#c4b5fd";
      ctx.fillText(
        isEn()
          ? "Low CO₂ Zone → Causes harmless tingling fingers & dizziness"
          : "Zon Kurang CO₂ → Punca jari kebas & rasa melayang (tidak bahaya)",
        padL + 8,
        padT + plotH - 8
      );

      // Lengkung Adrenalin (Jingga)
      const adrPeak = preset.adrenaline / 100;
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#f59e0b";
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const x = padL + t * plotW;
        const bell = Math.exp(-Math.pow((t - 0.38) / (currentPresetKey === "vagalRecovery" ? 0.18 : 0.25), 2));
        const ripple = window.__panicCalmMode ? 0 : Math.sin(t * 18 - phaseOffset) * 0.025 * adrPeak;
        const val = Math.min(0.96, 0.12 + adrPeak * 0.8 * bell + ripple);
        const y = padT + plotH - val * plotH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Lengkung CO2 Darah (Biru)
      const co2Dip = (85 - preset.co2Level) / 100;
      ctx.beginPath();
      ctx.lineWidth = 2.8;
      ctx.strokeStyle = "#38bdf8";
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const x = padL + t * plotW;
        const dip = Math.exp(-Math.pow((t - 0.4) / (currentPresetKey === "vagalRecovery" ? 0.17 : 0.27), 2));
        const breatheWave = window.__panicCalmMode ? 0 : Math.cos(t * 22 - phaseOffset * 1.1) * 0.02;
        const val = Math.max(0.14, 0.78 - co2Dip * 0.85 * dip + breatheWave);
        const y = padT + plotH - val * plotH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Label Masa Paksi-X
      ctx.fillStyle = light ? "#4b6374" : "#8da6b8";
      ctx.font = "600 10px Inter, system-ui, sans-serif";
      ctx.fillText("0 min", padL, H - 10);
      ctx.fillText("10 min", peakX - 14, H - 10);
      ctx.fillText("20 min", padL + plotW * 0.7 - 14, H - 10);
      ctx.fillText("30 min", W - padR - 34, H - 10);
    }

    function tick() {
      drawFrame();
      if (shouldAnimate(isVisible)) {
        phaseOffset += 0.055;
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function syncLoop() {
      if (shouldAnimate(isVisible)) {
        if (!rafId) rafId = requestAnimationFrame(tick);
      } else {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        drawFrame();
      }
    }

    function updateReadouts() {
      const d = window.getPanicData();
      const preset = d.wavePresets[currentPresetKey] || d.wavePresets.calm;
      const hrEl = document.getElementById("simHrVal");
      const co2El = document.getElementById("simCo2Val");
      const pfcEl = document.getElementById("simPfcVal");
      const sumEl = document.getElementById("simWaveSummary");

      if (hrEl) hrEl.textContent = preset.hr;
      if (co2El) co2El.textContent = preset.co2;
      if (pfcEl) pfcEl.textContent = preset.pfc;
      if (sumEl) sumEl.innerHTML = preset.summary;

      document.querySelectorAll("[data-wave-preset]").forEach((btn) => {
        const key = btn.getAttribute("data-wave-preset");
        const active = key === currentPresetKey;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", String(active));
        if (d.wavePresets[key]) {
          btn.textContent = d.wavePresets[key].label;
        }
      });
      drawFrame();
    }

    document.querySelectorAll("[data-wave-preset]").forEach((btn) => {
      btn.addEventListener("click", function () {
        currentPresetKey = btn.getAttribute("data-wave-preset") || "calm";
        updateReadouts();
        if (window.markModuleExplored) window.markModuleExplored("wave");
      });
    });

    if (typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver(
        (entries) => {
          isVisible = entries.some((e) => e.isIntersecting);
          syncLoop();
        },
        { threshold: 0.05 }
      );
      obs.observe(canvas);
    }

    refreshSimHooks.push(updateReadouts);
    loopSyncHooks.push(syncLoop);
    updateReadouts();
    syncLoop();
  }

  // --------------------------------------------------------------------------
  // 2. SIMULATOR PETA ORGAN & SIMPTOM BADAN (6 TITIK ANATOMI BERLABEL JELAS)
  // --------------------------------------------------------------------------
  function initBodyMapSimulator() {
    const canvas = document.getElementById("bodyMapCanvas");
    const listContainer = document.getElementById("neuroHotspotList");
    const detailBox = document.getElementById("neuroDetailBox");
    if (!canvas || !listContainer || !detailBox) return;

    const W = 440;
    const H = 310;
    const ctx = setupHiDPICanvas(canvas, W, H);
    let activeId = "amygdala";
    let pulseTick = 0;
    let isVisible = true;
    let rafId = null;

    const coords = {
      amygdala: { x: 210, y: 46, r: 11, lx: 14, ly: 42, msTag: "1. Penggera Otak", enTag: "1. Brain Alarm" },
      brainVessels: { x: 234, y: 38, r: 10, lx: 294, ly: 40, msTag: "3. Pening & Kebas", enTag: "3. Dizzy & Tingling" },
      throatChest: { x: 220, y: 96, r: 10, lx: 294, ly: 98, msTag: "5. Tekak & Dada", enTag: "5. Throat & Chest" },
      lungs: { x: 196, y: 148, r: 12, lx: 14, ly: 148, msTag: "2. Paru-Paru (CO₂)", enTag: "2. Lungs (CO₂)" },
      heart: { x: 236, y: 152, r: 12, lx: 294, ly: 154, msTag: "4. Jantung Laju", enTag: "4. Racing Heart" },
      gutHangover: { x: 220, y: 216, r: 12, lx: 14, ly: 218, msTag: "6. Perut & Letih", enTag: "6. Gut & Fatigue" }
    };

    function drawBodyFrame() {
      const light = isLight();
      const items = window.getPanicData().neuroHotspots;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = light ? "#f8fafc" : "#071320";
      ctx.fillRect(0, 0, W, H);

      const silStroke = light ? "rgba(15, 118, 110, 0.44)" : "rgba(45, 212, 191, 0.36)";
      const silFill = light ? "rgba(15, 118, 110, 0.06)" : "rgba(45, 212, 191, 0.07)";
      ctx.strokeStyle = silStroke;
      ctx.fillStyle = silFill;
      ctx.lineWidth = 2;

      // Kepala
      ctx.beginPath();
      ctx.arc(220, 46, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Leher
      ctx.beginPath();
      ctx.roundRect(208, 75, 24, 24, 6);
      ctx.fill();
      ctx.stroke();

      // Bahu & Badan
      ctx.beginPath();
      ctx.roundRect(162, 98, 116, 162, 28);
      ctx.fill();
      ctx.stroke();

      // Bayangan Paru-Paru Kiri & Kanan
      ctx.strokeStyle = light ? "rgba(3, 105, 161, 0.25)" : "rgba(56, 189, 248, 0.22)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(196, 150, 18, 30, 0.08, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(244, 150, 18, 30, -0.08, 0, Math.PI * 2);
      ctx.stroke();

      // Garis Saraf Autonomik Tengah
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(220, 56);
      ctx.lineTo(220, 232);
      ctx.stroke();
      ctx.setLineDash([]);

      // Lukis Garis Penghubung, Label Tepi & Titik Organ
      items.forEach((item) => {
        const c = coords[item.id];
        if (!c) return;
        const isAct = item.id === activeId;
        const pulse = !window.__panicCalmMode && isAct ? Math.sin(pulseTick) * 4 : 0;

        const anchorX = c.lx < 200 ? c.lx + 124 : c.lx - 6;
        ctx.strokeStyle = isAct ? item.color : light ? "rgba(15,35,52,0.18)" : "rgba(148,184,206,0.22)";
        ctx.lineWidth = isAct ? 1.8 : 1;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(anchorX, c.ly - 3);
        ctx.stroke();

        ctx.fillStyle = isAct
          ? light ? "rgba(15, 118, 110, 0.14)" : "rgba(45, 212, 191, 0.16)"
          : light ? "#ffffff" : "#102132";
        ctx.strokeStyle = isAct ? item.color : light ? "rgba(15,35,52,0.12)" : "rgba(148,184,206,0.18)";
        ctx.beginPath();
        ctx.roundRect(c.lx - 4, c.ly - 15, 132, 22, 6);
        ctx.fill();
        ctx.stroke();

        ctx.font = (isAct ? "700" : "600") + " 10px Inter, system-ui, sans-serif";
        ctx.fillStyle = isAct ? (light ? "#0f2230" : "#ffffff") : (light ? "#283d4c" : "#cbdce7");
        ctx.fillText(isEn() ? c.enTag : c.msTag, c.lx + 2, c.ly);

        if (isAct) {
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r + 7 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = item.color + "33";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = isAct ? item.color : light ? "#ffffff" : "#122436";
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = item.color;
        ctx.stroke();
      });

      ctx.font = "600 10.5px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#283d4c" : "#9db8c9";
      ctx.fillText(
        isEn()
          ? "Tap any organ point or label above to see why it is safe"
          : "Klik mana-mana titik atau label di atas untuk lihat punca sebenar",
        18,
        294
      );
    }

    function tickBody() {
      drawBodyFrame();
      if (shouldAnimate(isVisible)) {
        pulseTick += 0.08;
        rafId = requestAnimationFrame(tickBody);
      } else {
        rafId = null;
      }
    }

    function syncBodyLoop() {
      if (shouldAnimate(isVisible)) {
        if (!rafId) rafId = requestAnimationFrame(tickBody);
      } else {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        drawBodyFrame();
      }
    }

    function renderHotspotControls() {
      const items = window.getPanicData().neuroHotspots;
      listContainer.innerHTML = items
        .map((item) => {
          const isAct = item.id === activeId;
          return `<button type="button" class="hotspot-btn ${isAct ? "active" : ""}" aria-pressed="${isAct}" data-hotspot-id="${item.id}">
            <div>
              <strong style="font-size:0.88rem; display:block;">${item.title}</strong>
              <span style="font-size:0.76rem; color:var(--text-muted);">${item.subtitle}</span>
            </div>
            <span class="pill-badge pill-info">${item.badge}</span>
          </button>`;
        })
        .join("");

      listContainer.querySelectorAll("[data-hotspot-id]").forEach((btn) => {
        btn.addEventListener("click", function () {
          activeId = btn.getAttribute("data-hotspot-id");
          renderHotspotControls();
          if (window.markModuleExplored) window.markModuleExplored("neuro");
        });
      });

      const selected = items.find((x) => x.id === activeId) || items[0];
      detailBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:6px;">
          <strong style="font-size:0.98rem; color:${selected.color};">${selected.title}</strong>
          <span class="pill-badge pill-safe">${selected.badge}</span>
        </div>
        <div class="layman-only" style="font-size:0.88rem;">${selected.layman}</div>
        <div class="family-only" style="font-size:0.88rem;">${selected.family || selected.layman}</div>
        <div class="clinical-only" style="font-size:0.88rem;">${selected.clinical}</div>
      `;
      drawBodyFrame();
    }

    canvas.addEventListener("click", function (ev) {
      const rect = canvas.getBoundingClientRect();
      const sx = ((ev.clientX - rect.left) / rect.width) * W;
      const sy = ((ev.clientY - rect.top) / rect.height) * H;
      Object.keys(coords).forEach((key) => {
        const c = coords[key];
        const distNode = Math.hypot(sx - c.x, sy - c.y);
        const inLabel = sx >= c.lx - 4 && sx <= c.lx + 132 && sy >= c.ly - 14 && sy <= c.ly + 10;
        if (distNode <= c.r + 12 || inLabel) {
          activeId = key;
          renderHotspotControls();
          if (window.markModuleExplored) window.markModuleExplored("neuro");
        }
      });
    });

    if (typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver(
        (entries) => {
          isVisible = entries.some((e) => e.isIntersecting);
          syncBodyLoop();
        },
        { threshold: 0.05 }
      );
      obs.observe(canvas);
    }

    refreshSimHooks.push(renderHotspotControls);
    loopSyncHooks.push(syncBodyLoop);
    renderHotspotControls();
    syncBodyLoop();
  }

  // --------------------------------------------------------------------------
  // 3. SIMULATOR LENGKUNG CBT: LARI / PELINDUNG PALSU VS KEKAL & HADAPI
  // --------------------------------------------------------------------------
  function initCbtCurveSimulator() {
    const canvas = document.getElementById("cbtCurveCanvas");
    if (!canvas) return;
    const W = 520;
    const H = 225;
    const ctx = setupHiDPICanvas(canvas, W, H);
    let mode = "stay";

    function drawCurve() {
      const light = isLight();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = light ? "#f8fafc" : "#071320";
      ctx.fillRect(0, 0, W, H);

      const padL = 52;
      const padR = 18;
      const padT = 36;
      const padB = 30;
      const plotW = W - padL - padR;
      const plotH = H - padT - padB;

      ctx.strokeStyle = light ? "rgba(15, 35, 52, 0.12)" : "rgba(148, 184, 206, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, padT + plotH);
      ctx.lineTo(W - padR, padT + plotH);
      ctx.stroke();

      ctx.font = "600 9.5px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#4b6374" : "#8da6b8";
      ctx.fillText(isEn() ? "High" : "Cemas", 8, padT + 8);
      ctx.fillText(isEn() ? "Calm" : "Tenang", 8, padT + plotH - 2);

      ctx.font = "700 11.2px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#0f2230" : "#e2f1f8";
      ctx.fillText(
        mode === "escape"
          ? isEn()
            ? "❌ Fleeing / Safety Behaviors Make Future Panic Stronger"
            : "❌ Bila Lari / Guna Pelindung Palsu, Panik Makin Kuat!"
          : isEn()
            ? "✅ Staying Without Crutches Teaches Your Brain You Are Safe"
            : "✅ Bila Kekal Tanpa Lari, Otak Belajar Situasi Itu Selamat!",
        14,
        21
      );

      ctx.lineWidth = 3;
      if (mode === "escape") {
        ctx.strokeStyle = "#ef4444";
        ctx.beginPath();
        const pts = [
          [0, 0.15], [0.14, 0.7], [0.17, 0.2],
          [0.34, 0.2], [0.48, 0.83], [0.51, 0.22],
          [0.68, 0.22], [0.84, 0.95], [0.88, 0.25], [1, 0.25]
        ];
        pts.forEach(([tx, ty], i) => {
          const x = padL + tx * plotW;
          const y = padT + plotH - ty * plotH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        ctx.font = "600 10px Inter, system-ui, sans-serif";
        ctx.fillStyle = light ? "#b91c1c" : "#fca5a5";
        ctx.fillText(
          isEn() ? "Fled early → Brain thinks 'I barely survived!'" : "Lari awal → Otak sangka 'Nasib baik aku lari!'",
          padL + 12,
          padT + 18
        );
      } else {
        ctx.strokeStyle = "#10b981";
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
          const t = i / 100;
          const x = padL + t * plotW;
          const trial1 = 0.78 * Math.exp(-Math.pow((t - 0.18) / 0.11, 2));
          const trial2 = 0.46 * Math.exp(-Math.pow((t - 0.54) / 0.1, 2));
          const trial3 = 0.2 * Math.exp(-Math.pow((t - 0.84) / 0.09, 2));
          const val = 0.1 + trial1 + trial2 + trial3;
          const y = padT + plotH - Math.min(0.95, val) * plotH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.font = "600 10px Inter, system-ui, sans-serif";
        ctx.fillStyle = light ? "#047857" : "#6ee7b7";
        ctx.fillText(
          isEn() ? "Stayed 15m → Wave drops naturally → Fear shrinks!" : "Kekal 15 min → Debaran turun sendiri → Takut pudar!",
          padL + 18,
          padT + 22
        );
      }

      ctx.font = "600 10px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#4b6374" : "#8da6b8";
      ctx.fillText(isEn() ? "Practice 1" : "Latihan 1", padL + 18, H - 9);
      ctx.fillText(isEn() ? "Practice 3" : "Latihan 3", padL + plotW * 0.46, H - 9);
      ctx.fillText(isEn() ? "Practice 6 (Recovered)" : "Latihan 6 (Pulih)", padL + plotW * 0.72, H - 9);
    }

    document.querySelectorAll("[data-cbt-curve]").forEach((btn) => {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-cbt-curve") || "stay";
        document.querySelectorAll("[data-cbt-curve]").forEach((b) => {
          const act = b.getAttribute("data-cbt-curve") === mode;
          b.classList.toggle("active", act);
          b.setAttribute("aria-pressed", String(act));
        });
        drawCurve();
        if (window.markModuleExplored) window.markModuleExplored("cbt");
      });
    });

    refreshSimHooks.push(drawCurve);
    drawCurve();
  }

  window.syncPanicSimulatorLoops = function () {
    loopSyncHooks.forEach((fn) => {
      try {
        fn();
      } catch (_) {}
    });
  };

  window.refreshPanicSimulators = function () {
    refreshSimHooks.forEach((fn) => {
      try {
        fn();
      } catch (_) {}
    });
    window.syncPanicSimulatorLoops();
  };

  document.addEventListener("visibilitychange", function () {
    window.syncPanicSimulatorLoops();
  });

  document.addEventListener("DOMContentLoaded", function () {
    initPanicWaveSimulator();
    initBodyMapSimulator();
    initCbtCurveSimulator();
  });
})();
