import { Trophy, Award } from "lucide-react";

export interface Achievement {
    title: string;
    year: string;
    description: string;
    icon: React.ElementType;
    rank?: string;
    certificate?: string;
}

export const achievements: Achievement[] = [
    {
        title: "Smart India Hackathon 2025 – Winner",
        year: "2025",
        description: "Winner of the National-level innovation challenge organized by the Government of India, focusing on solving critical governance and infrastructure problems.",
        icon: Trophy,
        rank: "Winner",
        certificate: "/images/SIH.png",
    },
    {
        title: "MediVerse Hackathon – 3rd Place",
        year: "2025",
        description: "Awarded 3rd place in this open technology innovation hackathon for developing a decentralized healthcare data management system.",
        icon: Award,
        rank: "3rd Place",
        certificate: "/images/Mediverse.jpeg",
    },
];
