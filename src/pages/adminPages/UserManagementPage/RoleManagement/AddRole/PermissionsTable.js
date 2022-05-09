import React, {memo} from "react";
import {Box, Table, TableBody} from "@material-ui/core";
import PermissionRow, {PermissionHeadRow} from "./PermissionRow";

const PermissionsTable = ({allPermissions, handleSingleCheck, isChecked, permissionQuery}) => {
  const filteredPermissions = allPermissions
    ?.filter((perm) =>
      !permissionQuery
      || isChecked?.[perm?.id]
      || perm?.permissionTitle?.includes(permissionQuery)
      || perm?.permissionDescription?.includes(permissionQuery))
    ?.sort((a, b) => {
        if (!isChecked?.[a?.id] === !isChecked?.[b?.id]) {
          return a?.id < b?.id ? -1 : a?.id > b?.id ? 1 : 0;
        } else {
          return !isChecked?.[a?.id] > !isChecked?.[b?.id] ? 1 : -1;
        }
      },
    );

  return (
    <Box>
      <Table size="small">
        <PermissionHeadRow/>

        <TableBody>
          {filteredPermissions?.map((perm) => (
            <PermissionRow
              key={perm?.id}
              perm={perm}
              handleSingleCheck={handleSingleCheck}
              isSelected={!!isChecked?.[perm?.id]}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default memo(PermissionsTable);