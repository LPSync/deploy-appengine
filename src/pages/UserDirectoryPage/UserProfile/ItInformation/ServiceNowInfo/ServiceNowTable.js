import {
  Box,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
} from "@material-ui/core";
import StyledTableRow from "../../../../../components/table/StyledTableRow";
import React from "react";

const useStyles = makeStyles((theme) => ({
  box: {width: "100%"},
  heading: {
    fontWeight: "bold",
  },
  table: {},
  tableHeadCell: {
    background: theme.palette.background.paper,
  },
  tableHeadText: {
    fontSize: "1rem",
    fontWeight: 600,
  },
  tableCell: {
    borderBottom: "none",
  },
  totalBox: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ServiceNowTable = ({columns, titles, title, total}) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.totalBox}>
        <h3>{title}</h3>
        <Typography component={"div"}>Total: {total}</Typography>
      </Box>
      <TableContainer className={classes.table}>
        <Table stickyHeader={true} size="small" aria-label="devices-table">
          <TableHead>
            <TableRow>
              {titles.map((title, index) => (
                <TableCell className={classes.tableHeadCell} key={index}>
                  <Typography
                    component={"div"}
                    className={classes.tableHeadText}
                  >
                    {title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {columns.map((row, index) => (
              <StyledTableRow id={index} key={index}>
                {row.map((cell, idx) => (
                  <TableCell key={idx}>{cell}</TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ServiceNowTable;
