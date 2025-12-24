"use client";

import React from "react";
import { motion } from "framer-motion";

const techIcons = [
    { name: "Java", icon: "java", customSrc: "/images/java.png" },
    { name: "Spring", icon: "spring" },
    { name: "Spring Boot", icon: "springboot" },
    { name: "MySQL", icon: "mysql" },
    { name: "Firebase", icon: "firebase" },
    { name: "C", icon: "c" },
    { name: "C++", icon: "cplusplus" },
    { name: "Hibernate", icon: "hibernate" },
    { name: "Postman", icon: "postman" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "Canva", icon: "canva", brandColor: "#280FEE" },
    { name: "Tailwind", icon: "tailwindcss" },
    { name: "HTML", icon: "html5" },
    { name: "CSS", icon: "css3" },
    { name: "JDBC", icon: "java", customSrc: "/images/java.png" },
    { name: "Servlet", icon: "apachetomcat" },
];

export default function TechMarquee() {
    // Duplicate the list to create a seamless loop
    const doubledIcons = [...techIcons, ...techIcons];

    return (
        <div className="relative w-full overflow-hidden bg-neutral-950/50 py-12 border-y border-white/5">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

            <div className="flex w-fit overflow-hidden">
                <motion.div
                    animate={{
                        x: [-(160 * techIcons.length), 0],
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex shrink-0 items-center justify-around gap-12 px-6"
                >
                    {doubledIcons.map((tech, idx) => (
                        <div
                            key={`${tech.name}-${idx}`}
                            className="flex items-center gap-4 group cursor-default"
                        >
                            <div className="relative h-12 w-12 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                                <img
                                    src={tech.customSrc || `https://api.iconify.design/simple-icons:${tech.icon}.svg?color=${encodeURIComponent(tech.brandColor || 'white')}`}
                                    alt={tech.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <span
                                className="text-sm font-medium text-neutral-500 transition-colors duration-300 uppercase tracking-widest"
                                style={{
                                    // Use brandColor on hover if provided, otherwise default to white
                                    "--hover-color": tech.brandColor || "white"
                                } as React.CSSProperties}
                                onMouseEnter={(e) => e.currentTarget.style.color = tech.brandColor || "white"}
                                onMouseLeave={(e) => e.currentTarget.style.color = ""}
                            >
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
