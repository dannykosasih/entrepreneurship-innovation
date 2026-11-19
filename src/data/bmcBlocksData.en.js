/**
 * English teaching content for the Business Model Canvas.
 * Preserves all scholarly attributions and illustrative caveats from bmcBlocksData.js.
 */

import {
  BMC_BLOCKS,
  BMC_BLOCK_MAP,
  BMC_REFERENCES,
  DFV_LENSES,
  VALUE_LENSES,
} from './bmcBlocksData';

export const VALUE_LENSES_EN = {
  create: {
    id: 'create',
    label: 'Creating Value',
    en: 'Value Creation',
    color: '#1266B1',
    description:
      'How an organization designs its offering and prepares its infrastructure (partners, activities, resources) so the value proposition can be brought to life.',
  },
  deliver: {
    id: 'deliver',
    label: 'Delivering Value',
    en: 'Value Delivery',
    color: '#3533CA',
    description:
      'How value reaches the right customer segments through the selected channels and customer relationship models.',
  },
  capture: {
    id: 'capture',
    label: 'Capturing Value',
    en: 'Value Capture',
    color: '#AF6A00',
    description:
      'How an organization converts created and delivered value into revenue while managing costs so the model remains economically viable.',
  },
};

export const DFV_LENSES_EN = {
  desirability: {
    id: 'desirability',
    label: 'Desirability',
    idLabel: 'Customer Want',
    color: '#1266B1',
    blocks: 'CS, VP, CH, CR',
    description:
      'Do people actually want this offering? The right side of the canvas (plus Value Propositions) tests whether the problem, offer, channels, and relationships are relevant to customers.',
  },
  feasibility: {
    id: 'feasibility',
    label: 'Feasibility',
    idLabel: 'Operational Capability',
    color: '#3533CA',
    blocks: 'KP, KA, KR',
    description:
      'Can we actually build and deliver it? The left side of the canvas tests whether key partners, activities, and resources are sufficient to design and operate the offering.',
  },
  viability: {
    id: 'viability',
    label: 'Viability',
    idLabel: 'Economic Sustainability',
    color: '#AF6A00',
    blocks: 'RS, C$',
    description:
      'Can this model sustain itself economically? The bottom of the canvas weighs revenue streams against the cost structure.',
  },
};

export const BMC_BLOCKS_EN = [
  {
    key: 'customerSegments',
    code: 'CS',
    en: 'Customer Segments',
    idLabel: 'Customer Segments',
    valueLens: 'deliver',
    dfvLens: 'desirability',
    definition:
      'The distinct groups of people or organizations an enterprise aims to reach and serve. Segments should be separated whenever their needs, channels, relationships, or willingness to pay differ materially. Common patterns include mass market, niche, segmented, diversified, and multi-sided platforms.',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Young urban office professionals, university students seeking affordable caffeine, remote/WFA workers, and promo-driven buyers. Separate these segments because their daily jobs, price sensitivity, and channel habits differ — then create one Value Proposition Canvas per material segment. (A 42/28/18/12 percentage split does not appear in the case text; any such breakdown is strictly an added illustration if used in templates.)',
    extraExample:
      'Illustration. A multi-sided platform such as an online ride-hailing service serves both passengers and driver-partners simultaneously — two interdependent segments.',
    questions:
      'For whom are we creating value? Who are our most important customers? Do their needs, channels, relationships, or willingness to pay differ enough that they should be separated?',
  },
  {
    key: 'valuePropositions',
    code: 'VP',
    en: 'Value Propositions',
    idLabel: 'Value Propositions',
    valueLens: 'create',
    dfvLens: 'desirability',
    definition:
      'The bundle of products and services that creates value for a specific customer segment: what problems are solved, what needs are satisfied, and why customers choose you over existing alternatives. Value may be quantitative (price, speed) or qualitative (design, experience, status).',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Café-grade palm-sugar espresso milk coffee at an accessible daily price (in the case text: around Rp 18,000–22,000), mobile order-ahead without queuing, consistent taste across outlets, plus a loyalty program. In short: fast, affordable, dependable daily coffee.',
    extraExample:
      'Illustration. For students, the core value might be an "affordable hangout space"; for corporate clients, "easy-to-invoice vouchers and group orders." One BMC may include several value propositions — ideally clarified with one VPC per segment.',
    questions:
      'What value do we deliver to each segment? Which problems are we helping to solve and which needs are we satisfying? Why do customers choose us over existing alternatives?',
  },
  {
    key: 'channels',
    code: 'CH',
    en: 'Channels',
    idLabel: 'Channels',
    valueLens: 'deliver',
    dfvLens: 'desirability',
    definition:
      'How a company communicates with and reaches its customer segments to deliver a value proposition. Channels cover awareness, evaluation, purchase, delivery, and after-sales — spanning owned channels (outlets, mobile app) and partner channels (food marketplaces, delivery fleets).',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Official mobile app (57% of orders in 2024 per the case text), compact grab-and-go outlets in office lobbies and commuter stations, online food-delivery marketplace partnerships, and corporate group/catering orders. Channels are chosen so commuters can order on the go.',
    extraExample:
      'Illustration. A local skincare brand combining live shopping (awareness and purchase) with an official marketplace storefront (evaluation and after-sales).',
    questions:
      'Through which channels do our segments want to be reached? How are we reaching them now? Which channels work best and are most cost-efficient? How are awareness through after-sales integrated?',
  },
  {
    key: 'customerRelationships',
    code: 'CR',
    en: 'Customer Relationships',
    idLabel: 'Customer Relationships',
    valueLens: 'deliver',
    dfvLens: 'desirability',
    definition:
      'The types of relationships a company establishes with specific customer segments: personal assistance, dedicated personal assistance, self-service, automated services, communities, or co-creation. Relationships shape acquisition, retention, and upselling.',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Automated self-service via mobile app, loyalty and personalization programs (in the case text), plus quick bar service at outlets.',
    extraExample:
      'Added illustration (not in the case text): an instant refund policy if a drink tastes off — combining digital self-service with trust assurance. Another illustration: an LMS alumni community sharing venture canvases — a community-based relationship beyond license transactions.',
    questions:
      'What type of relationship does each customer segment expect? Which ones have we established? How costly are they, and how do they integrate with the rest of our business model?',
  },
  {
    key: 'revenueStreams',
    code: 'RS',
    en: 'Revenue Streams',
    idLabel: 'Revenue Streams',
    valueLens: 'capture',
    dfvLens: 'viability',
    definition:
      'The cash a company generates from each customer segment. Mechanisms include asset sales, usage fees, subscriptions, lending/renting/leasing, licensing, brokerage fees, or advertising. Distinguish one-time transactional revenue from recurring revenue, and verify what customers are truly willing to pay for.',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Core model of daily transactional beverage sales in-store and via app. Granular SKU breakdowns — such as signature beverage share, 1-liter bottles, pastries, or prepaid vouchers — do not appear in the case text and should only be read as added illustrations separate from the case financial figures (including ~46% COGS).',
    extraExample:
      'Illustration. A campus LMS charging annual B2B institutional licenses alongside student subscriptions and certification fees.',
    questions:
      'For what value are customers truly willing to pay? What and how do they currently pay? How would they prefer to pay? How much does each stream contribute to overall revenues?',
  },
  {
    key: 'keyResources',
    code: 'KR',
    en: 'Key Resources',
    idLabel: 'Key Resources',
    valueLens: 'create',
    dfvLens: 'feasibility',
    definition:
      'The most important assets required to make a business model work: physical (outlets, equipment), intellectual (brand, data, algorithms, patents), human, or financial. Key resources must underpin value propositions, channels, relationships, and revenue streams — not merely list assets that are "nice to have."',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Demand-forecasting AI model (in the case text), grab-and-go outlet network (812 locations per the case), direct bean supply partnerships with farmer cooperatives, and trained store staff. Without dependable supply and standards, the promise of "consistent taste everywhere" breaks down.',
    extraExample:
      'Illustration. For a D2C fashion brand, key resources may be its customer list and retention data rather than just a fabric warehouse.',
    questions:
      'What key resources do our value propositions, distribution channels, customer relationships, and revenue streams require?',
  },
  {
    key: 'keyActivities',
    code: 'KA',
    en: 'Key Activities',
    idLabel: 'Key Activities',
    valueLens: 'create',
    dfvLens: 'feasibility',
    definition:
      'The most important actions a company must take to operate its business model successfully. Common categories: production, problem solving, and platform/network management. Key activities directly support value propositions and channels rather than listing every operational chore.',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Quality control and roasting production, AI demand forecasting and restocking (in the case text), barista training, and mobile app plus loyalty development. The promise of "fast, consistent, affordable" depends on these activities.',
    extraExample:
      'Added illustration (not in the case text): a service-time target under 180 seconds — an example operational metric, not a case figure. Another illustration: a two-sided marketplace must manage partner onboarding, demand matching, and dispute resolution — platform activities, not just "selling."',
    questions:
      'What key activities do our value propositions, distribution channels, customer relationships, and revenue streams require?',
  },
  {
    key: 'keyPartners',
    code: 'KP',
    en: 'Key Partnerships',
    idLabel: 'Key Partnerships',
    valueLens: 'create',
    dfvLens: 'feasibility',
    definition:
      'The network of suppliers and partners that makes the business model work. Typical motivations: optimization and economies of scale, reduction of risk and uncertainty, or acquisition of particular resources and activities. Forms include strategic alliances, coopetition, joint ventures, and buyer–supplier relationships.',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Farmer cooperatives in Aceh Gayo, Toraja, and Kintamani (in the case text); POS/cloud providers; ride-hailing delivery fleets; and office-building and campus landlords. Partners close capability gaps that would be inefficient to build in-house.',
    extraExample:
      'Illustration. An EdTech startup partnering with universities for distribution and with industry practitioners for curriculum credibility.',
    questions:
      'Who are our key partners and suppliers? Which key resources or activities are we acquiring from them? Why do we partner — scale, risk reduction, or access to specific resources?',
  },
  {
    key: 'costStructure',
    code: 'C$',
    en: 'Cost Structure',
    idLabel: 'Cost Structure',
    valueLens: 'capture',
    dfvLens: 'viability',
    definition:
      'All costs incurred to operate a business model. Models can be cost-driven or value-driven, featuring fixed costs, variable costs, economies of scale, and economies of scope. Cost structure should always be evaluated alongside revenue streams.',
    exampleTitle: 'Illustration — Kopi AJIB learning case study',
    example:
      'Raw-material COGS in the 2024 case financials is roughly 46% of revenue, alongside barista salaries and store incentives, rent and utilities, digital/AI infrastructure, and digital customer acquisition. High COGS demands steady volume and tight waste control (the case also examines post-AI waste reduction).',
    extraExample:
      'Added illustration (not in the case text): a 15–25 m² compact outlet footprint — an illustrative size range, not case data. Another illustration: pure SaaS is usually dominated by fixed costs (engineering and cloud), allowing margins to widen as users grow — unlike retail where variable costs scale with every unit sold.',
    questions:
      'What are the most important costs inherent in our business model? Which key resources and key activities are most expensive? Is the model more cost-driven or value-driven?',
  },
];

export const BMC_BLOCK_MAP_EN = Object.fromEntries(BMC_BLOCKS_EN.map((block) => [block.key, block]));

export const BMC_REFERENCES_EN = [
  {
    citation:
      'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. John Wiley & Sons.',
    note: 'Primary source for the nine Business Model Canvas building blocks and the definition of a business model as the rationale of how an organization creates, delivers, and captures value. Print page numbers per block are omitted as unverified.',
  },
  {
    citation:
      'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.',
    note: 'Deepens the Value Propositions and Customer Segments blocks via the Value Proposition Canvas and explains how VPD connects to the BMC.',
  },
  {
    citation:
      'Bland, D. J., & Osterwalder, A. (2019). Testing Business Ideas: A Field Guide for Rapid Experimentation. John Wiley & Sons.',
    note: 'Overlays the Desirability, Feasibility, and Viability lenses onto BMC and VPC hypotheses and guides rapid experimentation (including Assumptions Mapping). Print page numbers are omitted as unverified.',
  },
  {
    citation:
      'Osterwalder, A. (2017). How to systematically reduce the risk & uncertainty of new ideas. Strategyzer. https://www.strategyzer.com/library/how-to-systematically-reduce-the-risk-uncertainty-of-new-ideas',
    note: 'Notes that Strategyzer borrowed the IDEO lenses and overlaid them onto the Business Model Canvas — the source of the DFV nine-block overlay, rather than Business Model Generation (2010).',
  },
  {
    citation:
      'Amarsy, N. (2014). Survival of the fittest. Strategyzer. https://www.strategyzer.com/library/survival-of-the-fittest',
    note: 'Overview of the three types of fit referencing Value Proposition Design.',
  },
  {
    citation: 'Brown, T. (2008). Design Thinking. Harvard Business Review.',
    note: 'Frames innovation around matching people’s needs with technological feasibility and viable business strategy. The Desirability–Feasibility–Viability naming and its nine-block BMC mapping do not originate from this article alone.',
  },
  {
    citation: 'IDEO. Human-Centered Design / Design Kit. https://www.designkit.org',
    note: 'Source of the desirability, feasibility, and viability lenses, not of their mapping onto the nine BMC blocks.',
  },
  {
    citation:
      'Kosasih, D. (2024). Case Study: Kopi AJIB — Building a National Coffee Chain Powered by Artificial Intelligence. Dharma Korporasi.',
    note: 'Course learning case study used as an illustration on this page; not an independent verification of a public company.',
  },
];

export const BMC_PRESET_TEMPLATES_EN = {
  kopiAjib: {
    name: 'Kopi AJIB — illustrative template (learning case study)',
    canvas: {
      keyPartners: [
        'Aceh Gayo, Toraja & Kintamani Farmer Cooperatives',
        'Cloud POS & AI Infrastructure Providers (Moka/Pawoon)',
        'Online Delivery Fleets (GoFood, GrabFood, ShopeeFood)',
        'Office Building & Campus Landlords (SCBD locations: added illustration, not case data)',
      ],
      keyActivities: [
        'Centralized Roasting & Standardized Quality Control (centralized roasting: added illustration, not explicit in case text)',
        'AI Demand Forecasting Model & Automated Restocking',
        'Rapid Barista Training & Fast-Service Promise (<180 sec target: added illustration, not a case figure)',
        'Mobile App Feature & Loyalty Program Development',
      ],
      keyResources: [
        'Store-Level AI Demand Forecasting Algorithm',
        '812 Nationwide Grab-and-Go Outlet Footprint',
        'Direct Coffee Bean Supply Contracts with Farmers',
        'Nationally Standardized Trained Barista Network',
      ],
      valuePropositions: [
        'Café-Grade Palm-Sugar Espresso Coffee at Rp 18,000–22,000 (case text price range)',
        'Order Ahead via App with Zero Counter Queuing',
        'Standardized Taste Consistency Across All 812 Outlets',
        'Personalized Promos & Gamified Loyalty Points',
      ],
      customerRelationships: [
        'Automated Self-Service via Mobile App',
        'Tiered Loyalty Program & Smart Promo Notifications',
        'Fast, Friendly Bar Counter Service',
        'Instant Refund Guarantee if Taste Is Off (added illustration, not a case figure)',
      ],
      channels: [
        'Official Kopi AJIB Mobile App (57% of orders in 2024 per case text)',
        'Compact Grab-and-Go Outlets in Office Lobbies & Stations',
        'Online Food Delivery Marketplace Partnerships',
        'Corporate Group Orders & Office Catering',
      ],
      customerSegments: [
        'Young Urban Office Professionals (illustrative primary segment)',
        'University Students Seeking Affordable Caffeine & Hangout Spots (illustration)',
        'Remote / WFA Workers Needing Daily Coffee (illustration)',
        'Occasional / Promo-Driven Trial Buyers (illustration)',
      ],
      costStructure: [
        'Raw Material COGS: Coffee Beans, Fresh Milk, Palm Sugar (46% in 2024 per case text)',
        'Barista Salaries & Data-Driven Store Performance Incentives',
        'Compact Outlet Rent & Utilities (15–25 m² footprint: added illustration, not case data)',
        'Cloud Servers & AI Model Maintenance Costs',
        'Digital Performance Ads & App Referral Promos',
      ],
      revenueStreams: [
        'Daily Cup Beverage Sales (46% signature share is an added illustration, not a case figure)',
        '1-Liter Ready-to-Drink Bottles & Non-Coffee Line (added illustration, not in case text)',
        'Cross-Sell Snacks, Bakery & Companion Pastries (added illustration, not in case text)',
        'Prepaid Balances & Corporate Client Vouchers (added illustration, not in case text)',
      ],
    },
  },
  edutech: {
    name: 'EduTech AI LMS — illustrative template (synthetic example)',
    canvas: {
      keyPartners: ['Universities & Business Schools', 'Industry Mentors & Practitioners', 'Venture Capital Networks'],
      keyActivities: ['AI-Assisted Curriculum Curation', 'Business Simulator Engineering', 'LMS Platform Maintenance'],
      keyResources: ['Accredited Entrepreneurship Knowledge Base', 'Venture Simulation Engine', 'DDK & Danny Kosasih Brand'],
      valuePropositions: ['Interactive Real-World Venture Simulation', 'Financial & Operational Case Studies', 'Verified Competency Certification'],
      customerRelationships: ['Learner Community Forums', 'Automated AI Prompt Coaching', 'Interactive Mentoring Sessions'],
      channels: ['Campus & University Portals', 'Direct-to-Student Access', 'Corporate Executive Training Programs'],
      customerSegments: ['Business & Management Students', 'Early-Stage Startup Founders', 'Corporate Intrapreneurs'],
      costStructure: ['Content Production & Royalties', 'Cloud Hosting & AI API Usage', 'Accreditation Fees'],
      revenueStreams: ['B2B Campus & University Licenses', 'Student Subscription Plans', 'Corporate Professional Certifications'],
    },
  },
};

export const CANVAS_TITLES_ID = {
  keyPartners: '1. Key Partners · Mitra Utama',
  keyActivities: '2. Key Activities · Aktivitas Utama',
  keyResources: '6. Key Resources · Sumber Daya Utama',
  valuePropositions: '3. Value Propositions · Proposisi Nilai',
  customerRelationships: '4. Customer Relationships · Hubungan Pelanggan',
  channels: '7. Channels · Saluran',
  customerSegments: '5. Customer Segments · Segmen Pelanggan',
  costStructure: '8. Cost Structure · Struktur Biaya',
  revenueStreams: '9. Revenue Streams · Aliran Pendapatan',
};

export const CANVAS_TITLES_EN = {
  keyPartners: '1. Key Partners',
  keyActivities: '2. Key Activities',
  keyResources: '6. Key Resources',
  valuePropositions: '3. Value Propositions',
  customerRelationships: '4. Customer Relationships',
  channels: '7. Channels',
  customerSegments: '5. Customer Segments',
  costStructure: '8. Cost Structure',
  revenueStreams: '9. Revenue Streams',
};

export function getBmcContent(lang) {
  if (lang === 'en') {
    return {
      VALUE_LENSES: VALUE_LENSES_EN,
      DFV_LENSES: DFV_LENSES_EN,
      BMC_BLOCKS: BMC_BLOCKS_EN,
      BMC_BLOCK_MAP: BMC_BLOCK_MAP_EN,
      BMC_REFERENCES: BMC_REFERENCES_EN,
      CANVAS_TITLES: CANVAS_TITLES_EN,
    };
  }
  return {
    VALUE_LENSES,
    DFV_LENSES,
    BMC_BLOCKS,
    BMC_BLOCK_MAP,
    BMC_REFERENCES,
    CANVAS_TITLES: CANVAS_TITLES_ID,
  };
}
