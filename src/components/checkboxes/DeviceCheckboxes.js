import React, { memo } from "react";
import { FormControlLabel, FormGroup } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ColorCheckbox from "../../../../components/checkboxes/ColorCheckbox";

const DeviceCheckboxes = ({ devicesData, handleChange, isChrome, ...props }) => {
  return (
    <FormGroup {...props}>
      {devicesData?.map((device) => (
        <FormControlLabel
          key={device.id || device.deviceId}
          control={
            <ColorCheckbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
              checkedIcon={<CheckBoxIcon fontSize="small"/>}
              checked={device.isChecked}
              onChange={handleChange}
              value={device.id || device.deviceId}
              name={device.id || device.deviceId}
            />
          }
          label={(isChrome ? "Chrome OS Device: " : `${device.deviceName}: `) + `${device.serialNumber}`}
        />
      ))}
    </FormGroup>
  );
};

export default memo(DeviceCheckboxes);
