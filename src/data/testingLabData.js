/**
 * Teaching content for testing a Business Model Canvas and a Value Proposition Canvas.
 * Paraphrased in Indonesian from Research DeKa source notes (11 Nov 2026),
 * which synthesize the Test section of Value Proposition Design
 * (Osterwalder, Pigneur, Bernarda & Smith, 2014), Testing Business Ideas
 * (Bland & Osterwalder, 2019), and Strategyzer practice notes.
 * Thresholds, durations, and evidence/cost ratings are editorial illustrations,
 * never book benchmarks — always labelled "ilustrasi".
 * No print page numbers are cited for Business Model Generation or Testing
 * Business Ideas (those were not verified). Value Proposition Design is cited
 * by chapter/section; the three-fit page cue comes from a Strategyzer article,
 * not from inspection of the attached PDF (which was not available in this workspace).
 */

export const TESTING_STORAGE_KEYS = {
  bmc: 'innoventures_testing_lab_bmc',
  vpd: 'innoventures_testing_lab_vpd',
};

export const TESTING_INTRO = {
  title: 'Cara Menguji',
  lede: 'Kanvas yang sudah rapat belum tentu berlaku di lapangan. Setiap tempelan di Business Model Canvas maupun Value Proposition Canvas adalah hipotesis: dugaan yang harus diuji, bukan bukti yang sudah terkumpul. Menguji dengan murah dan cepat mengurangi risiko membangun tawaran yang tidak diinginkan, tidak bisa diwujudkan, atau tidak layak secara ekonomi.',
};

export const TESTING_LENSES = [
  {
    id: 'desirability',
    label: 'Desirability',
    idLabel: 'Keinginan pelanggan',
    question: 'Apakah pelanggan menginginkannya?',
    hint: 'Blok Segmen Pelanggan, Proposisi Nilai, Saluran, dan Hubungan Pelanggan; serta Jobs, Nyeri, Manfaat, dan Peta Nilai di VPC.',
    example: 'Ilustrasi: pemilik UMKM ingin mencoba pendamping arus kas karena rekonsiliasi mingguan menyita waktu.',
  },
  {
    id: 'feasibility',
    label: 'Feasibility',
    idLabel: 'Kelayakan operasional',
    question: 'Dapatkah kita membangun dan menyampaikannya, termasuk saat skala meningkat?',
    hint: 'Blok Sumber Daya, Aktivitas, dan Mitra Utama.',
    example: 'Ilustrasi: tim dapat menghasilkan laporan akurat dalam waktu pelayanan yang dijanjikan.',
  },
  {
    id: 'viability',
    label: 'Viability',
    idLabel: 'Keberlanjutan ekonomi',
    question: 'Apakah pendapatan, harga, dan biaya memungkinkan laba yang berkelanjutan?',
    hint: 'Blok Aliran Pendapatan dan Struktur Biaya.',
    example: 'Ilustrasi: harga yang dibayar pelanggan menutup biaya layanan dan akuisisi dengan margin memadai.',
  },
];

export const TESTING_STEPS = [
  {
    id: 'extract',
    title: '1. Turunkan hipotesis',
    body: 'Uraikan dugaan dari BMC dan VPC. Tulis satu hipotesis per kartu yang spesifik, dapat diuji, dan dapat dibantah: jelaskan segmen, konteks, perilaku, dan periodenya. Tandai desirability, feasibility, atau viability, dan pecah dugaan yang terlalu kompleks agar hasilnya bisa ditafsirkan. Pengelompokan ini merujuk risiko, bukan kotak yang saling meniadakan — harga misalnya terkait keinginan dan keberlanjutan ekonomi sekaligus. Disukai pelanggan tidak otomatis berarti layak secara teknis atau menguntungkan.',
  },
  {
    id: 'prioritize',
    title: '2. Utamakan asumsi paling berisiko',
    body: 'Petakan kepentingan (dampak jika salah) berhadapan dengan bukti yang sudah ada. Simpan catatan atau tautan bukti, bukan sekadar opini. Prioritaskan yang sangat penting tetapi minim bukti — itulah asumsi yang paling bisa menggagalkan usaha. Jangan hanya mengulang tes yang paling mudah; pilih tes murah dan cepat yang tetap relevan, tingkatkan komitmen yang diuji, dan triangulasikan beberapa tes untuk hipotesis yang kritis.',
  },
  {
    id: 'test-card',
    title: '3. Rancang tes di Kartu Tes',
    body: 'Sebelum mengumpulkan data, isi Kartu Tes (Test Card). Tetapkan hipotesis, eksperimen, metrik, dan kriteria keberhasilan di muka — termasuk pembilang, penyebut, pengecualian, dan periode — agar gawang tidak digeser setelah hasil terlihat. Bila sampel atau instrumen tidak memadai, hasilnya bisa belum konklusif, bukan otomatis berhasil atau gagal.',
  },
  {
    id: 'learn',
    title: '4. Tangkap pembelajaran di Kartu Belajar',
    body: 'Setelah eksperimen, isi Kartu Belajar (Learning Card): dugaan yang diuji, apa yang benar-benar diamati beserta konteksnya, kesimpulan yang didukung observasi termasuk batasnya, dan keputusan berikutnya. Simpan hasil negatif serta ketidakpastian, jangan hanya angka yang mendukung ide. Perbarui kanvas, lalu lanjutkan, ubah arah, atau hentikan.',
  },
];

export const EXPERIMENT_GROUPS = [
  {
    id: 'discovery',
    title: 'Discovery — eksplorasi awal',
    intro: 'Cocok untuk memahami masalah, bahasa pelanggan, dan minat awal. Bukti di tahap ini jarang cukup untuk mengklaim pembelian atau product-market fit.',
  },
  {
    id: 'validation',
    title: 'Validation — komitmen dan realisme yang lebih tinggi',
    intro: 'Cocok ketika Anda meningkatkan komitmen (tindakan, pembayaran, pemakaian berulang) dan realisme operasional. Nama metode tidak otomatis membuat buktinya kuat.',
  },
];

export const EXPERIMENT_TYPES = [
  {
    id: 'interview',
    group: 'discovery',
    title: 'Wawancara pelanggan',
    body: 'Gali kejadian nyata terakhir dan cara pelanggan menyiasatinya, bukan pertanyaan “mau beli?”.',
    risk: 'Desirability: jobs, nyeri, dan manfaat. Viability hanya secara eksploratif untuk harga.',
    evidence: 'Rendah untuk pembelian; sedang untuk konteks jika ada contoh konkret. Rawan bias ingatan dan kesopanan.',
    costTime: 'Biaya rendah; waktu ilustrasi 3–7 hari.',
    metric: 'Ilustrasi: sekurang-kurangnya 6 dari 10 peserta menceritakan kejadian masalah terkini beserta cara menyiasatinya. Ini bukan estimasi prevalensi populasi.',
    source: 'Testing Business Ideas, bagian Discovery; Value Proposition Design, bagian Test.',
  },
  {
    id: 'search',
    group: 'discovery',
    title: 'Analisis tren pencarian',
    body: 'Bandingkan istilah, wilayah, dan musim pencarian yang terkait masalah.',
    risk: 'Desirability: minat pada masalah.',
    evidence: 'Rendah. Pencarian bukan pembelian, dan indeks tren bukan volume pasar yang pasti.',
    costTime: 'Biaya rendah; waktu ilustrasi 1–2 hari.',
    metric: 'Ilustrasi: sekurang-kurangnya tiga istilah relevan menunjukkan minat di wilayah sasaran selama 12 bulan; periksa musiman.',
    source: 'Testing Business Ideas, bagian Discovery.',
  },
  {
    id: 'forums',
    group: 'discovery',
    title: 'Telaah forum diskusi',
    body: 'Baca diskusi publik pelanggan tentang masalah dan alternatif yang mereka pakai.',
    risk: 'Desirability: nyeri yang berulang dan bahasa pelanggan.',
    evidence: 'Rendah sampai sedang untuk masalah. Ada bias memilih diri sendiri; konteks dan identitas perlu dicek.',
    costTime: 'Biaya rendah; waktu ilustrasi 2–4 hari.',
    metric: 'Ilustrasi: sekurang-kurangnya 10 penulis berbeda di sekurang-kurangnya 3 utas independen membahas nyeri yang sama pada periode yang ditentukan.',
    source: 'Testing Business Ideas, bagian Discovery.',
  },
  {
    id: 'ads',
    group: 'discovery',
    title: 'Iklan daring',
    body: 'Uji pesan dan segmen melalui iklan, lalu lihat siapa yang mengklik.',
    risk: 'Desirability: saluran dan pesan proposisi nilai. Viability hanya sebagai proksi biaya.',
    evidence: 'Sedang untuk klik, rendah untuk pembelian. Rasa ingin tahu bukan komitmen.',
    costTime: 'Biaya sedang; waktu ilustrasi 3–7 hari.',
    metric: 'Ilustrasi: rasio klik-tayang sekurang-kurangnya 2% dari sekurang-kurangnya 1.000 tayangan sasaran, lalu lanjut ukur aksi yang berkualitas.',
    source: 'Testing Business Ideas, bagian Discovery (Online Ad).',
  },
  {
    id: 'landing',
    group: 'validation',
    title: 'Landing page / smoke test',
    body: 'Halaman manfaat dengan ajakan mendaftar pilot. Jelaskan jika produk belum tersedia umum.',
    risk: 'Desirability. Viability awal hanya jika harga dan komitmen sudah jelas.',
    evidence: 'Sedang untuk pendaftaran. Pendaftaran gratis tidak membuktikan kesediaan membayar.',
    costTime: 'Biaya rendah sampai sedang; waktu ilustrasi 3–10 hari.',
    metric: 'Ilustrasi: sekurang-kurangnya 10 dari 100 pengunjung unik yang memenuhi kriteria mendaftar. Bila trafik kurang dari rencana, hasilnya belum konklusif.',
    source: 'Testing Business Ideas menempatkan Simple Landing Page pada bagian Validation, bukan Discovery, meskipun smoke test lewat email bisa bersifat eksploratif.',
    classificationNote: true,
  },
  {
    id: 'video',
    group: 'discovery',
    title: 'Video penjelas',
    body: 'Gambarkan cara pakai dan manfaat, lalu pasang ajakan bertindak.',
    risk: 'Desirability: pemahaman dan minat. Bukan tes kelayakan teknis.',
    evidence: 'Rendah jika hanya diukur dari tayangan atau pujian; sedang jika ada tindakan berkualitas.',
    costTime: 'Biaya rendah sampai sedang; waktu ilustrasi 3–7 hari.',
    metric: 'Ilustrasi: sekurang-kurangnya 8 dari 100 penonton unik sasaran meminta demo; cek pemahaman manfaat secara terpisah.',
    source: 'Testing Business Ideas, bagian Discovery; catatan Strategyzer tentang video sebagai tes belajar.',
  },
  {
    id: 'paper',
    group: 'discovery',
    title: 'Prototipe kertas',
    body: 'Minta peserta menyelesaikan tugas lewat sketsa antarmuka tanpa arahan.',
    risk: 'Desirability: kegunaan dan alur, bukan kelayakan teknis.',
    evidence: 'Sedang untuk kegunaan yang diamati, rendah untuk adopsi atau pembayaran.',
    costTime: 'Biaya rendah; waktu ilustrasi 1–3 hari.',
    metric: 'Ilustrasi: sekurang-kurangnya 4 dari 5 peserta menyelesaikan tugas utama tanpa bantuan. Sampel kecil bukan bukti statistik populasi.',
    source: 'Testing Business Ideas, bagian Discovery; prinsip “ucapan dibanding tindakan” di bagian Test Value Proposition Design.',
  },
  {
    id: 'storyboard',
    group: 'discovery',
    title: 'Papan cerita (storyboard)',
    body: 'Rangkaian masalah, pemakaian, lalu hasil, untuk diuji reaksinya.',
    risk: 'Desirability: relevansi skenario dan manfaat.',
    evidence: 'Rendah sampai sedang. Reaksi terhadap konsep bukan pemakaian nyata.',
    costTime: 'Biaya rendah; waktu ilustrasi 1–3 hari.',
    metric: 'Ilustrasi: sekurang-kurangnya 4 dari 5 peserta menjelaskan manfaat dengan kata sendiri dan mengaitkannya ke pengalaman nyata tanpa dipandu.',
    source: 'Testing Business Ideas, bagian Discovery.',
  },
  {
    id: 'concierge',
    group: 'validation',
    title: 'Concierge',
    body: 'Layanan diantar secara manual dan terbuka, seolah produk sudah ada.',
    risk: 'Desirability dan feasibility. Viability jika berbayar dan biaya diukur.',
    evidence: 'Sedang sampai kuat untuk hasil dan pemakaian. Perhatian personal bisa melebihkan nilai. Bukan bukti otomatisasi atau skala. Concierge juga bisa dipakai secara eksploratif.',
    costTime: 'Biaya sedang sampai tinggi; waktu ilustrasi 1–3 minggu.',
    metric: 'Ilustrasi: sekurang-kurangnya 4 dari 5 pelanggan mencapai hasil yang disepakati; catat menit kerja per pelanggan dan pembelian ulang.',
    source: 'Testing Business Ideas, bagian Validation.',
  },
  {
    id: 'wizard',
    group: 'validation',
    title: 'Wizard of Oz',
    body: 'Tampilan depan seolah otomatis, sementara proses belakang dijalankan manual.',
    risk: 'Desirability dan feasibility alur layanan. Viability jika berbayar.',
    evidence: 'Sedang sampai kuat untuk pengalaman. Tidak memvalidasi teknologi otomatis atau skalabilitas.',
    costTime: 'Biaya sedang sampai tinggi; waktu ilustrasi 1–3 minggu.',
    metric: 'Ilustrasi: sekurang-kurangnya 8 dari 10 tugas selesai sesuai janji waktu pilot, dengan kerja manual tidak lebih dari 20 menit per tugas.',
    source: 'Testing Business Ideas, bagian Validation.',
  },
  {
    id: 'presales',
    group: 'validation',
    title: 'Penjualan semu dan pra-pesan',
    body: 'Simulasi penjualan, atau pemesanan nyata yang transparan pada harga tertentu.',
    risk: 'Desirability dan viability: kesediaan membeli pada harga tertentu.',
    evidence: 'Penjualan semu tanpa uang: sedang. Pra-pesan berbayar: lebih kuat, tetapi pengembalian dana dan pengiriman belum pasti. Jangan laporkan penjualan semu sebagai pendapatan.',
    costTime: 'Biaya sedang; waktu ilustrasi 1–3 minggu.',
    metric: 'Ilustrasi: sekurang-kurangnya 5 dari 100 prospek yang memenuhi syarat dan ditawari melakukan pra-pesan berbayar; catat pengembalian dana.',
    source: 'Testing Business Ideas, bagian Validation, memisahkan Mock Sale dari Presale.',
  },
  {
    id: 'crowdfunding',
    group: 'validation',
    title: 'Crowdfunding',
    body: 'Meminta komitmen dana pada tawaran atau imbalan tertentu.',
    risk: 'Desirability dan viability: permintaan dan economics awal.',
    evidence: 'Kuat jika dana tertagih; janji dukungan bisa batal. Belum membuktikan pemenuhan pesanan, retensi, atau laba.',
    costTime: 'Biaya sedang sampai tinggi; waktu ilustrasi 3–8 minggu.',
    metric: 'Ilustrasi: sekurang-kurangnya 30 pendukung berbayar pada harga sasaran, dengan margin kontribusi proyeksi positif setelah imbalan, biaya platform, dan pemenuhan.',
    source: 'Testing Business Ideas, bagian Validation.',
  },
  {
    id: 'loi',
    group: 'validation',
    title: 'Surat niat (letter of intent)',
    body: 'Komitmen minat tertulis dengan syarat, sering dipakai di konteks B2B atau mitra.',
    risk: 'Desirability dan viability. Feasibility jika terkait mitra.',
    evidence: 'Sedang; tergantung kekhususan, kewenangan, anggaran, dan sifat mengikat. Surat niat bukan uang masuk.',
    costTime: 'Biaya rendah sampai sedang; waktu ilustrasi 1–4 minggu.',
    metric: 'Ilustrasi: sekurang-kurangnya 3 dari 10 prospek B2B yang memenuhi syarat menandatangani surat niat dengan harga indikatif dan jadwal pilot.',
    source: 'Testing Business Ideas, bagian Validation.',
  },
  {
    id: 'ab',
    group: 'validation',
    title: 'Uji A/B (split test)',
    body: 'Alokasi acak dua variasi untuk mengukur dampak pada konversi, pendapatan, atau metrik operasional.',
    risk: 'Desirability dan viability untuk efek konversi atau pendapatan. Feasibility jika metrik operasional yang diuji.',
    evidence: 'Sedang sampai kuat untuk efek lokal jika pengacakan dan sampel benar. Bukan bukti untuk seluruh model.',
    costTime: 'Biaya sedang; waktu ilustrasi 1–4 minggu atau lebih.',
    metric: 'Ilustrasi: peningkatan relatif konversi sekurang-kurangnya 10%. Hitung sampel dari baseline dan efek minimum sebelum tes, serta sertakan interval ketidakpastian.',
    source: 'Testing Business Ideas, bagian Validation, memakai istilah Split Test.',
  },
  {
    id: 'fakedoor',
    group: 'discovery',
    title: 'Fake door, feature stub, atau tes 404',
    body: 'Tombol atau ajakan untuk fitur yang belum dibangun, lalu penjelasan bahwa fitur itu belum tersedia. Jangan memperpanjang kesan menyesatkan.',
    risk: 'Desirability: minat perilaku dan prioritas fitur. Tidak menguji feasibility.',
    evidence: 'Sedang untuk klik; rendah untuk pembelian atau retensi.',
    costTime: 'Biaya rendah; waktu ilustrasi 2–7 hari.',
    metric: 'Ilustrasi: sekurang-kurangnya 5 dari 100 pengguna yang memenuhi kriteria dan melihat ajakan itu mengkliknya. Pendaftaran diukur terpisah.',
    source: 'Testing Business Ideas menempatkan Feature Stub dan 404 Test pada bagian Discovery, meskipun sering dipakai sebagai tes perilaku lanjutan. “Fake door” adalah padanan praktis, bukan judul terverifikasi di daftar isi buku.',
    classificationNote: true,
  },
  {
    id: 'mvp',
    group: 'validation',
    title: 'MVP berfitur tunggal',
    body: 'Satu fungsi inti yang benar-benar bekerja, dipakai untuk belajar di lapangan.',
    risk: 'Desirability dan feasibility. Viability jika berbayar: pemakaian, hasil, dan biaya.',
    evidence: 'Kuat untuk perilaku dalam pilot. Generalisasi, skala, dan biaya akuisisi tetap harus diuji.',
    costTime: 'Biaya tinggi; waktu ilustrasi 2–6 minggu atau lebih.',
    metric: 'Ilustrasi: sekurang-kurangnya 6 dari 10 pengguna kembali pada siklus kebutuhan berikutnya, dan sekurang-kurangnya 4 membayar harga sasaran; ukur juga biaya variabel dan keandalan.',
    source: 'Testing Business Ideas, bagian Validation, serta catatan Strategyzer tentang memilih tes berikutnya.',
  },
];

export const CLASSIFICATION_NOTE = 'Urutan di alat ini mengikuti kebutuhan belajar, bukan pembagian persis buku. Testing Business Ideas menempatkan Simple Landing Page pada bagian Validation, meskipun smoke test bisa bersifat eksploratif. Feature Stub dan 404 Test berada di bagian Discovery, meskipun sering dipakai sebagai tes perilaku lanjutan. “Fake door” adalah padanan praktis, bukan judul terverifikasi di daftar isi. Uji A/B disebut Split Test di buku itu, dan pra-pesan (Presale) dipisahkan dari penjualan semu (Mock Sale).';

export const FIT_CHECKS = [
  {
    id: 'problem-solution',
    title: 'Problem-Solution Fit',
    idLabel: 'Kecocokan masalah–solusi',
    how: 'Dicari bukti bahwa jobs, nyeri, dan manfaat yang penting benar-benar ada, dan rancangan proposisi nilai menargetkannya. Eksperimen yang relevan: wawancara kejadian nyata, forum, tren pencarian, papan cerita, dan prototipe kertas; iklan, video, atau landing page dipakai sebagai triangulasi. Pemetaan tempelan dan pujian belum membuktikan pembelian atau product-market fit. Skor kecocokan di kanvas hanya menandai kelengkapan desain di atas kertas — jangan diubah menjadi “persentase product-market fit”.',
    experiments: ['interview', 'forums', 'search', 'storyboard', 'paper', 'ads', 'video', 'landing'],
  },
  {
    id: 'product-market',
    title: 'Product-Market Fit',
    idLabel: 'Kecocokan produk–pasar',
    how: 'Dicari bukti bahwa tawaran sungguh meredakan nyeri atau menciptakan manfaat, plus traksi dan pemakaian sesuai siklus kebutuhan. Eksperimen yang relevan: concierge, Wizard of Oz, dan MVP berfitur tunggal; transaksi atau pra-pesan dilengkapi pengukuran hasil pelanggan, retensi, dan pemakaian ulang. Pendaftaran, klik, satu pembelian, atau kampanye yang sukses saja tidak cukup. Pra-pesan bukan bukti manfaat setelah produk dipakai. Artikel Strategyzer “Survival of the fittest” merujuk hlm. 48–49 pada Value Proposition Design untuk ketiga tingkat ini.',
    experiments: ['concierge', 'wizard', 'mvp', 'presales'],
  },
  {
    id: 'business-model',
    title: 'Business Model Fit',
    idLabel: 'Kecocokan model bisnis',
    how: 'Dicari bukti bahwa proposisi nilai tertanam dalam model yang menguntungkan dan dapat diskalakan. Eksperimen yang relevan: pilot berbayar atau MVP; pra-pesan atau crowdfunding dengan analisis biaya; uji A/B pada saluran atau harga; surat niat mitra yang diikuti pengiriman nyata; plus unit economics dan kapasitas. Pendapatan bukan laba. Margin positif pada pilot kecil bukan bukti skala besar, dan proses manual belum membuktikan otomatisasi.',
    experiments: ['mvp', 'presales', 'crowdfunding', 'ab', 'loi'],
  },
];

export const TESTING_CHECKLIST = [
  { id: 'sticky-is-hypothesis', text: 'Setiap tempelan di BMC dan VPC diperlakukan sebagai hipotesis yang spesifik dan dapat dibantah, bukan fakta.' },
  { id: 'lenses', text: 'Hipotesis ditandai desirability, feasibility, atau viability, dan dugaan yang rumit dipecah.' },
  { id: 'risk-first', text: 'Asumsi paling berisiko (sangat penting tetapi buktinya minim) diuji lebih dulu.' },
  { id: 'test-card-first', text: 'Kartu Tes diisi sebelum data dikumpulkan, termasuk pembilang, penyebut, pengecualian, periode, dan kriteria keberhasilan.' },
  { id: 'cheap-test', text: 'Eksperimen yang dipilih cukup murah dan cepat, tetapi tetap relevan; hipotesis kritis ditriangulasi, bukan hanya diuji dengan cara termudah.' },
  { id: 'learning-card', text: 'Kartu Belajar diisi setelah eksperimen, lengkap dengan keterbatasan dan keputusan: lanjutkan, ubah arah, atau hentikan.' },
  { id: 'status-inconclusive', text: 'Jika sampel atau instrumen tidak memadai, statusnya “belum konklusif”, bukan otomatis berhasil atau gagal.' },
  { id: 'ps-fit', text: 'Problem-solution fit tidak hanya diukur dari skor kanvas, tetapi dari bukti bahwa jobs, nyeri, dan manfaat itu nyata.' },
  { id: 'pm-fit', text: 'Product-market fit menuntut bukti pemakaian dan traksi, bukan sekadar minat, klik, atau satu kali transaksi.' },
  { id: 'bm-fit', text: 'Business model fit menuntut model yang berulang dan layak secara ekonomi, termasuk biaya, retensi, dan kapasitas.' },
  { id: 'update-canvas', text: 'Temuan dipakai untuk memperbarui kanvas, termasuk hasil negatif, lalu merancang tes berikutnya.' },
  { id: 'ethics', text: 'Tes nyata dilakukan dengan persetujuan yang sesuai, data pribadi diminimalkan, dan tidak menyesatkan peserta (terutama pada fake door, pra-pesan, dan Wizard of Oz).' },
];

export const TEST_STATUSES = [
  { id: 'planned', label: 'Direncanakan' },
  { id: 'running', label: 'Sedang dijalankan' },
  { id: 'supported', label: 'Didukung' },
  { id: 'not-supported', label: 'Tidak didukung' },
  { id: 'inconclusive', label: 'Belum konklusif' },
];

export const DECISIONS = [
  { id: 'persevere', label: 'Lanjutkan' },
  { id: 'iterate', label: 'Iterasi' },
  { id: 'pivot', label: 'Ubah arah' },
  { id: 'kill', label: 'Hentikan' },
];

export const TEST_CARD_FIELDS = [
  { key: 'hypothesis', label: 'Kami percaya bahwa…', hint: 'Hipotesis yang harus benar', type: 'textarea' },
  { key: 'experiment', label: 'Untuk mengujinya, kami akan…', hint: 'Desain eksperimen', type: 'textarea' },
  { key: 'metric', label: 'Kami akan mengukur…', hint: 'Metrik, termasuk pembilang dan penyebut', type: 'textarea' },
  { key: 'criteria', label: 'Kami benar jika…', hint: 'Kriteria keberhasilan yang ditetapkan di muka (angka di sini adalah ilustrasi, bukan patokan buku)', type: 'textarea' },
];

export const LEARNING_CARD_FIELDS = [
  { key: 'believed', label: 'Dugaan yang diuji', type: 'textarea' },
  { key: 'observed', label: 'Kami mengamati bahwa…', type: 'textarea' },
  { key: 'learned', label: 'Dari itu kami belajar bahwa…', type: 'textarea' },
  { key: 'decisionNote', label: 'Karena itu kami akan…', type: 'textarea' },
];

export const TESTING_ETHICS = 'Bagian ini adalah panduan desain, bukan izin menayangkan iklan, mengontak orang, atau mengumpulkan pembayaran. Untuk tes nyata, gunakan persetujuan yang sesuai dan minimalkan data pribadi. Setelah seseorang mengklik fake door, jelaskan bahwa fiturnya belum tersedia; jangan memperpanjang kesan menyesatkan. Pra-pesan dan crowdfunding harus menjelaskan status produk, risiko, jadwal, dan pengembalian dana. Wizard of Oz tidak boleh menyembunyikan pemrosesan manusia atas data pribadi; sampaikan dan bahas kembali setelahnya.';

export const TESTING_WORKFLOW = 'Pilih blok → tulis hipotesis desirability, feasibility, atau viability → petakan kepentingan dan bukti → pilih asumsi paling berisiko → isi Kartu Tes → jalankan tes → isi Kartu Belajar → perbarui BMC atau VPC → lanjutkan, ubah arah, atau hentikan.';

export const EXAMPLE_ASSUMPTIONS = {
  vpd: [
    { id: 'vpd-a1', lens: 'desirability', text: 'Antre di kafe pada jam berangkat adalah nyeri utama profesional kantoran urban.', source: 'Nyeri pelanggan', importance: 5, evidence: 2 },
    { id: 'vpd-a2', lens: 'desirability', text: 'Mereka akan memesan duluan lewat aplikasi agar tidak antre, jika pesanan siap saat tiba.', source: 'Pereda nyeri', importance: 5, evidence: 1 },
    { id: 'vpd-a3', lens: 'desirability', text: 'Harga Rp 18.000 untuk kualitas setara kafe dianggap masuk akal untuk kebiasaan harian.', source: 'Manfaat / pereda nyeri', importance: 4, evidence: 2 },
    { id: 'vpd-a4', lens: 'desirability', text: 'Lokasi grab-and-go di lobi dan stasiun benar-benar masuk jalur commuting segmen ini.', source: 'Pencipta manfaat', importance: 4, evidence: 2 },
  ],
  bmc: [
    { id: 'bmc-a1', lens: 'desirability', text: 'Profesional muda perkantoran urban adalah segmen yang cukup besar dan bisa dijangkau lewat gerai compact serta aplikasi.', source: 'Segmen pelanggan', importance: 5, evidence: 3 },
    { id: 'bmc-a2', lens: 'desirability', text: 'Proposisi “kopi berkualitas kafe, cepat, tanpa antre, harga harian” merespons jobs segmen itu.', source: 'Proposisi nilai', importance: 5, evidence: 2 },
    { id: 'bmc-a3', lens: 'feasibility', text: 'Standar rasa nasional dan layanan di bawah 180 detik bisa dijaga di banyak gerai compact.', source: 'Aktivitas dan sumber daya', importance: 4, evidence: 2 },
    { id: 'bmc-a4', lens: 'viability', text: 'Harga Rp 18.000 masih menutup biaya bahan, sewa gerai compact, dan biaya aplikasi dengan margin yang berulang.', source: 'Pendapatan dan biaya', importance: 5, evidence: 1 },
  ],
};

export const EXAMPLE_TEST_CARDS = {
  vpd: [
    {
      id: 'vpd-t1',
      name: 'Tes antre dan pesan-ambil — Kopi AJIB (ilustrasi)',
      lens: 'desirability',
      hypothesis: 'Profesional kantoran urban menganggap antre di jam berangkat sebagai nyeri utama, dan akan memesan duluan lewat aplikasi jika pesanan siap saat mereka tiba.',
      experiment: 'Wawancara 15 profesional di dua gedung perkantoran, dilanjutkan smoke test berupa halaman pesan-ambil dan pra-daftar selama dua minggu di lobi yang sama. Produk belum tersedia umum, dan itu dijelaskan di halaman.',
      metric: 'Pembilang: narasumber yang menempatkan antre sebagai nyeri nomor satu; pendaftar unik yang memenuhi kriteria. Penyebut: narasumber yang diwawancara; pengunjung unik yang memenuhi kriteria. Keluarkan bot, tim internal, dan duplikasi.',
      criteria: 'Angka berikut ilustrasi, bukan patokan buku: kami menganggap dugaan didukung jika sekurang-kurangnya 10 dari 15 narasumber menempatkan antre sebagai nyeri utama, dan sekurang-kurangnya 50 dari pengunjung yang memenuhi kriteria mendaftar dalam 14 hari. Jika trafik jauh di bawah rencana, statusnya belum konklusif.',
      cost: 'Rendah — waktu wawancara dan halaman sederhana',
      duration: '2 minggu (ilustrasi)',
      owner: 'Tim pembelajaran Kopi AJIB',
      status: 'planned',
    },
  ],
  bmc: [
    {
      id: 'bmc-t1',
      name: 'Tes unit economics gerai compact — Kopi AJIB (ilustrasi)',
      lens: 'viability',
      hypothesis: 'Harga jual Rp 18.000 pada gerai compact 15–25 m² masih menghasilkan kontribusi yang cukup setelah biaya bahan, sewa, dan aplikasi, pada volume yang wajar untuk lobi perkantoran.',
      experiment: 'Uji gerai pop-up selama empat minggu di satu lobi kantor: catat volume harian, bauran produk, biaya bahan aktual, sewa, dan biaya staf; bandingkan dengan model biaya di kanvas.',
      metric: 'Cangkir per hari, kontribusi per cangkir (pendapatan dikurangi biaya variabel yang didefinisikan sebelumnya), titik impas harian, dan persentase transaksi lewat aplikasi.',
      criteria: 'Angka berikut ilustrasi, bukan patokan buku: dugaan didukung jika kontribusi per cangkir tetap positif dan volume harian mencapai titik impas sekurang-kurangnya 12 dari 20 hari kerja. Jika volume terlalu rendah untuk dibaca, statusnya belum konklusif.',
      cost: 'Sedang — sewa pop-up dan stok awal',
      duration: '4 minggu (ilustrasi)',
      owner: 'Tim operasional gerai',
      status: 'planned',
    },
  ],
};

export const EXAMPLE_LEARNING_CARDS = {
  vpd: [
    {
      id: 'vpd-l1',
      testCardId: 'vpd-t1',
      name: 'Pembelajaran tes pesan-ambil — Kopi AJIB (ilustrasi)',
      believed: 'Antre adalah nyeri utama, dan pra-daftar lewat aplikasi akan diambil dengan meriah di lobi kantor.',
      observed: '12 dari 15 narasumber menempatkan antre dan takut terlambat rapat sebagai nyeri utama. Pra-daftar mencapai 61 dalam dua minggu, tetapi beberapa orang ragu jika janji “siap saat tiba” tidak bisa dipegang. Belum ada permintaan membayar.',
      learned: 'Hipotesis nyeri antre cukup kuat untuk segmen dan kanal itu. Keinginan memakai aplikasi tampaknya bergantung pada janji waktu yang andal. Kesediaan membayar belum diketahui, jadi product-market fit belum bisa diklaim.',
      decision: 'iterate',
      decisionNote: 'Iterasi: perkuat janji waktu di aplikasi dan uji janji “siap dalam 180 detik” pada tes berikutnya, lalu baru uji tawaran berbayar yang syaratnya transparan.',
    },
  ],
  bmc: [
    {
      id: 'bmc-l1',
      testCardId: 'bmc-t1',
      name: 'Pembelajaran pop-up gerai compact — Kopi AJIB (ilustrasi)',
      believed: 'Harga Rp 18.000 menutup biaya gerai compact pada volume lobi perkantoran.',
      observed: 'Kontribusi per cangkir positif, tetapi titik impas hanya tercapai 9 dari 20 hari kerja karena volume siang menurun setelah pukul 10.00.',
      learned: 'Harga tidak otomatis salah; pola permintaan sangat puncak di pagi hari. Model pendapatan harian di kanvas masih terlalu rata sepanjang hari. Margin positif pada pilot kecil belum membuktikan skala.',
      decision: 'iterate',
      decisionNote: 'Iterasi: sesuaikan jam operasi dan bauran produk pagi, lalu uji ulang titik impas sebelum menandatangani sewa jangka panjang.',
    },
  ],
};

export const TESTING_REFERENCES = [
  {
    citation: 'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.',
    note: 'Bab Canvas (Profil Pelanggan, Peta Nilai, dan Fit) serta bab Test (apa yang diuji, langkah pengujian, pustaka eksperimen, dan merangkai semuanya). Dikutip menurut bab/bagian. Nomor halaman cetak tidak diambil dari PDF lampiran karena berkas itu tidak tersedia di ruang kerja ini.',
  },
  {
    citation: 'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. John Wiley & Sons.',
    note: 'Sembilan blok BMC sebagai potret bagaimana usaha menciptakan, mengantarkan, dan menangkap nilai. Nomor halaman cetak tidak dicantumkan karena belum terverifikasi.',
  },
  {
    citation: 'Bland, D. J., & Osterwalder, A. (2019). Testing Business Ideas: A Field Guide for Rapid Experimentation. John Wiley & Sons.',
    note: 'Bagian Test (hipotesis dan assumptions mapping, eksperimen, belajar, memutuskan, serta etika) dan bagian Experiments (memilih tes, Discovery, Validation). Struktur dan nama metode merujuk daftar isi; nomor halaman cetak per eksperimen tidak dicantumkan karena belum terverifikasi.',
  },
  {
    citation: 'Osterwalder, A. (2015). Validate your ideas with The Test Card. Strategyzer. https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card',
    note: 'Empat kolom resmi Kartu Tes: hipotesis, tes, metrik, dan kriteria keberhasilan.',
  },
  {
    citation: 'Amarsy, N. (2015). Capture (customer) insights and actions with The Learning Card. Strategyzer. https://www.strategyzer.com/library/capture-customer-insights-and-actions-with-the-learning-card',
    note: 'Empat kolom resmi Kartu Belajar: dugaan, pengamatan, pelajaran, dan keputusan.',
  },
  {
    citation: 'Bland, D. J. (2020). How assumptions mapping can focus your teams on running experiments that matter. Strategyzer. https://www.strategyzer.com/library/how-assumptions-mapping-can-focus-your-teams-on-running-experiments-that-matter',
    note: 'Pemetaan kepentingan × bukti; utamakan yang penting tetapi minim bukti.',
  },
  {
    citation: 'Osterwalder, A. (2017). How to systematically reduce the risk & uncertainty of new ideas. Strategyzer. https://www.strategyzer.com/library/how-to-systematically-reduce-the-risk-uncertainty-of-new-ideas',
    note: 'Definisi desirability, feasibility, dan viability serta kaitannya dengan BMC.',
  },
  {
    citation: 'Bland, D. J. (2020). How to select the next best test from the Experiment Library. Strategyzer. https://www.strategyzer.com/library/how-to-select-the-next-best-test-from-the-experiment-library',
    note: 'Memilih tes berikutnya: discovery versus validation, rangkaian tes, dan bukti terkuat sesuai kendala.',
  },
  {
    citation: 'Amarsy, N. (2014). Survival of the fittest. Strategyzer. https://www.strategyzer.com/library/survival-of-the-fittest',
    note: 'Tiga tingkat fit; artikel ini merujuk hlm. 48–49 pada Value Proposition Design.',
  },
  {
    citation: 'IDEO. Design thinking: desirability, feasibility, and viability.',
    note: 'Lensa tiga kelayakan yang dipakai di modul ini untuk mengelompokkan hipotesis.',
  },
];
