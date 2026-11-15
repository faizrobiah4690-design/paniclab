// ============================================================================
// PanicLab — Pangkalan Data Dwibahasa (BM & EN) & Dwi-Mod (Awam & Klinikal)
// Diaudit mengikut DSM-5-TR (2022), ICD-11, WFSBP v3 (2023), NICE CG113,
// Cochrane NMA (Guaiana et al., 2023), Papola et al. (2022/2023), B4DT (2025),
// Klevebrant & Frick (2022) & KKM NCEMH / MENTARI / MyHEALTH
// ============================================================================

window.currentLang = localStorage.getItem("paniclab_lang") === "en" ? "en" : "ms";

window.PANIC_DATA_BY_LANG = {
  // ==========================================================================
  // BAHASA MELAYU (MS)
  // ==========================================================================
  ms: {
    spectrumCards: [
      {
        id: "attack",
        badge: "Episod Simptom • ICD-11 MB23.H",
        badgeClass: "pill-info",
        stat: "~13% Dewasa Pernah Alami",
        title: "1. Serangan Panik (Panic Attack)",
        layman:
          "Lonjakan ketakutan dan ribut fizikal mendadak yang memuncak dalam beberapa minit. Ia <strong>bukan penyakit mental</strong> dengan sendirinya—sesiapa sahaja boleh mengalaminya sekali-sekala akibat kurang tidur, kopi berlebihan, atau stres melampau.",
        clinical:
          "Penentu klinikal tidak berkod dalam DSM-5-TR (ICD-11: <code>MB23.H</code>). Didefinisikan sebagai lonjakan ketakutan/ketidakselesaan akut yang memuncak dalam beberapa minit bersama <strong>≥4 daripada 13 simptom autonomik/kognitif</strong>; boleh tercetus secara dijangka (<em>cued</em>) atau mengejut (<em>unexpected</em>)."
      },
      {
        id: "disorder",
        badge: "Diagnosis Klinikal • ICD-11 6B01",
        badgeClass: "pill-warn",
        stat: "Prevalens 1.1% – 4.7% (~10% Klinik Primer)",
        title: "2. Kecelaruan Panik (Panic Disorder)",
        layman:
          "Didiagnosis oleh doktor apabila serangan panik datang <strong>secara mengejut berulang kali</strong> tanpa sebab jelas, diikuti <strong>sekurang-kurangnya 1 bulan</strong> rasa takut diserang lagi ('takut kepada rasa takut') atau perubahan rutin harian.",
        clinical:
          "Diagnosis paksi kecelaruan keresahan (DSM-5-TR / ICD-11 <code>6B01</code>; nisbah wanita:lelaki ~2:1). Memerlukan serangan <em>unexpected</em> berulang + ≥1 bulan kebimbangan antisipatori atau perubahan tingkah laku maladaptif, selepas menolak punca organik (tiroid, aritmia, bahan)."
      },
      {
        id: "agoraphobia",
        badge: "Diagnosis Berasingan DSM-5-TR",
        badgeClass: "pill-danger",
        stat: "~25% Komplikasi Pesakit Panik",
        title: "3. Agoraphobia (Perangkap Pengelakan)",
        layman:
          "Apabila seseorang mula mengelak <strong>2 atau lebih tempat</strong>—seperti memandu jauh, kesesakan trafik, lif, pasar raya, pengangkutan awam, atau keluar seorang diri—kerana takut tiada jalan keluar atau tiada bantuan jika panik menyerang.",
        clinical:
          "Dikodkan sebagai diagnosis bebas dalam DSM-5-TR (berbeza daripada DSM-IV). Ditandai ketakutan/pengelakan ketara terhadap ≥2 daripada 5 situasi (pengangkutan awam, ruang terbuka, ruang tertutup, beratur/khalayak ramai, berada di luar rumah sendirian) selama ≥6 bulan."
      }
    ],

    neuroHotspots: [
      {
        id: "amygdala",
        title: "1. Amigdala, vmPFC & Penggera Asid Otak",
        subtitle: "Penggera Kebakaran Terlalu Sensitif",
        badge: "Pusat Pengesan Ancaman",
        color: "#ef4444",
        layman:
          "Amigdala ialah 'penggera asap' otak. Semasa panik, ia tersalah tafsir perubahan kecil badan (seperti nadi laju selepas naik tangga) sebagai ancaman maut lalu menekan butang kecemasan, manakala 'brek logik' otak hadapan (korteks prefrontal) terhenti seketika.",
        clinical:
          "Disregulasi rangkaian ketakutan berpusatkan amigdala, BNST, hipokampus dan kemerosotan inhibisi korteks prefrontal ventromedial (vmPFC). Kajian PET menunjukkan pengurangan ikatan reseptor <strong>GABA-A</strong> dan <strong>5-HT1A</strong>, serta kepekaan tinggi saluran ion pengesan asid (<strong>ASIC1a, ASIC2</strong>) terhadap perubahan pH ekstraselular/CO₂."
      },
      {
        id: "lungs",
        title: "2. Paru-Paru & Hiperventilasi (Hipokapnia CO₂)",
        subtitle: "Kenapa Dada Rasa 'Tak Cukup Oksigen'",
        badge: "Kunci Fisiologi #1",
        color: "#38bdf8",
        layman:
          "Walaupun anda rasa 'lemas tak cukup nafas', paras oksigen darah sebenarnya <strong>penuh (98%–100%)</strong>! Masalah sebenar ialah nafas laju & cetek membuang terlalu banyak gas karbon dioksida (CO₂), menyebabkan darah menjadi sedikit beralkali buat sementara waktu.",
        clinical:
          "Ketidakstabilan isi padu tidal dan penurunan <em>end-tidal</em> pCO₂ boleh bermula sehingga <strong>50 minit sebelum</strong> pesakit sedar serangan berlaku (Meuret et al.). Hiperventilasi akut mencetuskan <strong>hipokapnia</strong> dan <strong>alkalosis respiratori</strong> sementara tanpa hipoksemia."
      },
      {
        id: "brainVessels",
        title: "3. Salur Darah Otak & Hujung Saraf (Kebas / Melayang)",
        subtitle: "Punca Pening, Dunia Asing & Semut-Semut Jari",
        badge: "Bukan Strok / Bukan Gila",
        color: "#a78bfa",
        layman:
          "Kekurangan CO₂ menyebabkan salur darah ke otak mengecut sedikit secara sementara. Inilah punca kepala rasa ringan melayang, pandangan berbalam, dunia rasa macam mimpi (<em>derealization</em>), serta kebas di jari dan bibir—<strong>bukan tanda strok atau hilang akal!</strong>",
        clinical:
          "Alkalosis respiratori menyebabkan vasokonstriksi serebral ringan sementara serta peningkatan ikatan kalsium serum terion pada albumin (hipokalsemia fungsian sementara), menghasilkan parestesia perioral/akral, pening kepala, dan derealisasi/depersonalisasi pelindung."
      },
      {
        id: "heart",
        title: "4. Jantung & Saraf Simpatetik (T1–L2)",
        subtitle: "Debaran Laju & Kenapa Anda Hampir Mustahil Pengsan",
        badge: "Paradoks Tekanan Darah",
        color: "#f59e0b",
        layman:
          "Kelenjar adrenal mengepam adrenalin supaya jantung mengepam darah ke otot untuk 'lari dari harimau'. Ramai takut pengsan—tetapi pengsan biasa berlaku bila tekanan darah <em>jatuh</em>, sedangkan panik <strong>menaikkan tekanan darah</strong>! Jantung sihat mampu berdegup laju dengan selamat.",
        clinical:
          "Unjuran hipotalamus ke rantaian simpatetik torakolumbar (T1–L2) dan medula adrenal merembes katekolamin (epinefrin/norepinefrin), meningkatkan kadar nadi dan tekanan darah arteri. Sinkop vasovagal sebenar amat jarang berlaku dalam panik tulen (kecuali fobia darah-suntikan-kecederaan)."
      },
      {
        id: "throatChest",
        title: "5. Otot Tekak (Globus) & Dinding Dada",
        subtitle: "Ilusi Rasa Tercekik & Dada Mencucuk",
        badge: "Ketegangan Otot",
        color: "#2dd4bf",
        layman:
          "Adrenalin menegangkan otot leher hingga rasa seperti ada 'bola tersangkut di kerongkong' (walaupun laluan udara terbuka luas). Pernafasan menggunakan dada atas pula membuatkan otot rusuk tegang dan terasa tajam mencucuk di satu titik.",
        clinical:
          "Hipertonus otot krikofaringeus menghasilkan <em>globus pharyngeus</em> tanpa obstruksi saluran udara. Penggunaan berlebihan otot pernafasan aksesori dan interkostal menghasilkan sakit dada muskuloskeletal setempat yang berbeza daripada iskemia miokardium."
      },
      {
        id: "gutHangover",
        title: "6. Perut & Fasa 'Adrenaline Hangover'",
        subtitle: "Loya Semasa Serangan & Lesu Selepas Reda",
        badge: "Brek Parasimpatetik",
        color: "#10b981",
        layman:
          "Semasa kecemasan, badan menghentikan pencernaan perut supaya darah pergi ke otot—sebab itu perut rasa mual atau memulas. Selepas 10–20 minit, saraf penenang (parasimpatetik) mengambil alih, meninggalkan rasa mengantuk, sejuk menggigil, dan letih.",
        clinical:
          "Vasokonstriksi splanknik dan perencatan peristalsis gastrousus mencetuskan loya/ketidakselesaan epigastrik akut. Sebaik katekolamin dimetabolismekan selepas kemuncak 10–20 minit, lantunan tonus vagal parasimpatetik menghasilkan kelesuan pasca-panik."
      }
    ],

    wavePresets: {
      calm: {
        label: "1. Keadaan Tenang Seimbang",
        hr: "72 bpm",
        co2: "40 mmHg (Normal)",
        pfc: "Aktif Mengawal",
        adrenaline: 12,
        co2Level: 82,
        summary:
          "Korteks logik (vmPFC) mengawal amigdala dengan tenang. Pernafasan perut sekata mengekalkan paras CO₂ darah dan pH otak pada tahap optimum."
      },
      caffeineLoop: {
        label: "2. Kitaran Salah Tafsir Clark (Kopi / Stres)",
        hr: "118 bpm",
        co2: "31 mmHg (Menurun)",
        pfc: "Tersekat Cemas",
        adrenaline: 78,
        co2Level: 48,
        summary:
          "Degupan laju biasa (cth. selepas 2 cawan kopi kuat) ditafsir secara bencana ('Jantung aku nak berhenti!') → Amigdala lepaskan adrenalin → Debaran makin kuat → Mengesahkan ketakutan palsu!"
      },
      hyperventilation: {
        label: "3. Kemuncak Serangan & Hiperventilasi",
        hr: "136 bpm",
        co2: "24 mmHg (Hipokapnia)",
        pfc: "Penggera Maksimum",
        adrenaline: 96,
        co2Level: 24,
        summary:
          "Lonjakan memuncak dalam ~10 minit. Nafas tercungap membuang CO₂ terlalu banyak → alkalosis ringan → kebas jari/bibir & rasa dunia tidak nyata. Walau ngeri, gelombang ini PASTI turun sendiri."
      },
      vagalRecovery: {
        label: "4. Pemulihan 'Accept & Float' + Nafas 4-2-6",
        hr: "80 bpm (Menurun)",
        co2: "38 mmHg (Pulih)",
        pfc: "Kembali Tenang",
        adrenaline: 26,
        co2Level: 76,
        summary:
          "Apabila anda berhenti melawan dan memanjangkan hembusan nafas (6 saat), saraf vagus mengaktifkan brek semula jadi, CO₂ kembali seimbang, dan rasa kebas/pening beransur hilang dalam 15–20 minit."
      }
    },

    dsmSymptoms: [
      { id: "s1", group: "cardio", label: "1. Palpitasi, jantung berdebar kencang atau berlumba-lumba" },
      { id: "s2", group: "cardio", label: "2. Berpeluh mendadak (peluh sejuk atau panas)" },
      { id: "s3", group: "cardio", label: "3. Menggeletar atau menggigil pada tangan/badan" },
      { id: "s4", group: "cardio", label: "4. Sesak nafas atau rasa lemas tidak puas bernafas (air hunger)" },
      { id: "s5", group: "cardio", label: "5. Rasa tercekik di kerongkong (globus sensation)" },
      { id: "s6", group: "cardio", label: "6. Sakit atau rasa ketat pada dada" },
      { id: "s7", group: "neuro", label: "7. Loya, mual, atau perut memulas" },
      { id: "s8", group: "neuro", label: "8. Pening, kepala ringan melayang, atau rasa nak pitam" },
      { id: "s9", group: "neuro", label: "9. Seram sejuk (chills) atau gelombang kepanasan (hot flashes)" },
      { id: "s10", group: "neuro", label: "10. Parestesia (kebas atau semut-semut di jari, kaki, atau bibir)" },
      { id: "s11", group: "cog", label: "11. Derealisasi (dunia rasa asing/mimpi) atau depersonalisasi" },
      { id: "s12", group: "cog", label: "12. Takut hilang kawalan atau takut 'menjadi gila'" },
      { id: "s13", group: "cog", label: "13. Takut mati (yakin nyawa/jantung bakal berhenti ketika itu)" }
    ],

    diffRows: [
      {
        feature: "Corak Bermula",
        panic: "Mengejut tiba-tiba tanpa amaran (termasuk terjaga tidur / nocturnal panic pada 25–33% kes)",
        anxiety: "Beransur-ansur meningkat mengikut masalah atau stres harian",
        acs: "Mengejut, sering tercetus semasa aktiviti fizikal/emosi berat atau ketika rehat"
      },
      {
        feature: "Tempoh Kemuncak",
        panic: "Memuncak pantas dalam ≤10 minit, lazimnya surut dalam 20–30 minit",
        anxiety: "Berlarutan berjam-jam, berhari-hari, atau berbulan-bulan",
        acs: "Berterusan dan lazimnya semakin berat dari minit ke minit (>20 minit)"
      },
      {
        feature: "Sifat Sakit Dada",
        panic: "Tajam mencucuk setempat di dada depan (otot dinding dada tegang)",
        anxiety: "Rasa senak ringan atau bahu/dada tegang",
        acs: "Berat menghimpit, menekan atau rasa terbakar di tengah dada (retrosternal)"
      },
      {
        feature: "Sebaran Sakit",
        panic: "Kekal sekitar dada depan; disertai kebas kedua-dua belah jari/bibir",
        anxiety: "Tiada sebaran khusus (sering sakit tengkuk/kepala tegang)",
        acs: "Menjalar ke lengan kiri, bahu, leher, rahang, atau belakang badan"
      },
      {
        feature: "Kesan Nafas Perlahan",
        panic: "Beransur reda dalam 15–20 minit bila nafas diperlahankan",
        anxiety: "Reda sementara bila punca stres selesai atau perhatian dialih",
        acs: "TIDAK hilang walaupun berehat atau mengawal pernafasan — hubungi 999 segera!"
      }
    ],

    caffeineItems: [
      { id: "kopi_kaw", name: "Kopi O Kaw / Americano Besar", mg: 150 },
      { id: "espresso", name: "1 Shot Espresso / Kopi Susu Tin", mg: 85 },
      { id: "teh_tarik", name: "Teh Tarik / Teh Hitam Pekat", mg: 55 },
      { id: "matcha", name: "Matcha Latte / Teh Hijau", mg: 65 },
      { id: "energy", name: "Minuman Tenaga (Energy Drink)", mg: 160 },
      { id: "preworkout", name: "Serbuk Pre-Workout Sukan", mg: 250 },
      { id: "cola", name: "Minuman Berkarbonat Kola (330ml)", mg: 35 },
      { id: "cold_med", name: "Ubat Selesema Dekongestan (Pseudoephedrine)*", mg: 120 }
    ],

    mythsAndTraps: [
      {
        badge: "Perangkap #1 • Jam Pintar",
        badgeClass: "pill-warn",
        title: "Tabiat Semak Nadi Setiap Jam (Safety Behavior)",
        myth: "Mitos: 'Kalau saya pantau ECG/nadi di jam pintar setiap masa, saya lebih tenang.'",
        truth: "Fakta Klinikal: Mengintip nadi secara obsesif melatih amigdala bahawa degupan jantung adalah berbahaya dan menghalang otak belajar bahawa anda selamat tanpa 'tongkat' tersebut."
      },
      {
        badge: "Bahaya Fizikal • Jangan Buat!",
        badgeClass: "pill-danger",
        title: "Mitos Bernafas Dalam Beg Kertas",
        myth: "Mitos Filem: 'Suruh orang tengah panik bernafas dalam beg kertas.'",
        truth: "Fakta Perubatan: ELAKKAN beg kertas! Ia menurunkan oksigen secara berbahaya jika simptom mangsa sebenarnya berpunca daripada serangan asma akut atau masalah jantung (ACS). Gunakan kiraan nafas 4-2-6."
      },
      {
        badge: "Mitos Pengsan",
        badgeClass: "pill-safe",
        title: "'Saya Rasa Pening, Kejap Lagi Pasti Pitam!'",
        myth: "Mitos: 'Kepala rasa melayang bermaksud saya nak pengsan di khalayak ramai.'",
        truth: "Fakta Fisiologi: Pengsan sebenar berlaku apabila tekanan darah JATUH mendadak. Semasa serangan panik, adrenalin MENAIKKAN tekanan darah—menjadikan pengsan hampir mustahil (kecuali fobia jarum/darah)."
      },
      {
        badge: "Mitos Hilang Akal",
        badgeClass: "pill-info",
        title: "'Dunia Rasa Asing, Adakah Saya Sedang Jadi Gila?'",
        myth: "Mitos: 'Rasa terpisah dari badan (derealization) akan bertukar jadi skizofrenia.'",
        truth: "Fakta Psikiatri: Derealisasi ialah refleks perlindungan saraf sementara akibat lonjakan adrenalin dan kurang CO₂. Serangan panik TIDAK PERNAH bertukar menjadi psikosis atau skizofrenia."
      }
    ],

    interoceptiveLabs: [
      {
        id: "straw",
        title: "1. Bernafas Ikut Straw Halus",
        method: "Bernafas ikut mulut guna straw halus sambil hidung dipicit",
        duration: 60,
        sensation: "Sesak nafas, rasa lemas (air hunger)",
        contra: "Pantang Larang: Asma, penyakit paru-paru kronik",
        hypothesis: "Jika saya bernafas ikut straw 60 saat, saya akan lemas atau pitam (Keyakinan 85%)",
        disconfirms: "Membuktikan rasa sempit nafas tidak menutup saluran udara atau menjatuhkan oksigen darah.",
        sudsDefault: 70
      },
      {
        id: "hypervent",
        title: "2. Hiperventilasi Sengaja (30 Nafas/Min)",
        method: "Tarik & hembus nafas dalam dan laju (~1 nafas setiap 2 saat)",
        duration: 60,
        sensation: "Pening, kebas jari/bibir, derealisasi",
        contra: "Pantang Larang: Epilepsi, sedang hamil, asma",
        hypothesis: "Jika jari kebas dan kepala ringan, saya akan kena strok atau hilang akal (Keyakinan 80%)",
        disconfirms: "Membuktikan kebas & rasa asing hanyalah kesan sementara perubahan CO₂ yang surut sendiri.",
        sudsDefault: 75
      },
      {
        id: "spin",
        title: "3. Pusing Kerusi Pejabat (1 Pusingan / 3s)",
        method: "Duduk selamat di kerusi beroda & berpusing sederhana",
        duration: 60,
        sensation: "Pening berpusing & sedikit loya",
        contra: "Pantang Larang: Masalah telinga dalam (vestibular) teruk",
        hypothesis: "Jika kepala berpusing, saya pasti hilang kawalan dan rebah (Keyakinan 75%)",
        disconfirms: "Membuktikan pening berpusing tidak menyebabkan rebah pengsan dan pulih sendiri.",
        sudsDefault: 60
      },
      {
        id: "headshake",
        title: "4. Geleng Kepala Pantas (Mata Terbuka)",
        method: "Geleng kepala kiri ke kanan secara pantas selama 30 saat",
        duration: 30,
        sensation: "Kepala ringan melayang & pandangan berbalam",
        contra: "Pantang Larang: Kecederaan tulang leher / servikal",
        hypothesis: "Pandangan berbalam bermaksud saya nak pitam sekarang (Keyakinan 70%)",
        disconfirms: "Membuktikan kabur fokus sementara adalah reaksi deria biasa tanpa bahaya.",
        sudsDefault: 55
      },
      {
        id: "jog",
        title: "5. Lari Setempat Laju (Angkat Lutut Tinggi)",
        method: "Lari setempat secara pantas tanpa henti",
        duration: 60,
        sensation: "Jantung berdebar kencang & berpeluh",
        contra: "Pantang Larang: Penyakit jantung aktif, darah tinggi tidak terkawal",
        hypothesis: "Jantung laju akan mencetuskan serangan jantung mengejut (Keyakinan 85%)",
        disconfirms: "Membuktikan jantung sihat memang direka mengepam laju dengan selamat.",
        sudsDefault: 65
      },
      {
        id: "breathhold",
        title: "6. Tahan Nafas Penuh",
        method: "Tarik nafas biasa dan tahan sepenuhnya",
        duration: 35,
        sensation: "Dada ketat & refleks cemas tercekik",
        contra: "Pantang Larang: Penyakit jantung, sedang hamil",
        hypothesis: "Dada ketat bermaksud nafas saya akan terhenti terus (Keyakinan 75%)",
        disconfirms: "Membuktikan refleks pernafasan automatik badan sentiasa mengambil alih dengan selamat.",
        sudsDefault: 65
      },
      {
        id: "muscletension",
        title: "7. Tegangkan Semua Otot Badan Serentak",
        method: "Keraskan otot tangan, perut, bahu & kaki serentak",
        duration: 60,
        sensation: "Menggeletar halus & otot dinding dada ketat",
        contra: "Pantang Larang: Darah tinggi tidak terkawal",
        hypothesis: "Badan menggigil bermaksud saya sedang hilang kawalan saraf (Keyakinan 70%)",
        disconfirms: "Membuktikan menggigil & dada ketat hanyalah keletihan otot rangka yang jinak.",
        sudsDefault: 55
      },
      {
        id: "stare",
        title: "8. Renung Mata Di Cermin / Titik Dinding",
        method: "Tenung mata sendiri di cermin tanpa alih fokus",
        duration: 90,
        sensation: "Depersonalisasi, wajah/dunia terasa asing",
        contra: "Pantang Larang: Tiada (selamat untuk semua)",
        hypothesis: "Rasa terpisah daripada badan bermaksud saya sedang jadi gila/psikosis (Keyakinan 80%)",
        disconfirms: "Membuktikan derealisasi hanyalah keletihan fokus visual, tidak pernah jadi gila.",
        sudsDefault: 60
      },
      {
        id: "globus_hot",
        title: "9. Bonus: Telan Liur 6x / Jaket Tebal",
        method: "Telan air liur pantas 5–6x berturut-turut ATAU pakai jaket tebal tanpa kipas",
        duration: 60,
        sensation: "Rasa tercekik (globus) atau gelombang kepanasan (hot flashes)",
        contra: "Pantang Larang: Elak bilik panas melampau jika dehidrasi",
        hypothesis: "Tekak sempit akan tertutup rapat / badan panas tanda nak pengsan (Keyakinan 75%)",
        disconfirms: "Membuktikan otot tekak sekadar penat menelan & kepanasan kulit tidak berbahaya.",
        sudsDefault: 60
      }
    ],

    ieMistakes: [
      {
        title: "1. Campur Aduk Nafas 4-2-6 Semasa Sesi Latihan IE",
        desc: "Nafas 4-2-6 adalah untuk kecemasan tidak dijangka. Semasa sesi latihan IE, JANGAN buat 4-2-6, jangan buka kipas, dan jangan semak jam pintar—supaya otak belajar anda selamat TANPA sebarang tongkat."
      },
      {
        title: "2. Berhenti Sebaik Rasa Cemas Memuncak (Saat Ke-15)",
        desc: "Berhenti awal mengukuhkan ketakutan! Habiskan tempoh penuh (malah lebihkan +15 saat selepas rasa takut muncul) dan ulang 3–5 pusingan."
      },
      {
        title: "3. Makan Ubat Penenang (Alprazolam) Sebelum Berlatih",
        desc: "Benzodiazepin menumpulkan isyarat saraf semula jadi dan menghalang korteks prefrontal membina memori keselamatan baharu (Inhibitory Learning)."
      },
      {
        title: "4. Hanya Berlatih Ketika Segar Di Bilik Sendiri",
        desc: "Bila SUDS di rumah turun <2/10, gabungkan terus dengan situasi luar (cth: naik tangga laju sebelum masuk lif, atau minum separuh kopi sebelum beratur di pasar raya)."
      }
    ],

    copingCards: [
      {
        id: "traffic",
        icon: "🚗",
        shortLabel: "1. Jem / Lampu Isyarat",
        title: "Kad 1: Memandu Dalam Kesesakan Jalan Raya atau Lampu Isyarat",
        script:
          "Jantung berdebar dan tangan kebas sekarang ialah kesan lonjakan adrenalin serta cengkaman stereng terlalu kuat, bukan tanda nak pitam. Pengsan memerlukan kejatuhan tekanan darah secara mendadak, sedangkan serangan panik MENAIKKAN tekanan darah dan menajamkan refleks pemanduan saya. Longgarkan bahu serta jari pada stereng, hembus nafas perlahan 6 saat ikut mulut, fokus pada bumper kereta di hadapan, dan teruskan memandu apabila lampu hijau menyala—gelombang ini pasti surut dalam 10 minit."
      },
      {
        id: "highway",
        icon: "🛣️",
        shortLabel: "2. Lebuh Raya / Jambatan",
        title: "Kad 2: Memandu di Lebuh Raya atau Jambatan Jauh Dari Susur Keluar",
        script:
          "Rasa terperangkap dan pandangan seolah-olah mengecil (tunnel vision) ini hanyalah tindak balas fokus mata apabila amigdala membunyikan penggera palsu, bukannya tanda bakal hilang kawalan kereta. Otot kaki dan tangan saya masih berfungsi penuh mengawal pedal serta stereng seperti biasa, dan rekod serangan lalu membuktikan saya sentiasa memandu dengan selamat. Kekalkan kelajuan stabil di lorong kiri tanpa berhenti mengejut di bahu jalan, dan biarkan adrenalin ini habis dibakar secara semula jadi."
      },
      {
        id: "crowd",
        icon: "🛒",
        shortLabel: "3. Pasar Raya / Beratur",
        title: "Kad 3: Tempat Sesak Terbuka & Beratur Panjang (Pasar Raya, Bank, Majlis)",
        script:
          "Kepala rasa melayang dan persekitaran nampak asing di bawah lampu terang ini ialah derealisasi sementara akibat rangsangan deria berlebihan, bukannya tanda nak rebah atau hilang akal. Orang sekeliling sibuk dengan urusan masing-masing dan tidak nampak perubahan dalaman badan saya. Kekal berdiri di dalam barisan tanpa meninggalkan troli, jejakkan tapak kaki rapat ke lantai, lepaskan nafas panjang, dan buktikan kepada otak bahawa saya selamat tanpa melarikan diri."
      },
      {
        id: "enclosed",
        icon: "🛗",
        shortLabel: "4. Lif / LRT / Saf Masjid",
        title: "Kad 4: Ruang Sesak Tertutup (Lif, Pengangkutan Awam, Saf Tengah Dewan/Masjid)",
        script:
          "Sensasi dada ketat dan rasa tidak puas menarik nafas ini ialah air hunger akibat pernafasan dada yang terlalu laju, bukan kerana ruang ini kehabisan oksigen. Paras oksigen darah saya kekal normal antara 98 hingga 100 peratus walaupun tekak terasa sempit. Hentikan cubaan menarik nafas besar secara paksa, hembus udara perlahan-lahan selama 6 saat, kendurkan otot perut, dan kekal di tempat ini sehingga rasa sempit beransur hilang."
      },
      {
        id: "nocturnal",
        icon: "🌙",
        shortLabel: "5. Terjaga 3 Pagi",
        title: "Kad 5: Terjaga Mengejut Tengah Malam (Nocturnal Panic Attack)",
        script:
          "Tersentak bangun daripada tidur dengan jantung berdegup kencang bukanlah serangan jantung malam, tetapi pelepasan adrenalin palsu semasa otak beralih fasa kitaran tidur. Jantung saya sihat dan mampu mengepam laju seperti sedang bersenam tanpa sebarang bahaya walaupun badan sedang berehat. Duduk bersandar seketika atau basuh muka dengan air sejuk selama 20 saat, JANGAN periksa nadi pada jam pintar atau mencari simptom di Google, dan baring semula sebaik nafas kembali teratur."
      }
    ],

    crClusters: [
      {
        id: "c_heart",
        title: "1. Jantung Laju & Dada Mencucuk",
        distortion: "Salah Tafsir: 'Salur darah tersumbat, saya kena serangan jantung!'",
        reality: "Fakta Anatomi: Sakit tajam yang berubah ikut tarikan nafas ialah ketegangan otot rusuk/dinding dada akibat adrenalin pada jantung yang sihat (bukan sakit menghimpit ACS).",
        socratic: "Soalan Sokratik: 'Apakah bukti perubatan objektif (ECG/darah)—bukan perasaan takut—yang menyokong ramalan ini?'"
      },
      {
        id: "c_faint",
        title: "2. Pening & Pandangan Berbalam",
        distortion: "Salah Tafsir: 'Saya bakal rebah pengsan di khalayak ramai!'",
        reality: "Fakta Fisiologi: Pengsan memerlukan kejatuhan tekanan darah mendadak, sedangkan serangan panik MENAIKKAN tekanan darah dan menghalang pitam.",
        socratic: "Soalan Sokratik: 'Berapa kali saya yakin 100% bakal pengsan sebelum ini, dan berapa kali ia benar-benar berlaku?'"
      },
      {
        id: "c_breath",
        title: "3. Sesak Nafas & Tekak Ketat (Globus)",
        distortion: "Salah Tafsir: 'Kerongkong saya bakal tertutup rapat dan saya akan lemas!'",
        reality: "Fakta Fisiologi: Oksigen darah kekal penuh 98–100%; rasa sempit berpunca daripada pengecutan sementara otot krikofaringeus leher (globus).",
        socratic: "Soalan Sokratik: 'Apakah punca biologi jinak bagi sensasi ini—adrenalin, otot tegang, atau kurang CO₂ akibat nafas cetek?'"
      },
      {
        id: "c_mind",
        title: "4. Derealisasi & Fikiran Berlumba",
        distortion: "Salah Tafsir: 'Otak saya bakal putus fius, hilang kawalan atau jadi gila!'",
        reality: "Fakta Psikiatri: Rasa asing seperti mimpi itu hanyalah refleks perlindungan saraf sementara akibat lonjakan adrenalin—ia TIDAK PERNAH bertukar menjadi psikosis.",
        socratic: "Soalan Sokratik: 'Jika sahabat baik yang disahkan sihat mengalami simptom tepat seperti ini, apa yang akan saya katakan kepadanya?'"
      }
    ],

    thoughtRecordSample: {
      loc: "15 Nov, 5:30 petang — Sangkut kesesakan jalan raya di lampu isyarat",
      vuln: "Tidur cuma 4 jam semalam, minum kopi pekat jam 3 petang, perut kosong",
      trigger: "Dada kiri tiba-tiba mencucuk tajam disusuli kebas kedua-dua belah jari tangan",
      catastrophe: "Salur darah jantung saya tersumbat; saya akan kena serangan jantung dan pengsan di atas stereng sekarang juga",
      initBelief: 90,
      initSuds: 9,
      safety: "Semak nadi di jam pintar 4 kali, buka kipas penyaman udara maksimum, hampir berhenti tepi jalan",
      evidence: "ECG & ujian darah disahkan normal sepenuhnya. Dalam 25 serangan serupa sebelum ini, 0 kali pengsan atau sakit jantung berlaku (ralat amigdala 100%).",
      physio: "Kopi + kurang tidur mencetuskan adrenalin; sakit tajam dada depan ialah otot interkostal tegang; kebas jari berpunca daripada hiperventilasi (kurang CO₂).",
      outcome: "Kekal memandu perlahan di lorong kiri; debaran dan kebas surut sendiri dalam 15 minit tanpa sebarang kerosakan organ.",
      finalBelief: 5,
      finalSuds: 3
    },

    familyGuide: [
      {
        icon: "🤝",
        tag: "Semasa Serangan Berlaku",
        title: "1. Jadi Sauh Tenang, Bukan Penyiasat Cemas",
        body: "Elakkan bertanya 10 soalan serentak atau berkata 'Jangan fikir bukan-bukan!'. Gunakan suara perlahan: 'Abang/Sayang/Mak ada di sini. Kita hembus nafas perlahan 6 saat sama-sama ya.' Jangan sesekali hulur beg kertas!"
      },
      {
        icon: "🚫",
        tag: "Semasa Fasa Pemulihan CBT",
        title: "2. Sokong Keberanian Tanpa Jadi 'Tongkat Kekal'",
        body: "Jika pasangan/anak mula mengelak semua pemanduan atau kedai, mengambil alih 100% urusan mereka selamanya akan mengukuhkan Agoraphobia. Raikan langkah kecil berperingkat—contohnya menemani dari jauh dahulu, kemudian biarkan mereka berjaya sendiri."
      },
      {
        icon: "🏆",
        tag: "Ukur Kejayaan Sebenar",
        title: "3. Puji Ketahanan, Bukan Ketiadaan Debaran",
        body: "Jangan tanya 'Dah tak berdebar ke?' setiap 10 minit (itu mengaktifkan imbasan badan!). Sebaliknya ucapkan: 'Hebat awak berjaya habiskan beratur tadi walaupun jantung tengah laju!'—itulah kemenangan sebenar yang memulihkan otak."
      }
    ],

    cbtFormats: [
      {
        name: "CBT Kumpulan Bersemuka (Face-to-Face Group)",
        stat: "SMD −0.47 vs TAU",
        badge: "Sangat Berkesan",
        badgeClass: "pill-safe",
        desc: "Papola et al. (2023, 74 RCT): Menormalkan pengalaman bersama pesakit lain & membina latihan pendedahan secara berstruktur."
      },
      {
        name: "CBT Individu Bersemuka (8–16 Sesi PCT)",
        stat: "SMD −0.43 (NMA Keseluruhan −0.67)",
        badge: "Gold Standard",
        badgeClass: "pill-safe",
        desc: "Protokol Barlow & Craske / David Clark: Satu-satunya psikoterapi yang kekal unggul selepas mengeluarkan kajian berisiko berat sebelah tinggi."
      },
      {
        name: "CBT Kendiri Jarak Jauh Berpandu (Guided Digital/Self-Help)",
        stat: "SMD −0.42 vs TAU",
        badge: "Setara Bersemuka!",
        badgeClass: "pill-info",
        desc: "Modul dalam talian/buku dengan bimbingan ahli terapi mencapai keberkesanan setara sesi bersemuka; manakala tanpa bimbingan (unguided, SMD −0.21) kurang berkesan."
      },
      {
        name: "Bergen 4-Day Treatment (B4DT — Eide et al., 2025)",
        stat: "72% – 90% Remisi Jangka Panjang",
        badge: "Inovasi Padat 4 Hari",
        badgeClass: "pill-warn",
        desc: "Terapi pendedahan intensif 4 hari berturut-turut yang mengajar pesakit 'condong masuk' ke arah ketidakselesaan fizikal tanpa tingkah laku keselamatan."
      }
    ],

    pharmScenarios: [
      {
        id: "cbt_first",
        badge: "Pilihan Pertama • Ringan–Sederhana",
        badgeClass: "pill-safe",
        title: "1. Pesakit Dewasa Stabil & Bersedia Latihan CBT",
        headline: "Mulakan CBT Berfokus Panik (Tanpa Ubat atau Berperingkat)",
        body: "NICE CG113 dan WFSBP v3 (2023) mengesyorkan CBT berfokus panik (bersemuka atau kendiri berpandu) sebagai rawatan barisan pertama dengan kesan perlindungan relaps paling kekal selepas tamat sesi.",
        guardrail: "Elakkan ubat penenang (benzodiazepin) semasa latihan pendedahan kerana ia menghalang proses pembelajaran semula (extinction learning) amigdala."
      },
      {
        id: "ssri_first",
        badge: "Barisan Pertama • Farmakoterapi",
        badgeClass: "pill-info",
        title: "2. Serangan Kerap / Teruk atau Komorbid Kemurungan",
        headline: "SSRI (Sertraline / Escitalopram Pilihan Utama) atau Venlafaxine XR ± CBT",
        body: "Antidepresan SSRI (Sertraline, Escitalopram, Citalopram, Fluoxetine, Paroxetine) dan SNRI (Venlafaxine XR) terbukti berkesan tinggi tanpa risiko ketagihan (Cochrane NMA Guaiana et al., 2023). Sertraline & Escitalopram digemari kerana interaksi enzim hati CYP450 rendah dan kurang kesan putus ubat.",
        guardrail: "PENTING: Mulakan pada dos separuh/rendah! Beritahu pesakit awal-awal bahawa rasa gelisah ringan minggu 1–2 adalah sementara; kesan penuh mengambil masa 2–6 minggu dan perlu diteruskan 6–24 bulan selepas pulih."
      },
      {
        id: "acute_bridge",
        badge: "Jambatan Krisis 2–4 Minggu Sahaja",
        badgeClass: "pill-warn",
        title: "3. Krisis Panik Melumpuhkan Sementara Tunggu SSRI Berkesan",
        headline: "SSRI Barisan Pertama + Benzodiazepin Jangka Sangat Pendek (2–4 Minggu)",
        body: "Walaupun Benzodiazepin (Clonazepam, Alprazolam, Lorazepam) bertindak dalam 15–60 minit dan mempunyai kadar keciciran akut terendah dalam ujian jangka pendek (RR 0.63), NICE CG113 melarang preskripsi rutin jangka panjang.",
        guardrail: "Tetapkan tarikh pengurangan dos (tapering) sejak hari pertama. Penggunaan berbulan-bulan menyebabkan tolerans, kebergantungan fizikal, gangguan memori, dan keresahan lantunan (rebound)."
      },
      {
        id: "refractory",
        badge: "Barisan Kedua / Ketiga & Inovasi",
        badgeClass: "pill-danger",
        title: "4. Tidak Serasi ≥2 Ubat Pertama / Rujukan Pakar Psikiatri",
        headline: "Tukar SSRI/SNRI Kedua → TCA (Clomipramine/Imipramine) atau Rujukan Pakar",
        body: "Jika gagal 2 ubat barisan pertama, pilihan barisan kedua termasuk TCA (Clomipramine, Imipramine) atau Mirtazapine. Ubat seperti Buspirone dan Beta-blocker (Propranolol) TIDAK berkesan merawat punca kecelaruan panik teras. Penyelidikan baharu sedang menguji Semburan Hidung Amiloride (penyekat saluran asid ASIC1a/2).",
        guardrail: "TCA memerlukan saringan ECG kerana risiko konduksi jantung dan kesan antikolinergik; elakkan pada warga emas atau pesakit berisiko."
      }
    ],

    pharmMatrix: [
      {
        tier: "First-line",
        tierLabel: "Barisan Pertama",
        agents: "SSRI (Sertraline, Escitalopram, Citalopram, Fluoxetine, Paroxetine) & SNRI (Venlafaxine XR)",
        evidence: "Cochrane NMA 2023: RR respons akut 0.82 (SSRI) & 0.86 (SNRI) lwn plasebo; profil keselamatan jangka panjang terbaik.",
        notes: "Mula dos rendah; kesan penuh 2–6 minggu; kekalkan 6–24 bulan. Paroxetine mempunyai kesan putus ubat (withdrawal) lebih ketara jika dihentikan mengejut."
      },
      {
        tier: "Second-line",
        tierLabel: "Barisan Kedua",
        agents: "TCA (Clomipramine, Imipramine), Mirtazapine, Reboxetine",
        evidence: "Berkesan setara SSRI (RR 0.74), tetapi kadar kesan sampingan lebih tinggi.",
        notes: "Mulut kering, sembelit, kabur mata, mengantuk & risiko aritmia jantung; bahaya jika terlebih dos."
      },
      {
        tier: "Bridge",
        tierLabel: "Krisis Singkat (2–4 Minggu)",
        agents: "Benzodiazepin (Clonazepam, Alprazolam, Lorazepam, Diazepam)",
        evidence: "Mula bertindak 15–60 minit; tolerabiliti akut tinggi tetapi risiko kebergantungan tinggi.",
        notes: "Dilarang untuk rawatan tunggal jangka panjang (NICE CG113); melemahkan keberkesanan latihan CBT."
      },
      {
        tier: "Discouraged",
        tierLabel: "Tidak Disyorkan / Inovasi",
        agents: "TIDAK BERKESAN: Buspirone, Beta-blocker (Propranolol) • INOVASI KAJIAN: Semburan Hidung Amiloride",
        evidence: "Buspirone mempunyai kadar keciciran lebih teruk daripada plasebo; Propranolol hanya memperlahankan nadi tanpa memadamkan kitaran panik.",
        notes: "Amiloride intranasal (dalam pembangunan klinikal) menyekat saluran asid ASIC1a/ASIC2 di otak secara pantas tanpa ketagihan."
      }
    ],

    analogies: [
      {
        icon: "🚨",
        tag: "Analogi 1 • Kenapa Badan Mengamuk Tanpa Bahaya",
        title: "Penggera Asap Berbunyi Kerana Wap Roti Bakar",
        layman:
          "Bayangkan penggera kebakaran canggih yang berbunyi nyaring dan memancutkan air bomba hanya kerana anda membakar roti di dapur. Penggera itu <strong>tidak rosak</strong>—ia cuma terlalu sensitif! Serangan panik ialah sistem keselamatan badan yang berfungsi terlalu rajin pada waktu yang salah.",
        clinical:
          "Menggambarkan hiper-reaktiviti amigdala-insulokortikal dan kemoreseptor ASIC1a/CO₂ terhadap rangsangan interoseptif jinak tanpa patologi kardiopulmonari."
      },
      {
        icon: "🌊",
        tag: "Analogi 2 • Rahsia 'Accept & Float'",
        title: "Perangkap Jari Buluh & Ombak Laut 10 Minit",
        layman:
          "Jika anda ditarik arus atau memakai perangkap jari buluh, makin kuat anda meronta melawan ('Jangan panik! Jangan berdebar!'), makin ketat ia mencengkam. Tetapi bila anda <strong>terima dan terapung tenang</strong> mengikut alunan ombak, adrenalin kehabisan bahan bakar sendiri dalam 10–20 minit.",
        clinical:
          "Menjelaskan paradoks penekanan kognitif: perlawanan sekunder mengekalkan pengaktifan simpatetik, manakala penerimaan mengembalikan kawalan perencatan vmPFC dan tonus vagal."
      },
      {
        icon: "⌚",
        tag: "Analogi 3 • Kenapa 'Safety Behavior' Merugikan",
        title: "Tangkal Halau Harimau Di Tengah Bandar",
        layman:
          "Jika seorang kawan menepuk tangan setiap minit di pusat beli-belah sambil berkata 'Tengok, sebab aku tepuk tanganlah tiada harimau datang!', dia takkan pernah tahu bahawa harimau memang tiada di situ. Begitulah tabiat menggenggam botol air, duduk tepi pintu keluar, atau menyemak jam pintar!",
        clinical:
          "Menerangkan model Salkovskis: tingkah laku keselamatan menghalang pembuktian salah (<em>disconfirmation</em>) terhadap ramalan katastrofik semasa pendedahan."
      }
    ],

    quizScenarios: [
      {
        id: "q1",
        scenario:
          "1. Aina (26 tahun) sedang beratur membeli makanan apabila jantungnya berdebar kencang, nafas tercungap-cungap, jari dan bibirnya rasa kebas mencucuk, serta dia takut akan pengsan. Apakah punca sebenar rasa kebas dan kepala ringan tersebut?",
        options: [
          "Tanda awal strok ringan (TIA) akibat saluran darah tersumbat",
          "Nafas terlalu laju membuang terlalu banyak CO₂ (hipokapnia), menyebabkan pengecutan ringan sementara salur darah",
          "Tekanan darah menjunam rendah secara merbahaya",
          "Kekurangan oksigen teruk di dalam paru-paru"
        ],
        correctIndex: 1,
        explanation:
          "Tepat! Semasa hiperventilasi, oksigen darah sebenarnya tinggi/normal, tetapi CO₂ terbuang berlebihan (hipokapnia & alkalosis respiratori), mencetuskan kebas jari/bibir dan rasa melayang sementara—bukan strok dan tekanan darah sebenarnya meningkat!"
      },
      {
        id: "q2",
        scenario:
          "2. Encik Rahim (54 tahun, penghidap darah tinggi & perokok) mengalami sakit dada berat menghimpit di tengah dada buat PERTAMA KALI semasa naik tangga, menjalar ke lengan kiri dan rahang, dan tidak reda selepas 20 minit berehat. Apakah tindakan paling tepat?",
        options: [
          "Suruh beliau bernafas di dalam beg kertas selama 10 minit",
          "Anggap ia serangan panik biasa dan tunggu sehingga esok pagi",
          "Hubungi 999 / bawa ke Jabatan Kecemasan segera untuk saringan ECG & jantung (ACS)",
          "Berikan secawan kopi panas untuk menenangkan saraf"
        ],
        correctIndex: 2,
        explanation:
          "Sangat penting! Serangan kali pertama selepas umur 45 tahun dengan sakit dada menghimpit menjalar ke lengan kiri/rahang yang tidak reda selepas 20 minit adalah Tanda Amaran Merah (Red Flag) sindrom koronari akut (ACS) sehingga dibuktikan sebaliknya melalui ECG dan ujian darah."
      },
      {
        id: "q3",
        scenario:
          "3. Rakan pejabat anda sedang mengalami serangan panik yang disahkan doktor sebelum ini. Beliau duduk menggigil dan bernafas laju. Apakah cara bantuan yang BETUL?",
        options: [
          "Tekapkan beg kertas rapat ke mulut dan hidungnya",
          "Jerit 'Jangan mengada-ngada, tarik nafas dalam-dalam cepat!'",
          "Kekal tenang, guna ayat pendek, pandu nafas perlahan 4-2-6 bersama-sama, atau tawarkan pek sejuk di pipi/mata",
          "Paksa beliau lari keluar bangunan serta-merta setiap kali berdebar"
        ],
        correctIndex: 2,
        explanation:
          "Betul! Ayat pendek yang tenang, memandu hembusan nafas panjang (4-2-6), dan pek sejuk (Refleks Selaman Mamalia) membantu mengaktifkan saraf vagus dengan selamat. Jangan sesekali guna beg kertas!"
      },
      {
        id: "q4",
        scenario:
          "4. Doktor memulakan ubat Sertraline (SSRI Barisan Pertama) untuk pesakit Panic Disorder. Apakah maklumat pendidikan paling penting pada minggu pertama?",
        options: [
          "Ubat ini bertindak serta-merta dalam 15 minit dan boleh diambil bila perlu sahaja",
          "Rasa sedikit gelisah ringan pada minggu 1–2 adalah sementara; kesan penuh mengambil 2–6 minggu dan jangan berhenti mengejut bila dah lega",
          "SSRI menyebabkan ketagihan teruk jika diambil melebihi 2 minggu",
          "Pesakit wajib mengelak keju dan makanan diperam seperti ubat MAOI"
        ],
        correctIndex: 1,
        explanation:
          "Tepat sekali! SSRI bukan ubat penenang segera dan tidak menyebabkan ketagihan, tetapi memerlukan 2–6 minggu untuk menstabilkan reseptor saraf dan perlu diteruskan 6–24 bulan selepas pulih untuk mencegah relaps."
      },
      {
        id: "q5",
        scenario:
          "5. Mengapakah tabiat sentiasa menyemak kadar nadi di jam pintar dan hanya berani memandu jika ditemani seseorang akhirnya MEMBURUKKAN kecelaruan panik?",
        options: [
          "Kerana cahaya skrin jam pintar merosakkan mata",
          "Kerana 'Safety Behaviors' ini menipu otak bahawa situasi itu memang berbahaya dan anda hanya selamat kerana adanya tongkat tersebut",
          "Kerana jam pintar merendahkan paras serotonin darah",
          "Tiada masalah—ia digalakkan seumur hidup oleh ahli terapi CBT"
        ],
        correctIndex: 1,
        explanation:
          "Benar! Dalam CBT, menghapuskan 'Safety Behaviors' secara berperingkat adalah kunci utama supaya otak mendapat bukti nyata bahawa anda kekal selamat walaupun tanpa jam pintar atau peneman."
      },
      {
        id: "q6",
        scenario:
          "6. Semasa memandu dalam kesesakan jalan raya dengan nadi 130 bpm (Hot Cognition), apakah cara BETUL menggunakan Skrip Coping Card dan Borang Thought Record?",
        options: [
          "Berhenti di tengah jalan untuk mengisi borang jadual 10 langkah dengan panjang lebar",
          "Ulang baca Coping Card 50 kali seminit seperti mantra terdesak supaya debaran hilang serta-merta",
          "Baca skrip Coping Card maksimum 2 kali sambil kekal memandu tenang; isi Borang Audit Thought Record hanya 15–60 minit SELEPAS ribut reda",
          "Ucapkan ayat motivasi kabur 'Semuanya indah dan tenang' tanpa fakta biologi"
        ],
        correctIndex: 2,
        explanation:
          "Tepat sekali! Semasa kemuncak panik, kapasiti logik korteks prefrontal menurun >50%: guna skrip fakta pendek (maksimum 2x bacaan supaya tidak jadi safety behavior) + kekal memandu. Audit mendalam (Cold Cognition) hanya dibuat 15–60 minit selepas serangan surut."
      },
      {
        id: "q7",
        scenario:
          "7. Semasa menjalankan sesi latihan terancang Pendedahan Interoseptif (contohnya bernafas ikut straw halus selama 60 saat di rumah), bilakah anda patut melakukan pernafasan relaksasi 4-2-6?",
        options: [
          "Sebaik sahaja rasa cemas mula timbul pada saat ke-15",
          "JANGAN buat nafas 4-2-6 semasa sesi latihan IE! Habiskan tempoh penuh (+15s) tanpa sebarang tongkat supaya otak membina memori Inhibitory Learning tulen",
          "Ambil sebiji Alprazolam 30 minit sebelum memulakan latihan straw",
          "Hentikan latihan serta-merta dan buka kipas maksimum"
        ],
        correctIndex: 1,
        explanation:
          "Sangat bijak! Nafas 4-2-6 ialah alat kecemasan luar jangka, BUKAN semasa sesi latihan IE. Mencampuradukkan relaksasi atau ubat penenang semasa latihan IE menipu amigdala kononnya anda hanya terselamat kerana sempat mengawal nafas."
      }
    ]
  },

  // ==========================================================================
  // ENGLISH (EN)
  // ==========================================================================
  en: {
    spectrumCards: [
      {
        id: "attack",
        badge: "Symptom Episode • ICD-11 MB23.H",
        badgeClass: "pill-info",
        stat: "~13% of Adults Experience One",
        title: "1. Panic Attack (The Acute Surge)",
        layman:
          "An abrupt wave of intense fear and dramatic physical sensations that peaks within minutes. By itself, it is <strong>not a mental illness</strong>—anyone can experience one due to heavy caffeine, exhaustion, or acute life stress.",
        clinical:
          "A non-codable clinical specifier in DSM-5-TR (ICD-11: <code>MB23.H</code>). Defined as an abrupt surge of intense fear or discomfort reaching a peak within minutes with <strong>≥4 of 13 autonomic/cognitive symptoms</strong>; may be expected (<em>cued</em>) or <em>unexpected</em>."
      },
      {
        id: "disorder",
        badge: "Clinical Diagnosis • ICD-11 6B01",
        badgeClass: "pill-warn",
        stat: "1.1% – 4.7% Lifetime (~10% Primary Care)",
        title: "2. Panic Disorder (Recurrent Cycle)",
        layman:
          "Diagnosed by a clinician when unexpected 'out-of-the-blue' panic attacks repeat, followed by <strong>at least 1 month</strong> of persistent worry about having another attack ('fear of fear') or changing daily routines to avoid triggers.",
        clinical:
          "An anxiety disorder diagnosis (DSM-5-TR / ICD-11 <code>6B01</code>; ~2:1 female-to-male ratio). Requires recurrent unexpected panic attacks + ≥1 month of persistent anticipatory concern or maladaptive behavioral change, after excluding organic/substance causes."
      },
      {
        id: "agoraphobia",
        badge: "Distinct DSM-5-TR Diagnosis",
        badgeClass: "pill-danger",
        stat: "Affects ~25% in Panic Disorder",
        title: "3. Agoraphobia (Avoidance Trap)",
        layman:
          "When someone begins avoiding <strong>2 or more everyday settings</strong>—such as driving on highways, public transit, elevators, supermarkets, or leaving home alone—for fear that escape would be hard or help unavailable if panic strikes.",
        clinical:
          "Coded as an independent diagnosis in DSM-5-TR (separated from DSM-IV linkage). Marked fear or avoidance of ≥2 of 5 domains (public transit, open spaces, enclosed places, queues/crowds, outside home alone) lasting ≥6 months."
      }
    ],

    neuroHotspots: [
      {
        id: "amygdala",
        title: "1. Amygdala, vmPFC & Brain Acid Sensors",
        subtitle: "An Over-Sensitive Smoke Detector",
        badge: "Threat Alarm Hub",
        color: "#ef4444",
        layman:
          "Your amygdala acts like a smoke alarm. During panic, it misreads a harmless body shift (like a fast pulse from coffee or stairs) as mortal danger and hits the emergency siren, while your logical 'brake pedal' (prefrontal cortex) briefly goes offline.",
        clinical:
          "Dysregulation across the amygdala-centered fear network, BNST, hippocampus, and blunted ventromedial prefrontal cortex (vmPFC) inhibition. PET studies show reduced fronto-limbic <strong>GABA-A</strong> and <strong>5-HT1A</strong> binding, alongside hypersensitive <strong>ASIC1a/ASIC2</strong> acid-sensing ion channels triggered by extracellular pH shifts."
      },
      {
        id: "lungs",
        title: "2. Lungs & Hyperventilation (Low CO₂ / Hypocapnia)",
        subtitle: "Why You Feel 'Air Hunger' Despite Full Oxygen",
        badge: "Core Physiology #1",
        color: "#38bdf8",
        layman:
          "Even though you feel like you can't get a deep breath, your blood oxygen is actually <strong>98%–100% full</strong>! Fast, shallow chest breathing blows off too much carbon dioxide (CO₂), making your blood temporarily slightly alkaline.",
        clinical:
          "Subclinical tidal-volume instability and dropping end-tidal pCO₂ can begin up to <strong>50 minutes prior</strong> to conscious panic onset (Meuret et al.). Acute hyperventilation drives <strong>hypocapnia</strong> and transient <strong>respiratory alkalosis</strong> without hypoxia."
      },
      {
        id: "brainVessels",
        title: "3. Cerebral Vessels & Nerves (Tingling & Unreality)",
        subtitle: "Why Fingers Tingle & The Room Feels Like a Dream",
        badge: "Not a Stroke / Not Psychosis",
        color: "#a78bfa",
        layman:
          "Low blood CO₂ causes blood vessels in the brain to narrow slightly for a few minutes. That exact harmless shift creates lightheadedness, blurry vision, dream-like unreality (<em>derealization</em>), and tingling in your fingers and lips—<strong>not a stroke or 'going crazy'!</strong>",
        clinical:
          "Respiratory alkalosis induces transient mild cerebral vasoconstriction and shifts ionized serum calcium binding, directly producing acral/perioral paresthesias, dizziness, and transient protective derealization/depersonalization."
      },
      {
        id: "heart",
        title: "4. Heart & Sympathetic Chain (T1–L2)",
        subtitle: "Racing Pulse & Why True Fainting Almost Never Happens",
        badge: "Blood-Pressure Paradox",
        color: "#f59e0b",
        layman:
          "Adrenaline speeds up your heart to pump fuel to your muscles. People often fear passing out—yet fainting happens when blood pressure <em>drops</em>, whereas a panic attack <strong>raises blood pressure</strong>! A healthy heart handles this surge safely.",
        clinical:
          "Hypothalamic-sympathetic projections (T1–L2) and adrenal medullary catecholamine release elevate heart rate and arterial blood pressure. True vasovagal syncope is virtually absent in panic disorder (except in blood-injection-injury phobia); actual collapse warrants cardiac/neurologic workup."
      },
      {
        id: "throatChest",
        title: "5. Throat Muscle (Globus) & Chest Wall",
        subtitle: "The Choking Illusion & Localized Sharp Chest Tightness",
        badge: "Muscle Tension",
        color: "#2dd4bf",
        layman:
          "Adrenaline tightens throat muscles, creating the scary illusion of a 'lump in the throat' even though your airway is wide open. Meanwhile, rapid upper-chest breathing strains rib muscles, causing sharp, localized chest soreness.",
        clinical:
          "Cricopharyngeal muscle hypertonicity produces benign <em>globus sensation</em> with normal airway patency. Accessory and intercostal muscle overuse causes localized anterior chest wall discomfort."
      },
      {
        id: "gutHangover",
        title: "6. Gut Pause & The 'Adrenaline Hangover'",
        subtitle: "Nausea During the Peak & Exhaustion Afterward",
        badge: "Parasympathetic Brake",
        color: "#10b981",
        layman:
          "To prepare you to sprint from danger, your body pauses stomach digestion—causing sudden nausea, butterflies, or urgency. Once the 10–20 minute wave peaks, your parasympathetic 'rest brake' kicks in, leaving you tired, chilly, and sleepy.",
        clinical:
          "Splanchnic vasoconstriction and halted GI motility trigger acute nausea/abdominal distress. Post-peak catecholamine clearance and parasympathetic vagal rebound account for post-attack exhaustion and chills."
      }
    ],

    wavePresets: {
      calm: {
        label: "1. Balanced Baseline State",
        hr: "72 bpm",
        co2: "40 mmHg (Normal)",
        pfc: "Online & Regulating",
        adrenaline: 12,
        co2Level: 82,
        summary:
          "Your prefrontal cortex calmly regulates the amygdala. Steady diaphragmatic breathing keeps arterial CO₂ and brain pH balanced."
      },
      caffeineLoop: {
        label: "2. Clark's Catastrophic Loop (Coffee / Stress)",
        hr: "118 bpm",
        co2: "31 mmHg (Dropping)",
        pfc: "Hijacked by Alarm",
        adrenaline: 78,
        co2Level: 48,
        summary:
          "A benign sensation (e.g., rapid pulse after strong coffee) is misread catastrophically ('I'm having a heart attack!') → Amygdala fires adrenaline → Symptoms double → Reinforces the false belief!"
      },
      hyperventilation: {
        label: "3. Peak Surge & Hyperventilation",
        hr: "136 bpm",
        co2: "24 mmHg (Hypocapnia)",
        pfc: "Max Siren Active",
        adrenaline: 96,
        co2Level: 24,
        summary:
          "Intensity peaks within ~10 minutes. Over-breathing blows off CO₂ → mild respiratory alkalosis → tingling hands/lips & derealization. Though terrifying, this adrenaline wave ALWAYS peaks and falls."
      },
      vagalRecovery: {
        label: "4. 'Accept & Float' + 4-2-6 Vagal Recovery",
        hr: "80 bpm (Settling)",
        co2: "38 mmHg (Restored)",
        pfc: "Back Online",
        adrenaline: 26,
        co2Level: 76,
        summary:
          "Stopping mental resistance and extending your exhale (6 seconds) stimulates the vagus nerve, restores blood CO₂, and clears dizziness and tingling within 15–20 minutes."
      }
    },

    dsmSymptoms: [
      { id: "s1", group: "cardio", label: "1. Palpitations, pounding heart, or accelerated heart rate" },
      { id: "s2", group: "cardio", label: "2. Sweating (cold or hot sweat)" },
      { id: "s3", group: "cardio", label: "3. Trembling or shaking" },
      { id: "s4", group: "cardio", label: "4. Shortness of breath or smothering sensation (air hunger)" },
      { id: "s5", group: "cardio", label: "5. Feelings of choking (globus sensation)" },
      { id: "s6", group: "cardio", label: "6. Chest pain or discomfort" },
      { id: "s7", group: "neuro", label: "7. Nausea or abdominal distress" },
      { id: "s8", group: "neuro", label: "8. Feeling dizzy, unsteady, light-headed, or faint" },
      { id: "s9", group: "neuro", label: "9. Chills or heat sensations (hot flashes)" },
      { id: "s10", group: "neuro", label: "10. Paresthesias (numbness or tingling in fingers, feet, or lips)" },
      { id: "s11", group: "cog", label: "11. Derealization (unreality) or depersonalization (detachment)" },
      { id: "s12", group: "cog", label: "12. Fear of losing control or 'going crazy'" },
      { id: "s13", group: "cog", label: "13. Fear of dying" }
    ],

    diffRows: [
      {
        feature: "Onset Pattern",
        panic: "Abrupt, unannounced surge (including waking from non-REM sleep in 25–33% of patients)",
        anxiety: "Builds gradually in response to ongoing stressors or worries",
        acs: "Sudden or triggered by physical exertion/stress; may also occur at rest"
      },
      {
        feature: "Time to Peak",
        panic: "Reaches peak within ≤10 minutes; typically subsides within 20–30 minutes",
        anxiety: "Persists at a fluctuating level for hours, days, or weeks",
        acs: "Continuous and often worsens progressively beyond 20 minutes"
      },
      {
        feature: "Chest Pain Quality",
        panic: "Sharp, stabbing, localized to the anterior chest wall",
        anxiety: "Mild tightness or generalized muscle tension",
        acs: "Heavy, crushing, squeezing pressure or fullness in the center of the chest"
      },
      {
        feature: "Pain Radiation",
        panic: "Stays localized in front chest; accompanied by bilateral finger/lip tingling",
        anxiety: "No classic cardiac radiation (often neck/shoulder soreness)",
        acs: "Radiates to the left arm, shoulder, neck, jaw, or back"
      },
      {
        feature: "Response to Breathing",
        panic: "Gradually eases within 15–20 minutes with slow, extended exhales",
        anxiety: "Improves when stressor resolves or attention shifts",
        acs: "Does NOT resolve with rest or paced breathing — call 999 / emergency immediately!"
      }
    ],

    caffeineItems: [
      { id: "kopi_kaw", name: "Large Americano / Strong Kopi O", mg: 150 },
      { id: "espresso", name: "Single Espresso / Canned Milk Coffee", mg: 85 },
      { id: "teh_tarik", name: "Teh Tarik / Strong Black Tea", mg: 55 },
      { id: "matcha", name: "Matcha Latte / Green Tea", mg: 65 },
      { id: "energy", name: "Energy Drink Can", mg: 160 },
      { id: "preworkout", name: "Sports Pre-Workout Scoop", mg: 250 },
      { id: "cola", name: "Cola Soft Drink (330ml)", mg: 35 },
      { id: "cold_med", name: "Decongestant Cold Tablet (Pseudoephedrine)*", mg: 120 }
    ],

    mythsAndTraps: [
      {
        badge: "Trap #1 • Smartwatches",
        badgeClass: "pill-warn",
        title: "Compulsive Pulse & ECG Checking (Safety Behavior)",
        myth: "Myth: 'Checking my smartwatch heart rate every 15 minutes keeps me calm.'",
        truth: "Clinical Reality: Compulsive body-scanning trains your amygdala to treat normal heartbeats as threats and prevents your brain from learning you are safe without the watch."
      },
      {
        badge: "Physical Hazard • Avoid!",
        badgeClass: "pill-danger",
        title: "The Paper Bag Breathing Myth",
        myth: "Movie Myth: 'Always make someone having a panic attack breathe into a paper bag.'",
        truth: "Medical Fact: AVOID paper bags! Rebreathing lowers oxygen dangerously if the person is actually having an acute asthma attack, pulmonary embolism, or cardiac event. Guide 4-2-6 breathing instead."
      },
      {
        badge: "Fainting Paradox",
        badgeClass: "pill-safe",
        title: "'I Feel Lightheaded—I'm About to Faint!'",
        myth: "Myth: 'Feeling dizzy during panic means I will black out on the floor.'",
        truth: "Physiological Fact: Fainting requires a sudden DROP in blood pressure. Panic surges RAISE blood pressure and heart rate—making true fainting nearly impossible (except in blood/needle phobia)."
      },
      {
        badge: "Losing Sanity Myth",
        badgeClass: "pill-info",
        title: "'Everything Feels Unreal—Am I Going Crazy?'",
        myth: "Myth: 'Derealization means I am losing my mind or developing schizophrenia.'",
        truth: "Psychiatric Fact: Derealization is a harmless, temporary neural buffer caused by adrenaline and low CO₂. A panic attack NEVER turns into psychosis or schizophrenia."
      }
    ],

    interoceptiveLabs: [
      {
        id: "straw",
        title: "1. Narrow Straw Breathing",
        method: "Breathe through a thin straw by mouth with nostrils pinched",
        duration: 60,
        sensation: "Shortness of breath, smothering / air hunger",
        contra: "Contraindication: Asthma, chronic lung disease",
        hypothesis: "If I breathe through a straw for 60s, I will suffocate or pass out (85% belief)",
        disconfirms: "Proves restricted-breath sensations neither close the airway nor drop blood oxygen.",
        sudsDefault: 70
      },
      {
        id: "hypervent",
        title: "2. Intentional Hyperventilation (30/min)",
        method: "Deep, rapid breaths in and out (~1 breath every 2 seconds)",
        duration: 60,
        sensation: "Lightheadedness, finger/lip tingling, derealization",
        contra: "Contraindication: Epilepsy, pregnancy, asthma",
        hypothesis: "If my hands tingle and room feels unreal, I'll have a stroke or go crazy (80% belief)",
        disconfirms: "Proves tingling and unreality are harmless, reversible CO₂ shifts.",
        sudsDefault: 75
      },
      {
        id: "spin",
        title: "3. Office Chair Spin (1 rev / 3s)",
        method: "Sit safely in a swivel chair and spin steadily",
        duration: 60,
        sensation: "Spinning dizziness & mild nausea",
        contra: "Contraindication: Severe inner-ear / vestibular disorder",
        hypothesis: "If I feel dizzy, I will lose control and collapse (75% belief)",
        disconfirms: "Proves spinning sensations settle naturally without collapsing.",
        sudsDefault: 60
      },
      {
        id: "headshake",
        title: "4. Rapid Head Turn (Eyes Open)",
        method: "Turn head briskly side-to-side for 30 seconds with eyes open",
        duration: 30,
        sensation: "Lightheadedness & brief visual blur",
        contra: "Contraindication: Cervical spine / neck injury",
        hypothesis: "Blurry vision means I am about to faint right now (70% belief)",
        disconfirms: "Proves brief visual lag is harmless vestibular adaptation, never syncope.",
        sudsDefault: 55
      },
      {
        id: "jog",
        title: "5. Brisk High-Knee Jog in Place",
        method: "Lift knees briskly without stopping",
        duration: 60,
        sensation: "Pounding heart & warm sweat",
        contra: "Contraindication: Active cardiac disease, uncontrolled hypertension",
        hypothesis: "A racing heart will trigger sudden cardiac arrest (85% belief)",
        disconfirms: "Proves a healthy heart is built to pump rapidly and recover safely.",
        sudsDefault: 65
      },
      {
        id: "breathhold",
        title: "6. Full Breath Hold",
        method: "Take a normal breath and hold completely",
        duration: 35,
        sensation: "Chest tightness & choking reflex",
        contra: "Contraindication: Cardiac disease, pregnancy",
        hypothesis: "Chest tightness means my breathing will stop completely (75% belief)",
        disconfirms: "Proves automatic brainstem respiratory reflexes always resume smoothly.",
        sudsDefault: 65
      },
      {
        id: "muscletension",
        title: "7. Full-Body Isometric Tension",
        method: "Tense arms, abdomen, shoulders & legs simultaneously",
        duration: 60,
        sensation: "Trembling & anterior chest-wall tightness",
        contra: "Contraindication: Uncontrolled hypertension",
        hypothesis: "Body trembling means I am losing neurological control (70% belief)",
        disconfirms: "Proves shaking and chest tightness are benign skeletal muscle fatigue.",
        sudsDefault: 55
      },
      {
        id: "stare",
        title: "8. Unblinking Mirror / Wall Dot Gaze",
        method: "Stare steadily into your own eyes in a mirror without shifting focus",
        duration: 90,
        sensation: "Depersonalization, unfamiliarity / unreality",
        contra: "Contraindication: None (safe for everyone)",
        hypothesis: "Feeling detached means I am losing sanity or developing psychosis (80% belief)",
        disconfirms: "Proves perceptual strangeness is harmless visual adaptation, never psychosis.",
        sudsDefault: 60
      },
      {
        id: "globus_hot",
        title: "9. Bonus: Swallow 6x / Warm Jacket",
        method: "Swallow dryly 5–6x rapidly OR wear a thick jacket in a fan-off room",
        duration: 60,
        sensation: "Throat lump (globus) or sudden heat waves (hot flashes)",
        contra: "Contraindication: Avoid extreme heat if dehydrated",
        hypothesis: "My throat is closing shut / heat wave means imminent collapse (75% belief)",
        disconfirms: "Proves throat muscle fatigue and warmth are benign sensations.",
        sudsDefault: 60
      }
    ],

    ieMistakes: [
      {
        title: "1. Mixing 4-2-6 Emergency Breathing Into IE Training",
        desc: "4-2-6 breathing is for unexpected acute surges. During planned IE trials, DO NOT use 4-2-6, fans, water, or smartwatches—so your brain learns you are safe WITHOUT any crutch."
      },
      {
        title: "2. Stopping Right as Fear Peaks (at 15 Seconds)",
        desc: "Quitting early reinforces avoidance! Complete the full duration (even push +15s past initial fear) and repeat 3–5 rounds with 60s rest."
      },
      {
        title: "3. Taking Sedatives (Alprazolam) Before Practicing",
        desc: "Benzodiazepines blunt neural signaling and block the prefrontal cortex from encoding lasting Inhibitory Learning safety memories."
      },
      {
        title: "4. Practicing Only When Rested Alone in Your Bedroom",
        desc: "Once home SUDS drops <2/10, bridge into real settings (e.g., climb stairs briskly right before taking an elevator, or sip half a coffee before shopping)."
      }
    ],

    copingCards: [
      {
        id: "traffic",
        icon: "🚗",
        shortLabel: "1. Traffic / Red Light",
        title: "Card 1: Driving in Traffic Jams or Stopped at Red Lights",
        script:
          "My racing heart and tingling hands right now come from an adrenaline surge and gripping the steering wheel too tightly—NOT impending fainting. Fainting requires a sudden drop in blood pressure, whereas panic RAISES blood pressure and sharpens my reflexes. Drop my shoulders, loosen my grip, exhale slowly for 6 seconds, focus on the bumper ahead, and drive smoothly when the light turns green—this wave will subside within 10 minutes."
      },
      {
        id: "highway",
        icon: "🛣️",
        shortLabel: "2. Highway / Bridge",
        title: "Card 2: Driving on a Highway or Bridge Far From an Exit",
        script:
          "Feeling trapped and noticing 'tunnel vision' is simply my eyes narrowing focus during a false amygdala alarm—NOT a sign I will lose control of the car. My hands and feet still control the wheel and pedals at 100% capacity, and every single past episode proves I drive safely through panic. Hold a steady speed in the left/cruising lane without swerving onto the shoulder, and let this adrenaline burn off naturally."
      },
      {
        id: "crowd",
        icon: "🛒",
        shortLabel: "3. Supermarket / Queue",
        title: "Card 3: Bright Crowded Places & Long Queues (Supermarket, Bank, Event)",
        script:
          "Feeling lightheaded and seeing the bright aisle look dream-like is temporary derealization from sensory overload—NOT a sign of collapsing or losing my mind. People around me are busy with their own errands and cannot see my internal adrenaline. Stay in line without abandoning my cart, plant both feet flat on the floor, lengthen my exhale, and let my brain witness that I am safe without fleeing."
      },
      {
        id: "enclosed",
        icon: "🛗",
        shortLabel: "4. Lift / Train / Hall",
        title: "Card 4: Enclosed Spaces (Elevator, Train/Bus, Middle Row of Hall or Mosque)",
        script:
          "Chest tightness and 'air hunger' come from rapid upper-chest breathing—NOT because this room is running out of oxygen. My blood oxygen remains 98% to 100% full even when my throat feels tight. Stop forcing giant gulps of air, exhale gently for 6 seconds, soften my belly muscles, and stay right here until the tightness fades."
      },
      {
        id: "nocturnal",
        icon: "🌙",
        shortLabel: "5. Waking at 3 AM",
        title: "Card 5: Jolting Awake at Night (Nocturnal Panic Attack)",
        script:
          "Waking abruptly with a pounding heart is NOT a midnight heart attack—it is a harmless misfire of adrenaline during a non-REM sleep-stage transition. My heart is strong and built to beat fast safely even while resting. Sit propped up or splash cool water on my face for 20 seconds, DO NOT check my smartwatch pulse or Google symptoms, and lie back down once my breathing settles."
      }
    ],

    crClusters: [
      {
        id: "c_heart",
        title: "1. Racing Heart & Sharp Chest Twinge",
        distortion: "Misinterpretation: 'My coronary artery is blocked—I'm having a heart attack!'",
        reality: "Anatomical Fact: Sharp twinges that shift with inhalation come from tight intercostal rib muscles during an adrenaline surge in a healthy heart (unlike crushing, radiating ACS pain).",
        socratic: "Socratic Check: 'What objective medical evidence (ECG/labs)—not anxious emotion—supports this prediction right now?'"
      },
      {
        id: "c_faint",
        title: "2. Lightheadedness & Blurred Vision",
        distortion: "Misinterpretation: 'I am seconds away from blacking out in public!'",
        reality: "Physiological Fact: Fainting requires a sudden drop in blood pressure; panic attacks RAISE blood pressure and actively prevent syncope.",
        socratic: "Socratic Check: 'How many times was I 100% convinced I would faint before, and how many times did I actually lose consciousness?'"
      },
      {
        id: "c_breath",
        title: "3. Air Hunger & Tight Throat (Globus)",
        distortion: "Misinterpretation: 'My throat is closing up and I will suffocate!'",
        reality: "Physiological Fact: Blood oxygen stays 98–100% full; throat tightness is temporary cricopharyngeal muscle tension (globus) with a wide-open airway.",
        socratic: "Socratic Check: 'What benign biological mechanism explains this—adrenaline, tight neck muscle, or low CO₂ from shallow breathing?'"
      },
      {
        id: "c_mind",
        title: "4. Derealization & Racing Thoughts",
        distortion: "Misinterpretation: 'My brain is snapping—I'm going crazy or psychotic!'",
        reality: "Psychiatric Fact: Dream-like detachment is a brief protective neural buffer from adrenaline and hypocapnia—it NEVER turns into psychosis or schizophrenia.",
        socratic: "Socratic Check: 'If a medically cleared best friend felt this exact sensation right now, what reassuring truth would I tell them?'"
      }
    ],

    thoughtRecordSample: {
      loc: "15 Nov, 5:30 PM — Stuck in rush-hour traffic at a red light",
      vuln: "Slept only 4 hours last night, drank strong coffee at 3 PM on an empty stomach",
      trigger: "Sudden sharp twinge in left chest followed by tingling in both hands",
      catastrophe: "My heart artery is blocked; I will suffer a heart attack and faint over the steering wheel right now",
      initBelief: 90,
      initSuds: 9,
      safety: "Checked smartwatch pulse 4 times, blasted AC fan on max, nearly pulled onto road shoulder",
      evidence: "Prior ECG and blood tests were 100% normal. Across 25 identical past episodes, 0 heart attacks or fainting ever occurred (100% amygdala error rate).",
      physio: "Caffeine + sleep debt sparked adrenaline; sharp chest twinge is tight rib muscle; bilateral finger tingling is mild hyperventilation (low CO₂).",
      outcome: "Kept driving steadily in the left lane; pounding heart and tingling faded naturally within 15 minutes with zero organ harm.",
      finalBelief: 5,
      finalSuds: 3
    },

    familyGuide: [
      {
        icon: "🤝",
        tag: "During an Acute Attack",
        title: "1. Be a Calm Anchor, Not an Anxious Detective",
        body: "Avoid firing 10 questions at once or saying 'Stop overthinking!'. Use a warm, slow voice: 'I am right here with you. Let's exhale slowly for 6 seconds together.' Never hand them a paper bag!"
      },
      {
        icon: "🚫",
        tag: "During CBT Recovery",
        title: "2. Encourage Bravery Without Becoming a Permanent Crutch",
        body: "Taking over 100% of driving, shopping, or errands forever accidentally feeds Agoraphobia. Celebrate small graded steps—accompany them halfway at first, then cheer as they complete short solo trips."
      },
      {
        icon: "🏆",
        tag: "Redefining Victory",
        title: "3. Praise Endurance, Not Symptom Absence",
        body: "Avoid asking 'Are you feeling anxious yet?' every 10 minutes (which triggers body-scanning!). Instead say: 'I'm so proud you finished the queue even while your heart was racing!'—that endurance rewires the brain."
      }
    ],

    cbtFormats: [
      {
        name: "Face-to-Face Group CBT",
        stat: "SMD −0.47 vs TAU",
        badge: "Highly Effective",
        badgeClass: "pill-safe",
        desc: "Papola et al. (2023, 74 RCTs): De-stigmatizes symptoms alongside peers while delivering structured interoceptive & situational exposure."
      },
      {
        name: "Face-to-Face Individual CBT (8–16 Sessions PCT)",
        stat: "SMD −0.43 (Overall NMA −0.67)",
        badge: "Gold Standard",
        badgeClass: "pill-safe",
        desc: "Barlow & Craske / Clark protocols: The sole psychotherapy maintaining statistical superiority after excluding high-risk-of-bias trials."
      },
      {
        name: "Guided Remote Self-Help CBT (Digital / Bibliotherapy)",
        stat: "SMD −0.42 vs TAU",
        badge: "Matches In-Person!",
        badgeClass: "pill-info",
        desc: "Digital modules with brief therapist support match face-to-face CBT; unguided self-help alone (SMD −0.21) was not superior to TAU."
      },
      {
        name: "Bergen 4-Day Treatment (B4DT — Eide et al., 2025)",
        stat: "72% – 90% Long-Term Remission",
        badge: "Concentrated 4-Day",
        badgeClass: "pill-warn",
        desc: "Intensive 4-day format teaching patients to actively 'lean into' bodily discomfort while eliminating all safety behaviors."
      }
    ],

    pharmScenarios: [
      {
        id: "cbt_first",
        badge: "First-Line • Mild–Moderate",
        badgeClass: "pill-safe",
        title: "1. Medically Cleared Adult Ready for Skills Training",
        headline: "Initiate Panic-Focused CBT (Stepped Care First-Line)",
        body: "NICE CG113 and WFSBP v3 (2023) recommend panic-specific CBT (individual, group, or clinician-guided digital) as first-line care with the strongest post-treatment relapse protection.",
        guardrail: "Avoid routine PRN benzodiazepines during exposure sessions, as sedatives dampen fear extinction and act as a chemical safety behavior."
      },
      {
        id: "ssri_first",
        badge: "First-Line • Pharmacotherapy",
        badgeClass: "pill-info",
        title: "2. Frequent/Severe Attacks or Comorbid Depression",
        headline: "Start First-Line SSRI (Sertraline / Escitalopram Preferred) or Venlafaxine XR ± CBT",
        body: "SSRIs (Sertraline, Escitalopram, Citalopram, Fluoxetine, Paroxetine) and SNRIs (Venlafaxine XR) deliver strong remission with zero addiction risk (Cochrane NMA Guaiana et al., 2023). Sertraline and Escitalopram offer clean CYP450 profiles and gentler tapering.",
        guardrail: "CRITICAL: Start at half-dose and titrate slowly! Warn patients upfront about transient week 1–2 activation/jitteriness; full benefit takes 2–6 weeks, and maintenance continues 6–24 months post-remission."
      },
      {
        id: "acute_bridge",
        badge: "Short-Term 2–4 Week Bridge Only",
        badgeClass: "pill-warn",
        title: "3. Incapacitating Acute Panic While Waiting for SSRI Onset",
        headline: "First-Line SSRI + Strictly Time-Limited Benzodiazepine Bridge (2–4 Weeks)",
        body: "Although benzodiazepines (Clonazepam, Alprazolam, Lorazepam) act within 15–60 minutes and show low acute trial dropout (RR 0.63), NICE CG113 prohibits routine long-term prescribing.",
        guardrail: "Set an explicit taper schedule on day one. Long-term benzodiazepine use causes tolerance, physiological dependence, cognitive impairment, and rebound panic."
      },
      {
        id: "refractory",
        badge: "Second/Third-Line & Emerging",
        badgeClass: "pill-danger",
        title: "4. Inadequate Response to ≥2 First-Line Agents / Specialist Care",
        headline: "Switch SSRI/SNRI → TCA (Clomipramine/Imipramine) or Specialist Augmentation",
        body: "Second-line options include TCAs (Clomipramine, Imipramine) or Mirtazapine. Note that Buspirone and Beta-blockers (Propranolol) are INEFFECTIVE for core panic disorder. Emerging trials are evaluating Intranasal Amiloride Spray (an ASIC1a/2 acid-channel blocker).",
        guardrail: "TCAs require cardiac/ECG vigilance due to conduction risks and anticholinergic burden; avoid in older adults or overdose-risk settings."
      }
    ],

    pharmMatrix: [
      {
        tier: "First-line",
        tierLabel: "First-Line",
        agents: "SSRIs (Sertraline, Escitalopram, Citalopram, Fluoxetine, Paroxetine) & SNRI (Venlafaxine XR)",
        evidence: "Cochrane NMA 2023: Acute response RR 0.82 (SSRIs) & 0.86 (SNRIs) vs placebo; optimal long-term safety.",
        notes: "Start low, go slow; 2–6 weeks for full effect; maintain 6–24 months. Paroxetine carries stronger CYP2D6 inhibition and discontinuation burden."
      },
      {
        tier: "Second-line",
        tierLabel: "Second-Line",
        agents: "TCAs (Clomipramine, Imipramine), Mirtazapine, Reboxetine",
        evidence: "Comparable efficacy to SSRIs (RR 0.74), but markedly higher adverse event dropout.",
        notes: "Anticholinergic side effects (dry mouth, constipation, sedation), arrhythmogenic risk, and overdose toxicity."
      },
      {
        tier: "Bridge",
        tierLabel: "Short Bridge (2–4 Weeks)",
        agents: "Benzodiazepines (Clonazepam, Alprazolam, Lorazepam, Diazepam)",
        evidence: "Rapid onset (15–60 min) and high short-term acceptability, but high dependence/withdrawal hazard.",
        notes: "Contraindicated for routine long-term monotherapy (NICE CG113); interferes with CBT exposure learning."
      },
      {
        tier: "Discouraged",
        tierLabel: "Not Recommended / Emerging",
        agents: "INEFFECTIVE: Buspirone, Beta-blockers (Propranolol) • EMERGING: Amiloride Nasal Spray",
        evidence: "Buspirone shows higher dropout than placebo; Propranolol blunts heart rate without treating central panic loops.",
        notes: "Intranasal amiloride (in development) targets brainstem/amygdala ASIC1a/2 acid channels for rapid non-addictive rescue."
      }
    ],

    analogies: [
      {
        icon: "🚨",
        tag: "Analogy 1 • Why Your Body Fires Without Danger",
        title: "A Smoke Detector Triggered by Morning Toast",
        layman:
          "Imagine a high-tech smoke alarm that blasts sirens and ceiling sprinklers just because you browned a slice of toast. The alarm isn't 'broken' or 'crazy'—its sensitivity dial is simply turned up too high! A panic attack is a healthy survival system firing at a false alarm.",
        clinical:
          "Illustrates fronto-limbic and brainstem ASIC1a/CO₂ chemoreceptor hypersensitivity to benign interoceptive cues in the absence of cardiopulmonary pathology."
      },
      {
        icon: "🌊",
        tag: "Analogy 2 • Why 'Accept & Float' Works",
        title: "The Bamboo Finger Trap & The 10-Minute Ocean Wave",
        layman:
          "In a woven finger trap—or a coastal rip current—the harder you thrash and shout 'Stop panicking right now!', the tighter the panic grips. When you drop the fight, soften your shoulders, and <strong>float with the wave</strong>, adrenaline naturally burns out within 10 to 20 minutes.",
        clinical:
          "Captures paradoxical secondary threat appraisal: fighting autonomic arousal sustains sympathetic output, whereas acceptance restores vmPFC inhibition and vagal tone."
      },
      {
        icon: "⌚",
        tag: "Analogy 3 • Why Safety Behaviors Backfire",
        title: "Clapping Hands to 'Keep Tigers Away' in the Mall",
        layman:
          "If someone claps every minute inside a shopping mall saying 'See? My clapping keeps tigers away!', their brain never learns there were zero tigers to begin with. Clinging to smartwatches, exit seats, or rescue water bottles tricks your amygdala into believing you barely survived a disaster!",
        clinical:
          "Demonstrates Salkovskis's safety-behavior hypothesis: subtle avoidance blocks threat-belief disconfirmation during situational and interoceptive exposure."
      }
    ],

    quizScenarios: [
      {
        id: "q1",
        scenario:
          "1. Maya (26) is standing in a checkout queue when her heart races, she gasps rapidly for air, her fingertips and lips tingle, and she feels lightheaded. What is actually causing her tingling and lightheadedness?",
        options: [
          "A mini-stroke (TIA) blocking blood supply to her brain",
          "Rapid over-breathing blowing off too much CO₂ (hypocapnia), causing brief, harmless cerebral vessel narrowing",
          "A dangerous sudden plunge in blood pressure",
          "Critically low oxygen levels in her lungs"
        ],
        correctIndex: 1,
        explanation:
          "Spot on! During hyperventilation, blood oxygen is actually 98–100% full, but excessive CO₂ is blown off (hypocapnia & mild respiratory alkalosis), causing harmless tingling and dizziness—not a stroke, and blood pressure actually rises!"
      },
      {
        id: "q2",
        scenario:
          "2. Mr. Lim (54, smoker with hypertension) experiences heavy, crushing central chest pain for the FIRST TIME while climbing stairs, radiating into his left arm and jaw, persisting past 20 minutes of rest. What is the safest immediate action?",
        options: [
          "Have him breathe into a brown paper bag for 10 minutes",
          "Assume it is a first panic attack and book a routine clinic visit next week",
          "Call 999 / go to the Emergency Department immediately for an ECG and cardiac evaluation (ACS rule-out)",
          "Drink strong black coffee to boost energy"
        ],
        correctIndex: 2,
        explanation:
          "Critical safety rule! First-onset chest pain after age 45 with heavy/crushing quality radiating to the left arm or jaw and lasting >20 minutes is a Medical Red Flag requiring immediate 999 / emergency ECG evaluation."
      },
      {
        id: "q3",
        scenario:
          "3. A colleague with known panic attacks begins trembling and breathing rapidly at her desk. How should you help her safely?",
        options: [
          "Hold a paper bag tightly over her nose and mouth",
          "Tell her firmly to 'Calm down, there is nothing to be scared of!'",
          "Stay calm, speak in short reassuring sentences, pace slow 4-2-6 breaths together, or offer a cold pack on her cheeks/eyes",
          "Rush her out of the office building immediately every time she feels anxious"
        ],
        correctIndex: 2,
        explanation:
          "Correct! Calm short sentences, pacing slow 4-2-6 exhales together, and applying a cool pack (Mammalian Dive Reflex) safely stimulate the vagus nerve. Never use a paper bag!"
      },
      {
        id: "q4",
        scenario:
          "4. A doctor prescribes Sertraline (a first-line SSRI) for Panic Disorder. What key expectation should be explained in week 1?",
        options: [
          "It works in 15 minutes and should only be swallowed during an attack",
          "Mild temporary jitteriness can happen in weeks 1–2; full benefit takes 2–6 weeks, and treatment continues 6–24 months after recovery",
          "SSRIs cause rapid physical addiction within 14 days",
          "Strict tyramine-free dietary restrictions are required just like irreversible MAOIs"
        ],
        correctIndex: 1,
        explanation:
          "Exactly right! Starting low and warning patients about harmless early activation prevents premature dropout; SSRIs are non-addictive and take 2–6 weeks to remodel fear-network signaling."
      },
      {
        id: "q5",
        scenario:
          "5. Why does checking your smartwatch pulse every 20 minutes and sitting only beside exit doors keep Panic Disorder alive?",
        options: [
          "Blue light from smartwatches triggers hyperventilation",
          "These 'Safety Behaviors' prevent your brain from disconfirming false catastrophe beliefs, convincing the amygdala you 'narrowly escaped'",
          "Smartwatches deplete brain GABA directly",
          "They don't—CBT therapists recommend keeping safety crutches permanently"
        ],
        correctIndex: 1,
        explanation:
          "Correct! Dropping subtle safety behaviors during CBT exposure allows your brain to discover firsthand that racing sensations pass safely on their own."
      },
      {
        id: "q6",
        scenario:
          "6. While stuck in traffic with your heart racing at 130 bpm (Hot Cognition), what is the RIGHT way to use Coping Cards and Thought Records?",
        options: [
          "Stop in the middle of traffic to write out a long 10-step philosophical worksheet",
          "Chant your Coping Card 50 times a minute like a desperate mantra to force symptoms away instantly",
          "Read your factual 60-second Coping Card at most TWICE while continuing to drive calmly; complete the 10-step Thought Record 15–60 minutes AFTER the wave settles",
          "Repeat vague affirmations like 'Everything is magical and peaceful' with no physiological facts"
        ],
        correctIndex: 2,
        explanation:
          "Spot on! During peak adrenaline, prefrontal logic drops >50%: use a prepared factual script (max 2 reads so it doesn't become a safety crutch) + stay in the situation. Deep Cold-Cognition auditing happens 15–60 minutes after the storm subsides."
      },
      {
        id: "q7",
        scenario:
          "7. During a planned Interoceptive Exposure training session at home (e.g., 60 seconds of narrow straw breathing), when should you use 4-2-6 relaxation breathing?",
        options: [
          "Immediately at second 15 as soon as discomfort begins",
          "DO NOT use 4-2-6 breathing during planned IE training! Complete the full duration (+15s) with zero crutches so your brain encodes pure Inhibitory Learning",
          "Take an Alprazolam tablet 30 minutes before practicing straw breathing",
          "Quit the trial immediately and blast a cold fan"
        ],
        correctIndex: 1,
        explanation:
          "Brilliant! 4-2-6 breathing is an acute SOS stabilizer, NOT for planned IE sessions. Using relaxation breathing or sedatives during IE tricks the amygdala into thinking you 'barely survived because you controlled your breath'."
      }
    ]
  }
};

window.getPanicData = function () {
  return window.PANIC_DATA_BY_LANG[window.currentLang === "en" ? "en" : "ms"];
};

window.setPanicLangData = function (lang) {
  window.currentLang = lang === "en" ? "en" : "ms";
};
