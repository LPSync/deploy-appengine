import React, {memo} from "react";
import {useSelector} from "react-redux";
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";
import DevicesIcon from "@material-ui/icons/Devices";
import BottomSectionTitle from "./BottomSectionTitle";
import CustomChip from "../../../components/chips/CustomChip";
import BottomSectionWrapper from "./BottomSectionWrapper";
import {
  getActiveStep,
  getInOffboardingRequest,
  getOffboardingRequestObject,
} from "../OffboardRequestPageContent";
import {isObjectsEqual} from "../../../data/helper/commonFunctions";

const useStyles = makeStyles(() => ({
  chip: {fontSize: ".7rem"},
  box: {height: "95px", overflow: "auto"},
}));

const LicensesDevicesBottomSection = () => {
  const activeStep = useSelector(getActiveStep);
  const deviceUnassign = useSelector(
    getOffboardingRequestObject("deviceUnassign"),
    isObjectsEqual
  );
  const unassignLicenses = useSelector(
    getInOffboardingRequest(["licenseRemoval", "unassignLicenses"])
  );

  const {jamfDevicesData, googleDevicesData} = deviceUnassign || {};

  const classes = useStyles();

  return (
    <BottomSectionWrapper xs={3}>
      <BottomSectionTitle title={"Licenses/Devices"}>
        <DevicesIcon />
      </BottomSectionTitle>
      {activeStep !== 0 && activeStep !== 1 && (
        <Grid item>
          <Grid Item>
            <Box className={classes.box}>
              <>
                {unassignLicenses?.some((license) => license?.isChecked) ? (
                  unassignLicenses?.map(
                    (license) =>
                      license?.isChecked && (
                        <CustomChip
                          className={classes.chip}
                          label={license?.name}
                        />
                      )
                  )
                ) : (
                  <Typography variant={"subtitle1"}>
                    No licenses selected
                  </Typography>
                )}
              </>
              <>
                {jamfDevicesData?.length > 0 ||
                googleDevicesData?.length > 0 ? (
                  <>
                    {jamfDevicesData?.map(
                      (device) =>
                        device?.isChecked && (
                          <CustomChip
                            className={classes.chip}
                            label={`${device.deviceName} : ${device.serialNumber}`}
                          />
                        )
                    )}
                    {googleDevicesData?.map(
                      (device) =>
                        device?.isChecked && (
                          <CustomChip
                            className={classes.chip}
                            label={`Chrome OS Device : ${device.serialNumber}`}
                          />
                        )
                    )}
                  </>
                ) : (
                  <Box>
                    <Typography variant={"subtitle1"}>
                      No devices selected
                    </Typography>
                  </Box>
                )}
              </>
            </Box>
          </Grid>
        </Grid>
      )}
    </BottomSectionWrapper>
  );
};

export default memo(LicensesDevicesBottomSection);
