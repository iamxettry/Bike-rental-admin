"use client";
import React, { useState } from "react";
import { Shield, Users, Plus, Edit2, Trash2, X } from "lucide-react";
import Permissions, {
  Permission,
} from "@/components/userManagement/roles&Permission/Permissions";
import { CreateGroup } from "@/types/common";
import UserServices from "@/services/UserServices";

export interface Group {
  id: number;
  name: string;
  permissions: Permission[];
}

// Mock data
export const mockPermissions: Permission[] = [
  { id: 1, name: "Can add user", codename: "add_user", content_type: 1 },
  { id: 2, name: "Can change user", codename: "change_user", content_type: 1 },
  { id: 3, name: "Can delete user", codename: "delete_user", content_type: 1 },
  { id: 4, name: "Can view user", codename: "view_user", content_type: 1 },
];

const mockGroups: Group[] = [
  {
    id: 1,
    name: "Administrators",
    permissions: [mockPermissions[0], mockPermissions[1]],
  },
  { id: 2, name: "Editors", permissions: [mockPermissions[3]] },
];

function RolesAndPermissionPage() {
  const [activeTab, setActiveTab] = useState<"roles" | "permissions">("roles");
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [newGroup, setNewGroup] = useState<{
    name: string;
    permissions: number[];
  }>({
    name: "",
    permissions: [],
  });
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);

  const handleDeleteGroup = (groupId: number) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
  };

  const handleUpdateGroup = (groupId: number) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...editingGroup! } : group
      )
    );
    setEditingGroup(null);
  };

  const handleCreateGroup = async () => {
    const newGroupWithId: CreateGroup = {
      name: newGroup.name,
      permissions: permissions.filter((p) =>
        newGroup.permissions.includes(p.id)
      ),
    };
    // console.log("newGroupWithId", newGroupWithId);
    // const newPromise = new Promise(async (resolve, reject) => {
    //   try {
    //     const response = await UserServices.createUserRole(newGroupWithId);
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });

    setNewGroup({ name: "", permissions: [] });
    setShowNewGroupForm(false);
  };

  const togglePermissionForNewGroup = (permissionId: number) => {
    setNewGroup((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const togglePermissionForEditingGroup = (permission: Permission) => {
    if (!editingGroup) return;

    setEditingGroup((prev) => ({
      ...prev!,
      permissions: prev!.permissions.some((p) => p.id === permission.id)
        ? prev!.permissions.filter((p) => p.id !== permission.id)
        : [...prev!.permissions, permission],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Permissions & Roles Management
        </h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("roles")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === "roles"
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Roles
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === "permissions"
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Shield className="w-5 h-5 mr-2" />
            Permissions
          </button>
        </div>

        {/* Roles (Groups) Management */}
        {activeTab === "roles" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Roles</h2>
              {!showNewGroupForm && (
                <button
                  onClick={() => setShowNewGroupForm(true)}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/85"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Role
                </button>
              )}
            </div>

            {/* New Group Form */}
            {showNewGroupForm && (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Create New Role</h3>
                  <button
                    onClick={() => setShowNewGroupForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role Name
                    </label>
                    <input
                      type="text"
                      value={newGroup.name}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter role name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Permissions
                    </label>
                    <div className="space-y-2">
                      {permissions.map((permission) => (
                        <label
                          key={permission.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={newGroup.permissions.includes(
                              permission.id
                            )}
                            onChange={() =>
                              togglePermissionForNewGroup(permission.id)
                            }
                            className="rounded text-blue-500 focus:ring-blue-500"
                          />
                          <span>{permission.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowNewGroupForm(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateGroup}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/85"
                    >
                      Create Role
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Groups List */}
            <div className="space-y-4">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  {editingGroup?.id === group.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role Name
                        </label>
                        <input
                          type="text"
                          value={editingGroup.name}
                          onChange={(e) =>
                            setEditingGroup({
                              ...editingGroup,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Permissions
                        </label>
                        <div className="space-y-2">
                          {permissions.map((permission) => (
                            <label
                              key={permission.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={editingGroup.permissions.some(
                                  (p) => p.id === permission.id
                                )}
                                onChange={() =>
                                  togglePermissionForEditingGroup(permission)
                                }
                                className="rounded text-blue-500 focus:ring-blue-500"
                              />
                              <span>{permission.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingGroup(null)}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateGroup(group.id)}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/85"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditGroup(group)}
                            className="p-1 text-gray-500 hover:text-purple-600"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGroup(group.id)}
                            className="p-1 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.permissions.map((permission) => (
                          <span
                            key={permission.id}
                            className="px-2 py-1 bg-pink-100 text-purple-600 text-sm rounded-full"
                          >
                            {permission.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions List */}
        {activeTab === "permissions" && <Permissions />}
      </div>
    </div>
  );
}

export default RolesAndPermissionPage;
