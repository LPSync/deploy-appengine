import React, {useState, useEffect, useContext, memo} from "react";
import {Box} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const FunctionalAreaDescSelect = () => {
  const {
    selectedFunctionalAreaDesc,
    setSelectedFunctionalAreaDesc,
    selectedFunctionalAreaDescError,
    setSelectedFunctionalAreaDescError,
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
        return data.costCenterCategory === "Functional Area Description";
      });

      setCodeData(codeFiltered);

      if (!isCodeChanged) {
        if (managerCostCenter && codeFiltered) {
          codeFiltered.forEach((data) => {
            if (
              data.costCenterCategory === "Functional Area Description" &&
              data.costCenterCode === managerCostCenter[3]
            ) {
              setSelectedFunctionalAreaDesc(data);
            }
          });
        }
      }
    }
  }, [
    managerCostCenter,
    costCenterData,
    isCodeChanged,
    setSelectedFunctionalAreaDesc,
  ]);

  const handleChange = (value) => {
    if (value) {
      setIsCodeChanged(true);
      setSelectedFunctionalAreaDesc(value);
    } else {
      setSelectedFunctionalAreaDesc(null);
    }

    setSelectedFunctionalAreaDescError(false);
  };

  return (
    <Box>
      {codeData && selectedFunctionalAreaDesc && (
        <Autocomplete
          disableClearable
          disabled={isCostCenterDisabled}
          value={selectedFunctionalAreaDesc}
          options={codeData}
          getOptionLabel={(option) =>
            `${option.costCenterCode} | ${option.costCenterDescription}`
          }
          style={{width: 400}}
          renderInput={(params) => (
            <AutocompleteTextField
              {...params}
              required
              error={selectedFunctionalAreaDescError}
              label="Select Functional Area Description"
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

export default memo(FunctionalAreaDescSelect);
