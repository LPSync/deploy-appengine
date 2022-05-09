import React, {memo, useContext} from "react";
import {Box, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import EmployeeTypes from "../../../../data/constants/EmployeeTypes";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "30ch",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
}));

const RequisitionTypeInput = () => {
  const classes = useStyles();
  const {
    requisitionType,
    setRequisitionType,
    requisitionTypeError,
    setRequisitionTypeError,
  } = useContext(RequisitionRequestContext);

  const handleChange = (value) => {
    if (value) {
      setRequisitionType(value);
    } else {
      setRequisitionType(null);
    }

    setRequisitionTypeError(false);
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <Typography
          component={"div"}
          variant="subtitle1"
          className={classes.leftText}
        >
          Select requisition type
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Box>
          <Autocomplete
            value={requisitionType}
            options={Object.values(EmployeeTypes)?.filter(
              (type) => type !== EmployeeTypes.FULL_TIME
            )}
            getOptionLabel={(option) => option}
            style={{width: 400}}
            renderInput={(params) => (
              <AutocompleteTextField
                {...params}
                required
                error={requisitionTypeError}
                label="Select Requisition Type"
              />
            )}
            onChange={(event, newValue) => {
              handleChange(newValue);
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(RequisitionTypeInput);
