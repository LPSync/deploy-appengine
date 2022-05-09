import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {Box, FormGroup, makeStyles, Typography} from "@material-ui/core";
import {GET_JAMF_DEVICES} from "../../../operations/queries/getJamfDevices";
import handleError from "../../../data/handleError";
import {GET_GOOGLE_CHROME_DEVICES} from "../../../operations/queries/getGoogleChromeDevices";
import DeviceCheckboxes from "../../../pages/OffboardEmployeePage/CreateRequestForm/DeviceUnassignment/DeviceCheckboxes";
import CustomLabelCheckbox from "../../checkboxes/CustomLabelCheckbox";
import LoadingCircle from "../../circularProgress/LoadingCircle";
import GridInputWrapper from "../../requestFormWrapper/GridInputWrapper";

const useStyles = makeStyles((theme) => ({
  box: {
    height: 125,
    overflow: "auto",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
}));

const checkIfAllChecked = (devices) => {
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

const DevicesCheck = ({
  selectedOffboardUser,
  jamfDevicesData,
  setJamfDevicesData,
  googleDevicesData,
  setGoogleDevicesData,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [hasJamfDevices, setHasJamfDevices] = useState(false);
  const [hasGoogleDevices, setHasGoogleDevices] = useState(false);
  const [verifiedJamf, setVerifiedJamf] = useState(false);
  const [verifiedGoogle, setVerifiedGoogle] = useState(false);

  const [executeJamfSearch] = useLazyQuery(GET_JAMF_DEVICES, {
    onCompleted: (data) => {
      const dataWithCheckedStatus = data.get_jamf_devices?.map((device) => ({
        ...device,
        isChecked: isAllChecked,
      }));
      setJamfDevicesData(dataWithCheckedStatus);
      setHasJamfDevices(!!dataWithCheckedStatus?.length);
      setVerifiedJamf(true);
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
        (device) => ({...device, isChecked: isAllChecked})
      );
      setGoogleDevicesData(dataWithCheckedStatus);
      setHasGoogleDevices(!!dataWithCheckedStatus?.length);
      setVerifiedGoogle(true);
    },
    onError: (error) => {
      setGoogleDevicesData(null);
      setHasGoogleDevices(false);
      handleError(error)(history);
    },
  });

  const handleCheckedAll = (checked) => {
    setIsAllChecked(checked);
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
        variables: {search: selectedOffboardUser?.profile?.userName},
      });
      executeGoogleSearch({
        variables: {search: selectedOffboardUser?.profile?.email},
      });
    }
  }, [selectedOffboardUser, executeJamfSearch, executeGoogleSearch]);

  useEffect(() => {
    const allJemfChecked = checkIfAllChecked(jamfDevicesData);
    const allGoogleChecked = checkIfAllChecked(googleDevicesData);

    if (allJemfChecked && allGoogleChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [jamfDevicesData, googleDevicesData]);

  useEffect(() => {
    if (verifiedGoogle && verifiedJamf) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [verifiedGoogle, verifiedJamf]);

  return (
    <GridInputWrapper title="Select which devices to unassign" xsItemChild={5}>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          {hasGoogleDevices || hasJamfDevices ? (
            <>
              <FormGroup row>
                <CustomLabelCheckbox
                  label={"Check this box to unassign all devices"}
                  name={"all"}
                  checked={isAllChecked}
                  onChange={(e) => handleCheckedAll(e.target.checked)}
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
              <Typography component={"div"}>No devices to unassign</Typography>
            </Box>
          )}
        </>
      )}
    </GridInputWrapper>
  );
};

export default memo(DevicesCheck);
