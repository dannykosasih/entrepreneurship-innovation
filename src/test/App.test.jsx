import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync, existsSync } from 'node:fs';
import App from '../App';
import { COURSES, getCourses } from '../data/coursesData';
import { getQuizzes } from '../data/quizzesData';
import { getCaseStudies } from '../data/caseStudiesData';
import { getKnowledgeBase } from '../data/knowledgeBaseData';
import { getSources } from '../data/sourcesData';

const nav = (group, name) => within(screen.getByRole('navigation', { name: group })).getByRole('button', { name, exact: true });

describe('Neon Nights LMS regression', () => {
  it('renders the neon design in Bahasa Indonesia by default with real course content and pause control', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Dari ide menuju\s*bisnis yang\s*berkelanjutan\./);
    expect(screen.getByRole('progressbar', { name: 'Progres belajar' })).toHaveAttribute('value', '13');
    await user.click(screen.getByRole('button', { name: 'Jeda efek' }));
    expect(screen.getByRole('button', { name: 'Lanjutkan efek' })).toHaveAttribute('aria-pressed', 'true');
    expect(document.querySelector('.neon-dashboard')).toHaveClass('motion-paused');
  });

  it('keeps saved localStorage progress across navigation and remount', async () => {
    localStorage.setItem('innoventures_completed_modules', '[]');
    const idCourses = getCourses('id');
    const user = userEvent.setup();
    const view = render(<App />);
    await user.click(screen.getByRole('button', { name: 'Lanjutkan belajar' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(idCourses[0].title);
    await user.click(screen.getByRole('button', { name: 'Tandai Selesai' }));
    expect(JSON.parse(localStorage.getItem('innoventures_completed_modules'))).toEqual(['mod-0']);
    view.unmount();
    render(<App />);
    expect(screen.getByRole('progressbar', { name: 'Progres belajar' })).toHaveAttribute('value', '7');
  });

  it('opens selected chapters, preserves deck URL and jumps into chapter quizzes', async () => {
    const idCourses = getCourses('id');
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: `Buka bab 04: ${idCourses[4].title}` }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(idCourses[4].title);
    await user.click(screen.getByRole('button', { name: 'Sematkan Google Drive' }));
    expect(document.querySelector('iframe')).toHaveAttribute('src', `https://drive.google.com/file/d/${idCourses[4].driveFileId}/preview`);
    await user.click(screen.getByRole('button', { name: 'Kuis Bab' }));
    expect(document.querySelector('.workspace-pane')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /kirim jawaban/i })).toBeInTheDocument();
  });

  it('submits a quiz and persists the computed score', async () => {
    const idQuizzes = getQuizzes('id');
    const user = userEvent.setup();
    render(<App />);
    await user.click(nav('Ruang belajar', 'Kuis & Tugas'));
    for (const question of idQuizzes[0].questions) {
      await user.click(screen.getByText(question.options[question.correctAnswer], { exact: true }));
    }
    await user.click(screen.getByRole('button', { name: /kirim jawaban/i }));
    expect(JSON.parse(localStorage.getItem('innoventures_quiz_scores'))['quiz-0']).toBe(100);
  });

  it('uses AA-readable foreground/background pairs on neon surfaces', () => {
    const luminance = (hex) => {
      const rgb = hex.match(/../g).map(n => parseInt(n, 16) / 255).map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    };
    for (const [fg, bg] of [['c4c1df', '14134b'], ['c1bdd9', '171632'], ['ffffff', '202054'], ['ffde59', '14134b'], ['c4c1df', '3533ca'], ['0068be', 'ffffff']]) {
      const a = luminance(fg), b = luminance(bg);
      expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('runs simulator and saves its resulting score', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(nav('Eksplorasi & alat', 'Simulator startup'));
    await user.click(screen.getByRole('button', { name: 'Jalankan Simulasi & Hitung Performa DDK' }));
    const score = JSON.parse(localStorage.getItem('innoventures_simulator_score'));
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('keeps Business Model Canvas editing functional', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(nav('Eksplorasi & alat', 'Alat Strategi BMC'));
    const inputs = screen.getAllByPlaceholderText('Tambah poin...');
    expect(inputs).toHaveLength(9);
    await user.type(inputs[0], 'Regression canvas item{Enter}');
    expect(screen.getByText(/Regression canvas item/)).toBeInTheDocument();
  });

  it('keeps case study answers and completion action available', async () => {
    localStorage.setItem('innoventures_completed_cases', '[]');
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Pelajari studi kasus' }));
    const answers = screen.getAllByPlaceholderText('Tuliskan analisis kritis Anda di sini...');
    await user.type(answers[0], 'Customer validation first');
    expect(answers[0]).toHaveValue('Customer validation first');
    const completion = screen.getByRole('button', { name: /tandai kasus selesai/i });
    await user.click(completion);
    expect(JSON.parse(localStorage.getItem('innoventures_completed_cases'))).toContain('case-kopi-ajib');
  });

  it('keeps mobile navigation, persona lens, wiki, resources, grades and credential available', async () => {
    const user = userEvent.setup();
    render(<App />);
    // CSS controls viewport visibility; the button state is tested independently of a browser layout.
    const menu = screen.getByRole('button', { name: 'Buka navigasi' });
    await user.click(menu);
    expect(screen.getByRole('button', { name: 'Tutup navigasi' })).toHaveAttribute('aria-expanded', 'true');
    await user.selectOptions(screen.getByLabelText('Lensa belajar'), 'founder');
    expect(screen.getByLabelText('Lensa belajar')).toHaveValue('founder');
    await user.click(nav('Eksplorasi & alat', 'Wiki pengetahuan'));
    expect(screen.getByPlaceholderText('Cari konsep, rumus, nama ahli...')).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText('Cari konsep, rumus, nama ahli...'), 'zzzznomatch');
    await user.click(nav('Eksplorasi & alat', 'Referensi & Silabus'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Literatur Pilihan & Referensi Pengajar');
    await user.click(nav('Ruang belajar', 'Kalender & Nilai'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Buku Nilai & Sertifikasi DDK');
    await user.click(screen.getAllByRole('button', { name: 'Sertifikat DDK' })[0]);
    expect(screen.getByRole('dialog', { name: 'Pratinjau Sertifikat DDK' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Nama Penerima:'), { target: { value: 'Test Learner' } });
    expect(screen.getByLabelText('Nama Penerima:')).toHaveValue('Test Learner');
    await user.click(screen.getByRole('button', { name: 'Tutup sertifikat' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('ships local fonts/photos, motion safeguards and full bilingual data parity', () => {
    const css = readFileSync('src/neon.css', 'utf8');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('.motion-paused');
    expect(css).toContain('@media(max-width:650px)');
    for (const asset of ['fonts/Poppins-Bold.ttf', 'fonts/Inter.ttf', 'fonts/IBMPlexMono-Regular.ttf', 'images/workshop.jpg', 'images/coffee.jpg']) {
      expect(existsSync(`public/neon/${asset}`)).toBe(true);
    }
    const idCourses = getCourses('id');
    const enCourses = getCourses('en');
    expect(COURSES).toHaveLength(15);
    expect(idCourses).toHaveLength(15);
    expect(enCourses).toHaveLength(15);
    expect(idCourses.every(c => c.driveFileId && c.slides.length)).toBe(true);
    expect(enCourses.every(c => c.driveFileId && c.slides.length)).toBe(true);
    expect(getCaseStudies('id')).toHaveLength(2);
    expect(getCaseStudies('en')).toHaveLength(2);
    expect(getQuizzes('id')).toHaveLength(6);
    expect(getQuizzes('en')).toHaveLength(6);
    expect(getKnowledgeBase('id')).toHaveLength(12);
    expect(getKnowledgeBase('en')).toHaveLength(12);
    expect(getSources('id')).toHaveLength(7);
    expect(getSources('en')).toHaveLength(7);
  });

  it('loads, persists and resets the Value Proposition Design matching tool', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(nav('Eksplorasi & alat', 'VPD Proposisi Nilai'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Kanvas Proposisi Nilai/);
    await user.click(screen.getByRole('button', { name: 'Muat contoh ilustrasi Kopi AJIB' }));
    expect(screen.getByDisplayValue(/Profesional muda perkantoran urban/)).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem('innoventures_vpd_canvas'));
    expect(stored.jobs.length).toBe(4);
    expect(stored.links.length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: 'Reset kanvas' }));
    expect(JSON.parse(localStorage.getItem('innoventures_vpd_canvas')).jobs).toEqual([]);
  });

  it('renders the book-shaped Value Proposition Canvas as a display of form inputs', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(nav('Eksplorasi & alat', 'VPD Proposisi Nilai'));
    expect(screen.getByRole('heading', { name: 'Isi kanvas lewat formulir' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Peta Nilai (Value Map)' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Profil Pelanggan (Customer Profile)' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kanvas Proposisi Nilai, bentuk buku' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Muat contoh ilustrasi Kopi AJIB' }));
    expect(screen.getByText('100%')).toBeInTheDocument();
    const profile = screen.getByRole('region', { name: 'Profil Pelanggan (Customer Profile)' });
    const valueMap = screen.getByRole('region', { name: 'Peta Nilai (Value Map)' });
    expect(profile).toHaveTextContent('Antre panjang di kafe pada jam berangkat kerja.');
    expect(valueMap).toHaveTextContent('Pesan duluan lewat aplikasi sehingga tidak perlu antre di gerai.');
    expect(profile.querySelector('.vpc-composer')).toBeNull();
    expect(valueMap.querySelector('.vpc-composer')).toBeNull();
    await user.type(screen.getByPlaceholderText('Contoh: mendapatkan kafein berkualitas sebelum rapat...'), 'Tes pekerjaan formulir');
    await user.click(screen.getByRole('button', { name: 'Tambah pekerjaan pelanggan' }));
    expect(profile).toHaveTextContent('Tes pekerjaan formulir');
    const stored = JSON.parse(localStorage.getItem('innoventures_vpd_canvas'));
    expect(stored.jobs.some((job) => job.text === 'Tes pekerjaan formulir')).toBe(true);
  });

  it('saves interactive Test Cards from Cara Menguji on the VPD tool', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(nav('Eksplorasi & alat', 'VPD Proposisi Nilai'));
    expect(screen.getByRole('heading', { name: 'Cara Menguji' })).toBeInTheDocument();
    expect(screen.getByText(/Simple Landing Page/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Muat contoh ilustrasi Kartu Tes Kopi AJIB' }));
    expect(screen.getAllByText(/Tes antre dan pesan-ambil/).length).toBeGreaterThan(0);
    const stored = JSON.parse(localStorage.getItem('innoventures_testing_lab_vpd'));
    expect(stored.testCards.length).toBeGreaterThan(0);
    expect(stored.testCards[0].criteria).toMatch(/ilustrasi/i);
    await user.type(screen.getByLabelText('Kami percaya bahwa…'), 'Hipotesis uji regresi');
    await user.click(screen.getByRole('button', { name: 'Simpan Kartu Tes' }));
    expect(JSON.parse(localStorage.getItem('innoventures_testing_lab_vpd')).testCards.some((card) => card.hypothesis === 'Hipotesis uji regresi')).toBe(true);
  });

  it('adds Cara Menguji and original block icons to the Business Model Canvas tool', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(nav('Eksplorasi & alat', 'Alat Strategi BMC'));
    expect(screen.getByRole('heading', { name: 'Cara Menguji' })).toBeInTheDocument();
    expect(screen.getByText(/Tata letak sembilan blok mengikuti Business Model Generation/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Muat contoh ilustrasi Kartu Tes Kopi AJIB' }));
    expect(JSON.parse(localStorage.getItem('innoventures_testing_lab_bmc')).testCards[0].lens).toBe('viability');
  });

  it('toggles every page, case study, course, quiz, wiki, source and modal between ID and EN with one click', async () => {
    const user = userEvent.setup();
    const view = render(<App />);

    const langGroup = screen.getByRole('group', { name: /Pilih bahasa|Language switch/i });
    const idBtn = within(langGroup).getByRole('button', { name: 'ID' });
    const enBtn = within(langGroup).getByRole('button', { name: 'EN' });
    expect(idBtn).toHaveAttribute('aria-pressed', 'true');
    expect(enBtn).toHaveAttribute('aria-pressed', 'false');
    expect(document.documentElement.lang).toBe('id');

    // Verify Case Studies in Bahasa Indonesia first (both Kopi AJIB & Synthetic Personas)
    await user.click(nav('Eksplorasi & alat', 'Studi kasus'));
    const idCases = getCaseStudies('id');
    const enCases = getCaseStudies('en');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(idCases[0].title);
    expect(screen.getAllByText(/Rp Miliar/).length).toBeGreaterThan(0);
    expect(screen.getByText(new RegExp(idCases[0].discussionQuestions[0].q.slice(0, 30)))).toBeInTheDocument();
    // Switch to second case in ID
    await user.click(screen.getByRole('button', { name: idCases[1].title.split(':')[0] }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(idCases[1].title);
    expect(screen.getByText(new RegExp(idCases[1].discussionQuestions[0].q.slice(0, 30)))).toBeInTheDocument();

    // One-click switch to English right on Case Studies!
    await user.click(enBtn);
    expect(enBtn).toHaveAttribute('aria-pressed', 'true');
    expect(idBtn).toHaveAttribute('aria-pressed', 'false');
    expect(localStorage.getItem('ddk_lms_lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');

    // Case Study 2 immediately updates to English
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(enCases[1].title);
    expect(screen.getByText(new RegExp(enCases[1].discussionQuestions[0].q.slice(0, 30)))).toBeInTheDocument();
    // Switch back to Case Study 1 in English
    await user.click(screen.getByRole('button', { name: enCases[0].title.split(':')[0] }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(enCases[0].title);
    expect(screen.getAllByText(/IDR Billion/).length).toBeGreaterThan(0);
    expect(screen.getAllByPlaceholderText('Write your critical analysis here...').length).toBeGreaterThan(0);

    // Dashboard & Sidebar localized in EN
    await user.click(nav('Learning space', 'My dashboard'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/From idea to\s*sustainable\s*business\./);
    expect(nav('Explore & tools', 'Value Proposition Design')).toBeInTheDocument();
    expect(screen.getByText('Match your Value Map with Jobs To Be Done')).toBeInTheDocument();

    // Learning Material (chapters, slides, speaker notes, objectives, DeKa prompt) in EN & ID
    await user.click(screen.getByRole('button', { name: 'Continue learning' }));
    const enCourses = getCourses('en');
    const idCourses = getCourses('id');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(enCourses[2].title);
    expect(screen.getByText(/Use this official prompt in ChatGPT, Claude, or Gemini/)).toBeInTheDocument();
    expect(screen.getByText(/Act as a senior business & innovation mentor/)).toBeInTheDocument();
    expect(screen.getByText('Core Learning Objectives')).toBeInTheDocument();
    await user.click(idBtn);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(idCourses[2].title);
    expect(screen.getByText('Tujuan Pembelajaran Inti')).toBeInTheDocument();
    await user.click(enBtn);

    // Quizzes in EN & ID
    await user.click(nav('Learning space', 'Assignments'));
    const enQuizzes = getQuizzes('en');
    const idQuizzes = getQuizzes('id');
    expect(screen.getByRole('heading', { level: 2, name: enQuizzes[0].title })).toBeInTheDocument();
    expect(screen.getByText(enQuizzes[0].questions[0].question)).toBeInTheDocument();
    await user.click(idBtn);
    expect(screen.getByRole('heading', { level: 2, name: idQuizzes[0].title })).toBeInTheDocument();
    expect(screen.getByText(idQuizzes[0].questions[0].question)).toBeInTheDocument();
    await user.click(enBtn);

    // Knowledge Hub in EN & ID
    await user.click(nav('Explore & tools', 'Knowledge wiki'));
    const enWiki = getKnowledgeBase('en');
    const idWiki = getKnowledgeBase('id');
    expect(screen.getByPlaceholderText('Search concepts, formulas, authors...')).toBeInTheDocument();
    expect(screen.getByText(enWiki[0].term)).toBeInTheDocument();
    expect(screen.getByText(enWiki[0].definition)).toBeInTheDocument();
    await user.click(idBtn);
    expect(screen.getByPlaceholderText('Cari konsep, rumus, nama ahli...')).toBeInTheDocument();
    expect(screen.getByText(idWiki[0].term)).toBeInTheDocument();
    expect(screen.getByText(idWiki[0].definition)).toBeInTheDocument();
    await user.click(enBtn);

    // Resources & Syllabus in EN & ID
    await user.click(nav('Explore & tools', 'Resources & Syllabus'));
    const enSources = getSources('en');
    const idSources = getSources('id');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Curated Literature & Faculty References');
    expect(screen.getByText(enSources[0].title)).toBeInTheDocument();
    await user.click(idBtn);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Literatur Pilihan & Referensi Pengajar');
    expect(screen.getByText(idSources[0].title)).toBeInTheDocument();
    await user.click(enBtn);

    // Startup Simulator in EN
    await user.click(nav('Explore & tools', 'Startup simulator'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Venture Strategy Simulator: The New Retail Journey');
    expect(screen.getByRole('button', { name: 'Run Simulation & Calculate DDK Performance' })).toBeInTheDocument();

    // BMC Builder + Testing Lab in EN
    await user.click(nav('Explore & tools', 'BMC Strategy Tool'));
    expect(screen.getAllByPlaceholderText('Add item...')).toHaveLength(9);
    expect(screen.getByRole('button', { name: /Download JSON/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How to Test' })).toBeInTheDocument();

    // VPD Builder + Book Canvas + Testing Lab in EN
    await user.click(nav('Explore & tools', 'Value Proposition Design'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^Value Proposition Canvas$/);
    expect(screen.getByRole('heading', { name: 'Fill in the canvas via form' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Value Map' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Customer Profile' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Load Kopi AJIB illustration' }));
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByLabelText('We believe that…')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Test Card' })).toBeInTheDocument();

    // Grades & Certificate Modal in EN
    await user.click(nav('Learning space', 'Learning calendar & Grades'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('DDK Gradebook & Certification');
    await user.click(screen.getAllByRole('button', { name: 'DDK Credential' })[0]);
    expect(screen.getByRole('dialog', { name: 'DDK Credential preview' })).toBeInTheDocument();
    expect(screen.getByText('CERTIFICATE OF COMPLETION')).toBeInTheDocument();
    expect(screen.getByLabelText('Recipient Name:')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close certificate' }));

    // Persists across remount & switches back to ID
    view.unmount();
    render(<App />);
    expect(document.documentElement.lang).toBe('en');
    expect(nav('Explore & tools', 'Value Proposition Design')).toBeInTheDocument();

    const remountedLangGroup = screen.getByRole('group', { name: /Pilih bahasa|Language switch/i });
    await user.click(within(remountedLangGroup).getByRole('button', { name: 'ID' }));
    expect(localStorage.getItem('ddk_lms_lang')).toBe('id');
    expect(document.documentElement.lang).toBe('id');
    expect(nav('Eksplorasi & alat', 'VPD Proposisi Nilai')).toBeInTheDocument();
  });
});
