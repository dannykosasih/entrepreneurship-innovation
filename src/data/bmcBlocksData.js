/**
 * Business Model Canvas teaching content.
 * Definitions follow Osterwalder & Pigneur, Business Model Generation (2010).
 * The Desirability / Feasibility / Viability lens comes from IDEO / design thinking.
 * Mapping those three lenses onto the nine BMC blocks is a Strategyzer / Testing
 * Business Ideas (2019) convention, not a table from Business Model Generation
 * or from Brown (2008). Per-block Creating / Delivering / Capturing Value labels
 * are a teaching convention, not an official BMG 2010 table.
 * No Business Model Generation page numbers are cited (they were not verified).
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'Profesional muda perkantoran urban, mahasiswa yang mencari kafein terjangkau, pekerja remote/WFA, dan pembeli yang datang karena promo. Pisahkan segmen ini karena pekerjaan harian, kepekaan harga, dan kebiasaan salurannya berbeda — lalu buat satu Value Proposition Canvas per segmen yang material. (Bauran persentase 42/28/18/12 tidak terdapat di naskah studi kasus; angka itu hanya ilustrasi tambahan jika dipakai di template.)',
    extraExample:
      'Ilustrasi. Platform banyak sisi seperti layanan ojek daring melayani penumpang dan mitra pengemudi sekaligus — dua segmen yang saling membutuhkan.',
    questions:
      'Untuk siapa kita menciptakan nilai? Siapa pelanggan terpenting? Apakah kebutuhan, saluran, hubungan, atau kemampuan membayar mereka cukup berbeda sehingga harus dipisah?',
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'Kopi susu aren espresso berkualitas kafe pada harga harian yang dijaga (di naskah kasus: sekitar Rp 18.000–22.000), pesan duluan lewat aplikasi tanpa antre, rasa yang konsisten antar-gerai, plus program loyalitas. Intinya: kopi harian yang cepat, terjangkau, dan bisa diandalkan.',
    extraExample:
      'Ilustrasi. Untuk mahasiswa, nilai utamanya mungkin “tempat yang ramah kantong”; untuk klien korporat, “voucher dan pesanan rombongan yang mudah ditagih.” Satu BMC boleh memuat beberapa proposisi nilai — idealnya diperjelas satu VPC per segmen.',
    questions:
      'Nilai apa yang kita antarkan ke setiap segmen? Masalah mana yang diselesaikan, kebutuhan mana yang dipenuhi? Mengapa pelanggan memilih kita, bukan alternatif yang sudah ada?',
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'Aplikasi mobile resmi (di naskah kasus, 57% pesanan pada 2024), gerai compact grab-and-go di lobi kantor dan stasiun, kemitraan marketplace makanan daring, serta pesanan rombongan/katering. Saluran dipilih agar profesional kantoran bisa memesan dalam perjalanan.',
    extraExample:
      'Ilustrasi. Merek skincare lokal yang menggabungkan live shopping (kesadaran dan pembelian) dengan toko resmi di marketplace (evaluasi dan purna jual).',
    questions:
      'Melalui saluran mana segmen ingin dijangkau? Bagaimana kita menjangkau mereka sekarang? Saluran mana yang paling berhasil dan paling hemat? Bagaimana tahap kesadaran sampai purna jual diintegrasikan?',
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'Layanan mandiri otomatis lewat aplikasi, program loyalitas dan personalisasi (ada di naskah kasus), plus pelayanan cepat di bar gerai.',
    extraExample:
      'Ilustrasi tambahan (tidak ada di naskah kasus): kebijakan pengembalian dana instan jika rasa tidak pas — contoh campuran self-service digital dan jaminan kepercayaan. Ilustrasi lain: komunitas alumni sebuah LMS yang saling berbagi kanvas usaha — hubungan berbasis komunitas, bukan hanya transaksi lisensi.',
    questions:
      'Jenis hubungan apa yang diharapkan setiap segmen? Hubungan mana yang sudah kita bangun? Biayanya berapa, dan bagaimana hubungan itu terintegrasi dengan model sisanya?',
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'Model utama transaksi harian penjualan minuman di gerai dan lewat aplikasi. Rincian bauran SKU — misalnya pangsa minuman signature, botol, pastry, atau voucher prabayar — tidak ada di naskah kasus dan hanya boleh dibaca sebagai ilustrasi tambahan, terpisah dari angka keuangan kasus (termasuk COGS sekitar 46%).',
    extraExample:
      'Ilustrasi. LMS kampus yang menagih lisensi B2B tahunan, plus langganan mahasiswa dan biaya sertifikasi.',
    questions:
      'Untuk nilai apa pelanggan bersedia membayar? Mereka membayar apa dan bagaimana saat ini? Bagaimana mereka lebih suka membayar? Berapa kontribusi tiap aliran terhadap pendapatan total?',
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'Model peramalan permintaan (ada di naskah kasus), jaringan gerai grab-and-go (812 titik menurut kasus), kemitraan pasokan biji dengan koperasi petani, dan standar orang di gerai. Tanpa pasokan dan standar yang konsisten, janji “rasa sama di mana saja” sulit ditepati.',
    extraExample:
      'Ilustrasi. Untuk merek fashion D2C, sumber daya kuncinya bisa berupa daftar pelanggan dan data retensi, bukan hanya gudang kain.',
    questions:
      'Sumber daya utama apa yang dibutuhkan proposisi nilai, saluran, hubungan, dan aliran pendapatan kita?',
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'Kontrol mutu dan produksi sangrai, prediksi permintaan serta restock (ada di naskah kasus), pelatihan barista, dan pengembangan aplikasi plus loyalitas. Janji “cepat, konsisten, terjangkau” harus tertopang aktivitas ini.',
    extraExample:
      'Ilustrasi tambahan (tidak ada di naskah kasus): target layanan di bawah 180 detik — contoh ukuran operasional, bukan angka kasus. Ilustrasi lain: marketplace dua sisi harus mengelola onboarding mitra, pencocokan permintaan, dan resolusi sengketa — itu aktivitas platform, bukan hanya “jualan.”',
    questions:
      'Aktivitas utama apa yang dibutuhkan proposisi nilai, saluran, hubungan, dan aliran pendapatan kita?',
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'Koperasi petani Aceh Gayo, Toraja, dan Kintamani (ada di naskah kasus); penyedia POS/cloud; armada pengantaran ojol; serta pengelola lokasi gerai di gedung dan kampus. Mitra menutup celah yang tidak efisien jika dibangun sendiri.',
    extraExample:
      'Ilustrasi. Startup EdTech yang bermitra dengan universitas untuk saluran distribusi, dan dengan praktisi industri untuk kredibilitas kurikulum.',
    questions:
      'Siapa mitra dan pemasok utama? Sumber daya atau aktivitas mana yang diperoleh dari mitra? Mengapa kita bermitra — skala, risiko, atau akses pada sumber daya tertentu?',
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
    exampleTitle: 'Ilustrasi — studi kasus pembelajaran Kopi AJIB',
    example:
      'COGS bahan baku pada angka keuangan 2024 di naskah kasus sekitar 46% dari pendapatan, plus gaji dan insentif gerai, sewa dan utilitas, infrastruktur digital/AI, serta akuisisi pelanggan digital. Proporsi COGS yang tinggi menuntut volume dan pengendalian limbah (kasus juga membahas penurunan waste setelah AI).',
    extraExample:
      'Ilustrasi tambahan (tidak ada di naskah kasus): kisaran luas gerai 15–25 m² — contoh ukuran, bukan data kasus. Ilustrasi lain: SaaS murni biasanya didominasi biaya tetap (pengembangan dan cloud), sehingga margin dapat melebar seiring pengguna — berbeda dengan ritel yang biaya variabelnya mengikuti setiap unit terjual.',
    questions:
      'Biaya apa yang paling penting dalam model ini? Aktivitas dan sumber daya mana yang paling mahal? Apakah model lebih berorientasi biaya atau berorientasi nilai?',
  },
];

export const BMC_BLOCK_MAP = Object.fromEntries(BMC_BLOCKS.map((block) => [block.key, block]));

export const BMC_REFERENCES = [
  {
    citation:
      'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. John Wiley & Sons.',
    note: 'Sumber utama sembilan blok Business Model Canvas serta definisi model bisnis sebagai cara organisasi menciptakan, mengantarkan, dan menangkap nilai. Nomor halaman cetak per blok tidak dicantumkan karena belum terverifikasi.',
  },
  {
    citation:
      'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.',
    note: 'Memperdalam blok Proposisi Nilai dan Segmen Pelanggan melalui Value Proposition Canvas, serta hubungan VPD dengan BMC.',
  },
  {
    citation:
      'Bland, D. J., & Osterwalder, A. (2019). Testing Business Ideas: A Field Guide for Rapid Experimentation. John Wiley & Sons.',
    note: 'Memasang lensa Desirability, Feasibility, dan Viability ke hipotesis pada BMC dan VPC, serta menuntun pengujian (termasuk Assumptions Mapping). Nomor halaman cetak tidak dicantumkan karena belum terverifikasi.',
  },
  {
    citation:
      'Osterwalder, A. (2017). How to systematically reduce the risk & uncertainty of new ideas. Strategyzer. https://www.strategyzer.com/library/how-to-systematically-reduce-the-risk-uncertainty-of-new-ideas',
    note: 'Menyatakan bahwa Strategyzer meminjam konsep IDEO lalu menimpanya pada Business Model Canvas — sumber overlay DFV ke sembilan blok, bukan Business Model Generation 2010.',
  },
  {
    citation:
      'Amarsy, N. (2014). Survival of the fittest. Strategyzer. https://www.strategyzer.com/library/survival-of-the-fittest',
    note: 'Uraian tiga jenis fit yang merujuk Value Proposition Design.',
  },
  {
    citation: 'Brown, T. (2008). Design Thinking. Harvard Business Review.',
    note: 'Merumuskan inovasi sebagai pencocokan kebutuhan orang, kelayakan teknologi, dan strategi bisnis yang viabel. Nama lensa Desirability–Feasibility–Viability dan pemetaannya ke sembilan blok BMC tidak berasal dari artikel ini sendiri.',
  },
  {
    citation: 'IDEO. Human-Centered Design / Design Kit. https://www.designkit.org',
    note: 'Sumber lensa keinginan, kelayakan, dan keberlanjutan ekonomi (desirability, feasibility, viability), bukan sumber pemetaan lensa itu ke sembilan blok BMC.',
  },
  {
    citation:
      'Kosasih, D. (2024). Studi Kasus: Kopi AJIB — Membangun Jaringan Kopi Nasional dengan Kecerdasan Buatan. Dharma Korporasi.',
    note: 'Sumber studi kasus pembelajaran yang dipakai sebagai ilustrasi di halaman ini; bukan verifikasi independen atas perusahaan publik.',
  },
];
