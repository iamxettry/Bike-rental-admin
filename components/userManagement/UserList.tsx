"use client";
import UserServices from "@/services/UserServices";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import { User } from "@/types/common";
import { useStore } from "@/store/store";
import Pagination from "../rentalManagement/Pagination";

const UserList = () => {
  const [count, setCount] = useState(0);
  const {
    searchQuery,
    setSearchQuery,
    users,
    isLoading,
    setIsLoading,
    setUsers,
    offset,
  } = useStore();

  //   fetch user list
  const { data, isFetching } = useQuery({
    queryFn: async () =>
      await UserServices.getAllUsers({
        limit: 5,
        offset,
      }),
    queryKey: ["userList", offset],
  });

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        const response = await UserServices.searchUsers(searchQuery);
        setIsLoading(false);
        console.log("response", response);
        setCount(response?.count);
        setUsers(response?.results);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      if (data?.count > 0) {
        setCount(data.count);
        setUsers(data.results);
        setIsLoading(isFetching);
      }
    }
  }, [searchQuery, data, isFetching]);

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">User List</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="overflow-x-auto">
          {isFetching || isLoading ? (
            <Loading />
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((user: User) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.email_verified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.email_verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.is_superuser
                        ? "Superuser"
                        : user.is_staff
                        ? "Staff"
                        : "User"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.date_joined).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {count === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No user found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <Pagination count={count} />
        </div>
      </div>
    </div>
  );
};

export default UserList;
