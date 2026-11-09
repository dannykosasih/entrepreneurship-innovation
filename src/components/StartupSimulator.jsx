import React, { useState } from 'react';
import { 
  Rocket, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Cpu 
} from 'lucide-react';

export function StartupSimulator({ onSaveSimulatorScore, previousScore }) {
  const [ventureName, setVentureName] = useState('Nusa Innovate Retail');
  const [decisions, setDecisions] = useState({
    discovery: 'goob',
    pricing: 'sweet-spot',
    mvp: 'no-code',
    footprint: 'grab-go',
    capital: 'angel',
    aiAdoption: 'full-ai',
    marketing: 'app-referral'
  });
  const [simFinished, setSimFinished] = useState(false);

  // DDK Venture calculation engine
  const calculateVentureOutcome = () => {
    let cash = 1000;
    let outlets = 1;
    let customers = 500;
    let revenue = 30;
    let opex = 25;
    let cac = 35;
    let clv = 180;
    let score = 50;
    let feedback = [];

    // Round 1
    if (decisions.discovery === 'goob') {
      score += 15;
      customers += 1200;
      clv += 40;
      feedback.push("Validasi 'Get Out of the Building' Steve Blank memastikan problem-solution fit sejak awal dan menaikkan retensi.");
    } else if (decisions.discovery === 'synthetic-ai') {
      score += 10;
      cash -= 5;
      customers += 700;
      clv += 20;
      feedback.push("Synthetic AI Personas menemukan potensi friksi konsumen tanpa biaya riset besar.");
    } else {
      score -= 20;
      cash -= 100;
      clv -= 50;
      feedback.push("Melewatkan customer discovery menyebabkan pembengkakan biaya pengembangan fitur yang tidak dibutuhkan pembeli.");
    }

    if (decisions.pricing === 'sweet-spot') {
      score += 10;
      customers += 2500;
      revenue += 80;
      clv += 50;
    } else if (decisions.pricing === 'premium') {
      customers += 400;
      revenue += 45;
      clv += 70;
    } else {
      score -= 5;
      customers += 4000;
      revenue += 40;
      opex += 50;
      feedback.push("Harga jual terlalu rendah menggerus margin kotor di bawah batas sehat operasional.");
    }

    // Round 2
    if (decisions.mvp === 'no-code') {
      score += 10;
      cash -= 20;
      opex += 5;
    } else {
      score -= 10;
      cash -= 250;
      opex += 20;
      feedback.push("Membayar software agency pihak ketiga membakar 25% modal sebelum validasi pasar terbukti.");
    }

    if (decisions.footprint === 'grab-go') {
      score += 10;
      outlets += 4;
      cash -= 180;
      revenue += 140;
      opex += 80;
    } else {
      score -= 15;
      outlets += 2;
      cash -= 550;
      revenue += 110;
      opex += 160;
      feedback.push("Sewa gerai mewah di mall menyedot runway terlalu cepat.");
    }

    // Round 3
    if (decisions.capital === 'angel') {
      score += 10;
      cash += 500;
    } else if (decisions.capital === 'vc') {
      score += 15;
      cash += 2500;
      outlets += 8;
      revenue += 300;
      opex += 220;
    } else {
      score += 5;
    }

    // Round 4
    if (decisions.aiAdoption === 'full-ai') {
      score += 15;
      opex = opex * 0.78;
      clv += 60;
      feedback.push("Model prediksi AI memangkas limbah bahan baku hingga 55% seperti pada benchmark Kopi AJIB.");
    } else {
      opex = opex * 1.15;
      feedback.push("Manajemen stok manual menyebabkan stockouts berulang dan hilangnya potensi penjualan.");
    }

    if (decisions.marketing === 'app-referral') {
      score += 10;
      cac = 28;
      customers += 5500;
      revenue += 160;
    } else {
      score -= 10;
      cac = 90;
      cash -= 200;
      feedback.push("Iklan billboard konvensional menghasilkan impression tinggi tetapi konversi download rendah.");
    }

    const finalScore = Math.min(100, Math.max(30, score));
    const clvCacRatio = (clv / cac).toFixed(1);
    const monthlyNetCashFlow = revenue - opex;
    const runwayMonths = monthlyNetCashFlow >= 0 ? 'Indefinite (Profitable)' : Math.max(0, Math.floor(cash / Math.abs(monthlyNetCashFlow))) + ' Bulan';

    return {
      finalScore,
      cash: Math.max(0, cash),
      outlets,
      customers,
      revenue,
      opex,
      cac,
      clv,
      clvCacRatio,
      monthlyNetCashFlow,
      runwayMonths,
      feedback
    };
  };

  const handleFinishSimulation = () => {
    const outcome = calculateVentureOutcome();
    setSimFinished(true);
    onSaveSimulatorScore(outcome.finalScore);
  };

  const outcome = calculateVentureOutcome();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Simulation Header */}
      <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-primary-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
              DDK Venture Engine
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>
              Venture Strategy Simulator: The New Retail Journey
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
              Uji keputusan strategis Anda di 4 kuartal bisnis: Discovery, MVP, Struktur Modal, dan Automasi Operasional AI.
            </p>
          </div>
          {previousScore !== undefined && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>SKOR TERAKHIR</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--ddk-primary-blue)', fontFamily: 'var(--font-heading)' }}>
                {previousScore}/100
              </div>
            </div>
          )}
        </div>

        {/* Venture Name Customizer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>
            Nama Brand Ventura Anda:
          </label>
          <input 
            type="text" 
            value={ventureName}
            onChange={(e) => setVentureName(e.target.value)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--border-subtle)',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--ddk-dark)',
              fontFamily: 'var(--font-heading)',
              minWidth: '260px'
            }}
          />
        </div>
      </div>

      {!simFinished ? (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Left: Rounds Choices */}
          <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Round 1 */}
            <div className="card" style={{ borderLeft: '4px solid var(--ddk-dark)', background: 'var(--ddk-white)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-blue">Kuartal 1</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Discovery & Problem-Solution Fit</h3>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  1. Metode Riset Kebutuhan Konsumen
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {[
                    { id: 'goob', label: "Field GOOB (Steve Blank)", desc: "50 wawancara langsung calon pembeli di SCBD/Kampus" },
                    { id: 'synthetic-ai', label: "Synthetic AI Persona", desc: "Simulasi 100 persona LLM skeptis" },
                    { id: 'guess', label: "Langsung Coding Produk", desc: "Mengandalkan insting tanpa validasi" }
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setDecisions(d => ({ ...d, discovery: opt.id }))}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid',
                        borderColor: decisions.discovery === opt.id ? 'var(--ddk-primary-blue)' : 'var(--border-subtle)',
                        background: decisions.discovery === opt.id ? 'var(--ddk-blue-subtle)' : 'var(--ddk-light-gray)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{opt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  2. Pricing Strategy per Cangkir
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {[
                    { id: 'sweet-spot', label: "Rp 18.000 (Sweet Spot)", desc: "Pasar massal kelas menengah urban (Kopi AJIB model)" },
                    { id: 'premium', label: "Rp 45.000 (Artisanal)", desc: "Margin tinggi, volume cangkir harian rendah" },
                    { id: 'cheap', label: "Rp 7.000 (Budget)", desc: "Margin tipis, sangat rentan kenaikan harga susu" }
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setDecisions(d => ({ ...d, pricing: opt.id }))}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid',
                        borderColor: decisions.pricing === opt.id ? 'var(--ddk-primary-blue)' : 'var(--border-subtle)',
                        background: decisions.pricing === opt.id ? 'var(--ddk-blue-subtle)' : 'var(--ddk-light-gray)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{opt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Round 2 */}
            <div className="card" style={{ borderLeft: '4px solid var(--ddk-primary-blue)', background: 'var(--ddk-white)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-blue">Kuartal 2</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>MVP Architecture & Gerai</h3>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  3. Teknologi MVP
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {[
                    { id: 'no-code', label: "No-Code + Cloud POS", desc: "Biaya Rp 20 Juta, peluncuran cepat 2 minggu" },
                    { id: 'agency', label: "Custom App Agency", desc: "Biaya Rp 250 Juta, pengerjaan 5 bulan" }
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setDecisions(d => ({ ...d, mvp: opt.id }))}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid',
                        borderColor: decisions.mvp === opt.id ? 'var(--ddk-primary-blue)' : 'var(--border-subtle)',
                        background: decisions.mvp === opt.id ? 'var(--ddk-blue-subtle)' : 'var(--ddk-light-gray)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{opt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  4. Format Gerai Fisik
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {[
                    { id: 'grab-go', label: "Compact Grab-and-Go", desc: "15-20 m² di lobi perkantoran/kampus, sewa efisien" },
                    { id: 'dine-in', label: "Café Mewah di Mall", desc: "150 m² dengan sofa mewah, biaya sewa 5x lebih mahal" }
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setDecisions(d => ({ ...d, footprint: opt.id }))}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid',
                        borderColor: decisions.footprint === opt.id ? 'var(--ddk-primary-blue)' : 'var(--border-subtle)',
                        background: decisions.footprint === opt.id ? 'var(--ddk-blue-subtle)' : 'var(--ddk-light-gray)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{opt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Round 3 & 4 */}
            <div className="card" style={{ borderLeft: '4px solid var(--ddk-gold)', background: 'var(--ddk-white)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-gold">Kuartal 3 & 4</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ddk-dark)' }}>Modal & Automasi AI</h3>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  5. Sumber Permodalan
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {[
                    { id: 'bootstrapping', label: "Bootstrapping & Vendor Credit", desc: "Tanpa dilusi saham, mengandalkan arus kas" },
                    { id: 'angel', label: "Angel Investor (Rp 500M)", desc: "10% ekuitas, mendapat bimbingan mentor" },
                    { id: 'vc', label: "Seed Venture Capital (Rp 2.5B)", desc: "25% ekuitas, ekspansi agresif 10x" }
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setDecisions(d => ({ ...d, capital: opt.id }))}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid',
                        borderColor: decisions.capital === opt.id ? 'var(--ddk-primary-blue)' : 'var(--border-subtle)',
                        background: decisions.capital === opt.id ? 'var(--ddk-blue-subtle)' : 'var(--ddk-light-gray)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', fontFamily: 'var(--font-heading)' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{opt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                    6. Automasi Rantai Pasok AI
                  </div>
                  <select
                    value={decisions.aiAdoption}
                    onChange={(e) => setDecisions(d => ({ ...d, aiAdoption: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--ddk-dark)'
                    }}
                  >
                    <option value="full-ai">Model Prediksi Permintaan & Shift AI</option>
                    <option value="manual">Manual Spreadsheet Excel & Jadwal Statis</option>
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ddk-dark)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                    7. Kanal Akuisisi Pelanggan
                  </div>
                  <select
                    value={decisions.marketing}
                    onChange={(e) => setDecisions(d => ({ ...d, marketing: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--ddk-dark)'
                    }}
                  >
                    <option value="app-referral">Gamifikasi Referral Aplikasi & Komunitas</option>
                    <option value="billboard">Iklan Spanduk / Billboard Jalan Protokol</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Run Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                onClick={handleFinishSimulation}
                className="btn btn-gold"
                style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
              >
                <Rocket size={18} /> Jalankan Simulasi & Hitung Performa DDK
              </button>
            </div>
          </div>

          {/* Right: Live Telemetry */}
          <div style={{ width: '320px', flexShrink: 0 }}>
            <div className="card" style={{ position: 'sticky', top: '140px', background: 'var(--ddk-dark)', color: 'white', border: '1px solid var(--ddk-gold)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ddk-gold)' }}>
                <Activity size={18} /> Telemetri Bisnis Real-Time
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.825rem', color: '#B8C7D9' }}>Proyeksi Gerai</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{outcome.outlets} Gerai</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.825rem', color: '#B8C7D9' }}>Sisa Kas di Bank</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ddk-gold)', fontFamily: 'var(--font-heading)' }}>
                    Rp {outcome.cash.toLocaleString()} Juta
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.825rem', color: '#B8C7D9' }}>Pendapatan Bulanan</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Rp {outcome.revenue} Juta/bln</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.825rem', color: '#B8C7D9' }}>Rasio CLV : CAC</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--ddk-gold)', fontFamily: 'var(--font-heading)' }}>
                    {outcome.clvCacRatio}x
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.825rem', color: '#B8C7D9' }}>Cash Runway</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6FA3D9' }}>{outcome.runwayMonths}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '5px solid var(--ddk-gold)', textAlign: 'center', padding: '2.5rem' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--ddk-dark)',
              color: 'var(--ddk-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 4px 15px rgba(12, 79, 142, 0.25)'
            }}>
              <Award size={36} />
            </div>

            <span className="badge badge-gold">DDK Evaluation Complete</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--ddk-dark)', marginTop: '0.5rem' }}>
              {ventureName}
            </h2>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--ddk-primary-blue)', margin: '0.5rem 0', fontFamily: 'var(--font-heading)' }}>
              {outcome.finalScore}/100
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              {outcome.finalScore >= 85 
                ? "Luar biasa! Ventura Anda mencapai pertumbuhan eksponensial dengan unit economics yang sangat sehat (CLV:CAC > 5x) dan arus kas mandiri."
                : outcome.finalScore >= 70
                ? "Eksekusi yang solid! Anda mencapai traksi pasar yang stabil dan siap untuk putaran pendanaan selanjutnya."
                : "Ventura mengalami tekanan arus kas akibat biaya sewa atau kurangnya validasi awal. Coba lagi dengan strategi yang lebih lean!"}
            </p>

            <div style={{
              background: 'var(--ddk-blue-subtle)',
              border: '1.5px solid var(--ddk-primary-blue)',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--ddk-dark)',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <CheckCircle2 size={18} color="var(--ddk-primary-blue)" />
              <span>Skor tersimpan ke Buku Nilai DDK (Bobot 25% nilai akhir).</span>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                Catatan Debrief Mentor Danny Kosasih:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {outcome.feedback.map((fb, idx) => (
                  <div key={idx} style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--ddk-light-gray)',
                    borderLeft: '4px solid var(--ddk-primary-blue)',
                    fontSize: '0.875rem',
                    color: 'var(--text-body)'
                  }}>
                    {fb}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSimFinished(false)}
              className="btn btn-outline"
            >
              <RotateCcw size={16} /> Uji Keputusan Lainnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
