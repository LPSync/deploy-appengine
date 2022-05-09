import React, {memo, useContext, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {GET_BACKFILL_DIRECT_REPORTS} from "../../../../operations/queries/getBackfillDirectReports";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import ColorCheckbox from "../../../../components/checkboxes/ColorCheckbox";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import SelectCircularProgress from "../../../../components/circularProgress/SelectCircularProgress";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "30ch",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  label: {
    fontSize: "1rem",
  },
}));

const BackfillSelect = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    selectedManager,
    isBackfillChecked,
    setIsBackfillChecked,
    selectedBackfill,
    setSelectedBackfill,
    selectedBackfillError,
    setSelectedBackfillError,
  } = useContext(RequisitionRequestContext);
  const [backfillData, setBackfillData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [executeSearch] = useLazyQuery(GET_BACKFILL_DIRECT_REPORTS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const mapped = data.get_backfill_direct_reports.map((backfill) => {
        return backfill.profile;
      });

      setBackfillData(mapped);
      setIsLoading(false);
    },
    onError: (error) => handleError(error)(history),
  });

  const handleCheckboxChange = (event) => {
    setIsBackfillChecked(event.target.checked);
    if (!event.target.checked) {
      setSelectedBackfill(null);
    }
  };

  useEffect(() => {
    if (selectedManager) {
      if (isBackfillChecked) {
        setIsLoading(true);
        executeSearch({
          variables: {search: selectedManager?.profile?.email},
        });
      }
    } else {
      setBackfillData(null);
    }
  }, [selectedManager, isBackfillChecked]);

  const handleSelectChange = (value) => {
    if (value) {
      setSelectedBackfill(value);
    } else {
      setSelectedBackfill(null);
    }

    setSelectedBackfillError(false);
  };

  return (
    <>
      {selectedManager && (
        <>
          <Grid item container>
            <Grid item xs={4}>
              <Typography
                component={"div"}
                variant="subtitle1"
                className={classes.leftText}
              >
                Is this a backfill?
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <FormGroup row>
                  <FormControlLabel
                    classes={{label: classes.label}}
                    control={
                      <ColorCheckbox
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        checked={isBackfillChecked}
                        onChange={handleCheckboxChange}
                        name="isBackfillChecked"
                      />
                    }
                    label="Check this box if it is a backfill"
                  />
                </FormGroup>
              </Box>
            </Grid>
          </Grid>
          {isBackfillChecked && (
            <Grid item container>
              <Grid item xs={4}>
                <Typography
                  component={"div"}
                  variant="subtitle1"
                  className={classes.leftText}
                >
                  Select backfill
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {isLoading ? (
                  <SelectCircularProgress />
                ) : (
                  <>
                    {backfillData && (
                      <>
                        {backfillData?.length > 0 ? (
                          <Box>
                            <Autocomplete
                              value={selectedBackfill}
                              options={backfillData}
                              getOptionLabel={(option) =>
                                `${option.firstName} ${option.lastName} | ${option.userName}`
                              }
                              style={{width: 400}}
                              renderInput={(params) => (
                                <AutocompleteTextField
                                  {...params}
                                  required
                                  error={selectedBackfillError}
                                  label="Select Backfill"
                                />
                              )}
                              onChange={(event, newValue) => {
                                handleSelectChange(newValue);
                              }}
                            />
                          </Box>
                        ) : (
                          <Box>No results for the selected hiring manager</Box>
                        )}
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default memo(BackfillSelect);
