// types.ts

export type FAQ = {
  id?: string; // UUID (optional for creation)
  question: string;
  answer: string;
  status: "draft" | "published";
  created_at?: string; // ISO timestamp
  updated_at?: string; // ISO timestamp
};

export type CustomerSupport = {
  id?: string; // UUID (optional for creation)
  email: string;
  phone: string;
  address?: string; // Optional field
};

export type ReportIssue = {
  id?: string; // UUID (optional for creation)
  category: "technical" | "billing" | "feedback" | "other";
  subject: string;
  description: string;
  created_at?: string; // ISO timestamp
  updated_at?: string; // ISO timestamp
};

export type SystemAlert = {
  id?: string; // UUID (optional for creation)
  title: string;
  description: string;
  date_time: string; // ISO timestamp
  status: "critical" | "resolved" | "upcoming";
};

// Generic API Response
export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};
