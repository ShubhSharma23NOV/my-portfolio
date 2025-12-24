"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Achievement } from "@/data/achievements";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { X, Eye } from "lucide-react";

interface AchievementBadgeProps {
    achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
    const Icon = achievement.icon;
    const ref = useRef<HTMLDivElement>(null);
    const [showCertificate, setShowCertificate] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);

        // Update CSS variables for spotlight effect
        const px = ((clientX - left) / width) * 100;
        const py = ((clientY - top) / height) * 100;
        const target = currentTarget as HTMLElement;
        target.style.setProperty("--mouse-x", `${px}%`);
        target.style.setProperty("--mouse-y", `${py}%`);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 400, damping: 90 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 400, damping: 90 });

    const isWinner = achievement.rank?.toLowerCase().includes("winner") || achievement.rank?.includes("1st");
    const is3rd = achievement.rank?.includes("3rd");

    const accentColor = isWinner ? "rgba(234, 179, 8, 0.4)" : is3rd ? "rgba(205, 127, 50, 0.4)" : "rgba(255, 255, 255, 0.1)";
    const iconColor = isWinner ? "text-yellow-500" : is3rd ? "text-orange-700" : "text-white";

    // Lock body scroll when certificate lightbox is open
    useEffect(() => {
        if (showCertificate) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showCertificate]);

    const certificateModal = (
        <AnimatePresence>
            {showCertificate && achievement.certificate && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-12 cursor-zoom-out"
                    onClick={() => setShowCertificate(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-5xl aspect-[1.414/1] bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={achievement.certificate}
                            alt={`${achievement.title} Certificate`}
                            fill
                            className="object-contain"
                            priority
                        />
                        <button
                            onClick={() => setShowCertificate(false)}
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
                style={{
                    transformStyle: "preserve-3d",
                    rotateX,
                    rotateY,
                }}
                whileHover={{ scale: 1.02 }}
                className="group relative flex flex-col h-full bg-neutral-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 backdrop-blur-sm cursor-default"
            >
                {/* Spotlight Effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor}, transparent 80%)`
                    }}
                />

                <div style={{ transform: "translateZ(30px)" }} className="relative z-10 p-8 flex flex-col h-full space-y-6">
                    <div className="flex justify-between items-start">
                        <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                            <Icon className="h-8 w-8" />
                        </div>
                        <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-500 border border-white/5 rounded-full bg-white/[0.02]">
                            {achievement.year}
                        </span>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                            {achievement.rank && (
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isWinner ? 'text-yellow-500' : is3rd ? 'text-orange-500' : 'text-neutral-500'}`}>
                                    {achievement.rank}
                                </span>
                            )}
                            <h3 className="text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-neutral-200 transition-colors">
                                {achievement.title.split('–')[0].split('-')[0].trim()}
                            </h3>
                        </div>
                        <p className="text-neutral-400 text-lg font-light leading-relaxed tracking-tight group-hover:text-neutral-300 transition-colors">
                            {achievement.description}
                        </p>
                    </div>

                    {achievement.certificate && (
                        <button
                            onClick={() => setShowCertificate(true)}
                            className="flex items-center gap-2 w-fit px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium group/btn"
                        >
                            <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                            View Certificate
                        </button>
                    )}

                    {/* Decorative Bottom Bar */}
                    <div className={`h-1 w-12 rounded-full ${isWinner ? 'bg-yellow-500/50' : is3rd ? 'bg-orange-500/50' : 'bg-white/20'} transition-all duration-500 group-hover:w-full`} />
                </div>
            </motion.div>

            {mounted && createPortal(certificateModal, document.body)}
        </>
    );
}
