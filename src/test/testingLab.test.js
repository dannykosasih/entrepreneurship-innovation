import { describe, it, expect } from 'vitest';
import {
  emptyLab,
  exampleLab,
  extractHypothesesFromBmc,
  extractHypothesesFromVpd,
  normalizeLab,
  rankAssumptions,
  riskLabel,
  riskScore,
} from '../lib/testingLab';
import { EXAMPLE_VPD_CANVAS } from '../data/vpdCanvasData';
import {
  CLASSIFICATION_NOTE,
  EXPERIMENT_TYPES,
  TESTING_REFERENCES,
} from '../data/testingLabData';

describe('risk scoring', () => {
  it('ranks important, low-evidence assumptions first', () => {
    const ranked = rankAssumptions([
      { id: 'a', text: 'Low risk', importance: 2, evidence: 5 },
      { id: 'b', text: 'Riskiest', importance: 5, evidence: 1 },
      { id: 'c', text: 'Medium', importance: 4, evidence: 3 },
    ]);
    expect(ranked.map((item) => item.id)).toEqual(['b', 'c', 'a']);
    expect(riskScore(5, 1)).toBe(25);
    expect(riskLabel(25)).toBe('paling berisiko');
    expect(riskLabel(4)).toBe('bukti sudah lebih kuat');
  });
});

describe('normalizeLab', () => {
  it('fills defaults and drops invalid records', () => {
    const lab = normalizeLab({
      assumptions: [{ text: 'Valid', lens: 'mystery', importance: 9, evidence: 0 }],
      testCards: [{ hypothesis: 'We believe', status: 'maybe' }, null],
      learningCards: [{ observed: 'Saw this', decision: 'fly' }],
      checklist: { 'sticky-is-hypothesis': true, ignored: true },
    });
    expect(lab.assumptions).toHaveLength(1);
    expect(lab.assumptions[0].lens).toBe('desirability');
    expect(lab.assumptions[0].importance).toBe(5);
    expect(lab.assumptions[0].evidence).toBe(1);
    expect(lab.testCards[0].status).toBe('planned');
    expect(lab.learningCards[0].decision).toBe('iterate');
    expect(lab.checklist['sticky-is-hypothesis']).toBe(true);
    expect(lab.checklist.ignored).toBeUndefined();
  });

  it('returns an empty lab for unusable input', () => {
    expect(emptyLab().testCards).toEqual([]);
    expect(normalizeLab(null).assumptions).toEqual([]);
  });
});

describe('hypothesis extraction', () => {
  it('turns VPD canvas items into desirability hypotheses', () => {
    const items = extractHypothesesFromVpd(EXAMPLE_VPD_CANVAS);
    expect(items.length).toBeGreaterThan(10);
    expect(items.every((item) => item.lens === 'desirability')).toBe(true);
    expect(items.some((item) => /Antre panjang/.test(item.text))).toBe(true);
    expect(items.some((item) => item.source === 'Pereda nyeri')).toBe(true);
  });

  it('maps BMC items to the block desirability, feasibility, or viability lens', () => {
    const items = extractHypothesesFromBmc({
      customerSegments: ['Kantoran urban'],
      keyActivities: ['Penyangraian terpusat'],
      revenueStreams: ['Penjualan cangkir harian'],
    });
    expect(items).toHaveLength(3);
    expect(items.find((item) => /Kantoran/.test(item.text)).lens).toBe('desirability');
    expect(items.find((item) => /Penyangraian/.test(item.text)).lens).toBe('feasibility');
    expect(items.find((item) => /Penjualan/.test(item.text)).lens).toBe('viability');
  });
});

describe('example content', () => {
  it('loads Kopi AJIB example cards for both tools', () => {
    const vpd = exampleLab('vpd');
    const bmc = exampleLab('bmc');
    expect(vpd.testCards[0].name).toMatch(/Kopi AJIB/);
    expect(vpd.testCards[0].criteria).toMatch(/ilustrasi/i);
    expect(vpd.learningCards[0].decision).toBe('iterate');
    expect(bmc.testCards[0].lens).toBe('viability');
    expect(bmc.assumptions.length).toBeGreaterThan(0);
  });

  it('includes 16 experiment types and the landing page / fake door classification note', () => {
    expect(EXPERIMENT_TYPES).toHaveLength(16);
    const landing = EXPERIMENT_TYPES.find((item) => item.id === 'landing');
    const fakeDoor = EXPERIMENT_TYPES.find((item) => item.id === 'fakedoor');
    expect(landing.group).toBe('validation');
    expect(landing.source).toMatch(/Validation/);
    expect(fakeDoor.group).toBe('discovery');
    expect(fakeDoor.source).toMatch(/Discovery/);
    expect(CLASSIFICATION_NOTE).toMatch(/Simple Landing Page/);
    expect(CLASSIFICATION_NOTE).toMatch(/Feature Stub/);
    expect(TESTING_REFERENCES.some((ref) => /Testing Business Ideas/.test(ref.citation))).toBe(true);
  });
});
