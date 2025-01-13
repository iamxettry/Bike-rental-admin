"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, Input } from "@mui/material";
import Search from "@/components/common/Search";
import useBlogSubmit from "@/hooks/useBLogSubmit";
import { useModal } from "@/hooks/useModalStore";
import BlogForm from "@/app/Blog/component/BlogForm";
import BlogFormProvider from "@/app/Blog/component/BlogFormProvider";

export type BlogType = {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  created_at: string;
  updated_at: string;
};

const BlogAdminDashboard = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const [blogs, setBlogs] = useState<BlogType[]>([
    {
      id: "1",
      title: "Understanding Modern Web Development",
      description: "<p>Sample content about web development...</p>",
      image: "/api/placeholder/800/400",
      author: "John Doe",
      created_at: "2025-01-13T10:00:00Z",
      updated_at: "2025-01-13T15:30:00Z",
    },
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogType>>({
    title: "",
    description: "",
    image: "",
    author: "",
  });

  const handleEdit = (blog: BlogType) => {
    setFormData(blog);
    setShowForm(true);
    setIsEditing(blog.id);
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
    });
    closeModal();
    setIsEditing(null);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Blog Management</h2>
            <Button
              onClick={openModal}
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
            <div className="mb-6 bg-black/30 p-6 h-screen  absolute top-0 left-0 right-0 z-50 flex justify-center items-center">
              <BlogFormProvider>
                <BlogForm />
              </BlogFormProvider>
            </div>
          )}

          {/* Blogs Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.author}</TableCell>
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
        </div>
      </div>
    </div>
  );
};

export default BlogAdminDashboard;
