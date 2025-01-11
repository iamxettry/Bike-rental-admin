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

export type BikeDistrubutionType = {
  total_bikes: number;
  available_bikes: number;
  reserved_bikes: number;
  under_maintenance: number;
  in_use: number;
};

export type MonthlyRevenueRentalsType = {
  month: string;
  revenue: number;
  rentals: number;
};

export type PaymentMethodsType = {
  credit_card: number;
  debit_card: number;
  digital_wallet: number;
  cash: number;
};

export type WeeklyUsersType = {
  name: string;
  active: number;
  new: number;
};
