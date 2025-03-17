export const Section = {
  Candidate: "Candidate",
  TeamLead: "Team Lead",
  Members: "Members",
} as const;

export type SectionType = (typeof Section)[keyof typeof Section];
