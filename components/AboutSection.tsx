"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section id="about" className="relative py-32 px-4 bg-black w-full overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-12"
                >
                    About Me
                </motion.h2>

                <div className="space-y-8 text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        I’m a <span className="text-white font-medium">B.Tech CSE (Cyber Security)</span> student at Acropolis Institute of Technology & Research, Indore (MP). I enjoy building software that actually <span className="text-white font-medium">solves problems</span>, not just works on paper. Coding is something I genuinely like doing, especially when it involves turning an idea into a working product.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        I’m most comfortable working with <span className="text-white font-medium">Java</span> and enjoy backend development, but I also build full-stack applications when the project demands it. I like understanding how things work under the hood—whether it’s APIs, databases, or system design—and improving them step by step.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Outside academics, I actively work on projects and take part in <span className="text-white font-medium">hackathons</span>. I enjoy coding in Java, improving my problem-solving skills, and building backend-focused solutions that are simple and reliable.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
