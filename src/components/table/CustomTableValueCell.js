import React, { memo } from "react";
import { makeStyles, TableCell } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableCell: {
    fontWeight: 700,
    borderBottom: "none",
    fontSize: ".9rem",
  },
}));

const CustomTableValueCell = ({ ...props }) => {
  const classes = useStyles();

  return (
    <TableCell align="left" className={classes.tableCell} {...props}/>
  )
}
export default memo(CustomTableValueCell);