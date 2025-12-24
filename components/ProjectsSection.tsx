"use client";

import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 3D Parallax Effects
    // y translation: Cards move up slightly faster than scroll
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    // opacity: Fade in smoothly
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
    // scale: Slight zoom in/out effect
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative py-32 px-4 bg-black w-full overflow-hidden [perspective:1000px]"
        >

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

            {/* Vertical Scroll Progress Line (Subtle) */}
            <motion.div
                style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"
            />

            <div className="max-w-7xl mx-auto [perspective:1000px]">
                <div className="flex flex-col items-center mb-24 space-y-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight"
                    >
                        Featured Projects
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-neutral-400 max-w-2xl text-lg font-light"
                    >
                        A selection of my recent work, ranging from full-stack applications to complex backend systems.
                    </motion.p>
                </div>

                {/* 3D Grid Container */}
                <motion.div
                    style={{ y, opacity, scale }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 will-change-transform"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, z: -100, rotateX: 20 }}
                            whileInView={{ opacity: 1, z: 0, rotateX: 0 }}
                            viewport={{ margin: "-50px" }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1, // Stagger based on index
                                type: "spring",
                                stiffness: 50
                            }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
