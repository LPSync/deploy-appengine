import React, {useState, useEffect, useContext, memo} from "react";
import {Box} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const CountryDescSelect = () => {
  const {
    selectedCountryDesc,
    setSelectedCountryDesc,
    selectedCountryDescError,
    setSelectedCountryDescError,
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
        return data.costCenterCategory === "Country Description";
      });

      setCodeData(codeFiltered);

      if (!isCodeChanged) {
        if (managerCostCenter && codeFiltered) {
          codeFiltered.forEach((data) => {
            if (
              data.costCenterCategory === "Country Description" &&
              data.costCenterCode === managerCostCenter[4]
            ) {
              setSelectedCountryDesc(data);
            }
          });
        }
      }
    }
  }, [
    managerCostCenter,
    costCenterData,
    isCodeChanged,
    setSelectedCountryDesc,
  ]);

  const handleChange = (value) => {
    if (value) {
      setIsCodeChanged(true);
      setSelectedCountryDesc(value);
    } else {
      setSelectedCountryDesc(null);
    }

    setSelectedCountryDescError(false);
  };

  return (
    <Box>
      {codeData && selectedCountryDesc && (
        <Autocomplete
          disableClearable
          disabled={isCostCenterDisabled}
          value={selectedCountryDesc}
          options={codeData}
          getOptionLabel={(option) =>
            `${option.costCenterCode} | ${option.costCenterDescription}`
          }
          style={{width: 400}}
          renderInput={(params) => (
            <AutocompleteTextField
              {...params}
              required
              error={selectedCountryDescError}
              label="Select Country Description"
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

export default memo(CountryDescSelect);
