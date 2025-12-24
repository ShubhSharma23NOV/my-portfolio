"use client";

import React from "react";
import SkillCard from "./SkillCard";
import { skills } from "@/data/skills";
import { motion } from "framer-motion";
import TechMarquee from "./TechMarquee";

export default function SkillsSection() {
    return (
        <section id="skills" className="relative py-32 px-4 bg-black w-full overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 space-y-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                    >
                        Technical Skills
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-neutral-400 max-w-2xl text-lg"
                    >
                        A comprehensive overview of the technologies and tools I work with.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20"
                >
                    <TechMarquee />
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: "-50px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 perspective-1000"
                >
                    {skills.map((skillCategory) => (
                        <motion.div
                            key={skillCategory.category}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                        >
                            <SkillCard skillCategory={skillCategory} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
