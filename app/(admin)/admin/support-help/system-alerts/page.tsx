"use client";
import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import { useModal } from "@/hooks/useModalStore";
import { SystemAlert } from "@/types/SupporTypes";
import { useQuery } from "@tanstack/react-query";
import SupportServices from "@/services/SupportServices";
import useSystemAlertSubmit from "@/hooks/useSystemAlertSubmit";
import Loading from "@/components/utils/Loading";

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "Database Maintenance",
    message:
      "Scheduled database maintenance will occur on March 15th from 2-4 AM EST.",
    timestamp: "2024-03-10T10:00:00Z",
  },
  {
    id: 2,
    type: "resolved",
    title: "API Service Restored",
    message:
      "The API service interruption has been resolved. All systems are now operational.",
    timestamp: "2024-03-09T15:30:00Z",
  },
  {
    id: 3,
    type: "upcoming",
    title: "System Update",
    message:
      "A system update is scheduled for March 20th. No downtime is expected.",
    timestamp: "2024-03-20T08:00:00Z",
  },
];
const getFormatedDateTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleString();
};

function SystemAlertsPage() {
  const { handleSubmit, deleteAlert } = useSystemAlertSubmit();
  const { openModal, closeModal, isModalOpen } = useModal();
  const [currentAlert, setCurrentAlert] = useState<SystemAlert | null>(null);
  const getAlertStyle = (type: string) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
        };
      case "resolved":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        };
      case "upcoming":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          icon: <Clock className="w-5 h-5 text-blue-600" />,
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          icon: null,
        };
    }
  };

  const { data, isLoading } = useQuery({
    queryFn: async () => await SupportServices.getSystemAlerts(),
    queryKey: ["systemAlerts"],
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  const handleAdd = () => {
    openModal();
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">System Alerts</h1>

        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/85"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Alert
        </button>
      </div>
      {isLoading ? (
        <div className="min-h-60 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="space-y-4">
          {data?.map((alert) => {
            const style = getAlertStyle(alert.status);
            return (
              <div
                key={alert.id}
                className={`${style.bg} ${style.border} border rounded-lg p-4 flex justify-between items-center`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
                  <div className="ml-3 flex-1">
                    <h3 className={`text-sm font-medium ${style.text}`}>
                      {alert.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {alert.description}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {alert?.date_time && getFormatedDateTime(alert.date_time)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mr-8">
                  <button
                    className="mt-2 text-sm text-blue-500 hover:underline"
                    onClick={() => {
                      setCurrentAlert(alert);
                      openModal();
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="mt-2 text-sm text-blue-500 hover:underline"
                    onClick={() => alert?.id && deleteAlert(alert.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Alert Status Legend</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-sm text-gray-600">
              Critical - Immediate attention required
            </span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">
              Resolved - Issue has been fixed
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">
              Upcoming - Scheduled maintenance or updates
            </span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          onClick={() => closeModal()}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 max-w-xl w-full mx-4"
          >
            <div className="mb-4">
              <h3 className="text-lg font-medium">
                {currentAlert?.id ? "Edit Issue" : "New Issue"}
              </h3>
            </div>
            <form
              onSubmit={(e) =>
                handleSubmit(e, !!currentAlert?.id, currentAlert?.id)
              }
            >
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  defaultValue={currentAlert?.status}
                  required
                >
                  <option value="critical">Critical</option>
                  <option value="resolved">Resolved</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={currentAlert?.title}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={currentAlert?.description}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/85"
                >
                  {currentAlert?.id ? "Update Alert" : "Create Alert"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SystemAlertsPage;
