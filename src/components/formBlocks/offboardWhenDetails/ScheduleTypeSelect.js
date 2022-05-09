import React, {memo} from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import TaskScheduleTypes from "../../../data/constants/TaskScheduleTypes";
import InfoTooltip from "../../tooltips/InfoTooltip";
import RequestFormTypography from "../../typographies/RequestFormTypography";

const useStyles = makeStyles(() => ({
  select: {
    width: "25ch",
  },
  typeBox: {
    display: "flex",
    alignItems: "center",
  },
}));

const ScheduleTypeSelect = ({
  scheduleType,
  setScheduleType,
  scheduleTypeError,
  setScheduleTypeError,
  setIsNotifyTerminationsChecked,
  setIsNotifyTerminationsDisabled,
}) => {
  const classes = useStyles();

  const handleTypeChange = (event) => {
    const value = event.target.value;

    setScheduleType(value);
    setScheduleTypeError(false);
    if (value === TaskScheduleTypes.SENSITIVE) {
      setIsNotifyTerminationsChecked(false);
      setIsNotifyTerminationsDisabled(true);
    } else {
      setIsNotifyTerminationsChecked(true);
      setIsNotifyTerminationsDisabled(false);
    }
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Select schedule type" />
      </Grid>
      <Grid item xs={8}>
        <Box className={classes.typeBox}>
          <Box mr={2}>
            <FormControl
              required
              error={scheduleTypeError}
              color="secondary"
              variant="outlined"
            >
              <InputLabel id="offboarding-type">Schedule Type</InputLabel>
              <Select
                labelId="offboarding-type-select-label"
                id="offboarding-type-select"
                value={scheduleType}
                onChange={handleTypeChange}
                label="Schedule Type"
                className={classes.select}
                color={"secondary"}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.values(TaskScheduleTypes).map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <InfoTooltip type={"help"}>
              <strong>Immediate</strong>: The user will be offboarded from all
              IT systems immediately. <br />
              <br />
              <strong>Scheduled</strong>: The user will be offboarded from all
              IT systems at the scheduled date & time. <br />
              <br />
              <strong>Sensitive</strong>: The user will be offboarded from all
              IT systems at the scheduled date & time and a notification will
              only be sent to the terminations team after the scheduled date &
              time.
            </InfoTooltip>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(ScheduleTypeSelect);
