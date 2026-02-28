"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import Particles from "react-tsparticles";

export default function Home() {
  const [dark, setDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <div className={dark ? "dark bg-black text-white" : "bg-white text-slate-900"}>

      {/* Scroll Progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-50"/>

      {/* Particles */}
      <Particles options={{particles:{number:{value:50},move:{speed:0.5},links:{enable:true}}}} className="absolute -z-10"/>

      {/* Dark toggle */}
      <button onClick={()=>setDark(!dark)} className="fixed top-5 right-5 px-4 py-2 bg-purple-500 text-white rounded-full z-50">
        {dark ? "Light" : "Dark"}
      </button>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <motion.h1 initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Devansh Rai
        </motion.h1>

        <TypeAnimation sequence={["Data Analyst",1500,"ML Enthusiast",1500,"Future Data Engineer",1500]} wrapper="h2" repeat={Infinity} className="text-3xl mb-6"/>

        <p className="max-w-2xl mb-8">
          BTech Computer Science (Data Science) student passionate about Data Analytics, dashboards and Machine Learning.
        </p>
      </section>

      {/* ABOUT */}
      <motion.section initial={{opacity:0,y:80}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">About</h2>
        <p className="max-w-3xl mx-auto">
          I transform raw data into meaningful insights using SQL, Python and Power BI. 
          Career goal: Data Analyst → Data Engineer → Machine Learning Engineer working in global teams.
          <br/><br/>
          Currently learning: Machine Learning, Advanced SQL, Data Engineering.
        </p>
      </motion.section>

      {/* SKILLS */}
      <motion.section initial={{opacity:0,y:80}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-12">Skills</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Excel","SQL","Python","Power BI","Data Cleaning","Data Visualization","Statistics","GitHub","Basic DSA"].map(skill=>(
            <motion.div whileHover={{scale:1.1}} key={skill} className="p-6 border rounded-xl">
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section initial={{opacity:0,y:80}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-12">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div whileHover={{y:-10}} className="p-6 border rounded-xl">
            <h3 className="text-2xl mb-3">Electricity Consumption Analysis</h3>
            <p className="mb-4">Data analysis using Python, Pandas & Matplotlib.</p>
            <a href="https://github.com/Dev2k30abrd/Electricity-Consumption-Analysis-and-Cost-Prediction" target="_blank" className="text-purple-500">View Project</a>
          </motion.div>

          <motion.div whileHover={{y:-10}} className="p-6 border rounded-xl">
            <h3 className="text-2xl mb-3">EventFlow – IIT Bhilai Hackathon</h3>
            <p className="mb-4">Hackathon project solving real-world event problems.</p>
            <a href="https://github.com/Dev2k30abrd/EventFlow-App" target="_blank" className="text-purple-500">View Project</a>
          </motion.div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section initial={{opacity:0,y:80}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p className="mb-6">Open to internships & freelance opportunities.</p>

        <div className="flex justify-center gap-6">
          <a href="mailto:raidevansh90@gmail.com">Email</a>
          <a href="https://github.com/Dev2k30abrd" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/devansh-rai-473506327" target="_blank">LinkedIn</a>
        </div>
      </motion.section>

    </div>
  );
}