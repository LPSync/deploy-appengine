import React, {useState, useEffect, useContext} from "react";
import {Box} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const ParentMgmtCostCenterSelect = () => {
  const {
    selectedParentMgmtCostCenter,
    setSelectedParentMgmtCostCenter,
    selectedParentMgmtCostCenterError,
    setSelectedParentMgmtCostCenterError,
    managerCostCenter,
    costCenterData,
    isCostCenterDisabled,
    isCodeChanged,
    setIsCodeChanged,
  } = useContext(RequisitionRequestContext);
  const [codeData, setCodeData] = useState();

  useEffect(() => {
    if (costCenterData) {
      const codeFiltered = costCenterData.filter((data) => {
        return data.costCenterCategory === "Parent Management Cost Center";
      });

      setCodeData(codeFiltered);
      if (!isCodeChanged) {
        if (managerCostCenter && codeFiltered) {
          codeFiltered.forEach((data) => {
            if (
              data.costCenterCategory === "Parent Management Cost Center" &&
              data.costCenterCode === managerCostCenter[1]
            ) {
              setSelectedParentMgmtCostCenter(data);
            }
          });
        }
      }
    }
  }, [
    managerCostCenter,
    costCenterData,
    isCodeChanged,
    setSelectedParentMgmtCostCenter,
  ]);

  const handleChange = (value) => {
    if (value) {
      setIsCodeChanged(true);
      setSelectedParentMgmtCostCenter(value);
    } else {
      setSelectedParentMgmtCostCenter(null);
    }

    setSelectedParentMgmtCostCenterError(false);
  };

  return (
    <Box>
      {codeData && selectedParentMgmtCostCenter && (
        <Autocomplete
          disableClearable
          disabled={isCostCenterDisabled}
          value={selectedParentMgmtCostCenter}
          options={codeData}
          getOptionLabel={(option) =>
            `${option.costCenterCode} | ${option.costCenterDescription}`
          }
          style={{width: 400}}
          renderInput={(params) => (
            <AutocompleteTextField
              {...params}
              required
              error={selectedParentMgmtCostCenterError}
              label="Select Parent Management Cost Center"
            />
          )}
          onChange={(event, newValue) => {
            handleChange(newValue);
          }}
        />
      )}
    </Box>
  );
};

export default ParentMgmtCostCenterSelect;
