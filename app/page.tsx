"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {

  /* typing animation */
  const roles = ["Data Analyst","Future Data Engineer","ML Enthusiast"];
  const [text,setText] = useState("");
  const [i,setI] = useState(0);
  const [j,setJ] = useState(0);
  const [back,setBack] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(!back){
        setText(roles[i].substring(0,j+1));
        setJ(j+1);
        if(j === roles[i].length) setBack(true);
      }else{
        setText(roles[i].substring(0,j-1));
        setJ(j-1);
        if(j===0){ setBack(false); setI((i+1)%roles.length); }
      }
    }, back?50:120);
    return ()=>clearTimeout(timer);
  },[j,back,i]);

  const fadeUp = {
    hidden:{opacity:0,y:70},
    show:{opacity:1,y:0,transition:{duration:.8}}
  };

  return (
    <main className="bg-[#0b0f19] text-white">

      {/* CONTACT BAR */}
      <div className="fixed top-0 w-full text-center py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white z-50 shadow-lg">
        <div className="flex justify-center gap-10 items-center">
          <a href="mailto:raidevansh90@gmail.com">📧 Email</a>
          <a href="https://github.com/Dev2k30abrd" target="_blank">💻 GitHub</a>
          <a href="https://linkedin.com/in/devansh-rai-473506327" target="_blank">🔗 LinkedIn</a>
        </div>
      </div>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28">
        <motion.h1 variants={fadeUp} initial="hidden" animate="show"
          className="text-6xl font-bold mb-6 hover:scale-105 transition">
          Hello 👋 I'm Devansh Rai
        </motion.h1>

        <motion.h2 variants={fadeUp} initial="hidden" animate="show"
          className="text-2xl text-blue-400 mb-8 h-8">
          {text} |
        </motion.h2>

        <motion.a variants={fadeUp} initial="hidden" animate="show"
          href="/resume.pdf" target="_blank">
          <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold
          shadow-[0_0_25px_#3b82f6] hover:shadow-[0_0_40px_#3b82f6] hover:scale-110 transition">
            Download Resume
          </button>
        </motion.a>
      </section>

      {/* ABOUT */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}
        className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold mb-8 hover:text-blue-400 transition">About Me</h2>

        <p className="max-w-4xl mx-auto text-lg text-slate-300 leading-relaxed">
          I am a Computer Science undergraduate specializing in Data Science with a strong focus on 
          data analytics, business intelligence and data-driven decision making.  
          <br/><br/>
          I enjoy transforming raw datasets into meaningful insights using Python, SQL, Excel and Power BI. 
          My projects focus on real-world problem solving, exploratory data analysis, dashboard creation and 
          identifying trends that help businesses make smarter decisions.
          <br/><br/>
          Currently, I am continuously expanding my knowledge in Machine Learning, Advanced SQL and Data Engineering 
          to build scalable data solutions and intelligent systems. My long-term goal is to grow from a Data Analyst 
          into a Data Engineer and ultimately a Machine Learning Engineer contributing to global tech teams and 
          remote-first companies.
        </p>
      </motion.section>

      {/* SKILLS */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}
        className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold mb-12 hover:text-blue-400 transition">Skills</h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">

          {[
            {title:"Analysis",items:["EDA","Data Cleaning","Visualization","Statistics"]},
            {title:"Languages",items:["Python","SQL"]},
            {title:"Tools",items:["Excel","Power BI","GitHub"]},
            {title:"Databases",items:["MySQL"]}
          ].map(card=>(
            <div key={card.title} className="p-6 bg-slate-800 rounded-xl shadow hover:scale-105 transition">
              <h3 className="font-bold text-xl mb-3">{card.title}</h3>
              <ul className="list-disc pl-5">
                {card.items.map(i=><li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}

        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}
        className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold mb-12 hover:text-blue-400 transition">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">

          <div className="p-6 bg-slate-800 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-2xl mb-3">Electricity Consumption Analysis</h3>
            <ul className="list-disc pl-5 mb-3">
              <li>Python & Pandas analysis</li>
              <li>EDA & visualization</li>
            </ul>
            <a href="https://github.com/Dev2k30abrd/Electricity-Consumption-Analysis-and-Cost-Prediction" target="_blank" className="text-blue-400">GitHub Repo →</a>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-2xl mb-3">Excel Sales Dashboard</h3>
            <ul className="list-disc pl-5 mb-3">
              <li>Interactive Excel dashboard</li>
              <li>KPIs & charts</li>
            </ul>
            <a href="https://github.com/Dev2k30abrd/Excel_Sales_Analytics_Dashboard" target="_blank" className="text-blue-400">GitHub Repo →</a>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl shadow hover:scale-105 transition md:col-span-2">
            <h3 className="text-2xl mb-3">EventFlow – IIT Bhilai Hackathon</h3>
            <ul className="list-disc pl-5 mb-3">
              <li>Event management web app</li>
              <li>Hackathon project</li>
            </ul>
            <a href="https://github.com/Dev2k30abrd/EventFlow-App" target="_blank" className="text-blue-400">GitHub Repo →</a>
          </div>

        </div>
      </motion.section>

    </main>
  );
}