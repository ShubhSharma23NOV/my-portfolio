"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, X, Camera, Maximize2 } from "lucide-react";
import { Project } from "@/data/projects";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when modal or lightbox is open
    useEffect(() => {
        if (isExpanded || selectedImage) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = 'var(--removed-body-margin, 0px)';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isExpanded, selectedImage]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (selectedImage) {
                    setSelectedImage(null);
                } else {
                    setIsExpanded(false);
                }
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [selectedImage]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        if (isExpanded) return;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 400, damping: 90 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 400, damping: 90 });

    const modalContent = (
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex justify-center bg-black/98 backdrop-blur-3xl overflow-y-auto scroll-smooth py-12 px-4 md:px-8"
                    onClick={() => setIsExpanded(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 30, stiffness: 250 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-neutral-950 border border-white/5 rounded-[3rem] w-full max-w-6xl h-fit shadow-2xl relative overflow-hidden flex flex-col"
                    >
                        {/* 1. TOP HEADING SECTION */}
                        <div className="p-10 md:p-16 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                            <div className="flex justify-between items-start gap-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex-grow space-y-6"
                                >
                                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-tight max-w-4xl">
                                        {project.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="px-5 py-2 text-xs font-black text-neutral-400 bg-white/5 rounded-full border border-white/5 uppercase tracking-[0.2em]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full border border-white/10 text-white transition-all hover:scale-110 active:scale-95 flex-shrink-0"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                            </div>
                        </div>

                        {/* 2. PROJECT GLIMPSE SECTION */}
                        <section className="p-10 md:p-16 space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Camera className="w-5 h-5 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Project Glimpse</h3>
                            </div>

                            <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar scroll-smooth snap-x">
                                {project.screenshots && project.screenshots.length > 0 ? (
                                    project.screenshots.map((ss, i) => (
                                        <div
                                            key={i}
                                            className="relative flex-shrink-0 aspect-[16/10] h-[250px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 snap-center group/ss hover:border-white/20 transition-all cursor-zoom-in"
                                            onClick={() => setSelectedImage(ss)}
                                        >
                                            <Image
                                                src={ss}
                                                alt={`Screenshot ${i + 1}`}
                                                fill
                                                className="object-cover group-hover/ss:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/ss:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 transform scale-50 group-hover/ss:scale-100 transition-transform duration-300">
                                                    <Maximize2 className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative flex-shrink-0 aspect-[16/10] h-[400px] w-full bg-white/5 flex items-center justify-center rounded-2xl border border-dashed border-white/10">
                                        <p className="text-neutral-500 italic">No additional screenshots available yet.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* 3. CASE STUDY CONTENT */}
                        <div className="px-10 md:px-16 pb-16 space-y-20">
                            <div className="grid md:grid-cols-2 gap-16 md:gap-24 pt-10 border-t border-white/5">
                                <section className="space-y-6">
                                    <h4 className="text-xs uppercase tracking-[0.3em] font-black text-red-500/90">The Challenge</h4>
                                    <p className="text-2xl md:text-3xl text-neutral-300 font-light leading-relaxed italic opacity-90 tracking-tight">
                                        "{project.problem}"
                                    </p>
                                </section>
                                <section className="space-y-6">
                                    <h4 className="text-xs uppercase tracking-[0.3em] font-black text-green-500/90">The Solution</h4>
                                    <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light tracking-tight">
                                        {project.solution}
                                    </p>
                                </section>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-20">
                                <section className="space-y-12">
                                    <div className="space-y-4">
                                        <h4 className="text-xs uppercase tracking-[0.3em] font-black text-white/40">Technical Execution</h4>
                                        <div className="h-px bg-gradient-to-r from-white/20 to-transparent w-48" />
                                    </div>
                                    <ul className="grid gap-8">
                                        {project.whatIBuilt.map((item, i) => (
                                            <li key={i} className="flex items-start gap-6 text-neutral-400 group/item">
                                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10 transition-colors group-hover/item:border-white/30 group-hover/item:bg-white/10">
                                                    <CheckCircle2 className="w-5 h-4 text-white/60" />
                                                </div>
                                                <span className="text-lg md:text-xl leading-snug group-hover/item:text-white transition-colors duration-300 font-light tracking-tight">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <section className="space-y-12">
                                    <div className="space-y-4">
                                        <h4 className="text-xs uppercase tracking-[0.3em] font-black text-white/40">Success Metrics</h4>
                                        <div className="h-px bg-gradient-to-r from-white/20 to-transparent w-48" />
                                    </div>
                                    <div className="grid gap-6">
                                        {project.impact.map((text, i) => (
                                            <div key={i} className="p-8 bg-gradient-to-br from-white/[0.04] to-transparent rounded-[2.5rem] border border-white/[0.05] hover:border-white/10 transition-all duration-500 group/box">
                                                <p className="text-neutral-200 text-lg md:text-xl font-light leading-tight group-hover/box:text-white transition-colors tracking-tight">
                                                    {text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>

                    {/* Custom Scrollbar Styling */}
                    <style jsx global>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            height: 6px;
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: rgba(255, 255, 255, 0.05);
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(255, 255, 255, 0.3);
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );

    const lightbox = (
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-12 cursor-zoom-out"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-7xl aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Full view"
                            fill
                            className="object-contain"
                            priority
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <motion.div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => setIsExpanded(true)}
                style={{
                    transformStyle: "preserve-3d",
                    rotateX: isExpanded ? 0 : rotateX,
                    rotateY: isExpanded ? 0 : rotateY,
                }}
                whileHover={isExpanded ? {} : { scale: 1.02 }}
                className="group relative flex flex-col aspect-[4/5] bg-neutral-900/40 border border-white/5 rounded-3xl overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-500 backdrop-blur-xl"
            >
                {/* Initial State: Only Photo visible */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </div>

                {/* Floating Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                    <motion.div style={{ transform: "translateZ(30px)" }} className="flex justify-between items-end">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Project</span>
                            <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                                {project.title.split('–')[0]}
                            </h3>
                        </div>
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {mounted && createPortal(modalContent, document.body)}
            {mounted && createPortal(lightbox, document.body)}
        </>
    );
}
