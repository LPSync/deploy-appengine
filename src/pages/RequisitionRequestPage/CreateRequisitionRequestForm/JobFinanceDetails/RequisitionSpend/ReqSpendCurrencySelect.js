import React, {useContext} from "react";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {RequisitionRequestContext} from "../../../RequisitionRequestContextProvider";
import {currencyData} from "../../../../../data/CurrencyData";
import AutocompleteTextField from "../../../../../components/inputs/AutocompleteTextField";

const ReqSpendCurrencySelect = () => {
  const {
    selectedReqSpendCurrency,
    setSelectedReqSpendCurrency,
    selectedReqSpendCurrencyError,
    setSelectedReqSpendCurrencyError,
  } = useContext(RequisitionRequestContext);

  const handleChange = (value) => {
    if (value) {
      setSelectedReqSpendCurrency(value);
    } else {
      setSelectedReqSpendCurrency(null);
    }

    setSelectedReqSpendCurrencyError(false);
  };

  return (
    <>
      <Autocomplete
        size="small"
        value={selectedReqSpendCurrency}
        options={currencyData}
        getOptionLabel={(option) => option.AlphabeticCode}
        style={{width: 150}}
        renderInput={(params) => (
          <AutocompleteTextField
            {...params}
            required
            error={selectedReqSpendCurrencyError}
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

export default ReqSpendCurrencySelect;
