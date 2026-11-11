export const LINK_KINDS = {
  'job-product': { customerKey: 'jobs', valueKey: 'products' },
  'pain-reliever': { customerKey: 'pains', valueKey: 'painRelievers' },
  'gain-creator': { customerKey: 'gains', valueKey: 'gainCreators' },
};

const CUSTOMER_KEYS = ['jobs', 'pains', 'gains'];
const VALUE_KEYS = ['products', 'painRelievers', 'gainCreators'];

export function createItemId(prefix = 'item') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function normalizeVpdCanvas(raw) {
  const base = {
    version: 1,
    segmentName: '',
    jobs: [],
    pains: [],
    gains: [],
    products: [],
    painRelievers: [],
    gainCreators: [],
    links: [],
  };
  if (!raw || typeof raw !== 'object') return base;

  const canvas = { ...base, ...raw, version: 1 };
  canvas.segmentName = typeof raw.segmentName === 'string' ? raw.segmentName : '';

  for (const key of [...CUSTOMER_KEYS, ...VALUE_KEYS]) {
    canvas[key] = Array.isArray(raw[key])
      ? raw[key]
          .filter((item) => item && typeof item.text === 'string')
          .map((item) => ({
            id: typeof item.id === 'string' && item.id ? item.id : createItemId(key),
            text: item.text,
            ...(key === 'jobs' ? { kind: ['functional', 'social', 'emotional'].includes(item.kind) ? item.kind : 'functional' } : {}),
          }))
      : [];
  }

  const knownIds = new Set(
    [...CUSTOMER_KEYS, ...VALUE_KEYS].flatMap((key) => canvas[key].map((item) => item.id))
  );

  canvas.links = Array.isArray(raw.links)
    ? raw.links
        .filter((link) => link && LINK_KINDS[link.kind] && knownIds.has(link.customerId) && knownIds.has(link.valueId))
        .filter((link) => {
          const mapping = LINK_KINDS[link.kind];
          const customerOk = canvas[mapping.customerKey].some((item) => item.id === link.customerId);
          const valueOk = canvas[mapping.valueKey].some((item) => item.id === link.valueId);
          return customerOk && valueOk;
        })
        .map((link) => ({
          id: typeof link.id === 'string' && link.id ? link.id : createItemId('link'),
          kind: link.kind,
          customerId: link.customerId,
          valueId: link.valueId,
        }))
    : [];

  return canvas;
}

function coverageFor(customerItems, links, kind) {
  const linkedIds = new Set(links.filter((link) => link.kind === kind).map((link) => link.customerId));
  const addressed = customerItems.filter((item) => linkedIds.has(item.id));
  const unaddressed = customerItems.filter((item) => !linkedIds.has(item.id));
  return { addressed, unaddressed, total: customerItems.length, covered: addressed.length };
}

function unusedFor(valueItems, links, kind) {
  const linkedIds = new Set(links.filter((link) => link.kind === kind).map((link) => link.valueId));
  return {
    used: valueItems.filter((item) => linkedIds.has(item.id)),
    unused: valueItems.filter((item) => !linkedIds.has(item.id)),
  };
}

/**
 * Problem-solution fit on the canvas: a customer item is addressed when at least
 * one same-kind value-map item is linked to it. Empty customer categories are
 * excluded from the average so a learner can start with jobs only.
 * Score is 0 when the customer profile is empty.
 */
export function computeProblemSolutionFit(canvas) {
  const data = normalizeVpdCanvas(canvas);
  const jobs = coverageFor(data.jobs, data.links, 'job-product');
  const pains = coverageFor(data.pains, data.links, 'pain-reliever');
  const gains = coverageFor(data.gains, data.links, 'gain-creator');
  const products = unusedFor(data.products, data.links, 'job-product');
  const painRelievers = unusedFor(data.painRelievers, data.links, 'pain-reliever');
  const gainCreators = unusedFor(data.gainCreators, data.links, 'gain-creator');

  const categories = [jobs, pains, gains].filter((category) => category.total > 0);
  const score = categories.length === 0
    ? 0
    : Math.round(
        categories.reduce((sum, category) => sum + (category.covered / category.total) * 100, 0) / categories.length
      );

  const customerCount = data.jobs.length + data.pains.length + data.gains.length;
  const valueCount = data.products.length + data.painRelievers.length + data.gainCreators.length;

  return {
    score,
    categories: { jobs, pains, gains },
    unused: {
      products: products.unused,
      painRelievers: painRelievers.unused,
      gainCreators: gainCreators.unused,
    },
    used: {
      products: products.used,
      painRelievers: painRelievers.used,
      gainCreators: gainCreators.used,
    },
    totals: {
      customerItems: customerCount,
      valueItems: valueCount,
      links: data.links.length,
      addressed: jobs.covered + pains.covered + gains.covered,
      unaddressed: jobs.unaddressed.length + pains.unaddressed.length + gains.unaddressed.length,
      unusedValue: products.unused.length + painRelievers.unused.length + gainCreators.unused.length,
    },
    hasCustomerItems: customerCount > 0,
    hasValueItems: valueCount > 0,
    hasLinks: data.links.length > 0,
  };
}

export function toggleLink(links, kind, customerId, valueId) {
  const existing = links.find(
    (link) => link.kind === kind && link.customerId === customerId && link.valueId === valueId
  );
  if (existing) {
    return links.filter((link) => link.id !== existing.id);
  }
  return [...links, { id: createItemId('link'), kind, customerId, valueId }];
}

export function removeItemFromCanvas(canvas, listKey, itemId) {
  const next = normalizeVpdCanvas(canvas);
  next[listKey] = next[listKey].filter((item) => item.id !== itemId);
  next.links = next.links.filter((link) => link.customerId !== itemId && link.valueId !== itemId);
  return next;
}

