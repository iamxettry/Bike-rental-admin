export type QuickStatsType = {
  total_bikes: number;
  active_rentals: number;
  todays_revenue: number;
  new_users: number;
};

export type MonthlyRentalsType = {
  month: string;
  rentals: number;
};
export type HourlyUsageType = {
  hour: string;
  users: number;
};
