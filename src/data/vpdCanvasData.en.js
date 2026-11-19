/**
 * English teaching content for Value Proposition Design.
 * Preserves all scholarly attributions and illustrative caveats from vpdCanvasData.js.
 */

import {
  EXAMPLE_VPD_CANVAS,
  FIT_LEVELS,
  JOB_KINDS,
  VPD_BLOCKS,
  VPD_BMC_RELATION,
  VPD_REFERENCES,
  VPD_SIDES,
} from './vpdCanvasData';

export const JOB_KINDS_EN = [
  {
    id: 'functional',
    label: 'Functional',
    description: 'A practical task or problem the customer wants to complete (e.g., getting quality morning coffee before a meeting without being late).',
  },
  {
    id: 'social',
    label: 'Social',
    description: 'How the customer wants to be perceived by others (e.g., looking polished and professional without lingering in a café).',
  },
  {
    id: 'emotional',
    label: 'Personal / emotional',
    description: 'A feeling the customer wants to attain or avoid (e.g., feeling calm, energized, and free from queuing stress).',
  },
  {
    id: 'supporting',
    label: 'Supporting',
    description: 'Jobs performed in the context of purchasing and consuming value — such as comparing options, ordering, paying, giving feedback, or switching from an old solution.',
  },
];

export const VPD_SIDES_EN = {
  customerProfile: {
    id: 'customerProfile',
    title: 'Customer Profile',
    idLabel: 'Segment Zoom-In',
    summary:
      'The right side of the Value Proposition Canvas: an observable picture of a segment’s jobs, pains, and gains. This side zooms in on the Customer Segments block of the Business Model Canvas. Create one profile per segment.',
  },
  valueMap: {
    id: 'valueMap',
    title: 'Value Map',
    idLabel: 'Offering Zoom-In',
    summary:
      'The left side of the Value Proposition Canvas: the products and services, pain relievers, and gain creators you design. This side zooms in on the Value Propositions block of the Business Model Canvas and must target the same customer profile.',
  },
};

export const VPD_BLOCKS_EN = {
  jobs: {
    key: 'jobs',
    side: 'customerProfile',
    en: 'Customer Jobs (Jobs To Be Done)',
    idLabel: 'Customer Jobs',
    definition:
      'The things customers are trying to get done, achieve, or experience in their work or life, seen from the customer’s perspective. There are three main types: functional jobs (practical tasks or problems), social jobs (how they want to be perceived by others), and personal/emotional jobs (feelings they seek or want to avoid). Alongside these are supporting jobs in the context of buying and consuming value — such as comparing options, purchasing, giving feedback, or switching from a legacy solution. The jobs framework in VPD aligns with, though is not identical to, the Jobs To Be Done tradition (customers "hiring" a product to get a job done).',
    example:
      'Illustration — Kopi AJIB learning case study, urban office professional segment. Functional: getting quality caffeine before a morning meeting without being late. Social: appearing professional without spending a long time in a café. Personal/emotional: starting the day calm and energized. Supporting: ordering quickly in the app and paying without slowing down the commute.',
  },
  pains: {
    key: 'pains',
    side: 'customerProfile',
    en: 'Pains',
    idLabel: 'Customer Pains',
    definition:
      'Obstacles, risks, costs, or negative emotions that arise before, during, or after customers try to get a job done — including undesired outcomes, barriers, and risks of failure. Mark which pains are severe or frequent; not every pain needs to be relieved. The most acute pains typically become the top priority for pain relievers.',
    example:
      'Illustration — Kopi AJIB learning case study. Long café queues during the morning commute, artisanal café espresso feeling too expensive for a daily habit, inconsistent taste across branches, and anxiety about arriving late to a meeting while waiting for an order.',
  },
  gains: {
    key: 'gains',
    side: 'customerProfile',
    en: 'Gains',
    idLabel: 'Customer Gains',
    definition:
      'Outcomes and benefits customers want, distinguished in Value Proposition Design into four categories: required (essential for a solution to work), expected (standard baseline benefits), desired (wished-for benefits beyond the baseline), and unexpected (delightful surprises). Gains can be functional, social, emotional, or cost savings. Not all gains matter equally.',
    example:
      'Illustration — Kopi AJIB learning case study. Orders ready fast or already waiting for pickup; a reasonable daily price; identical taste at outlets along the commute route; plus relevant loyalty points or promos.',
  },
  products: {
    key: 'products',
    side: 'valueMap',
    en: 'Products & Services',
    idLabel: 'Products & Services',
    definition:
      'The list of products and services around which a value proposition is built — physical goods, digital services, supporting services, or experiences. Listing features does not automatically create value; value only emerges when they help complete jobs, relieve pains, or create gains for the same segment.',
    example:
      'Illustration — Kopi AJIB learning case study. Signature palm-sugar espresso milk coffee, mobile order-ahead app, compact grab-and-go outlets in office lobbies and stations, loyalty points program, and corporate vouchers and group orders.',
  },
  painRelievers: {
    key: 'painRelievers',
    side: 'valueMap',
    en: 'Pain Relievers',
    idLabel: 'Pain Relievers',
    definition:
      'The specific ways your products and services eliminate or reduce customer pains. Strong pain relievers target the most severe, frequent, or costly pains — not every minor annoyance. Good fit focuses on pains that matter most to customers rather than trying to check off every item. Each pain reliever should connect to a real pain in the customer profile.',
    example:
      'Illustration — Kopi AJIB learning case study. Mobile order-ahead to skip lines, accessible daily pricing (around Rp 18,000–22,000 in the case text), and nationwide taste consistency. Added illustration (not in the case text): instant refund if the taste is off.',
  },
  gainCreators: {
    key: 'gainCreators',
    side: 'valueMap',
    en: 'Gain Creators',
    idLabel: 'Gain Creators',
    definition:
      'The specific ways you produce outcomes and benefits customers expect or desire. Like pain relievers, gain creators must connect to gains customers genuinely care about rather than features that merely excite the product team.',
    example:
      'Illustration — Kopi AJIB learning case study. Consistent taste across stores, order-ahead pickup convenience, personalized promos, and compact commuter-corridor locations so coffee fits seamlessly into the trip to work. Grab-and-go / order-ahead speed reflects the case spirit; a "under 180 seconds" target is an added illustration, not a case figure.',
  },
};

export const FIT_LEVELS_EN = [
  {
    id: 'problem-solution',
    title: 'Problem-Solution Fit',
    idLabel: 'On-paper design + early problem evidence',
    stage: 'On-paper design plus early evidence that the problem matters',
    description:
      'Occurs when you have evidence that customers care about specific jobs, pains, and gains, and your value map clearly targets them. At this stage the value proposition is still "on paper": the problem is backed by early evidence, but you have not yet proven customers care enough to buy. The link score in this tool only checks on-paper design completeness, not market fit.',
  },
  {
    id: 'product-market',
    title: 'Product-Market Fit',
    idLabel: 'Validated traction in the market',
    stage: 'In the market',
    description:
      'Occurs when you have evidence that your products, pain relievers, and gain creators actually create customer value and gain traction — repeat usage, referrals, or payment — after experiments that support or refute hypotheses. Canvas link scores alone never prove product-market fit.',
  },
  {
    id: 'business-model',
    title: 'Business Model Fit',
    idLabel: 'Profitable & scalable business model',
    stage: 'Embedded in a profitable and scalable model',
    description:
      'Occurs when you have evidence that a value proposition creating value for customers is embedded in a Business Model Canvas that also creates value for your organization. You test the two VPC-zoomed blocks together with the other seven BMC blocks.',
  },
];

export const VPD_BMC_RELATION_EN = {
  title: 'How the Value Proposition Canvas Connects to the Business Model Canvas',
  points: [
    'The Value Proposition Canvas is a "zoom-in" on two blocks of the Business Model Canvas: Value Propositions and Customer Segments. Its design practice is taught in Value Proposition Design.',
    'The Value Map zooms in on the Value Propositions block: products and services, pain relievers, and gain creators.',
    'The Customer Profile zooms in on the Customer Segments block. Customer jobs align with, though are not identical to, the Jobs To Be Done tradition.',
    'Build one Value Proposition Canvas for each material customer segment. Never mix the jobs of two distinct segments inside one profile.',
    'Once you have early evidence that important jobs, pains, and gains truly matter to customers and your value map targets them, bring those insights back to the BMC: align channels, relationships, revenue streams, partners, activities, resources, and costs — the other seven blocks — so value can be delivered and captured.',
    'Both canvases stress-test each other. Any change on one canvas should be checked against the other.',
  ],
};

export const EXAMPLE_VPD_CANVAS_EN = {
  version: 1,
  segmentName: 'Young urban office professionals — Kopi AJIB',
  jobs: [
    { id: 'job-1', text: 'Get quality caffeine before a morning meeting without arriving late.', kind: 'functional' },
    { id: 'job-2', text: 'Look professional and tasteful without lingering for a long time in a café.', kind: 'social' },
    { id: 'job-3', text: 'Start the workday feeling calm, energized, and stress-free.', kind: 'emotional' },
    { id: 'job-4', text: 'Order quickly on an app and pay without slowing down the commute to the office.', kind: 'supporting' },
  ],
  pains: [
    { id: 'pain-1', text: 'Long café queues during morning commute hours.' },
    { id: 'pain-2', text: 'Artisanal café espresso prices feel too expensive for a daily habit.' },
    { id: 'pain-3', text: 'Inconsistent drink taste across branches or barista shifts.' },
    { id: 'pain-4', text: 'Anxiety about arriving late to meetings while waiting for an order.' },
  ],
  gains: [
    { id: 'gain-1', text: 'Order ready within minutes, or already waiting for immediate pickup.' },
    { id: 'gain-2', text: 'Reasonable daily pricing for café-grade coffee quality.' },
    { id: 'gain-3', text: 'Consistent taste at any outlet along the commute route.' },
    { id: 'gain-4', text: 'Loyalty points and promos that feel relevant rather than spammy.' },
  ],
  products: [
    { id: 'prod-1', text: 'Signature palm-sugar espresso milk coffee (accessible café-grade pricing).' },
    { id: 'prod-2', text: 'Official Kopi AJIB mobile order-ahead & pickup app.' },
    { id: 'prod-3', text: 'Compact grab-and-go outlets in office lobbies and commuter stations.' },
    { id: 'prod-4', text: 'Tiered loyalty program and corporate vouchers.' },
  ],
  painRelievers: [
    { id: 'rel-1', text: 'Order ahead via the mobile app so there is no need to queue in-store.' },
    { id: 'rel-2', text: 'Daily pricing around Rp 18,000–22,000 (case text range) for café-grade quality.' },
    { id: 'rel-3', text: 'Nationwide taste standard and centralized roasting quality control.' },
    { id: 'rel-4', text: 'Instant refund if the drink tastes off (added illustration, not in case text).' },
  ],
  gainCreators: [
    { id: 'gc-1', text: 'Order-ahead pickup option (grab-and-go speed promise; "180 seconds" is an added illustration only).' },
    { id: 'gc-2', text: 'Outlet footprint directly along commuter corridors (office lobbies and stations).' },
    { id: 'gc-3', text: 'Personalized promos and gamified accumulating loyalty points.' },
    { id: 'gc-4', text: 'Disciplined daily pricing so a coffee habit never feels like an indulgence.' },
  ],
  links: EXAMPLE_VPD_CANVAS.links,
};

export const VPD_REFERENCES_EN = [
  {
    citation:
      'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.',
    note: 'Primary source for the Value Proposition Canvas (Customer Profile §1.1, Value Map §1.2, and Fit §1.3), typologies of jobs and gains, and the link to the Business Model Canvas. Cited by section without forcing print page numbers.',
  },
  {
    citation:
      'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. John Wiley & Sons.',
    note: 'The nine-block BMC framework zoomed in by the Value Proposition Canvas on the Value Propositions and Customer Segments blocks. Print page numbers are omitted as unverified.',
  },
  {
    citation:
      'Bland, D. J., & Osterwalder, A. (2019). Testing Business Ideas: A Field Guide for Rapid Experimentation. John Wiley & Sons.',
    note: 'Applies the Desirability, Feasibility, and Viability lenses to BMC and VPC hypotheses and guides rapid testing. Print page numbers are omitted as unverified.',
  },
  {
    citation:
      'Amarsy, N. (2014). Survival of the fittest. Strategyzer. https://www.strategyzer.com/library/survival-of-the-fittest',
    note: 'Overview of the three levels of fit. The article cites pp. 48–49 of Value Proposition Design for the printing it quotes; page numbers may vary across printings.',
  },
  {
    citation:
      'Osterwalder, A. (2017). How to systematically reduce the risk & uncertainty of new ideas. Strategyzer. https://www.strategyzer.com/library/how-to-systematically-reduce-the-risk-uncertainty-of-new-ideas',
    note: 'Explains how Strategyzer borrowed the IDEO lenses and overlaid them onto the Business Model Canvas.',
  },
  {
    citation:
      'Christensen, C. M., Cook, S., & Hall, T. (2005). Marketing Malpractice: The Cause and the Cure. Harvard Business Review.',
    note: 'Popularized the idea that customers "hire" products to get a specific job done (Jobs To Be Done) — a related tradition, not the entire VPD framework.',
  },
  {
    citation:
      'Christensen, C. M., Hall, T., Dillon, K., & Duncan, D. S. (2016). Competing Against Luck: The Story of Innovation and Customer Choice. Harper Business.',
    note: 'Full exposition of Jobs To Be Done theory informing the jobs perspective of the Customer Profile.',
  },
  {
    citation:
      'Kosasih, D. (2024). Case Study: Kopi AJIB — Building a National Coffee Chain Powered by Artificial Intelligence. Dharma Korporasi.',
    note: 'Course learning case study used as an illustration on this page; not an independent verification of a public company.',
  },
];

export function getVpdContent(lang) {
  if (lang === 'en') {
    return {
      JOB_KINDS: JOB_KINDS_EN,
      VPD_SIDES: VPD_SIDES_EN,
      VPD_BLOCKS: VPD_BLOCKS_EN,
      FIT_LEVELS: FIT_LEVELS_EN,
      VPD_BMC_RELATION: VPD_BMC_RELATION_EN,
      EXAMPLE_VPD_CANVAS: EXAMPLE_VPD_CANVAS_EN,
      VPD_REFERENCES: VPD_REFERENCES_EN,
    };
  }
  return {
    JOB_KINDS,
    VPD_SIDES,
    VPD_BLOCKS,
    FIT_LEVELS,
    VPD_BMC_RELATION,
    EXAMPLE_VPD_CANVAS,
    VPD_REFERENCES,
  };
}
