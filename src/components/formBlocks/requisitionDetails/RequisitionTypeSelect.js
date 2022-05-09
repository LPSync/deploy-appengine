import React, {memo, useCallback, useState, useContext} from "react";
import {Box, Button, Grid, TextField} from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import RequisitionSelectModalContainer from "../../../pages/CandidateRequestPage/RequisitionDetailsContainers/RequisitionSelectModalContainer";
import {getRequisitionTypeTitle} from "../../../data/helper/helpers";
import {AuthUserContext} from "../../../AuthUserContextProvider";

const RequisitionTypeSelect = ({requisitionType, requisitionTypeError}) => {
  const {permOnboardingRequisitionBypass} = useContext(AuthUserContext);
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Select Requisition to fill" />
      </Grid>
      <Grid item xs={8}>
        <Box style={{display: "flex"}}>
          <Button
            variant="contained"
            color="secondary"
            style={{marginRight: "1em"}}
            onClick={() => setOpen(true)}
          >
            Select
          </Button>
          <form noValidate>
            <TextField
              id="requisition-type"
              error={
                !permOnboardingRequisitionBypass ? false : requisitionTypeError
              }
              style={{width: "45ch"}}
              value={getRequisitionTypeTitle(requisitionType)}
              disabled
            />
          </form>
        </Box>
      </Grid>

      {open && (
        <RequisitionSelectModalContainer
          open={open}
          handleClose={handleClose}
        />
      )}
    </Grid>
  );
};

export default memo(RequisitionTypeSelect);
