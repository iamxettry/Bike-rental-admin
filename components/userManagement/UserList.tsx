"use client";
import { Search } from "lucide-react";
import React from "react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  email_verified: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    username: "johndoe",
    email_verified: true,
    is_staff: false,
    is_superuser: false,
    date_joined: "2024-01-15",
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com",
    username: "janesmith",
    email_verified: true,
    is_staff: true,
    is_superuser: false,
    date_joined: "2024-02-01",
  },
];
const UserList = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(mockUsers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      mockUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(term) ||
          user.username.toLowerCase().includes(term) ||
          user.first_name.toLowerCase().includes(term) ||
          user.last_name.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">User List</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="overflow-x-auto">
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
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
