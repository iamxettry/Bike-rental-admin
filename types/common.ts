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

// User management
export type DashboardQuickStatsType = {
  data: {
    total_users: {
      title: string;
      value: number;
      change: number;
    };
    verified_users: {
      title: string;
      value: number;
      change: number;
    };
    staff_users: {
      title: string;
      value: number;
      change: number;
    };
    pending_verification: {
      title: string;
      value: number;
      change: number;
    };
  };
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  email_verified: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string; // ISO date string format
};

// permission
export interface Permission {
  id: number;
  name: string;
  codename: string;
  content_type: number;
}
// Create roles
export interface CreateGroup {
  name: string;
  permissions: Permission[];
}

// Rental Quick stats
export type RentalQuickStatsType = {
  total_rentals: number;
  pending_rentals: number;
  active_rentals: number;
  completed_rentals: number;
  cancelled_rentals: number;
  overdue_rentals: number;
};

// Payment quick stats
export type PaymentQuickStatsType = {
  total_payments: number;
  pending_payments: number;
  successful_payments: number;
  failed_payments: number;
};
export type PaymentHistoryType = {
  month: string;
  rentals: number;
  amount: number;
};

export type Payment = {
  id: string; // UUID as a string
  total_amount: number; // Total payment amount
  amount_paid: number; // Amount that has been paid
  remaining_amount: number; // Remaining amount to be paid
  product_id: string; // Associated product ID (UUID format)
  transaction_id: string; // Transaction identifier
  status: "PENDING" | "SUCCESS" | "FAILED"; // Payment status with specific allowed values
  created_at: string; // ISO 8601 timestamp string
  payment_date: string;
};
