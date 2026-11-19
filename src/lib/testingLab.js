import { BMC_BLOCKS } from '../data/bmcBlocksData';
import {
  EXAMPLE_ASSUMPTIONS,
  EXAMPLE_LEARNING_CARDS,
  EXAMPLE_TEST_CARDS,
  TESTING_CHECKLIST,
  TESTING_STORAGE_KEYS,
} from '../data/testingLabData';
import {
  EXAMPLE_ASSUMPTIONS_EN,
  EXAMPLE_LEARNING_CARDS_EN,
  EXAMPLE_TEST_CARDS_EN,
} from '../data/testingLabData.en';
import { createItemId } from './vpdFit';

export function emptyLab() {
  return {
    version: 1,
    assumptions: [],
    testCards: [],
    learningCards: [],
    checklist: {},
  };
}

function clampScore(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 3;
  return Math.min(5, Math.max(1, Math.round(n)));
}

function normalizeAssumption(item, index = 0) {
  if (!item || typeof item.text !== 'string' || !item.text.trim()) return null;
  return {
    id: typeof item.id === 'string' && item.id ? item.id : createItemId(`assumption-${index}`),
    text: item.text,
    lens: ['desirability', 'feasibility', 'viability'].includes(item.lens) ? item.lens : 'desirability',
    source: typeof item.source === 'string' ? item.source : '',
    importance: clampScore(item.importance),
    evidence: clampScore(item.evidence),
  };
}

function normalizeTestCard(card, index = 0) {
  if (!card || typeof card !== 'object') return null;
  const status = ['planned', 'running', 'supported', 'not-supported', 'inconclusive'].includes(card.status)
    ? card.status
    : 'planned';
  return {
    id: typeof card.id === 'string' && card.id ? card.id : createItemId(`test-${index}`),
    name: typeof card.name === 'string' ? card.name : '',
    lens: ['desirability', 'feasibility', 'viability'].includes(card.lens) ? card.lens : 'desirability',
    hypothesis: typeof card.hypothesis === 'string' ? card.hypothesis : '',
    experiment: typeof card.experiment === 'string' ? card.experiment : '',
    metric: typeof card.metric === 'string' ? card.metric : '',
    criteria: typeof card.criteria === 'string' ? card.criteria : '',
    cost: typeof card.cost === 'string' ? card.cost : '',
    duration: typeof card.duration === 'string' ? card.duration : '',
    owner: typeof card.owner === 'string' ? card.owner : '',
    status,
  };
}

function normalizeLearningCard(card, index = 0) {
  if (!card || typeof card !== 'object') return null;
  return {
    id: typeof card.id === 'string' && card.id ? card.id : createItemId(`learn-${index}`),
    testCardId: typeof card.testCardId === 'string' ? card.testCardId : '',
    name: typeof card.name === 'string' ? card.name : '',
    believed: typeof card.believed === 'string' ? card.believed : '',
    observed: typeof card.observed === 'string' ? card.observed : '',
    learned: typeof card.learned === 'string' ? card.learned : '',
    decision: ['persevere', 'iterate', 'pivot', 'kill'].includes(card.decision) ? card.decision : 'iterate',
    decisionNote: typeof card.decisionNote === 'string' ? card.decisionNote : '',
  };
}

export function normalizeLab(raw) {
  const base = emptyLab();
  if (!raw || typeof raw !== 'object') return base;
  return {
    version: 1,
    assumptions: Array.isArray(raw.assumptions)
      ? raw.assumptions.map(normalizeAssumption).filter(Boolean)
      : [],
    testCards: Array.isArray(raw.testCards)
      ? raw.testCards.map(normalizeTestCard).filter(Boolean)
      : [],
    learningCards: Array.isArray(raw.learningCards)
      ? raw.learningCards.map(normalizeLearningCard).filter(Boolean)
      : [],
    checklist: raw.checklist && typeof raw.checklist === 'object'
      ? Object.fromEntries(
          TESTING_CHECKLIST.map((item) => [item.id, Boolean(raw.checklist[item.id])])
        )
      : {},
  };
}

/** Higher score = riskier (important, but little evidence). Range 1–25. */
export function riskScore(importance, evidence) {
  return clampScore(importance) * (6 - clampScore(evidence));
}

export function riskLabel(score, lang = 'id') {
  if (lang === 'en') {
    if (score >= 16) return 'riskiest';
    if (score >= 10) return 'test soon';
    return 'stronger evidence';
  }
  if (score >= 16) return 'paling berisiko';
  if (score >= 10) return 'perlu diuji segera';
  return 'bukti sudah lebih kuat';
}

export function rankAssumptions(items) {
  return [...items].sort((a, b) => {
    const diff = riskScore(b.importance, b.evidence) - riskScore(a.importance, a.evidence);
    if (diff !== 0) return diff;
    return (b.importance || 0) - (a.importance || 0);
  });
}

const VPD_SOURCES = [
  { key: 'jobs', source: 'Pekerjaan pelanggan', sourceEn: 'Customer jobs', lens: 'desirability', prefix: 'Pelanggan memiliki pekerjaan:', prefixEn: 'Customers have the job:' },
  { key: 'pains', source: 'Nyeri pelanggan', sourceEn: 'Customer pains', lens: 'desirability', prefix: 'Nyeri yang cukup penting untuk diatasi:', prefixEn: 'Pain important enough to solve:' },
  { key: 'gains', source: 'Manfaat pelanggan', sourceEn: 'Customer gains', lens: 'desirability', prefix: 'Manfaat yang diinginkan pelanggan:', prefixEn: 'Gain desired by customers:' },
  { key: 'products', source: 'Produk dan layanan', sourceEn: 'Products & services', lens: 'desirability', prefix: 'Produk atau layanan ini membantu menyelesaikan pekerjaan:', prefixEn: 'This product or service helps complete the job:' },
  { key: 'painRelievers', source: 'Pereda nyeri', sourceEn: 'Pain relievers', lens: 'desirability', prefix: 'Pereda ini benar-benar meredakan nyeri:', prefixEn: 'This reliever truly alleviates the pain:' },
  { key: 'gainCreators', source: 'Pencipta manfaat', sourceEn: 'Gain creators', lens: 'desirability', prefix: 'Pencipta manfaat ini benar-benar menghasilkan manfaat:', prefixEn: 'This gain creator truly produces the gain:' },
];

export function extractHypothesesFromVpd(canvas, lang = 'id') {
  if (!canvas || typeof canvas !== 'object') return [];
  const isEn = lang === 'en';
  const items = [];
  for (const field of VPD_SOURCES) {
    const list = Array.isArray(canvas[field.key]) ? canvas[field.key] : [];
    for (const entry of list) {
      if (!entry || typeof entry.text !== 'string' || !entry.text.trim()) continue;
      items.push({
        id: `extracted-${field.key}-${entry.id || items.length}`,
        text: `${isEn ? field.prefixEn : field.prefix} ${entry.text.trim()}`,
        lens: field.lens,
        source: isEn ? field.sourceEn : field.source,
        importance: 3,
        evidence: 1,
      });
    }
  }
  return items;
}

export function extractHypothesesFromBmc(canvasData, lang = 'id') {
  if (!canvasData || typeof canvasData !== 'object') return [];
  const isEn = lang === 'en';
  const items = [];
  for (const block of BMC_BLOCKS) {
    const list = Array.isArray(canvasData[block.key]) ? canvasData[block.key] : [];
    const label = isEn ? block.en : block.idLabel;
    for (const entry of list) {
      const text = typeof entry === 'string' ? entry : entry?.text;
      if (!text || !String(text).trim()) continue;
      items.push({
        id: `extracted-${block.key}-${items.length}`,
        text: `${label}: ${String(text).trim()}`,
        lens: block.dfvLens || 'desirability',
        source: label,
        importance: 3,
        evidence: 1,
      });
    }
  }
  return items;
}

export function exampleLab(scope, lang = 'id') {
  const key = scope === 'bmc' ? 'bmc' : 'vpd';
  const isEn = lang === 'en';
  return normalizeLab({
    assumptions: (isEn ? EXAMPLE_ASSUMPTIONS_EN : EXAMPLE_ASSUMPTIONS)[key],
    testCards: (isEn ? EXAMPLE_TEST_CARDS_EN : EXAMPLE_TEST_CARDS)[key],
    learningCards: (isEn ? EXAMPLE_LEARNING_CARDS_EN : EXAMPLE_LEARNING_CARDS)[key],
    checklist: {},
  });
}

export function loadLab(scope) {
  const storageKey = TESTING_STORAGE_KEYS[scope] || TESTING_STORAGE_KEYS.vpd;
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? normalizeLab(JSON.parse(saved)) : emptyLab();
  } catch {
    return emptyLab();
  }
}

export function saveLab(scope, lab) {
  const storageKey = TESTING_STORAGE_KEYS[scope] || TESTING_STORAGE_KEYS.vpd;
  localStorage.setItem(storageKey, JSON.stringify(normalizeLab(lab)));
}

export function upsertById(list, item) {
  const index = list.findIndex((entry) => entry.id === item.id);
  if (index === -1) return [...list, item];
  const next = [...list];
  next[index] = item;
  return next;
}

export function removeById(list, id) {
  return list.filter((entry) => entry.id !== id);
}
