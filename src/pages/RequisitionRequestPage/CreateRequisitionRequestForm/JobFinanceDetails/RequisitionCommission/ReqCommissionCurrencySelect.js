import React, {useContext} from "react";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {RequisitionRequestContext} from "../../../RequisitionRequestContextProvider";
import {currencyData} from "../../../../../data/CurrencyData";
import AutocompleteTextField from "../../../../../components/inputs/AutocompleteTextField";

const ReqCommissionCurrencySelect = () => {
  const {
    selectedReqCommissionCurrency,
    setSelectedReqCommissionCurrency,
    selectedReqCommissionCurrencyError,
    setSelectedReqCommissionCurrencyError,
  } = useContext(RequisitionRequestContext);

  const handleChange = (value) => {
    if (value) {
      setSelectedReqCommissionCurrency(value);
    } else {
      setSelectedReqCommissionCurrency(null);
    }

    setSelectedReqCommissionCurrencyError(false);
  };

  return (
    <>
      <Autocomplete
        size="small"
        value={selectedReqCommissionCurrency}
        options={currencyData}
        getOptionLabel={(option) => option.AlphabeticCode}
        style={{width: 150}}
        renderInput={(params) => (
          <AutocompleteTextField
            {...params}
            error={selectedReqCommissionCurrencyError}
            label="Currency"
          />
        )}
        onChange={(event, newValue) => {
          handleChange(newValue);
        }}
      />
    </>
  );
};

export default ReqCommissionCurrencySelect;
