import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { GET_COST_CENTERS } from "../../../../operations/queries/getCostCenters";
import { RequisitionRequestContext } from "../../RequisitionRequestContextProvider";
import CompanyCodeSelect from "./CompanyCodeSelect";
import ParentMgmtCostCenterSelect from "./ParentMgmtCostCenterSelect";
import MgmtCostCenterSelect from "./MgmtCostCenterSelect";
import FunctionalAreaDescSelect from "./FunctionalAreaDescSelect";
import CountryDescSelect from "./CountryDescSelect";
import handleError from "../../../../data/handleError";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  leftText: {
    paddingLeft: theme.spacing(5)
  }
}));

const CostCenter = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    costCenterData,
    setCostCenterData,
    setManagerCostCenter,
    selectedManager,
    setIsCostCenterDisabled
  } = useContext(RequisitionRequestContext);

  useEffect(() => {
    if (selectedManager) {
      const array = selectedManager.profile.costCenter.split("-");
      setManagerCostCenter(array);
    }
  }, [selectedManager, setManagerCostCenter]);

  useQuery(GET_COST_CENTERS, {
    onCompleted: (data) => setCostCenterData(data.get_cost_centers),
    onError: (error) => handleError(error)(history),
  });

  return (
    <>
      {costCenterData && selectedManager && (
        <>
          <Grid item container>
            <Grid item xs={4}>
              <Typography
                component={"div"}
                variant="subtitle1"
                className={classes.leftText}
              >
                Select requisition cost center
              </Typography>
              <Typography
                component={"div"}
                variant="subtitle2"
                className={classes.leftText}
              >
                code | code description
              </Typography>
              <Box pl={5} mt={3}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setIsCostCenterDisabled(false)}
                >
                  Click here to change
                </Button>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <CompanyCodeSelect/>
              </Box>
              <Box mt={1.5}>
                <ParentMgmtCostCenterSelect/>
              </Box>
              <Box mt={1.5}>
                <MgmtCostCenterSelect/>
              </Box>
              <Box mt={1.5}>
                <FunctionalAreaDescSelect/>
              </Box>
              <Box mt={1.5}>
                <CountryDescSelect/>
              </Box>
              <Box mt={1.5}>
                <Typography>-00 (every cost center ends with -00)</Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CostCenter;
