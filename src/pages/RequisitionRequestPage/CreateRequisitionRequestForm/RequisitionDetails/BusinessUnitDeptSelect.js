import React, {useContext, useState} from "react";
import {useQuery} from "@apollo/client";
import {Box, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {GET_ULTI_BU_DEPT} from "../../../../operations/queries/getUltiBUDept";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "30ch",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
}));

const BusinessUnitDeptSelect = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    selectedBusinessUnit,
    setSelectedBusinessUnit,
    selectedBusinessUnitError,
    setSelectedBusinessUnitError,
    selectedDepartment,
    setSelectedDepartment,
    selectedDepartmentError,
    setSelectedDepartmentError,
  } = useContext(RequisitionRequestContext);
  const [buData, setBuData] = useState();
  const [deptData, setDeptData] = useState();

  const {data} = useQuery(GET_ULTI_BU_DEPT, {
    onCompleted: (data) =>
      setBuData([
        ...new Map(
          data.get_ulti_bu_dept.map((item) => [item.businessUnit, item])
        ).values(),
      ]),
    onError: (error) => handleError(error)(history),
  });

  const handleBusinessChange = (value) => {
    if (value) {
      setSelectedBusinessUnit(value);
      setSelectedDepartment(null);

      const result = data.get_ulti_bu_dept.filter((obj) => {
        return obj.businessUnit === value.businessUnit;
      });

      const sorted = result.sort((a, b) =>
        a.department > b.department ? 1 : b.department > a.department ? -1 : 0
      );

      setDeptData(sorted);
    } else {
      setSelectedBusinessUnit(null);
      setDeptData(null);
      setSelectedDepartment(null);
    }

    setSelectedBusinessUnitError(false);
  };

  const handleDepartmentChange = (value) => {
    if (value) {
      setSelectedDepartment(value);
    } else {
      setSelectedDepartment(null);
    }

    setSelectedDepartmentError(false);
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Select business unit
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box>
            {buData && (
              <Autocomplete
                value={selectedBusinessUnit}
                options={buData}
                getOptionLabel={(option) => option.businessUnit}
                style={{width: 400}}
                renderInput={(params) => (
                  <AutocompleteTextField
                    {...params}
                    required
                    error={selectedBusinessUnitError}
                    label="Select Business Unit"
                  />
                )}
                onChange={(event, newValue) => {
                  handleBusinessChange(newValue);
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      {deptData && (
        <Grid item container>
          <Grid item xs={4}>
            <Typography
              component={"div"}
              variant="subtitle1"
              className={classes.leftText}
            >
              Select department
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box>
              {buData && (
                <Autocomplete
                  value={selectedDepartment}
                  options={deptData}
                  getOptionLabel={(option) => option.department}
                  style={{width: 400}}
                  renderInput={(params) => (
                    <AutocompleteTextField
                      {...params}
                      required
                      error={selectedDepartmentError}
                      label="Select Department"
                    />
                  )}
                  onChange={(event, newValue) => {
                    handleDepartmentChange(newValue);
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BusinessUnitDeptSelect;
