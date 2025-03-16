export const TabNames = {
  Users: "Users",
  Teams: "Teams",
  NewUser: "New User",
  NewTeam: "New Team",
} as const;

export type TabNames = (typeof TabNames)[keyof typeof TabNames];
