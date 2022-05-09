import {memo} from "react";
import {TableRow, withStyles} from "@material-ui/core";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
    "&$hover:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  hover: {
    cursor: "pointer",
  },
}))(TableRow);

export default memo(StyledTableRow);
