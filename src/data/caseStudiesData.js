export const CASE_STUDIES = [
  {
    id: "case-kopi-ajib",
    title: "Kopi AJIB: Building a National Retail Chain Powered by Artificial Intelligence",
    subtitle: "Universitas Katolik Atma Jaya & IPMI Business Case Study",
    category: "New Retail & AI Operations",
    readingTime: "15 min read",
    summary: "How an Indonesian coffee startup scaled from a single Jakarta outlet to 812 locations nationwide by synthesizing specialty coffee recipes, app-first ordering, and AI predictive supply chains.",
    context: {
      founded: "2019 in Jakarta, Indonesia",
      industry: "Quick-Service Retail Food & Beverage (New Retail)",
      outlets: "812 Outlets (as of 2024)",
      employees: "6,400 Employees",
      keyFounders: "Edward & Team (Inspired by high-growth Indonesian coffee unicorns)"
    },
    sections: [
      {
        title: "1. The Strategic Opportunity & Market Gap",
        body: `In 2019, the Indonesian urban beverage market was divided into two polarized extremes:
1. **Traditional Warung Kopi / Street Carts:** Highly affordable (Rp 3,000–5,000/cup), but using low-grade robusta, powdered mixes, and inconsistent hygiene.
2. **International & Artisanal Cafés (e.g., Starbucks):** Premium Arabica beans and comfortable seating, but priced at Rp 50,000+ per cup—an unsustainable daily expense for the rising urban middle class.

**Kopi AJIB positioned itself in the 'Empty Middle':** Freshly brewed, authentic espresso made with local Indonesian beans and fresh dairy/aren sugar, sold at **Rp 18,000–22,000**, with app-first pre-ordering and fast grab-and-go fulfillment.`
      },
      {
        title: "2. The Multi-Year Financial Turnaround (2021 – 2024)",
        body: `During 2021–2022, Kopi AJIB executed an aggressive land-grab strategy, funding outlet rollouts and app development via Series A and Series B venture capital. By 2023, the company pivoted from raw expansion to operational unit economics profitability.`,
        financialTable: [
          { metric: "Annual Revenue (Rp Miliar)", y2021: "342", y2022: "741", y2023: "1,180", y2024: "1,520" },
          { metric: "Cost of Goods Sold (COGS)", y2021: "174", y2022: "363", y2023: "555", y2024: "700" },
          { metric: "Gross Profit (Rp Miliar)", y2021: "168", y2022: "378", y2023: "625", y2024: "820" },
          { metric: "Gross Profit Margin (%)", y2021: "49.1%", y2022: "51.0%", y2023: "53.0%", y2024: "53.9%" },
          { metric: "Operating Expenses (OPEX)", y2021: "245", y2022: "436", y2023: "612", y2024: "742" },
          { metric: "Operating Income / EBIT", y2021: "-77 (Loss)", y2022: "-58 (Loss)", y2023: "+13 (Turnaround)", y2024: "+78 (Profitable)" }
        ]
      },
      {
        title: "3. Unit Economics & Customer Lifetime Value",
        body: `The transformation to profitability was driven by improvements in customer acquisition efficiency and digital retention:`,
        metricsComparison: [
          { label: "Customer Acquisition Cost (CAC)", y2022: "Rp 48,000", y2024: "Rp 31,000", change: "-35.4% improvement" },
          { label: "Customer Lifetime Value (CLV)", y2022: "Rp 190,000", y2024: "Rp 268,000", change: "+41.1% growth" },
          { label: "CLV : CAC Ratio", y2022: "4.0x", y2024: "8.6x", change: "+115% operating leverage" },
          { label: "Monthly Active App Users", y2022: "1.8 Million", y2024: "4.3 Million", change: "+138% expansion" },
          { label: "90-Day Retention Rate", y2022: "34%", y2024: "51%", change: "+17 percentage points" },
          { label: "App Share of Total Orders", y2022: "38%", y2024: "57%", change: "Dominant channel" }
        ]
      },
      {
        title: "4. The AI Technology Stack & Supply Chain Impact",
        body: `Kopi AJIB implemented an end-to-end data feedback loop across its 812 outlets:
• **Demand Forecasting Model:** Machine learning models predict hourly cup consumption per outlet using historical sales, regional rain forecasts, school calendars, and traffic congestion.
• **Geospatial Outlet Placement:** Evaluates foot traffic density and mobile telemetry to avoid sales cannibalization between adjacent stores.
• **Dynamic Barista Scheduling:** Frontline staff shifts align precisely with the 07:00–09:30 and 15:00–17:00 demand spikes.`,
        supplyChainMetrics: [
          { metric: "Ingredient Spoilage & Waste", beforeAI: "9.5%", afterAI: "3.8%", impact: "Saved ~Rp 39 Miliar annually" },
          { metric: "Monthly Stockouts per Store", beforeAI: "7.2 incidents", afterAI: "2.1 incidents", impact: "Fewer lost sales" },
          { metric: "Forecast Accuracy", beforeAI: "61%", afterAI: "88%", impact: "Precise roastery production" },
          { metric: "Warehouse-to-Store Lead Time", beforeAI: "18 Hours", afterAI: "11 Hours", impact: "Fresher dairy & beans" }
        ]
      },
      {
        title: "5. Porter's Five Forces Analysis",
        body: `Evaluating Kopi AJIB's structural competitive environment:
1. **Threat of New Entrants (HIGH):** Opening a basic coffee booth requires low capital (~Rp 50M). However, scaling beyond 50 outlets without proprietary software leads to supply chain collapse.
2. **Bargaining Power of Buyers (HIGH):** Consumers face zero switching costs; they can walk 50 meters to Janji Jiwa, Tomoro, or Point Coffee. Kopi AJIB counters this through app loyalty points and personalization.
3. **Bargaining Power of Suppliers (LOW-MODERATE):** Direct partnerships with farmer cooperatives in Aceh Gayo, Toraja, and Kintamani secure guaranteed volumes, insulating the company from wholesale spot market fluctuations.
4. **Threat of Substitutes (HIGH):** RTD bottled drinks, ready-to-drink tea, boba, and instant sachets.
5. **Industry Rivalry (VERY HIGH):** Intense price wars and aggressive promotional coupons across urban hubs.`
      }
    ],
    discussionQuestions: [
      {
        q: "In which business function did Artificial Intelligence deliver the highest bottom-line EBITDA impact for Kopi AJIB, and why?",
        guidance: "Examine the Supply Chain Waste reduction (dropping from 9.5% to 3.8% across Rp 700B COGS saves over Rp 39B directly) combined with the drop in CAC from 48k to 31k."
      },
      {
        q: "What is the primary risk of over-relying on algorithmic decisions in customer pricing and store staffing?",
        guidance: "Algorithmic pricing can alienate price-sensitive segments if perceived as unfair surge pricing; staff scheduling algorithms can dehumanize frontline workers if they do not account for human exhaustion or local emergencies."
      },
      {
        q: "If an SME competitor has only Rp 100M budget, how can they leverage 'Synthesis Innovation' to compete against Kopi AJIB without building custom AI software?",
        guidance: "Use off-the-shelf cloud POS (Moka/Pawoon), WhatsApp Business CRM automation, and hyperlocal community partnerships to provide warmth and bespoke personalization that corporate chains cannot match."
      }
    ]
  },
  {
    id: "case-ai-synthetic-persona",
    title: "AI in Entrepreneurship: Rapid Validation with Synthetic Customer Personas",
    subtitle: "Atma Jaya & Steve Blank Customer Development Workshop",
    category: "AI & Startup Prototyping",
    readingTime: "10 min read",
    summary: "How student founders use structured prompt engineering and LLM personas to stress-test customer interview guides and discover hidden market friction before spending money.",
    context: {
      framework: "Steve Blank Customer Discovery + Generative AI",
      targetAudience: "University student innovators & pre-seed founders",
      tooling: "Prompt Engineering, Persona Simulation, Visual Mockup Generators"
    },
    sections: [
      {
        title: "1. The Student Market Research Dilemma",
        body: `University students and novice founders consistently struggle with traditional market research:
• Tiny, biased sample sizes (only asking roommates or close friends).
• Polite respondents giving false encouragement ('Sure, I would totally buy that!').
• High cost and slow turnaround of professional market research agencies.

By using Generative AI as a **Synthetic Customer Persona**, founders can role-play tough, skeptical customer interviews at zero cost.`
      },
      {
        title: "2. The Synthetic Persona Prompt Architecture",
        body: `To extract realistic objections rather than generic praise, the prompt must specify:
1. **Demographic Context:** Age, occupation, monthly disposable income, city of residence.
2. **Behavioral Habits:** Current tools and spending patterns.
3. **Core Skepticism Directive:** Instructing the model to actively poke holes, raise price sensitivity, and refuse to commit unless severe pain is solved.

*Sample Prompt:* 'You are a 22-year-old undergraduate in Semanggi, Jakarta, with a monthly pocket money of Rp 2,500,000. You love iced coffee but cannot afford Starbucks. I am interviewing you about your daily purchase decisions. Be critical, skeptical, and do not flatter me.'`
      },
      {
        title: "3. The Ethical Boundary: AI Preparation vs. Real Human Validation",
        body: `Generative AI accelerates preparation, helps write interview questions, and spots edge-case objections. However, **synthetic personas do not have real bank accounts.** Real problem-solution fit and customer validation requires actual human beings paying real money or signing binding pre-orders.`
      }
    ],
    discussionQuestions: [
      {
        q: "Why can't synthetic AI personas replace real human Customer Discovery interviews?",
        guidance: "AI personas hallucinate or reflect statistical averages rather than genuine human emotional friction, and they cannot provide real financial transactions or commitment."
      }
    ]
  }
];
