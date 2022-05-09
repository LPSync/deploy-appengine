import React from "react";
import UserManagementContextProvider from "./UserManagementContextProvider";
import UserManagementPageContent from "./UserManagementPageContent";

const UserManagementPage = () => {
  return (
    <UserManagementContextProvider>
      <UserManagementPageContent />
    </UserManagementContextProvider>
  );
};

export default UserManagementPage;
