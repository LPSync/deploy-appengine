import React, {memo} from "react";
import {Box} from "@material-ui/core";
import ManagementTextField from "./ManagementTextField";


const AddRoleFrom = ({
  isNewRoleNameError, newRoleName, handleRoleNameChange,
  isNewRoleDescriptionError, newRoleDescription, handleRoleDescriptionChange,
}) => {
  return (
    <>
      <Box m={1}>
        <ManagementTextField
          id="new-role-name"
          label="Role Name"
          error={isNewRoleNameError}
          value={newRoleName}
          onValueChange={handleRoleNameChange}
        />
      </Box>
      <Box m={1}>
        <ManagementTextField
          id="new-role-description"
          label="Role Description"
          multiline
          minRows={2}
          maxRows={4}
          error={isNewRoleDescriptionError}
          value={newRoleDescription}
          onValueChange={handleRoleDescriptionChange}
        />
      </Box>
    </>
  );
};

export default memo(AddRoleFrom);