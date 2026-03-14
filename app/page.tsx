"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        darkMode
          ? "relative min-h-screen bg-black text-white overflow-hidden"
          : "relative min-h-screen bg-[#f5f5f7] text-[#1d1d1f] overflow-hidden"
      }
    >
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
      </div>

      {/* TOP BAR */}
      <div
        className={`flex justify-center gap-10 py-5 text-sm border-b ${
          darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        <a
          href="mailto:raidevansh90@gmail.com"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <Mail size={16} /> Email
        </a>

        <a
          href="https://github.com/Dev2k30abrd"
          target="_blank"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <Github size={16} /> GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/devansh-rai-473506327/"
          target="_blank"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <Linkedin size={16} /> LinkedIn
        </a>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-36 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-semibold tracking-tight mb-8"
        >
          Devansh Rai
        </motion.h1>

        <TypeAnimation
          sequence={["Data Analyst", 1500, "Future Data Engineer", 1500, "ML Enthusiast", 1500]}
          wrapper="h2"
          speed={50}
          repeat={Infinity}
          className="text-2xl text-blue-600 mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-lg max-w-2xl mx-auto leading-relaxed mb-10 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Building practical data solutions through analytics, SQL, Python and business intelligence.
        </motion.p>

        <div className="flex justify-center gap-4">
          <a
            href="/resume.pdf?v=2"
            target="_blank"
            className="px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition shadow-lg"
          >
            Download Resume
          </a>

          <a
            href="#projects"
            className="px-8 py-4 border rounded-full hover:bg-gray-100 transition shadow-sm"
          >
            View Projects
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">About</h2>

        <p className={`leading-8 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Computer Science (Data Science) undergraduate with strong interest in analytics,
          dashboard development and business problem solving. Skilled in SQL, Python, Excel
          and Power BI for transforming raw data into meaningful insights.
        </p>
      </section>

      {/* SKILLS */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-14">
          Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Analysis", items: ["EDA", "Cleaning", "Visualization", "Statistics"] },
            { title: "Languages", items: ["Python", "SQL"] },
            { title: "Tools", items: ["Excel", "Power BI", "GitHub"] },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-3xl p-8 border shadow-sm transition ${
                darkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <h3 className="text-2xl font-medium mb-4">{card.title}</h3>
              <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {card.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-14">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Advanced SQL Business Analysis",
              link: "https://github.com/Dev2k30abrd/Advanced-SQL-Business-Analysis",
              desc: "Advanced SQL using CTEs, subqueries and window functions.",
            },
            {
              title: "Retail Sales SQL Analysis",
              link: "https://github.com/Dev2k30abrd/Retail-Sales-SQL-Analysis",
              desc: "Retail business insights using SQL analysis.",
            },
            {
              title: "Excel Sales Analytics Dashboard",
              link: "https://github.com/Dev2k30abrd/Excel_Sales_Analytics_Dashboard",
              desc: "Interactive KPI dashboard using Excel.",
            },
            {
              title: "Electricity Consumption Analysis",
              link: "https://github.com/Dev2k30abrd/Electricity-Consumption-Analysis-and-Cost-Prediction",
              desc: "Python-based EDA and cost analysis.",
            },
            {
              title: "EventFlow – IIT Bhilai Hackathon",
              link: "https://github.com/Dev2k30abrd/EventFlow-App",
              desc: "Hackathon solution for event workflow.",
            },
          ].map((project) => (
            <div
              key={project.title}
              className={`rounded-3xl p-8 border shadow-sm transition ${
                darkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <h3 className="text-2xl font-medium mb-4">{project.title}</h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-5`}>
                {project.desc}
              </p>

              <a href={project.link} target="_blank" className="text-blue-600">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>
        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
          Open to internships and remote opportunities.
        </p>
      </section>

      <footer className="text-center py-8 text-gray-500">
        © {new Date().getFullYear()} Devansh Rai
      </footer>
    </div>
  );
}