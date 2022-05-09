import React, {useState, useEffect, useContext} from "react";
import {Box} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const MgmtCostCenterSelect = () => {
  const {
    selectedMgmtCostCenter,
    setSelectedMgmtCostCenter,
    selectedMgmtCostCenterError,
    setSelectedMgmtCostCenterError,
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
        return data.costCenterCategory === "Management Cost Center";
      });

      setCodeData(codeFiltered);

      if (!isCodeChanged) {
        if (managerCostCenter && codeFiltered) {
          codeFiltered.forEach((data) => {
            if (
              data.costCenterCategory === "Management Cost Center" &&
              data.costCenterCode === managerCostCenter[2]
            ) {
              setSelectedMgmtCostCenter(data);
            }
          });
        }
      }
    }
  }, [
    managerCostCenter,
    costCenterData,
    isCodeChanged,
    setSelectedMgmtCostCenter,
  ]);

  const handleChange = (value) => {
    if (value) {
      setIsCodeChanged(true);
      setSelectedMgmtCostCenter(value);
    } else {
      setSelectedMgmtCostCenter(null);
    }

    setSelectedMgmtCostCenterError(false);
  };

  return (
    <Box>
      {codeData && selectedMgmtCostCenter && (
        <Autocomplete
          disableClearable
          disabled={isCostCenterDisabled}
          value={selectedMgmtCostCenter}
          options={codeData}
          getOptionLabel={(option) =>
            `${option.costCenterCode} | ${option.costCenterDescription}`
          }
          style={{width: 400}}
          renderInput={(params) => (
            <AutocompleteTextField
              {...params}
              required
              error={selectedMgmtCostCenterError}
              label="Select Management Cost Center"
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

export default MgmtCostCenterSelect;
