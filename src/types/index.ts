export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  downloadNow?: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: "core" | "frameworks" | "styling" | "tools" | "design";
}
