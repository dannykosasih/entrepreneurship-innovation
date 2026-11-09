import React, { useState, useEffect } from 'react';
import { COURSES } from '../data/coursesData';
import { 
  CheckCircle2, 
  Clock, 
  User, 
  HelpCircle, 
  Sparkles, 
  Lightbulb, 
  Target, 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  FileText, 
  Play, 
  Presentation, 
  Terminal 
} from 'lucide-react';

export function LearningMaterial({ 
  completedModules, 
  onToggleCompleteModule, 
  onJumpToQuiz, 
  userPersona,
  selectedCourseId: propCourseId,
  onSelectCourse: propSetCourseId
}) {
  const [internalCourseId, setInternalCourseId] = useState(COURSES[0].id);
  const selectedCourseId = propCourseId !== undefined ? propCourseId : internalCourseId;
  const setSelectedCourseId = propSetCourseId || setInternalCourseId;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideViewMode, setSlideViewMode] = useState('interactive'); // 'interactive' | 'gdrive'
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const currentCourse = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];
  const isCompleted = completedModules.includes(currentCourse.id);
  const slides = currentCourse.slides || [];

  // Reset slide index to 0 whenever user clicks a new course module
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedCourseId]);

  const handleNextSlide = () => {
    if (slides.length > 0 && currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const getDDKPersonaAdvice = () => {
    switch(userPersona) {
      case 'student':
        return "Student Masterclass: Pahami relasi teori Kuratko & Steve Blank dengan penyusunan Business Plan Ujian Tengah Semester & Akhir. Jangan membuat produk sebelum memvalidasi problem riil di lapangan!";
      case 'professional':
        return "Corporate Intrapreneur: Gunakan framework 4Ps Bessant & Tidd untuk mengajukan proposal inovasi ke Direksi tanpa birokrasi berbelit. Bawa data unit economics dan validasi awal.";
      case 'sme':
        return "Business Owner (UMKM): Terapkan efisiensi rantai pasok Kopi AJIB. Kurangi limbah bahan baku dan gunakan AI sederhana untuk automasi pencatatan stok dan penjadwalan tim.";
      case 'founder':
        return "Tech Startup Founder: Lakukan 'Get Out of the Building' Steve Blank dan Pretotyping Alberto Savoia. Hemat cash runway Anda dengan memvalidasi customer willingness to pay sebelum coding.";
      default:
        return "Inovasi adalah sistem berulang, bukan sekadar intuisi sesaat.";
    }
  };

  const getDannySignatureStory = (chNum) => {
    switch(chNum) {
      case "00":
        return {
          analogy: "Inovasi itu ibarat belajar naik sepeda: Anda tidak bisa hanya membaca buku manual tentang keseimbangan, Anda harus mengayuh, terjatuh, dan bangkit kembali.",
          story: "Jadi begini ceritanya: Banyak orang mengira entrepreneur adalah penjudi nekat. Padahal entrepreneur sejati adalah perencana risiko yang sangat teliti, yang menukar ketidakpastian menjadi eksperimen terukur.",
          punchline: "Dari cerita ini kita belajar bahwa: Entrepreneurial Self-Efficacy bukanlah bakat lahir, melainkan otot kognitif yang dilatih melalui pembuktian nyata."
        };
      case "01":
        return {
          analogy: "Entrepreneurship itu ibarat arus sungai deras: Incumbent yang diam akan tergerus batu karang, sementara inovator memanfaatkan arusnya untuk melaju lebih cepat.",
          story: "Jadi begini ceritanya: Schumpeter melihat bahwa ekonomi bertumbuh bukan karena pabrik lama memproduksi barang yang sama lebih banyak, melainkan karena ada inovator gila yang merobohkan model lama dengan cara baru.",
          punchline: "Dari cerita ini kita belajar bahwa: Creative Destruction adalah hukum alam bisnis. Anda berinovasi atau tergantikan."
        };
      case "02":
        return {
          analogy: "Inovasi itu ibarat meracik bumbu masakan nusantara: Anda tidak perlu menanam rempah baru di laboratorium sains, Anda cukup menggabungkan bahan yang tepat menjadi rasa spektakuler.",
          story: "Jadi begini ceritanya: Kopi susu kekinian tidak menciptakan biji kopi baru atau smartphone baru. Mereka melakukan Synthesis Innovation—mengawinkan resep gula aren lokal dengan aplikasi pemesanan digital dan cloud POS.",
          punchline: "Dari cerita ini kita belajar bahwa: Synthesis Innovation adalah jalan tol paling efisien bagi mahasiswa dan founder muda untuk mencetak bisnis miliaran rupiah."
        };
      case "03":
        return {
          analogy: "Mindset entrepreneur itu ibarat kacamata berfilter polarisasi: Di saat mata biasa silau oleh pantulan air dan mengira tidak ada apa-apa, kacamata ini menembus kedalaman air dan melihat kawanan ikan berenang.",
          story: "Jadi begini ceritanya: Dua orang sales sepatu dikirim ke sebuah pulau terpencil. Sales pertama mengirim pesan: 'Bencana, tidak ada peluang di sini, tak seorang pun memakai sepatu!' Sales kedua mengirim pesan: 'Peluang emas luar biasa! Pasar 100% terbuka, semua orang butuh sepatu!'",
          punchline: "Dari cerita ini kita belajar bahwa: Fakta lapangannya identik, namun cognitive framing yang berbeda menghasilkan tindakan yang berjarak 180 derajat."
        };
      case "04":
        return {
          analogy: "Customer Discovery itu ibarat memeriksa pasien: Dokter yang baik tidak langsung meresepkan obat keras sebelum mendengarkan keluhan spesifik pasien.",
          story: "Jadi begini ceritanya: Steve Blank menemukan bahwa 9 dari 10 startup bangkrut bukan karena produknya jelek secara teknis, melainkan karena founder jatuh cinta pada solusinya sendiri dan tidak pernah keluar gedung menemui pembeli riil.",
          punchline: "Dari cerita ini kita belajar bahwa: 'There are no facts inside your building'—fakta bisnis hanya ada di luar sana bersama calon konsumen yang merasakan sakitnya masalah tersebut."
        };
      case "05":
        return {
          analogy: "Design Thinking itu ibarat arsitek yang tinggal bersama penghuni rumah: Bukan merancang rumah megah menurut selera arsitek, melainkan mengamati bagaimana keluarga tersebut beraktivitas dari pagi hingga malam.",
          story: "Jadi begini ceritanya: IDEO mendesain sikat gigi untuk anak-anak. Semua pabrik berasumsi sikat gigi anak harus kecil dan ramping seperti orang dewasa. Namun saat observasi empati, mereka melihat anak-anak memegang sikat gigi dengan kepalan tangan penuh karena motorik halusnya belum matang.",
          punchline: "Dari cerita ini kita belajar bahwa: Solusi brilian sering kali berlawanan dengan asumsi logis di atas meja kerja. Observasi empati adalah kunci utama."
        };
      case "06":
        return {
          analogy: "Resource marshaling itu ibarat memasak jamuan makan malam besar: Anda tidak perlu membeli kebun sayur dan peternakan sapi sendiri, Anda cukup mengumpulkan bahan segar terbaik dari tetangga dan membagikan kelezatannya bersama.",
          story: "Jadi begini ceritanya: Banyak founder menunda memulai bisnis dengan alasan 'belum punya investor'. Padahal Airbnb didirikan bermodalkan kasur angin sewaan di ruang tamu mereka sendiri saat konferensi desain.",
          punchline: "Dari cerita ini kita belajar bahwa: Kurangnya modal uang bukanlah hambatan, melainkan pemicu kreativitas untuk menemukan modal relasi dan eksekusi."
        };
      case "07":
        return {
          analogy: "Market sizing itu ibarat memancing: Anda harus tahu berapa luas danaunya, berapa banyak ikan yang makan umpan Anda, dan berapa kapasitas perahu Anda.",
          story: "Jadi begini ceritanya: Investor tertawa jika founder mengatakan 'Pasar kopi global $400B, kami hanya butuh 1%'. Pendekatan bottom-up menghitung unit riil adalah satu-satunya cara yang kredibel.",
          punchline: "Dari cerita ini kita belajar bahwa: Hitung TAM dari bawah ke atas: Unit Pembeli × Harga per Unit × Jangkauan Distribusi."
        };
      case "08":
        return {
          analogy: "MVP itu ibarat membuat skateboard, bukan membuat satu roda mobil: Skateboard sudah bisa digunakan untuk meluncur dari titik A ke titik B dan memberi pengalaman bergerak, sementara satu roda mobil tidak bisa dinaiki sama sekali.",
          story: "Jadi begini ceritanya: Dropbox tidak mulai dengan membangun infrastruktur cloud server jutaan dolar. Drew Houston hanya membuat video demo 3 menit yang memperlihatkan cara kerja sinkronisasi file, dan besok paginya waiting list mereka meledak dari 5.000 menjadi 75.000 pengguna.",
          punchline: "Dari cerita ini kita belajar bahwa: Fokus MVP bukan seberapa canggih kodenya, melainkan seberapa cepat Anda membuktikan bahwa pengguna rela mengubah kebiasaan lamanya."
        };
      case "09":
        return {
          analogy: "Scaling bisnis itu ibarat menerbangkan pesawat melintasi badai: Jika pondasi sayap dan mesin (unit economics) Anda rapuh, semakin kencang Anda memacu mesin, pesawat akan semakin cepat hancur di udara.",
          story: "Jadi begini ceritanya: Banyak startup membakar uang miliaran untuk diskon dan iklan demi mengejar pertumbuhan pengguna 10x lipat. Ketika subsidi dicabut, pengguna pergi seketika karena tidak ada produk yang benar-benar mereka cintai.",
          punchline: "Dari cerita ini kita belajar bahwa: Pertumbuhan sejati tidak didorong oleh diskon agresif, melainkan oleh repeat order organik dari konsumen yang merasa terbantu."
        };
      case "10":
        return {
          analogy: "Cash flow itu ibarat oksigen bagi penyelam laut dalam: Anda bisa memiliki rencana hebat di dasar laut, tetapi jika tabung oksigen habis, permainan selesai.",
          story: "Jadi begini ceritanya: Startup bisa tumbuh omzet ratusan persen sambil berjalan menuju kebangkrutan jika biaya mendapatkan pelanggan lebih besar daripada uang yang mereka kembalikan.",
          punchline: "Dari cerita ini kita belajar bahwa: Rasio CLV:CAC wajib >= 3.0x dengan periode pengembalian modal di bawah 12 bulan."
        };
      case "11":
        return {
          analogy: "Operasional AI itu ibarat sistem saraf pusat: Setiap pesanan di kasir langsung mengirim sinyal ke gudang dan roastery secara otomatis tanpa menunggu laporan akhir bulan.",
          story: "Jadi begini ceritanya: Kopi AJIB berhasil membalikkan rugi operasional Rp 77 miliar menjadi laba Rp 78 miliar karena AI memprediksi permintaan per gerai per jam, memangkas susu basi dari 9.5% menjadi 3.8%.",
          punchline: "Dari cerita ini kita belajar bahwa: Sinkronisasi data real-time adalah parit pertahanan yang tidak bisa ditiru oleh kafe konvensional."
        };
      case "12":
        return {
          analogy: "Mengelola inovasi di korporasi itu ibarat bermain tenis ganda: Satu pemain menjaga baseline pertahanan dengan kokoh (bisnis inti), sementara pemain lainnya menyergap bola di depan net untuk mencetak skor kemenangan (inovasi baru).",
          story: "Jadi begini ceritanya: Kodak sesungguhnya adalah penemu kamera digital pertama di dunia pada tahun 1975. Namun karena takut bisnis film analognya tergerus, manajemen mengunci inovasi tersebut di laci hingga akhirnya bangkrut ditelan era digital.",
          punchline: "Dari cerita ini kita belajar bahwa: Jangan takut mengkanibalisasi produk Anda sendiri dengan inovasi baru, karena jika Anda tidak melakukannya, orang lain yang akan memakannya."
        };
      case "13":
        return {
          analogy: "Business Model Canvas itu ibarat cetak biru arsitektur rumah: Satu lembar rencana yang memperlihatkan bagaimana tiang penyangga, pintu masuk, pipa air, dan atap saling menyatu menjadi tempat tinggal yang kokoh.",
          story: "Jadi begini ceritanya: Nespresso bukan menjual mesin kopi murah, melainkan membangun ekosistem kapsul kopi premium dengan margin 85% berlangganan bulanan—mengubah transaksi sekali beli menjadi recurring revenue seumur hidup.",
          punchline: "Dari cerita ini kita belajar bahwa: Produk hebat dengan model bisnis yang buruk akan kalah dari produk biasa dengan model bisnis yang superior."
        };
      case "14":
        return {
          analogy: "Pitch deck itu ibarat trailer film layar lebar: Tujuannya bukan menceritakan seluruh naskah dari detik pertama sampai akhir, melainkan membuat investor terpikat dan ingin membeli tiket untuk masuk ke ruang rapat due diligence.",
          story: "Jadi begini ceritanya: Dalam pitching 5 menit di hadapan dewan investor, 80% slide teknis yang rumit akan diabaikan. Investor hanya peduli pada tiga hal: Seberapa besar problemnya, seberapa lapar pasarnya, dan mengapa tim Anda adalah orang yang tepat mengeksekusinya.",
          punchline: "Dari cerita ini kita belajar bahwa: Investor tidak berinvestasi pada ide yang sempurna, melainkan pada founder tangguh yang mampu belajar dan mengeksekusi dengan kecepatan tinggi."
        };
      default:
        return {
          analogy: "Inovasi itu ibarat menyalakan lentera di kegelapan: Setiap eksperimen kecil memberi cahaya untuk langkah strategis berikutnya.",
          story: "Jadi begini ceritanya: Eksekusi yang teruji secara data selalu mengalahkan rencana teoretis 100 halaman yang tidak pernah diuji ke pasar.",
          punchline: "Dari cerita ini kita belajar bahwa: Validasi mendahului skala, dan unit economics yang sehat adalah napas sejati bisnis."
        };
    }
  };

  const dannyStory = getDannySignatureStory(currentCourse.number);
  const activeSlide = slides[currentSlideIndex] || slides[0] || {
    number: 1,
    title: currentCourse.title,
    tag: "PRESENTATION SLIDE",
    points: currentCourse.objectives || ["Comprehensive slide deck for this chapter."],
    speakerNotes: "Silakan gunakan deck presentasi ini sebagai panduan inti materi perkuliahan.",
    highlight: currentCourse.keyTakeaways?.[0] || "Dharma Korporasi Academic Standard"
  };

  const ddkPrompt = `Bertindaklah sebagai mentor bisnis & inovasi senior (Danny Kosasih Style). Saya sedang mempelajari "${currentCourse.title}". Berikan saya 3 pertanyaan kritis dan 1 kerangka validasi praktis untuk menguji model bisnis ventura saya.`;

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(ddkPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
      {/* Chapter Sidebar */}
      <div style={{
        width: '320px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
        paddingRight: '0.5rem'
      }}>
        <div style={{ 
          fontSize: '0.8rem', 
          fontWeight: 800, 
          color: 'var(--ddk-primary-blue)', 
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '0.25rem',
          fontFamily: 'var(--font-heading)'
        }}>
          DDK Course Modules ({COURSES.length})
        </div>

        {COURSES.map((course) => {
          const active = course.id === selectedCourseId;
          const done = completedModules.includes(course.id);
          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: active ? 'var(--ddk-white)' : 'var(--ddk-light-gray)',
                border: active ? '2px solid var(--ddk-primary-blue)' : '1px solid var(--border-subtle)',
                boxShadow: active ? '0 4px 12px rgba(12, 79, 142, 0.15)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: active ? 'var(--ddk-primary-blue)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    CH {course.number}
                  </span>
                  <span className="badge badge-gold" style={{ fontSize: '0.625rem', padding: '0.1rem 0.4rem' }}>
                    {course.level}
                  </span>
                </div>
                <div style={{ 
                  fontWeight: active ? 700 : 600, 
                  fontSize: '0.875rem',
                  color: active ? 'var(--ddk-dark)' : 'var(--text-body)',
                  lineHeight: 1.3,
                  fontFamily: 'var(--font-heading)'
                }}>
                  {course.title}
                </div>
              </div>
              <div style={{ flexShrink: 0, marginTop: '3px' }}>
                {done ? (
                  <CheckCircle2 size={16} color="var(--ddk-primary-blue)" />
                ) : (
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--ddk-mid-gray)'
                  }} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Module Header Card */}
        <div className="card" style={{ background: 'var(--ddk-white)', borderTop: '4px solid var(--ddk-primary-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: 'var(--ddk-white)',
                  background: 'var(--ddk-dark)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}>
                  CHAPTER {currentCourse.number}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <Clock size={14} color="var(--ddk-primary-blue)" /> {currentCourse.duration}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--ddk-dark)', fontWeight: 600 }}>
                  <User size={14} color="var(--ddk-primary-blue)" /> {currentCourse.faculty}
                </span>
              </div>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--ddk-dark)', marginBottom: '0.25rem' }}>
                {currentCourse.title}
              </h1>
              <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {currentCourse.subtitle}
              </div>
            </div>

            {/* DDK Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
              <button
                onClick={() => onToggleCompleteModule(currentCourse.id)}
                className={`btn ${isCompleted ? 'btn-outline' : 'btn-primary'}`}
                style={{ fontSize: '0.85rem' }}
              >
                <CheckCircle2 size={16} />
                {isCompleted ? 'Completed ✓' : 'Mark Completed'}
              </button>
              <button
                onClick={() => onJumpToQuiz(currentCourse.id)}
                className="btn btn-gold"
                style={{ fontSize: '0.85rem' }}
              >
                <HelpCircle size={16} /> Chapter Quiz
              </button>
            </div>
          </div>

          {/* DDK Persona Lens Box */}
          <div style={{
            background: 'var(--ddk-blue-subtle)',
            borderLeft: '4px solid var(--ddk-primary-blue)',
            padding: '0.85rem 1.25rem',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            fontSize: '0.875rem',
            color: 'var(--ddk-dark)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '1.25rem'
          }}>
            <Lightbulb size={20} color="var(--ddk-gold)" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontFamily: 'var(--font-heading)' }}>DDK Perspective Guide:</strong> {getDDKPersonaAdvice()}
            </div>
          </div>
        </div>

        {/* 🎬 DEDICATED SLIDES PRESENTATION VIEWER (DISPLAYED ON EVERY MODULE CLICK) */}
        <div className="card" style={{ 
          background: 'var(--ddk-white)', 
          border: '2px solid var(--ddk-primary-blue)',
          padding: 0,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Deck Header & Control Bar */}
          <div style={{
            background: 'var(--ddk-dark)',
            color: 'white',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                background: 'var(--ddk-gold)',
                color: 'var(--ddk-dark-deep)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontWeight: 900,
                fontSize: '0.75rem',
                fontFamily: 'var(--font-heading)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Presentation size={14} /> SLIDE DECK
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}>
                {currentCourse.deckTitle || `Chapter ${currentCourse.number} Presentation`}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Mode Toggle Buttons */}
              <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '2px' }}>
                <button
                  onClick={() => setSlideViewMode('interactive')}
                  style={{
                    padding: '0.3rem 0.7rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    background: slideViewMode === 'interactive' ? 'var(--ddk-gold)' : 'transparent',
                    color: slideViewMode === 'interactive' ? '#061E38' : 'white'
                  }}
                >
                  Interactive Player
                </button>
                <button
                  onClick={() => setSlideViewMode('gdrive')}
                  style={{
                    padding: '0.3rem 0.7rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    background: slideViewMode === 'gdrive' ? 'var(--ddk-gold)' : 'transparent',
                    color: slideViewMode === 'gdrive' ? '#061E38' : 'white'
                  }}
                >
                  Google Drive Embed
                </button>
              </div>

              {/* External GDrive Link */}
              {currentCourse.driveFileId && (
                <a
                  href={`https://drive.google.com/file/d/${currentCourse.driveFileId}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600
                  }}
                >
                  <ExternalLink size={12} /> Drive Deck
                </a>
              )}
            </div>
          </div>

          {/* Slide Body */}
          {slideViewMode === 'interactive' ? (
            <div>
              {/* Slide Canvas Area */}
              <div style={{
                background: 'linear-gradient(135deg, #061E38 0%, #0C4F8E 70%, #155E9C 100%)',
                color: 'white',
                padding: '2.5rem',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}>
                {/* Slide Header */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: 'var(--ddk-gold)',
                      textTransform: 'uppercase'
                    }}>
                      {activeSlide.tag}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(255,255,255,0.15)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      color: 'white'
                    }}>
                      Slide {currentSlideIndex + 1} of {slides.length}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                    color: 'white',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                    marginBottom: '1.25rem'
                  }}>
                    {activeSlide.title}
                  </h3>

                  {/* Bullet Points */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '850px' }}>
                    {activeSlide.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.95rem', color: '#E2E8F0' }}>
                        <span style={{ color: 'var(--ddk-gold)', fontSize: '1.1rem', lineHeight: 1 }}>▸</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide Highlight Banner */}
                {activeSlide.highlight && (
                  <div style={{
                    marginTop: '2rem',
                    background: 'rgba(245, 200, 66, 0.12)',
                    borderLeft: '4px solid var(--ddk-gold)',
                    padding: '0.6rem 1rem',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '0.85rem',
                    color: '#FDE68A',
                    fontWeight: 600,
                    fontFamily: 'var(--font-heading)'
                  }}>
                    💡 {activeSlide.highlight}
                  </div>
                )}
              </div>

              {/* Speaker Notes & Bottom Navigation Bar */}
              <div style={{
                background: 'var(--ddk-light-gray)',
                borderTop: '1px solid var(--border-subtle)',
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--ddk-primary-blue)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                    Danny Kosasih's Speaker Notes:
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', fontStyle: 'italic', marginTop: '0.15rem' }}>
                    "{activeSlide.speakerNotes}"
                  </div>
                </div>

                {/* Slide Nav Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={handlePrevSlide}
                    disabled={currentSlideIndex === 0}
                    className="btn btn-outline"
                    style={{
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem',
                      opacity: currentSlideIndex === 0 ? 0.4 : 1,
                      cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <ChevronLeft size={16} /> Prev Slide
                  </button>

                  <div style={{ display: 'flex', gap: '0.3rem', padding: '0 0.5rem' }}>
                    {slides.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        onClick={() => setCurrentSlideIndex(dotIdx)}
                        style={{
                          width: dotIdx === currentSlideIndex ? '20px' : '8px',
                          height: '8px',
                          borderRadius: '999px',
                          background: dotIdx === currentSlideIndex ? 'var(--ddk-primary-blue)' : 'var(--ddk-mid-gray)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        title={`Slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextSlide}
                    disabled={currentSlideIndex === slides.length - 1}
                    className="btn btn-primary"
                    style={{
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem',
                      opacity: currentSlideIndex === slides.length - 1 ? 0.4 : 1,
                      cursor: currentSlideIndex === slides.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next Slide <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Live Google Drive Embed Mode */
            <div style={{ width: '100%', height: '480px', background: '#0F172A' }}>
              <iframe
                src={`https://drive.google.com/file/d/${currentCourse.driveFileId}/preview`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title={currentCourse.title}
                allow="autoplay"
              />
            </div>
          )}
        </div>

        {/* Danny Kosasih Signature Storytelling Box */}
        <div className="ddk-quote-box">
          <div className="ddk-quote-title">
            <Sparkles size={18} color="var(--ddk-gold)" /> Danny Kosasih's Signature Story & Hook:
          </div>
          <div style={{ fontWeight: 700, color: 'var(--ddk-dark)', marginBottom: '0.35rem', fontSize: '0.95rem' }}>
            "{dannyStory.analogy}"
          </div>
          <div className="ddk-quote-text" style={{ marginBottom: '0.5rem' }}>
            {dannyStory.story}
          </div>
          <div style={{
            background: 'var(--ddk-white)',
            border: '1px solid var(--ddk-mid-gray)',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            color: 'var(--ddk-dark)',
            fontWeight: 600
          }}>
            {dannyStory.punchline}
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="card" style={{ background: 'var(--ddk-white)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Target size={18} color="var(--ddk-primary-blue)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ddk-dark)' }}>
              Core Learning Objectives
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {currentCourse.objectives.map((obj, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-body)',
                  background: 'var(--ddk-light-gray)',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <span style={{ 
                  fontWeight: 800, 
                  color: 'var(--ddk-primary-blue)', 
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem' 
                }}>
                  0{idx + 1}.
                </span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Core Sections */}
        {currentCourse.sections.map((section, sIdx) => (
          <div key={sIdx} className="card" style={{ background: 'var(--ddk-white)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.85rem', color: 'var(--ddk-dark)' }}>
              {section.heading}
            </h3>
            <div style={{ 
              whiteSpace: 'pre-line', 
              fontSize: '0.95rem', 
              lineHeight: 1.7, 
              color: 'var(--text-body)' 
            }}>
              {section.content}
            </div>
          </div>
        ))}

        {/* DeKa AI Prompt Coach Card */}
        <div className="card" style={{ background: '#07223F', color: 'white', border: '1px solid #1C6FB8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={18} color="var(--ddk-gold)" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--ddk-gold)' }}>
                DeKa AI Prompt Coach: Chapter Diagnostic Prompt
              </span>
            </div>
            <button
              onClick={copyPromptToClipboard}
              style={{
                background: 'rgba(245, 200, 66, 0.2)',
                color: 'var(--ddk-gold)',
                border: '1px solid var(--ddk-gold)',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700
              }}
            >
              {copiedPrompt ? <Check size={13} /> : <Copy size={13} />}
              {copiedPrompt ? 'Prompt Copied!' : 'Copy Prompt'}
            </button>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#B8C7D9', marginBottom: '0.5rem' }}>
            Gunakan prompt resmi ini di ChatGPT, Claude, atau Gemini untuk menguji kesiapan konsep bisnis Anda sesuai standar DDK:
          </p>
          <div style={{
            background: '#041426',
            border: '1px solid #14487A',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#E2E8F0',
            lineHeight: 1.5
          }}>
            {ddkPrompt}
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="card" style={{ 
          background: 'var(--ddk-light-gray)', 
          borderLeft: '5px solid var(--ddk-gold)' 
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--ddk-dark)' }}>
            DDK Strategic Takeaways & Synthesis
          </h3>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-body)', fontSize: '0.925rem' }}>
            {currentCourse.keyTakeaways.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
