"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  ArrowDown,
  GraduationCap,
  Briefcase,
  Award,
  BadgeCheck,
  Cpu,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Design tokens
   bg / surface / border are near-black graphite, not pure black.
   accent is a muted copper — a nod to circuit boards & solder,
   used sparingly (signature color, not a glow-everything neon).
───────────────────────────────────────────────────────── */
const c = {
  bg: "#0A0B0D",
  surface: "#131519",
  surface2: "#191C21",
  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.14)",
  text: "#E9EAEC",
  muted: "#9198A3",
  mutedDim: "#666D78",
  accent: "#C9945B",
  accentSoft: "rgba(201,148,91,0.12)",
  accentBorder: "rgba(201,148,91,0.35)",
};

/* ── active section tracking for side rail ── */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.35 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ── scroll-reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── section label: mono, terminal-flavored eyebrow ── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-2 justify-center md:justify-start"
      style={{ fontFamily: "'IBM Plex Mono', monospace", color: c.accent }}
    >
      <span className="opacity-60">{"//"}</span> {children}
    </p>
  );
}

const NAV = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    title: "Programming",
    items: ["Python", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "LLMs",
      "RAG",
      "Prompt Engineering",
      "Explainable AI",
      "Feature Engineering",
      "Classification",
      "Regression",
      "Model Evaluation",
    ],
  },
  {
    title: "Frameworks",
    items: ["FastAPI"],
  },
  {
    title: "Libraries",
    items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
  },
  {
    title: "Database",
    items: ["MySQL", "FAISS"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Ollama", "Blockly", "Streamlit"],
  },
];

const EXPERIENCE = [
  {
    role: "AI/ML Intern",
    org: "STEMbotix Pvt. Ltd.",
    location: "Gandhinagar, Gujarat · On-site",
    period: "July 2026 · 1 Month",
    points: [
      "Researched and benchmarked leading LLMs (OpenAI, Claude, Gemini, Qwen, Llama, Mistral) to identify optimal models for AI-assisted embedded systems development.",
      "Engineered an AI-based ESP32 Virtual Lab featuring drag-and-drop circuit simulation, Blockly visual programming, and automated Arduino code generation from natural language prompts.",
      "Built a FastAPI backend integrating Ollama for local LLM inference, applying prompt engineering to power real-time AI-driven circuit generation.",
      "Implemented RAG-based semantic search to improve component retrieval accuracy and contextual relevance of AI-generated circuits.",
    ],
  },
  {
    role: "Summer Internship Program",
    org: "RV University, Bangalore",
    location: "Remote",
    period: "June 2026 – July 2026 · 2 Months",
    points: [
      "Collaborated in a 5-member team to develop an AI-based Cybercrime Prediction System using the CICIDS2017 benchmark dataset.",
      "Conducted literature review to identify research gaps and contributed to machine learning model development.",
      "Performed data preprocessing, feature engineering, and model evaluation for network intrusion detection.",
      "Co-authored the research paper and technical documentation with the project team.",
    ],
  },
];

const PROJECTS = [
  {
    title: "AI-Powered ESP32 Virtual Lab",
    tag: "LLM / RAG",
    desc: "Drag-and-drop circuit simulator with Blockly visual programming and natural-language-to-Arduino-code generation, backed by a FastAPI + Ollama inference layer and RAG-based component retrieval.",
    href: "https://github.com/Dev2k30abrd",
  },
  {
    title: "Flood Risk Decision Support System",
    tag: "Python · Streamlit",
    desc: "Machine-learning-powered flood risk assessment system supporting disaster preparedness, built on top of thorough EDA, preprocessing, and feature engineering.",
    href: "https://github.com/Dev2k30abrd/Flood-Risk-Decision-Support-System",
  },
  {
    title: "Smart Travel Planner",
    tag: "Python · Scikit-learn",
    desc: "Linear Regression and Random Forest models for travel budget prediction, deployed as a Streamlit app for real-time estimation and destination recommendations.",
    href: "https://github.com/Dev2k30abrd/smart-travel-planner",
  },
  {
    title: "Advanced SQL Business Analysis",
    tag: "MySQL · SQL",
    desc: "Analyzed 20,000+ business records to surface revenue-driving segments, using CTEs, window functions, and ranking queries.",
    href: "https://github.com/Dev2k30abrd/Advanced-SQL-Business-Analysis",
  },
];

const ACHIEVEMENTS = [
  {
    title: "National Finalist — Synapse Data Science & ML Hackathon",
    detail: "Scaler School of Technology, Ascent 2026",
  },
  {
    title: "Microsoft AI Skills Fest Certification Voucher",
    detail: "Awarded for demonstrated AI competency",
  },
];

const CERTIFICATIONS = [
  { title: "Microsoft Applied Skills Credential", year: "2026" ,
   href: "https://learn.microsoft.com/api/credentials/share/en-in/DEVANSHRAI-9874/35ECCCDBCBF9777B?sharingId",},
  { title: "Python for Data Science and Machine Learning Bootcamp", year: "Udemy, 2026" ,
   href: "https://www.udemy.com/certificate/UC-16ae6c55-3f2c-493f-8585-214015e7c272/",},
  { title: "BCGX Data Science Job Simulation", year: "Forage, 2026" ,
   href: "https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/Tcz8gTtprzAS4xSoK_SKZxezskWgmFjRvj9_69dd26447aa245d389b1a8f3_1777052010754_completion_certificate.pdf",},
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const ids = NAV.map((n) => n.id);
  const active = useActiveSection(ids);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: c.bg, color: c.text, fontFamily: "'Inter', sans-serif" }}
    >
      {/* fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${c.accentSoft}; color: ${c.text}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${c.bg}; }
        ::-webkit-scrollbar-thumb { background: ${c.mutedDim}; border-radius: 8px; }

        .fraunces { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .mono { font-family: 'IBM Plex Mono', monospace; }

        body::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        .nav-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.15); transition: all .3s ease; }
        .nav-dot.active { background: ${c.accent}; width: 18px; border-radius: 3px; }

        .card { transition: transform .4s cubic-bezier(.22,1,.36,1), border-color .3s ease, background .3s ease; }
        .card:hover { transform: translateY(-4px); border-color: ${c.accentBorder}; background: ${c.surface2}; }

        .link-underline { position: relative; }
        .link-underline::after {
          content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px;
          background: ${c.accent}; transition: width .3s ease;
        }
        .link-underline:hover::after { width: 100%; }

        .chip { transition: border-color .25s ease, color .25s ease, background .25s ease; }
        .chip:hover { border-color: ${c.accentBorder}; color: ${c.text}; background: ${c.accentSoft}; }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ── ambient hero glow, single + restrained ── */}
      <div
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${c.accentSoft} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* ── side rail nav ── */}
      <nav className="hidden md:flex fixed right-7 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 items-center">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} aria-label={n.label} className="group relative flex items-center">
            <span
              className="absolute right-6 mono text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none"
              style={{ background: c.surface2, border: `1px solid ${c.border}`, color: c.muted }}
            >
              {n.label}
            </span>
            <div className={`nav-dot ${active === n.id ? "active" : ""}`} />
          </a>
        ))}
      </nav>

      {/* ── top bar ── */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-10 py-4"
        style={{ background: "rgba(10,11,13,0.75)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${c.border}` }}
      >
        <a href="#hero" className="fraunces font-semibold text-lg tracking-tight" style={{ color: c.text }}>
          Devansh<span style={{ color: c.accent }}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: c.muted }}>
          {NAV.filter((n) => n.id !== "hero").map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="link-underline transition"
              style={{ color: active === n.id ? c.text : c.muted }}
            >
              {n.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4" style={{ color: c.muted }}>
          <a href="mailto:raidevansh90@gmail.com" aria-label="Email" className="hover:opacity-70 transition" style={{ color: c.muted }}>
            <Mail size={16} />
          </a>
          <a
            href="https://github.com/Dev2k30abrd"
            target="_blank"
            aria-label="GitHub"
            className="hover:opacity-70 transition"
            style={{ color: c.muted }}
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/devansh-rai-473506327/"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:opacity-70 transition"
            style={{ color: c.muted }}
          >
            <Linkedin size={16} />
          </a>
        </div>
      </motion.div>

      {/* ════════════ HERO ════════════ */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mono text-xs tracking-[0.2em] uppercase mb-7 px-4 py-2 rounded-full"
            style={{ color: c.accent, border: `1px solid ${c.accentBorder}`, background: c.accentSoft }}
          >
            Open to internships &amp; remote roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="fraunces font-semibold tracking-tight leading-[0.98] mb-5"
            style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)" }}
          >
            Devansh Rai
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mono text-base md:text-lg mb-6 h-7"
            style={{ color: c.accent }}
          >
            <TypeAnimation
              sequence={["AI/ML Engineer", 2000, "LLM & RAG Systems", 2000, "Data Science Undergraduate", 2000]}
              wrapper="span"
              speed={58}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-base md:text-lg leading-relaxed max-w-xl mb-10"
            style={{ color: c.muted }}
          >
            Building AI and machine learning systems, LLM-powered applications, and RAG
            pipelines — from backend to model to product.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:scale-[1.03]"
              style={{ background: c.accent, color: "#12100D" }}
            >
              Download Résumé
            </a>
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:border-white/25"
              style={{ border: `1px solid ${c.borderStrong}`, color: c.text }}
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 mono text-xs"
          style={{ color: c.mutedDim }}
        >
          <span className="tracking-[0.2em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown size={13} />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════ ABOUT ════════════ */}
      <section id="about" className="relative z-10 max-w-4xl mx-auto py-28 px-6">
        <div className="flex flex-col md:flex-row gap-14">
          <div className="md:w-1/3">
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <h2 className="fraunces text-4xl font-semibold leading-tight">
                Who
                <br />I am.
              </h2>
            </Reveal>
          </div>
          <div className="md:w-2/3">
            <Reveal delay={0.1}>
              <p className="text-lg leading-8 mb-6" style={{ color: c.muted }}>
                Data Science undergraduate with hands-on experience building{" "}
                <span style={{ color: c.text }}>AI and machine learning systems, LLM-powered
                applications, and RAG pipelines</span> using Python, FastAPI, and Scikit-learn.
              </p>
              <p className="text-lg leading-8" style={{ color: c.muted }}>
                Skilled in backend development, data analytics, and predictive modeling, with a
                proven ability to design, deploy, and document{" "}
                <span style={{ color: c.text }}>end-to-end AI solutions</span>.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <div
                className="flex items-start gap-4 p-6 rounded-2xl"
                style={{ background: c.surface, border: `1px solid ${c.border}` }}
              >
                <GraduationCap size={20} style={{ color: c.accent }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium" style={{ color: c.text }}>
                    B.Tech (Honors), Data Science
                  </p>
                  <p className="text-sm mt-1" style={{ color: c.muted }}>
                    Chhattisgarh Swami Vivekanand Technical University, Bhilai · 2024 – 2028
                  </p>
                  <p className="mono text-xs mt-2" style={{ color: c.mutedDim }}>
                    SPI 7.24 (current) · Class XII (ISC) 76% · Class X (ICSE) 90%
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ EXPERIENCE ════════════ */}
      <section id="experience" className="relative z-10 max-w-4xl mx-auto py-28 px-6">
        <Reveal>
          <Eyebrow>Experience</Eyebrow>
          <h2 className="fraunces text-4xl font-semibold mb-14">Where I&apos;ve worked.</h2>
        </Reveal>

        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.role + job.org} delay={i * 0.1}>
              <div className="rounded-2xl p-7 md:p-9" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
                  <div className="flex items-start gap-3">
                    <Briefcase size={18} style={{ color: c.accent }} className="mt-1 shrink-0" />
                    <div>
                      <h3 className="text-lg font-medium" style={{ color: c.text }}>
                        {job.role}
                      </h3>
                      <p className="text-sm mt-0.5" style={{ color: c.accent }}>
                        {job.org}
                      </p>
                    </div>
                  </div>
                  <div className="md:text-right shrink-0 mono text-xs" style={{ color: c.mutedDim }}>
                    <p>{job.period}</p>
                    <p className="mt-0.5">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2.5 pl-9">
                  {job.points.map((pt) => (
                    <li key={pt} className="text-sm leading-7 flex gap-3" style={{ color: c.muted }}>
                      <span className="shrink-0 mt-2.5 w-1 h-1 rounded-full" style={{ background: c.mutedDim }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ SKILLS ════════════ */}
      <section id="skills" className="relative z-10 max-w-4xl mx-auto py-28 px-6">
        <Reveal>
          <Eyebrow>Toolkit</Eyebrow>
          <h2 className="fraunces text-4xl font-semibold mb-14">Skills.</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.07}>
              <div className="rounded-2xl p-6" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
                <p className="mono text-xs tracking-widest uppercase mb-4" style={{ color: c.accent }}>
                  {group.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="chip mono text-xs px-3 py-1.5 rounded-full"
                      style={{ border: `1px solid ${c.border}`, color: c.muted }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ PROJECTS ════════════ */}
      <section id="projects" className="relative z-10 max-w-4xl mx-auto py-28 px-6">
        <Reveal>
          <Eyebrow>Selected Work</Eyebrow>
          <h2 className="fraunces text-4xl font-semibold mb-14">Projects.</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <a
                href={p.href}
                target="_blank"
                className="card group block rounded-2xl p-7 h-full"
                style={{ background: c.surface, border: `1px solid ${c.border}` }}
              >
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="mono text-xs px-3 py-1 rounded-full"
                    style={{ background: c.accentSoft, color: c.accent }}
                  >
                    {p.tag}
                  </span>
                  <ExternalLink
                    size={15}
                    style={{ color: c.mutedDim }}
                    className="group-hover:opacity-100 opacity-40 transition"
                  />
                </div>
                <h3 className="text-lg font-medium mb-3 leading-snug" style={{ color: c.text }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-7" style={{ color: c.muted }}>
                  {p.desc}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ ACHIEVEMENTS + CERTS ════════════ */}
      <section id="achievements" className="relative z-10 max-w-4xl mx-auto py-28 px-6">
        <div className="grid md:grid-cols-2 gap-14">
          <div>
            <Reveal>
              <Eyebrow>Recognition</Eyebrow>
              <h2 className="fraunces text-3xl font-semibold mb-10">Achievements.</h2>
            </Reveal>
            <div className="flex flex-col gap-4">
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.08}>
                  <div className="flex gap-4 p-5 rounded-2xl" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
                    <Award size={18} style={{ color: c.accent }} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium leading-snug" style={{ color: c.text }}>
                        {a.title}
                      </p>
                      <p className="mono text-xs mt-1.5" style={{ color: c.mutedDim }}>
                        {a.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal delay={0.1}>
              <Eyebrow>Credentials</Eyebrow>
              <h2 className="fraunces text-3xl font-semibold mb-10">Certifications.</h2>
            </Reveal>
            <div className="flex flex-col gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <Reveal key={cert.title} delay={0.1 + i * 0.08}>
                  <div className="flex gap-4 p-5 rounded-2xl" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
                    <BadgeCheck size={18} style={{ color: c.accent }} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium leading-snug" style={{ color: c.text }}>
                        {cert.title}
                      </p>
                      <p className="mono text-xs mt-1.5" style={{ color: c.mutedDim }}>
                        {cert.year}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section id="contact" className="relative z-10 max-w-3xl mx-auto py-28 px-6 text-center">
        <Reveal>
          <Eyebrow>Get In Touch</Eyebrow>
          <h2 className="fraunces text-4xl md:text-5xl font-semibold mb-6 leading-tight">
            Let&apos;s build something.
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: c.muted }}>
            Open to internships and remote opportunities.
            <br />
            I&apos;d love to hear about your project.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="mailto:raidevansh90@gmail.com"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:scale-[1.03]"
              style={{ background: c.accent, color: "#12100D" }}
            >
              <Mail size={15} /> Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/devansh-rai-473506327/"
              target="_blank"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:border-white/25"
              style={{ border: `1px solid ${c.borderStrong}`, color: c.text }}
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <a
              href="https://github.com/Dev2k30abrd"
              target="_blank"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:border-white/25"
              style={{ border: `1px solid ${c.borderStrong}`, color: c.text }}
            >
              <Github size={15} /> GitHub
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 mono text-sm" style={{ color: c.mutedDim }}>
            <Phone size={13} />
            <span>+91 79051 73296</span>
          </div>
        </Reveal>
      </section>

      {/* ── footer ── */}
      <footer
        className="relative z-10 text-center py-10 mono text-xs"
        style={{ borderTop: `1px solid ${c.border}`, color: c.mutedDim }}
      >
        <p className="flex items-center justify-center gap-2">
          <Cpu size={12} />© {new Date().getFullYear()} Devansh Rai
        </p>
      </footer>
    </div>
  );
}
