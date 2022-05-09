import React, { memo } from "react";
import { makeStyles, TableCell, TableRow } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableCellKey: {
    borderBottom: "none",
  },
  tableCell: {
    fontWeight: 600,
    borderBottom: "none",
  },
}));

const CustomTableLabelValueRow = ({row}) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell
        component="th"
        scope="row"
        className={classes.tableCellKey}
      >
        {row?.label}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {row?.value}
      </TableCell>
    </TableRow>
  )
};

export default memo(CustomTableLabelValueRow);