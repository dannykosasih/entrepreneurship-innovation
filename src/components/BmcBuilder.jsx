import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Plus, 
  Trash2, 
  Download, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';

const PRESET_TEMPLATES = {
  kopiAjib: {
    name: "Kopi AJIB (DDK New Retail Benchmark)",
    canvas: {
      keyPartners: [
        "Koperasi Petani Aceh Gayo, Toraja & Kintamani",
        "Penyedia Cloud POS & Server AI Moka/Pawoon",
        "Armada Pengantaran Ojol (GoFood, GrabFood, ShopeeFood)",
        "Pengelola Gedung Perkantoran SCBD & Kampus"
      ],
      keyActivities: [
        "Penyangraian Terpusat & Kontrol Kualitas Standar",
        "Model Prediksi Permintaan AI & Restock Otomatis",
        "Pelatihan Cepat Barista & Layanan Cepat (< 180 dtk)",
        "Pengembangan Fitur Aplikasi Mobile & Loyalitas"
      ],
      keyResources: [
        "Algoritma AI Peramalan Permintaan Gerai",
        "812 Titik Gerai Grab-and-Go Nasional",
        "Kontrak Langsung Pasokan Biji Kopi Petani",
        "Jaringan Barista Terlatih Standar Nasional"
      ],
      valuePropositions: [
        "Kopi Susu Aren Espresso Berkualitas Kafe Rp 18.000",
        "Pesan Duluan via Aplikasi Tanpa Antre di Gerai",
        "Konsistensi Rasa Standar di Seluruh 812 Gerai",
        "Personalisasi Promo & Gamifikasi Poin Loyalitas"
      ],
      customerRelationships: [
        "Layanan Mandiri Otomatis via Aplikasi Mobile",
        "Program Loyalitas Bertingkat & Notifikasi Promo Cerdas",
        "Pelayanan Ramah & Cepat di Bar Gerai",
        "Pengembalian Dana / Pesanan Instan jika Rasa Tidak Pas"
      ],
      channels: [
        "Aplikasi Mobile Resmi Kopi AJIB (57% Transaksi)",
        "Gerai Compact Grab-and-Go di Lobi Kantor & Stasiun",
        "Kemitraan Marketplace Makanan Online",
        "Pesanan Rombongan Kantor & Katering Korporat"
      ],
      customerSegments: [
        "Profesional Muda Perkantoran Urban (42% Omzet)",
        "Mahasiswa Pencari Kafein Terjangkau & Tempat Nongkrong (28%)",
        "Pekerja Remote / WFA Butuh Kopi Harian (18%)",
        "Pembeli Musiman / Coba-coba karena Diskon (12%)"
      ],
      costStructure: [
        "COGS Bahan Baku: Biji Kopi, Susu Segar, Gula Aren (46%)",
        "Gaji Barista & Insentif Performa Gerai Berbasis Data",
        "Sewa Gerai Compact 15-25 m² & Biaya Utilitas",
        "Biaya Server Cloud & Pemeliharaan Model AI",
        "Iklan Performa Digital & Promo Referral Aplikasi"
      ],
      revenueStreams: [
        "Penjualan Minuman Cangkir Harian (Signature Kopi Susu 46%)",
        "Minuman Botol 1 Liter Siap Minum & Kategori Non-Kopi",
        "Cross-sell Makanan Ringan, Roti & Pastry Pendamping",
        "Saldo Pre-paid & Voucher Pelanggan Korporat"
      ]
    }
  },
  edutech: {
    name: "AI Entrepreneurship LMS (EduTech)",
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

export function BmcBuilder() {
  const [activeTemplate, setActiveTemplate] = useState('kopiAjib');
  const [canvasData, setCanvasData] = useState(PRESET_TEMPLATES.kopiAjib.canvas);
  const [newItemText, setNewItemText] = useState({});

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
      setCanvasData({
        keyPartners: [],
        keyActivities: [],
        keyResources: [],
        valuePropositions: [],
        customerRelationships: [],
        channels: [],
        customerSegments: [],
        costStructure: [],
        revenueStreams: []
      });
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

  const renderBlock = (title, blockKey, minHeight = '240px', isSpecial = false) => {
    const items = canvasData[blockKey] || [];
    return (
      <div style={{
        background: isSpecial ? 'var(--ddk-gold-subtle)' : 'var(--ddk-white)',
        border: `1.5px solid ${isSpecial ? 'var(--ddk-gold)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.4rem'
        }}>
          <h4 style={{ 
            fontSize: '0.825rem', 
            fontWeight: 800, 
            color: 'var(--ddk-dark)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.04em',
            fontFamily: 'var(--font-heading)'
          }}>
            {title}
          </h4>
          <span className={`badge ${isSpecial ? 'badge-gold' : 'badge-blue'}`} style={{ fontSize: '0.625rem', padding: '0.1rem 0.4rem' }}>
            {items.length}
          </span>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem', overflowY: 'auto', maxHeight: '200px' }}>
          {items.map((item, idx) => (
            <div 
              key={idx}
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
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Input */}
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
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header & Controls */}
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
              DDK Strategic Canvas Tool
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--ddk-dark)' }}>
              Business Model Canvas (Alexander Osterwalder)
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
              Rancang, uji, dan sesuaikan 9 blok bangunan bisnis ventura Anda dengan standar pembelajaran DDK.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={handleExportJSON} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
              <Download size={14} /> Unduh Format JSON
            </button>
          </div>
        </div>

        {/* Template Selector & Health Score */}
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
              Kopi AJIB New Retail
            </button>
            <button
              onClick={() => handleLoadTemplate('edutech')}
              className={`btn ${activeTemplate === 'edutech' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            >
              EduTech AI LMS
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
              Kelengkapan Model:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: healthScore >= 80 ? 'var(--ddk-primary-blue)' : '#D97706', fontFamily: 'var(--font-heading)' }}>
                {healthScore}%
              </span>
              <span className={`badge ${healthScore >= 80 ? 'badge-gold' : 'badge-soft'}`}>
                {healthScore >= 80 ? 'Tervalidasi' : 'Perlu Diisi'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 9-Block Osterwalder Canvas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem'
        }}>
          {renderBlock("1. Key Partners", "keyPartners", "380px")}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '380px' }}>
            {renderBlock("2. Key Activities", "keyActivities", "182px")}
            {renderBlock("6. Key Resources", "keyResources", "182px")}
          </div>

          {renderBlock("3. Value Propositions", "valuePropositions", "380px", true)}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '380px' }}>
            {renderBlock("4. Customer Relationships", "customerRelationships", "182px")}
            {renderBlock("7. Channels", "channels", "182px")}
          </div>

          {renderBlock("5. Customer Segments", "customerSegments", "380px")}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          {renderBlock("8. Cost Structure", "costStructure", "220px")}
          {renderBlock("9. Revenue Streams", "revenueStreams", "220px")}
        </div>
      </div>
    </div>
  );
}
