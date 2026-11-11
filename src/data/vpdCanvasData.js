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
    description: 'Tugas atau masalah praktis yang ingin diselesaikan pelanggan (misalnya mendapatkan kopi pagi sebelum rapat, tanpa terlambat).',
  },
  {
    id: 'social',
    label: 'Sosial',
    description: 'Bagaimana pelanggan ingin dipersepsikan oleh orang lain (misalnya terlihat profesional tanpa harus lama di kafe).',
  },
  {
    id: 'emotional',
    label: 'Personal / emosional',
    description: 'Perasaan yang ingin dicapai atau dihindari (misalnya tenang, berenergi, tidak stres antre).',
  },
  {
    id: 'supporting',
    label: 'Pendukung',
    description: 'Pekerjaan dalam konteks membeli dan memakai nilai — misalnya membandingkan pilihan, memesan, membayar, memberi umpan balik, atau beralih dari solusi lama.',
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
      'Hal-hal yang ingin diselesaikan, dicapai, atau dialami pelanggan dalam pekerjaan atau kehidupannya, dilihat dari sudut pelanggan. Ada tiga jenis utama: pekerjaan fungsional (tugas atau masalah praktis), sosial (bagaimana ingin dipersepsikan orang lain), dan personal/emosional (perasaan yang ingin dicapai atau dihindari). Di samping itu ada pekerjaan pendukung dalam konteks membeli dan memakai nilai — misalnya membandingkan pilihan, membeli, memberi umpan balik, atau beralih dari solusi lama. Kerangka jobs pada VPD sejalan dengan, tetapi tidak identik dengan, tradisi Jobs To Be Done (pelanggan “menyewa” produk untuk menyelesaikan suatu pekerjaan).',
    example:
      'Ilustrasi — studi kasus pembelajaran Kopi AJIB, segmen profesional kantoran. Fungsional: mendapatkan kafein berkualitas sebelum rapat pagi tanpa terlambat. Sosial: terlihat profesional tanpa harus lama di kafe. Personal/emosional: memulai hari dengan tenang dan berenergi. Pendukung: memesan cepat di aplikasi dan membayar tanpa memperlambat perjalanan ke kantor.',
  },
  pains: {
    key: 'pains',
    side: 'customerProfile',
    en: 'Pains',
    idLabel: 'Nyeri Pelanggan',
    definition:
      'Hambatan, risiko, biaya, atau emosi negatif yang muncul sebelum, selama, atau sesudah pelanggan mengerjakan jobs-nya — termasuk hasil yang tidak diinginkan, rintangan, dan risiko gagal. Tandai mana yang parah atau sering muncul; tidak semua nyeri wajib diredakan. Nyeri yang paling akut biasanya menjadi prioritas pereda nyeri.',
    example:
      'Ilustrasi — studi kasus pembelajaran Kopi AJIB. Antre panjang di kafe saat jam berangkat kerja, harga espresso kafe yang terasa mahal untuk kebiasaan harian, rasa yang tidak konsisten antarcabang, dan takut datang terlambat ke rapat karena menunggu pesanan.',
  },
  gains: {
    key: 'gains',
    side: 'customerProfile',
    en: 'Gains',
    idLabel: 'Manfaat Pelanggan',
    definition:
      'Hasil dan manfaat yang diinginkan pelanggan, yang dalam Value Proposition Design dibedakan menjadi empat: yang wajib ada agar tawaran berfungsi (required), yang sudah diharapkan sebagai standar (expected), yang diinginkan di luar standar itu (desired), dan yang mengejutkan karena belum diduga (unexpected). Manfaat bisa fungsional, sosial, emosional, atau berupa penghematan. Tidak semua manfaat sama pentingnya.',
    example:
      'Ilustrasi — studi kasus pembelajaran Kopi AJIB. Pesanan siap cepat atau sudah menunggu untuk diambil; harga harian yang masih masuk akal; rasa yang sama di gerai sepanjang rute ke kantor; plus poin atau promo yang terasa relevan.',
  },
  products: {
    key: 'products',
    side: 'valueMap',
    en: 'Products & Services',
    idLabel: 'Produk & Layanan',
    definition:
      'Daftar produk dan layanan yang menjadi tumpuan proposisi nilai — barang, jasa digital, layanan pendamping, atau pengalaman. Daftar ini belum otomatis menjadi nilai; nilainya baru muncul jika membantu pekerjaan, meredakan nyeri, atau menciptakan manfaat bagi segmen yang sama.',
    example:
      'Ilustrasi — studi kasus pembelajaran Kopi AJIB. Minuman signature kopi susu aren espresso, aplikasi pesan-ambil, gerai grab-and-go di lobi dan stasiun, program poin loyalitas, serta voucher dan pesanan rombongan korporat.',
  },
  painRelievers: {
    key: 'painRelievers',
    side: 'valueMap',
    en: 'Pain Relievers',
    idLabel: 'Pereda Nyeri',
    definition:
      'Cara spesifik produk dan layanan Anda menghilangkan atau mengurangi nyeri pelanggan. Pereda yang baik menargetkan nyeri yang paling parah, paling sering, atau paling mahal — bukan setiap keluhan kecil. Kecocokan yang baik menargetkan nyeri yang penting bagi pelanggan, bukan menghabiskan daftar. Setiap pereda seyogyanya dapat dihubungkan ke nyeri yang nyata di profil pelanggan.',
    example:
      'Ilustrasi — studi kasus pembelajaran Kopi AJIB. Pesan duluan lewat aplikasi agar tidak antre, harga harian yang dijaga (di naskah kasus sekitar Rp 18.000–22.000), dan standar rasa nasional. Ilustrasi tambahan (tidak ada di naskah kasus): pengembalian dana instan jika rasa tidak pas.',
  },
  gainCreators: {
    key: 'gainCreators',
    side: 'valueMap',
    en: 'Gain Creators',
    idLabel: 'Pencipta Manfaat',
    definition:
      'Cara spesifik Anda menghasilkan manfaat yang diharapkan atau diinginkan pelanggan. Seperti pereda nyeri, pencipta manfaat harus terhubung ke gains yang benar-benar dipedulikan, bukan ke fitur yang hanya menarik bagi tim produk.',
    example:
      'Ilustrasi — studi kasus pembelajaran Kopi AJIB. Konsistensi rasa di gerai, opsi pesan duluan agar tinggal ambil, personalisasi promo, dan lokasi compact di jalur commuting sehingga kopi “ikut” ke kantor. Janji kecepatan grab-and-go / order ahead ada di semangat kasus; target “di bawah 180 detik” adalah ilustrasi tambahan, bukan angka kasus.',
  },
};

export const FIT_LEVELS = [
  {
    id: 'problem-solution',
    title: 'Problem-Solution Fit',
    idLabel: 'Kecocokan Masalah–Solusi',
    stage: 'Rancangan di atas kertas, plus bukti awal bahwa masalah itu penting',
    description:
      'Terjadi ketika ada bukti bahwa pelanggan peduli pada jobs, pains, dan gains tertentu, dan peta nilai Anda secara jelas menujunya. Pada tahap ini proposisi nilai masih “di atas kertas”: masalahnya terdukung bukti awal, tetapi belum terbukti bahwa pelanggan cukup peduli untuk membeli. Skor tautan di alat ini hanya membantu memeriksa kelengkapan rancangan, bukan bukti fit.',
  },
  {
    id: 'product-market',
    title: 'Product-Market Fit',
    idLabel: 'Kecocokan Produk–Pasar',
    stage: 'Di pasar',
    description:
      'Ada bukti bahwa produk, pereda nyeri, dan pencipta manfaat benar-benar menciptakan nilai dan mulai mendapat traksi — dipakai, dikembalikan, direkomendasikan, atau dibayar — setelah rangkaian tes yang menopang atau menolak hipotesis. Skor tautan di kanvas belum membuktikan product-market fit.',
  },
  {
    id: 'business-model',
    title: 'Business Model Fit',
    idLabel: 'Kecocokan Model Bisnis',
    stage: 'Dalam model yang menguntungkan dan dapat diskalakan',
    description:
      'Ada bukti bahwa proposisi nilai yang sudah mencipta nilai bagi pelanggan tertanam dalam Business Model Canvas yang juga mencipta nilai bagi organisasi. Yang diuji adalah dua blok yang diperbesar VPC bersama tujuh blok BMC lainnya.',
  },
];

export const VPD_BMC_RELATION = {
  title: 'Hubungan Value Proposition Canvas dengan Business Model Canvas',
  points: [
    'Value Proposition Canvas adalah “zoom in” pada dua blok Business Model Canvas: Proposisi Nilai dan Segmen Pelanggan. Praktik merancangnya diajarkan dalam Value Proposition Design.',
    'Peta Nilai (Value Map) membesarkan blok Proposisi Nilai: produk dan layanan, pereda nyeri, pencipta manfaat.',
    'Profil Pelanggan (Customer Profile) membesarkan blok Segmen Pelanggan. Jobs pada profil ini sejalan dengan, tetapi tidak identik dengan, tradisi Jobs To Be Done.',
    'Buat satu Value Proposition Canvas untuk setiap segmen pelanggan yang material. Jangan mencampur jobs dua segmen dalam satu profil.',
    'Setelah ada bukti awal bahwa jobs, pains, dan gains yang penting benar-benar dipedulikan pelanggan dan peta nilai menujunya, kembalikan hasilnya ke BMC: sesuaikan saluran, hubungan, pendapatan, mitra, aktivitas, sumber daya, dan biaya — tujuh blok lainnya — agar tawaran itu dapat diantar dan nilainya ditangkap.',
    'Kedua kanvas saling menguji. Perubahan di satu kanvas perlu dicek di kanvas yang lain.',
  ],
};

export const EXAMPLE_VPD_CANVAS = {
  version: 1,
  segmentName: 'Profesional muda perkantoran urban — Kopi AJIB',
  jobs: [
    { id: 'job-1', text: 'Mendapatkan kafein berkualitas sebelum rapat pagi, tanpa terlambat.', kind: 'functional' },
    { id: 'job-2', text: 'Terlihat profesional dan punya selera, tanpa harus “nongkrong” lama di kafe.', kind: 'social' },
    { id: 'job-3', text: 'Memulai hari dengan rasa tenang, berenergi, dan tidak stres.', kind: 'emotional' },
    { id: 'job-4', text: 'Memesan cepat di aplikasi dan membayar tanpa memperlambat perjalanan ke kantor.', kind: 'supporting' },
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
    { id: 'gc-1', text: 'Opsi pesan duluan agar tinggal ambil (janji kecepatan grab-and-go; “180 detik” hanya ilustrasi tambahan).' },
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
    { id: 'link-5b', kind: 'job-product', customerId: 'job-4', valueId: 'prod-2' },
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

export const VPD_REFERENCES = [
  {
    citation:
      'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.',
    note: 'Sumber utama Value Proposition Canvas (Profil Pelanggan §1.1, Peta Nilai §1.2, dan Fit §1.3), tipologi jobs dan gains, serta hubungan kanvas ini dengan Business Model Canvas. Dikutip menurut bagian, tanpa memaksa nomor halaman cetak.',
  },
  {
    citation:
      'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. John Wiley & Sons.',
    note: 'Kerangka sembilan blok BMC yang diperbesar oleh Value Proposition Canvas pada blok Proposisi Nilai dan Segmen Pelanggan. Nomor halaman cetak tidak dicantumkan karena belum terverifikasi.',
  },
  {
    citation:
      'Bland, D. J., & Osterwalder, A. (2019). Testing Business Ideas: A Field Guide for Rapid Experimentation. John Wiley & Sons.',
    note: 'Memasang lensa Desirability, Feasibility, dan Viability ke hipotesis pada BMC dan VPC, serta menuntun pengujian. Nomor halaman cetak tidak dicantumkan karena belum terverifikasi.',
  },
  {
    citation:
      'Amarsy, N. (2014). Survival of the fittest. Strategyzer. https://www.strategyzer.com/library/survival-of-the-fittest',
    note: 'Uraian tiga tingkat fit. Artikel ini merujuk hlm. 48–49 pada Value Proposition Design untuk cetakan yang mereka kutip; halaman dapat berbeda antarcetakan.',
  },
  {
    citation:
      'Osterwalder, A. (2017). How to systematically reduce the risk & uncertainty of new ideas. Strategyzer. https://www.strategyzer.com/library/how-to-systematically-reduce-the-risk-uncertainty-of-new-ideas',
    note: 'Menyatakan bahwa Strategyzer meminjam konsep IDEO lalu menimpanya pada Business Model Canvas.',
  },
  {
    citation:
      'Christensen, C. M., Cook, S., & Hall, T. (2005). Marketing Malpractice: The Cause and the Cure. Harvard Business Review.',
    note: 'Artikel yang memopulerkan gagasan bahwa pelanggan “menyewa” produk untuk menyelesaikan pekerjaan tertentu (Jobs To Be Done) — tradisi terkait, bukan seluruh kerangka VPD.',
  },
  {
    citation:
      'Christensen, C. M., Hall, T., Dillon, K., & Duncan, D. S. (2016). Competing Against Luck: The Story of Innovation and Customer Choice. Harper Business.',
    note: 'Uraian lebih lengkap mengenai teori Jobs To Be Done yang meramaikan sisi pekerjaan pada Profil Pelanggan.',
  },
  {
    citation:
      'Kosasih, D. (2024). Studi Kasus: Kopi AJIB — Membangun Jaringan Kopi Nasional dengan Kecerdasan Buatan. Dharma Korporasi.',
    note: 'Sumber studi kasus pembelajaran yang dipakai sebagai ilustrasi di halaman ini; bukan verifikasi independen atas perusahaan publik.',
  },
]
