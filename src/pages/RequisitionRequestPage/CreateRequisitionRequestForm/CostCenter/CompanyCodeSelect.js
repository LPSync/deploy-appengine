import React, {useState, useEffect, useContext} from "react";
import {Box} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";
import AutocompleteTextField from "../../../../components/inputs/AutocompleteTextField";

const CompanyCodeSelect = () => {
  const {
    selectedCompanyCode,
    setSelectedCompanyCode,
    selectedCompanyCodeError,
    setSelectedCompanyCodeError,
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
        return data.costCenterCategory === "Company Code";
      });

      setCodeData(codeFiltered);

      if (!isCodeChanged) {
        if (managerCostCenter && codeFiltered) {
          codeFiltered.forEach((data) => {
            if (
              data.costCenterCategory === "Company Code" &&
              data.costCenterCode === managerCostCenter[0]
            ) {
              setSelectedCompanyCode(data);
            }
          });
        }
      }
    }
  }, [
    managerCostCenter,
    costCenterData,
    isCodeChanged,
    setSelectedCompanyCode,
  ]);

  const handleChange = (value) => {
    if (value) {
      setIsCodeChanged(true);
      setSelectedCompanyCode(value);
    } else {
      setSelectedCompanyCode(null);
    }

    setSelectedCompanyCodeError(false);
  };

  return (
    <Box>
      {codeData && selectedCompanyCode && (
        <Autocomplete
          disableClearable
          disabled={isCostCenterDisabled}
          value={selectedCompanyCode}
          options={codeData}
          getOptionLabel={(option) =>
            `${option.costCenterCode} | ${option.costCenterDescription}`
          }
          style={{width: 400}}
          renderInput={(params) => (
            <AutocompleteTextField
              {...params}
              required
              error={selectedCompanyCodeError}
              label="Select Company Code"
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

export default CompanyCodeSelect;
