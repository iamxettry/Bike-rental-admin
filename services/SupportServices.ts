import configureAxios from "./axiosConfig";
import {
  FAQ,
  CustomerSupport,
  ReportIssue,
  SystemAlert,
  ApiResponse,
} from "../types/SupporTypes";

const requests = configureAxios();

const SupportServices = {
  // FAQ Services
  getFAQs: async ({
    search_query,
    status = "all",
  }: {
    search_query?: string;
    status?: string;
  }): Promise<ApiResponse<FAQ[]>> => {
    const searchParam = search_query ? `search=${search_query}` : "";
    const statusParam = status !== "all" ? `&&status=${status}` : "";
    return await requests.get(`/support/faqs/?${searchParam}${statusParam}`);
  },
  postNewFAQ: async (data: FAQ): Promise<ApiResponse<FAQ>> => {
    return await requests.post("/support/faqs/", data);
  },
  updateFAQ: async (id: string, data: FAQ): Promise<ApiResponse<FAQ>> => {
    return await requests.put(`/support/faqs/${id}/`, data);
  },
  deleteFAQ: async (id: string): Promise<ApiResponse<null>> => {
    return await requests.delete(`/support/faqs/${id}/`);
  },

  // Customer Support Services
  getCustomerSupport: async (): Promise<ApiResponse<CustomerSupport[]>> => {
    return await requests.get("/support/customer-support/");
  },
  postCustomerSupport: async (
    data: CustomerSupport
  ): Promise<ApiResponse<CustomerSupport>> => {
    return await requests.post("/support/customer-support/", data);
  },
  updateCustomerSupport: async (
    id: string,
    data: CustomerSupport
  ): Promise<ApiResponse<CustomerSupport>> => {
    return await requests.put(`/support/customer-support/${id}/`, data);
  },
  deleteCustomerSupport: async (id: string): Promise<ApiResponse<null>> => {
    return await requests.delete(`/support/customer-support/${id}/`);
  },

  // Report Issue Services
  getReportedIssues: async ({
    search_query,
    category = "all",
  }: {
    search_query?: string;
    category?: string;
  }): Promise<ApiResponse<ReportIssue[]>> => {
    const searchParams = search_query ? `search=${search_query}` : "";
    const categoryParam = category !== "all" ? `&&category=${category}` : "";
    return await requests.get(
      `/support/report-issues/?${searchParams}${categoryParam}`
    );
  },
  postReportIssue: async (
    data: ReportIssue
  ): Promise<ApiResponse<ReportIssue>> => {
    return await requests.post("/support/report-issues/", data);
  },
  updateReportIssue: async (
    id: string,
    data: ReportIssue
  ): Promise<ApiResponse<ReportIssue>> => {
    return await requests.put(`/support/report-issues/${id}/`, data);
  },
  deleteReportIssue: async (id: string): Promise<ApiResponse<null>> => {
    return await requests.delete(`/support/report-issues/${id}/`);
  },

  // System Alert Services
  getSystemAlerts: async (): Promise<ApiResponse<SystemAlert[]>> => {
    return await requests.get("/support/system-alerts/");
  },
  postSystemAlert: async (
    data: SystemAlert
  ): Promise<ApiResponse<SystemAlert>> => {
    return await requests.post("/support/system-alerts/", data);
  },
  updateSystemAlert: async (
    id: string,
    data: SystemAlert
  ): Promise<ApiResponse<SystemAlert>> => {
    return await requests.put(`/support/system-alerts/${id}/`, data);
  },
  deleteSystemAlert: async (id: string): Promise<ApiResponse<null>> => {
    return await requests.delete(`/support/system-alerts/${id}/`);
  },
};

export default SupportServices;
