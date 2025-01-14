import BlogFormProvider from "@/app/Blog/component/BlogFormProvider";
import BlogAdminDashboard from "@/app/Blog/component/ManageBlog";
import React from "react";

const BlogPage = () => {
  return (
    <div>
      <BlogFormProvider>
        <BlogAdminDashboard />
      </BlogFormProvider>
    </div>
  );
};

export default BlogPage;
