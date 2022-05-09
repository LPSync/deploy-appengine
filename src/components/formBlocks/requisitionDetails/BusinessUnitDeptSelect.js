import React, {useState, memo} from "react";
import {useQuery} from "@apollo/client";
import {Box, CircularProgress, Grid} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import {GET_ULTI_BU_DEPT} from "../../../operations/queries/getUltiBUDept";
import AutocompleteTextField from "../../inputs/AutocompleteTextField";

const BusinessUnitDeptSelect = ({
  businessUnit,
  setBusinessUnit,
  department,
  setDepartment,
  businessUnitError,
  setBusinessUnitError,
  departmentError,
  setDepartmentError,
  isFilledByRequisition,
}) => {
  const [buData, setBuData] = useState(null);
  const [deptData, setDeptData] = useState(null);

  const {loading} = useQuery(GET_ULTI_BU_DEPT, {
    onCompleted: (data) => {
      const businessUnitSet = {};
      data.get_ulti_bu_dept?.map((b) =>
        businessUnitSet[b.businessUnit]
          ? businessUnitSet[b.businessUnit].push(b.department)
          : (businessUnitSet[b.businessUnit] = [b.department])
      );

      setBuData(businessUnitSet);
    },
  });

  const handleBusinessChange = (value) => {
    if (value) {
      setBusinessUnit(value);
      setDeptData(buData[value].sort());
    } else {
      setBusinessUnit(null);
      setDeptData(null);
      setDepartment(null);
    }
    setBusinessUnitError(false);
  };

  const handleDepartmentChange = (value) => {
    if (value) {
      setDepartment(value);
    } else {
      setDepartment(null);
    }
    setDepartmentError(false);
  };

  if (buData && businessUnit && !deptData) {
    setDeptData(buData[businessUnit].sort());
  }

  return (
    <>
      <Grid item container>
        <Grid item xs={4}>
          <RequestFormTypography title="Select business unit" />
        </Grid>
        <Grid item xs={8}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box>
              {buData && (
                <Autocomplete
                  value={businessUnit}
                  options={Object.keys(buData)}
                  getOptionLabel={(businessUnit) => businessUnit}
                  style={{width: 400}}
                  disabled={isFilledByRequisition}
                  renderInput={(params) => (
                    <AutocompleteTextField
                      required
                      error={businessUnitError}
                      label="Select Business Unit"
                      {...params}
                    />
                  )}
                  onChange={(event, newValue) => {
                    handleBusinessChange(newValue);
                  }}
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
      {deptData && (
        <Grid item container>
          <Grid item xs={4}>
            <RequestFormTypography title="Select department" />
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Autocomplete
                value={department}
                options={deptData}
                getOptionLabel={(department) => department}
                disabled={isFilledByRequisition}
                style={{width: 400}}
                renderInput={(params) => (
                  <AutocompleteTextField
                    {...params}
                    required
                    error={departmentError}
                    label="Select Department"
                  />
                )}
                getOptionSelected={(option, value) =>
                  option.department === value.department
                }
                onChange={(event, newValue) => {
                  handleDepartmentChange(newValue);
                }}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(BusinessUnitDeptSelect);
