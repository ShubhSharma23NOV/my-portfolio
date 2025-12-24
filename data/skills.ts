export interface SkillCategory {
    category: string;
    skills: string[];
}

export const skills: SkillCategory[] = [
    {
        category: "Programming Languages",
        skills: ["Java", "C", "C++", "HTML", "CSS", "JavaScript"],
    },
    {
        category: "Backend Development",
        skills: ["Spring Boot", "Spring Framework", "Hibernate", "Servlets", "JDBC"],
    },
    {
        category: "Databases & Cloud",
        skills: ["MySQL", "Firebase", "SQLite"],
    },
    {
        category: "Tools & Design",
        skills: ["Git", "GitHub", "Postman", "Canva", "Tailwind CSS"],
    },
];
