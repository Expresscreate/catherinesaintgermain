export interface Credit {
  id: string;
  title: string;
  role: string;
  director: string;
  year: string;
  company?: string;
  type: 'Film' | 'Theater' | 'TV' | 'Voiceover' | 'Formation';
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ActorProfile {
  name: string;
  tagline: string;
  bio: string;
  stats: {
    height: string;
    hair: string;
    eyes: string;
    weight: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    instagram: string;
    youtube: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}