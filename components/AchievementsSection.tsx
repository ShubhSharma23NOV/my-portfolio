"use client";

import React from "react";
import AchievementBadge from "./AchievementBadge";
import { achievements } from "@/data/achievements";
import { motion } from "framer-motion";

export default function AchievementsSection() {
    return (
        <section id="achievements" className="relative py-32 px-4 bg-black w-full overflow-hidden">

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
                        Key Milestones
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-neutral-400 max-w-2xl text-lg"
                    >
                        Highlights of my professional journey and recognition.
                    </motion.p>
                </div>

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
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center max-w-5xl mx-auto"
                >
                    {achievements.map((achievement) => (
                        <motion.div
                            key={achievement.title}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                        >
                            <AchievementBadge achievement={achievement} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
