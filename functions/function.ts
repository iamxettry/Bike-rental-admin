// utils/function.ts

export const getCurrentWeek = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Calculate days since the first day of the month
  const daysSinceFirstDay = Math.floor(
    (today.getTime() - firstDayOfMonth.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate the week number (1-based)
  const currentWeek = Math.ceil((daysSinceFirstDay + 1) / 7);

  return currentWeek;
};
