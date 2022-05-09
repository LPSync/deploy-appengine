import React, {useState, useEffect, memo, useContext} from "react";
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import {useLazyQuery} from "@apollo/client";
import {OffboardEmployeeContext} from "../../OffboardEmployeeContextProvider";
import {GET_JAMF_DEVICES} from "../../../../operations/queries/getJamfDevices";
import {GET_GOOGLE_CHROME_DEVICES} from "../../../../operations/queries/getGoogleChromeDevices";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import DeviceCheckboxes from "./DeviceCheckboxes";
import CustomCheckbox from "../../../../components/checkboxes/CustomCheckbox";
import SectionTitleBlock from "../../../../components/blocks/SectionTitleBlock";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "60ch",
    height: 125,
    overflow: "auto",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  label: {
    fontSize: "1rem",
  },
}));

const isAllChecked = (devices) => {
  let allChecked = true;
  if (devices?.length) {
    devices.forEach((device) => {
      if (device?.isChecked === false) allChecked = false;
    });
  }
  return allChecked;
};

const changeDeviceStatus = (devices, setDevices, target) => {
  if (devices?.length > 0) {
    let newState = devices?.map((device) => {
      if (device.id === target?.value || device?.deviceId === target?.value) {
        return {...device, isChecked: target?.checked};
      } else return device;
    });
    setDevices(newState);
  }
};

const DeviceUnassignment = ({selectedOffboardUser}) => {
  const classes = useStyles();
  const history = useHistory();
  const [checkedAll, setCheckedAll] = useState(true);
  const [hasJamfDevices, setHasJamfDevices] = useState(false);
  const [hasGoogleDevices, setHasGoogleDevices] = useState(false);
  const {
    jamfDevicesData,
    setJamfDevicesData,
    googleDevicesData,
    setGoogleDevicesData,
  } = useContext(OffboardEmployeeContext);

  const [executeJamfSearch] = useLazyQuery(GET_JAMF_DEVICES, {
    onCompleted: (data) => {
      const dataWithCheckedStatus = data.get_jamf_devices?.map((device) => ({
        ...device,
        isChecked: checkedAll,
      }));
      setJamfDevicesData(dataWithCheckedStatus);
      setHasJamfDevices(!!dataWithCheckedStatus?.length);
    },
    onError: (error) => {
      setJamfDevicesData(null);
      setHasGoogleDevices(false);
      handleError(error)(history);
    },
  });

  const [executeGoogleSearch] = useLazyQuery(GET_GOOGLE_CHROME_DEVICES, {
    onCompleted: (data) => {
      const dataWithCheckedStatus = data.get_google_chrome_devices?.map(
        (device) => ({...device, isChecked: checkedAll})
      );
      setGoogleDevicesData(dataWithCheckedStatus);
      setHasGoogleDevices(!!dataWithCheckedStatus?.length);
    },
    onError: (error) => {
      setGoogleDevicesData(null);
      setHasGoogleDevices(false);
      handleError(error)(history);
    },
  });

  const handleCheckedAll = (checked) => {
    setCheckedAll(checked);
    if (hasJamfDevices) {
      const newJamfDeviceState = jamfDevicesData?.map((device) => ({
        ...device,
        isChecked: checked,
      }));
      setJamfDevicesData(newJamfDeviceState);
    }
    if (hasGoogleDevices) {
      const newGoogleDeviceState = googleDevicesData?.map((device) => ({
        ...device,
        isChecked: checked,
      }));
      setGoogleDevicesData(newGoogleDeviceState);
    }
  };

  const handleGoogleDeviceChange = (e) => {
    changeDeviceStatus(googleDevicesData, setGoogleDevicesData, e.target);
  };

  const handleJamfDeviceChange = (e) => {
    changeDeviceStatus(jamfDevicesData, setJamfDevicesData, e.target);
  };

  useEffect(() => {
    if (selectedOffboardUser) {
      executeJamfSearch({
        variables: {search: selectedOffboardUser?.profile?.email},
      });
      executeGoogleSearch({
        variables: {search: selectedOffboardUser?.profile?.email},
      });
    }
  }, [selectedOffboardUser, executeJamfSearch, executeGoogleSearch]);

  useEffect(() => {
    const allJemfChecked = isAllChecked(jamfDevicesData);
    const allGoogleChecked = isAllChecked(googleDevicesData);

    if (allJemfChecked && allGoogleChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [jamfDevicesData, googleDevicesData]);

  return (
    <>
      <SectionTitleBlock title="Device Unassignment" />

      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Select which devices to unassign
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {hasGoogleDevices || hasJamfDevices ? (
            <>
              <FormGroup row>
                <FormControlLabel
                  classes={{label: classes.label}}
                  control={
                    <CustomCheckbox
                      checked={checkedAll}
                      onChange={(e) => handleCheckedAll(e.target.checked)}
                      name="checkedAll"
                    />
                  }
                  label="Check this box to unassign all devices"
                />
              </FormGroup>

              <Box className={classes.box}>
                {hasJamfDevices && (
                  <DeviceCheckboxes
                    devicesData={jamfDevicesData}
                    handleChange={handleJamfDeviceChange}
                  />
                )}
                {hasGoogleDevices && (
                  <DeviceCheckboxes
                    isChrome
                    devicesData={googleDevicesData}
                    handleChange={handleGoogleDeviceChange}
                  />
                )}
              </Box>
            </>
          ) : (
            <Box>
              <Typography component={"div"}>No Devices</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {}
)(memo(DeviceUnassignment));
