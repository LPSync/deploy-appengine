import React, {memo, useContext, useState} from "react";
import {
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  withStyles,
  Box,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {RequisitionRequestContext} from "../../../RequisitionRequestContextProvider";
import {currencyData} from "../../../../../data/CurrencyData";
import AutocompleteTextField from "../../../../../components/inputs/AutocompleteTextField";

const useStyles = makeStyles(() => ({
  select: {
    width: "30ch",
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
}));

const ColorRadio = withStyles((theme) => ({
  root: {
    color: theme.palette.warning.main,
    fontSize: "5rem",

    "&$checked": {
      color: theme.palette.warning.main,
      fontSize: "5rem",
    },
  },
}))((props) => <Radio color="default" {...props} />);

const ReqBonusTypeSelect = () => {
  const classes = useStyles();
  const {
    setSelectedReqBonusType,
    reqBonusTypeCurrencyError,
    setReqBonusTypeCurrencyError,
  } = useContext(RequisitionRequestContext);
  const [radioValue, setRadioValue] = React.useState("%");
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [isViewCurrency, setIsViewCurrency] = useState(false);

  const handleCurrencyChange = (value) => {
    if (value) {
      setSelectedCurrency(value);
      setSelectedReqBonusType(value.AlphabeticCode);
      setReqBonusTypeCurrencyError(false);
    } else {
      setSelectedCurrency(null);
      setSelectedReqBonusType(null);
    }
  };

  const handleTypeChange = (event) => {
    setRadioValue(event.target.value);

    if (event.target.value === "%") {
      setSelectedCurrency(null);
      setSelectedReqBonusType("%");
      setIsViewCurrency(false);
      setReqBonusTypeCurrencyError(false);
    } else {
      setSelectedReqBonusType(null);
      setIsViewCurrency(true);
    }
  };

  return (
    <Box className={classes.box}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select type</FormLabel>
        <RadioGroup
          row
          aria-label="type"
          name="type"
          value={radioValue}
          onChange={handleTypeChange}
        >
          <FormControlLabel
            value="%"
            control={<ColorRadio size="small" />}
            label="%"
          />
          <FormControlLabel
            value="currency"
            control={<ColorRadio size="small" />}
            label="currency"
          />
        </RadioGroup>
      </FormControl>

      {isViewCurrency && (
        <Autocomplete
          size="small"
          value={selectedCurrency}
          options={currencyData}
          getOptionLabel={(option) => option.AlphabeticCode}
          style={{width: 200}}
          renderInput={(params) => (
            <AutocompleteTextField
              {...params}
              error={reqBonusTypeCurrencyError}
              label="Select Currency"
            />
          )}
          onChange={(event, newValue) => {
            handleCurrencyChange(newValue);
          }}
        />
      )}
    </Box>
  );
};

export default memo(ReqBonusTypeSelect);
