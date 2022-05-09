import React, {memo} from "react";
import {FormGroup, Grid} from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import CustomLabelCheckbox from "../../checkboxes/CustomLabelCheckbox";

const TransferWhatCheck = ({
  isDriveChecked,
  isCalendarChecked,
  isDataStudioChecked,
  setIsDriveChecked,
  setIsCalendarChecked,
  setIsDataStudioChecked,
}) => {
  const handleDriveCheck = (event) => {
    setIsDriveChecked(event.target.checked);
  };

  const handleCalendarCheck = (event) => {
    setIsCalendarChecked(event.target.checked);
  };

  const handleDataStudioCheck = (event) => {
    setIsDataStudioChecked(event.target.checked);
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Select what needs to be transferred" />
      </Grid>
      <Grid item xs={8}>
        <FormGroup row>
          <CustomLabelCheckbox
            label={"Google Drive"}
            name={"drive"}
            checked={isDriveChecked}
            onChange={handleDriveCheck}
          />

          <CustomLabelCheckbox
            label={"Google Calendar"}
            name={"calendar"}
            checked={isCalendarChecked}
            onChange={handleCalendarCheck}
          />

          <CustomLabelCheckbox
            label={"Google Data Studio"}
            name={"dataStudio"}
            checked={isDataStudioChecked}
            onChange={handleDataStudioCheck}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default memo(TransferWhatCheck);
