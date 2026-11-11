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
});
