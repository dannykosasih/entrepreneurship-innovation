import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync, existsSync } from 'node:fs';
import App from '../App';
import { COURSES } from '../data/coursesData';
import { QUIZZES } from '../data/quizzesData';
const nav = (group, name) => within(screen.getByRole('navigation', { name: group })).getByRole('button', { name, exact: true });

describe('Neon Nights LMS regression', () => {
  it('renders the neon design with real course content and pause control', async () => {
    const user=userEvent.setup();render(<App/>);
    expect(screen.getByRole('heading',{level:1})).toHaveTextContent(/From idea to\s*sustainable\s*business\./);
    expect(screen.getByRole('progressbar',{name:'Learning progress'})).toHaveAttribute('value','13');
    await user.click(screen.getByRole('button',{name:'Pause effects'}));
    expect(screen.getByRole('button',{name:'Resume effects'})).toHaveAttribute('aria-pressed','true');
    expect(document.querySelector('.neon-dashboard')).toHaveClass('motion-paused');
  });
  it('keeps saved localStorage progress across navigation and remount', async () => {
    localStorage.setItem('innoventures_completed_modules','[]');
    const user=userEvent.setup();const view=render(<App/>);
    await user.click(screen.getByRole('button',{name:'Continue learning'}));
    expect(screen.getByRole('heading',{level:1})).toHaveTextContent(COURSES[0].title);
    await user.click(screen.getByRole('button',{name:'Mark Completed'}));
    expect(JSON.parse(localStorage.getItem('innoventures_completed_modules'))).toEqual(['mod-0']);
    view.unmount();render(<App/>);
    expect(screen.getByRole('progressbar',{name:'Learning progress'})).toHaveAttribute('value','7');
  });
  it('opens selected chapters, preserves deck URL and jumps into chapter quizzes', async () => {
    const user=userEvent.setup();render(<App/>);
    await user.click(screen.getByRole('button',{name:`Open chapter 04: ${COURSES[4].title}`}));
    expect(screen.getByRole('heading',{level:1})).toHaveTextContent(COURSES[4].title);
    await user.click(screen.getByRole('button',{name:'Google Drive Embed'}));
    expect(document.querySelector('iframe')).toHaveAttribute('src',`https://drive.google.com/file/d/${COURSES[4].driveFileId}/preview`);
    await user.click(screen.getByRole('button',{name:'Chapter Quiz'}));
    expect(document.querySelector('.workspace-pane')).toBeInTheDocument();
    expect(screen.getByRole('button',{name:/submit/i})).toBeInTheDocument();
  });
  it('submits a quiz and persists the computed score', async () => {
    const user=userEvent.setup();render(<App/>);
    await user.click(nav('Learning space','Assignments'));
    for(const question of QUIZZES[0].questions) await user.click(screen.getByText(question.options[question.correctAnswer],{exact:true}));
    await user.click(screen.getByRole('button',{name:/submit/i}));
    expect(JSON.parse(localStorage.getItem('innoventures_quiz_scores'))['quiz-0']).toBe(100);
  });
  it('uses AA-readable foreground/background pairs on neon surfaces', () => {
    const luminance=hex=>{const rgb=hex.match(/../g).map(n=>parseInt(n,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
    for(const [fg,bg] of [['c4c1df','14134b'],['c1bdd9','171632'],['ffffff','202054'],['ffde59','14134b'],['c4c1df','3533ca'],['0068be','ffffff']]){
      const a=luminance(fg),b=luminance(bg);expect((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toBeGreaterThanOrEqual(4.5);
    }
  });
  it('runs simulator and saves its resulting score', async () => {
    const user=userEvent.setup();render(<App/>);
    await user.click(nav('Explore & tools','Startup simulator'));
    await user.click(screen.getByRole('button',{name:'Jalankan Simulasi & Hitung Performa DDK'}));
    const score=JSON.parse(localStorage.getItem('innoventures_simulator_score'));
    expect(typeof score).toBe('number');expect(score).toBeGreaterThanOrEqual(0);expect(score).toBeLessThanOrEqual(100);
  });
  it('keeps Business Model Canvas editing functional', async () => {
    const user=userEvent.setup();render(<App/>);
    await user.click(nav('Explore & tools','BMC Strategy Tool'));
    const inputs=screen.getAllByPlaceholderText('Tambah poin...');expect(inputs).toHaveLength(9);
    await user.type(inputs[0],'Regression canvas item{Enter}');
    expect(screen.getByText(/Regression canvas item/)).toBeInTheDocument();
  });
  it('keeps case study answers and completion action available', async () => {
    localStorage.setItem('innoventures_completed_cases','[]');
    const user=userEvent.setup();render(<App/>);
    await user.click(screen.getByRole('button',{name:'Explore case'}));
    const answers=screen.getAllByPlaceholderText('Tuliskan analisis kritis Anda di sini...');
    await user.type(answers[0],'Customer validation first');expect(answers[0]).toHaveValue('Customer validation first');
    const completion=screen.getByRole('button',{name:/mark|tandai|complete/i});await user.click(completion);
    expect(JSON.parse(localStorage.getItem('innoventures_completed_cases'))).toContain('case-kopi-ajib');
  });
  it('keeps mobile navigation, persona lens, wiki, resources, grades and credential available', async () => {
    const user=userEvent.setup();render(<App/>);
    // CSS controls viewport visibility; the button state is tested independently of a browser layout.
    const menu=screen.getByRole('button',{name:'Open navigation'});await user.click(menu);
    expect(screen.getByRole('button',{name:'Close navigation'})).toHaveAttribute('aria-expanded','true');
    await user.selectOptions(screen.getByLabelText('Learning lens'),'founder');expect(screen.getByLabelText('Learning lens')).toHaveValue('founder');
    await user.click(nav('Explore & tools','Knowledge wiki'));expect(screen.getByPlaceholderText('Cari konsep, rumus, nama ahli...')).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText('Cari konsep, rumus, nama ahli...'),'zzzznomatch');
    await user.click(nav('Explore & tools','Resources & Syllabus'));expect(screen.getByRole('heading',{level:1})).toBeInTheDocument();
    await user.click(nav('Learning space','Learning calendar & Grades'));expect(screen.getByRole('heading',{level:1})).toBeInTheDocument();
    await user.click(screen.getAllByRole('button',{name:'DDK Credential'})[0]);
    expect(screen.getByRole('dialog',{name:'DDK Credential preview'})).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Nama Penerima:'),{target:{value:'Test Learner'}});expect(screen.getByLabelText('Nama Penerima:')).toHaveValue('Test Learner');
    await user.click(screen.getByRole('button',{name:'Close certificate'}));expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('ships local fonts/photos, motion safeguards and unchanged curriculum and deploy files', () => {
    const css=readFileSync('src/neon.css','utf8');
    expect(css).toContain('prefers-reduced-motion:reduce');expect(css).toContain('.motion-paused');expect(css).toContain('@media(max-width:650px)');
    for(const asset of ['fonts/Poppins-Bold.ttf','fonts/Inter.ttf','fonts/IBMPlexMono-Regular.ttf','images/workshop.jpg','images/coffee.jpg']) expect(existsSync(`public/neon/${asset}`)).toBe(true);
    expect(COURSES).toHaveLength(15);expect(COURSES.every(c=>c.driveFileId&&c.slides.length)).toBe(true);
  });

  it('loads, persists and resets the Value Proposition Design matching tool', async () => {
    const user=userEvent.setup();render(<App/>);
    await user.click(nav('Explore & tools','VPD Proposisi Nilai'));
    expect(screen.getByRole('heading',{level:1})).toHaveTextContent(/Kanvas Proposisi Nilai/);
    await user.click(screen.getByRole('button',{name:'Muat contoh ilustrasi Kopi AJIB'}));
    expect(screen.getByDisplayValue(/Profesional muda perkantoran urban/)).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    const stored=JSON.parse(localStorage.getItem('innoventures_vpd_canvas'));
    expect(stored.jobs.length).toBe(4);
    expect(stored.links.length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button',{name:'Reset kanvas'}));
    expect(JSON.parse(localStorage.getItem('innoventures_vpd_canvas')).jobs).toEqual([]);
  });


  it('renders the book-shaped Value Proposition Canvas and keeps matching plus fit score', async () => {
    const user=userEvent.setup();render(<App/>);
    await user.click(nav('Explore & tools','VPD Proposisi Nilai'));
    expect(screen.getByRole('region',{name:'Peta Nilai (Value Map)'})).toBeInTheDocument();
    expect(screen.getByRole('region',{name:'Profil Pelanggan (Customer Profile)'})).toBeInTheDocument();
    expect(screen.getByRole('heading',{name:'Kanvas Proposisi Nilai, bentuk buku'})).toBeInTheDocument();
    await user.click(screen.getByRole('button',{name:'Muat contoh ilustrasi Kopi AJIB'}));
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByRole('button',{name:'Antre panjang di kafe pada jam berangkat kerja.'})).toBeInTheDocument();
    expect(screen.getByRole('button',{name:'Pesan duluan lewat aplikasi sehingga tidak perlu antre di gerai.'})).toBeInTheDocument();
  });

  it('saves interactive Test Cards from Cara Menguji on the VPD tool', async () => {
    const user=userEvent.setup();render(<App/>);
    await user.click(nav('Explore & tools','VPD Proposisi Nilai'));
    expect(screen.getByRole('heading',{name:'Cara Menguji'})).toBeInTheDocument();
    expect(screen.getByText(/Simple Landing Page/)).toBeInTheDocument();
    await user.click(screen.getByRole('button',{name:'Muat contoh Kartu Tes Kopi AJIB'}));
    expect(screen.getAllByText(/Tes antre dan pesan-ambil/).length).toBeGreaterThan(0);
    const stored=JSON.parse(localStorage.getItem('innoventures_testing_lab_vpd'));
    expect(stored.testCards.length).toBeGreaterThan(0);
    expect(stored.testCards[0].criteria).toMatch(/ilustrasi/i);
    await user.type(screen.getByLabelText('Kami percaya bahwa…'),'Hipotesis uji regresi');
    await user.click(screen.getByRole('button',{name:'Simpan Kartu Tes'}));
    expect(JSON.parse(localStorage.getItem('innoventures_testing_lab_vpd')).testCards.some((card)=>card.hypothesis==='Hipotesis uji regresi')).toBe(true);
  });

  it('adds Cara Menguji and original block icons to the Business Model Canvas tool', async () => {
    const user=userEvent.setup();render(<App/>);
    await user.click(nav('Explore & tools','BMC Strategy Tool'));
    expect(screen.getByRole('heading',{name:'Cara Menguji'})).toBeInTheDocument();
    expect(screen.getByText(/Tata letak sembilan blok mengikuti Business Model Generation/)).toBeInTheDocument();
    await user.click(screen.getByRole('button',{name:'Muat contoh Kartu Tes Kopi AJIB'}));
    expect(JSON.parse(localStorage.getItem('innoventures_testing_lab_bmc')).testCards[0].lens).toBe('viability');
  });
});
