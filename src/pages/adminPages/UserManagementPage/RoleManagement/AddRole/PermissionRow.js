import React, {memo} from "react";
import {makeStyles, TableCell, TableHead, TableRow} from "@material-ui/core";
import CustomTableRow from "../../../../../components/table/CustomTableRow";
import ColorCheckbox from "../../../../../components/checkboxes/ColorCheckbox";

const useStyles = makeStyles(() => ({
  tableHeadCell: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  tableBodyCell: {
    fontSize: ".85rem",
  }
}));

export const permissionTableHead = [
  {id: "select", value: "Select"},
  {id: "permission", value: "Permission"},
  {id: "description", value: "Description"},
];

const permissionRowData = (perm, isSelected, handleSingleCheck) => [
  {
    id: "select",
    value: <ColorCheckbox
      checked={isSelected}
      value={perm?.id}
      onChange={handleSingleCheck}
    />,
  },
  {id: "permission", value: perm?.permissionTitle},
  {id: "description", value: perm?.permissionDescription},
];


export const PermissionHeadRow = memo(() => {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        {permissionTableHead?.map(({id, value}) => (
          <TableCell key={id} className={classes.tableHeadCell}>
            {value}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});

const PermissionRow = ({perm, isSelected, handleSingleCheck}) => {
  const classes = useStyles();
  return (
    <CustomTableRow
      id={perm?.id}
      align={"left"}
      rowData={permissionRowData(perm, isSelected, handleSingleCheck)}
      tableCellClasses={classes.tableBodyCell} />
  );
};


export default memo(PermissionRow);