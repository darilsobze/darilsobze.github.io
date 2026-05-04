const portfolioData = {
  personal: {
    name: "Daril Vergesse Sobze Soffack",
    initials: "SSDV",
    title: "AI Engineer & CS Student",
    subtitle: "Bachelor Thesis @ Fraunhofer SIT · AI Engineer Intern @ IDAT",
    university: "Technical University Darmstadt",
    degree: "B.Sc. Computer Science — Expected Oct. 2026",
    email: "daril.sobze@stud.tu-darmstadt.de",
    phone: "+49 15736786726",
    linkedin: "https://linkedin.com/in/darilsobze",
    github: "https://github.com/darilsobze",
    photo: "Daril-IAS.jpg",
    bio: "I'm a Computer Science student at TU Darmstadt, concentrating in AI/Machine Learning and Data Systems. Currently writing my Bachelor's thesis at Fraunhofer SIT on synthetic audio detection using self-supervised learning, while building production RAG systems as an AI Engineer Intern at IDAT GmbH. I thrive at the intersection of research and engineering — turning complex AI concepts into systems that actually work.",
    concentrations: ["AI/Machine Learning", "Data Systems"],
    courses: ["Functional & OOP (1.0)", "Linear Algebra (1.7)", "Analysis & Combinatorics (1.3)", "Machine Learning (2.7)", "Computer Networks & Distributed Systems (1.3)"],
    languages: [
      { lang: "French", level: "Native", flag: "🇫🇷" },
      { lang: "English", level: "Business Fluent", flag: "🇬🇧" },
      { lang: "German", level: "Business Fluent", flag: "🇩🇪" }
    ],
    activities: [{ name: "SV Kamerun Darmstadt 1999", role: "Vice-Captain", period: "July 2024 – Present" }]
  },

  skills: {
    programming: ["Python", "Java", "C++", "HTML/CSS", "SQL"],
    aiml: ["Machine Learning", "LLM", "RAG", "NLP", "Fine-Tuning", "Self-Supervised Learning", "Signal Processing", "Agentic AI", "TF-IDF"],
    frameworks: ["PyTorch", "Scikit-learn", "Flask", "Tkinter"],
    tools: ["Docker", "Figma", "Bash", "REST APIs", "OpenAI API", "Vector Databases", "IBM WatsonX", "Scikit-learn"]
  },

  experience: [
    {
      id: "fraunhofer",
      company: "Fraunhofer SIT",
      role: "Bachelor Student (Thesis)",
      location: "Darmstadt, Germany",
      period: "April 2026 – Present",
      type: "research",
      color: "#00d4ff",
      icon: "🔬",
      bullets: [
        "Researching feature fusion techniques combining Self-Supervised Learning (SSL) and Spectral Features to improve synthetic audio detection.",
        "Building a detector that not just verifies if audio is fake or genuine, but also determines the source, generation method and model.",
        "Fraunhofer SIT is one of Germany's leading cybersecurity research institutes."
      ]
    },
    {
      id: "idat",
      company: "IDAT GmbH",
      role: "AI Engineer Intern",
      location: "Darmstadt, Germany",
      period: "March 2025 – Present",
      type: "work",
      color: "#10b981",
      icon: "🤖",
      bullets: [
        "Developed and productionized a Retrieval-Augmented Generation (RAG) System for enterprise knowledge search and Q&A across internal data sources.",
        "Designed custom data connectors for SharePoint, ClickUp, and internal websites, indexing 10,000+ documents into a vector database.",
        "Enabled 30+ employees to retrieve company documents and ask contextual questions in <5 seconds, significantly reducing manual search time.",
        "Integrated support tickets database (3000+ tickets) with natural-language queries and automated daily ingestion to keep 100% of data updated.",
        "Delivered technical presentations on AI, ML, and GenAI to 40+ colleagues to improve internal AI adoption."
      ]
    },
    {
      id: "tu-ta",
      company: "Technical University Darmstadt",
      role: "Teaching Assistant – Data Structures & Algorithms",
      location: "Darmstadt, Germany",
      period: "April 2026 – Sept. 2026",
      type: "teaching",
      color: "#7c3aed",
      icon: "🎓",
      bullets: [
        "Led weekly tutorial sessions for undergraduate students, explaining complex algorithmic concepts, Big O notation, data structures and algorithms implementations.",
        "Evaluated and graded programming assignments and exams, providing constructive feedback to improve students' coding proficiency."
      ]
    },
    {
      id: "studienkreis",
      company: "Studienkreis GmbH",
      role: "Mathematics Tutor",
      location: "Fürth, Germany",
      period: "March 2024 – May 2024",
      type: "teaching",
      color: "#f59e0b",
      icon: "📐",
      bullets: [
        "Supported students' academic growth in mathematics by fostering confidence and independence, resulting in more self-reliant learners."
      ]
    }
  ],

  projects: [
    {
      id: "hydra",
      name: "HYDRA",
      subtitle: "Data Analysis Automation for Medicinal Molecules",
      role: "Team Lead",
      period: "Oct. 2025 – Present",
      event: null,
      image: "Mass Spectrometry.png",
      pdf: "Project_Documentation (3).pdf",
      github: "https://github.com/TPSE-Team38/HYDRA",
      demo: null,
      tags: ["Python", "Signal Processing", "Machine Learning", "Data Analysis", "Scikit-learn"],
      tagline: "Automating drug discovery with AI-powered mass spectrometry analysis",
      description: "Leading a team automating protein mass spectrometry data analysis using signal processing and ML to accelerate drug discovery. Built a Python application capable of analyzing MS1 data with 708+ subfiles, including Chromatogram extraction and Gaussian fitting — dramatically reducing manual analysis time.",
      highlights: ["708+ subfiles processed automatically", "Chromatogram extraction pipeline", "Gaussian curve fitting for peak detection", "Accelerating pharmaceutical R&D"]
    },
    {
      id: "callpilot",
      name: "CALLPILOT AI",
      subtitle: "Autonomous Appointment Booking Agent",
      role: "Founder",
      period: "Feb. 2026",
      event: "Hack-Nation AI Hackathon, MIT",
      image: "callpilot.png",
      pdf: null,
      github: "https://github.com/darilsobze/callpilot-agent",
      demo: "https://www.linkedin.com/posts/darilsobze_callpilot-hackathon-aiagents-ugcPost-7427280873151963136-4kYv",
      tags: ["Agentic AI", "RAG", "OpenAI API", "Python", "Google Calendar API"],
      tagline: "AI agent that calls businesses and books your appointments",
      description: "Built at MIT's Hack-Nation AI Hackathon — an Autonomous Agentic System that scans for local service providers, makes automated phone calls on your behalf, and schedules appointments directly in Google Calendar. The agent navigates IVR systems, communicates naturally with staff, and handles scheduling end-to-end.",
      highlights: ["Autonomous service provider discovery", "AI-powered phone call automation", "Google Calendar integration", "Built in 24h at MIT Hackathon"]
    },
    {
      id: "hr-orchestrator",
      name: "HR Orchestrator",
      subtitle: "Agentic AI Hiring System",
      role: "Founder",
      period: "Jan. 2026 – Feb. 2026",
      event: "IBM Dev Day, Germany",
      image: "HR-Orchestrator.png",
      pdf: null,
      github: "https://github.com/darilsobze/IBM-Hackathon",
      demo: "https://www.linkedin.com/posts/darilsobze_ai-demystified-hackathon-ugcPost-7424171694228942848-KdIY",
      tags: ["IBM WatsonX", "Agentic AI", "REST APIs", "Orchestration"],
      tagline: "Three-agent AI system automating the entire hiring pipeline",
      description: "Built for IBM Dev Day Germany — an autonomous hiring system powered by IBM WATSONX ORCHESTRATE with three specialized mini-agents. Agent 1 posts jobs to Slack automatically. Agent 2 scores resumes against job requirements using LLM reasoning. Agent 3 sends personalized invitation/rejection emails to candidates.",
      highlights: ["IBM WatsonX ORCHESTRATE integration", "3 specialized AI mini-agents", "Automated Slack job posting", "AI resume scoring & email automation"]
    }
  ],

  papers: [
    {
      id: "ai-by-hand",
      name: "AI By Hand: Information Retrieval",
      period: "Sept. 2025",
      image: "Information retrieval.png",
      pdf: "Information_Retrieval_BY_HAND (5).pdf",
      tags: ["NLP", "TF-IDF", "Information Retrieval", "Cosine Similarity"],
      tagline: "Mathematical foundations of NLP search — built from scratch",
      description: "Computed TF-IDF vector spaces and Cosine Similarity matrices entirely from scratch to evaluate and demonstrate the mathematical foundations of natural language search algorithms. A rigorous by-hand exploration of how modern search engines rank and retrieve documents.",
      highlights: ["From-scratch TF-IDF implementation", "Cosine Similarity matrix computation", "Mathematical NLP foundations", "Vector space model analysis"]
    },
    {
      id: "select-then-match",
      name: "SELECT THEN MATCH",
      subtitle: "A New LLM-powered Entity Matching Framework",
      period: "Feb. 2025",
      image: "Select-then-match-archit (1).png",
      pdf: "Select_then_Match__LLM_powered_Entity_Matching (7).pdf",
      tags: ["LLM", "NLP", "Entity Matching", "GPT-5-Mini", "F1-Score"],
      tagline: "Boosting entity matching F1-score from 86.56 → 95.49",
      description: "Optimized an NLP entity resolution framework by identifying and mitigating 'false positive bias' in LLM list-wise selection prompts. Architected a novel Select-Then-Match pipeline that decouples candidate ranking from 6-shot verification — achieving a remarkable F1-score boost from 86.56 to 95.49 using GPT-5-Mini.",
      highlights: ["F1-score: 86.56 → 95.49 (+10.3%)", "Novel Select-Then-Match pipeline", "False positive bias identification & mitigation", "GPT-5-Mini integration with 6-shot verification"]
    },
    {
      id: "caesura",
      name: "Extending CAESURA",
      subtitle: "Robustness & Automated Trajectory Logging for SLM Fine-Tuning",
      period: "Feb. 2025",
      image: "CAESURA Data-Engine (1).png",
      pdf: "Extending_CAESURA__Robustness_and_Automated_Trajectory_Logging_for_SLM_Fine_Tuning.pdf",
      tags: ["LLM", "Fine-Tuning", "SLM", "Llama-3.3-70B", "Trajectory Logging"],
      tagline: "75% latency reduction · 60% token cost savings",
      description: "Engineered a pipeline for a multi-modal query planner that automatically intercepts execution traces to generate ChatML/JSONL datasets for Small Language Model (SLM) fine-tuning. Modernized the core LLM infrastructure by integrating open-weight Llama-3.3-70B, reducing average API latency by 75% and token costs by 60%.",
      highlights: ["75% API latency reduction", "60% token cost reduction", "Llama-3.3-70B integration", "Automated ChatML/JSONL dataset generation"]
    }
  ]
};

const graphData = {
  nodes: [
    { id: "Daril", label: "Daril V.S.S.", group: "person", size: 28, description: "CS Student at TU Darmstadt · AI Engineer @ IDAT · Bachelor Student @ Fraunhofer SIT" },
    { id: "Python", label: "Python", group: "skill", size: 16 },
    { id: "Machine Learning", label: "Machine\nLearning", group: "skill", size: 15 },
    { id: "RAG", label: "RAG", group: "skill", size: 14 },
    { id: "NLP", label: "NLP", group: "skill", size: 13 },
    { id: "LLM", label: "LLM", group: "skill", size: 17 },
    { id: "PyTorch", label: "PyTorch", group: "skill", size: 11 },
    { id: "Docker", label: "Docker", group: "skill", size: 10 },
    { id: "SQL", label: "SQL", group: "skill", size: 10 },
    { id: "Java", label: "Java", group: "skill", size: 10 },
    { id: "C++", label: "C++", group: "skill", size: 10 },
    { id: "Vector Databases", label: "Vector\nDBs", group: "skill", size: 13 },
    { id: "Flask", label: "Flask", group: "skill", size: 9 },
    { id: "REST APIs", label: "REST\nAPIs", group: "skill", size: 10 },
    { id: "Scikit-learn", label: "Scikit-learn", group: "skill", size: 11 },
    { id: "Signal Processing", label: "Signal\nProcessing", group: "skill", size: 12 },
    { id: "Self-Supervised Learning", label: "SSL", group: "skill", size: 12 },
    { id: "Fine-Tuning", label: "Fine-Tuning", group: "skill", size: 13 },
    { id: "OpenAI API", label: "OpenAI\nAPI", group: "skill", size: 12 },
    { id: "IBM WatsonX", label: "IBM\nWatsonX", group: "skill", size: 12 },
    { id: "TF-IDF", label: "TF-IDF", group: "skill", size: 9 },
    { id: "Data Analysis", label: "Data\nAnalysis", group: "skill", size: 12 },
    { id: "Agentic AI", label: "Agentic\nAI", group: "skill", size: 15 },
    { id: "Figma", label: "Figma", group: "skill", size: 8 },
    { id: "HYDRA", label: "HYDRA", group: "project", size: 20 },
    { id: "CALLPILOT AI", label: "CALLPILOT\nAI", group: "project", size: 20 },
    { id: "HR Orchestrator", label: "HR\nOrchestrator", group: "project", size: 20 },
    { id: "AI By Hand: IR", label: "AI By\nHand: IR", group: "paper", size: 16 },
    { id: "Select-Then-Match", label: "Select-Then\nMatch", group: "paper", size: 16 },
    { id: "CAESURA Extension", label: "CAESURA\nExtension", group: "paper", size: 16 },
    { id: "IDAT GmbH", label: "IDAT\nGmbH", group: "company", size: 22 },
    { id: "Fraunhofer SIT", label: "Fraunhofer\nSIT", group: "company", size: 22 },
    { id: "TU Darmstadt", label: "TU\nDarmstadt", group: "company", size: 22 }
  ],
  links: [
    { source: "Daril", target: "IDAT GmbH" },
    { source: "Daril", target: "Fraunhofer SIT" },
    { source: "Daril", target: "TU Darmstadt" },
    { source: "Daril", target: "HYDRA" },
    { source: "Daril", target: "CALLPILOT AI" },
    { source: "Daril", target: "HR Orchestrator" },
    { source: "Daril", target: "AI By Hand: IR" },
    { source: "Daril", target: "Select-Then-Match" },
    { source: "Daril", target: "CAESURA Extension" },
    { source: "Python", target: "HYDRA" },
    { source: "Machine Learning", target: "HYDRA" },
    { source: "Signal Processing", target: "HYDRA" },
    { source: "Data Analysis", target: "HYDRA" },
    { source: "Scikit-learn", target: "HYDRA" },
    { source: "Python", target: "CALLPILOT AI" },
    { source: "RAG", target: "CALLPILOT AI" },
    { source: "Agentic AI", target: "CALLPILOT AI" },
    { source: "OpenAI API", target: "CALLPILOT AI" },
    { source: "IBM WatsonX", target: "HR Orchestrator" },
    { source: "Agentic AI", target: "HR Orchestrator" },
    { source: "REST APIs", target: "HR Orchestrator" },
    { source: "TF-IDF", target: "AI By Hand: IR" },
    { source: "NLP", target: "AI By Hand: IR" },
    { source: "Python", target: "AI By Hand: IR" },
    { source: "NLP", target: "Select-Then-Match" },
    { source: "LLM", target: "Select-Then-Match" },
    { source: "OpenAI API", target: "Select-Then-Match" },
    { source: "LLM", target: "CAESURA Extension" },
    { source: "Fine-Tuning", target: "CAESURA Extension" },
    { source: "Flask", target: "CAESURA Extension" },
    { source: "RAG", target: "IDAT GmbH" },
    { source: "Vector Databases", target: "IDAT GmbH" },
    { source: "Docker", target: "IDAT GmbH" },
    { source: "LLM", target: "IDAT GmbH" },
    { source: "Python", target: "IDAT GmbH" },
    { source: "Signal Processing", target: "Fraunhofer SIT" },
    { source: "Self-Supervised Learning", target: "Fraunhofer SIT" },
    { source: "Machine Learning", target: "Fraunhofer SIT" },
    { source: "Java", target: "TU Darmstadt" },
    { source: "SQL", target: "TU Darmstadt" },
    { source: "Machine Learning", target: "TU Darmstadt" },
    { source: "Python", target: "Machine Learning" },
    { source: "Machine Learning", target: "LLM" },
    { source: "LLM", target: "RAG" },
    { source: "RAG", target: "Vector Databases" },
    { source: "Agentic AI", target: "LLM" },
    { source: "Fine-Tuning", target: "Machine Learning" },
    { source: "PyTorch", target: "Machine Learning" },
    { source: "NLP", target: "LLM" },
    { source: "Self-Supervised Learning", target: "Machine Learning" },
    { source: "OpenAI API", target: "LLM" }
  ]
};
