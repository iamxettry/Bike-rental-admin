import configureAxios from "./axiosConfig";
import { BlogType } from "@/app/Blog/Schema/BlogSchema";
import { getCookies } from "./getCookies";

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
  createBlog: async (data: FormData) => {
    return requests.post("/blog/blogs/", data, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
  //   updaate blog
  updateBlog: async (id: string, data: FormData) => {
    return requests.put(`/blog/blogs/${id}/`, data);
  },

  //   delete blog
  deleteBlog: async (id: string) => {
    return requests.delete(`/blog/blogs/${id}/`);
  },

  //  get author
  getAuthor: async (id: string) => {
    return requests.get(`/blog/authors/${id}/`);
  },
};

export default BlogService;
