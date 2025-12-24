"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px", // Focus on the top-ish middle of the viewport
            threshold: 0,
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        const sections = ["hero", "projects", "skills", "achievements", "about", "contact"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const navItems = ["Projects", "Skills", "Achievements", "About", "Contact"];

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <nav className="flex items-center gap-2 p-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all duration-300 hover:border-white/20">

                {/* Logo / Name -> Points to Hero */}
                <Link
                    href="#hero"
                    className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full mr-2 ${activeSection === "hero"
                        ? "bg-white text-black shadow-lg shadow-white/10"
                        : "text-white bg-white/5 hover:bg-white/10 hover:scale-105"
                        }`}
                >
                    Shubh Sharma
                </Link>

                {/* Main Links */}
                <ul className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isResume = item === "Resume";
                        const id = item.toLowerCase();
                        const isActive = activeSection === id;

                        return (
                            <li key={item} className="relative">
                                {isResume ? (
                                    <Link
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full block relative z-10 ${isActive
                                            ? "text-white"
                                            : "text-neutral-400 hover:text-white"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                            />
                                        )}
                                        {item}
                                    </Link>
                                ) : (
                                    <a
                                        href={`#${id}`}
                                        className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full block relative z-10 ${isActive
                                            ? "text-white"
                                            : "text-neutral-400 hover:text-white"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                            />
                                        )}
                                        {item}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Menu Icon */}
                <div className="md:hidden px-3">
                    <span className="text-neutral-400 text-sm">Menu</span>
                </div>

                {/* CTA Button -> Contact */}
                <Link
                    href="https://wa.me/917725091577"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ml-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 ${activeSection === "contact"
                            ? "bg-white text-black shadow-white/20 scale-105"
                            : "bg-white/10 text-white hover:bg-white hover:text-black border border-white/10"
                        }`}
                >
                    <svg
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.553 4.189 1.606 6.06l-1.708 6.24 6.386-1.674a11.82 11.82 0 005.753 1.496h.005c6.634 0 12.032-5.397 12.035-12.031a11.77 11.77 0 00-3.417-8.423" />
                    </svg>
                    Let's Talk
                </Link>
            </nav>
        </motion.div>
    );
}
