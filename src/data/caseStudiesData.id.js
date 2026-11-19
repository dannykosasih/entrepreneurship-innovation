export const CASE_STUDIES_ID = [
  {
    id: "case-kopi-ajib",
    title: "Kopi AJIB: Membangun Jaringan Ritel Nasional Berbasis Kecerdasan Buatan",
    subtitle: "Studi Kasus Bisnis Universitas Katolik Atma Jaya & IPMI",
    category: "Ritel Baru & Operasi AI",
    readingTime: "15 menit baca",
    summary: "Bagaimana startup kopi Indonesia berkembang dari satu gerai di Jakarta menjadi 812 lokasi di seluruh Indonesia dengan memadukan resep kopi spesialti, pemesanan berbasis aplikasi, dan rantai pasok prediktif berbasis AI.",
    context: {
      founded: "2019 di Jakarta, Indonesia",
      industry: "Ritel Cepat Saji Makanan & Minuman (New Retail)",
      outlets: "812 Gerai (per 2024)",
      employees: "6.400 Karyawan",
      keyFounders: "Edward & Tim (Terinspirasi dari unicorn kopi ritel Indonesia berpertumbuhan tinggi)"
    },
    sections: [
      {
        title: "1. Peluang Strategis & Celah Pasar",
        body: `Pada tahun 2019, pasar minuman perkotaan Indonesia terbelah menjadi dua ekstrem yang terpolarisasi:
1. **Warung Kopi Tradisional / Gerobak Keliling:** Sangat terjangkau (Rp 3.000–5.000/gelas), namun menggunakan robusta berkualitas rendah, campuran bubuk instan, dan kebersihan yang tidak konsisten.
2. **Kafe Internasional & Artisanal (misalnya Starbucks):** Menggunakan biji Arabika premium dan tempat duduk nyaman, tetapi dibanderol Rp 50.000+ per gelas—pengeluaran harian yang tidak berkelanjutan bagi kelas menengah perkotaan yang sedang tumbuh.

**Kopi AJIB memposisikan diri di 'Celah Tengah Kosong' (Empty Middle):** Espresso segar dan autentik yang diracik dari biji kopi lokal Indonesia serta susu segar/gula aren, dijual seharga **Rp 18.000–22.000**, dengan pemesanan awal berbasis aplikasi dan layanan cepat *grab-and-go*.`
      },
      {
        title: "2. Pembalikan Kinerja Keuangan Multi-Tahun (2021 – 2024)",
        body: `Selama 2021–2022, Kopi AJIB menjalankan strategi ekspansi agresif (*land-grab*) untuk membuka gerai dan membangun aplikasi menggunakan pendanaan modal ventura Seri A dan Seri B. Pada 2023, perusahaan beralih dari ekspansi mentah menuju profitabilitas *unit economics* operasional.`,
        financialTable: [
          { metric: "Pendapatan Tahunan (Rp Miliar)", y2021: "342", y2022: "741", y2023: "1.180", y2024: "1.520" },
          { metric: "Beban Pokok Penjualan / COGS (Rp Miliar)", y2021: "174", y2022: "363", y2023: "555", y2024: "700" },
          { metric: "Laba Kotor / Gross Profit (Rp Miliar)", y2021: "168", y2022: "378", y2023: "625", y2024: "820" },
          { metric: "Margin Laba Kotor (%)", y2021: "49,1%", y2022: "51,0%", y2023: "53,0%", y2024: "53,9%" },
          { metric: "Beban Operasional / OPEX (Rp Miliar)", y2021: "245", y2022: "436", y2023: "612", y2024: "742" },
          { metric: "Laba Operasional / EBIT", y2021: "-77 (Rugi)", y2022: "-58 (Rugi)", y2023: "+13 (Balik Laba)", y2024: "+78 (Untung)" }
        ]
      },
      {
        title: "3. Unit Economics & Nilai Seumur Hidup Pelanggan (CLV)",
        body: `Transformasi menuju profitabilitas didorong oleh peningkatan efisiensi akuisisi pelanggan dan retensi digital:`,
        metricsComparison: [
          { label: "Biaya Akuisisi Pelanggan (CAC)", y2022: "Rp 48.000", y2024: "Rp 31.000", change: "Membaik -35,4%" },
          { label: "Nilai Seumur Hidup Pelanggan (CLV)", y2022: "Rp 190.000", y2024: "Rp 268.000", change: "Tumbuh +41,1%" },
          { label: "Rasio CLV : CAC", y2022: "4,0x", y2024: "8,6x", change: "Leverage operasional +115%" },
          { label: "Pengguna Aktif Bulanan Aplikasi", y2022: "1,8 Juta", y2024: "4,3 Juta", change: "Ekspansi +138%" },
          { label: "Tingkat Retensi 90 Hari", y2022: "34%", y2024: "51%", change: "+17 poin persentase" },
          { label: "Porsi Pesanan via Aplikasi", y2022: "38%", y2024: "57%", change: "Kanal dominan" }
        ]
      },
      {
        title: "4. Arsitektur Teknologi AI & Dampak Rantai Pasok",
        body: `Kopi AJIB menerapkan siklus umpan balik data menyeluruh di seluruh 812 gerainya:
• **Model Prediksi Permintaan (Demand Forecasting):** Model *machine learning* memprediksi konsumsi gelas per jam di setiap gerai menggunakan data penjualan historis, prakiraan hujan regional, kalender sekolah, dan kepadatan lalu lintas.
• **Penempatan Gerai Geospasial:** Mengevaluasi kepadatan lalu lintas pejalan kaki dan telemetri seluler untuk mencegah kanibalisasi penjualan antar-gerai yang berdekatan.
• **Penjadwalan Barista Dinamis:** Shift staf garda depan diselaraskan secara presisi dengan lonjakan permintaan pukul 07.00–09.30 dan 15.00–17.00.`,
        supplyChainMetrics: [
          { metric: "Limbah & Kerusakan Bahan Baku", beforeAI: "9,5%", afterAI: "3,8%", impact: "Menghemat ~Rp 39 Miliar per tahun" },
          { metric: "Kehabisan Stok Bulanan per Gerai", beforeAI: "7,2 kejadian", afterAI: "2,1 kejadian", impact: "Lebih sedikit penjualan yang hilang" },
          { metric: "Akurasi Prediksi Permintaan", beforeAI: "61%", afterAI: "88%", impact: "Produksi roastery jauh lebih presisi" },
          { metric: "Waktu Kirim Gudang ke Gerai", beforeAI: "18 Jam", afterAI: "11 Jam", impact: "Susu & biji kopi lebih segar" }
        ]
      },
      {
        title: "5. Analisis Lima Kekuatan Porter (Porter's Five Forces)",
        body: `Mengevaluasi lingkungan kompetitif struktural Kopi AJIB:
1. **Ancaman Pendatang Baru (TINGGI):** Membuka gerai kopi sederhana membutuhkan modal rendah (~Rp 50 Juta). Namun, ekspansi melampaui 50 gerai tanpa perangkat lunak mandiri akan menyebabkan kegagalan rantai pasok.
2. **Daya Tawar Pembeli (TINGGI):** Konsumen menghadapi biaya perpindahan nol; mereka dapat berjalan 50 meter ke Janji Jiwa, Tomoro, atau Point Coffee. Kopi AJIB menahannya melalui poin loyalitas aplikasi dan personalisasi.
3. **Daya Tawar Pemasok (RENDAH–SEDANG):** Kemitraan langsung dengan koperasi petani di Aceh Gayo, Toraja, dan Kintamani mengamankan volume terjamin sehingga perusahaan terlindungi dari fluktuasi pasar grosir.
4. **Ancaman Produk Substitusi (TINGGI):** Minuman siap minum (RTD) kemasan botol, teh siap saji, boba, dan kopi saset instan.
5. **Rivalitas Industri (SANGAT TINGGI):** Perang harga sengit dan kupon promo agresif di seluruh pusat perkotaan.`
      }
    ],
    discussionQuestions: [
      {
        q: "Di fungsi bisnis manakah Kecerdasan Buatan (AI) memberikan dampak EBITDA laba bersih terbesar bagi Kopi AJIB, dan mengapa?",
        guidance: "Perhatikan pengurangan limbah rantai pasok (turun dari 9,5% menjadi 3,8% pada COGS Rp 700 Miliar menghemat lebih dari Rp 39 Miliar secara langsung) yang berpadu dengan penurunan CAC dari Rp 48 ribu menjadi Rp 31 ribu."
      },
      {
        q: "Apa risiko utama dari ketergantungan berlebihan pada keputusan algoritmik dalam penetapan harga pelanggan dan penjadwalan staf gerai?",
        guidance: "Penetapan harga algoritmik dapat menjauhkan segmen sensitif harga jika dianggap sebagai lonjakan harga yang tidak adil; algoritma penjadwalan staf dapat mendehumanisasi pekerja garda depan bila tidak mempertimbangkan kelelahan manusia atau kondisi darurat lokal."
      },
      {
        q: "Jika kompetitor UMKM hanya memiliki anggaran Rp 100 Juta, bagaimana mereka dapat memanfaatkan 'Inovasi Sintesis' untuk bersaing melawan Kopi AJIB tanpa membangun perangkat lunak AI sendiri?",
        guidance: "Gunakan POS cloud siap pakai (Moka/Pawoon), automasi CRM WhatsApp Business, serta kemitraan komunitas hiperlokal untuk menghadirkan kehangatan dan personalisasi khas yang tidak mudah ditiru jaringan korporasi besar."
      }
    ]
  },
  {
    id: "case-ai-synthetic-persona",
    title: "AI dalam Kewirausahaan: Validasi Cepat dengan Persona Pelanggan Sintetis",
    subtitle: "Lokakarya Pengembangan Pelanggan Atma Jaya & Steve Blank",
    category: "AI & Prototipe Startup",
    readingTime: "10 menit baca",
    summary: "Bagaimana founder mahasiswa menggunakan rekayasa prompt terstruktur dan persona LLM untuk menguji panduan wawancara pelanggan serta menemukan friksi pasar tersembunyi sebelum mengeluarkan modal.",
    context: {
      framework: "Customer Discovery Steve Blank + AI Generatif",
      targetAudience: "Inovator mahasiswa universitas & founder tahap pre-seed",
      tooling: "Prompt Engineering, Simulasi Persona, Generator Mockup Visual"
    },
    sections: [
      {
        title: "1. Dilema Riset Pasar bagi Mahasiswa & Founder Pemula",
        body: `Mahasiswa universitas dan founder pemula sering kali kesulitan menjalankan riset pasar tradisional:
• Ukuran sampel yang kecil dan bias (hanya bertanya kepada teman sekamar atau sahabat dekat).
• Responden yang terlalu sopan memberikan dorongan palsu ('Tentu, saya pasti akan membeli itu!').
• Biaya tinggi dan waktu pengerjaan lambat dari agensi riset pasar profesional.

Dengan menggunakan AI Generatif sebagai **Persona Pelanggan Sintetis (Synthetic Customer Persona)**, founder dapat melatih wawancara pelanggan yang tajam dan skeptis tanpa biaya.`
      },
      {
        title: "2. Arsitektur Prompt Persona Sintetis",
        body: `Untuk menggali keberatan yang realistis alih-alih pujian umum, prompt harus merinci:
1. **Konteks Demografis:** Usia, pekerjaan, pendapatan bersih bulanan, kota tempat tinggal.
2. **Kebiasaan Perilaku:** Alat yang dipakai saat ini dan pola pengeluaran harian.
3. **Arahan Skeptisisme Inti:** Memerintahkan model untuk aktif mencari celah, menyoroti sensitivitas harga, dan menolak berkomitmen kecuali rasa sakit (pain) yang mendesak benar-benar terpecahkan.

*Contoh Prompt:* 'Anda adalah mahasiswa S1 berusia 22 tahun di Semanggi, Jakarta, dengan uang saku bulanan Rp 2.500.000. Anda menyukai es kopi tetapi tidak mampu membeli Starbucks setiap hari. Saya sedang mewawancarai Anda mengenai keputusan pembelian harian Anda. Bersikaplah kritis, skeptis, dan jangan memuji saya.'`
      },
      {
        title: "3. Batas Etis: Persiapan AI vs. Validasi Manusia Nyata",
        body: `AI Generatif mempercepat persiapan, membantu menyusun pertanyaan wawancara, dan menemukan keberatan kasus tepi (*edge-case*). Namun, **persona sintetis tidak memiliki rekening bank nyata.** *Problem-solution fit* dan validasi pelanggan sejati menuntut manusia sungguhan yang membayar dengan uang nyata atau menandatangani komitmen pre-order yang mengikat.`
      }
    ],
    discussionQuestions: [
      {
        q: "Mengapa persona AI sintetis tidak dapat menggantikan wawancara Customer Discovery dengan manusia sungguhan?",
        guidance: "Persona AI dapat berhalusinasi atau sekadar mencerminkan rata-rata statistik alih-alih friksi emosional manusia yang autentik, dan AI tidak dapat memberikan transaksi keuangan nyata ataupun komitmen pembelian."
      }
    ]
  }
];
