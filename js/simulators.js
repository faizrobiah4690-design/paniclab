// ============================================================================
// PanicLab — Simulator Visual Interaktif (Adrenalin/CO₂, Peta Autonomik & CBT)
// Menyokong Bahasa Melayu (ms) & English (en), Mod Cerah/Gelap & Mod Mesra Panik
// ============================================================================

(function () {
  "use strict";

  window.__panicCalmMode = false;
  const refreshSimHooks = [];

  function isEn() {
    return window.currentLang === "en";
  }

  function isLight() {
    return document.body.classList.contains("light-theme");
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
      // Ignore browser autoplay restrictions
    }
  };

  // --------------------------------------------------------------------------
  // 1. SIMULATOR GELOMBANG ADRENALIN, pCO₂ & KITARAN SALAH TAFSIR CLARK
  // --------------------------------------------------------------------------
  function initPanicWaveSimulator() {
    const canvas = document.getElementById("panicWaveCanvas");
    if (!canvas) return;

    const W = 560;
    const H = 265;
    const ctx = setupHiDPICanvas(canvas, W, H);

    let currentPresetKey = "hyperventilation";
    let phaseOffset = 0;

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
        btn.classList.toggle("active", key === currentPresetKey);
        if (d.wavePresets[key]) {
          btn.textContent = d.wavePresets[key].label;
        }
      });
    }

    document.querySelectorAll("[data-wave-preset]").forEach((btn) => {
      btn.addEventListener("click", function () {
        currentPresetKey = btn.getAttribute("data-wave-preset") || "calm";
        updateReadouts();
        if (window.markModuleExplored) window.markModuleExplored("wave");
      });
    });

    function draw() {
      const light = isLight();
      const d = window.getPanicData();
      const preset = d.wavePresets[currentPresetKey] || d.wavePresets.calm;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = light ? "#f8fafc" : "#071320";
      ctx.fillRect(0, 0, W, H);

      const padL = 48;
      const padR = 20;
      const padT = 34;
      const padB = 34;
      const plotW = W - padL - padR;
      const plotH = H - padT - padB;

      // Hypocapnia zone (bottom band)
      ctx.fillStyle = light ? "rgba(168, 85, 247, 0.09)" : "rgba(167, 139, 250, 0.11)";
      ctx.fillRect(padL, padT + plotH * 0.66, plotW, plotH * 0.34);

      // Grid lines
      ctx.strokeStyle = light ? "rgba(15, 35, 52, 0.1)" : "rgba(148, 184, 206, 0.12)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padT + (plotH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(W - padR, y);
        ctx.stroke();
      }

      // 10-minute peak marker
      const peakX = padL + plotW * 0.38;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = light ? "rgba(217, 119, 6, 0.45)" : "rgba(245, 158, 11, 0.45)";
      ctx.beginPath();
      ctx.moveTo(peakX, padT);
      ctx.lineTo(peakX, padT + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Title & Legend
      ctx.font = "700 11.5px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#0f2230" : "#e2f1f8";
      ctx.fillText(
        isEn()
          ? "30-Minute Physiological Curve: Adrenaline Surge (Amber) vs Blood CO₂ (Cyan)"
          : "Lengkung Fisiologi 30 Minit: Gelombang Adrenalin (Jingga) lwn CO₂ Darah (Biru)",
        14,
        20
      );

      ctx.font = "600 10px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#b45309" : "#fbbf24";
      ctx.fillText(isEn() ? "Peak ~10 min (Always Subsides)" : "Kemuncak ~10 min (Pasti Surut)", peakX - 62, padT + 13);

      ctx.fillStyle = light ? "#6d28d9" : "#c4b5fd";
      ctx.fillText(
        isEn() ? "Hypocapnia Zone (Low CO₂ → Tingling & Lightheaded)" : "Zon Hipokapnia (Kurang CO₂ → Kebas & Melayang)",
        padL + 8,
        padT + plotH - 8
      );

      // Plot Adrenaline Curve
      const adrPeak = preset.adrenaline / 100;
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#f59e0b";
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const x = padL + t * plotW;
        // Skewed bell curve peaking at t = 0.38 and naturally decaying!
        const bell = Math.exp(-Math.pow((t - 0.38) / (currentPresetKey === "vagalRecovery" ? 0.18 : 0.25), 2));
        const ripple = window.__panicCalmMode ? 0 : Math.sin(t * 18 - phaseOffset) * 0.025 * adrPeak;
        const val = Math.min(0.96, 0.12 + adrPeak * 0.8 * bell + ripple);
        const y = padT + plotH - val * plotH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Plot Blood CO2 Curve
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

      // X-axis time labels
      ctx.fillStyle = light ? "#5c7485" : "#8da6b8";
      ctx.font = "600 10px Inter, system-ui, sans-serif";
      ctx.fillText("0 min", padL, H - 10);
      ctx.fillText("10 min", peakX - 14, H - 10);
      ctx.fillText("20 min", padL + plotW * 0.7 - 14, H - 10);
      ctx.fillText("30 min", W - padR - 34, H - 10);

      if (!window.__panicCalmMode) {
        phaseOffset += 0.055;
      }
      requestAnimationFrame(draw);
    }

    refreshSimHooks.push(updateReadouts);
    updateReadouts();
    requestAnimationFrame(draw);
  }

  // --------------------------------------------------------------------------
  // 2. SIMULATOR PETA BADAN & RANGKAIAN AUTONOMIK (6 HOTSPOTS)
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

    const coords = {
      amygdala: { x: 220, y: 48, r: 13 },
      brainVessels: { x: 256, y: 42, r: 11 },
      throatChest: { x: 220, y: 102, r: 12 },
      lungs: { x: 188, y: 150, r: 13 },
      heart: { x: 236, y: 156, r: 13 },
      gutHangover: { x: 220, y: 218, r: 13 }
    };

    function renderHotspotControls() {
      const items = window.getPanicData().neuroHotspots;
      listContainer.innerHTML = items
        .map((item) => {
          const isAct = item.id === activeId;
          return `<button type="button" class="hotspot-btn ${isAct ? "active" : ""}" data-hotspot-id="${item.id}">
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
        <div class="clinical-only" style="font-size:0.88rem;">${selected.clinical}</div>
      `;
    }

    canvas.addEventListener("click", function (ev) {
      const rect = canvas.getBoundingClientRect();
      const sx = ((ev.clientX - rect.left) / rect.width) * W;
      const sy = ((ev.clientY - rect.top) / rect.height) * H;
      Object.keys(coords).forEach((key) => {
        const c = coords[key];
        const dist = Math.hypot(sx - c.x, sy - c.y);
        if (dist <= c.r + 12) {
          activeId = key;
          renderHotspotControls();
          if (window.markModuleExplored) window.markModuleExplored("neuro");
        }
      });
    });

    function drawBody() {
      const light = isLight();
      const items = window.getPanicData().neuroHotspots;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = light ? "#f8fafc" : "#071320";
      ctx.fillRect(0, 0, W, H);

      // Stylized Human Silhouette
      ctx.strokeStyle = light ? "rgba(13, 148, 136, 0.42)" : "rgba(45, 212, 191, 0.35)";
      ctx.fillStyle = light ? "rgba(13, 148, 136, 0.06)" : "rgba(45, 212, 191, 0.06)";
      ctx.lineWidth = 2;

      // Head
      ctx.beginPath();
      ctx.arc(220, 50, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Torso & Arms
      ctx.beginPath();
      ctx.roundRect(160, 92, 120, 168, 28);
      ctx.fill();
      ctx.stroke();

      // Sympathetic Spine T1-L2 axis
      ctx.strokeStyle = light ? "rgba(2, 132, 199, 0.32)" : "rgba(56, 189, 248, 0.3)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(220, 62);
      ctx.lineTo(220, 236);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Hotspot Nodes
      items.forEach((item) => {
        const c = coords[item.id];
        if (!c) return;
        const isAct = item.id === activeId;
        const pulse = !window.__panicCalmMode && isAct ? Math.sin(pulseTick) * 4 : 0;

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

      ctx.font = "700 11px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#304758" : "#9db8c9";
      ctx.fillText(
        isEn() ? "Click any glowing organ node to inspect physiology" : "Klik mana-mana titik organ untuk lihat fisiologi",
        14,
        294
      );

      if (!window.__panicCalmMode) pulseTick += 0.08;
      requestAnimationFrame(drawBody);
    }

    refreshSimHooks.push(renderHotspotControls);
    renderHotspotControls();
    requestAnimationFrame(drawBody);
  }

  // --------------------------------------------------------------------------
  // 3. SIMULATOR LENGKUNG CBT: MELARIKAN DIRI VS KEKAL & HADAPI (HABITUASI)
  // --------------------------------------------------------------------------
  function initCbtCurveSimulator() {
    const canvas = document.getElementById("cbtCurveCanvas");
    if (!canvas) return;
    const W = 520;
    const H = 225;
    const ctx = setupHiDPICanvas(canvas, W, H);
    let mode = "stay"; // 'escape' or 'stay'

    function drawCurve() {
      const light = isLight();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = light ? "#f8fafc" : "#071320";
      ctx.fillRect(0, 0, W, H);

      const padL = 44;
      const padR = 18;
      const padT = 34;
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

      ctx.font = "700 11.5px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#0f2230" : "#e2f1f8";
      ctx.fillText(
        mode === "escape"
          ? isEn()
            ? "Trap Curve: Fleeing / Safety Crutches Reinforce Next Attack"
            : "Perangkap Lari / 'Safety Behavior': Serangan Berikutnya Makin Tinggi!"
          : isEn()
            ? "CBT Exposure Curve: Staying Without Crutches Rewires the Amygdala"
            : "Lengkung Pendedahan CBT: Kekal Tanpa Tongkat Memadamkan Penggera Palsu!",
        14,
        20
      );

      ctx.lineWidth = 3;
      if (mode === "escape") {
        ctx.strokeStyle = "#ef4444";
        ctx.beginPath();
        // Three spikes getting taller because person escapes right before peak drops
        const pts = [
          [0, 0.15], [0.14, 0.72], [0.17, 0.2],
          [0.34, 0.2], [0.48, 0.84], [0.51, 0.22],
          [0.68, 0.22], [0.84, 0.95], [0.88, 0.25], [1, 0.25]
        ];
        pts.forEach(([tx, ty], i) => {
          const x = padL + tx * plotW;
          const y = padT + plotH - ty * plotH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
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
      }

      ctx.font = "600 10px Inter, system-ui, sans-serif";
      ctx.fillStyle = light ? "#5c7485" : "#8da6b8";
      ctx.fillText(isEn() ? "Session / Exposure 1" : "Latihan 1", padL + 18, H - 9);
      ctx.fillText(isEn() ? "Session 3" : "Latihan 3", padL + plotW * 0.46, H - 9);
      ctx.fillText(isEn() ? "Session 6 (Remission)" : "Latihan 6 (Pulih)", padL + plotW * 0.74, H - 9);
    }

    document.querySelectorAll("[data-cbt-curve]").forEach((btn) => {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-cbt-curve") || "stay";
        document.querySelectorAll("[data-cbt-curve]").forEach((b) => {
          b.classList.toggle("active", b.getAttribute("data-cbt-curve") === mode);
        });
        drawCurve();
      });
    });

    refreshSimHooks.push(drawCurve);
    drawCurve();
  }

  window.refreshPanicSimulators = function () {
    refreshSimHooks.forEach((fn) => {
      try {
        fn();
      } catch (_) {}
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    initPanicWaveSimulator();
    initBodyMapSimulator();
    initCbtCurveSimulator();
  });
})();
