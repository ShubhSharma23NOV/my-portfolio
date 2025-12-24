
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
    return (
        <section id="hero" className="relative flex flex-col items-center justify-start pt-32 min-h-screen overflow-hidden bg-black text-white px-4 text-center">

            {/* Background Gradients - Matching the reference Clean Blue/Indigo vibe */}
            {/* Main Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-800 to-white" />

            {/* Subtle Overlay to add depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center max-w-4xl w-full mx-auto space-y-8">

                {/* Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="flex flex-col items-center gap-6"
                >
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                        className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 pb-2"
                    >
                        I focus on building <span className="text-white">reliable systems</span> <br />
                        behind <span className="text-white">meaningful applications.</span>
                    </motion.h1>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } }
                        }}
                        className="text-lg md:text-xl text-neutral-400 max-w-2xl font-light leading-relaxed tracking-tight"
                    >
                        Building <span className="text-neutral-200">robust backend architectures</span> and scalable solutions <br className="hidden md:block" />
                        that turn complex problems into seamless experiences.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                        className="flex flex-wrap items-center justify-center gap-4 mt-2"
                    >
                        <a href="#contact">
                            <Button size="lg" className="h-12 px-8 text-base font-medium bg-white text-black hover:bg-white/90 shadow-lg shadow-neutral-900/10 rounded-full transition-all hover:scale-105 active:scale-95">
                                Get a Quote
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Profile Image - Centered and Large with 3D Tilt */}
                <ProfileImage />
            </div>
        </section>
    );
}

function ProfileImage() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [7, -7]), { stiffness: 400, damping: 90 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-7, 7]), { stiffness: 400, damping: 90 });

    function onMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-lg mt-8"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative aspect-[4/5] md:aspect-square w-[320px] md:w-[500px] mx-auto group"
            >
                {/* Premium Background Glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full transition-opacity group-hover:opacity-100 opacity-60" />

                {/* Animated Inner Glow Ring */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute inset-0 border-2 border-white/10 rounded-[3rem] blur-sm translate-z-[-20px]"
                />

                {/* Floating Image Container */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    style={{ transform: "translateZ(50px)" }}
                    className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/5 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm shadow-2xl"
                >
                    {/* Image Container with refined bottom fade */}
                    <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)]">
                        <Image
                            src="/images/profile.png"
                            alt="Shubh Sharma"
                            fill
                            className="object-cover object-top scale-110 group-hover:scale-115 transition-transform duration-700"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full" />
            </motion.div>
        </motion.div>
    );
}
