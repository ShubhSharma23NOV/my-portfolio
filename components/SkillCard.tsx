import React, { useRef } from "react";
import { SkillCategory } from "@/data/skills";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SkillCardProps {
    skillCategory: SkillCategory;
}

export default function SkillCard({ skillCategory }: SkillCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
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

    return (
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
            className="group relative flex flex-col h-full bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
        >
            {/* Gradient Overlay on Hover */}
            <div
                style={{ transform: "translateZ(30px)" }}
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />

            <div style={{ transform: "translateZ(20px)" }} className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-6 text-white text-center group-hover:text-neutral-200 transition-colors">
                    {skillCategory.category}
                </h3>

                <div className="flex flex-wrap justify-center gap-2">
                    {skillCategory.skills.map((skill) => (
                        <div
                            key={skill}
                            className="px-3 py-1.5 text-xs font-medium text-neutral-400 bg-white/5 border border-white/5 rounded-lg group-hover:text-white group-hover:bg-white/10 transition-colors"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
