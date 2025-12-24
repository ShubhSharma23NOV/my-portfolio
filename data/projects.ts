export interface Project {
    title: string;
    description: string;
    techStack: string[];
    image: string;
    screenshots?: string[]; // New field for the gallery
    problem: string;
    solution: string;
    whatIBuilt: string[];
    impact: string[];
    liveUrl?: string;
}

export const projects: Project[] = [
    {
        title: "AarogyaJal – Smart Water Health Surveillance System",
        description: "A smart health surveillance platform that predicts water-borne disease risks using real-time water quality and community health data.",
        image: "/images/aarogyajal.jpg",
        screenshots: ["/images/AarogyaJal/ss1.png", "/images/AarogyaJal/ss2.png", "/images/AarogyaJal/ss3.png", "/images/AarogyaJal/ss4.png"],
        problem: "Rural and remote regions face frequent outbreaks of water-borne diseases due to delayed testing, manual reporting, and lack of early warning systems.",
        solution: "Designed a digital system that continuously monitors water quality, collects community health data, and alerts authorities before outbreaks escalate.",
        whatIBuilt: [
            "Designed interactive dashboards for health officials and Mobile App for Field Workers",
            "Created prototype workflows for water testing, alerts, and reports",
            "Visualized trends for pH, turbidity, and temperature data",
            "Built role-based access flows for admins, doctors, and ASHA workers"
        ],
        impact: [
            "Enables early detection of disease risks",
            "Reduces response time for public health authorities",
            "Improves decision-making with real-time insights"
        ],
        techStack: [
            "React",
            "Tailwind CSS",
            "React Native",
            "Spring Boot",
            "Firebase",
            "SQLite",
            "N8N"
        ],
    },
    {
        title: "CampusConnect – Smart Campus Communication Platform",
        description: "A centralized digital platform to improve communication and coordination within a college campus.",
        image: "/images/campusconnect1.png",
        screenshots: ["/images/Campusconnect/ss1.png", "/images/Campusconnect/ss2.png"],
        problem: "Students miss important notices, events, and updates due to scattered communication across emails, WhatsApp groups, and notice boards.",
        solution: "Built a unified campus platform where students, faculty, and admins can access announcements, events, and academic updates in one place.",
        whatIBuilt: [
            "Designed clean UI for student and admin dashboards",
            "Implemented announcement and event display workflows",
            "Created role-based views for students, faculty, and administrators",
            "Focused on usability and mobile-first design"
        ],
        impact: [
            "Reduces communication gaps on campus",
            "Improves student engagement and awareness",
            "Centralizes academic and event information"
        ],
        techStack: ["React", "Tailwind CSS", "Firebase", "Spring Boot"],
    },
    {
        title: "SthayiNiwas:Real Estate Website",
        description: "A modern real estate website to showcase properties with an intuitive and visually rich user experience.",
        image: "/images/real-estate.png",
        screenshots: ["/images/RealEstate/ss1.png", "/images/RealEstate/ss2.png", "/images/RealEstate/ss3.png"],
        problem: "Traditional property websites are cluttered, slow, and lack clear property visualization for buyers.",
        solution: "Designed a responsive real estate platform focused on clean layouts, property visuals, and easy navigation.",
        whatIBuilt: [
            "Created property listing and detail page prototypes",
            "Designed filters for location, price, and property type",
            "Built responsive layouts for desktop and mobile",
            "Focused on visual presentation and user flow"
        ],
        impact: [
            "Improves user experience for buyers",
            "Makes property comparison easier",
            "Enhances trust through clean design"
        ],
        techStack: ["React", "Tailwind CSS", "MySql", "Spring Boot"],
    },
    {
        title: "Password Generator Plugin – Secure Password Utility",
        description: "A lightweight browser plugin that generates strong and customizable passwords instantly.",
        image: "/images/password_generator.png",
        screenshots: ["/images/Password/ss1.png"],
        problem: "Users often reuse weak passwords due to inconvenience and lack of simple tools.",
        solution: "Built a browser plugin that generates secure passwords based on user-defined criteria.",
        whatIBuilt: [
            "Designed simple and minimal plugin UI",
            "Implemented logic for random, secure password generation",
            "Added options for length, symbols, numbers, and uppercase letters",
            "Focused on speed and usability"
        ],
        impact: [
            "Encourages better password hygiene",
            "Reduces reliance on weak or repeated passwords",
            "Improves everyday security practices"
        ],
        techStack: ["HTML", "CSS", "JavaScript", "CPP"],
    },
];
