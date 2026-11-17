// ============================================================================
// PanicLab — Pangkalan Data Dwibahasa (BM & EN) & Dwi-Mod (Awam & Klinikal)
// Diaudit mengikut DSM-5-TR (2022), ICD-11, WFSBP v3 (2023), NICE CG113,
// Cochrane NMA (Guaiana et al., 2023), Papola et al. (2022/2023), B4DT (2025),
// Klevebrant & Frick (2022) & KKM NCEMH / MENTARI / MyHEALTH
// ============================================================================

try {
  window.currentLang = localStorage.getItem("paniclab_lang") === "en" ? "en" : "ms";
} catch (_) {
  window.currentLang = "ms";
}

window.PANIC_DATA_BY_LANG = {
  // ==========================================================================
  // BAHASA MELAYU (MS)
  // ==========================================================================
  ms: {
    lensMeta: {
      layman:
        "🫂 <strong>Paparan Untuk Saya (Pesakit):</strong> Bahasa ringkas & menenangkan—fokus langkah praktikal tanpa istilah perubatan berat.",
      family:
        "👨‍👩‍👧 <strong>Paparan Keluarga & Orang Awam:</strong> Panduan ayat tepat untuk disebut, saringan 999, dan cara menyokong tanpa menjadi 'tongkat pengelakan'.",
      clinical:
        "🩺 <strong>Paparan Klinikal (Doktor / Terapis):</strong> Kod DSM-5-TR / ICD-11, kerja makmal saringan, mekanisme reseptor, & bukti meta-analisis penuh."
    },

    chapterLens: {
      ch2: {
        layman:
          "🫂 <strong>Tip Tenang:</strong> Tandakan simptom di bawah hanya sebagai nota untuk doktor—mempunyai ≥4 simptom panik <em>bukan</em> bermakna jantung anda rosak.",
        family:
          "👨‍👩‍👧 <strong>Panduan Keluarga (Saringan 30 Saat):</strong> Tanya dengan suara tenang sama ada sakit dada terasa berat menghimpit ke lengan kiri/rahang, atau ini kali pertama berlaku pada umur &gt;45 tahun. Jika ya, hubungi <strong>999</strong> tanpa berdebat.",
        clinical:
          "🩺 <strong>Saringan Makmal Asas (Rule-Out Workup):</strong> 12-lead ECG (tolak ACS/SVT), FBC, fungsi tiroid (TSH/fT4), glukosa puasa, elektrolit/Ca²⁺, dan saringan kafein/simpatomimetik sebelum mengesahkan <code>ICD-11 6B01</code>."
      },
      ch3: {
        layman:
          "🫂 <strong>Langkah Mudah Hari Ini:</strong> Cuba kurangkan kopi pekat/minuman tenaga secara berperingkat selama 7 hari—ramai pesakit mendapati debaran harian turun mendadak!",
        family:
          "👨‍👩‍👧 <strong>Elak Perangkap 'Tolong Lari':</strong> Jangan bantu pasangan/anak keluar tergesa-gesa dari kedai atau sembunyikan semua tugasan luar—bantu mereka kurangkan kafein dan kekal tenang di tempat selamat.",
        clinical:
          "🩺 <strong>Bukti Provokasi Adenosin (Klevebrant &amp; Frick, 2022):</strong> Dos ~400–480 mg kafein mencetuskan serangan panik penuh pada <strong>51.1%</strong> pesakit kecelaruan panik lwn 0% plasebo melalui antagonisme reseptor adenosin A1/A2A."
      },
      ch4: {
        layman:
          "🫂 <strong>Ingat 1 Perkara Sahaja:</strong> Semasa tengah berdebar kuat, baca Kad 60 Saat di bawah cukup <strong>2 kali</strong> sahaja. Borang 10 langkah disimpan tertutup di bawah untuk diisi selepas anda sudah tenang.",
        family:
          "👨‍👩‍👧 <strong>Cara Bantu Guna Kad 60s:</strong> Semasa serangan, tunjukkan skrip 60s mereka di telefon dan bacakan perlahan maksimum <strong>2 kali</strong>. Jangan soal punca stres ketika nadi masih laju—tunggu 30 minit selepas reda.",
        clinical:
          "🩺 <strong>Model Kognitif Clark (1986) &amp; Barlow-Craske:</strong> Pisahkan intervensi fasa akut (<em>Hot Cognition</em>: skrip fakta siap tulis <em>Coping Card</em> dengan had bacaan 2x bagi mengelak ia bertukar menjadi <em>Safety Behavior</em>) daripada semakan bukti pasca-serangan (<em>Cold Cognition</em>, sasaran keyakinan &lt;15%)."
      },
      ch5: {
        layman:
          "🫂 <strong>Bina Keyakinan Ikut Rentak Sendiri:</strong> Pilih 1 latihan ringan dahulu selepas doktor mengesahkan badan anda sihat. Anda memegang kawalan penuh!",
        family:
          "👨‍👩‍👧 <strong>Jadi 'Coach' Semangat, Bukan Penyelamat:</strong> Semasa pasangan membuat latihan pendedahan, <strong>jangan</strong> tanya <em>'Awak okey tak?'</em> berulang kali atau hulur air/kipas. Puji keberanian mereka bertahan hingga tamat masa!",
        clinical:
          "🩺 <strong>Paradigma Inhibitory Learning (Craske et al., 2014/2022):</strong> Kejayaan diukur melalui <em>expectancy violation</em> (pembuktian salah hipotesis bencana dengan 0 safety crutches), bukan sekadar penurunan SUDS dalam sesi (<em>within-session habituation</em>)."
      },
      ch6: {
        layman:
          "🫂 <strong>Jangan Takut Tanya Doktor:</strong> Ubat moden seperti SSRI tidak menyebabkan ketagihan. Jika doktor memulakannya, rasa sedikit gelisah pada minggu pertama adalah normal dan sementara.",
        family:
          "👨‍👩‍👧 <strong>Peranan Keluarga Minggu 1–2 Ubat:</strong> Minggu awal ubat SSRI boleh membuat pesakit rasa sedikit mual atau gelisah sebelum kesan pulih muncul pada minggu 3–4. Beri sokongan moral dan pastikan mereka <strong>tidak berhenti ubat mengejut</strong>.",
        clinical:
          "🩺 <strong>Titrasi Klinikal (WFSBP v3 2023 • NICE CG113 • Cochrane NMA 2023):</strong> Mula separuh dos bagi mengelak <em>jitteriness syndrome</em> awal (Sertraline 25 mg → 50–150 mg; Escitalopram 5 mg → 10–20 mg). Kekalkan 6–24 bulan pasca-remisi; elakkan benzodiazepin kronik, propranolol &amp; buspirone."
      },
      ch8: {
        layman:
          "🫂 <strong>Uji Santai Tanpa Tekanan:</strong> Cuba 7 situasi pendek di bawah untuk mengukuhkan keyakinan diri anda.",
        family:
          "👨‍👩‍👧 <strong>Latihan Pantas Keluarga:</strong> Soalan #2 dan #3 di bawah direka khusus untuk melatih tindakan tepat ahli keluarga &amp; rakan sekerja semasa kecemasan!",
        clinical:
          "🩺 <strong>Semakan Kompetensi Klinikal:</strong> Merangkumi triaj ACS lwn panik, fisiologi hipokapnia, pendidikan titrasi SSRI, serta disiplin <em>anti-safety-behavior</em> dalam PCT."
      }
    },

    spectrumCards: [
      {
        id: "attack",
        badge: "Tahap 1 • Episod Simptom",
        clinicalBadge: "ICD-11 MB23.H • Specifier",
        badgeClass: "pill-info",
        stat: "~1 dalam 8 Dewasa Pernah Alami",
        title: "1. Serangan Panik (Panic Attack)",
        layman:
          "Gelombang rasa takut dan debaran mendadak yang memuncak dalam beberapa minit. Ia <strong>bukan penyakit mental</strong>—sesiapa pun boleh mengalaminya sekali-sekala apabila terlalu penat, kurang tidur, atau terlebih kafein.",
        family:
          "<strong>Untuk Keluarga:</strong> Debaran, menggigil, dan sesak nafas yang dialami insan tersayang adalah lonjakan adrenalin biologi sebenar—<strong>bukan dibuat-buat atau mengada-ngada</strong>, walaupun pemeriksaan doktor menunjukkan jantung mereka sihat.",
        clinical:
          "Penentu klinikal tidak berkod dalam DSM-5-TR (ICD-11: <code>MB23.H</code>). Didefinisikan sebagai lonjakan ketakutan/ketidakselesaan akut yang memuncak dalam beberapa minit bersama <strong>≥4 daripada 13 simptom autonomik/kognitif</strong>; boleh tercetus secara dijangka (<em>cued</em>) atau mengejut (<em>unexpected</em>)."
      },
      {
        id: "disorder",
        badge: "Tahap 2 • Kitaran Berulang",
        clinicalBadge: "Diagnosis ICD-11 6B01",
        badgeClass: "pill-warn",
        stat: "Boleh Pulih Dengan Rawatan Tepat",
        title: "2. Kecelaruan Panik (Panic Disorder)",
        layman:
          "Berlaku apabila serangan datang <strong>secara mengejut berulang kali</strong>, lalu membuatkan anda hidup dalam kerisauan sekurang-kurangnya <strong>sebulan</strong> kerana 'takut diserang lagi'. Berita baiknya: kitaran ini sangat responsif terhadap terapi!",
        family:
          "<strong>Untuk Keluarga:</strong> Selepas beberapa serangan mengejut, pesakit mula hidup dalam ketakutan menanti serangan seterusnya. Galakkan mereka mendapatkan saringan awal di Klinik Kesihatan / MENTARI tanpa menghakimi.",
        clinical:
          "Diagnosis paksi kecelaruan keresahan (DSM-5-TR / ICD-11 <code>6B01</code>; prevalens 1.1%–4.7%, nisbah wanita:lelaki ~2:1). Memerlukan serangan <em>unexpected</em> berulang + ≥1 bulan kebimbangan antisipatori atau perubahan tingkah laku maladaptif, selepas menolak punca organik."
      },
      {
        id: "agoraphobia",
        badge: "Tahap 3 • Perangkap Mengelak",
        clinicalBadge: "Diagnosis Berasingan DSM-5-TR",
        badgeClass: "pill-danger",
        stat: "Elakkan Daripada Mula Mengurung Diri",
        title: "3. Agoraphobia (Takut Keluar / Terperangkap)",
        layman:
          "Apabila anda mula mengelak <strong>2 atau lebih situasi</strong>—seperti memandu jauh, jem jalan raya, lif, atau pasar raya—kerana risau sukar keluar jika panik menyerang. Latihan berperingkat mampu membuka semula kebebasan anda!",
        family:
          "<strong>Untuk Keluarga:</strong> Jika anda mengambil alih 100% pemanduan dan urusan luar mereka selama-lamanya kerana kasihan, dunia mereka akan menjadi semakin sempit. Bantu mereka berlatih keluar secara berperingkat.",
        clinical:
          "Dikodkan sebagai diagnosis bebas dalam DSM-5-TR (~25% komorbiditi). Ditandai ketakutan/pengelakan ketara terhadap ≥2 daripada 5 situasi (pengangkutan awam, ruang terbuka, ruang tertutup, beratur/khalayak ramai, berada di luar rumah sendirian) selama ≥6 bulan."
      }
    ],

    neuroHotspots: [
      {
        id: "amygdala",
        title: "1. Amigdala & Penggera Otak",
        subtitle: "Penggera Kebakaran Terlalu Sensitif",
        badge: "Pusat Pengesan Ancaman",
        color: "#ef4444",
        layman:
          "Amigdala ialah 'penggera asap' otak. Semasa panik, ia tersalah tafsir perubahan kecil badan sebagai bahaya besar lalu menekan siren kecemasan, manakala 'brek logik' otak terhenti seketika.",
        family:
          "<strong>Apa Keluarga Perlu Faham:</strong> Semasa siren amigdala berbunyi, otak logik mereka sukar memproses nasihat panjang. Jangan berleter—gunakan ayat pendek dan tenang seperti <em>'Saya ada di sini, awak selamat.'</em>",
        clinical:
          "Disregulasi rangkaian ketakutan berpusatkan amigdala, BNST, hipokampus dan kemerosotan inhibisi korteks prefrontal ventromedial (vmPFC). Kajian PET menunjukkan pengurangan ikatan reseptor <strong>GABA-A</strong> dan <strong>5-HT1A</strong>, serta kepekaan tinggi saluran ion pengesan asid (<strong>ASIC1a, ASIC2</strong>) terhadap perubahan pH ekstraselular/CO₂."
      },
      {
        id: "lungs",
        title: "2. Paru-Paru & Gas CO₂",
        subtitle: "Kenapa Dada Rasa 'Tak Cukup Nafas'",
        badge: "Kunci Fisiologi #1",
        color: "#38bdf8",
        layman:
          "Walaupun dada rasa sempit, oksigen darah anda sebenarnya <strong>penuh (98%–100%)</strong>! Nafas laju & cetek cuma membuang terlalu banyak gas CO₂—sebab itu hembusan perlahan 6 saat sangat melegakan.",
        family:
          "<strong>Apa Keluarga Perlu Buat:</strong> Jangan sesekali hulur beg kertas atau suruh mereka 'tarik nafas dalam-dalam cepat!'. Ajak mereka ikut gerakan bahu anda menghembus nafas perlahan selama 6 saat.",
        clinical:
          "Ketidakstabilan isi padu tidal dan penurunan <em>end-tidal</em> pCO₂ boleh bermula sehingga <strong>50 minit sebelum</strong> pesakit sedar serangan berlaku (Meuret et al.). Hiperventilasi akut mencetuskan <strong>hipokapnia</strong> dan <strong>alkalosis respiratori</strong> sementara tanpa hipoksemia."
      },
      {
        id: "brainVessels",
        title: "3. Salur Darah Otak & Hujung Saraf",
        subtitle: "Punca Pening, Dunia Asing & Kebas Jari",
        badge: "Bukan Strok / Bukan Gila",
        color: "#a78bfa",
        layman:
          "Kurang CO₂ menyebabkan salur darah ke otak mengecut sedikit buat sementara. Inilah punca kepala rasa melayang, dunia macam mimpi, serta kebas di jari dan bibir—<strong>bukan tanda strok atau hilang akal!</strong>",
        family:
          "<strong>Apa Keluarga Perlu Tahu:</strong> Bila pesakit mengadu 'tangan kebas' atau 'pandangan rasa pelik macam mimpi', bertenanglah—ia kesan sementara nafas laju (kecuali jika muka herot atau lemah sebelah badan sahaja → hubungi 999).",
        clinical:
          "Alkalosis respiratori menyebabkan vasokonstriksi serebral ringan sementara serta peningkatan ikatan kalsium serum terion pada albumin (hipokalsemia fungsian sementara), menghasilkan parestesia perioral/akral, pening kepala, dan derealisasi/depersonalisasi pelindung."
      },
      {
        id: "heart",
        title: "4. Jantung & Lonjakan Adrenalin",
        subtitle: "Debaran Laju & Kenapa Hampir Mustahil Pengsan",
        badge: "Paradoks Tekanan Darah",
        color: "#f59e0b",
        layman:
          "Adrenalin melajukan jantung seperti ketika anda berlari. Ramai takut pengsan—tetapi pengsan berlaku bila tekanan darah <em>jatuh</em>, sedangkan serangan panik <strong>menaikkan tekanan darah</strong>! Anda tidak akan rebah kerananya.",
        family:
          "<strong>Apa Keluarga Perlu Tahu:</strong> Jika pesakit benar-benar pengsan tidak sedarkan diri (<em>blackout</em>), itu <strong>bukan</strong> serangan panik biasa—bawa ke hospital segera untuk pemeriksaan jantung.",
        clinical:
          "Unjuran hipotalamus ke rantaian simpatetik torakolumbar (T1–L2) dan medula adrenal merembes katekolamin (epinefrin/norepinefrin), meningkatkan kadar nadi dan tekanan darah arteri. Sinkop vasovagal sebenar amat jarang berlaku dalam panik tulen (kecuali fobia darah-suntikan-kecederaan)."
      },
      {
        id: "throatChest",
        title: "5. Otot Tekak & Dinding Dada",
        subtitle: "Ilusi Rasa Tercekik & Dada Mencucuk",
        badge: "Ketegangan Otot",
        color: "#2dd4bf",
        layman:
          "Adrenalin menegangkan otot leher hingga rasa seperti ada 'ketulan di tekak' walaupun laluan udara terbuka luas. Nafas dada atas pula membuatkan otot rusuk terasa mencucuk.",
        family:
          "<strong>Apa Keluarga Perlu Buat:</strong> Minta mereka jatuhkan bahu perlahan-lahan dan telan air liur dengan lembut untuk membuktikan laluan tekak tidak tersumbat.",
        clinical:
          "Hipertonus otot krikofaringeus menghasilkan <em>globus pharyngeus</em> tanpa obstruksi saluran udara. Penggunaan berlebihan otot pernafasan aksesori dan interkostal menghasilkan sakit dada muskuloskeletal setempat yang berbeza daripada iskemia miokardium."
      },
      {
        id: "gutHangover",
        title: "6. Perut & Fasa Letih Selepas Serangan",
        subtitle: "Loya Semasa Puncak & Mengantuk Selepas Reda",
        badge: "Brek Semula Jadi",
        color: "#10b981",
        layman:
          "Semasa cemas, perut menghentikan pencernaan seketika lalu terasa mual. Selepas 15–20 minit, saraf penenang mengambil alih dan membuat badan rasa sejuk atau letih—itu tanda ribut sudah berakhir!",
        family:
          "<strong>Selepas Serangan Surut:</strong> Pesakit lazimnya berasa sangat lesu dan sejuk menggigil ('adrenaline hangover'). Beri mereka ruang berehat tenang tanpa menghujani soalan.",
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
        label: "2. Salah Tafsir Simptom (Kopi / Stres)",
        hr: "118 bpm",
        co2: "31 mmHg (Menurun)",
        pfc: "Mula Panik",
        adrenaline: 78,
        co2Level: 48,
        summary:
          "Degupan laju biasa (cth. selepas 2 cawan kopi kaw) disalah anggap sebagai bahaya ('Jantung aku nak berhenti!') → Otak lepaskan adrenalin → Debaran makin kuat → Rasa takut makin menjadi-jadi!"
      },
      hyperventilation: {
        label: "3. Kemuncak Panic Attack & Nafas Laju",
        hr: "136 bpm",
        co2: "24 mmHg (Kurang CO₂)",
        pfc: "Siren Cemas Aktif",
        adrenaline: 96,
        co2Level: 24,
        summary:
          "Gelombang memuncak dalam ~10 minit. Nafas tercungap-cungap membuang terlalu banyak gas CO₂ → menyebabkan tangan/bibir kebas & kepala rasa melayang macam mimpi. Walau menakutkan, gelombang ini PASTI turun sendiri."
      },
      vagalRecovery: {
        label: "4. Reda Dengan 'Accept & Float' + Nafas 4-2-6",
        hr: "80 bpm (Menurun)",
        co2: "38 mmHg (Pulih)",
        pfc: "Kembali Tenang",
        adrenaline: 26,
        co2Level: 76,
        summary:
          "Apabila anda berhenti melawan dan memanjangkan hembusan nafas (6 saat), saraf penenang badan (saraf vagus) menekan brek semula jadi, gas CO₂ kembali stabil, dan rasa kebas/pening hilang dalam 15–20 minit."
      }
    },

    dsmSymptoms: [
      { id: "s1", group: "cardio", label: "1. Jantung berdebar kencang, laju, atau terasa kuat (palpitations)" },
      { id: "s2", group: "cardio", label: "2. Berpeluh mendadak (peluh sejuk atau panas)" },
      { id: "s3", group: "cardio", label: "3. Tangan atau badan menggeletar / menggigil" },
      { id: "s4", group: "cardio", label: "4. Rasa sesak nafas atau tak puas tarik nafas (air hunger)" },
      { id: "s5", group: "cardio", label: "5. Rasa tercekik atau macam ada benda tersangkut di tekak (globus)" },
      { id: "s6", group: "cardio", label: "6. Sakit mencucuk atau rasa ketat pada dada" },
      { id: "s7", group: "neuro", label: "7. Rasa loya, mual, atau perut memulas" },
      { id: "s8", group: "neuro", label: "8. Pening, kepala rasa ringan melayang, atau rasa nak pitam" },
      { id: "s9", group: "neuro", label: "9. Seram sejuk tiba-tiba atau badan terasa bahang panas (hot flashes)" },
      { id: "s10", group: "neuro", label: "10. Rasa kebas atau menyucuk semut-semut di jari, kaki, atau bibir" },
      { id: "s11", group: "cog", label: "11. Sekeliling rasa pelik macam mimpi (derealization) atau rasa terpisah dari diri sendiri" },
      { id: "s12", group: "cog", label: "12. Takut hilang kawalan diri atau takut 'jadi gila'" },
      { id: "s13", group: "cog", label: "13. Takut mati (rasa yakin nyawa atau jantung bakal berhenti ketika itu)" }
    ],

    diffRows: [
      {
        feature: "Cara Bermula",
        panic: "Datang mengejut tiba-tiba tanpa amaran (termasuk terjaga waktu tidur / nocturnal panic)",
        anxiety: "Meningkat perlahan-lahan mengikut masalah kerja atau stres harian",
        acs: "Mengejut, lazimnya tercetus semasa aktiviti fizikal berat atau walaupun ketika rehat"
      },
      {
        feature: "Tempoh Kemuncak",
        panic: "Memuncak cepat dalam ≤10 minit, dan lazimnya surut dalam 20–30 minit",
        anxiety: "Boleh berlarutan berjam-jam, berhari-hari, atau berminggu-minggu",
        acs: "Berterusan dan selalunya makin teruk dari minit ke minit (>20 minit)"
      },
      {
        feature: "Jenis Sakit Dada",
        panic: "Tajam mencucuk di satu titik dada depan (kerana otot dada tegang)",
        anxiety: "Rasa senak ringan atau bahu/dada rasa tegang",
        acs: "Berat menghimpit, menekan seperti ditindih batu, atau pedih terbakar di tengah dada"
      },
      {
        feature: "Sebaran Sakit",
        panic: "Kekal di dada depan; kerap disertai kebas pada kedua-dua belah tangan/bibir",
        anxiety: "Tiada sebaran khusus (selalu rasa lenguh tengkuk atau sakit kepala tegang)",
        acs: "Menjalar ke lengan kiri, bahu, leher, rahang, atau belakang badan"
      },
      {
        feature: "Bila Cuba Nafas Perlahan",
        panic: "Beransur lega dalam 15–20 minit apabila hembusan nafas diperlahankan",
        anxiety: "Lega sekejap apabila punca stres selesai atau fikiran dialihkan",
        acs: "TIDAK hilang walaupun berehat atau bernafas perlahan — hubungi 999 segera!"
      }
    ],

    caffeineItems: [
      { id: "kopi_kaw", name: "Kopi O Kaw / Americano Besar", mg: 150 },
      { id: "espresso", name: "1 Shot Espresso / Kopi Tin", mg: 85 },
      { id: "kopi_3in1", name: "Kopi 3-dalam-1 / Kopi Ais Mamak", mg: 75 },
      { id: "teh_tarik", name: "Teh Tarik / Teh Hitam Pekat", mg: 55 },
      { id: "matcha", name: "Matcha Latte / Teh Hijau", mg: 65 },
      { id: "energy", name: "Minuman Tenaga (Energy Drink)", mg: 160 },
      { id: "preworkout", name: "Serbuk Pre-Workout Gym", mg: 250 },
      { id: "cola", name: "Minuman Gas Kola (1 Tin)", mg: 35 }
    ],

    nonCaffTriggers: [
      {
        id: "pseudoephedrine",
        name: "💊 Ubat Selesema Hidung Tersumbat (Pseudoephedrine / Phenylephrine)",
        note: "Merangsang reseptor adrenalin secara terus & boleh mencetuskan jantung laju walaupun 0 mg kopi."
      },
      {
        id: "vape_nicotine",
        name: "💨 Vape / Rokok Nikotin Tinggi",
        note: "Nikotin meningkatkan kadar nadi, tekanan darah & mencetuskan rasa gelisah."
      },
      {
        id: "salbutamol",
        name: "🫁 Inhaler Pelega Asma (Salbutamol / Ventolin)",
        note: "Penting untuk asma (jangan berhenti!), tetapi maklum bahawa tangan menggigil & nadi laju selepas sedut ialah kesan biasa ubat, bukan panik bahaya."
      }
    ],

    somaticClinicDrawer: [
      {
        id: "gerd",
        tabLabel: "🔥 Gastrik / GERD & Angin",
        badge: "Soalan Klinik #1 Di Malaysia",
        title: "Kitaran Gastrik / GERD ('Angin Naik Dada') ↔ Panic Attack",
        layman:
          "Saluran makan (esofagus), perut, dan jantung berkongsi lebuh raya saraf yang sama iaitu <strong>Saraf Vagus</strong>. Bila asid perut naik atau perut kembung selepas makan lewat/pedas/kopi, saraf vagus menghantar isyarat rasa ketat di dada & tekak berketul (<em>LPR globus</em>)—lalu otak tersalah anggap sebagai sakit jantung dan mencetuskan panik! Sebaliknya, panik pula memerah perut hingga asid makin naik. <strong>Tip Praktikal:</strong> Elak baring 2–3 jam selepas makan, kurangkan makan pedas/kopi ketika perut kosong, tetapi jika sakit dada berat menjalar ke lengan kiri/rahang atau berpeluh sejuk (terutamanya pesakit kencing manis/darah tinggi), tetap semak ECG doktor dahulu.",
        family:
          "<strong>Untuk Keluarga:</strong> Ramai pesakit di Malaysia menyebut <em>'angin naik ke dada'</em>. Jangan ketawakan mereka—pedih ulu hati dan kembung memang merangsang saraf vagus hingga terasa sebiji macam sesak nafas. Bantu mereka duduk tegak (jangan baring rata selepas makan) dan hembus nafas perlahan.",
        clinical:
          "Crosstalk aferen viseral saraf vagus antara esofagus/gaster dan nukleus traktus solitarius mencetuskan hipersensitiviti viseral & <em>globus pharyngeus</em> (refluks laringofaringeal). Penting: saring iskemia miokardium inferior (yang sering meniru dispepsia/epigastrik pada wanita & pesakit diabetes) melalui ECG 12-lead; setelah sah jinak, elakkan endoskopi berulang yang menjadi <em>reassurance-seeking</em>."
      },
      {
        id: "hangover",
        tabLabel: "🔋 Lemah Lepas Panik (Hangover)",
        badge: "1–4 Jam Selepas Reda",
        title: "Kenapa Kaki Menggigil, Sejuk & Lesu Berjam-Jam Selepas Serangan? ('Adrenaline Hangover')",
        layman:
          "Ramai pesakit cemas semula apabila mendapati kaki masih lembik macam agar-agar, badan menggigil sejuk, dan kepala 'blur' walaupun serangan sudah tamat sejam lalu. Ini dipanggil <strong>Adrenaline Hangover</strong>—badan anda baru sahaja berlari pecut maraton secara dalaman! <strong>Checklist Pulih Tenang:</strong> (1) Pakai stoking/baju sejuk nipis, (2) Minum air suam sedikit demi sedikit & makan snek ringan (roti/pisang) untuk ganti tenaga otot, (3) Gerakkan bahu/jalan perlahan di dalam bilik (jangan baring kaku sambil asyik memantau degupan jantung).",
        family:
          "<strong>Untuk Keluarga:</strong> Selepas ribut 15 minit reda, pasangan/anak anda akan kelihatan sangat penat, pucat sejuk, atau mengantuk selama beberapa jam. Sediakan selimut nipis & air suam, dan tangguhkan perbincangan berat sehingga mereka cukup rehat.",
        clinical:
          "Kesan pasca-katekolamin akibat rangsangan reseptor <strong>beta-2 adrenergik</strong> pada otot rangka (tremor fisiologi pasca-adrenalin), penyusutan glikogen tempatan, serta lantunan parasimpatetik vagal. Pendidikan awal menghalang tafsiran bencana sekunder ('Kenapa aku masih menggigil, adakah serangan kedua nak datang?')."
      },
      {
        id: "nocturnal_diff",
        tabLabel: "🌙 Terjaga 3 Pagi",
        badge: "25%–33% Pesakit Panik",
        title: "Terjaga Mengejut Pukul 2–4 Pagi Dengan Jantung Laju (Nocturnal Panic)",
        layman:
          "Terjaga tiba-tiba daripada tidur lena (bukan kerana mimpi ngeri!) dalam keadaan berdebar kencang berlaku apabila sensor CO₂ otak terlalu peka semasa peralihan fasa tidur dalam. Ia <strong>bukan serangan jantung malam</strong>. Duduk bersandar, basuh muka dengan air sejuk 20s, jangan buka Google, dan maklumkan doktor jika anda juga berdengkur kuat/tersedak masa tidur (untuk semak <em>Sleep Apnea</em> atau refluks asid malam).",
        family:
          "<strong>Untuk Pasangan:</strong> Jika pasangan tersentak bangun jam 3 pagi dalam ketakutan, buka lampu malap (jangan lampu putih menyilau), duduk di sebelahnya, dan pandu hembusan nafas 6 saat tanpa bertanya banyak soalan.",
        clinical:
          "Berlaku semasa peralihan tidur N2→N3 (non-REM) akibat kepekaan kemoreseptor medula terhadap peningkatan fisiologi kecil pCO₂ semasa tidur. Saringan perbezaan wajib merangkumi <em>Obstructive Sleep Apnea (OSA)</em>, refluks asid nokturnal, asma nokturnal, dan <em>paroxysmal nocturnal dyspnea (PND)</em>."
      },
      {
        id: "hormone_pots",
        tabLabel: "🩸 Hormon, Zat Besi & POTS",
        badge: "Saringan Penting Wanita & Belia",
        title: "Kenapa Panik Kerap Muncul Dekat Haid, Lepas Bersalin, Kurang Darah, atau Bila Bangun Berdiri?",
        layman:
          "Empat keadaan badan biasa yang sering meniru atau menguatkan simptom panik: <strong>(1) Seminggu sebelum haid (PMDD) / Perimenopaus</strong>—perubahan hormon mempengaruhi saraf penenang otak; <strong>(2) Selepas bersalin</strong>—perubahan tiroid & kurang tidur; <strong>(3) Kurang zat besi (Ferritin rendah)</strong>—buat cepat mengah & berdebar walaupun ujian hemoglobin nampak hampir normal; <strong>(4) Cuaca panas / kurang air / POTS</strong>—nadi naik mendadak bila bangun berdiri cepat. Minta doktor semak ujian darah asas (FBC, Ferritin, Tiroid TSH) supaya punca fizikal turut dirawat!",
        family:
          "<strong>Untuk Keluarga:</strong> Jangan anggap ibu lepas bersalin atau wanita pra-haid 'terlalu emosi'—penurunan hormon progesteron/allopregnanolone dan kekurangan zat besi mempunyai kesan biologi nyata ke atas pusat cemas otak.",
        clinical:
          "Penurunan mendadak allopregnanolone (modulator alosterik positif GABA-A) pada fasa luteal lewat/pasca-natal menurunkan ambang panik. Saring tiroiditis pasca-partum, feritin serum (&lt;30 ng/mL boleh mencetuskan palpitasi/keletihan), serta <em>Postural Orthostatic Tachycardia Syndrome (POTS)</em> (kenaikan HR ≥30 bpm dalam 10 minit berdiri tanpa hipotensi ortostatik)."
      }
    ],

    mythsAndTraps: [
      {
        badge: "Perangkap #1 • Smartwatch",
        badgeClass: "pill-warn",
        title: "Asyik Check Nadi di Smartwatch (Safety Behavior)",
        myth: "Salah Anggap: 'Kalau saya check nadi di jam pintar setiap 10 minit, saya akan rasa lebih selamat.'",
        truth: "Fakta Sebenar: Tabiat 'pelindung palsu' (Safety Behavior) ini sebenarnya melatih otak bahawa degupan jantung itu berbahaya, lalu membuat anda makin cemas setiap kali nadi naik sedikit."
      },
      {
        badge: "Bahaya • Jangan Buat!",
        badgeClass: "pill-danger",
        title: "Mitos Bernafas Dalam Beg Kertas",
        myth: "Mitos TV/Filem: 'Suruh orang tengah panik bernafas dalam beg kertas.'",
        truth: "Fakta Perubatan: JANGAN guna beg kertas! Jika punca sebenar sesak nafas itu ialah serangan asma atau jantung, udara kurang oksigen dalam beg kertas amat membahayakan nyawa. Guna hembusan nafas perlahan 6 saat."
      },
      {
        badge: "Mitos Pengsan",
        badgeClass: "pill-safe",
        title: "'Kepala Rasa Melayang, Kejap Lagi Mesti Pitam!'",
        myth: "Salah Anggap: 'Rasa pening melayang bermaksud saya nak rebah pengsan di depan orang ramai.'",
        truth: "Fakta Badan: Orang pengsan apabila tekanan darah JATUH mendadak. Sebaliknya semasa Panic Attack, adrenalin MENAIKKAN tekanan darah sedikit—jadi anda hampir mustahil pengsan (kecuali fobia jarum/darah)."
      },
      {
        badge: "Mitos Jadi Gila",
        badgeClass: "pill-info",
        title: "'Sekeliling Rasa Pelik Macam Mimpi, Aku Nak Gila Ke?'",
        myth: "Salah Anggap: 'Rasa dunia tak nyata (derealization) akan bertukar jadi sakit mental teruk / skizofrenia.'",
        truth: "Fakta Pakar Psikiatri: Rasa 'blur' atau macam mimpi itu hanyalah reaksi sementara otak bila adrenalin tinggi dan kurang CO₂. Panic Attack TIDAK PERNAH bertukar menjadi gila atau skizofrenia."
      }
    ],

    interoceptiveLabs: [
      {
        id: "straw",
        title: "1. Bernafas Ikut Straw Halus",
        method: "Duduk tegak; bernafas ikut mulut guna straw halus sambil hidung dipicit",
        duration: 60,
        sensation: "Sesak nafas, rasa tak puas bernafas (air hunger)",
        contra: "Elakkan jika: Asma, COPD/paru-paru kronik, penyakit jantung, atau sedang hamil",
        hypothesis: "Jika saya bernafas ikut straw 60 saat, saya akan lemas atau pitam (Keyakinan 85%)",
        disconfirms: "Membuktikan rasa sempit nafas tidak menutup saluran udara atau menjatuhkan oksigen darah.",
        sudsDefault: 70
      },
      {
        id: "hypervent",
        title: "2. Nafas Laju Terkawal (30 Nafas/Min)",
        method: "Duduk di kerusi selamat; tarik & hembus nafas laju (~1 nafas setiap 2 saat)",
        duration: 60,
        sensation: "Pening, kebas jari/bibir, rasa macam mimpi",
        contra: "Elakkan jika: Epilepsi/sawan, penyakit jantung/strok, asma, atau sedang hamil",
        hypothesis: "Jika jari kebas dan kepala ringan, saya akan kena strok atau hilang akal (Keyakinan 80%)",
        disconfirms: "Membuktikan kebas & rasa pelik hanyalah kesan sementara kurang gas CO₂ yang surut sendiri.",
        sudsDefault: 75
      },
      {
        id: "spin",
        title: "3. Pusing Kerusi Pejabat (1 Pusingan / 3s)",
        method: "Duduk selamat di kerusi beroda jauh dari bucu tajam & berpusing sederhana",
        duration: 60,
        sensation: "Pening berpusing & sedikit loya",
        contra: "Elakkan jika: Vertigo/masalah telinga dalam aktif atau risiko jatuh",
        hypothesis: "Jika kepala berpusing, saya pasti hilang kawalan dan rebah (Keyakinan 75%)",
        disconfirms: "Membuktikan pening berpusing tidak menyebabkan rebah pengsan dan pulih sendiri.",
        sudsDefault: 60
      },
      {
        id: "headshake",
        title: "4. Geleng Kepala Pantas (Mata Terbuka)",
        method: "Duduk; geleng kepala kiri ke kanan secara sederhana pantas selama 30 saat",
        duration: 30,
        sensation: "Kepala ringan melayang & pandangan kabur sekejap",
        contra: "Elakkan jika: Sakit/kecederaan tulang leher (servikal) atau vertigo teruk",
        hypothesis: "Pandangan kabur bermaksud saya nak pitam sekarang (Keyakinan 70%)",
        disconfirms: "Membuktikan kabur fokus sementara adalah reaksi deria biasa tanpa bahaya.",
        sudsDefault: 55
      },
      {
        id: "jog",
        title: "5. Lari Setempat Laju (Angkat Lutut)",
        method: "Lari setempat secara pantas tanpa henti dengan kasut/lantai tidak licin",
        duration: 60,
        sensation: "Jantung berdebar kencang & berpeluh",
        contra: "Elakkan jika: Penyakit jantung/aritmia, darah tinggi tidak terkawal, atau kecederaan sendi",
        hypothesis: "Jantung laju akan mencetuskan serangan jantung mengejut (Keyakinan 85%)",
        disconfirms: "Membuktikan jantung sihat memang direka mengepam laju dengan selamat.",
        sudsDefault: 65
      },
      {
        id: "breathhold",
        title: "6. Tahan Nafas Penuh",
        method: "Duduk; tarik nafas biasa dan tahan selama 30–35 saat",
        duration: 35,
        sensation: "Dada ketat & refleks cemas",
        contra: "Elakkan jika: Penyakit jantung, darah tinggi tidak terkawal, glaukoma, atau sedang hamil",
        hypothesis: "Dada ketat bermaksud nafas saya akan terhenti terus (Keyakinan 75%)",
        disconfirms: "Membuktikan refleks pernafasan automatik badan sentiasa mengambil alih dengan selamat.",
        sudsDefault: 65
      },
      {
        id: "muscletension",
        title: "7. Tegangkan Semua Otot Badan",
        method: "Keraskan otot tangan, perut, bahu & kaki serentak tanpa menahan nafas keterlaluan",
        duration: 60,
        sensation: "Menggeletar halus & otot dada rasa ketat",
        contra: "Elakkan jika: Darah tinggi tidak terkawal, masalah jantung, glaukoma, atau sedang hamil",
        hypothesis: "Badan menggigil bermaksud saya sedang hilang kawalan saraf (Keyakinan 70%)",
        disconfirms: "Membuktikan menggigil & dada ketat hanyalah keletihan otot biasa yang tidak berbahaya.",
        sudsDefault: 55
      },
      {
        id: "stare",
        title: "8. Tenung Cermin / Titik Dinding",
        method: "Tenung mata sendiri di cermin atau satu titik di dinding selama 90 saat",
        duration: 90,
        sensation: "Rasa pelik macam mimpi (derealization)",
        contra: "Hati-hati jika: Migrain aura sensitif cahaya, mata kering teruk, atau sejarah trauma berat",
        hypothesis: "Rasa terpisah daripada badan bermaksud saya sedang jadi gila (Keyakinan 80%)",
        disconfirms: "Membuktikan rasa pelik itu cuma mata & fokus penat sementara—bukan tanda gila.",
        sudsDefault: 60
      },
      {
        id: "globus_hot",
        title: "9. Bonus: Telan Liur 6x / Jaket Tebal",
        method: "Telan air liur pantas 5–6x berturut-turut ATAU pakai jaket tebal tanpa kipas",
        duration: 60,
        sensation: "Rasa benda tersangkut di tekak (globus) atau bahang panas",
        contra: "Elakkan jika: Dehidrasi, demam, atau masalah menelan perubatan (disfagia)",
        hypothesis: "Tekak sempit akan tertutup rapat / badan panas tanda nak pengsan (Keyakinan 75%)",
        disconfirms: "Membuktikan otot tekak sekadar penat menelan & bahang kulit tidak berbahaya.",
        sudsDefault: 60
      }
    ],

    ieMistakes: [
      {
        title: "1. Campur Pernafasan Penenang Semasa Sesi Latihan",
        desc: "Panduan nafas penenang adalah untuk serangan mengejut di luar jangkaan. Semasa sesi latihan IE terancang, JANGAN guna nafas penenang, kipas, atau smartwatch—supaya otak belajar anda selamat TANPA pelindung palsu."
      },
      {
        title: "2. Berhenti Sebaik Rasa Cemas Memuncak (Saat Ke-15)",
        desc: "Berhenti awal mengukuhkan rasa takut! Habiskan tempoh penuh (malah tambah +15 saat selepas cemas muncul) dan ulang 3–5 pusingan."
      },
      {
        title: "3. Makan Ubat Penenang (Alprazolam) Sebelum Berlatih",
        desc: "Benzodiazepin menumpulkan isyarat saraf semula jadi dan menghalang otak menulis memori keselamatan baharu (Inhibitory Learning)."
      },
      {
        title: "4. Hanya Berlatih Ketika Segar Di Bilik Sendiri",
        desc: "Bila rasa takut di rumah turun rendah, gabungkan terus dengan situasi sebenar (cth: naik tangga laju sebelum masuk lif atau beratur di pasar raya)."
      }
    ],

    copingCards: [
      {
        id: "traffic",
        icon: "🚗",
        shortLabel: "1. Jem Jalan Raya",
        title: "Kad 1: Terperangkap Dalam Jem atau Lampu Isyarat",
        beats: [
          "💓 <strong>Apa Berlaku:</strong> Jantung laju & tangan kebas sekarang ialah kesan adrenalin serta cengkaman stereng terlalu kuat—BUKAN tanda nak pitam.",
          "🛡️ <strong>Kenapa Selamat:</strong> Orang pengsan bila tekanan darah jatuh, sedangkan Panic Attack MENAIKKAN tekanan darah dan menajamkan refleks memandu saya.",
          "👣 <strong>Buat Sekarang:</strong> Jatuhkan bahu, longgarkan jari pada stereng, hembus nafas perlahan 6 saat, dan teruskan memandu tenang bila lampu hijau."
        ],
        script:
          "Apa Berlaku: Jantung laju & tangan kebas sekarang ialah kesan adrenalin serta cengkaman stereng kuat, bukan nak pitam.\nKenapa Selamat: Pengsan berlaku bila tekanan darah jatuh, sedangkan panik menaikkan tekanan darah.\nBuat Sekarang: Jatuhkan bahu, longgarkan jari pada stereng, hembus perlahan 6 saat, dan teruskan memandu tenang—gelombang ini surut dalam 10 minit."
      },
      {
        id: "highway",
        icon: "🛣️",
        shortLabel: "2. Lebuh Raya",
        title: "Kad 2: Memandu di Lebuh Raya / Jambatan Jauh Dari Susur Keluar",
        beats: [
          "💓 <strong>Apa Berlaku:</strong> Rasa terperangkap & pandangan mengecil (tunnel vision) hanyalah fokus mata semasa siren palsu otak berbunyi.",
          "🛡️ <strong>Kenapa Selamat:</strong> Tangan dan kaki saya masih 100% berkuasa mengawal stereng serta brek seperti biasa—sama seperti semua rekod selamat saya sebelum ini.",
          "👣 <strong>Buat Sekarang:</strong> Kekal memandu stabil di lorong kiri tanpa berhenti mengejut di bahu jalan; biarkan adrenalin ini habis dibakar sendiri."
        ],
        script:
          "Apa Berlaku: Pandangan mengecil ini hanyalah fokus mata semasa penggera palsu otak berbunyi.\nKenapa Selamat: Tangan & kaki saya masih 100% mengawal stereng dan brek dengan selamat.\nBuat Sekarang: Kekal memandu stabil di lorong kiri tanpa berhenti mengejut di bahu jalan sehingga debaran surut sendiri."
      },
      {
        id: "crowd",
        icon: "🛒",
        shortLabel: "3. Pasar Raya",
        title: "Kad 3: Beratur Di Pasar Raya, Bank atau Tempat Terang & Bising",
        beats: [
          "💓 <strong>Apa Berlaku:</strong> Kepala rasa melayang di bawah lampu terang ini cuma mata & otak penat dengan bunyi/cahaya sekeliling.",
          "🛡️ <strong>Kenapa Selamat:</strong> Ini bukan tanda nak rebah atau hilang akal—dan orang sekeliling sibuk dengan urusan sendiri tanpa perasan debaran saya.",
          "👣 <strong>Buat Sekarang:</strong> Kekal berdiri di barisan (jangan tinggal troli!), jejakkan tapak kaki rata di lantai, dan hembus nafas perlahan 6 saat."
        ],
        script:
          "Apa Berlaku: Kepala rasa melayang di bawah lampu terang ini cuma kesan sementara deria penat, bukan nak rebah.\nKenapa Selamat: Orang sekeliling tidak nampak debaran dalaman saya dan saya tidak akan pengsan.\nBuat Sekarang: Kekal dalam barisan tanpa meninggalkan troli, jejakkan kaki di lantai, dan hembus perlahan 6 saat."
      },
      {
        id: "masjid",
        icon: "🕌",
        shortLabel: "4. Saf Masjid / Solat",
        title: "Kad 4: Berada Di Tengah Saf Masjid / Solat Jumaat / Majlis Ilmu",
        beats: [
          "💓 <strong>Apa Berlaku:</strong> Rasa hangat, berdebar, atau bergoyang sedikit selepas bangun sujud ialah perubahan aliran darah biasa di ruang ramai orang.",
          "🛡️ <strong>Kenapa Selamat:</strong> Udara di dalam ruang masjid masih mencukupi dan jantung saya sihat; keluar tergesa-gesa hanya melatih otak takut pada saf.",
          "👣 <strong>Buat Sekarang:</strong> Kendurkan bahu semasa berdiri/duduk tahiyat, hembus nafas lembut melalui mulut/hidung, dan teruskan solat dengan tenang."
        ],
        script:
          "Apa Berlaku: Rasa hangat atau berdebar semasa di tengah saf / bangun sujud ialah perubahan aliran darah biasa.\nKenapa Selamat: Oksigen ruang ini mencukupi dan badan saya selamat sepenuhnya.\nBuat Sekarang: Kendurkan bahu, bernafas lembut tanpa tergesa-gesa keluar saf, dan habiskan solat dengan tenang."
      },
      {
        id: "enclosed",
        icon: "🛗",
        shortLabel: "5. Lif / Tren LRT",
        title: "Kad 5: Ruang Tertutup (Lif, LRT/MRT, Kenderaan Awam)",
        beats: [
          "💓 <strong>Apa Berlaku:</strong> Dada rasa sempit sekarang berpunca daripada nafas dada yang terlalu laju—BUKAN kerana lif atau tren ini kehabisan oksigen.",
          "🛡️ <strong>Kenapa Selamat:</strong> Oksigen darah saya kekal penuh 98%–100% walaupun pintu tertutup dan tekak terasa tegang.",
          "👣 <strong>Buat Sekarang:</strong> Berhenti menyedut nafas besar secara paksa; hembus keluar perlahan 6 saat dan kekal sehingga sampai ke destinasi."
        ],
        script:
          "Apa Berlaku: Dada rasa sempit berpunca daripada nafas laju, bukan kerana ruang ini tiada oksigen.\nKenapa Selamat: Oksigen darah saya kekal penuh 98-100%.\nBuat Sekarang: Berhenti tarik nafas besar secara paksa, hembus perlahan 6 saat, dan kekal tenang hingga pintu terbuka."
      },
      {
        id: "flight",
        icon: "✈️",
        shortLabel: "6. Kapal Terbang",
        title: "Kad 6: Dalam Kapal Terbang (Semasa Berlepas, Gegaran atau Pintu Ditutup)",
        beats: [
          "💓 <strong>Apa Berlaku:</strong> Rasa telinga berdengung, perut ringan semasa pesawat mendaki, dan debaran ialah reaksi deria biasa terhadap perubahan tekanan kabin.",
          "🛡️ <strong>Kenapa Selamat:</strong> Kabin bertekanan selamat sepenuhnya (paras oksigen normal kabin ialah 93%–96%, jadi JANGAN semak smartwatch!) dan gegaran udara adalah normal bagi pesawat.",
          "👣 <strong>Buat Sekarang:</strong> Sandarkan belakang badan rapat ke kerusi, hembus nafas panjang 6 saat, atau tekap minuman sejuk pada pipi selama 20 saat."
        ],
        script:
          "Apa Berlaku: Debaran & rasa ringan semasa pesawat berlepas/bergegar ialah reaksi deria biasa.\nKenapa Selamat: Kabin pesawat selamat sepenuhnya (jangan semak bacaan SpO2 smartwatch di udara!).\nBuat Sekarang: Sandar rapat ke kerusi, hembus nafas 6 saat, atau tekap tin/botol sejuk di pipi 20 saat."
      },
      {
        id: "meeting",
        icon: "💼",
        shortLabel: "7. Mesyuarat / Exam",
        title: "Kad 7: Bilik Mesyuarat Senyap, Pembentangan atau Dewan Peperiksaan",
        beats: [
          "💓 <strong>Apa Berlaku:</strong> Suara bergetar sedikit, tapak tangan sejuk, dan jantung laju ialah tenaga adrenalin yang sedang menajamkan fokus otak.",
          "🛡️ <strong>Kenapa Selamat:</strong> Perasaan cemas dalaman terasa 10x lebih besar kepada diri sendiri berbanding apa yang orang lain nampak dari luar.",
          "👣 <strong>Buat Sekarang:</strong> Tekankan tapak kaki ke lantai bawah meja, bercakap lebih perlahan sedikit daripada biasa, dan teruskan tanpa meminta keluar bilik."
        ],
        script:
          "Apa Berlaku: Jantung laju & tangan sejuk ialah adrenalin biasa, bukan tanda hilang kawalan.\nKenapa Selamat: Orang lain hampir tidak perasan perubahan dalaman badan saya.\nBuat Sekarang: Jejakkan kaki rata di bawah meja, hembus perlahan, dan teruskan mesyuarat/peperiksaan dengan tenang."
      },
      {
        id: "nocturnal",
        icon: "🌙",
        shortLabel: "8. Terjaga 3 Pagi",
        title: "Kad 8: Terjaga Mengejut Tengah Malam (Nocturnal Panic)",
        beats: [
          "💓 <strong>Apa Berlaku:</strong> Tersentak bangun dengan jantung kencang ialah pelepasan adrenalin palsu semasa otak bertukar fasa tidur—BUKAN serangan jantung malam.",
          "🛡️ <strong>Kenapa Selamat:</strong> Jantung sihat mampu berdegup laju dengan selamat walaupun ketika badan baru bangun tidur.",
          "👣 <strong>Buat Sekarang:</strong> Duduk bersandar, basuh muka dengan air sejuk 20 saat, JANGAN tengok smartwatch atau Google simptom, dan baring semula bila nafas tenang."
        ],
        script:
          "Apa Berlaku: Tersentak bangun berdebar ialah kejutan adrenalin palsu semasa tukar fasa tidur.\nKenapa Selamat: Jantung saya sihat dan selamat walaupun berdegup laju ketika rehat.\nBuat Sekarang: Duduk bersandar, basuh muka air sejuk 20s, jangan semak jam pintar/Google, dan tidur semula bila lega."
      }
    ],

    defaultLadderSteps: [
      {
        id: 1,
        task: "Naik tangga laju sikit sebelum masuk lif 3 tingkat",
        safety: "Tanpa genggam telefon / tanpa tengok smartwatch",
        baseSuds: 45,
        done: true,
        postSuds: 15
      },
      {
        id: 2,
        task: "Beratur di kaunter pasar raya waktu ramai orang",
        safety: "Tanpa bawa botol air 'penyelamat' & tak tunggu tepi pintu",
        baseSuds: 70,
        done: false,
        postSuds: 30
      }
    ],

    crClusters: [
      {
        id: "c_heart",
        title: "1. Jantung Laju & Dada Mencucuk",
        distortion: "Salah Anggap: 'Salur darah tersumbat, aku kena serangan jantung!'",
        reality: "Fakta Badan: Sakit tajam yang berubah ikut tarikan nafas ialah otot dada tegang akibat adrenalin (bukan sakit menghimpit serangan jantung).",
        socratic: "Semak Fakta: 'Apa bukti doktor (ECG/darah)—bukan rasa takut—yang menyokong sangkaan ini?'"
      },
      {
        id: "c_faint",
        title: "2. Pening & Pandangan Kabur",
        distortion: "Salah Anggap: 'Aku mesti pengsan depan orang ramai kejap lagi!'",
        reality: "Fakta Badan: Pengsan berlaku bila tekanan darah JATUH mendadak, sedangkan Panic Attack MENAIKKAN tekanan darah dan menghalang kita pitam.",
        socratic: "Semak Fakta: 'Sudah berapa kali saya yakin 100% nak pengsan sebelum ini, dan berapa kali ia betul-betul terjadi?'"
      },
      {
        id: "c_breath",
        title: "3. Sesak Nafas & Tekak Rasa Sempit",
        distortion: "Salah Anggap: 'Tekak aku nak tertutup rapat, aku tak boleh bernafas!'",
        reality: "Fakta Badan: Oksigen darah kekal penuh 98–100%; rasa sempit itu cuma otot leher tegang sementara akibat adrenalin (laluan udara terbuka luas).",
        socratic: "Semak Fakta: 'Adakah ini bahaya sebenar, atau cuma otot tekak tegang + kurang CO₂ sebab nafas laju?'"
      },
      {
        id: "c_mind",
        title: "4. Dunia Rasa Pelik & Fikiran Laju",
        distortion: "Salah Anggap: 'Otak aku nak putus fius, hilang kawalan atau jadi gila!'",
        reality: "Fakta Pakar: Rasa 'blur' macam mimpi (derealization) ialah cara sementara otak berehat bila adrenalin tinggi—ia TIDAK PERNAH bertukar jadi gila.",
        socratic: "Semak Fakta: 'Kalau kawan baik saya yang sihat rasa macam ini sekarang, apa ayat tenang saya akan beritahu dia?'"
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
        desc: "Terapi pendedahan intensif 4 hari berturut-turut yang melatih pesakit berani menghadap terus rasa tidak selesa badan tanpa 'Safety Behaviors'."
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
        guardrail: "PENTING: Mulakan pada dos separuh/rendah! Beritahu pesakit awal-awal bahawa rasa gelisah ringan minggu 1–2 adalah sementara (pantau rapat perubahan mood bagi umur <25 tahun). Bagi wanita hamil/merancang kehamilan: utamakan CBT dahulu; elakkan Paroxetine (risiko jantung janin trimester 1) & benzodiazepin—bincang pilihan lebih selamat seperti Sertraline bersama doktor."
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
        notes: "Mula dos rendah; kesan penuh 2–6 minggu; kekalkan 6–24 bulan. Elakkan Paroxetine semasa hamil; hadkan dos maksimum Citalopram (20 mg) / Escitalopram (10 mg) pada warga emas >65 tahun (risiko QTc jantung)."
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
          "Bayangkan penggera kebakaran canggih yang berbunyi nyaring hanya kerana anda membakar roti di dapur. Penggera itu <strong>tidak rosak</strong>—ia cuma terlalu sensitif! Serangan panik ialah sistem keselamatan badan yang berfungsi terlalu rajin pada waktu yang salah.",
        family:
          "<strong>Cara Terangkan Kepada Saudara-Mara:</strong> Jantung pesakit bukannya sakit—ibarat penggera kereta yang berbunyi kuat kerana kucing melompat di atas bonet. Bunyinya bising, tetapi enjin kereta 100% elok!",
        clinical:
          "Menggambarkan hiper-reaktiviti amigdala-insulokortikal dan kemoreseptor ASIC1a/CO₂ terhadap rangsangan interoseptif jinak tanpa patologi kardiopulmonari."
      },
      {
        icon: "🌊",
        tag: "Analogi 2 • Rahsia 'Accept & Float'",
        title: "Pasir Jerlus & Terapung Mengikut Ombak 10 Minit",
        layman:
          "Jika anda termasuk ke dalam pasir jerlus atau arus laut, makin kuat anda meronta melawan ('Jangan panik!'), makin penat dan tenggelam jadinya. Tetapi bila anda <strong>berhenti meronta dan terapung tenang</strong> mengikut alunan ombak, adrenalin kehabisan bahan bakar sendiri dalam 10–20 minit.",
        family:
          "<strong>Kenapa Jangan Paksa Mereka 'Cepat Tenang!':</strong> Menyuruh pesakit melawan panik serta-merta adalah seperti menyuruh perenang meronta melawan arus—temani mereka terapung perlahan sehingga ombak 10 minit surut.",
        clinical:
          "Menjelaskan paradoks penekanan kognitif: perlawanan sekunder mengekalkan pengaktifan simpatetik, manakala penerimaan mengembalikan kawalan perencatan vmPFC dan tonus vagal."
      },
      {
        icon: "⌚",
        tag: "Analogi 3 • Kenapa 'Safety Behavior' Merugikan",
        title: "Tangkal Halau Harimau Di Tengah Bandar",
        layman:
          "Jika seorang kawan menepuk tangan setiap minit di pusat beli-belah sambil berkata 'Sebab aku tepuk tanganlah tiada harimau datang!', dia takkan pernah tahu harimau memang tiada di situ. Begitulah tabiat menyemak jam pintar atau duduk tepi pintu keluar!",
        family:
          "<strong>Kenapa Keluarga Perlu Lepaskan Berperingkat:</strong> Jika pasangan hanya berani keluar apabila anda memegang tangannya 24 jam, otaknya menyangka dunia luar memang penuh 'harimau'. Bantu mereka bina keberanian berdikari sedikit demi sedikit.",
        clinical:
          "Menerangkan model Salkovskis: tingkah laku keselamatan menghalang pembuktian salah (<em>disconfirmation</em>) terhadap ramalan katastrofik semasa pendedahan."
      }
    ],

    quizScenarios: [
      {
        id: "q1",
        scenario:
          "1. Aina (26 tahun) sedang beratur membeli makanan apabila jantungnya berdebar kencang, nafas tercungap-cungap, jari dan bibirnya rasa kebas semut-semut, serta dia takut akan pengsan. Apakah punca sebenar rasa kebas dan kepala ringan tersebut?",
        options: [
          "Tanda awal strok ringan (TIA) akibat saluran darah tersumbat",
          "Nafas terlalu laju membuang terlalu banyak gas CO₂, menyebabkan salur darah mengecut sedikit secara sementara",
          "Tekanan darah menjunam rendah secara berbahaya",
          "Kekurangan oksigen teruk di dalam paru-paru"
        ],
        correctIndex: 1,
        explanation:
          "Tepat! Bila nafas terlalu laju, oksigen darah sebenarnya penuh (98–100%), tetapi gas CO₂ terbuang berlebihan—itulah punca jari/bibir kebas dan kepala rasa melayang sementara. Ia bukan strok, malah tekanan darah sebenarnya naik sedikit!"
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
          "Betul! Ayat pendek yang tenang, memandu hembusan nafas panjang (4-2-6), dan tekap air/pek sejuk di muka (Dive Reflex) membantu memperlahankan nadi secara semula jadi. Jangan sesekali guna beg kertas!"
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
    lensMeta: {
      layman:
        "🫂 <strong>For Me (Patient View):</strong> Calm, everyday language focused on immediate practical steps—without heavy medical jargon.",
      family:
        "👨‍👩‍👧 <strong>Family &amp; Public View:</strong> Exact words to say, 30s 999 red-flag checks, and how to support recovery without feeding avoidance.",
      clinical:
        "🩺 <strong>Clinical View (Doctors / Therapists):</strong> DSM-5-TR / ICD-11 codes, baseline workup, receptor mechanisms, &amp; full meta-analytic evidence."
    },

    chapterLens: {
      ch2: {
        layman:
          "🫂 <strong>Gentle Reminder:</strong> Tick symptoms below simply as notes for your clinic visit—having ≥4 panic symptoms does <em>not</em> mean your heart is damaged.",
        family:
          "👨‍👩‍👧 <strong>Family 30s Triage:</strong> Ask calmly if chest pain feels heavy/crushing into the left arm or jaw, or if this is a first-ever attack over age 45. If yes, call <strong>999</strong> immediately.",
        clinical:
          "🩺 <strong>Baseline Organic Rule-Out:</strong> 12-lead ECG (exclude ACS/SVT), FBC, TSH/fT4, fasting glucose, electrolytes/Ca²⁺, and caffeine/sympathomimetic review prior to confirming <code>ICD-11 6B01</code>."
      },
      ch3: {
        layman:
          "🫂 <strong>Easy Win Today:</strong> Gradually cut down strong coffee or energy drinks over 7 days—many people notice daily palpitations drop dramatically!",
        family:
          "👨‍👩‍👧 <strong>Avoid 'Rescue Escapes':</strong> Don't rush your loved one out of every queue or take over 100% of errands—support gradual caffeine reduction and calm staying power.",
        clinical:
          "🩺 <strong>Adenosine Provocation Data (Klevebrant &amp; Frick, 2022):</strong> ~400–480 mg caffeine provokes full panic attacks in <strong>51.1%</strong> of panic disorder patients vs. 0% placebo via A1/A2A receptor antagonism."
      },
      ch4: {
        layman:
          "🫂 <strong>Keep It Simple:</strong> During a pounding surge, read your 60-Second Card below at most <strong>twice</strong>. The 10-step audit form stays tucked away below until you feel calm again.",
        family:
          "👨‍👩‍👧 <strong>Helping With 60s Scripts:</strong> During an attack, show their saved 60s card and read it slowly at most <strong>twice</strong>. Wait 30 minutes after the storm settles before discussing triggers.",
        clinical:
          "🩺 <strong>Clark (1986) &amp; Barlow-Craske Dual-Phase Protocol:</strong> Separate acute <em>Hot Cognition</em> (externalized 60s script capped at 2 reads to prevent mantra-like safety behavior) from post-surge <em>Cold Cognition</em> Socratic disconfirmation (&lt;15% belief target)."
      },
      ch5: {
        layman:
          "🫂 <strong>Go At Your Own Pace:</strong> Try just 1 gentle exercise once a doctor confirms you are medically clear. You are 100% in control!",
        family:
          "👨‍👩‍👧 <strong>Be a Cheerleader, Not a Rescuer:</strong> While your partner practices exposure, do <strong>not</strong> ask <em>'Are you okay?'</em> repeatedly or hand them water/fans. Praise their courage for finishing the timer!",
        clinical:
          "🩺 <strong>Inhibitory Learning Paradigm (Craske et al., 2014/2022):</strong> Target <em>expectancy violation</em> (disconfirming written catastrophe predictions with zero safety crutches) rather than relying on within-session SUDS habituation."
      },
      ch6: {
        layman:
          "🫂 <strong>Safe Questions for Your Doctor:</strong> Modern SSRIs are non-addictive. If prescribed, mild temporary jitteriness in week 1 is normal and fades as calm builds.",
        family:
          "👨‍👩‍👧 <strong>Family Support in Weeks 1–2:</strong> Early SSRI days can cause mild transient queasiness or restlessness before benefits appear in weeks 3–4. Encourage patience and <strong>never stopping abruptly</strong>.",
        clinical:
          "🩺 <strong>Prescribing Pearls (WFSBP v3 2023 • NICE CG113 • Cochrane NMA 2023):</strong> Initiate at half-dose to blunt early activation (Sertraline 25 mg → 50–150 mg; Escitalopram 5 mg → 10–20 mg). Maintain 6–24 months post-remission; avoid chronic benzodiazepines, propranolol &amp; buspirone."
      },
      ch8: {
        layman:
          "🫂 <strong>No-Pressure Practice:</strong> Try the 7 quick real-life scenarios below at your own pace to lock in confidence.",
        family:
          "👨‍👩‍👧 <strong>Family Quick Check:</strong> Scenarios #2 and #3 below specifically train spouses, parents, and coworkers on emergency vs. panic response!",
        clinical:
          "🩺 <strong>Clinical Competency Check:</strong> Covers ACS vs. panic triage, hypocapnic physiology, SSRI onboarding counseling, and PCT anti-crutch discipline."
      }
    },

    spectrumCards: [
      {
        id: "attack",
        badge: "Stage 1 • Symptom Episode",
        clinicalBadge: "ICD-11 MB23.H • Specifier",
        badgeClass: "pill-info",
        stat: "~1 in 8 Adults Experience One",
        title: "1. Panic Attack (The Acute Surge)",
        layman:
          "A sudden wave of intense fear and racing body sensations that peaks within minutes. By itself, it is <strong>not a mental illness</strong>—anyone can have one when exhausted, stressed, or over-caffeinated.",
        family:
          "<strong>For Family:</strong> Your loved one's pounding heart, trembling, and air hunger are a 100% real biological adrenaline surge—<strong>never fake or attention-seeking</strong>, even when medical tests are normal.",
        clinical:
          "A non-codable clinical specifier in DSM-5-TR (ICD-11: <code>MB23.H</code>). Defined as an abrupt surge of intense fear or discomfort reaching a peak within minutes with <strong>≥4 of 13 autonomic/cognitive symptoms</strong>; may be expected (<em>cued</em>) or <em>unexpected</em>."
      },
      {
        id: "disorder",
        badge: "Stage 2 • Recurrent Cycle",
        clinicalBadge: "Diagnosis ICD-11 6B01",
        badgeClass: "pill-warn",
        stat: "Highly Treatable With Right Care",
        title: "2. Panic Disorder (Fear of Fear)",
        layman:
          "Happens when unexpected surges repeat and leave you worrying for <strong>at least 1 month</strong> about when the next wave might strike. Good news: this loop responds remarkably well to treatment!",
        family:
          "<strong>For Family:</strong> After repeated out-of-the-blue surges, patients live in exhausting dread of the next attack. Gently encourage a supportive GP or MENTARI checkup without judgment.",
        clinical:
          "An anxiety disorder diagnosis (DSM-5-TR / ICD-11 <code>6B01</code>; 1.1%–4.7% prevalence, ~2:1 female-to-male ratio). Requires recurrent unexpected panic attacks + ≥1 month of persistent anticipatory concern or maladaptive behavioral change, after excluding organic causes."
      },
      {
        id: "agoraphobia",
        badge: "Stage 3 • Avoidance Trap",
        clinicalBadge: "Distinct DSM-5-TR Diagnosis",
        badgeClass: "pill-danger",
        stat: "Reversible Through Small Steps",
        title: "3. Agoraphobia (Shrinking Comfort Zone)",
        layman:
          "When you start avoiding <strong>2 or more everyday places</strong>—like traffic jams, highways, elevators, or supermarkets—for fear of feeling trapped. Small graded steps reopen your world!",
        family:
          "<strong>For Family:</strong> Taking over 100% of driving and shopping forever out of kindness accidentally shrinks their world further. Support small, steady steps back to independence.",
        clinical:
          "Coded as an independent diagnosis in DSM-5-TR (~25% comorbidity). Marked fear or avoidance of ≥2 of 5 domains (public transit, open spaces, enclosed places, queues/crowds, outside home alone) lasting ≥6 months."
      }
    ],

    neuroHotspots: [
      {
        id: "amygdala",
        title: "1. Amygdala & Brain Alarm",
        subtitle: "An Over-Sensitive Smoke Detector",
        badge: "Threat Alarm Hub",
        color: "#ef4444",
        layman:
          "Your amygdala acts like a smoke alarm. During panic, it misreads a harmless body shift as danger and hits the siren, while your logical 'brake pedal' briefly pauses.",
        family:
          "<strong>For Family:</strong> While the amygdala siren is blaring, their brain cannot process long lectures. Skip complex questions—use warm, short anchors like <em>'I am right here, you are safe.'</em>",
        clinical:
          "Dysregulation across the amygdala-centered fear network, BNST, hippocampus, and blunted ventromedial prefrontal cortex (vmPFC) inhibition. PET studies show reduced fronto-limbic <strong>GABA-A</strong> and <strong>5-HT1A</strong> binding, alongside hypersensitive <strong>ASIC1a/ASIC2</strong> acid-sensing ion channels."
      },
      {
        id: "lungs",
        title: "2. Lungs & Blood CO₂",
        subtitle: "Why You Feel 'Air Hunger' Despite Full Oxygen",
        badge: "Core Physiology #1",
        color: "#38bdf8",
        layman:
          "Even though your chest feels tight, your blood oxygen is <strong>98%–100% full</strong>! Fast chest breathing simply blows off too much CO₂—which is why a slow 6-second exhale helps so quickly.",
        family:
          "<strong>For Family:</strong> Never use a paper bag or shout 'Take a huge deep breath!'. Invite them to watch your shoulders and exhale slowly for 6 seconds together.",
        clinical:
          "Subclinical tidal-volume instability and dropping end-tidal pCO₂ can begin up to <strong>50 minutes prior</strong> to conscious panic onset (Meuret et al.). Acute hyperventilation drives <strong>hypocapnia</strong> and transient <strong>respiratory alkalosis</strong> without hypoxia."
      },
      {
        id: "brainVessels",
        title: "3. Brain Vessels & Tingling Nerves",
        subtitle: "Why Fingers Tingle & The Room Feels Like a Dream",
        badge: "Not a Stroke / Not Psychosis",
        color: "#a78bfa",
        layman:
          "Low CO₂ narrows brain blood vessels slightly for a few minutes—causing lightheadedness, dream-like unreality, and tingling fingers/lips. <strong>It is NOT a stroke or 'going crazy'!</strong>",
        family:
          "<strong>For Family:</strong> When they say 'my hands are numb' or 'everything feels unreal', stay calm—both hands tingling from fast breathing is harmless (whereas one-sided facial droop/weakness means call 999).",
        clinical:
          "Respiratory alkalosis induces transient mild cerebral vasoconstriction and shifts ionized serum calcium binding, directly producing acral/perioral paresthesias, dizziness, and transient protective derealization/depersonalization."
      },
      {
        id: "heart",
        title: "4. Heart & Adrenaline Surge",
        subtitle: "Racing Pulse & Why True Fainting Almost Never Happens",
        badge: "Blood-Pressure Paradox",
        color: "#f59e0b",
        layman:
          "Adrenaline speeds up your heart just like brisk exercise. Fainting requires blood pressure to <em>drop</em>, whereas panic <strong>raises blood pressure</strong>—so you won't collapse from panic!",
        family:
          "<strong>For Family:</strong> If someone truly loses consciousness and blacks out completely, do <strong>not</strong> assume panic—seek immediate emergency cardiac evaluation.",
        clinical:
          "Hypothalamic-sympathetic projections (T1–L2) and adrenal medullary catecholamine release elevate heart rate and arterial blood pressure. True vasovagal syncope is virtually absent in panic disorder (except in blood-injection-injury phobia)."
      },
      {
        id: "throatChest",
        title: "5. Throat Muscle & Chest Wall",
        subtitle: "The Choking Illusion & Sharp Chest Tightness",
        badge: "Muscle Tension",
        color: "#2dd4bf",
        layman:
          "Adrenaline tightens neck muscles, creating the illusion of a 'lump in the throat' even though your airway is wide open. Upper-chest breathing also strains rib muscles.",
        family:
          "<strong>For Family:</strong> Gently invite them to drop their shoulders, unclench their jaw, and take one small sip or swallow to prove their throat is open.",
        clinical:
          "Cricopharyngeal muscle hypertonicity produces benign <em>globus sensation</em> with normal airway patency. Accessory and intercostal muscle overuse causes localized anterior chest wall discomfort."
      },
      {
        id: "gutHangover",
        title: "6. Stomach Pause & Post-Surge Fatigue",
        subtitle: "Nausea During the Peak & Tiredness Afterward",
        badge: "Natural Recovery Brake",
        color: "#10b981",
        layman:
          "During alarm mode, your stomach pauses digestion (causing butterflies or nausea). After 15–20 minutes, your calming nerve kicks in and leaves you sleepy—proof the storm has passed!",
        family:
          "<strong>After It Settles:</strong> Expect your loved one to feel drained, chilly, and sleepy ('adrenaline hangover'). Offer a quiet space to rest without interrogation.",
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
      { id: "kopi_3in1", name: "3-in-1 Instant Coffee / Iced Milk Coffee", mg: 75 },
      { id: "teh_tarik", name: "Teh Tarik / Strong Black Tea", mg: 55 },
      { id: "matcha", name: "Matcha Latte / Green Tea", mg: 65 },
      { id: "energy", name: "Energy Drink Can", mg: 160 },
      { id: "preworkout", name: "Sports Pre-Workout Scoop", mg: 250 },
      { id: "cola", name: "Cola Soft Drink (330ml)", mg: 35 }
    ],

    nonCaffTriggers: [
      {
        id: "pseudoephedrine",
        name: "💊 Decongestant Cold Tablets (Pseudoephedrine / Phenylephrine)",
        note: "Directly stimulates adrenergic receptors and can trigger racing heart even with 0 mg caffeine."
      },
      {
        id: "vape_nicotine",
        name: "💨 High-Nicotine Vape / Cigarettes",
        note: "Nicotine acutely raises heart rate, blood pressure, and autonomic restlessness."
      },
      {
        id: "salbutamol",
        name: "🫁 Asthma Rescue Inhaler (Salbutamol / Ventolin)",
        note: "Essential for asthma (never skip!), but know that shaky hands and fast pulse right after puffing are normal beta-2 medication effects, not dangerous panic."
      }
    ],

    somaticClinicDrawer: [
      {
        id: "gerd",
        tabLabel: "🔥 GERD / Acid Reflux",
        badge: "#1 Clinic Question in Malaysia",
        title: "The GERD / Gastric Bloating ↔ Panic Attack Vagus Loop",
        layman:
          "Your esophagus, stomach, and heart share the exact same nerve highway—the <strong>Vagus Nerve</strong>. When stomach acid or bloating presses upward after spicy/late meals or coffee, the vagus nerve sends chest tightness and a 'throat lump' signal (<em>LPR globus</em>)—which your brain misreads as a heart problem and fires panic! Panic then squeezes the gut further. <strong>Practical Tip:</strong> Stay upright for 2–3 hours after meals and avoid coffee on an empty stomach—while still getting a doctor's ECG if chest pressure radiates to your jaw/arm or comes with cold sweats.",
        family:
          "<strong>For Family:</strong> Many patients describe 'trapped wind rising to the chest'. Never dismiss them—acid reflux genuinely irritates the vagus nerve and mimics breathlessness. Help them sit upright and pace slow 6-second exhales.",
        clinical:
          "Visceral vagal afferent crosstalk between the distal esophagus and nucleus tractus solitarius drives visceral hypersensitivity and laryngopharyngeal reflux (<em>globus</em>). Rule out inferior myocardial ischemia (which frequently mimics epigastric dyspepsia in women and diabetics) via 12-lead ECG; once cleared, prevent repetitive reassurance endoscopies."
      },
      {
        id: "hangover",
        tabLabel: "🔋 Post-Panic Hangover",
        badge: "1–4 Hours After Surge",
        title: "Why Do My Legs Shake & Feel Exhausted Hours After an Attack? ('Adrenaline Hangover')",
        layman:
          "Many people panic a second time because their legs still feel like jelly, they shiver with chills, and feel foggy an hour after the attack ended. This is an <strong>Adrenaline Hangover</strong>—your body just ran an internal sprint! <strong>Recovery Checklist:</strong> (1) Put on warm socks or a light layer, (2) Sip warm water and eat a light snack (toast/banana) to refuel muscle glycogen, (3) Walk gently around the room rather than lying frozen monitoring every heartbeat.",
        family:
          "<strong>For Family:</strong> Once the 15-minute storm settles, expect your loved one to look pale, chilly, and deeply sleepy for a couple of hours. Offer a light blanket and water, and save heavy conversations for tomorrow.",
        clinical:
          "Driven by skeletal muscle <strong>beta-2 adrenergic</strong> receptor stimulation (post-catecholamine physiological tremor), local glycogen depletion, and parasympathetic vagal rebound. Proactive psychoeducation prevents secondary catastrophic appraisal of residual tremor."
      },
      {
        id: "nocturnal_diff",
        tabLabel: "🌙 Waking at 3 AM",
        badge: "Affects 25%–33% of Patients",
        title: "Jolting Awake Between 2–4 AM With a Racing Heart (Nocturnal Panic)",
        layman:
          "Waking abruptly from deep sleep (without a nightmare!) gasping and pounding happens when brain CO₂ sensors overreact to natural breathing shifts between sleep stages. It is <strong>not a midnight heart attack</strong>. Sit propped up, splash cool water on your face for 20s, skip Google, and mention loud snoring or morning dry mouth to your doctor to check for <em>Sleep Apnea</em> or nighttime reflux.",
        family:
          "<strong>For Partners:</strong> Turn on a dim warm lamp (not harsh overhead lights), sit calmly beside them, and pace slow 6-second exhales together without firing questions.",
        clinical:
          "Occurs during non-REM N2→N3 transitions via heightened medullary chemoreceptor sensitivity to physiological sleep pCO₂ rises. Differential workup should exclude <em>Obstructive Sleep Apnea (OSA)</em>, nocturnal GERD, nocturnal asthma, and <em>paroxysmal nocturnal dyspnea (PND)</em>."
      },
      {
        id: "hormone_pots",
        tabLabel: "🩸 Hormones, Iron & POTS",
        badge: "Key Check for Women & Youth",
        title: "Why Does Panic Flare Before Periods, Postpartum, With Low Iron, or Upon Standing?",
        layman:
          "Four common body shifts often mimic or amplify panic: <strong>(1) Late luteal week before periods (PMDD) / Perimenopause</strong>—hormone dips lower your brain's natural calm buffer; <strong>(2) Postpartum</strong>—thyroid shifts & sleep loss; <strong>(3) Low Iron Stores (Ferritin)</strong>—causes palpitations & air hunger even before full anemia shows up; <strong>(4) Heat / Dehydration / POTS</strong>—heart rate jumps sharply when standing up quickly. Ask your GP for basic FBC, Ferritin, and Thyroid (TSH) blood tests!",
        family:
          "<strong>For Family:</strong> Never label premenstrual or postpartum panic as 'being overly dramatic'—progesterone/allopregnanolone withdrawal and low iron have direct biological effects on autonomic stability.",
        clinical:
          "Abrupt luteal/postpartum withdrawal of allopregnanolone (a potent positive allosteric modulator at extrasynaptic GABA-A receptors) lowers panic thresholds. Screen for postpartum thyroiditis, low serum ferritin (&lt;30 ng/mL), and <em>Postural Orthostatic Tachycardia Syndrome (POTS)</em> (≥30 bpm heart-rate rise within 10 mins of standing without orthostatic hypotension)."
      }
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
        truth: "Medical Fact: AVOID paper bags! Rebreathing lowers oxygen dangerously if the person is actually having an acute asthma attack, pulmonary embolism, or cardiac event. Pace slow 6-second exhales instead."
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
        method: "Sit upright; breathe through a thin straw by mouth with nostrils pinched",
        duration: 60,
        sensation: "Shortness of breath, air hunger",
        contra: "Avoid in: Asthma, COPD/chronic lung disease, cardiac disease, or pregnancy",
        hypothesis: "If I breathe through a straw for 60s, I will suffocate or pass out (85% belief)",
        disconfirms: "Proves restricted-breath sensations neither close the airway nor drop blood oxygen.",
        sudsDefault: 70
      },
      {
        id: "hypervent",
        title: "2. Controlled Fast Breathing (30/min)",
        method: "Sit safely; take brisk breaths in and out (~1 breath every 2 seconds)",
        duration: 60,
        sensation: "Lightheadedness, finger/lip tingling, unreality",
        contra: "Avoid in: Epilepsy/seizures, cardiac/cerebrovascular disease, asthma, or pregnancy",
        hypothesis: "If my hands tingle and room feels unreal, I'll have a stroke or go crazy (80% belief)",
        disconfirms: "Proves tingling and unreality are harmless, reversible CO₂ shifts.",
        sudsDefault: 75
      },
      {
        id: "spin",
        title: "3. Office Chair Spin (1 rev / 3s)",
        method: "Sit safely in a swivel chair clear of sharp edges and spin steadily",
        duration: 60,
        sensation: "Spinning dizziness & mild nausea",
        contra: "Avoid in: Active inner-ear / vestibular disorder or fall risk",
        hypothesis: "If I feel dizzy, I will lose control and collapse (75% belief)",
        disconfirms: "Proves spinning sensations settle naturally without collapsing.",
        sudsDefault: 60
      },
      {
        id: "headshake",
        title: "4. Rapid Head Turn (Eyes Open)",
        method: "Seated; turn head smoothly side-to-side for 30 seconds with eyes open",
        duration: 30,
        sensation: "Lightheadedness & brief visual blur",
        contra: "Avoid in: Cervical spine / neck injury or severe vertigo",
        hypothesis: "Blurry vision means I am about to faint right now (70% belief)",
        disconfirms: "Proves brief visual lag is harmless vestibular adaptation, never syncope.",
        sudsDefault: 55
      },
      {
        id: "jog",
        title: "5. Brisk High-Knee Jog in Place",
        method: "Jog briskly in place on non-slip flooring",
        duration: 60,
        sensation: "Pounding heart & warm sweat",
        contra: "Avoid in: Active cardiac disease/arrhythmia, uncontrolled hypertension, or joint injury",
        hypothesis: "A racing heart will trigger sudden cardiac arrest (85% belief)",
        disconfirms: "Proves a healthy heart is built to pump rapidly and recover safely.",
        sudsDefault: 65
      },
      {
        id: "breathhold",
        title: "6. Full Breath Hold",
        method: "Seated; take a normal breath and hold for 30–35 seconds",
        duration: 35,
        sensation: "Chest tightness & air-hunger reflex",
        contra: "Avoid in: Cardiac disease, uncontrolled hypertension, glaucoma, or pregnancy",
        hypothesis: "Chest tightness means my breathing will stop completely (75% belief)",
        disconfirms: "Proves automatic brainstem respiratory reflexes always resume smoothly.",
        sudsDefault: 65
      },
      {
        id: "muscletension",
        title: "7. Full-Body Isometric Tension",
        method: "Tense arms, abdomen, shoulders & legs without forceful Valsalva straining",
        duration: 60,
        sensation: "Trembling & anterior chest-wall tightness",
        contra: "Avoid in: Uncontrolled hypertension, cardiac conditions, glaucoma, or pregnancy",
        hypothesis: "Body trembling means I am losing neurological control (70% belief)",
        disconfirms: "Proves shaking and chest tightness are harmless muscle fatigue.",
        sudsDefault: 55
      },
      {
        id: "stare",
        title: "8. Mirror / Wall Dot Gaze",
        method: "Stare steadily at your own reflection or a wall dot for 90 seconds",
        duration: 90,
        sensation: "Dream-like detachment / unreality",
        contra: "Caution in: Photosensitive migraine aura, severe dry/corneal eye disease, or severe trauma dissociation",
        hypothesis: "Feeling detached means I am losing sanity or developing psychosis (80% belief)",
        disconfirms: "Proves perceptual strangeness is harmless visual fatigue, never psychosis.",
        sudsDefault: 60
      },
      {
        id: "globus_hot",
        title: "9. Bonus: Swallow 6x / Warm Jacket",
        method: "Swallow dryly 5–6x rapidly OR wear a warm jacket with the fan off",
        duration: 60,
        sensation: "Throat lump (globus) or sudden heat waves",
        contra: "Avoid in: Dehydration, fever, or medical swallowing disorder (dysphagia)",
        hypothesis: "My throat is closing shut / heat wave means imminent collapse (75% belief)",
        disconfirms: "Proves throat muscle fatigue and skin warmth are harmless sensations.",
        sudsDefault: 60
      }
    ],

    ieMistakes: [
      {
        title: "1. Mixing Calming Breathing Into Planned IE Training",
        desc: "Paced breathing is for unexpected acute surges. During planned IE sessions, DO NOT use calming breathing, fans, water, or smartwatches—so your brain learns you are safe WITHOUT any crutch."
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
        desc: "Once home fear drops low, bridge into real settings (e.g., climb stairs briskly right before taking an elevator, or sip half a coffee before shopping)."
      }
    ],

    copingCards: [
      {
        id: "traffic",
        icon: "🚗",
        shortLabel: "1. Traffic Jam",
        title: "Card 1: Stuck in Traffic or Stopped at a Red Light",
        beats: [
          "💓 <strong>What's Happening:</strong> My racing heart and tingling hands come from adrenaline and gripping the wheel too tightly—NOT impending fainting.",
          "🛡️ <strong>Why I'm Safe:</strong> Fainting requires a sudden drop in blood pressure, whereas panic RAISES blood pressure and sharpens my driving reflexes.",
          "👣 <strong>Do Right Now:</strong> Drop my shoulders, loosen my fingers on the wheel, exhale slowly for 6 seconds, and drive smoothly when the light turns green."
        ],
        script:
          "What's Happening: Racing heart & tingling hands come from adrenaline and tight wheel grip, not fainting.\nWhy I'm Safe: Fainting requires dropping blood pressure; panic raises blood pressure.\nDo Right Now: Drop shoulders, loosen grip, exhale for 6 seconds, and drive smoothly—this wave fades within 10 minutes."
      },
      {
        id: "highway",
        icon: "🛣️",
        shortLabel: "2. Highway / Bridge",
        title: "Card 2: Driving on a Highway or Bridge Far From an Exit",
        beats: [
          "💓 <strong>What's Happening:</strong> Feeling trapped with 'tunnel vision' is simply my eyes narrowing focus during a false brain alarm.",
          "🛡️ <strong>Why I'm Safe:</strong> My hands and feet still control the steering wheel and pedals at 100% capacity—just like every past drive I survived safely.",
          "👣 <strong>Do Right Now:</strong> Keep a steady cruising speed in the left lane without swerving onto the shoulder, and let this adrenaline burn off naturally."
        ],
        script:
          "What's Happening: Tunnel vision is just narrowed visual focus during a false brain alarm.\nWhy I'm Safe: My hands and feet still control the wheel and brakes at 100%.\nDo Right Now: Hold steady speed in the left lane without stopping on the shoulder until the surge passes."
      },
      {
        id: "crowd",
        icon: "🛒",
        shortLabel: "3. Supermarket",
        title: "Card 3: Bright Crowded Aisles & Long Queues (Mall, Bank, Event)",
        beats: [
          "💓 <strong>What's Happening:</strong> Feeling lightheaded under bright fluorescent lights is temporary sensory fatigue—not collapsing or losing my mind.",
          "🛡️ <strong>Why I'm Safe:</strong> Shoppers around me are focused on their own errands and cannot see my internal adrenaline.",
          "👣 <strong>Do Right Now:</strong> Stay in line without abandoning my cart, plant both feet flat on the floor, and exhale slowly for 6 seconds."
        ],
        script:
          "What's Happening: Lightheadedness under bright lights is temporary sensory fatigue, not collapsing.\nWhy I'm Safe: People around me cannot see my internal pulse and I will not faint.\nDo Right Now: Stay in line with my cart, plant both feet flat, and exhale slowly for 6 seconds."
      },
      {
        id: "masjid",
        icon: "🕌",
        shortLabel: "4. Mosque / Prayer Row",
        title: "Card 4: Middle of Congregation Row (Solat Jumaat / Quiet Service)",
        beats: [
          "💓 <strong>What's Happening:</strong> Feeling warm, pounding, or briefly lightheaded when rising from prostration (sujud) is a normal posture blood-flow shift.",
          "🛡️ <strong>Why I'm Safe:</strong> Plenty of oxygen fills this hall and my heart is healthy; rushing out only trains my brain to fear the prayer row.",
          "👣 <strong>Do Right Now:</strong> Soften my shoulders while standing or seated, breathe gently without gasping, and complete the prayer calmly."
        ],
        script:
          "What's Happening: Warmth or brief dizziness rising from sujud is a normal posture shift.\nWhy I'm Safe: Oxygen here is plentiful and my heart is completely safe.\nDo Right Now: Soften shoulders, breathe gently without bolting from the row, and finish calmly."
      },
      {
        id: "enclosed",
        icon: "🛗",
        shortLabel: "5. Lift / Train",
        title: "Card 5: Enclosed Spaces (Elevator, Train/LRT, Bus)",
        beats: [
          "💓 <strong>What's Happening:</strong> Chest tightness comes from fast upper-chest breathing—NOT because this cabin is running out of oxygen.",
          "🛡️ <strong>Why I'm Safe:</strong> My blood oxygen stays 98%–100% full even when the doors are shut and my throat feels tight.",
          "👣 <strong>Do Right Now:</strong> Stop forcing huge gulps of air; blow out gently for 6 seconds and stay put until my stop."
        ],
        script:
          "What's Happening: Chest tightness comes from fast chest breathing, not low room oxygen.\nWhy I'm Safe: My blood oxygen stays 98-100% full.\nDo Right Now: Stop gulping air, exhale gently for 6 seconds, and ride calmly to my stop."
      },
      {
        id: "flight",
        icon: "✈️",
        shortLabel: "6. Airplane Flight",
        title: "Card 6: Inside an Airplane (Doors Closed, Takeoff, or Turbulence)",
        beats: [
          "💓 <strong>What's Happening:</strong> Ear pressure, stomach lightness during climb, and a fast pulse are normal inner-ear sensations in a pressurized cabin.",
          "🛡️ <strong>Why I'm Safe:</strong> Commercial cabins are completely safe (normal healthy cabin SpO₂ is 93%–96%, so DO NOT check smartwatch SpO₂!) and turbulence is harmless.",
          "👣 <strong>Do Right Now:</strong> Press my back against the seat, exhale slowly for 6 seconds, or hold a cold drink cup gently against my cheeks for 20s."
        ],
        script:
          "What's Happening: Takeoff lightness & pulse surges are normal inner-ear reactions to cabin climb.\nWhy I'm Safe: Cabin air is completely safe (healthy cabin SpO2 is 93-96%, skip smartwatch checks!).\nDo Right Now: Lean back into the seat, exhale 6 seconds, or press a cool cup to my cheeks for 20s."
      },
      {
        id: "meeting",
        icon: "💼",
        shortLabel: "7. Meeting / Exam",
        title: "Card 7: Quiet Boardroom Meeting, Presentation, or Exam Hall",
        beats: [
          "💓 <strong>What's Happening:</strong> Cool hands, a slight voice quiver, and a racing heart are adrenaline sharpening my alertness.",
          "🛡️ <strong>Why I'm Safe:</strong> Internal adrenaline feels 10x louder inside my own body than anything visible to colleagues or examiners.",
          "👣 <strong>Do Right Now:</strong> Rest both feet firmly under the desk, speak 15% slower than usual, and stay in my seat until the wave settles."
        ],
        script:
          "What's Happening: Fast pulse & cool hands are normal performance adrenaline, not losing control.\nWhy I'm Safe: Others barely notice what feels loud inside me.\nDo Right Now: Plant feet firmly under the desk, slow my speech slightly, and stay seated calmly."
      },
      {
        id: "nocturnal",
        icon: "🌙",
        shortLabel: "8. Waking at 3 AM",
        title: "Card 8: Jolting Awake at Night (Nocturnal Panic Attack)",
        beats: [
          "💓 <strong>What's Happening:</strong> Waking abruptly with a pounding heart is a harmless adrenaline misfire between sleep stages—NOT a midnight heart attack.",
          "🛡️ <strong>Why I'm Safe:</strong> My healthy heart is built to pump fast safely even while resting in bed.",
          "👣 <strong>Do Right Now:</strong> Sit propped up, splash cool water on my face for 20s, DO NOT check smartwatch or Google symptoms, and lie back down once calm."
        ],
        script:
          "What's Happening: Jolting awake pounding is a harmless adrenaline misfire during sleep-stage shifts.\nWhy I'm Safe: My heart is strong and safe even beating fast at rest.\nDo Right Now: Sit propped up, cool my face for 20s, skip smartwatch/Google, and rest once settled."
      }
    ],

    defaultLadderSteps: [
      {
        id: 1,
        task: "Walk briskly up stairs right before riding a 3-floor elevator",
        safety: "No phone clutching / no smartwatch pulse check",
        baseSuds: 45,
        done: true,
        postSuds: 15
      },
      {
        id: 2,
        task: "Stand in a busy supermarket checkout queue",
        safety: "No rescue water bottle & no hovering near the exit",
        baseSuds: 70,
        done: false,
        postSuds: 30
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
        guardrail: "CRITICAL: Start at half-dose and titrate slowly! Warn patients upfront about transient week 1–2 activation (monitor mood closely in <25-year-olds). In pregnancy/perinatal care: prioritize CBT first-line; avoid Paroxetine (1st-trimester cardiac teratogenicity) & benzodiazepines—discuss preferred options like Sertraline with a physician."
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
        notes: "Start low, go slow; 2–6 weeks for full effect; maintain 6–24 months. Avoid Paroxetine in pregnancy; observe geriatric QTc max-dose caps for Citalopram (20 mg) & Escitalopram (10 mg) in adults >65."
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
          "Imagine a smoke alarm that blasts sirens just because you toasted bread. The alarm isn't 'broken'—its sensitivity dial is simply turned up too high! A panic attack is a healthy survival system firing at a false alarm.",
        family:
          "<strong>How to Explain It to Relatives:</strong> Their heart isn't failing—it's like a car alarm blaring loudly because a cat jumped onto the hood. The siren is loud, yet the engine is 100% healthy!",
        clinical:
          "Illustrates fronto-limbic and brainstem ASIC1a/CO₂ chemoreceptor hypersensitivity to benign interoceptive cues in the absence of cardiopulmonary pathology."
      },
      {
        icon: "🌊",
        tag: "Analogy 2 • Why 'Accept & Float' Works",
        title: "The Bamboo Finger Trap & The 10-Minute Ocean Wave",
        layman:
          "In a woven finger trap, the harder you yank and shout 'Stop panicking!', the tighter it grips. When you drop the fight, soften your shoulders, and <strong>float with the wave</strong>, adrenaline burns out naturally in 10–20 minutes.",
        family:
          "<strong>Why 'Just Snap Out of It!' Backfires:</strong> Ordering someone to stop panicking immediately is like telling a swimmer to fight a rip current—sit quietly beside them as they float until the 10-minute wave settles.",
        clinical:
          "Captures paradoxical secondary threat appraisal: fighting autonomic arousal sustains sympathetic output, whereas acceptance restores vmPFC inhibition and vagal tone."
      },
      {
        icon: "⌚",
        tag: "Analogy 3 • Why Safety Behaviors Backfire",
        title: "Clapping Hands to 'Keep Tigers Away' in the Mall",
        layman:
          "If someone claps every minute in a mall saying 'My clapping keeps tigers away!', their brain never learns there were zero tigers there. Clinging to smartwatches or exit seats tricks your brain into thinking you barely survived!",
        family:
          "<strong>Why Gradual Independence Matters:</strong> If your partner only dares go out while holding your hand 24/7, their brain stays convinced the mall is full of 'tigers'. Support gentle, step-by-step solo wins.",
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
