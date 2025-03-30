export interface LocatioState {
  from?: string;
}

export const getWeekRange = (date: Date): { startOfWeek: Date; endOfWeek: Date } => {
  const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Adjust so Monday is the first day of the week
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - ((dayOfWeek + 6) % 7)); // Monday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

  return { startOfWeek, endOfWeek };
};
