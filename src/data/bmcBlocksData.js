/**
 * Business Model Canvas teaching content.
 * Definitions follow Osterwalder & Pigneur, Business Model Generation (2010).
 * Desirability / Feasibility / Viability follows the IDEO design-thinking lens,
 * applied to the nine blocks as taught in this course (mod-13).
 * No page numbers are cited because they vary across printings.
 */

export const VALUE_LENSES = {
  create: {
    id: 'create',
    label: 'Menciptakan Nilai',
    en: 'Creating Value',
    color: '#1266B1',
    description:
      'Bagaimana organisasi merancang tawaran dan menyiapkan infrastruktur (mitra, aktivitas, sumber daya) agar proposisi nilai itu bisa diwujudkan.',
  },
  deliver: {
    id: 'deliver',
    label: 'Mengantarkan Nilai',
    en: 'Delivering Value',
    color: '#3533CA',
    description:
      'Bagaimana nilai sampai kepada segmen pelanggan yang tepat, melalui saluran dan jenis hubungan yang dipilih.',
  },
  capture: {
    id: 'capture',
    label: 'Menangkap Nilai',
    en: 'Capturing Value',
    color: '#AF6A00',
    description:
      'Bagaimana organisasi mengubah nilai yang diciptakan dan diantarkan menjadi pendapatan, serta menanggung biaya agar modelnya layak secara ekonomi.',
  },
};

export const DFV_LENSES = {
  desirability: {
    id: 'desirability',
    label: 'Desirability',
    idLabel: 'Keinginan Pelanggan',
    color: '#1266B1',
    blocks: 'CS, VP, CH, CR',
    description:
      'Apakah orang benar-benar menginginkan tawaran ini? Sisi kanan kanvas (plus proposisi nilai) menguji apakah masalah, tawaran, saluran, dan hubungan relevan bagi pelanggan.',
  },
  feasibility: {
    id: 'feasibility',
    label: 'Feasibility',
    idLabel: 'Kelayakan Operasional',
    color: '#3533CA',
    blocks: 'KP, KA, KR',
    description:
      'Apakah kita mampu mewujudkannya? Sisi kiri kanvas menguji apakah mitra, aktivitas, dan sumber daya utama cukup untuk merancang dan mengoperasikan tawaran itu.',
  },
  viability: {
    id: 'viability',
    label: 'Viability',
    idLabel: 'Keberlanjutan Ekonomi',
    color: '#AF6A00',
    blocks: 'RS, C$',
    description:
      'Apakah model ini bisa bertahan secara ekonomi? Bagian bawah kanvas menimbang aliran pendapatan terhadap struktur biaya.',
  },
};

export const BMC_BLOCKS = [
  {
    key: 'customerSegments',
    code: 'CS',
    en: 'Customer Segments',
    idLabel: 'Segmen Pelanggan',
    valueLens: 'deliver',
    dfvLens: 'desirability',
    definition:
      'Kelompok orang atau organisasi berbeda yang ingin dijangkau dan dilayani oleh usaha Anda. Segmen dipisahkan jika kebutuhan, saluran, hubungan, atau kemampuan membayarnya berbeda secara material. Pola umum meliputi pasar massal, ceruk, tersegmentasi, terdiversifikasi, dan platform banyak sisi.',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'Profesional muda perkantoran urban (42% omzet), mahasiswa yang mencari kafein terjangkau (28%), pekerja remote/WFA (18%), dan pembeli musiman karena diskon (12%). Masing-masing memiliki pekerjaan harian, sensitivitas harga, dan kebiasaan saluran yang berbeda, sehingga proposisi nilainya bisa disetel per segmen.',
    extraExample:
      'Contoh lain (platform banyak sisi): Gojek melayani penumpang dan mitra pengemudi sekaligus — dua segmen yang saling membutuhkan.',
  },
  {
    key: 'valuePropositions',
    code: 'VP',
    en: 'Value Propositions',
    idLabel: 'Proposisi Nilai',
    valueLens: 'create',
    dfvLens: 'desirability',
    definition:
      'Paket produk dan layanan yang menciptakan nilai bagi segmen pelanggan tertentu: masalah apa yang diselesaikan, kebutuhan apa yang dipenuhi, dan mengapa pelanggan memilih Anda, bukan alternatif yang sudah ada. Nilai dapat bersifat kuantitatif (harga, kecepatan) atau kualitatif (desain, pengalaman, status).',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'Kopi susu aren espresso berkualitas kafe seharga Rp 18.000, pesan duluan lewat aplikasi tanpa antre, rasa yang konsisten di seluruh gerai, plus personalisasi promo dan gamifikasi poin loyalitas. Intinya: kopi harian yang cepat, terjangkau, dan bisa diandalkan.',
    extraExample:
      'Contoh lain: untuk mahasiswa, nilai utamanya mungkin “tempat nongkrong yang ramah kantong”; untuk klien korporat, “voucher dan pesanan rombongan yang mudah ditagih.” Satu kanvas BMC boleh memiliki beberapa proposisi nilai — idealnya satu per segmen, yang kemudian diperjelas di Value Proposition Canvas.',
  },
  {
    key: 'channels',
    code: 'CH',
    en: 'Channels',
    idLabel: 'Saluran',
    valueLens: 'deliver',
    dfvLens: 'desirability',
    definition:
      'Cara perusahaan berkomunikasi dengan pelanggan dan mengantarkan proposisi nilai. Saluran mencakup tahap kesadaran, evaluasi, pembelian, pengantaran, dan purna jual — baik saluran milik sendiri (gerai, aplikasi) maupun mitra (marketplace, ojol).',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'Aplikasi mobile resmi (57% transaksi), gerai compact grab-and-go di lobi kantor dan stasiun, kemitraan marketplace makanan daring, serta pesanan rombongan dan katering korporat. Saluran dipilih agar profesional kantoran bisa memesan dalam perjalanan, bukan hanya saat sudah duduk di kafe.',
    extraExample:
      'Contoh lain: merek skincare lokal yang menggabungkan live shopping di TikTok (kesadaran dan pembelian) dengan toko resmi di Shopee (evaluasi dan purna jual).',
  },
  {
    key: 'customerRelationships',
    code: 'CR',
    en: 'Customer Relationships',
    idLabel: 'Hubungan Pelanggan',
    valueLens: 'deliver',
    dfvLens: 'desirability',
    definition:
      'Jenis hubungan yang ingin dibangun dengan setiap segmen: bantuan personal, dedicated personal assistance, layanan mandiri, layanan otomatis, komunitas, atau ko-kreasi. Hubungan memengaruhi akuisisi, retensi, dan penjualan ulang (upsell).',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'Layanan mandiri otomatis lewat aplikasi, program loyalitas bertingkat dengan notifikasi promo, pelayanan ramah dan cepat di bar gerai, serta pengembalian dana instan jika rasa tidak pas. Campuran self-service digital dan sentuhan manusia di gerai menjaga kecepatan tanpa kehilangan kepercayaan.',
    extraExample:
      'Contoh lain: komunitas alumni sebuah LMS yang saling berbagi kanvas usaha — hubungan berbasis komunitas, bukan hanya transaksi lisensi.',
  },
  {
    key: 'revenueStreams',
    code: 'RS',
    en: 'Revenue Streams',
    idLabel: 'Aliran Pendapatan',
    valueLens: 'capture',
    dfvLens: 'viability',
    definition:
      'Kas yang dihasilkan dari setiap segmen pelanggan. Mekanismenya bisa berupa penjualan aset, biaya pemakaian, langganan, sewa, lisensi, komisi perantara, atau iklan. Perlu dibedakan pendapatan transaksi sekali jalan dan pendapatan berulang, serta apa yang benar-benar bersedia dibayar pelanggan.',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'Penjualan minuman cangkir harian (kopi susu signature 46% kontribusi), botol 1 liter siap minum dan kategori non-kopi, cross-sell roti dan pastry, serta saldo prabayar dan voucher korporat. Model utamanya transaksi harian, dilengkapi prepaid agar arus kas lebih awal.',
    extraExample:
      'Contoh lain: LMS kampus yang menagih lisensi B2B tahunan, plus langganan mahasiswa dan biaya sertifikasi profesional.',
  },
  {
    key: 'keyResources',
    code: 'KR',
    en: 'Key Resources',
    idLabel: 'Sumber Daya Utama',
    valueLens: 'create',
    dfvLens: 'feasibility',
    definition:
      'Aset terpenting yang dibutuhkan agar model bisnis berjalan: fisik (gerai, mesin), intelektual (merek, data, algoritma, paten), manusia, atau finansial. Sumber daya harus menopang proposisi nilai, saluran, hubungan, dan pendapatan — bukan daftar aset yang “baik dimiliki.”',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'Algoritma AI peramalan permintaan gerai, jaringan 812 titik grab-and-go, kontrak langsung pasokan biji kopi petani, dan jaringan barista terlatih berskala nasional. Tanpa konsistensi pasokan dan standar orang, janji “rasa sama di mana saja” tidak bisa ditepati.',
    extraExample:
      'Contoh lain: untuk merek fashion D2C, sumber daya kuncinya bisa berupa daftar pelanggan dan data retensi, bukan hanya gudang kain.',
  },
  {
    key: 'keyActivities',
    code: 'KA',
    en: 'Key Activities',
    idLabel: 'Aktivitas Utama',
    valueLens: 'create',
    dfvLens: 'feasibility',
    definition:
      'Hal-hal terpenting yang harus dilakukan perusahaan agar model bisnisnya bekerja. Pola umum: produksi, pemecahan masalah (problem solving), dan pengelolaan platform atau jaringan. Aktivitas utama harus secara langsung mendukung proposisi nilai dan saluran, bukan seluruh daftar pekerjaan operasional.',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'Penyangraian terpusat dan kontrol mutu, prediksi permintaan AI serta restock otomatis, pelatihan cepat barista agar layanan di bawah 180 detik, dan pengembangan fitur aplikasi plus loyalitas. Inilah pekerjaan yang menjaga janji “cepat, konsisten, terjangkau.”',
    extraExample:
      'Contoh lain: marketplace dua sisi harus mengelola onboarding mitra, pencocokan permintaan, dan resolusi sengketa — itu aktivitas platform, bukan hanya “jualan.”',
  },
  {
    key: 'keyPartners',
    code: 'KP',
    en: 'Key Partnerships',
    idLabel: 'Kemitraan Utama',
    valueLens: 'create',
    dfvLens: 'feasibility',
    definition:
      'Jaringan pemasok dan mitra yang membuat model bisnis berjalan. Alasan bermitra biasanya: optimasi dan skala, pengurangan risiko, atau akuisisi sumber daya/aktivitas tertentu. Bentuknya bisa aliansi strategis, koperasi antar pesaing (coopetition), usaha patungan, atau relasi pembeli–pemasok.',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'Koperasi petani Aceh Gayo, Toraja, dan Kintamani; penyedia cloud POS dan server AI; armada pengantaran ojol (GoFood, GrabFood, ShopeeFood); serta pengelola gedung perkantoran dan kampus untuk lokasi gerai. Mitra ini menutup celah yang tidak efisien jika dibangun sendiri.',
    extraExample:
      'Contoh lain: startup EdTech yang bermitra dengan universitas untuk kanal distribusi, dan dengan praktisi industri untuk kredibilitas kurikulum.',
  },
  {
    key: 'costStructure',
    code: 'C$',
    en: 'Cost Structure',
    idLabel: 'Struktur Biaya',
    valueLens: 'capture',
    dfvLens: 'viability',
    definition:
      'Seluruh biaya yang timbul untuk mengoperasikan model bisnis. Model bisa berorientasi biaya (cost-driven) atau berorientasi nilai (value-driven), dengan biaya tetap, biaya variabel, serta ekonomi skala dan lingkup. Struktur biaya harus dibaca berpasangan dengan aliran pendapatan.',
    exampleTitle: 'Contoh utama: Kopi AJIB',
    example:
      'COGS bahan baku (biji kopi, susu, gula aren sekitar 46%), gaji barista dan insentif gerai, sewa gerai compact 15–25 m² plus utilitas, biaya server cloud dan pemeliharaan model AI, serta iklan kinerja dan promo referral aplikasi. Proporsi COGS yang tinggi menuntut volume harian dan pengendalian limbah.',
    extraExample:
      'Contoh lain: SaaS murni biasanya didominasi biaya tetap (pengembangan dan cloud), sehingga margin melebar seiring jumlah pengguna — berbeda dengan ritel yang variabelnya mengikuti setiap cangkir.',
  },
];

export const BMC_BLOCK_MAP = Object.fromEntries(BMC_BLOCKS.map((block) => [block.key, block]));

export const BMC_REFERENCES = [
  {
    citation:
      'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. John Wiley & Sons.',
    note: 'Sumber utama sembilan blok Business Model Canvas serta definisi model bisnis sebagai cara organisasi menciptakan, mengantarkan, dan menangkap nilai.',
  },
  {
    citation:
      'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.',
    note: 'Memperdalam blok Proposisi Nilai dan Segmen Pelanggan melalui Value Proposition Canvas, serta hubungan VPD dengan BMC.',
  },
  {
    citation: 'Strategyzer. Business Model Canvas and Value Proposition Canvas resources. https://www.strategyzer.com',
    note: 'Sumber resmi kerangka kerja Strategyzer untuk kanvas, pola model bisnis, dan pengujian hipotesis.',
  },
  {
    citation: 'Brown, T. (2008). Design Thinking. Harvard Business Review.',
    note: 'Lensa Desirability, Feasibility, dan Viability berasal dari praktik design thinking IDEO; tiga kriteria ini dipakai untuk menguji apakah inovasi diinginkan, bisa diwujudkan, dan layak secara ekonomi.',
  },
  {
    citation: 'IDEO. Human-Centered Design / Design Kit. https://www.designkit.org',
    note: 'Toolkit IDEO yang merumuskan lensa keinginan, kelayakan, dan keberlanjutan ekonomi sebagai syarat inovasi yang berhasil.',
  },
];
