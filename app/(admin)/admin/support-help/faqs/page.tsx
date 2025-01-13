"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Plus, X } from "lucide-react";
import Search from "@/components/common/Search";
import { useModal } from "@/hooks/useModalStore";
import useFAQSubmit from "@/hooks/useFAQSubmit";
import { FAQ } from "@/types/SupporTypes";
import { useStore } from "@/store/store";
import SupportServices from "@/services/SupportServices";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/utils/Loading";

const FAQAdminPage = () => {
  const { searchQuery, setSearchQuery, setIsLoading, isLoading } = useStore();
  const { isModalOpen, closeModal, openModal } = useModal();
  const [isEdit, setIsEdit] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<FAQ>();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [status, setStatus] = useState("all");

  const { handleSubmit, faqs, setFaqs, deleteFAQ } = useFAQSubmit();
  const handleAdd = () => {
    setCurrentFaq({ question: "", answer: "", status: "draft" });
    openModal();
  };

  useEffect(() => {
    setSearchQuery("");
    setIsLoading(false);
  }, []);
  const { data, isFetching } = useQuery({
    queryFn: async () =>
      await SupportServices.getFAQs({
        search_query: debouncedSearchQuery,
        status: status,
      }),
    queryKey: ["faqs", debouncedSearchQuery, status],
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
  useEffect(() => {
    if (data) {
      setFaqs(data.data);
    }
  }, [data]);
  const handleEdit = (faq: FAQ) => {
    setCurrentFaq(faq);
    setIsEdit(true);
    openModal();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>FAQ Management</CardTitle>
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/85"
          >
            <Plus className="h-4 w-4 mr-2" /> Add FAQ
          </button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search placeholder="Search FQAs.." />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 "
                >
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                </button>
              )}
            </div>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border rounded-lg outline-none border-gray-400"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          {isLoading ? (
            <p>
              <Loading />
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {faqs.map((faq: FAQ) => (
                    <tr key={faq.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {faq.question}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            faq.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {faq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {faq.updated_at?.split("T")[0]}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(faq)}
                            className="p-1 hover:bg-gray-100 rounded-md"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => faq.id && deleteFAQ(faq.id)}
                            className="p-1 hover:bg-gray-100 rounded-md"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data?.data.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        No FAQs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 max-w-xl w-full mx-4"
          >
            <div className="mb-4">
              <h3 className="text-lg font-medium">
                {currentFaq?.id ? "Edit FAQ" : "Add New FAQ"}
              </h3>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => handleSubmit(e, isEdit, currentFaq?.id)}
            >
              <div>
                <label className="block mb-2">Question</label>
                <input
                  name="question"
                  defaultValue={currentFaq?.question}
                  placeholder="Enter question"
                  className="w-full p-2 border rounded outline-none  border-gray-400"
                />
              </div>
              <div>
                <label className="block mb-2">Answer</label>
                <textarea
                  name="answer"
                  placeholder="Enter answer"
                  defaultValue={currentFaq?.answer}
                  className="w-full p-2 border rounded h-32 outline-none  border-gray-400"
                />
              </div>
              <div>
                <label className="block mb-2">Status</label>
                <select
                  name="status"
                  defaultValue={currentFaq?.status}
                  className="w-full p-2 border rounded outline-none  border-gray-400"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
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

export default FAQAdminPage;
