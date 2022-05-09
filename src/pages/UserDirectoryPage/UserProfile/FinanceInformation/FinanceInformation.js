import React, {memo, useCallback, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {
  Box,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import {GET_COST_CENTERS} from "../../../../operations/queries/getCostCenters";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import TopTypography from "../../../../components/typographies/TopTypography";
import { connect } from "react-redux";
import { setCostCenters, } from "../../../../data/redux/userDirectory/userDirectoryActions";

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 700,
  },
  tableCellKey: {
    borderBottom: "none",
  },
  tableCell: {
    fontWeight: 600,
    borderBottom: "none",
  },

  tableHeadCell: {
    fontWeight: "bold",
  },
  icon: {
    fontSize: "1rem",
  },
  copySpan: {
    marginLeft: theme.spacing(1),
  },
  costCenterBox: {
    display: "flex",
    alignItems: "center",
  },
}));

const FinanceInformation = ({userData, costCenters, setCostCenters}) => {
  const classes = useStyles();
  const history = useHistory();
  const [viewBreakdown, setViewBreakdown] = useState(false);
  const [partOne, setPartOne] = useState();
  const [partTwo, setPartTwo] = useState();
  const [partThree, setPartThree] = useState();
  const [partFour, setPartFour] = useState();
  const [partFive, setPartFive] = useState();
  const [partOneDesc, setPartOneDesc] = useState();
  const [partTwoDesc, setPartTwoDesc] = useState();
  const [partThreeDesc, setPartThreeDesc] = useState();
  const [partFourDesc, setPartFourDesc] = useState();
  const [partFiveDesc, setPartFiveDesc] = useState();
  const [isCopied, setIsCopied] = useState(false);

  useQuery(GET_COST_CENTERS, {
    onCompleted: (data) => setCostCenters(data.get_cost_centers),
    onError: (error) => handleError(error)(history),
  });

  const getUserCostCenterDetails = useCallback(
    (userCostCenter) => {
      const split = userCostCenter.split("-");

      setPartOne(split[0]);
      setPartTwo(split[1]);
      setPartThree(split[2]);
      setPartFour(split[3]);
      setPartFive(split[4]);

      costCenters.forEach((costCenter) => {
        if (costCenter.id === "CC" + split[0]) {
          setPartOneDesc(costCenter.costCenterDescription);
        } else if (costCenter.id === "PMCC" + split[1]) {
          setPartTwoDesc(costCenter.costCenterDescription);
        } else if (costCenter.id === "MCC" + split[2]) {
          setPartThreeDesc(costCenter.costCenterDescription);
        } else if (costCenter.id === "FAD" + split[3]) {
          setPartFourDesc(costCenter.costCenterDescription);
        } else if (costCenter.id === "CD" + split[4]) {
          setPartFiveDesc(costCenter.costCenterDescription);
        }
      });

      setViewBreakdown(true);
    },
    [costCenters]
  );

  useEffect(() => {
    if (userData && costCenters) {
      if (userData?.profile?.costCenter) {
        getUserCostCenterDetails(userData?.profile?.costCenter);
      }
    }
  }, [userData, costCenters, getUserCostCenterDetails]);

  return (
    <Box>
      <Toolbar>
        <Box>
          <TopTypography>Cost Center</TopTypography>
        </Box>
      </Toolbar>

      {userData?.profile?.costCenter ? (
        <>
          {viewBreakdown ? (
            <Box ml={2}>
              <Box ml={2} className={classes.costCenterBox}>
                <Box>
                  <Typography>
                    <strong>{userData?.profile?.costCenter}</strong>
                  </Typography>
                </Box>
                <Box>
                  <CopyToClipboard
                    text={userData?.profile?.costCenter}
                    onCopy={() => setIsCopied(true)}
                  >
                    <Tooltip title="Copy cost center to clipboard">
                      <IconButton aria-label="copy">
                        <FileCopyIcon className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                  </CopyToClipboard>
                </Box>
              </Box>

              <Box m={2}>
                <Typography component={"div"} variant="body2">
                  <strong>Here is a breakdown of the Cost Center:</strong>
                </Typography>
              </Box>
              <TableContainer>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="cost center table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeadCell}>
                        Category
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Code
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Description
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCellKey}
                      >
                        Company Code
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partOne}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partOneDesc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCellKey}
                      >
                        Parent Management Cost Center
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partTwo}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partTwoDesc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCellKey}
                      >
                        Management Cost Center
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partThree}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partThreeDesc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCellKey}
                      >
                        Functional Area Description
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partFour}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partFourDesc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCellKey}
                      >
                        Country Description
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partFive}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {partFiveDesc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCellKey}
                      >
                        Every Cost Center Ends in
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        00
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell} />
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <LoadingCircle text={"loading cost center details..."} />
          )}
        </>
      ) : (
        <Typography>No Cost Center</Typography>
      )}
    </Box>
  );
};

export default connect(
  state => ({
    userData: state.userDirectory.get("userData"),
    costCenters: state.userDirectory.get("costCenters")
  }),
  {setCostCenters})
(memo(FinanceInformation));
