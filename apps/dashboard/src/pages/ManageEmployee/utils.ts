export const TabNames = ["Users", "Teams", "New user", "New Team"] as const;
export type TabNames = (typeof TabNames)[number];
