import { describe, it, expect } from 'vitest';
import {
  computeProblemSolutionFit,
  normalizeVpdCanvas,
  removeItemFromCanvas,
  toggleLink,
} from '../lib/vpdFit';
import { EXAMPLE_VPD_CANVAS, EMPTY_VPD_CANVAS } from '../data/vpdCanvasData';

describe('computeProblemSolutionFit', () => {
  it('returns 0 when the customer profile is empty', () => {
    const fit = computeProblemSolutionFit(EMPTY_VPD_CANVAS);
    expect(fit.score).toBe(0);
    expect(fit.hasCustomerItems).toBe(false);
    expect(fit.totals.unaddressed).toBe(0);
  });

  it('scores 0 when jobs exist but nothing is linked', () => {
    const fit = computeProblemSolutionFit({
      jobs: [{ id: 'j1', text: 'Get coffee', kind: 'functional' }],
      pains: [{ id: 'p1', text: 'Long queue' }],
      gains: [],
      products: [{ id: 'pr1', text: 'App' }],
      links: [],
    });
    expect(fit.score).toBe(0);
    expect(fit.categories.jobs.unaddressed).toHaveLength(1);
    expect(fit.categories.pains.unaddressed).toHaveLength(1);
    expect(fit.unused.products).toHaveLength(1);
  });

  it('averages only categories that contain customer items', () => {
    const fit = computeProblemSolutionFit({
      jobs: [
        { id: 'j1', text: 'Job one', kind: 'functional' },
        { id: 'j2', text: 'Job two', kind: 'social' },
      ],
      pains: [],
      gains: [],
      products: [{ id: 'pr1', text: 'Offer' }],
      links: [{ id: 'l1', kind: 'job-product', customerId: 'j1', valueId: 'pr1' }],
    });
    expect(fit.score).toBe(50);
    expect(fit.categories.jobs.covered).toBe(1);
    expect(fit.categories.jobs.unaddressed.map((item) => item.id)).toEqual(['j2']);
  });

  it('treats a customer item as addressed once at least one valid same-kind link exists', () => {
    const fit = computeProblemSolutionFit({
      jobs: [{ id: 'j1', text: 'Job', kind: 'functional' }],
      pains: [{ id: 'p1', text: 'Pain' }],
      gains: [{ id: 'g1', text: 'Gain' }],
      products: [{ id: 'pr1', text: 'P1' }, { id: 'pr2', text: 'P2' }],
      painRelievers: [{ id: 'r1', text: 'R1' }],
      gainCreators: [{ id: 'c1', text: 'C1' }],
      links: [
        { id: 'l1', kind: 'job-product', customerId: 'j1', valueId: 'pr1' },
        { id: 'l2', kind: 'job-product', customerId: 'j1', valueId: 'pr2' },
        { id: 'l3', kind: 'pain-reliever', customerId: 'p1', valueId: 'r1' },
        { id: 'l4', kind: 'gain-creator', customerId: 'g1', valueId: 'c1' },
      ],
    });
    expect(fit.score).toBe(100);
    expect(fit.totals.unaddressed).toBe(0);
    expect(fit.unused.products).toHaveLength(0);
  });

  it('ignores cross-kind or dangling links', () => {
    const fit = computeProblemSolutionFit({
      jobs: [{ id: 'j1', text: 'Job', kind: 'functional' }],
      pains: [{ id: 'p1', text: 'Pain' }],
      products: [{ id: 'pr1', text: 'Product' }],
      painRelievers: [{ id: 'r1', text: 'Reliever' }],
      links: [
        { id: 'bad-1', kind: 'job-product', customerId: 'j1', valueId: 'r1' },
        { id: 'bad-2', kind: 'pain-reliever', customerId: 'missing', valueId: 'r1' },
        { id: 'bad-3', kind: 'not-a-kind', customerId: 'j1', valueId: 'pr1' },
      ],
    });
    expect(fit.score).toBe(0);
    expect(fit.hasLinks).toBe(false);
    expect(fit.categories.jobs.unaddressed).toHaveLength(1);
  });

  it('scores the Kopi AJIB example as a complete on-paper fit', () => {
    const fit = computeProblemSolutionFit(EXAMPLE_VPD_CANVAS);
    expect(fit.hasCustomerItems).toBe(true);
    expect(fit.hasValueItems).toBe(true);
    expect(fit.score).toBe(100);
    expect(fit.totals.unaddressed).toBe(0);
    expect(fit.categories.jobs.covered).toBe(3);
    expect(fit.categories.pains.covered).toBe(4);
    expect(fit.categories.gains.covered).toBe(4);
  });
});

describe('canvas helpers', () => {
  it('normalizes missing arrays and job kinds', () => {
    const canvas = normalizeVpdCanvas({
      segmentName: 'Segmen uji',
      jobs: [{ text: 'Tanpa id', kind: 'mystery' }],
    });
    expect(canvas.segmentName).toBe('Segmen uji');
    expect(canvas.jobs).toHaveLength(1);
    expect(canvas.jobs[0].id).toBeTruthy();
    expect(canvas.jobs[0].kind).toBe('functional');
    expect(canvas.pains).toEqual([]);
    expect(canvas.links).toEqual([]);
  });

  it('toggles links on and off', () => {
    const added = toggleLink([], 'pain-reliever', 'p1', 'r1');
    expect(added).toHaveLength(1);
    expect(added[0]).toMatchObject({ kind: 'pain-reliever', customerId: 'p1', valueId: 'r1' });
    const removed = toggleLink(added, 'pain-reliever', 'p1', 'r1');
    expect(removed).toHaveLength(0);
  });

  it('removes an item and any links that pointed at it', () => {
    const next = removeItemFromCanvas({
      pains: [{ id: 'p1', text: 'Pain' }, { id: 'p2', text: 'Other' }],
      painRelievers: [{ id: 'r1', text: 'Reliever' }],
      links: [{ id: 'l1', kind: 'pain-reliever', customerId: 'p1', valueId: 'r1' }],
    }, 'pains', 'p1');
    expect(next.pains.map((item) => item.id)).toEqual(['p2']);
    expect(next.links).toEqual([]);
    expect(next.painRelievers).toHaveLength(1);
  });
});
