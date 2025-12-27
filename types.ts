
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Project {
  id: string;
  title: string;
  goal: string;
  stages: string[];
  results: string;
  progress: number;
  icon: string;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export type Language = 'uk' | 'ru' | 'en';

export interface AppSettings {
  fontSize: 'small' | 'medium' | 'large';
  fontWeight: 'normal' | 'bold';
  accentColor: string;
  language: Language;
}
