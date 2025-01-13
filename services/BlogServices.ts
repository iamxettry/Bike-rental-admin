import { BlogType } from "@/app/(admin)/admin/blogs/page";
import configureAxios from "./axiosConfig";

const requests = configureAxios();

const BlogService = {
  getBlogs: async ({
    offset = 0,
    limit = 10,
    query,
  }: {
    offset?: number;
    limit?: number;
    query?: string;
  }) => {
    const offsetParam = offset ? `offset=${offset}` : "offset=0";
    const limitParam = limit ? `&&limit=${limit}` : "";
    const queryParam = query ? `&&search=${query}` : "";
    return requests.get(
      `/blog/blogs/?${offsetParam}${limitParam}${queryParam}`
    );
  },
  //   Create blog
  createBlog: async (data: BlogType) => {
    return requests.post("/blog/blogs/", data);
  },
  //   updaate blog
  updateBlog: async (id: string, data: BlogType) => {
    return requests.put(`/blog/blogs/${id}/`, data);
  },

  //   delete blog
  deleteBlog: async (id: string) => {
    return requests.delete(`/blog/blogs/${id}/`);
  },
};

export default BlogService;
