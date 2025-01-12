"use client";
import { mockPermissions } from "@/app/(admin)/admin/user-management/roles-permissions/page";
import React, { useState } from "react";

export interface Permission {
  id: number;
  name: string;
  codename: string;
  content_type: number;
}

const Permissions = () => {
  const [permissions] = useState<Permission[]>(mockPermissions);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Permissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Codename
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {permissions.map((permission) => (
                <tr key={permission.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {permission.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {permission.codename}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {permission.content_type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Permissions;
