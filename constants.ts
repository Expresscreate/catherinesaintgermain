import { ActorProfile, Credit, Skill } from './types';

export const ACTOR_PROFILE: ActorProfile = {
  name: "CATHERINE ST-GERMAIN",
  tagline: "Actrice • Créatrice • Performeuse",
  bio: "Passionnée par l'art de la création, j'ai développé une approche unique qui allie méditation et imagination. À travers la méditation, je cultive un état d'esprit propice à l'exploration intérieure, ce qui me permet de donner vie à des personnages riches et nuancés, chacun porteur d'une histoire singulière. Mon penchant pour la construction d'univers variés me pousse à toujours imaginer des mondes fascinants, qu'ils soient ancrés dans la réalité ou plongés dans des dimensions fantastiques. Ma flexibilité et ma capacité d'adaptation font de moi un créateur malléable, prêt à évoluer et à intégrer de nouvelles idées. J'apprécie collaborer avec d'autres talents, car chaque interaction enrichit mon processus créatif. Mon objectif est de contribuer à des projets innovants où l'authenticité des personnages et la profondeur des univers narratifs sont au cœur de l'expérience.",
  stats: {
    height: "5' 3\"",
    hair: "Châtain",
    eyes: "Pers",
    weight: "115 lbs",
  },
  contact: {
    email: "catherine4812@hotmail.com",
    phone: "819-668-7125",
    location: "Québec",
    instagram: "https://www.instagram.com/catherine.stgermain.16?igsh=MTBkYmJtbnFmM25qYQ%3D%3D&utm_source=qr",
    youtube: "https://www.youtube.com/watch?v=I7bIiB_sSSA"
  }
};

export const CREDITS: Credit[] = [
  { 
    id: '1', 
    title: "À présent", 
    role: "Comédienne", 
    director: "Yves Deguire", 
    year: "2024", 
    company: "Théâtre des nouveaux compagnons", 
    type: "Theater" 
  },
  { 
    id: '2', 
    title: "Sisters 2023", 
    role: "Actrice", 
    director: "Jeremy Espaillard", 
    year: "2023", 
    company: "Production Jeremy Espaillard", 
    type: "Film" 
  },
  { 
    id: '3', 
    title: "Prendre racine sur Andromak", 
    role: "Comédienne", 
    director: "Patrice Dussault", 
    year: "2023-2024", 
    company: "L'Atelier", 
    type: "Theater" 
  },
  { 
    id: '4', 
    title: "Vera", 
    role: "Comédienne", 
    director: "Patrice Dussault", 
    year: "2021-2022", 
    company: "L'Atelier", 
    type: "Theater" 
  },
  { 
    id: '5', 
    title: "Cours de jeu caméra", 
    role: "Formation", 
    director: "Laurence-Anaïs / Marylou Mucret", 
    year: "2023-Présent", 
    company: "Agence Verso", 
    type: "Formation" 
  },
  { 
    id: '6', 
    title: "École d'acteur", 
    role: "Formation", 
    director: "-", 
    year: "2022-2024", 
    company: "Mode é Arto", 
    type: "Formation" 
  },
];

export const SKILLS: Skill[] = [
  { category: "Jeu", items: ["Jeu à la caméra", "Jeu théâtral", "Composition de personnage", "Expression corporelle et faciale", "Apprentissage rapide de texte"] },
  { category: "Création", items: ["Création de décor et costume", "Photographie", "Sens de l'esthétique", "Créativité"] },
  { category: "Sports", items: ["Fitness", "Course à pied", "Randonnée"] },
  { category: "Qualités", items: ["Soucis du détail", "Organisation", "Adaptabilité", "Esprit d'équipe", "Auto-critique constructive"] },
];

export const GALLERY_IMAGES = [
  "/portfolio1.jpg",
  "/portfolio2.jpg",
  "/portfolio3.jpg",
];