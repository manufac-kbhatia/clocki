export const Section = {
  Candidate: "Candidate",
  Team_Lead: "Team Lead",
  Members: "Members",
} as const;

export type SectionType = (typeof Section)[keyof typeof Section];
