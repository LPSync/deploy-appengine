import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableCellName: {
    fontWeight: 400,
    borderBottom: "none",
    fontSize: ".9rem",
    padding: 8,
    width: 200,
  },
  tableCellValue: {
    fontWeight: 700,
    borderBottom: "none",
    fontSize: ".9rem",
    padding: 8,
  },
}));

const DrawerTable = ({data}) => {
  const classes = useStyles();
  return (
    <Box mt={1}>
      <TableContainer>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className={classes.tableCellName}>
                  {item.name}
                </TableCell>
                <TableCell className={classes.tableCellValue}>
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DrawerTable;
