import React, { memo } from "react";
import { makeStyles, TableCell } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableCellKey: {
    borderBottom: "none",
    fontSize: ".9rem",
    width: "30ch",
  },
}));

const CustomTableTitleCell = ({ ...props }) => {
  const classes = useStyles();
  return (
    <TableCell
      component="th"
      scope="row"
      className={classes.tableCellKey}
      {...props}
    />
  )
}
export default memo(CustomTableTitleCell);