export const QUIZZES = [
  {
    id: "quiz-0",
    courseId: "mod-0",
    title: "Module 0: Mindset & Orientation Diagnostic",
    description: "Assess your baseline comprehension of entrepreneurial principles and risk orientation.",
    questions: [
      {
        id: "q0-1",
        question: "According to Donald F. Kuratko, how is Entrepreneurial Self-Efficacy (ESE) best defined?",
        options: [
          "The amount of personal financial capital a founder is willing to risk.",
          "An individual's cognitive belief in their ability to successfully perform entrepreneurial roles and tasks.",
          "The ability to convince external venture capitalists without having a minimum viable product.",
          "A psychological trait that is strictly genetic and cannot be altered or developed."
        ],
        correctAnswer: 1,
        explanation: "Entrepreneurial Self-Efficacy (ESE) is the cognitive self-belief that an individual can execute the tasks necessary to start and scale a venture. It is a trainable capability, not merely an inborn trait."
      },
      {
        id: "q0-2",
        question: "Which of the following represents a key element of 'The Dark Side of Entrepreneurship'?",
        options: [
          "Guaranteed market failure due to government regulations.",
          "Personal financial exposure, extreme emotional uncertainty, and relationship strain.",
          "The legal requirement to share 50% of equity with initial employees.",
          "Inability to obtain intellectual property protection in retail industries."
        ],
        correctAnswer: 1,
        explanation: "The dark side of entrepreneurship encompasses founder burnout, personal financial exposure, chronic stress under extreme uncertainty, and social strain."
      },
      {
        id: "q0-3",
        question: "How does entrepreneurial management fundamentally differ from traditional corporate management?",
        options: [
          "Entrepreneurship relies entirely on intuition while corporate management uses computers.",
          "Corporate managers seek to maximize shareholder dividends, whereas entrepreneurs avoid profit.",
          "Entrepreneurial management focuses on rapid opportunity pursuit and discovery under uncertainty, while traditional management focuses on optimizing resources in predictable markets.",
          "There is no difference; the titles are interchangeable in modern business."
        ],
        correctAnswer: 2,
        explanation: "Traditional management optimizes established business models in predictable environments; entrepreneurial management navigates discovery and value creation under high uncertainty."
      }
    ]
  },
  {
    id: "quiz-1",
    courseId: "mod-1",
    title: "Module 1: Evolution & Concepts of Entrepreneurship",
    description: "Test your understanding of historical theories, Cantillon, Say, and Schumpeter.",
    questions: [
      {
        id: "q1-1",
        question: "What did Joseph Schumpeter mean by the term 'Creative Destruction' (schöpferische Zerstörung)?",
        options: [
          "Entrepreneurs physically destroy existing manufacturing equipment to build new factories.",
          "The continuous economic process wherein innovative products and processes displace stagnant, outdated incumbent businesses.",
          "The destructive impact of hyperinflation on small retail stores during recessions.",
          "Government intervention aimed at dismantling private corporate monopolies."
        ],
        correctAnswer: 1,
        explanation: "Schumpeter argued that entrepreneurial innovation drives economic evolution by continually revolutionizing the economic structure from within, destroying the old one and creating a new one."
      },
      {
        id: "q1-2",
        question: "Richard Cantillon (1755) is credited with first formalizing the entrepreneur as:",
        options: [
          "A software engineer creating automated tools.",
          "A risk-bearing arbitrageur who buys at known fixed prices and sells at uncertain future prices.",
          "A government-backed tax collector managing royal commerce.",
          "A passive shareholder in international shipping ventures."
        ],
        correctAnswer: 1,
        explanation: "Cantillon identified risk and price uncertainty as the defining mark of the entrepreneur who commits capital at known cost with uncertain return."
      },
      {
        id: "q1-3",
        question: "What distinction did Jean-Baptiste Say emphasize regarding the role of the entrepreneur?",
        options: [
          "Shifting economic resources from an area of lower productivity to an area of higher productivity and greater yield.",
          "Focusing purely on gold and currency exchange arbitrage.",
          "Refusing to borrow debt from commercial banks.",
          "Operating strictly within agricultural commodities."
        ],
        correctAnswer: 0,
        explanation: "Say emphasized that the entrepreneur coordinates land, labor, and capital to lift resources into higher productivity and value creation."
      }
    ]
  },
  {
    id: "quiz-2",
    courseId: "mod-2",
    title: "Module 2: The Innovation Imperative & 4Ps",
    description: "Check your mastery of Bessant & Tidd's 4Ps and Kuratko's 4 Types of Innovation.",
    questions: [
      {
        id: "q2-1",
        question: "Which type of innovation involves combining existing concepts from different industries into a brand-new value proposition?",
        options: [
          "Invention",
          "Duplication",
          "Synthesis",
          "Extension"
        ],
        correctAnswer: 2,
        explanation: "Synthesis innovation recombines proven ideas, technologies, and business practices into a novel customer offering without needing basic scientific laboratory inventions."
      },
      {
        id: "q2-2",
        question: "According to Bessant & Tidd, transitioning a coffee chain from sit-down cafés to app-first grab-and-go fulfillment represents which of the 4Ps?",
        options: [
          "Product Innovation",
          "Position Innovation or Paradigm Innovation",
          "Price Innovation",
          "Patent Innovation"
        ],
        correctAnswer: 1,
        explanation: "Changing how the business delivers value and the mental model of how coffee is purchased represents Position and Paradigm innovation."
      },
      {
        id: "q2-3",
        question: "Why does Bessant & Tidd argue that innovation is an 'Imperative' rather than an option?",
        options: [
          "Because intellectual property laws expire after 1 year in all countries.",
          "Because competitive advantage is inherently temporary as markets and technologies evolve.",
          "Because venture capitalists legally prohibit non-innovative businesses from operating.",
          "Because consumer prices drop automatically by 50% each quarter."
        ],
        correctAnswer: 1,
        explanation: "Competitive advantage naturally erodes over time. Without continuous innovation, incumbents are inevitably superseded by faster-moving competitors."
      }
    ]
  },
  {
    id: "quiz-4",
    courseId: "mod-4",
    title: "Module 4: Customer Discovery & Validation (Steve Blank)",
    description: "Verify your knowledge of non-leading interviews, problem-solution fit, and 'GOOB'.",
    questions: [
      {
        id: "q4-1",
        question: "What is the primary principle behind Steve Blank's mantra: 'Get Out of the Building'?",
        options: [
          "Founders should avoid working in offices to save on commercial lease expenses.",
          "There are no validated customer facts inside the building; only unverified founder opinions.",
          "Physical outdoor retail locations always generate higher sales than digital apps.",
          "Venture capital pitch presentations must be conducted outside corporate boardrooms."
        ],
        correctAnswer: 1,
        explanation: "Steve Blank emphasizes that all internal business plan assumptions are merely unproven hypotheses until validated through direct interaction with real prospective buyers."
      },
      {
        id: "q4-2",
        question: "When conducting a Customer Discovery interview, what type of question should you rigorously avoid?",
        options: [
          "Asking about the last time they experienced the problem.",
          "Asking how much money or time they currently spend trying to solve the problem.",
          "Asking: 'If we built an app with feature X, would you buy it?'",
          "Asking what workarounds they currently use."
        ],
        correctAnswer: 2,
        explanation: "Asking hypothetical future questions ('Would you buy this?') prompts polite false-positive answers. Effective discovery investigates verified past behavior and actual spending."
      },
      {
        id: "q4-3",
        question: "What is the key milestone that concludes the Customer Discovery phase?",
        options: [
          "IPO on the national stock exchange.",
          "Reaching Problem-Solution Fit with verified customer willingness to pay.",
          "Filing for utility patents across five continents.",
          "Hiring 50 enterprise sales representatives."
        ],
        correctAnswer: 1,
        explanation: "Customer Discovery concludes when you have verified that a high-value customer segment exists and your value proposition solves their urgent problem (Problem-Solution Fit)."
      }
    ]
  },
  {
    id: "quiz-7",
    courseId: "mod-7",
    title: "Module 7: Market Sizing & Industry Attractiveness",
    description: "Calculate TAM/SAM/SOM and analyze competitive dynamics using Porter's Five Forces.",
    questions: [
      {
        id: "q7-1",
        question: "Which of the following correctly describes bottom-up market sizing?",
        options: [
          "Taking a published global research report and assuming you will capture 1% of the market.",
          "Multiplying target customer units by verified average spend per customer and realistic distribution reach.",
          "Dividing current corporate taxes by national GDP.",
          "Calculating the total net worth of the top 10 richest individuals in the country."
        ],
        correctAnswer: 1,
        explanation: "Bottom-up sizing builds from empirical units, customer counts, realistic channel velocity, and pricing, making it transparent and credible."
      },
      {
        id: "q7-2",
        question: "In the Kopi AJIB case study, why is the 'Threat of Substitutes' considered significant in the retail beverage sector?",
        options: [
          "Because coffee cannot legally be consumed after 2:00 PM.",
          "Because consumers can easily fulfill their caffeine or refreshment needs with instant coffee sachets, bottled tea, boba, or energy drinks at zero switching cost.",
          "Because all coffee beans in Indonesia are exclusively exported overseas.",
          "Because coffee packaging materials are heavily taxed compared to other beverages."
        ],
        correctAnswer: 1,
        explanation: "Substitutes are alternative products satisfying the same underlying consumer need (refreshment/caffeine) with low or zero switching costs."
      }
    ]
  },
  {
    id: "quiz-10",
    courseId: "mod-10",
    title: "Module 10: Startup Unit Economics & Capital Math",
    description: "Evaluate CAC, CLV, burn rate, and determine if a venture is ready to scale.",
    questions: [
      {
        id: "q10-1",
        question: "A venture spends Rp 300,000,000 on digital advertising and acquires 10,000 new paying customers in one month. What is its CAC?",
        options: [
          "Rp 3,000",
          "Rp 30,000",
          "Rp 300,000",
          "Rp 10,000"
        ],
        correctAnswer: 1,
        explanation: "CAC = Total Acquisition Marketing Spend ÷ Total New Customers Acquired = Rp 300,000,000 ÷ 10,000 = Rp 30,000."
      },
      {
        id: "q10-2",
        question: "If a retail venture has a CAC of Rp 31,000 and a customer lifetime value (CLV) of Rp 268,000, what is the CLV:CAC ratio and how should an investor view it?",
        options: [
          "0.11x; the company is burning cash unsustainably.",
          "8.65x; an exceptionally healthy unit economic return indicating strong retention and room to accelerate marketing.",
          "1.0x; the venture is exactly at breakeven with zero gross margin.",
          "25x; the venture should immediately shut down its marketing operations."
        ],
        correctAnswer: 1,
        explanation: "CLV ÷ CAC = 268,000 ÷ 31,000 ≈ 8.65x. The standard benchmark is 3x or higher. An 8.6x ratio indicates high retention, strong customer value, and substantial operating leverage."
      },
      {
        id: "q10-3",
        question: "If a startup has Rp 1,200,000,000 in the bank and is incurring a net monthly cash burn of Rp 150,000,000, what is its remaining runway?",
        options: [
          "4 months",
          "8 months",
          "12 months",
          "16 months"
        ],
        correctAnswer: 1,
        explanation: "Runway = Cash Reserves ÷ Net Monthly Burn Rate = 1,200,000,000 ÷ 150,000,000 = 8 months."
      }
    ]
  }
];
