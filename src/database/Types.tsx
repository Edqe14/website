export interface DataInterface {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface Project {
  icons: string[];
  name: string;
  url: string;
  techs: string[];
  gradient: [string, string];
}

export interface SocialMedia {
  icon: string;
  url: string;
}

export interface Contact {
  publicEmail: string;
  socialMedias: SocialMedia[];
  targetEmail?: string;
}
