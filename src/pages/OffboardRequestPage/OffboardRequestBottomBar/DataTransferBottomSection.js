import React, {memo} from "react";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import BottomSectionTitle from "./BottomSectionTitle";
import CustomChip from "../../../components/chips/CustomChip";
import BottomSectionWrapper from "./BottomSectionWrapper";
import { shallowEqual, useSelector } from "react-redux";
import { getActiveStep, getOffboardingRequestObject } from "../OffboardRequestPageContent";

const useStyles = makeStyles(() => ({
  chip: {fontSize: ".7rem"},
}));

const DataTransferBottomSection = () => {
  const classes = useStyles();
  const activeStep = useSelector(getActiveStep);
  const dataTransfer = useSelector(getOffboardingRequestObject("dataTransfer"), shallowEqual);
  const {
    selectedTransferUser,
    isDriveChecked,
    isCalendarChecked,
    isDataStudioChecked,
  } = dataTransfer || {};

  return (
    <BottomSectionWrapper xs={3}>
      <BottomSectionTitle title={"Data Transfer"}>
        <SyncAltIcon />
      </BottomSectionTitle>
      {activeStep !== 0 && activeStep !== 1 && (
        <Grid item>
          <Grid item>
            <>
              {isDriveChecked && (
                <CustomChip className={classes.chip} label={"Google Drive"} />
              )}
              {isCalendarChecked && (
                <CustomChip
                  className={classes.chip}
                  label={"Google Calendar"}
                />
              )}
              {isDataStudioChecked && (
                <CustomChip
                  className={classes.chip}
                  label={"Google Data Studio"}
                />
              )}
            </>
          </Grid>
          <Grid item>
            <Typography variant={"subtitle1"}>
              Transfer To:{" "}
              <>
                {selectedTransferUser?.profile?.email ===
                "livepersondrive@liveperson.com" ? (
                  "livepersondrive@liveperson.com"
                ) : (
                  <>
                    {selectedTransferUser?.profile?.firstName}{" "}
                    {selectedTransferUser?.profile?.lastName}
                  </>
                )}
              </>
            </Typography>
          </Grid>
        </Grid>
      )}
    </BottomSectionWrapper>
  );
};

export default memo(DataTransferBottomSection);
