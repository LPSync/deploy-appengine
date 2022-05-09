import React, {memo} from "react";
import {Box, FormGroup, Grid, makeStyles} from "@material-ui/core";
import InfoTooltip from "../../tooltips/InfoTooltip";
import CustomLabelCheckbox from "../../checkboxes/CustomLabelCheckbox";

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: "1rem",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
}));

const NotificationCheck = ({
  isNotifyTerminationsChecked,
  isNotifyTerminationsDisabled,
  setIsNotifyTerminationsChecked,
}) => {
  const classes = useStyles();
  const handleChange = (event) => {
    setIsNotifyTerminationsChecked(event.target.checked);
  };
  return (
    <Grid item container>
      <Grid item xs={4}>
        <Box className={classes.leftText}>
          <InfoTooltip placement="bottom-start">
            If checked, a notification will be sent to the terminations team to
            cancel user accounts.
            <br /> <br />
            If <b>not</b> checked, a notification will <b>only</b> be sent to
            the terminations team after the offboarding has completed.
          </InfoTooltip>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box>
          <FormGroup row>
            <CustomLabelCheckbox
              label={"Send email notification to terminations@liveperson.com"}
              name={"notification"}
              disabled={isNotifyTerminationsDisabled}
              checked={isNotifyTerminationsChecked}
              onChange={handleChange}
            />
          </FormGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(NotificationCheck);
