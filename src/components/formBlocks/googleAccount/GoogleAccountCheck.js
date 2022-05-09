import React, {memo} from "react";
import {
  Box,
  Grid,
  makeStyles,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import RequestFormLabel from "../../typographies/RequestFormTypography";
import ColorCheckbox from "../../checkboxes/ColorCheckbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: "1rem",
  },
}));

const GoogleAccountCheck = ({
  isGoogleAccountNeeded,
  setIsGoogleAccountNeeded,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    setIsGoogleAccountNeeded(e.target.checked);
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <RequestFormLabel title="Does the user need a Google Account? " />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <FormGroup row>
              <FormControlLabel
                classes={{label: classes.label}}
                control={
                  <ColorCheckbox
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={isGoogleAccountNeeded}
                    onChange={handleChange}
                    name="isGoogleAccountNeeded"
                  />
                }
                label="Check this box if the user needs a Google Account (Email, Calendar and Drive)"
              />
            </FormGroup>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(GoogleAccountCheck);
