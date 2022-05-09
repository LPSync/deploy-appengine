import React, {useEffect, useState} from "react";
import {
  Box,
  TableContainer,
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import JamfDevicesRows from "./JamfDevicesRows";
import GoogleDevicesRows from "./GoogleDevicesRows";

const useStyles = makeStyles(theme => ({
  box: { width: "100%" },
  heading: {
    fontWeight: "bold",
  },
  table: {
    height: "100%",
  },
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
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const DevicesInfo = () => {
  const classes = useStyles();
  const [jamfTotal, setJamfTotal] = useState();
  const [googleTotal, setGoogleTotal] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = jamfTotal + googleTotal;
    setTotal(sum);
  }, [jamfTotal, googleTotal]);

  return (
    <Box className={classes.box}>
      <>
        {total === 0 ? (
          <Box ml={3}>
            <Typography component={"div"}>No Devices</Typography>
          </Box>
        ) : (
          <>
            <Box className={classes.totalBox}>
              <Typography component={"div"}> Total:
                {!total || isNaN(total)
                  ? <CircularProgress size={18} color="secondary" style={{margin: "0 6px"}}/>
                  : ` ${total}`}
              </Typography>
            </Box>
            <TableContainer className={classes.table}>
              <Table
                stickyHeader={true}
                size="small"
                aria-label="devices-table"
              >
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.tableHeadCell}>
                      <Typography
                        component={"div"}
                        className={classes.tableHeadText}
                      >
                        Device Name
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeadCell}>
                      <Typography
                        component={"div"}
                        className={classes.tableHeadText}
                      >
                        Device Type
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeadCell}>
                      <Typography
                        component={"div"}
                        className={classes.tableHeadText}
                      >
                        Device Serial
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableHeadCell}>
                      <Typography
                        component={"div"}
                        className={classes.tableHeadText}
                      >
                        Managed/User
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody size="small" className={classes.tableBody}>
                  <GoogleDevicesRows setGoogleTotal={setGoogleTotal} />
                  <JamfDevicesRows setJamfTotal={setJamfTotal} />
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </>
    </Box>
  );
};

export default DevicesInfo;
