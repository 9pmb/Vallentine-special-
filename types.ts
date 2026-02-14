
export interface Milestone {
  date: string;
  title: string;
  description: string;
  type: 'love' | 'challenge' | 'milestone';
}

export enum AppSection {
  INTRO = 'intro',
  JOURNEY = 'journey',
  APOLOGY = 'apology'
}
