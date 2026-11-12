import React, { useState } from 'react';
import {
  LayoutGrid,
  Plus,
  Trash2,
  Download,
  BookOpen,
  Quote,
} from 'lucide-react';
import { BMC_BLOCKS, BMC_BLOCK_MAP, VALUE_LENSES, DFV_LENSES, BMC_REFERENCES } from '../data/bmcBlocksData';
import { BMC_BLOCK_ICONS, CanvasIcon } from './CanvasIcon';
import { TestingLab } from './TestingLab';
import '../vpc-canvas.css';

const PRESET_TEMPLATES = {
  kopiAjib: {
    name: "Kopi AJIB — template ilustrasi (studi kasus pembelajaran)",
    canvas: {
      keyPartners: [
        "Koperasi Petani Aceh Gayo, Toraja & Kintamani",
        "Penyedia Cloud POS & Server AI Moka/Pawoon",
        "Armada Pengantaran Ojol (GoFood, GrabFood, ShopeeFood)",
        "Pengelola Gedung Perkantoran & Kampus (lokasi SCBD: ilustrasi tambahan, bukan angka kasus)"
      ],
      keyActivities: [
        "Penyangraian Terpusat & Kontrol Kualitas Standar (penyangraian terpusat: ilustrasi tambahan, tidak eksplisit di naskah kasus)",
        "Model Prediksi Permintaan AI & Restock Otomatis",
        "Pelatihan Cepat Barista & Janji Layanan Cepat (target <180 detik: ilustrasi tambahan, bukan angka kasus)",
        "Pengembangan Fitur Aplikasi Mobile & Loyalitas"
      ],
      keyResources: [
        "Algoritma AI Peramalan Permintaan Gerai",
        "812 Titik Gerai Grab-and-Go Nasional",
        "Kontrak Langsung Pasokan Biji Kopi Petani",
        "Jaringan Barista Terlatih Standar Nasional"
      ],
      valuePropositions: [
        "Kopi Susu Aren Espresso Berkualitas Kafe Rp 18.000–22.000 (kisaran naskah kasus)",
        "Pesan Duluan via Aplikasi Tanpa Antre di Gerai",
        "Konsistensi Rasa Standar di Seluruh 812 Gerai",
        "Personalisasi Promo & Gamifikasi Poin Loyalitas"
      ],
      customerRelationships: [
        "Layanan Mandiri Otomatis via Aplikasi Mobile",
        "Program Loyalitas Bertingkat & Notifikasi Promo Cerdas",
        "Pelayanan Ramah & Cepat di Bar Gerai",
        "Pengembalian Dana Instan jika Rasa Tidak Pas (ilustrasi tambahan, bukan angka kasus)"
      ],
      channels: [
        "Aplikasi Mobile Resmi Kopi AJIB (57% transaksi, 2024 menurut naskah kasus)",
        "Gerai Compact Grab-and-Go di Lobi Kantor & Stasiun",
        "Kemitraan Marketplace Makanan Online",
        "Pesanan Rombongan Kantor & Katering Korporat"
      ],
      customerSegments: [
        "Profesional Muda Perkantoran Urban (ilustrasi segmen utama)",
        "Mahasiswa Pencari Kafein Terjangkau & Tempat Nongkrong (ilustrasi)",
        "Pekerja Remote / WFA Butuh Kopi Harian (ilustrasi)",
        "Pembeli Musiman / Coba-coba karena Diskon (ilustrasi)"
      ],
      costStructure: [
        "COGS Bahan Baku: Biji Kopi, Susu Segar, Gula Aren (46% pada 2024 menurut naskah kasus)",
        "Gaji Barista & Insentif Performa Gerai Berbasis Data",
        "Sewa Gerai Compact & Biaya Utilitas (luas 15–25 m²: ilustrasi tambahan, bukan angka kasus)",
        "Biaya Server Cloud & Pemeliharaan Model AI",
        "Iklan Performa Digital & Promo Referral Aplikasi"
      ],
      revenueStreams: [
        "Penjualan Minuman Cangkir Harian (pangsa signature 46% adalah ilustrasi tambahan, bukan angka kasus)",
        "Minuman Botol 1 Liter Siap Minum & Kategori Non-Kopi (ilustrasi tambahan, tidak ada di naskah kasus)",
        "Cross-sell Makanan Ringan, Roti & Pastry Pendamping (ilustrasi tambahan, tidak ada di naskah kasus)",
        "Saldo Pre-paid & Voucher Pelanggan Korporat (ilustrasi tambahan, tidak ada di naskah kasus)"
      ]
    }
  },
  edutech: {
    name: "EduTech AI LMS — template ilustrasi (contoh buatan)",
    canvas: {
      keyPartners: ["Universitas & Sekolah Bisnis", "Mentor Industri & Praktisi", "Jaringan Modal Ventura"],
      keyActivities: ["Kurasi Kurikulum Berbasis AI", "Pengembangan Simulator Bisnis", "Pemeliharaan Platform LMS"],
      keyResources: ["Knowledge Base Kewirausahaan Terakreditasi", "Engine Simulasi Bisnis", "Brand DDK & Danny Kosasih"],
      valuePropositions: ["Pembelajaran Interaktif Simulasi Nyata", "Studi Kasus Riil Finansial & Operasional", "Sertifikasi Kompetensi Terverifikasi"],
      customerRelationships: ["Forum Komunitas Pembelajar", "Umpan Balik AI Otomatis", "Sesi Mentoring Interaktif"],
      channels: ["Portal Kampus & Universitas", "Akses Langsung Pelajar & Mahasiswa", "Program Pelatihan Korporasi"],
      customerSegments: ["Mahasiswa Bisnis & Manajemen", "Founder Startup Tahap Awal", "Intrapreneur Perusahaan"],
      costStructure: ["Pengembangan Konten & Royalti", "Server Cloud & API Kecerdasan Buatan", "Biaya Akreditasi"],
      revenueStreams: ["Lisensi B2B Kampus & Universitas", "Paket Berlangganan Mahasiswa", "Sertifikasi Profesional Korporat"]
    }
  }
};

const CANVAS_TITLES = {
  keyPartners: '1. Key Partners · Mitra Utama',
  keyActivities: '2. Key Activities · Aktivitas Utama',
  keyResources: '6. Key Resources · Sumber Daya Utama',
  valuePropositions: '3. Value Propositions · Proposisi Nilai',
  customerRelationships: '4. Customer Relationships · Hubungan Pelanggan',
  channels: '7. Channels · Saluran',
  customerSegments: '5. Customer Segments · Segmen Pelanggan',
  costStructure: '8. Cost Structure · Struktur Biaya',
  revenueStreams: '9. Revenue Streams · Aliran Pendapatan',
};

const EMPTY_CANVAS = {
  keyPartners: [],
  keyActivities: [],
  keyResources: [],
  valuePropositions: [],
  customerRelationships: [],
  channels: [],
  customerSegments: [],
  costStructure: [],
  revenueStreams: [],
};

function LensBadge({ lens, kind }) {
  const data = kind === 'value' ? VALUE_LENSES[lens] : DFV_LENSES[lens];
  if (!data) return null;
  return (
    <span className="badge" style={{
      fontSize: '0.6rem',
      padding: '0.12rem 0.4rem',
      background: `${data.color}18`,
      color: data.color,
      border: `1px solid ${data.color}55`,
      letterSpacing: '0.02em',
    }}>
      {kind === 'value' ? data.label : data.label}
    </span>
  );
}

export function BmcBuilder() {
  const [activeTemplate, setActiveTemplate] = useState('kopiAjib');
  const [canvasData, setCanvasData] = useState(PRESET_TEMPLATES.kopiAjib.canvas);
  const [newItemText, setNewItemText] = useState({});
  const [selectedKey, setSelectedKey] = useState('valuePropositions');
  const [openGuideKey, setOpenGuideKey] = useState('customerSegments');

  const handleAddItem = (blockKey) => {
    const text = newItemText[blockKey]?.trim();
    if (!text) return;
    setCanvasData(prev => ({
      ...prev,
      [blockKey]: [...(prev[blockKey] || []), text]
    }));
    setNewItemText(prev => ({ ...prev, [blockKey]: '' }));
  };

  const handleRemoveItem = (blockKey, index) => {
    setCanvasData(prev => ({
      ...prev,
      [blockKey]: prev[blockKey].filter((_, i) => i !== index)
    }));
  };

  const handleLoadTemplate = (key) => {
    setActiveTemplate(key);
    if (key === 'blank') {
      setCanvasData({ ...EMPTY_CANVAS });
    } else {
      setCanvasData(PRESET_TEMPLATES[key].canvas);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(canvasData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `DDK_Business_Model_Canvas_${activeTemplate}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const totalItems = Object.values(canvasData).reduce((sum, arr) => sum + arr.length, 0);
  const blocksFilled = Object.values(canvasData).filter(arr => arr.length > 0).length;
  const healthScore = Math.min(100, Math.round((blocksFilled / 9) * 70 + Math.min(30, totalItems * 1.2)));
  const selectedBlock = BMC_BLOCK_MAP[selectedKey];

  const renderBlock = (blockKey, minHeight = '240px', isSpecial = false) => {
    const items = canvasData[blockKey] || [];
    const meta = BMC_BLOCK_MAP[blockKey];
    const isSelected = selectedKey === blockKey;
    return (
      <div style={{
        background: isSpecial ? 'var(--ddk-gold-subtle)' : 'var(--ddk-white)',
        border: `1.5px solid ${isSelected ? 'var(--ddk-primary-blue)' : isSpecial ? 'var(--ddk-gold)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight,
        boxShadow: isSelected ? '0 0 0 2px rgba(18,102,177,0.18)' : 'var(--shadow-sm)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '0.5rem',
          marginBottom: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.4rem'
        }}>
          <button
            type="button"
            onClick={() => setSelectedKey(blockKey)}
            aria-pressed={isSelected}
            aria-label={`Lihat definisi ${meta.idLabel}`}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              textAlign: 'left',
              cursor: 'pointer',
              flex: 1,
              minWidth: 0,
            }}
          >
            <div className="bmc-block-icon-row">
              <span className="canvas-icon-badge">
                <CanvasIcon name={BMC_BLOCK_ICONS[blockKey]} size={18} />
              </span>
              <h4 style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: 'var(--ddk-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.35,
              }}>
                {CANVAS_TITLES[blockKey]}
              </h4>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.35rem' }}>
              <LensBadge lens={meta.valueLens} kind="value" />
              <LensBadge lens={meta.dfvLens} kind="dfv" />
            </div>
          </button>
          <span className={`badge ${isSpecial ? 'badge-gold' : 'badge-blue'}`} style={{ fontSize: '0.625rem', padding: '0.1rem 0.4rem' }}>
            {items.length}
          </span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem', overflowY: 'auto', maxHeight: '200px' }}>
          {items.map((item, idx) => (
            <div
              key={`${blockKey}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.5rem',
                fontSize: '0.8rem',
                background: isSpecial ? 'white' : 'var(--ddk-light-gray)',
                border: '1px solid var(--border-subtle)',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                lineHeight: 1.3
              }}
            >
              <span style={{ color: 'var(--text-body)', fontWeight: 500 }}>• {item}</span>
              <button
                onClick={() => handleRemoveItem(blockKey, idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: 0,
                  flexShrink: 0
                }}
                title="Hapus"
                aria-label={`Hapus poin dari ${meta.idLabel}`}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem' }}>
          <input
            type="text"
            placeholder="Tambah poin..."
            value={newItemText[blockKey] || ''}
            onChange={(e) => setNewItemText({ ...newItemText, [blockKey]: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddItem(blockKey); }}
            style={{
              flex: 1,
              padding: '0.35rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--border-subtle)',
              fontFamily: 'var(--font-body)'
            }}
          />
          <button
            onClick={() => handleAddItem(blockKey)}
            style={{
              padding: '0.35rem 0.6rem',
              background: 'var(--ddk-primary-blue)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
            aria-label={`Tambah poin ke ${meta.idLabel}`}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
              DDK Strategic Canvas Tool
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--ddk-dark)' }}>
              Business Model Canvas
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.35rem', maxWidth: '52rem' }}>
              Kerangka Alexander Osterwalder dan Yves Pigneur untuk merancang, menguji, dan menyesuaikan sembilan blok bangunan yang menjelaskan bagaimana usaha Anda menciptakan, mengantarkan, dan menangkap nilai.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={handleExportJSON} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
              <Download size={14} /> Unduh Format JSON
            </button>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>
              Pilih Template:
            </span>
            <button
              onClick={() => handleLoadTemplate('kopiAjib')}
              className={`btn ${activeTemplate === 'kopiAjib' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            >
              Kopi AJIB (ilustrasi)
            </button>
            <button
              onClick={() => handleLoadTemplate('edutech')}
              className={`btn ${activeTemplate === 'edutech' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            >
              EduTech AI LMS (ilustrasi)
            </button>
            <button
              onClick={() => handleLoadTemplate('blank')}
              className={`btn ${activeTemplate === 'blank' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            >
              Kanvas Kosong
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Kelengkapan isian:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: healthScore >= 80 ? 'var(--ddk-primary-blue)' : '#D97706', fontFamily: 'var(--font-heading)' }}>
                {healthScore}%
              </span>
              <span className={`badge ${healthScore >= 80 ? 'badge-gold' : 'badge-soft'}`}>
                {healthScore >= 80 ? 'Lengkap' : 'Masih ada blok kosong'}
              </span>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.55 }}>
          Skor ini hanya mengukur apakah sembilan blok sudah diisi, bukan apakah model sudah divalidasi di lapangan. Contoh di template adalah ilustrasi pembelajaran.
        </p>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <LayoutGrid size={18} color="var(--ddk-primary-blue)" aria-hidden="true" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)', letterSpacing: '-0.02em' }}>
            Dua lensa untuk membaca sembilan blok
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
          Model bisnis, menurut Osterwalder dan Pigneur dalam Business Model Generation (bagian “Definition of a Business Model”), adalah alasan mendasar bagaimana organisasi menciptakan, mengantarkan, dan menangkap nilai. Buku yang sama juga menata sembilan blok ke empat wilayah: pelanggan, tawaran, infrastruktur, dan kelayakan finansial.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
          Pembagian tiap blok ke Creating, Delivering, dan Capturing Value di halaman ini adalah konvensi pengajaran, bukan tabel resmi di Business Model Generation (2010). Kami menempatkan tawaran dan infrastruktur (VP, KP, KA, KR) pada menciptakan nilai; saluran, hubungan, dan segmen (CH, CR, CS) pada mengantarkan nilai; serta pendapatan dan biaya (RS, C$) pada menangkap nilai.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>
          Lensa kedua — Desirability, Feasibility, dan Viability — berasal dari design thinking IDEO: apakah tawaran diinginkan, dapat diwujudkan, dan layak secara ekonomi. Pemasangan ketiga lensa itu ke sembilan blok BMC (Desirability: CS, VP, CH, CR; Feasibility: KP, KA, KR; Viability: RS, C$) adalah konvensi Strategyzer, misalnya dalam Testing Business Ideas (Bland & Osterwalder, 2019) dan artikel Osterwalder (2017). Ini lensa risiko untuk merancang tes, bukan sekat yang saling meniadakan: harga atau saluran dapat menyentuh lebih dari satu lensa. Klik judul blok pada kanvas untuk melihat definisi, pertanyaan pemandu, dan contoh berlabel ilustrasi.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
          {Object.values(VALUE_LENSES).map((lens) => (
            <div key={lens.id} style={{ border: '1px solid var(--border-subtle)', borderTop: `3px solid ${lens.color}`, borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
              <strong style={{ display: 'block', color: lens.color, fontSize: '0.85rem', fontFamily: 'var(--font-heading)' }}>{lens.label}</strong>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.15rem 0 0.4rem' }}>{lens.en}</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55 }}>{lens.description}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem', marginTop: '0.85rem' }}>
          {Object.values(DFV_LENSES).map((lens) => (
            <div key={lens.id} style={{ border: '1px solid var(--border-subtle)', borderTop: `3px solid ${lens.color}`, borderRadius: 'var(--radius-md)', padding: '0.85rem', background: 'var(--ddk-light-gray)' }}>
              <strong style={{ display: 'block', color: lens.color, fontSize: '0.85rem', fontFamily: 'var(--font-heading)' }}>{lens.label}</strong>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0.15rem 0 0.4rem' }}>{lens.idLabel} · {lens.blocks}</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.55 }}>{lens.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedBlock && (
        <div className="card" style={{ background: 'var(--bg-surface)', borderLeft: '4px solid var(--ddk-primary-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>{selectedBlock.code}</span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>
                {selectedBlock.en} · {selectedBlock.idLabel}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              <LensBadge lens={selectedBlock.valueLens} kind="value" />
              <LensBadge lens={selectedBlock.dfvLens} kind="dfv" />
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.75rem' }}>{selectedBlock.definition}</p>
          {selectedBlock.questions && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.7rem' }}>
              <strong>Pertanyaan pemandu.</strong> {selectedBlock.questions}
            </p>
          )}
          <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.7rem' }}>
            <strong>{selectedBlock.exampleTitle}.</strong> {selectedBlock.example}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: '0.45rem' }}>{selectedBlock.extraExample}</p>
        </div>
      )}

      <div className="bmc-book-canvas" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          Tata letak sembilan blok mengikuti Business Model Generation: mitra, aktivitas, sumber daya, proposisi nilai, hubungan, saluran, dan segmen di baris atas; struktur biaya dan aliran pendapatan di baris bawah. Ikon orisinal DeKa.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem'
        }}>
          {renderBlock('keyPartners', '380px')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '380px' }}>
            {renderBlock('keyActivities', '182px')}
            {renderBlock('keyResources', '182px')}
          </div>
          {renderBlock('valuePropositions', '380px', true)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '380px' }}>
            {renderBlock('customerRelationships', '182px')}
            {renderBlock('channels', '182px')}
          </div>
          {renderBlock('customerSegments', '380px')}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          {renderBlock('costStructure', '220px')}
          {renderBlock('revenueStreams', '220px')}
        </div>
      </div>

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <BookOpen size={18} color="var(--ddk-primary-blue)" aria-hidden="true" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Panduan sembilan blok</h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
          Urutan di bawah mengikuti cara mengajarkan kanvas: mulai dari pelanggan, lalu tawaran, saluran, hubungan, pendapatan, baru sisi infrastruktur dan biaya. Contoh di seluruh blok memakai usaha yang sama, Kopi AJIB, agar hubungan antarblok terlihat utuh. Contoh Kopi AJIB diambil dari studi kasus pembelajaran kursus ini, bukan dari verifikasi independen atas perusahaan publik. Angka yang tidak ada di naskah kasus ditandai sebagai ilustrasi tambahan.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {BMC_BLOCKS.map((block) => {
            const open = openGuideKey === block.key;
            return (
              <div key={block.key} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenGuideKey(open ? null : block.key)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    padding: '0.8rem 1rem',
                    background: open ? 'var(--ddk-light-gray)' : 'var(--ddk-white)',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 800, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)', fontSize: '0.9rem' }}>
                    {block.code}. {block.en} · {block.idLabel}
                  </span>
                  <span style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    <LensBadge lens={block.valueLens} kind="value" />
                    <LensBadge lens={block.dfvLens} kind="dfv" />
                  </span>
                </button>
                {open && (
                  <div style={{ padding: '0 1rem 1rem', background: 'var(--ddk-light-gray)' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{block.definition}</p>
                    {block.questions && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.65rem' }}>
                        <strong>Pertanyaan pemandu.</strong> {block.questions}
                      </p>
                    )}
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.65rem' }}>
                      <strong>{block.exampleTitle}.</strong> {block.example}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: '0.4rem' }}>{block.extraExample}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <TestingLab scope="bmc" bmcData={canvasData} />

      <div className="card" style={{ background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Quote size={18} color="var(--ddk-primary-blue)" aria-hidden="true" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Referensi</h2>
        </div>
        <ul style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {BMC_REFERENCES.map((ref) => (
            <li key={ref.citation} style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600 }}>{ref.citation}</span>
              <span style={{ display: 'block', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{ref.note}</span>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.9rem', lineHeight: 1.55 }}>
          Business Model Canvas adalah kerangka kerja Strategyzer (Osterwalder & Pigneur), digunakan di sini untuk tujuan pembelajaran dengan atribusi. Nomor halaman tidak dicantumkan karena berbeda antarcetakan.
        </p>
      </div>
    </div>
  );
}
