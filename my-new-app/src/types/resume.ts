export interface Experience {
    company: string;
    position: string;
    duration: string;
  }
  
  export interface Skill {
    name: string;
    level: string;
  }
  
  export interface Language {
    name: string;
    proficiency: string;
  }
  
  // «базовое» резюме студента (свой `/me`)
  export interface Resume {
    experience: Experience[];
    skills: Skill[];
    languages: Language[];
    additionalInfo: string;
  }
  
  // Резюме для компаний/ЦК — с id и данными пользователя
  export interface ResumeWithUser extends Resume {
    id: string;
    User: {
      id: string;
      name: string;
      email: string;
    };
  }
  

  export const defaultResume: Resume = {
    experience: [],
    skills: [],
    languages: [],
    additionalInfo: "",
};
