import React, { memo } from "react";
import { makeStyles, TableCell, TableHead, TableRow } from "@material-ui/core";

const useStyles = makeStyles({
  tableHeadCell: {
    fontWeight: "bold",
  },
});

const userTableHeadCells = [
  { id: "user", name: "User" },
  { id: "location", name: "Location" },
  { id: "businessUnit", name: "Business Unit" },
  { id: "department", name: "Department" },
  { id: "badges", name: "Badges" },
  { id: "info-menu" },
];

const UserTableHead = () => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {userTableHeadCells?.map(({ id, name }) =>
          <TableCell key={id} className={classes.tableHeadCell}>
            {name}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default memo(UserTableHead);