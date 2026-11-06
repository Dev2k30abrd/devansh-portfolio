"use client";

import { motion, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowDown,
  ArrowUpRight,
  Download,
  GraduationCap,
  Briefcase,
  Award,
  BadgeCheck,
  Cpu,
  Layers,
  Database,
  Terminal,
  Code2,
  Sparkles,
  Check,
  Copy,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  ExternalLink,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState, useSyncExternalStore } from "react";
import CinematicBackground from "@/components/CinematicBackground";

/* ─────────────────────────────────────────────────────────────
   Types & Data Definitions
───────────────────────────────────────────────────────────── */
interface Project {
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
}

const NAV_ITEMS = [
  { id: "hero", label: "Overview" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

const ROTATING_ROLES = [
  "AI Engineer",
  "Full-Stack Developer",
  "AI/ML Developer",
  "Software Engineer",
];

const EXPERIENCE_DATA = [
  {
    role: "Backend & Systems Engineering Intern",
    company: "Gaddr",
    location: "Remote",
    period: "Production Engagement",
    type: "Industry Experience",
    badge: "Production Backend",
    summary:
      "Contributed to core production backend services, feature releases, and infrastructure stability.",
    responsibilities: [
      "Engineered production backend microservices in Python and Node.js, delivering reliable, high-throughput REST API endpoints and data serialization pipelines.",
      "Developed and shipped the selective recap summary engine, aggregating and generating structured platform activity highlights for end users.",
      "Assisted senior infrastructure engineers in server migration workflows, validating environment configurations, database backups, and executing zero-downtime service cutovers.",
      "Optimized query performance and documented API contracts to enhance service resilience and cross-team collaboration.",
    ],
    tech: ["Python", "Node.js", "REST APIs", "Server Migration", "SQL", "Microservices"],
  },
  {
    role: "AI/ML Engineering Intern",
    company: "STEMbotix Pvt. Ltd.",
    location: "Gandhinagar, Gujarat · On-site",
    period: "July 2026",
    type: "Industry Internship",
    badge: "Edge AI & LLM Systems",
    summary:
      "Researched foundation LLMs, built an AI virtual lab, and engineered RAG-grounded code generation.",
    responsibilities: [
      "Benchmarked and systematically evaluated leading foundation LLMs (OpenAI, Claude, Gemini, Qwen, Llama, Mistral) to identify optimal speed, cost, and accuracy thresholds for automated hardware synthesis.",
      "Architected and engineered the AI-based ESP32 Virtual Lab, integrating interactive browser circuit simulation, Blockly visual programming, and natural language-to-Arduino code synthesis.",
      "Engineered a high-performance FastAPI backend interfacing with Ollama for local LLM inference, employing prompt engineering to achieve sub-second circuit schematic generation.",
      "Implemented RAG-based semantic retrieval using vector embeddings to eliminate pinout hallucinations and guarantee valid circuit wiring topologies.",
    ],
    tech: ["FastAPI", "Ollama", "Local LLMs", "RAG", "Blockly", "ESP32 / Arduino", "Python"],
  },
  {
    role: "AI Research Intern",
    company: "RV University",
    location: "Bangalore · Remote",
    period: "June 2026 – July 2026",
    type: "Academic Research",
    badge: "Cybercrime & ML Research",
    summary:
      "Collaborated in a research team developing intrusion detection systems evaluated on benchmark datasets.",
    responsibilities: [
      "Collaborated within a 5-member research cohort to build an AI-based Cybercrime and Intrusion Prediction System evaluated on the CICIDS2017 benchmark dataset.",
      "Engineered temporal traffic flow features, session statistics, and anomaly indicators to detect multi-class attack patterns across complex network traces.",
      "Evaluated supervised machine learning classifiers and NLP-inspired sequence models to identify malicious network payloads with high precision.",
      "Co-authored comprehensive research publications, methodology documentations, and model evaluation comparative reports.",
    ],
    tech: ["Python", "Scikit-learn", "CICIDS2017", "Temporal Features", "Pandas", "NLP / ML"],
  },
];

const FEATURED_PROJECTS: Project[] = [
  {
    title: "Anshora",
    subtitle: "Autonomous Multi-Agent Business Development & Intelligence Platform",
    category: "Multi-Agent AI",
    badge: "Featured System",
    description:
      "An autonomous multi-agent enterprise platform designed for strategic business development, competitive intelligence, and automated company analysis. Coordinates specialized AI agents to autonomously extract data, evaluate financials, model competitors, and generate executive reports.",
    highlights: [
      "Orchestrates specialized autonomous agents via multi-agent communication protocols",
      "Performs deep competitive intelligence and automated market research synthesis",
      "Integrates vector search and RAG for hallucination-resistant financial report generation",
    ],
    tech: ["Python", "Multi-Agent Orchestration", "FastAPI", "LLMs", "Vector Search", "FAISS"],
    github: "https://github.com/Dev2k30abrd",
  },
  {
    title: "AI-Based Cyber Crime & Intrusion Prediction",
    subtitle: "Network Threat Classification on Benchmark CICIDS2017 Dataset",
    category: "Applied ML & Security",
    badge: "Research Project",
    description:
      "A high-precision predictive cybersecurity and network intrusion detection system evaluated against the benchmark CICIDS2017 dataset. Utilizes temporal feature engineering and supervised machine learning architectures to classify multi-class cyber attacks.",
    highlights: [
      "Rigorous data preprocessing and temporal flow feature extraction on millions of network packets",
      "Benchmark validation on CICIDS2017 intrusion vectors with detailed precision/recall scoring",
      "Co-authored technical documentation and research architecture",
    ],
    tech: ["Python", "Scikit-learn", "CICIDS2017", "Pandas", "Temporal Engineering", "NumPy"],
    github: "https://github.com/Dev2k30abrd",
  },
  {
    title: "AI-Based ESP32 Virtual Lab",
    subtitle: "Interactive Hardware Simulation with Local LLM & RAG Code Generation",
    category: "Edge AI & IoT",
    badge: "Hardware & Software",
    description:
      "A virtual embedded systems engineering lab combining interactive circuit simulation, Blockly visual programming, and prompt-driven Arduino C++ code generation. Powered by a local Ollama inference engine and semantic RAG retrieval.",
    highlights: [
      "Natural language prompts synthesized into executable Arduino C++ code and circuit wiring",
      "Local inference execution via Ollama and FastAPI for secure, offline-capable embedded prototyping",
      "RAG-grounded component pinout retrieval to eliminate electronic wiring errors",
    ],
    tech: ["FastAPI", "Ollama", "RAG", "Blockly", "Arduino C++", "Python", "React"],
    github: "https://github.com/Dev2k30abrd",
  },
  {
    title: "Flood Risk Decision Support System",
    subtitle: "Predictive Geospatial Modeling for Environmental Risk Mitigation",
    category: "Predictive Analytics",
    badge: "Decision Support",
    description:
      "A machine learning-driven decision support system designed to quantify hydrological vulnerability and forecast regional flood risk probabilities, providing actionable insights for disaster preparedness and municipal response planning.",
    highlights: [
      "In-depth exploratory data analysis (EDA) and multi-variable geospatial feature engineering",
      "Predictive modeling pipeline generating calibrated vulnerability risk scores",
      "Interactive Streamlit analytical dashboard for real-time risk scenario simulation",
    ],
    tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/Dev2k30abrd",
  },
  {
    title: "Advanced SQL Business Intelligence Engine",
    subtitle: "High-Volume Transaction Analysis & Revenue Optimization",
    category: "Data Systems",
    badge: "Data Modeling",
    description:
      "Enterprise SQL analytical engine evaluating 20,000+ e-commerce transaction records. Employs common table expressions (CTEs), window functions (RANK, DENSE_RANK, ROW_NUMBER), and partition-based aggregations to uncover revenue trends.",
    highlights: [
      "Engineered modular analytical queries across customers, orders, products, and regional sales",
      "Generated executive KPI metrics including monthly growth velocity and customer lifetime value",
      "Optimized query execution plans and database schema normalization",
    ],
    tech: ["MySQL", "Advanced SQL", "CTEs", "Window Functions", "Data Modeling"],
    github: "https://github.com/Dev2k30abrd",
  },
];

const SKILL_CATEGORIES = [
  {
    category: "AI & Machine Learning",
    icon: Sparkles,
    skills: [
      "Multi-Agent Systems",
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering",
      "Vector Search & FAISS",
      "Local Inference (Ollama)",
      "Explainable AI (XAI)",
      "Feature Engineering",
      "Supervised & Unsupervised Learning",
      "Model Evaluation & Metrics",
    ],
  },
  {
    category: "Backend & Systems",
    icon: Terminal,
    skills: [
      "FastAPI",
      "Python",
      "RESTful API Design",
      "Node.js",
      "Server Migration",
      "API Performance Optimization",
      "Microservices Architecture",
      "Linux / Bash",
      "Zero-Downtime Deployment",
    ],
  },
  {
    category: "Data & Database Engineering",
    icon: Database,
    skills: [
      "PostgreSQL",
      "MySQL",
      "Advanced SQL (CTEs, Window Functions)",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Data Modeling",
      "Data Cleaning & EDA",
      "Matplotlib & Seaborn",
    ],
  },
  {
    category: "Frontend & Full-Stack",
    icon: Code2,
    skills: [
      "TypeScript",
      "React",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Framer Motion",
      "Blockly Integration",
      "HTML5 / CSS3",
      "Responsive UI Architecture",
    ],
  },
  {
    category: "Engineering Tools & DevOps",
    icon: Layers,
    skills: [
      "Git & GitHub",
      "Docker (Basics)",
      "VS Code",
      "Streamlit",
      "Postman",
      "CI/CD Workflows",
      "Technical Documentation",
    ],
  },
];

/* Verified Certifications with exact provided URLs */
const VERIFIED_CERTIFICATIONS = [
  {
    title: "Microsoft Certified: Azure AI Apps and Agents Developer Associate — AI-103",
    issuer: "Microsoft",
    year: "2026",
    badge: "Official Associate Certification",
    isMicrosoft: true,
    verificationUrl:
      "https://learn.microsoft.com/en-in/users/devanshrai-9874/credentials/certification/azure-ai-apps-and-agents-developer-associate?wt.mc_id=certnurture_eml14_email_wwl&tab=credentials-tab&source=docs",
  },
  {
    title: "Microsoft Applied Skills Credential",
    issuer: "Microsoft",
    year: "2026",
    badge: "Applied Skills Credential",
    isMicrosoft: true,
    verificationUrl:
      "https://learn.microsoft.com/en-in/users/devanshrai-9874/credentials/35ecccdbcbf9777b",
  },
  {
    title: "Python for Data Science and Machine Learning Bootcamp",
    issuer: "Udemy",
    year: "2026",
    badge: "Verified Course Credential",
    isMicrosoft: false,
    verificationUrl: "https://ude.my/UC-16ae6c55-3f2c-493f-8585-214015e7c272",
  },
  {
    title: "BCGX Data Science Job Simulation",
    issuer: "Forage / Boston Consulting Group",
    year: "2026",
    badge: "Industry Job Simulation",
    isMicrosoft: false,
    verificationUrl:
      "https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/Tcz8gTtprzAS4xSoK_SKZxezskWgmFjRvj9_69dd26447aa245d389b1a8f3_1777052010754_completion_certificate.pdf",
  },
];

const ACHIEVEMENTS_DATA = [
  {
    title: "National Finalist — Synapse Data Science & ML Hackathon",
    issuer: "Scaler School of Technology · Ascent 2026",
    description:
      "Selected as national finalist among premier engineering cohorts across India, competing in predictive machine learning and end-to-end data pipeline challenges.",
  },
];

/* ── Section Header Eyebrow (Clean & Human) ── */
function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      <span>{label}</span>
    </div>
  );
}

/* ── Lightweight Scroll Reveal ── */
function Reveal({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 3D Interactive Project Card ── */
function ProjectCard3D({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="human-card relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between h-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] group shadow-sm transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {project.category}
            </span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              <Github size={17} />
            </a>
          </div>

          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
            {project.title}
          </h3>

          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
            {project.subtitle}
          </p>

          <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="space-y-2.5 mb-8 p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
              Engineering Architecture
            </span>
            {project.highlights.map((hl, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5 border-t border-[var(--border-subtle)]">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] text-zinc-600 dark:text-zinc-400 border border-[var(--border-subtle)]"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            <span>View Source Repository</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;

        if (scrollY < 100) {
          setActiveSection((prev) => (prev === sectionIds[0] ? prev : sectionIds[0]));
          return;
        }

        if (winHeight + scrollY >= docHeight - 80) {
          const lastId = sectionIds[sectionIds.length - 1];
          setActiveSection((prev) => (prev === lastId ? prev : lastId));
          return;
        }

        let bestId = "";
        let maxRatio = 0;
        visibleRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestId = id;
          }
        });

        if (bestId && maxRatio > 0.05) {
          setActiveSection((prev) => (prev === bestId ? prev : bestId));
        }
      },
      {
        rootMargin: "-18% 0px -38% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection(SECTION_IDS);

  const [roleIndex, setRoleIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const lastScrollY = useRef(0);
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rotating role subtitle for Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  // Prevent background scrolling while profile modal is open, and restore when closed
  useEffect(() => {
    if (isProfileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isProfileOpen]);

  // Scroll direction detection: hide on scroll down (> 80px), reveal on scroll up
  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollY.current = Math.max(0, window.scrollY);
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      // If programmatic anchor navigation is active, preserve visibility and skip checks
      if (isNavigatingRef.current) {
        lastScrollY.current = currentScrollY;
        ticking = false;
        return;
      }

      // Always show near top of the page (within 80px)
      if (currentScrollY <= 80) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;
      const threshold = 12; // Avoid micro-trackpad jitter / flickering

      if (Math.abs(diff) >= threshold) {
        if (diff > 0 && currentScrollY > 80) {
          // Scrolling down beyond 80px -> smoothly hide header
          setIsHeaderVisible(false);
        } else if (diff < 0) {
          // Scrolling up -> smoothly reveal header
          setIsHeaderVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  // Keyboard accessibility and click outside dismissal for Menu and Profile Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isProfileOpen) {
          setIsProfileOpen(false);
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isProfileOpen]);

  // Subtle pointer-responsive parallax for Hero 3D depth
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  // Programmatic silky smooth scroll handler without wheel interference
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    isNavigatingRef.current = true;

    if (targetId === "hero") {
      setIsHeaderVisible(true);
    }

    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
      if (typeof window !== "undefined") {
        lastScrollY.current = Math.max(0, window.scrollY);
        if (window.scrollY <= 80) {
          setIsHeaderVisible(true);
        }
      }
    }, 850);
  };

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const theme = useSyncExternalStore(
    (callback) => {
      if (typeof document === "undefined") return () => {};
      const observer = new MutationObserver(() => callback());
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => (typeof document !== "undefined" && document.documentElement.classList.contains("light") ? "light" : "dark"),
    () => "dark"
  );

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      try {
        localStorage.setItem("devansh_theme", "light");
      } catch {}
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      try {
        localStorage.setItem("devansh_theme", "dark");
      } catch {}
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("raidevansh90@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const shouldShowHeader = isHeaderVisible || isMenuOpen;

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
      {/* ── Scroll-Reactive Cinematic Background System ── */}
      <CinematicBackground activeSection={activeSection} />

      {/* ── Fixed Header with Scroll-Direction Hide / Reveal ── */}
      <header
        ref={headerRef}
        onFocusCapture={() => setIsHeaderVisible(true)}
        style={{
          transform: shouldShowHeader ? "translateY(0)" : "translateY(-100%)",
          opacity: shouldShowHeader ? 1 : 0,
          transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity",
        }}
        className={`fixed top-0 left-0 right-0 z-50 bg-[var(--bg-page)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] motion-reduce:!transition-none ${
          shouldShowHeader ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between relative">
          {/* LEFT: Devansh Rai branding opens Profile Photograph Modal without navigating */}
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg text-left"
            aria-label="View Devansh Rai profile photograph"
            aria-haspopup="dialog"
          >
            Devansh Rai
          </button>

          {/* RIGHT: Header Resume Button & Expandable Menu Button */}
          <div className="flex items-center gap-2.5">
            {/* Latest Resume Button */}
            <a
              href="/Devansh%20rai_Resume.pdf"
              download="Devansh_Rai_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm font-medium text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer select-none"
              aria-label="Download Resume"
            >
              <Download size={16} />
              <span>Resume</span>
            </a>

            {/* Clearly visible Menu button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="header-dropdown-menu"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm font-medium text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer select-none"
            >
              <span>Menu</span>
              {isMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* Expandable Dropdown Panel */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="header-dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-[calc(100%+0.5rem)] right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-2xl bg-[var(--bg-surface)]/95 backdrop-blur-xl border border-[var(--border-subtle)] p-3 shadow-2xl z-50"
              >
                <nav aria-label="Main Navigation" className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] sm:text-[16px] font-medium transition-all ${
                          isActive
                            ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold"
                            : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                        )}
                      </a>
                    );
                  })}
                </nav>

                {/* Dark/Light Theme Toggle */}
                <div className="pt-3 mt-2 border-t border-[var(--border-subtle)] flex items-center justify-between px-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Theme
                  </span>
                  {mounted && (
                    <button
                      type="button"
                      onClick={toggleTheme}
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer shadow-sm"
                    >
                      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                      <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Centered Profile Photograph Modal ── */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Devansh Rai Profile Photograph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsProfileOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md sm:max-w-lg w-full max-h-[90vh] flex flex-col items-center rounded-3xl bg-zinc-950/95 border border-white/15 p-4 sm:p-5 shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                aria-label="Close profile modal"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 transition shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Profile Photograph Container using object-fit: contain */}
              <div className="relative w-full h-[62vh] sm:h-[68vh] max-h-[580px] flex items-center justify-center my-1">
                <Image
                  src="/selfpic%20compress.jpeg"
                  alt="Devansh Rai Profile Photograph"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 480px, 520px"
                  className="object-contain rounded-2xl select-none"
                />
              </div>

              {/* Elegant Caption */}
              <div className="pt-3 text-center border-t border-white/10 w-full mt-1">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Devansh Rai
                </h3>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">
                  AI Engineer &amp; Full-Stack Developer
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Brandon-Inspired Minimal & Cinematic)
      ══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 text-center z-10 scroll-mt-24 overflow-hidden"
      >
        {/* Subtle Pointer-Responsive Parallax Layer for 3D depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none float-gentle"
          style={{
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        <div className="flex flex-col items-center max-w-5xl mx-auto w-full relative z-10">
          {/* Main Headline: Brandon-Inspired Personal Identity */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-zinc-950 dark:text-white uppercase leading-none select-none"
          >
            I&apos;M DEVANSH RAI
          </motion.h1>

          {/* Smooth Animated Role Line (Zero layout shift) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-10 sm:h-12 md:h-14 flex items-center justify-center overflow-hidden my-4 sm:my-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={ROTATING_ROLES[roleIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-amber-500 dark:text-amber-400 tracking-tight"
              >
                {ROTATING_ROLES[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Personal Statement Quote: Clean, larger font, no bordered quote card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="max-w-3xl mx-auto mt-6 sm:mt-8 mb-4 sm:mb-6 px-4"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-zinc-800 dark:text-zinc-100 leading-snug">
              &ldquo;Keep learning. Keep building. The earning will follow.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Subtle Scroll Down Indicator */}
        <motion.a
          href="#about"
          onClick={(e) => handleNavClick(e, "about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          aria-label="Scroll down to About section"
          className="absolute bottom-6 sm:bottom-8 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
        >
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.a>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. ABOUT SECTION (Warm & Thoughtfully Art-Directed)
      ══════════════════════════════════════════════════════════ */}
      <section id="about" className="relative z-10 py-32 px-6 border-y border-[var(--border-subtle)] transition-colors duration-300 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionBadge label="About &amp; Core Philosophy" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-12 max-w-3xl leading-tight">
              Engineering with curiosity, discipline, and a focus on real-world utility.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7 space-y-6">
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-[var(--bg-surface)]/85 dark:bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] p-7 sm:p-8 shadow-sm space-y-5 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  <p>
                    I am an <strong className="text-zinc-950 dark:text-white font-bold">AI Engineer and Full-Stack Developer</strong> driven by a passion for creating reliable, purposeful software. My work bridges the frontiers of modern artificial intelligence—<span className="text-indigo-600 dark:text-indigo-400 font-semibold">multi-agent workflows</span>, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">RAG architectures</span>, and <span className="text-indigo-600 dark:text-indigo-400 font-semibold">local model inference</span>—with production backend systems.
                  </p>
                  <p>
                    Through engagements at <strong className="text-zinc-900 dark:text-zinc-100">Gaddr</strong>, <strong className="text-zinc-900 dark:text-zinc-100">STEMbotix</strong>, and research at <strong className="text-zinc-900 dark:text-zinc-100">RV University</strong>, I have contributed to production backend microservices, investigated zero-downtime server migrations, and conducted intrusion detection benchmarks using temporal flow modeling.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    I prioritize clarity, clean abstractions, and measurable impact over buzzwords. Every project is an opportunity to learn deeper, build stronger, and contribute to meaningful technology.
                  </p>
                </div>
              </Reveal>

              {/* Education Card */}
              <Reveal delay={0.25} className="pt-4">
                <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 sm:p-8 shadow-sm">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mt-1 shrink-0">
                      <GraduationCap size={26} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <h3 className="font-bold text-zinc-950 dark:text-white text-lg sm:text-xl">
                          Bachelor of Technology (Honors) in Data Science
                        </h3>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          2024 – 2028
                        </span>
                      </div>
                      <p className="text-base text-zinc-600 dark:text-zinc-300">
                        Chhattisgarh Swami Vivekanand Technical University (CSVTU), Bhilai
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Core Pillars */}
            <div className="md:col-span-5 space-y-5">
              <Reveal delay={0.15}>
                <div className="human-card rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
                    <Cpu size={22} />
                    <h3 className="font-bold text-zinc-950 dark:text-white text-lg">Autonomous AI Systems</h3>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Designing multi-agent frameworks where specialized agents collaborate, gather competitive intelligence, and generate verified executive insights.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="human-card rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
                    <Terminal size={22} />
                    <h3 className="font-bold text-zinc-950 dark:text-white text-lg">Production Backends</h3>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Developing high-throughput REST APIs, implementing selective recap engines, and supporting zero-downtime database and server migrations.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="human-card rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
                    <Database size={22} />
                    <h3 className="font-bold text-zinc-950 dark:text-white text-lg">Applied Data &amp; Research</h3>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Extracting temporal features from benchmark datasets, benchmarking state-of-the-art LLMs, and performing partition-based SQL analytics.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. EXPERIENCE SECTION
      ══════════════════════════════════════════════════════════ */}
      <section id="experience" className="relative z-10 py-32 px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionBadge label="Career &amp; Research" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
              Where I&apos;ve contributed and built.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mb-14">
              Verified production engineering, AI embedded systems development, and academic cybersecurity research.
            </p>
          </Reveal>

          <div className="space-y-10">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <Reveal key={exp.company + exp.role} delay={idx * 0.1}>
                <div className="human-card rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 sm:p-10 shadow-sm relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          {exp.badge}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-zinc-600 dark:text-zinc-400">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-2">
                          <Briefcase size={16} />
                          {exp.company}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={15} /> {exp.location}
                        </span>
                        <span>·</span>
                        <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{exp.type}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-[var(--bg-surface-elevated)] px-4 py-2 rounded-xl border border-[var(--border-subtle)]">
                      <Calendar size={15} className="text-indigo-600 dark:text-indigo-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-base text-zinc-700 dark:text-zinc-300 font-medium mb-6">
                    {exp.summary}
                  </p>

                  <ul className="space-y-3.5 mb-8 pl-1">
                    {exp.responsibilities.map((item, pIdx) => (
                      <li key={pIdx} className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed flex items-start gap-3">
                        <ChevronRight size={17} className="text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[var(--border-subtle)]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mr-2">
                      Core Technologies:
                    </span>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-zinc-700 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. SKILLS SECTION
      ══════════════════════════════════════════════════════════ */}
      <section id="skills" className="relative z-10 py-32 px-6 border-y border-[var(--border-subtle)] transition-colors duration-300 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionBadge label="Technical Skills" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
              Tools &amp; Engineering Stack
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mb-14">
              Grouped systematically across artificial intelligence, systems engineering, databases, and full-stack tools.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Reveal key={cat.category} delay={i * 0.08}>
                  <div className="human-card rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 h-full flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center gap-3.5 mb-6">
                        <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                          <Icon size={22} />
                        </div>
                        <h3 className="font-bold text-zinc-950 dark:text-white text-lg">
                          {cat.category}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-zinc-700 dark:text-zinc-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. FEATURED PROJECTS SECTION (With 3D Motion Depth)
      ══════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative z-10 py-32 px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionBadge label="Selected Projects" />
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
                  Featured Engineering Systems
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
                  Real implementations in multi-agent orchestration, cybersecurity benchmark evaluation, and local LLM hardware simulation.
                </p>
              </div>
              <a
                href="https://github.com/Dev2k30abrd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition shrink-0"
              >
                <span>All Repositories on GitHub</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURED_PROJECTS.map((proj, idx) => (
              <Reveal key={proj.title} delay={idx * 0.08}>
                <ProjectCard3D project={proj} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. CERTIFICATIONS & ACHIEVEMENTS SECTION (All 4 Verified Links)
      ══════════════════════════════════════════════════════════ */}
      <section id="certifications" className="relative z-10 py-32 px-6 border-y border-[var(--border-subtle)] transition-colors duration-300 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionBadge label="Verified Credentials" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
              Certifications &amp; Honors
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mb-14">
              Direct verification links to official Microsoft credentials, comprehensive bootcamps, and industry job simulations.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {VERIFIED_CERTIFICATIONS.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 0.08}>
                <div
                  className={`human-card rounded-3xl p-8 flex flex-col justify-between h-full bg-[var(--bg-surface)] border shadow-sm ${
                    cert.isMicrosoft
                      ? "border-indigo-500/30 ring-1 ring-indigo-500/10"
                      : "border-[var(--border-subtle)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          cert.isMicrosoft
                            ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-[var(--border-subtle)]"
                        }`}
                      >
                        {cert.badge}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-[var(--bg-surface-elevated)] text-zinc-500 dark:text-zinc-400 border border-[var(--border-subtle)]">
                        {cert.year}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                        <BadgeCheck size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zinc-950 dark:text-white leading-snug mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--border-subtle)] mt-4">
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-2xl font-bold text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition group"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Hackathon Achievement Card */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl p-8 sm:p-9 bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <Award size={26} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                      Hackathon Recognition
                    </span>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                      {ACHIEVEMENTS_DATA[0].title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {ACHIEVEMENTS_DATA[0].issuer} — {ACHIEVEMENTS_DATA[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. CONTACT SECTION
      ══════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-32 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl">
              <SectionBadge label="Initiate Contact" />

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
                Let&apos;s build something meaningful together.
              </h2>

              <p className="text-zinc-600 dark:text-zinc-300 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                Open to worldwide opportunities across AI, Software Engineering, and Full-Stack Development. Feel free to reach out directly.
              </p>

              {/* Direct Communication Channels (NO phone number) */}
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-left">
                <a
                  href="mailto:raidevansh90@gmail.com"
                  className="p-5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-indigo-500/40 transition group"
                >
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit mb-3 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <Mail size={20} />
                  </div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Direct Email</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">raidevansh90@gmail.com</div>
                </a>

                <a
                  href="https://www.linkedin.com/in/devansh-rai-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-indigo-500/40 transition group"
                >
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit mb-3 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <Linkedin size={20} />
                  </div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">LinkedIn Profile</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">devansh-rai-ai</div>
                </a>

                <a
                  href="https://www.instagram.com/rai._.devansh?cplk=dXVlOTNreGYxdTk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-indigo-500/40 transition group"
                >
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit mb-3 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <Instagram size={20} />
                  </div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Instagram</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">rai._.devansh</div>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:raidevansh90@gmail.com?subject=Opportunity%20Inquiry%20%E2%80%94%20Devansh%20Rai"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02]"
                >
                  <Mail size={18} />
                  <span>Send Direct Email</span>
                </a>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl font-medium text-sm text-zinc-700 dark:text-zinc-300 bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] hover:border-indigo-500/40 transition-all hover:scale-[1.02]"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={18} className="text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} className="text-zinc-400" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER (Zero AI Branding, Independent & Professional)
      ══════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-14 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-600/20 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              DR
            </div>
            <div>
              <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Devansh Rai
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                AI Engineer | Full-Stack Developer
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <a
              href="https://github.com/Dev2k30abrd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/devansh-rai-ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/rai._.devansh?cplk=dXVlOTNreGYxdTk1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-2.5 rounded-xl hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:raidevansh90@gmail.com"
              aria-label="Email Devansh Rai"
              className="p-2.5 rounded-xl hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <p>© {new Date().getFullYear()} Devansh Rai. All rights reserved.</p>
          <p>Engineered with Next.js 16, React 19, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
