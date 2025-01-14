"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@mui/material";
import Search from "@/components/common/Search";
import useBlogSubmit from "@/hooks/useBLogSubmit";
import { useModal } from "@/hooks/useModalStore";
import BlogForm from "@/app/Blog/component/BlogForm";
import { useQuery } from "@tanstack/react-query";
import BlogService from "@/services/BlogServices";
import Loading from "@/components/utils/Loading";
import { useStore } from "@/store/store";

export type BlogTypeApi = {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  created_at: string;
  updated_at: string;
};

const BlogAdminDashboard = () => {
  const { openModal, closeModal, isModalOpen, setEditId, setPreview } =
    useModal();
  const { searchQuery, setIsLoading, isLoading } = useStore();
  const { setValue, handleDelete, refreshKey } = useBlogSubmit();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const { data: blogs, isFetching } = useQuery({
    queryFn: async () =>
      await BlogService.getBlogs({
        offset: 0,
        limit: 100,
        query: debouncedSearchQuery,
      }),
    queryKey: ["get-blogs", refreshKey, debouncedSearchQuery],
    select: (data) => data.results,
    staleTime: 0, // Always fetch fresh data
  });

  const handleEdit = (blog: BlogTypeApi) => {
    openModal();
    setValue("title", blog.title);
    setValue("description", blog.description);
    if (blog.image) {
      setPreview(blog.image);
    }
    setEditId(blog.id);
  };
  const handleOpen = () => {
    openModal();
    setEditId("");
    setValue("title", "");
    setValue("description", "");
    setPreview("");
  };

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
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Blog Management</h2>
            <Button
              onClick={handleOpen}
              className="flex items-center gap-2 !bg-primary !text-white px-4 py-2 rounded hover:bg-primary/85"
            >
              <Plus className="h-4 w-4" /> Add New Blog
            </Button>
          </div>
        </div>
        <div className="p-6">
          {/* Search Bar */}
          <div className="mb-4 relative">
            <Search placeholder="Search Blog" />
          </div>

          {/* Blog Form */}
          {isModalOpen && (
            <div
              onClick={closeModal}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div onClick={(e) => e.stopPropagation()}>
                <BlogForm />
              </div>
            </div>
          )}

          {/* Blogs Table */}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    {/* <TableHead>Author</TableHead> */}
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs?.map((blog: BlogTypeApi) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">
                        {blog.title}
                      </TableCell>
                      {/* <TableCell>{Author.first_name}</TableCell> */}
                      <TableCell>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(blog.updated_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAdminDashboard;
