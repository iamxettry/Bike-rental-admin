"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Filter, Trash2, Edit, Plus } from "lucide-react";
import SupportServices from "@/services/SupportServices";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/utils/Loading";
import useReportSubmit from "@/hooks/useReportSubmit";
import { ReportIssue } from "@/types/SupporTypes";
import { useModal } from "@/hooks/useModalStore";
import { useStore } from "@/store/store";
import Search from "@/components/common/Search";

const ReportIssueAdmin = () => {
  const { handleSubmit, deleteReport } = useReportSubmit();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { searchQuery, setSearchQuery, setIsLoading, isLoading } = useStore();
  const [isEdit, setIsEdit] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<ReportIssue | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // GEt all reported issues
  const { data, isFetching } = useQuery({
    queryFn: async () =>
      await SupportServices.getReportedIssues({
        search_query: debouncedSearchQuery,
        category: selectedCategory,
      }),
    queryKey: ["reportedIssues", debouncedSearchQuery, selectedCategory],
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount or search query change
    } else {
      setIsLoading(isFetching);
      setDebouncedSearchQuery("");
    }
  }, [searchQuery, isFetching]);
  const handleAdd = () => {
    setCurrentIssue({ category: "other", subject: "", description: "" });
    openModal();
  };

  useEffect(() => {
    setSearchQuery("");
    setIsLoading(false);
    closeModal();
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Reported Issues</CardTitle>

            <button
              onClick={handleAdd}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/85"
            >
              <Plus className="h-4 w-4 mr-2" /> Add New Issue
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <div className="relative">
              <Search placeholder="Search reports" />
            </div>
            <div className="flex gap-2">
              <select
                className="p-2 border rounded-lg outline-none border-gray-400"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border">
            {isLoading ? (
              <Loading />
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.map((issue) => (
                    <tr key={issue.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            issue.category === "technical"
                              ? "bg-blue-100 text-blue-800"
                              : issue.category === "billing"
                              ? "bg-yellow-100 text-yellow-800"
                              : issue.category === "feedback"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {issue.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">{issue.subject}</td>
                      <td className="px-6 py-4">{issue.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {issue.created_at?.split("T")[0]}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setCurrentIssue(issue);
                              openModal();
                            }}
                            className="p-1 hover:bg-gray-100 rounded-md"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => issue?.id && deleteReport(issue.id)}
                            className="p-1 hover:bg-gray-100 rounded-md"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

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
                {currentIssue?.id ? "Edit Issue" : "New Issue"}
              </h3>
            </div>
            <form
              onSubmit={(e) => handleSubmit(e, isEdit, currentIssue?.id)}
              className="space-y-4"
            >
              <div>
                <label className="block mb-2">Category</label>
                <select
                  name="category"
                  defaultValue={currentIssue?.category}
                  className="w-full p-2 border rounded outline-none border-gray-400"
                >
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Subject</label>
                <input
                  name="subject"
                  defaultValue={currentIssue?.subject}
                  className="w-full p-2 border rounded outline-none border-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  defaultValue={currentIssue?.description}
                  className="w-full p-2 border rounded h-32 outline-none border-gray-400"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportIssueAdmin;
