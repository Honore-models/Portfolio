export const site = {
  name: "NIYOGUSHIMWA Honore",
  shortName: "NH",
  title: "AI/ML Engineer and Software Developer",
  email: "honoreniyogushimwa63@gmail.com",
  location: "Kigali, Rwanda",
  tagline: "Building intelligent systems and scalable software solutions.",
  social: {
    github: "https://github.com/honore-models",
    linkedin: "https://www.linkedin.com/in/niyogushimwa-honore-8427b339a/",
    twitter: "https://x.com/NIYOGUSHIMWAHo1",
    email: "honoreniyogushimwa63@gmail.com",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  bio: "I'm an AI/ML Engineer and Software Developer passionate about building intelligent systems and scalable software solutions. I specialize in machine learning, deep learning, data engineering, and modern web development to turn ideas into impactful products.",
  skills: [
    { name: "Python", level: "Expert", color: "#FACC15" },
    { name: "TypeScript", level: "Advanced", color: "#3178C6" },
    { name: "React", level: "Advanced", color: "#61DAFB" },
    { name: "Next.js", level: "Advanced", color: "#FFFFFF" },
    { name: "Java", level: "Intermediate", color: "#ED8B00" },
    { name: "FastAPI", level: "Advanced", color: "#009688" },
    { name: "Express JS", level: "Intermediate", color: "#68A063" },
    { name: "Machine Learning", level: "Advanced", color: "#3178C6" },
  ],
  tools: [
    "TensorFlow",
    "Git",
    "scikit-learn",
    "Docker",
    "Tailwind CSS",
    "Express.js",
    "PostgreSQL",
    "Redis",
  ],
};

export const stackTop = [
  { name: "MLOps", accent: "#38BDF8" },
  { name: "Python", accent: "#60A5FA" },
  { name: "TypeScript", accent: "#3178C6" },
  { name: "React", accent: "#61DAFB" },
  { name: "Next.js", accent: "#FFFFFF" },
];

export const stackBottom = [
  { name: "FastAPI", accent: "#34D399" },
  { name: "Express JS", accent: "#68A063" },
  { name: "Java", accent: "#ED8B00" },
  { name: "SQL", accent: "#60A5FA" },
  { name: "Docker", accent: "#38BDF8" },
];

export const projects = [
  {
    id: 4,
    category: "SaaS",
    title: "Dinely",
    subtitle: "AI-Powered Restaurant Management SaaS",
    description:
      "Restaurant management platform designed to help restaurants streamline operations, manage orders and services, and make smarter decisions using intelligent automation.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    metrics: [
      { value: "94.2%", label: "Accuracy" },
      { value: "10x", label: "Time Saved" },
      { value: "1,200+", label: "Clients Served" },
    ],
    overlay: { title: "AI EVALUATION COMPLETED", detail: "Top Match Found" },
    image: "/project_images/dinely.png",
    liveUrl: "https://dinely5.vercel.app/",
    sourceUrl: "https://github.com/Honore-models/Dinely",
  },
  {
    id: 1,
    category: "NLP",
    title: "TALVO AI",
    subtitle: "AI-Powered Recruitment SaaS",
    description:
      "An AI-powered recruitment platform designed to help HR teams streamline candidate screening, evaluation, and hiring workflows. Talvo AI combines modern web technologies with large language models to provide intelligent assistance throughout the recruitment process.",
    tech: [
      "Python",
      "TypeScript",
      "Next.js",
      "Django",
      "Tailwind CSS",
      "OpenAI",
      "Qwen",
    ],
    metrics: [
      { value: "94.2%", label: "Screening Accuracy" },
      { value: "10x", label: "Time Saved" },
      { value: "1,200+", label: "Candidates Evaluated" },
    ],
    overlay: { title: "AI EVALUATION COMPLETED", detail: "Top Match Found" },
    image: "/project_images/Screenshot 2026-08-08 155121.png",
    liveUrl: "https://talvo.onrender.com/",
    sourceUrl: "https://github.com/Honore-models/umurava-project",
  },
  {
    id: 5,
    category: "NLP",
    title: "INZIRA AI",
    subtitle: "AI-Powered Youth Opportunity Platform",
    description:
      "An AI-powered platform that connects Rwandan youth seeking opportunities to government funding institutions. Built with Gemma 4, it leverages natural language processing to match users with relevant funding programs and guide them through the application process.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Gemma 4"],
    metrics: [
      { value: "AI", label: "Smart Matching" },
      { value: "100%", label: "Free Access" },
      { value: "10x", label: "Faster Discovery" },
    ],
    overlay: { title: "AI OPPORTUNITY MATCH", detail: "Funding Program Found" },
    image: "/project_images/inzira_logo.png",
    liveUrl: "https://inzira-red.vercel.app/",
    sourceUrl: "https://github.com/Honore-models/Inzira",
  },

  {
    id: 2,
    category: "NLP",
    title: "SCAM SHIELD AI",
    subtitle: "AI-Powered Scam Detection",
    description:
      "An AI-powered system designed to identify and analyze potentially fraudulent or scam-related content. The project explores the use of language models and machine-learning techniques to assist users in detecting suspicious messages and identifying potential scam patterns.",
    tech: [
      "Python",
      "TypeScript",
      "Next.js",
      "Django",
      "Tailwind CSS",
      "OpenAI",
      "Qwen",
    ],
    metrics: [
      { value: "98.9%", label: "Detection Rate" },
      { value: "< 150ms", label: "Response Latency" },
      { value: "15k+", label: "Scams Blocked" },
    ],
    overlay: { title: "THREAT DETECTED", detail: "Phishing Attempt Blocked" },
    image: "/project_images/scam_shield.jpg",
    liveUrl: "#",
    sourceUrl: "#",
  },

  {
    id: 3,
    category: "AI Agent",
    title: "MINESWEEPER AI",
    subtitle: "Intelligent Game-Solving Agent",
    description:
      "An AI system designed to play and solve Minesweeper by analyzing the game state, identifying safe moves, and making decisions based on available information. The project demonstrates the application of artificial intelligence and algorithmic reasoning to game environments.",
    tech: ["Python"],
    metrics: [
      { value: "100%", label: "Win Rate (Easy)" },
      { value: "84.5%", label: "Win Rate (Hard)" },
      { value: "0.02s", label: "Avg Decision Time" },
    ],
    overlay: { title: "SOLVER ACTIVE", detail: "Solving Board State" },
    image: "/project_images/minesweeper.jpg",
    liveUrl: "#",
    sourceUrl: "#",
  },
];

export const certifications = [
  {
    id: 1,
    title: "Microsoft Azure AI Essentials",
    provider: "Microsoft & LinkedIn",
    year: "2026",
    color: "#00A4EF",
    accent: "#5CC8F5",
    image: "/certificates/microsoft-azure-ai.png",
    logo: "/logos/microsoft-linkedin.png",
  },
  {
    id: 2,
    title: "CS50 AI with Python",
    provider: "Harvard University",
    year: "2026",
    color: "#A51C30",
    accent: "#E05A6A",
    image: "/certificates/cs50-ai.png",
    logo: "/logos/harvard-cs50.png",
  },
  {
    id: 3,
    title: "Python Developer Certification",
    provider: "freeCodeCamp",
    year: "2026",
    color: "#0A0A23",
    accent: "#67E8F9",
    image: "/certificates/freecodecamp-python.png",
    logo: "/logos/freecodecamp-seal.png",
  },
  {
    id: 4,
    title: "Global AI Hackathon Finalist",
    provider: "USAII",
    year: "2026",
    color: "#E85D04",
    accent: "#F48C06",
    image: "/certificates/usaii-finalist.png",
    logo: "/logos/usaii.png",
  },
  {
    id: 5,
    title: "ICSC Participation Certificate",
    provider: "International CS Competition",
    year: "2026",
    color: "#38BDF8",
    accent: "#7DD3FC",
    image: "/certificates/icsc.png",
    logo: "/logos/icsc.png",
  },
  {
    id: 6,
    title: "iLead Leadership Program",
    provider: "Maxwell Leadership Foundation",
    year: "2026",
    color: "#7C3AED",
    accent: "#A78BFA",
    image: "/certificates/ilead.png",
    logo: "/logos/ilead.png",
  },
  {
    id: 7,
    title: "Deeplearning AI Math4ML",
    provider: "Deeplearning AI",
    year: "2026",
    color: "#f35574",
    accent: "#f5cece",
    image: "/certificates/Deeplearning.ai.png",
    logo: "/logos/deeplogo.png",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Don Jesus",
    role: "Head of AI, GreenEarth Labs",
    quote:
      "Honore delivered ForestGuard with remarkable rigor. The model accuracy and production readiness exceeded our expectations and directly accelerated our conservation work.",
    color: "#F59E0B",
  },
  {
    id: 2,
    name: "IHIMWE Rocky",
    role: "CTO, HealthSync",
    quote:
      "Working with Honore on MedLLM was transformative. He bridges research-grade NLP with practical clinical constraints better than anyone I've collaborated with.",
    color: "#A855F7",
  },
  {
    id: 3,
    name: "AGABA Happy",
    role: "VP Engineering, StreamCast",
    quote:
      "VoiceMesh went from prototype to production under Honore's leadership. His MLOps discipline and clarity under pressure made the difference.",
    color: "#38BDF8",
  },
  {
    id: 4,
    name: "BATAKARIZA Jane",
    role: "Director of Data, RetailNova",
    quote:
      "PulseRank delivered measurable engagement lift within weeks. Honore's systems thinking and experimentation culture raised the bar for our entire team.",
    color: "#34D399",
  },
];

export const experience = [
  {
    role: "Independent AI / ML Developer",
    company: "Rwanda Coding Academy - Second Year",
    period: "2026 - Now",
    points: [
      "Designing and developing AI/ML solutions for real-world applications.",
      "Experimenting with machine learning, deep learning, NLP, computer vision, LLMs, and generative AI.",
      "Developing and evaluating models through data preprocessing, training, validation, and performance analysis.",
      "Exploring LLM fine-tuning, RAG pipelines, and AI model deployment.",
      "Continuously researching emerging AI techniques and applying them through hands-on projects.",
    ],
  },
  {
    role: "AI & Machine Learning Student",
    company: "Rwanda Coding Academy - First Year",
    period: "2025 - 2026",
    points: [
      "Studying the mathematical and computational foundations of Machine Learning and Artificial Intelligence.",
      "Developing practical skills in supervised learning, unsupervised learning, deep learning, NLP, computer vision, and generative AI.",
      "Implementing machine-learning concepts from scratch using Python and NumPy to develop a deeper understanding of how models work.",
      "Building AI projects that apply machine learning to real-world problems.",
      "Exploring modern AI technologies including Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), model fine-tuning, and speech AI.",
      "Working with frameworks and tools including TensorFlow, Keras, PyTorch, Hugging Face, and Python ML libraries.",
    ],
  },
];

export const services = [
  "Large Language Models",
  "Computer Vision",
  "Natural Language Processing",
  "Deep Learning Systems",
  "Full-Stack Web Development",
  "API Development & Integration",
  "MLOps & Deployment",
];
