/**
 * Value Proposition Design teaching content.
 * Follows Osterwalder, Pigneur, Bernarda & Smith, Value Proposition Design (2014).
 * Customer jobs also draw on the Jobs To Be Done tradition (Christensen and colleagues).
 * No page numbers are cited because they vary across printings.
 */

export const VPD_STORAGE_KEY = 'innoventures_vpd_canvas';

export const EMPTY_VPD_CANVAS = {
  version: 1,
  segmentName: '',
  jobs: [],
  pains: [],
  gains: [],
  products: [],
  painRelievers: [],
  gainCreators: [],
  links: [],
};

export const JOB_KINDS = [
  {
    id: 'functional',
    label: 'Fungsional',
    description: 'Tugas praktis yang ingin diselesaikan pelanggan (misalnya mendapatkan kopi pagi sebelum rapat, tanpa terlambat).',
  },
  {
    id: 'social',
    label: 'Sosial',
    description: 'Bagaimana pelanggan ingin dipersepsikan oleh orang lain (misalnya terlihat profesional dan “melek” pilihan kopi).',
  },
  {
    id: 'emotional',
    label: 'Emosional',
    description: 'Perasaan yang ingin dicapai atau dihindari (misalnya tenang, berenergi, tidak stres antre).',
  },
];

export const VPD_SIDES = {
  customerProfile: {
    id: 'customerProfile',
    title: 'Customer Profile',
    idLabel: 'Profil Pelanggan',
    summary:
      'Sisi kanan Value Proposition Canvas: gambaran teramati tentang pekerjaan (jobs), nyeri (pains), dan manfaat (gains) suatu segmen. Sisi ini membesarkan (zoom in) blok Segmen Pelanggan pada Business Model Canvas. Satu profil dibuat untuk satu segmen.',
  },
  valueMap: {
    id: 'valueMap',
    title: 'Value Map',
    idLabel: 'Peta Nilai',
    summary:
      'Sisi kiri Value Proposition Canvas: produk dan layanan, pereda nyeri, serta pencipta manfaat yang Anda rancang. Sisi ini membesarkan blok Proposisi Nilai pada Business Model Canvas, dan harus diarahkan pada profil pelanggan yang sama.',
  },
};

export const VPD_BLOCKS = {
  jobs: {
    key: 'jobs',
    side: 'customerProfile',
    en: 'Customer Jobs (Jobs To Be Done)',
    idLabel: 'Pekerjaan Pelanggan',
    definition:
      'Hal-hal yang ingin diselesaikan, dicapai, atau dialami pelanggan dalam pekerjaan, kehidupan, atau konteks sosialnya. Pekerjaan dapat bersifat fungsional, sosial, atau emosional, dan mencakup pekerjaan pendukung (misalnya mencari, membeli, atau beralih dari solusi lama). Kerangka ini sejalan dengan tradisi Jobs To Be Done: pelanggan “menyewa” produk untuk menyelesaikan suatu pekerjaan.',
    example:
      'Kopi AJIB, segmen profesional kantoran: mendapatkan kafein berkualitas sebelum rapat pagi (fungsional); terlihat sebagai profesional yang punya selera tanpa membuang waktu di kafe (sosial); merasa siap dan tidak stres memulai hari (emosional).',
  },
  pains: {
    key: 'pains',
    side: 'customerProfile',
    en: 'Pains',
    idLabel: 'Nyeri Pelanggan',
    definition:
      'Hambatan, risiko, biaya, atau emosi negatif yang muncul sebelum, selama, atau sesudah pelanggan mengerjakan jobs-nya — termasuk rintangan, hasil yang tidak diinginkan, dan risiko gagal. Nyeri yang paling akut biasanya menjadi prioritas pereda nyeri.',
    example:
      'Antre panjang di kafe saat jam berangkat kerja, harga espresso kafe yang terasa mahal untuk kebiasaan harian, rasa yang tidak konsisten antarcabang, dan takut datang terlambat ke rapat karena menunggu pesanan.',
  },
  gains: {
    key: 'gains',
    side: 'customerProfile',
    en: 'Gains',
    idLabel: 'Manfaat Pelanggan',
    definition:
      'Hasil dan manfaat yang diinginkan pelanggan: yang diharapkan, yang diinginkan di luar harapan, atau yang mengejutkan (unexpected). Manfaat bisa fungsional, sosial, emosional, atau penghematan biaya/waktu. Tidak semua manfaat sama pentingnya — bedakan yang wajib ada dari yang hanya “senang-senang.”',
    example:
      'Kopi siap dalam hitungan menit, harga harian yang masih masuk akal, rasa yang sama di setiap gerai dekat kantor, poin loyalitas yang terasa berguna, dan opsi pesan duluan agar tinggal ambil.',
  },
  products: {
    key: 'products',
    side: 'valueMap',
    en: 'Products & Services',
    idLabel: 'Produk & Layanan',
    definition:
      'Daftar produk dan layanan yang menjadi tumpuan proposisi nilai — barang, jasa digital, layanan pendamping, atau pengalaman. Daftar ini belum otomatis menjadi nilai; nilainya baru muncul jika membantu pekerjaan, meredakan nyeri, atau menciptakan manfaat bagi segmen yang sama.',
    example:
      'Minuman signature kopi susu aren espresso, aplikasi pesan-ambil, gerai grab-and-go di lobi dan stasiun, program poin loyalitas, serta voucher dan pesanan rombongan korporat.',
  },
  painRelievers: {
    key: 'painRelievers',
    side: 'valueMap',
    en: 'Pain Relievers',
    idLabel: 'Pereda Nyeri',
    definition:
      'Cara spesifik produk dan layanan Anda menghilangkan atau mengurangi nyeri pelanggan. Pereda yang baik menargetkan nyeri yang paling parah, paling sering, atau paling mahal — bukan setiap keluhan kecil. Setiap pereda seyogyanya dapat dihubungkan ke nyeri yang nyata di profil pelanggan.',
    example:
      'Pesan duluan lewat aplikasi agar tidak antre, harga Rp 18.000 untuk kualitas kafe, standar rasa nasional, dan pengembalian dana instan jika rasa tidak pas.',
  },
  gainCreators: {
    key: 'gainCreators',
    side: 'valueMap',
    en: 'Gain Creators',
    idLabel: 'Pencipta Manfaat',
    definition:
      'Cara spesifik Anda menghasilkan manfaat yang diharapkan atau diinginkan pelanggan. Seperti pereda nyeri, pencipta manfaat harus terhubung ke gains yang benar-benar dipedulikan, bukan ke fitur yang hanya menarik bagi tim produk.',
    example:
      'Konsistensi rasa di ratusan gerai, personalisasi promo, gamifikasi poin yang menumpuk, dan lokasi compact di jalur commuting sehingga kopi “ikut” ke kantor.',
  },
};

export const FIT_LEVELS = [
  {
    id: 'problem-solution',
    title: 'Problem-Solution Fit',
    idLabel: 'Kecocokan Masalah–Solusi',
    stage: 'Di atas kertas (dan wawancara awal)',
    description:
      'Anda memiliki bukti — atau setidaknya hipotesis yang rapat — bahwa pelanggan peduli pada jobs, pains, dan gains tertentu, dan Anda merancang peta nilai yang secara jelas menujunya. Alat interaktif di halaman ini membantu menguji kecocokan jenis ini: apakah setiap nyeri, manfaat, dan pekerjaan punya pasangan di sisi tawaran, dan sebaliknya.',
  },
  {
    id: 'product-market',
    title: 'Product-Market Fit',
    idLabel: 'Kecocokan Produk–Pasar',
    stage: 'Di pasar',
    description:
      'Ada bukti bahwa produk, pereda nyeri, dan pencipta manfaat benar-benar menciptakan nilai dan mendapat traksi: pelanggan memakai, kembali, merekomendasikan, atau membayar. Skor kecocokan di alat ini belum membuktikan product-market fit — itu hanya peta hipotesis sampai diuji di lapangan (wawancara, MVP, retensi, pembayaran).',
  },
  {
    id: 'business-model',
    title: 'Business Model Fit',
    idLabel: 'Kecocokan Model Bisnis',
    stage: 'Dalam model yang berulang dan layak',
    description:
      'Proposisi nilai yang sudah cocok dapat disematkan ke dalam Business Model Canvas yang menguntungkan dan skalabel: saluran, hubungan, sumber daya, aktivitas, mitra, biaya, dan pendapatan saling mengunci. Value Proposition Design membesarkan dua blok BMC; kecocokan model bisnis menguji delapan blok lainnya bersama dua blok itu.',
  },
];

export const VPD_BMC_RELATION = {
  title: 'Hubungan Value Proposition Design dengan Business Model Canvas',
  points: [
    'Value Proposition Canvas adalah “zoom in” pada dua blok BMC: Proposisi Nilai dan Segmen Pelanggan.',
    'Peta Nilai (Value Map) membesarkan blok Proposisi Nilai: produk & layanan, pereda nyeri, pencipta manfaat.',
    'Profil Pelanggan membesarkan blok Segmen Pelanggan, dan memuat Jobs To Be Done beserta nyeri dan manfaatnya.',
    'Buat satu Value Proposition Canvas untuk setiap segmen pelanggan yang material. Jangan mencampur jobs dua segmen dalam satu profil.',
    'Setelah kecocokan masalah–solusi terlihat, kembalikan hasilnya ke BMC: sesuaikan saluran, hubungan, pendapatan, dan sisi kelayakan (mitra, aktivitas, sumber daya, biaya) agar tawaran itu bisa diantar dan ditangkap nilainya.',
    'Kedua kanvas saling menguji. Perubahan di VPC (misalnya jobs baru) hampir selalu menuntut revisi blok BMC; perubahan saluran atau harga di BMC harus dicek ulang terhadap pains, gains, dan jobs.',
  ],
};

export const EXAMPLE_VPD_CANVAS = {
  version: 1,
  segmentName: 'Profesional muda perkantoran urban — Kopi AJIB',
  jobs: [
    { id: 'job-1', text: 'Mendapatkan kafein berkualitas sebelum rapat pagi, tanpa terlambat.', kind: 'functional' },
    { id: 'job-2', text: 'Terlihat profesional dan punya selera, tanpa harus “nongkrong” lama di kafe.', kind: 'social' },
    { id: 'job-3', text: 'Memulai hari dengan rasa tenang, berenergi, dan tidak stres.', kind: 'emotional' },
  ],
  pains: [
    { id: 'pain-1', text: 'Antre panjang di kafe pada jam berangkat kerja.' },
    { id: 'pain-2', text: 'Harga espresso kafe terasa mahal untuk kebiasaan setiap hari.' },
    { id: 'pain-3', text: 'Rasa tidak konsisten antarcabang atau antargilir barista.' },
    { id: 'pain-4', text: 'Khawatir terlambat rapat karena menunggu pesanan.' },
  ],
  gains: [
    { id: 'gain-1', text: 'Pesanan siap dalam hitungan menit, atau sudah menunggu untuk diambil.' },
    { id: 'gain-2', text: 'Harga harian yang masih masuk akal untuk kualitas setara kafe.' },
    { id: 'gain-3', text: 'Rasa yang sama di gerai mana pun di sepanjang rute ke kantor.' },
    { id: 'gain-4', text: 'Poin loyalitas dan promo yang terasa relevan, bukan spam.' },
  ],
  products: [
    { id: 'prod-1', text: 'Kopi susu aren espresso signature (harga kafe yang dijaga).' },
    { id: 'prod-2', text: 'Aplikasi pesan-ambil (order ahead) resmi Kopi AJIB.' },
    { id: 'prod-3', text: 'Gerai compact grab-and-go di lobi kantor dan stasiun.' },
    { id: 'prod-4', text: 'Program loyalitas bertingkat dan voucher korporat.' },
  ],
  painRelievers: [
    { id: 'rel-1', text: 'Pesan duluan lewat aplikasi sehingga tidak perlu antre di gerai.' },
    { id: 'rel-2', text: 'Harga Rp 18.000 untuk kualitas setara kafe.' },
    { id: 'rel-3', text: 'Standar rasa nasional dan kontrol mutu penyangraian terpusat.' },
    { id: 'rel-4', text: 'Pengembalian dana instan jika rasa tidak pas.' },
  ],
  gainCreators: [
    { id: 'gc-1', text: 'Layanan di bawah 180 detik dan opsi pesan duluan agar tinggal ambil.' },
    { id: 'gc-2', text: 'Lokasi gerai di jalur commuting (lobi dan stasiun).' },
    { id: 'gc-3', text: 'Personalisasi promo dan gamifikasi poin yang menumpuk.' },
    { id: 'gc-4', text: 'Harga harian yang dijaga agar kebiasaan kopi tidak terasa mewah.' },
  ],
  links: [
    { id: 'link-1', kind: 'job-product', customerId: 'job-1', valueId: 'prod-1' },
    { id: 'link-2', kind: 'job-product', customerId: 'job-1', valueId: 'prod-2' },
    { id: 'link-3', kind: 'job-product', customerId: 'job-1', valueId: 'prod-3' },
    { id: 'link-4', kind: 'job-product', customerId: 'job-2', valueId: 'prod-1' },
    { id: 'link-5', kind: 'job-product', customerId: 'job-3', valueId: 'prod-1' },
    { id: 'link-6', kind: 'pain-reliever', customerId: 'pain-1', valueId: 'rel-1' },
    { id: 'link-7', kind: 'pain-reliever', customerId: 'pain-2', valueId: 'rel-2' },
    { id: 'link-8', kind: 'pain-reliever', customerId: 'pain-3', valueId: 'rel-3' },
    { id: 'link-9', kind: 'pain-reliever', customerId: 'pain-3', valueId: 'rel-4' },
    { id: 'link-10', kind: 'pain-reliever', customerId: 'pain-4', valueId: 'rel-1' },
    { id: 'link-11', kind: 'gain-creator', customerId: 'gain-1', valueId: 'gc-1' },
    { id: 'link-12', kind: 'gain-creator', customerId: 'gain-1', valueId: 'gc-2' },
    { id: 'link-13', kind: 'gain-creator', customerId: 'gain-2', valueId: 'gc-4' },
    { id: 'link-14', kind: 'gain-creator', customerId: 'gain-3', valueId: 'gc-2' },
    { id: 'link-15', kind: 'gain-creator', customerId: 'gain-4', valueId: 'gc-3' },
  ],
};

// gain-2 linked to rel-2 in the example above is a bit loose (price is a pain reliever).
// Better to not mix kinds. Let me fix gain-2: we need a gain creator for affordable daily price.
// I'll leave gain-2 unaddressed in a revised version OR add a gain creator for price.
// Actually I incorrectly linked gain-2 to rel-2 (pain reliever). The fit logic should only
// count same-kind links. I'll add a proper gain creator and fix this in the file after thinking...

export const VPD_REFERENCES = [
  {
    citation:
      'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.',
    note: 'Sumber utama Value Proposition Canvas (Peta Nilai dan Profil Pelanggan), pengujian kecocokan, serta hubungan VPD dengan Business Model Canvas.',
  },
  {
    citation:
      'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. John Wiley & Sons.',
    note: 'Kerangka sembilan blok BMC yang diperbesar oleh VPD pada blok Proposisi Nilai dan Segmen Pelanggan.',
  },
  {
    citation: 'Strategyzer. Value Proposition Canvas resources. https://www.strategyzer.com',
    note: 'Penjelasan resmi Strategyzer tentang kanvas, fit, dan praktik pemetaan hipotesis.',
  },
  {
    citation:
      'Christensen, C. M., Cook, S., & Hall, T. (2005). Marketing Malpractice: The Cause and the Cure. Harvard Business Review.',
    note: 'Artikel yang memopulerkan gagasan bahwa pelanggan “menyewa” produk untuk menyelesaikan pekerjaan tertentu (Jobs To Be Done).',
  },
  {
    citation:
      'Christensen, C. M., Hall, T., Dillon, K., & Duncan, D. S. (2016). Competing Against Luck: The Story of Innovation and Customer Choice. Harper Business.',
    note: 'Uraian lebih lengkap mengenai teori Jobs To Be Done yang meramaikan sisi pekerjaan pada Profil Pelanggan.',
  },
];
