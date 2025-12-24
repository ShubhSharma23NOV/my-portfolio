"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section id="contact" className="relative py-32 px-4 bg-black w-full overflow-hidden border-t border-white/10 scroll-mt-32">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Let's Work Together
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Feel free to reach out for collaborations, opportunities, or just a friendly hello. I'm always open to discussing new projects.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <Button asChild size="lg" className="h-14 px-8 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] text-lg font-medium transition-all hover:scale-105 shadow-lg shadow-[#25D366]/20 cursor-pointer">
                            <a href="https://wa.me/917725091577" target="_blank" rel="noopener noreferrer">
                                <svg
                                    className="mr-3 h-6 w-6 fill-current"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.553 4.189 1.606 6.06l-1.708 6.24 6.386-1.674a11.82 11.82 0 005.753 1.496h.005c6.634 0 12.032-5.397 12.035-12.031a11.77 11.77 0 00-3.417-8.423" />
                                </svg>
                                WhatsApp Me
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white hover:text-black bg-transparent text-lg font-medium transition-all hover:scale-105 cursor-pointer">
                            <a href="mailto:shubh.sharma.work.23@gmail.com">
                                <Mail className="mr-3 h-5 w-5" />
                                Email Me
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white hover:text-black bg-transparent text-lg font-medium transition-all hover:scale-105 cursor-pointer">
                            <a href="https://github.com/ShubhSharma23NOV" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-3 h-5 w-5" />
                                GitHub
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white hover:text-black bg-transparent text-lg font-medium transition-all hover:scale-105 cursor-pointer">
                            <a href="https://www.linkedin.com/in/shubh-sharma-1171bb328/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="mr-3 h-5 w-5" />
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </motion.div>

                <footer className="mt-32 text-neutral-600 text-sm">
                    © {new Date().getFullYear()} Shubh Sharma. All rights reserved.
                </footer>
            </div>
        </section>
    );
}
