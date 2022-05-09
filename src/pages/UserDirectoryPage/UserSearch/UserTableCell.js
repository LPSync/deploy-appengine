import React, { memo } from "react";
import { makeStyles, TableCell } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userTableCell:{
    padding: theme.spacing(1),
  },
  userTableCellDiv: {
    display: "flex",
    alignItems: "center",
    "& > svg": {
      marginRight: "0.3em",
      fontSize: "1em",
    },
  },
}));

const UserTableCell = ({ icon, content, ...props }) => {
  const classes = useStyles();
  return (
    <TableCell classes={{sizeSmall: classes.userTableCell}} {...props}>
      <div className={classes.userTableCellDiv}>
        {icon}
        {content}
      </div>
    </TableCell>
  );
};

export default memo(UserTableCell);