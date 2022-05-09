import React, {memo} from "react";
import {
  Box,
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import RequestFormLabel from "../../typographies/RequestFormTypography";
import ColorCheckbox from "../../checkboxes/ColorCheckbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "30ch",
  },
  deviceNoteContainer: {
    width: 600,
    marginLeft: 0,
    border: "1px solid " + theme.palette.info.main,
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
  label: {
    fontSize: "1rem",
  },
}));

const deviceArray = [
  "Macbook",
  "Windows (Technical Evaluation Required)",
  "Chromebook",
];

const DeviceSelect = ({
  selectedDevice,
  setSelectedDevice,
  selectedDeviceError,
  setSelectedDeviceError,
  isDeviceNoteConfirmed,
  setIsDeviceNoteConfirmed,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSelectedDevice(event.target.value);
    setSelectedDeviceError(false);
  };

  const handleCheckboxChange = (event) => {
    setIsDeviceNoteConfirmed(event.target.checked);
    if (!event.target.checked) {
      setSelectedDevice("No");
    }
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <RequestFormLabel title="Request device?" />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Box>
              <Container m={1} className={classes.deviceNoteContainer}>
                Please note: <br />
                Device requests are subject to approval.
                <br />
                Please allow 10 days or more for procurement and delivery.{" "}
                <br />
                Also, your Cost Center may be charged if a device is provided.
              </Container>
            </Box>
            <FormGroup row>
              <FormControlLabel
                classes={{label: classes.label}}
                control={
                  <ColorCheckbox
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={isDeviceNoteConfirmed}
                    onChange={handleCheckboxChange}
                    name="isDeviceNoteConfirmed"
                  />
                }
                label="Check this box if you want to request a device and acknowledge the note above"
              />
            </FormGroup>
          </Box>
        </Grid>
      </Grid>
      {isDeviceNoteConfirmed && (
        <Grid item container>
          <Grid item xs={4}>
            <RequestFormLabel title="Select device" />
          </Grid>
          <Grid item xs={8}>
            <Box>
              <FormControl required color="secondary" variant="outlined">
                <InputLabel id="select-device-label">Device</InputLabel>
                <Select
                  labelId="select-device-label"
                  id="select-device"
                  error={selectedDeviceError}
                  value={selectedDevice}
                  onChange={handleChange}
                  className={classes.select}
                  label={"Device"}
                  color={"secondary"}
                >
                  <MenuItem value="No">
                    <em>Select Device</em>
                  </MenuItem>
                  {deviceArray.map((device) => (
                    <MenuItem value={device} key={device}>
                      {device}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(DeviceSelect);
