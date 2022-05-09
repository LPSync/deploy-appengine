import React, { createContext, useState } from "react";

export const UserManagementContext = createContext();

const UserManagementContextProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [allRoles, setAllRoles] = useState();
  const [allPermissions, setAllPermissions] = useState();
  const [allPermissionUsers, setAllPermissionUsers] = useState();
  const [selectedUsers, setSelectedUsers] = useState();
  const [selectedUsersTotal, setSelectedUsersTotal] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [selectedPermissions, setSelectedPermissions] = useState();
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isViewDetailsContent, setIsViewDetailsContent] = useState(false);
  const [isEditRoleContent, setIsEditRoleContent] = useState(false);

  return (
    <UserManagementContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
        allRoles,
        setAllRoles,
        allPermissions,
        setAllPermissions,
        selectedUsers,
        setSelectedUsers,
        selectedUsersTotal,
        setSelectedUsersTotal,
        selectedRole,
        setSelectedRole,
        selectedPermissions,
        setSelectedPermissions,
        isAddRoleOpen,
        setIsAddRoleOpen,
        isViewDetailsContent,
        setIsViewDetailsContent,
        isEditRoleContent,
        setIsEditRoleContent,
        allPermissionUsers,
        setAllPermissionUsers,
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};

export default UserManagementContextProvider;
