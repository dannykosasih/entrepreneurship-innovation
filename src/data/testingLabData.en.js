/**
 * English teaching content for Testing a Business Model Canvas and Value Proposition Canvas.
 * Preserves all scholarly attributions, classifications, and "illustrative" disclaimers from testingLabData.js.
 */

import {
  CLASSIFICATION_NOTE,
  DECISIONS,
  EXAMPLE_ASSUMPTIONS,
  EXAMPLE_LEARNING_CARDS,
  EXAMPLE_TEST_CARDS,
  EXPERIMENT_GROUPS,
  EXPERIMENT_TYPES,
  FIT_CHECKS,
  LEARNING_CARD_FIELDS,
  TEST_CARD_FIELDS,
  TEST_STATUSES,
  TESTING_CHECKLIST,
  TESTING_ETHICS,
  TESTING_INTRO,
  TESTING_LENSES,
  TESTING_REFERENCES,
  TESTING_STEPS,
  TESTING_WORKFLOW,
} from './testingLabData';

export const TESTING_INTRO_EN = {
  title: 'How to Test',
  lede: 'A tightly designed canvas does not automatically hold up in the field. Every sticky note on a Business Model Canvas or Value Proposition Canvas is a hypothesis: an assumption to be tested, not proven fact. Testing quickly and cheaply lowers the risk of building an offering nobody wants, cannot be delivered, or is economically unviable.',
};

export const TESTING_LENSES_EN = [
  {
    id: 'desirability',
    label: 'Desirability',
    idLabel: 'Customer want',
    question: 'Do customers actually want it?',
    hint: 'Customer Segments, Value Propositions, Channels, and Customer Relationships blocks; plus Jobs, Pains, Gains, and Value Map on the VPC.',
    example: 'Illustration: SME owners want to try a cash-flow companion because weekly reconciliation eats up too much time.',
  },
  {
    id: 'feasibility',
    label: 'Feasibility',
    idLabel: 'Operational capability',
    question: 'Can we build and deliver it — including at scale?',
    hint: 'Key Resources, Key Activities, and Key Partnerships blocks.',
    example: 'Illustration: the team can generate accurate reports within the promised service turnaround time.',
  },
  {
    id: 'viability',
    label: 'Viability',
    idLabel: 'Economic sustainability',
    question: 'Do revenues, pricing, and costs allow sustainable profit?',
    hint: 'Revenue Streams and Cost Structure blocks.',
    example: 'Illustration: the price customers pay covers service delivery and acquisition costs with a healthy margin.',
  },
];

export const TESTING_STEPS_EN = [
  {
    id: 'extract',
    title: '1. Extract hypotheses',
    body: 'Unpack assumptions from your BMC and VPC. Write one specific, testable, falsifiable hypothesis per card: specify the segment, context, behavior, and timeframe. Tag desirability, feasibility, or viability, and split overly complex assumptions so results can be interpreted clearly. These lenses classify risk rather than mutually exclusive buckets — pricing, for instance, touches both desirability and viability. Customer appeal alone does not guarantee technical feasibility or profitability.',
  },
  {
    id: 'prioritize',
    title: '2. Prioritize the riskiest assumptions',
    body: 'Map importance (impact if wrong) against existing evidence. Store concrete evidence notes or links, not mere opinions. Prioritize assumptions that are high-importance yet low-evidence — those are the assumptions most likely to sink the venture. Avoid repeating only the easiest tests; choose fast, affordable tests that remain relevant, escalate the commitment tested, and triangulate multiple experiments for critical hypotheses.',
  },
  {
    id: 'test-card',
    title: '3. Design the experiment on a Test Card',
    body: 'Before collecting data, fill out a Test Card. Define the hypothesis, experiment, metric, and success criteria up front — including numerator, denominator, exclusions, and timeframe — so the goalposts are not moved after seeing results. If sample size or instrumentation falls short, treat the outcome as inconclusive rather than automatically supported or refuted.',
  },
  {
    id: 'learn',
    title: '4. Capture insights on a Learning Card',
    body: 'After running the experiment, fill out a Learning Card: what you believed, what you actually observed with context, what you learned including its limits, and your next decision. Record negative findings and uncertainty, not just numbers that flatter the idea. Update your canvas, then persevere, iterate, pivot, or kill.',
  },
];

export const EXPERIMENT_GROUPS_EN = [
  {
    id: 'discovery',
    title: 'Discovery — early exploration',
    intro: 'Best for understanding problems, customer language, and initial interest. Evidence at this stage is rarely sufficient to claim purchase intent or product-market fit.',
  },
  {
    id: 'validation',
    title: 'Validation — stronger commitment & realism',
    intro: 'Best when escalating commitment (actions, payment, repeat usage) and operational realism. A method’s name alone never guarantees strong evidence.',
  },
];

export const EXPERIMENT_TYPES_EN = [
  {
    id: 'interview',
    group: 'discovery',
    title: 'Customer interview',
    body: 'Explore recent real events and how customers currently work around the problem, rather than asking "would you buy this?".',
    risk: 'Desirability: jobs, pains, and gains. Viability only exploratorily for price sensitivity.',
    evidence: 'Low for purchase intent; moderate for context when grounded in concrete past examples. Vulnerable to memory and politeness bias.',
    costTime: 'Low cost; illustrative duration 3–7 days.',
    metric: 'Illustration: at least 6 of 10 participants recount a recent problem incident and their workaround. Not a population prevalence estimate.',
    source: 'Testing Business Ideas, Discovery section; Value Proposition Design, Test section.',
  },
  {
    id: 'search',
    group: 'discovery',
    title: 'Search trend analysis',
    body: 'Compare search terms, regions, and seasonality related to the target problem.',
    risk: 'Desirability: active interest in the problem.',
    evidence: 'Low. Searching is not buying, and relative trend indices are not exact market volume.',
    costTime: 'Low cost; illustrative duration 1–2 days.',
    metric: 'Illustration: at least three relevant queries show sustained interest in the target region over 12 months; check seasonality.',
    source: 'Testing Business Ideas, Discovery section.',
  },
  {
    id: 'forums',
    group: 'discovery',
    title: 'Discussion forum review',
    body: 'Analyze public customer threads about their frustrations and the alternatives they currently use.',
    risk: 'Desirability: recurring pains and authentic customer vocabulary.',
    evidence: 'Low to moderate for problem existence. Subject to self-selection bias; verify context and speaker identity.',
    costTime: 'Low cost; illustrative duration 2–4 days.',
    metric: 'Illustration: at least 10 distinct authors across at least 3 independent threads describe the same pain within the defined window.',
    source: 'Testing Business Ideas, Discovery section.',
  },
  {
    id: 'ads',
    group: 'discovery',
    title: 'Online ad',
    body: 'Test messaging and audience segments with targeted ads and observe who clicks.',
    risk: 'Desirability: channels and value proposition messaging. Viability only as an early acquisition-cost proxy.',
    evidence: 'Moderate for clicks, low for purchases. Curiosity is not commitment.',
    costTime: 'Moderate cost; illustrative duration 3–7 days.',
    metric: 'Illustration: click-through rate of at least 2% across at least 1,000 targeted impressions, followed by measuring qualified downstream actions.',
    source: 'Testing Business Ideas, Discovery section (Online Ad).',
  },
  {
    id: 'landing',
    group: 'validation',
    title: 'Landing page / smoke test',
    body: 'A value-focused web page with a call-to-action to join a pilot. Clearly disclose if the product is not yet generally available.',
    risk: 'Desirability. Early viability only if pricing and commitment terms are explicit.',
    evidence: 'Moderate for sign-ups. Free sign-ups do not prove willingness to pay.',
    costTime: 'Low to moderate cost; illustrative duration 3–10 days.',
    metric: 'Illustration: at least 10 of 100 qualified unique visitors sign up. If traffic falls short of plan, mark the test inconclusive.',
    source: 'Testing Business Ideas places Simple Landing Page in the Validation section rather than Discovery, even though email smoke tests can be exploratory.',
    classificationNote: true,
  },
  {
    id: 'video',
    group: 'discovery',
    title: 'Explainer video',
    body: 'Demonstrate usage and core benefits visually, paired with a clear call-to-action.',
    risk: 'Desirability: comprehension and interest. Not a technical feasibility test.',
    evidence: 'Low if measured only by views or compliments; moderate if paired with qualified actions.',
    costTime: 'Low to moderate cost; illustrative duration 3–7 days.',
    metric: 'Illustration: at least 8 of 100 targeted unique viewers request a demo; verify benefit comprehension separately.',
    source: 'Testing Business Ideas, Discovery section; Strategyzer practice notes on video learning tests.',
  },
  {
    id: 'paper',
    group: 'discovery',
    title: 'Paper prototype',
    body: 'Ask participants to complete a task using sketched interfaces without guided prompting.',
    risk: 'Desirability: usability and workflow clarity, not technical feasibility.',
    evidence: 'Moderate for observed usability; low for real-world adoption or willingness to pay.',
    costTime: 'Low cost; illustrative duration 1–3 days.',
    metric: 'Illustration: at least 4 of 5 participants complete the primary task unassisted. Small samples are not statistical population proof.',
    source: 'Testing Business Ideas, Discovery section; "what people do vs. say" principle in Value Proposition Design, Test section.',
  },
  {
    id: 'storyboard',
    group: 'discovery',
    title: 'Storyboard',
    body: 'Illustrate the sequence of problem, product usage, and outcome to test reactions.',
    risk: 'Desirability: scenario relevance and perceived benefit.',
    evidence: 'Low to moderate. Reacting to a concept is not real usage.',
    costTime: 'Low cost; illustrative duration 1–3 days.',
    metric: 'Illustration: at least 4 of 5 participants explain the benefit in their own words and relate it to a real past experience unprompted.',
    source: 'Testing Business Ideas, Discovery section.',
  },
  {
    id: 'concierge',
    group: 'validation',
    title: 'Concierge',
    body: 'Deliver the service manually and transparently as though the finished product already existed.',
    risk: 'Desirability and feasibility. Viability if paid and delivery costs are tracked.',
    evidence: 'Moderate to strong for outcomes and usage. High-touch attention can inflate perceived value. Does not prove automation or scale. Can also be used exploratorily.',
    costTime: 'Moderate to high cost; illustrative duration 1–3 weeks.',
    metric: 'Illustration: at least 4 of 5 customers reach the agreed outcome; track manual labor minutes per customer and repeat purchases.',
    source: 'Testing Business Ideas, Validation section.',
  },
  {
    id: 'wizard',
    group: 'validation',
    title: 'Wizard of Oz',
    body: 'Present an apparently automated front end while running back-end fulfillment manually behind the scenes.',
    risk: 'Desirability and service-flow feasibility. Viability if paid.',
    evidence: 'Moderate to strong for user experience. Does not validate automated technology or scalability.',
    costTime: 'Moderate to high cost; illustrative duration 1–3 weeks.',
    metric: 'Illustration: at least 8 of 10 tasks complete within the pilot promise, with manual back-office work not exceeding 20 minutes per task.',
    source: 'Testing Business Ideas, Validation section.',
  },
  {
    id: 'presales',
    group: 'validation',
    title: 'Mock sale & presale',
    body: 'A simulated purchase flow, or transparent real pre-orders at a stated price.',
    risk: 'Desirability and viability: willingness to buy at a specific price point.',
    evidence: 'Mock sale without payment: moderate. Paid presale: stronger, though refunds and fulfillment remain unproven. Never report mock sales as revenue.',
    costTime: 'Moderate cost; illustrative duration 1–3 weeks.',
    metric: 'Illustration: at least 5 of 100 qualified prospects presented with the offer complete a paid pre-order; track refund requests.',
    source: 'Testing Business Ideas, Validation section, separates Mock Sale from Presale.',
  },
  {
    id: 'crowdfunding',
    group: 'validation',
    title: 'Crowdfunding',
    body: 'Ask backers to pledge funds toward a stated offering or reward tier.',
    risk: 'Desirability and viability: demand and early unit economics.',
    evidence: 'Strong when funds are collected; pledges can still cancel. Does not yet prove fulfillment, retention, or long-term profit.',
    costTime: 'Moderate to high cost; illustrative duration 3–8 weeks.',
    metric: 'Illustration: at least 30 paying backers at target price, with positive projected contribution margin after rewards, platform fees, and fulfillment.',
    source: 'Testing Business Ideas, Validation section.',
  },
  {
    id: 'loi',
    group: 'validation',
    title: 'Letter of intent (LOI)',
    body: 'A written statement of conditional commitment, commonly used in B2B or partner validation.',
    risk: 'Desirability and viability. Feasibility when validating key partners.',
    evidence: 'Moderate; depends on specificity, signing authority, budget, and binding terms. An LOI is not cash in the bank.',
    costTime: 'Low to moderate cost; illustrative duration 1–4 weeks.',
    metric: 'Illustration: at least 3 of 10 qualified B2B prospects sign an LOI specifying indicative pricing and pilot dates.',
    source: 'Testing Business Ideas, Validation section.',
  },
  {
    id: 'ab',
    group: 'validation',
    title: 'A/B test (split test)',
    body: 'Randomly assign two variants to measure causal impact on conversion, revenue, or operational metrics.',
    risk: 'Desirability and viability for conversion or revenue effects. Feasibility when testing operational metrics.',
    evidence: 'Moderate to strong for local effects when randomization and sample sizing are sound. Does not prove the entire business model.',
    costTime: 'Moderate cost; illustrative duration 1–4 weeks or longer.',
    metric: 'Illustration: at least a 10% relative conversion lift. Compute sample size from baseline and minimum detectable effect beforehand, and report uncertainty intervals.',
    source: 'Testing Business Ideas, Validation section, uses the term Split Test.',
  },
  {
    id: 'fakedoor',
    group: 'discovery',
    title: 'Fake door, feature stub, or 404 test',
    body: 'Place a button or CTA for an unbuilt feature, then immediately explain it is not yet available. Never prolong a misleading impression.',
    risk: 'Desirability: behavioral interest and feature prioritization. Does not test feasibility.',
    evidence: 'Moderate for click intent; low for purchase or retention.',
    costTime: 'Low cost; illustrative duration 2–7 days.',
    metric: 'Illustration: at least 5 of 100 qualified users exposed to the prompt click it. Track sign-ups separately.',
    source: 'Testing Business Ideas places Feature Stub and 404 Test in the Discovery section, though teams often use them as behavioral follow-up tests. "Fake door" is a practical synonym, not a verified book TOC heading.',
    classificationNote: true,
  },
  {
    id: 'mvp',
    group: 'validation',
    title: 'Single-feature MVP',
    body: 'One genuinely working core function deployed to learn from real field behavior.',
    risk: 'Desirability and feasibility. Viability if paid: usage, outcomes, and delivery costs.',
    evidence: 'Strong for pilot behavior. Generalizability, scale, and acquisition costs must still be tested.',
    costTime: 'High cost; illustrative duration 2–6 weeks or longer.',
    metric: 'Illustration: at least 6 of 10 users return in the next need cycle and at least 4 pay the target price; also track variable cost and reliability.',
    source: 'Testing Business Ideas, Validation section, plus Strategyzer guidance on selecting the next best test.',
  },
];

export const CLASSIFICATION_NOTE_EN = 'Ordering in this tool follows learning progression rather than an exact chapter split from the book. Testing Business Ideas places Simple Landing Page in the Validation section, even though email smoke tests can be exploratory. Feature Stub and 404 Test sit in Discovery, though they are often used as behavioral tests. "Fake door" is a practical synonym rather than a verified table-of-contents title. A/B testing is called Split Test in the book, and Presale is separated from Mock Sale.';

export const FIT_CHECKS_EN = [
  {
    id: 'problem-solution',
    title: 'Problem-Solution Fit',
    idLabel: 'Problem–Solution Fit',
    how: 'Look for evidence that important jobs, pains, and gains genuinely exist and that your proposed value map targets them. Relevant experiments: real-incident interviews, forums, search trends, storyboards, and paper prototypes; ads, explainer videos, or landing pages serve as triangulation. Sticky-note mapping and compliments never prove purchase intent or product-market fit. Canvas link scores only indicate on-paper design completeness — never turn them into a "product-market fit percentage."',
    experiments: ['interview', 'forums', 'search', 'storyboard', 'paper', 'ads', 'video', 'landing'],
  },
  {
    id: 'product-market',
    title: 'Product-Market Fit',
    idLabel: 'Product–Market Fit',
    how: 'Look for evidence that the offering truly relieves pains or creates gains, alongside traction and repeat usage matching the need cycle. Relevant experiments: concierge, Wizard of Oz, and single-feature MVP; transactions or presales paired with customer outcomes, retention, and repeat usage. Sign-ups, clicks, one-off purchases, or a single strong campaign are not enough. Presales do not prove post-use value. Strategyzer’s article "Survival of the fittest" cites pp. 48–49 of Value Proposition Design for its quoted printing; page numbers vary across printings. That reference applies across all three fit levels.',
    experiments: ['concierge', 'wizard', 'mvp', 'presales'],
  },
  {
    id: 'business-model',
    title: 'Business Model Fit',
    idLabel: 'Business Model Fit',
    how: 'Look for evidence that the value proposition sits inside a profitable and scalable business model. Relevant experiments: paid pilots or MVPs; presales or crowdfunding paired with cost analysis; A/B tests on channels or pricing; partner LOIs followed by real delivery; plus unit economics and operational capacity. Revenue is not profit. Positive margin in a small pilot does not prove large-scale economics, and manual operations do not prove automation.',
    experiments: ['mvp', 'presales', 'crowdfunding', 'ab', 'loi'],
  },
];

export const TESTING_CHECKLIST_EN = [
  { id: 'sticky-is-hypothesis', text: 'Every sticky note on the BMC and VPC is treated as a specific, falsifiable hypothesis — not fact.' },
  { id: 'lenses', text: 'Hypotheses are tagged desirability, feasibility, or viability, and complex assumptions are split apart.' },
  { id: 'risk-first', text: 'The riskiest assumptions (high importance, low evidence) are tested first.' },
  { id: 'test-card-first', text: 'The Test Card is completed before collecting data, including numerator, denominator, exclusions, timeframe, and success criteria.' },
  { id: 'cheap-test', text: 'Selected experiments are fast and affordable yet relevant; critical hypotheses are triangulated rather than tested only the easiest way.' },
  { id: 'learning-card', text: 'The Learning Card is filled out after the experiment, including limitations and a decision: persevere, iterate, pivot, or kill.' },
  { id: 'status-inconclusive', text: 'When sample size or instrumentation is inadequate, the status is recorded as "inconclusive" rather than pass or fail.' },
  { id: 'ps-fit', text: 'Problem-solution fit is judged by evidence that jobs, pains, and gains are real — not merely by canvas link scores.' },
  { id: 'pm-fit', text: 'Product-market fit requires evidence of usage and traction, not just interest, clicks, or one-off transactions.' },
  { id: 'bm-fit', text: 'Business model fit requires a repeatable, economically viable model covering costs, retention, and capacity.' },
  { id: 'update-canvas', text: 'Findings — including negative results — are used to update the canvas and design the next experiment.' },
  { id: 'ethics', text: 'Real-world tests obtain appropriate consent, minimize personal data, and avoid misleading participants (especially in fake doors, presales, and Wizard of Oz tests).' },
];

export const TEST_STATUSES_EN = [
  { id: 'planned', label: 'Planned' },
  { id: 'running', label: 'Running' },
  { id: 'supported', label: 'Supported' },
  { id: 'not-supported', label: 'Not supported' },
  { id: 'inconclusive', label: 'Inconclusive' },
];

export const DECISIONS_EN = [
  { id: 'persevere', label: 'Persevere' },
  { id: 'iterate', label: 'Iterate' },
  { id: 'pivot', label: 'Pivot' },
  { id: 'kill', label: 'Kill' },
];

export const TEST_CARD_FIELDS_EN = [
  { key: 'hypothesis', label: 'We believe that…', hint: 'Hypothesis that must be true', type: 'textarea' },
  { key: 'experiment', label: 'To verify that, we will…', hint: 'Experiment design', type: 'textarea' },
  { key: 'metric', label: 'And measure…', hint: 'Metric, including numerator and denominator', type: 'textarea' },
  { key: 'criteria', label: 'We are right if…', hint: 'Pre-set success criteria (numbers here are illustrative, not book benchmarks)', type: 'textarea' },
];

export const LEARNING_CARD_FIELDS_EN = [
  { key: 'believed', label: 'We believed that…', type: 'textarea' },
  { key: 'observed', label: 'We observed…', type: 'textarea' },
  { key: 'learned', label: 'From that we learned that…', type: 'textarea' },
  { key: 'decisionNote', label: 'Therefore, we will…', type: 'textarea' },
];

export const TESTING_ETHICS_EN = 'This section is a design guide, not authorization to run live ads, contact people, or collect payments. For real-world tests, obtain appropriate consent and minimize personal data. After someone clicks a fake door, clearly explain that the feature is not yet available; never prolong a deceptive impression. Presales and crowdfunding must clearly disclose product status, risks, timelines, and refund terms. Wizard of Oz tests must not conceal human processing of personal data; disclose and debrief participants afterward.';

export const TESTING_WORKFLOW_EN = 'Pick a block → write desirability, feasibility, or viability hypotheses → map importance vs. evidence → pick the riskiest assumption → fill out a Test Card → run the test → fill out a Learning Card → update the BMC or VPC → persevere, iterate, pivot, or kill.';

export const EXAMPLE_ASSUMPTIONS_EN = {
  vpd: [
    { id: 'vpd-a1', lens: 'desirability', text: 'Morning commute café queues are a top pain for urban office professionals.', source: 'Customer pains', importance: 5, evidence: 2 },
    { id: 'vpd-a2', lens: 'desirability', text: 'They will order ahead via the app to skip lines if drinks are ready on arrival.', source: 'Pain relievers', importance: 5, evidence: 1 },
    { id: 'vpd-a3', lens: 'desirability', text: 'Rp 18,000 for café-grade quality feels reasonable as a daily habit.', source: 'Gains / pain relievers', importance: 4, evidence: 2 },
    { id: 'vpd-a4', lens: 'desirability', text: 'Grab-and-go outlets in office lobbies and stations truly sit on this segment’s daily commute path.', source: 'Gain creators', importance: 4, evidence: 2 },
  ],
  bmc: [
    { id: 'bmc-a1', lens: 'desirability', text: 'Young urban office professionals form a large enough segment reachable via compact outlets and the mobile app.', source: 'Customer segments', importance: 5, evidence: 3 },
    { id: 'bmc-a2', lens: 'desirability', text: 'The proposition of "café-grade coffee, fast, zero queue, daily price" directly answers this segment’s jobs.', source: 'Value propositions', importance: 5, evidence: 2 },
    { id: 'bmc-a3', lens: 'feasibility', text: 'Nationwide taste standards can be maintained across many compact outlets; a "under 180 seconds" service target is an added illustration, not a case figure.', source: 'Key activities & resources', importance: 4, evidence: 2 },
    { id: 'bmc-a4', lens: 'viability', text: 'A Rp 18,000 price point covers ingredients, compact outlet rent, and app costs with repeatable positive margin.', source: 'Revenue & cost structure', importance: 5, evidence: 1 },
  ],
};

export const EXAMPLE_TEST_CARDS_EN = {
  vpd: [
    {
      id: 'vpd-t1',
      name: 'Queue & order-ahead test — Kopi AJIB (illustrative)',
      lens: 'desirability',
      hypothesis: 'Urban office professionals rank commute-hour queuing as a top pain and will order ahead via an app if drinks are ready upon arrival.',
      experiment: 'Interview 15 professionals across two office towers, followed by a two-week order-ahead landing-page smoke test in the same lobbies. Clearly disclose on the page that the product is not yet generally available.',
      metric: 'Numerator: interviewees ranking queuing as their #1 pain; qualified unique sign-ups. Denominator: total interviewees; qualified unique visitors. Exclude bots, internal staff, and duplicates.',
      criteria: 'Illustrative numbers, not book benchmarks: hypothesis supported if at least 10 of 15 interviewees rank queuing as a top pain and at least 50 qualified visitors sign up within 14 days. If traffic falls well below plan, mark inconclusive.',
      cost: 'Low — interview time and simple landing page',
      duration: '2 weeks (illustrative)',
      owner: 'Kopi AJIB learning team',
      status: 'planned',
    },
  ],
  bmc: [
    {
      id: 'bmc-t1',
      name: 'Compact outlet unit economics test — Kopi AJIB (illustrative)',
      lens: 'viability',
      hypothesis: 'A Rp 18,000 selling price in a compact 15–25 m² outlet generates sufficient contribution margin after ingredients, rent, and app fees at realistic office-lobby volumes.',
      experiment: 'Run a four-week pop-up kiosk in one office lobby: record daily cup volume, product mix, actual ingredient costs, rent, and staffing; compare against the canvas cost model.',
      metric: 'Cups per day, contribution per cup (revenue minus pre-defined variable costs), daily break-even point, and percentage of orders placed via the app.',
      criteria: 'Illustrative numbers, not book benchmarks: hypothesis supported if contribution per cup stays positive and daily volume reaches break-even on at least 12 of 20 workdays. If volume is too noisy to interpret, mark inconclusive.',
      cost: 'Moderate — pop-up lease and initial inventory',
      duration: '4 weeks (illustrative)',
      owner: 'Store operations team',
      status: 'planned',
    },
  ],
};

export const EXAMPLE_LEARNING_CARDS_EN = {
  vpd: [
    {
      id: 'vpd-l1',
      testCardId: 'vpd-t1',
      name: 'Order-ahead test learnings — Kopi AJIB (illustrative)',
      believed: 'Queuing is the primary pain, and office-lobby commuters will enthusiastically pre-register for mobile order-ahead.',
      observed: '12 of 15 interviewees ranked queuing and fear of arriving late to meetings as a top pain. Pre-registrations reached 61 in two weeks, though several expressed skepticism if the "ready on arrival" promise slips. No payment was requested yet.',
      learned: 'The queuing-pain hypothesis is strong for this segment and channel. App adoption appears contingent on reliable pickup-time promises. Willingness to pay remains untested, so product-market fit cannot yet be claimed.',
      decision: 'iterate',
      decisionNote: 'Iterate: tighten pickup-time reliability in the app and test the grab-and-go speed promise next (a "ready in 180 seconds" target is an added illustration, not a case figure), then run a transparent paid offer test.',
    },
  ],
  bmc: [
    {
      id: 'bmc-l1',
      testCardId: 'bmc-t1',
      name: 'Compact pop-up unit economics learnings — Kopi AJIB (illustrative)',
      believed: 'A Rp 18,000 price covers compact-outlet costs at office-lobby foot traffic.',
      observed: 'Contribution per cup was positive, but daily break-even was hit on only 9 of 20 workdays because midday volume dropped sharply after 10:00 AM.',
      learned: 'Pricing is not necessarily wrong; demand is heavily peak-loaded in the morning. The canvas revenue model assumed overly flat all-day demand. Positive per-cup margin in a small pilot does not prove scale.',
      decision: 'iterate',
      decisionNote: 'Iterate: adjust operating hours and morning bundle mix, then re-test break-even before signing a long-term lease.',
    },
  ],
};

export const TESTING_REFERENCES_EN = [
  {
    citation: 'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.',
    note: 'Canvas chapter (Customer Profile, Value Map, and Fit) and Test chapter (what to test, testing process, experiment library, and bringing it all together). Cited by chapter/section; print page numbers were not taken from an attached PDF unavailable in this workspace.',
  },
  {
    citation: 'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers. John Wiley & Sons.',
    note: 'The nine BMC building blocks capturing how an enterprise creates, delivers, and captures value. Print page numbers are omitted as unverified.',
  },
  {
    citation: 'Bland, D. J., & Osterwalder, A. (2019). Testing Business Ideas: A Field Guide for Rapid Experimentation. John Wiley & Sons.',
    note: 'Test section (hypotheses and assumptions mapping, experiments, learning, deciding, and ethics) and Experiments section (selecting tests, Discovery, Validation). Structure and method names follow the table of contents; per-experiment print page numbers are omitted as unverified.',
  },
  {
    citation: 'Osterwalder, A. (2015). Validate your ideas with The Test Card. Strategyzer. https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card',
    note: 'The four official Test Card fields: hypothesis, test, metric, and criteria.',
  },
  {
    citation: 'Amarsy, N. (2015). Capture (customer) insights and actions with The Learning Card. Strategyzer. https://www.strategyzer.com/library/capture-customer-insights-and-actions-with-the-learning-card',
    note: 'The four official Learning Card fields: hypothesis, observation, learnings & insights, and decisions & actions.',
  },
  {
    citation: 'Bland, D. J. (2020). How assumptions mapping can focus your teams on running experiments that matter. Strategyzer. https://www.strategyzer.com/library/how-assumptions-mapping-can-focus-your-teams-on-running-experiments-that-matter',
    note: 'Importance × evidence mapping; prioritize assumptions that are critical yet backed by little evidence.',
  },
  {
    citation: 'Osterwalder, A. (2017). How to systematically reduce the risk & uncertainty of new ideas. Strategyzer. https://www.strategyzer.com/library/how-to-systematically-reduce-the-risk-uncertainty-of-new-ideas',
    note: 'Definitions of desirability, feasibility, and viability and their link to the BMC.',
  },
  {
    citation: 'Bland, D. J. (2020). How to select the next best test from the Experiment Library. Strategyzer. https://www.strategyzer.com/library/how-to-select-the-next-best-test-from-the-experiment-library',
    note: 'Selecting the next best test: discovery vs. validation, experiment sequences, and strongest evidence within constraints.',
  },
  {
    citation: 'Amarsy, N. (2014). Survival of the fittest. Strategyzer. https://www.strategyzer.com/library/survival-of-the-fittest',
    note: 'Three levels of fit; the article cites pp. 48–49 of Value Proposition Design for its quoted printing; page numbers may vary across printings.',
  },
  {
    citation: 'IDEO.org. Design Kit (Human-Centered Design). https://www.designkit.org',
    note: 'Source of the desirability, feasibility, and viability lenses — referenced, for example, in the Design Kit method "Explore Scalability": https://www.designkit.org/methods/explore-scalability.html',
  },
];

export function getTestingLabContent(lang) {
  if (lang === 'en') {
    return {
      TESTING_INTRO: TESTING_INTRO_EN,
      TESTING_LENSES: TESTING_LENSES_EN,
      TESTING_STEPS: TESTING_STEPS_EN,
      EXPERIMENT_GROUPS: EXPERIMENT_GROUPS_EN,
      EXPERIMENT_TYPES: EXPERIMENT_TYPES_EN,
      CLASSIFICATION_NOTE: CLASSIFICATION_NOTE_EN,
      FIT_CHECKS: FIT_CHECKS_EN,
      TESTING_CHECKLIST: TESTING_CHECKLIST_EN,
      TEST_STATUSES: TEST_STATUSES_EN,
      DECISIONS: DECISIONS_EN,
      TEST_CARD_FIELDS: TEST_CARD_FIELDS_EN,
      LEARNING_CARD_FIELDS: LEARNING_CARD_FIELDS_EN,
      TESTING_ETHICS: TESTING_ETHICS_EN,
      TESTING_WORKFLOW: TESTING_WORKFLOW_EN,
      EXAMPLE_ASSUMPTIONS: EXAMPLE_ASSUMPTIONS_EN,
      EXAMPLE_TEST_CARDS: EXAMPLE_TEST_CARDS_EN,
      EXAMPLE_LEARNING_CARDS: EXAMPLE_LEARNING_CARDS_EN,
      TESTING_REFERENCES: TESTING_REFERENCES_EN,
    };
  }
  return {
    TESTING_INTRO,
    TESTING_LENSES,
    TESTING_STEPS,
    EXPERIMENT_GROUPS,
    EXPERIMENT_TYPES,
    CLASSIFICATION_NOTE,
    FIT_CHECKS,
    TESTING_CHECKLIST,
    TEST_STATUSES,
    DECISIONS,
    TEST_CARD_FIELDS,
    LEARNING_CARD_FIELDS,
    TESTING_ETHICS,
    TESTING_WORKFLOW,
    EXAMPLE_ASSUMPTIONS,
    EXAMPLE_TEST_CARDS,
    EXAMPLE_LEARNING_CARDS,
    TESTING_REFERENCES,
  };
}
