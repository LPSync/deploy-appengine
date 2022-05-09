import {
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, {useState} from "react";
import DatePicker from "./DatePicker";
import {cloneDeep} from "lodash";
import {getDefaultValue, REPORT_GENERATOR_CONFIG} from "../../../data/constants/ReportGenerator";
import StyledInputLabel from "../../../components/inputs/StyledInputLabel";

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
    padding: 8,
  },
  button: {
    marginLeft: "auto",
  },
}));

const generateValuesObject = (fields) => {
  return Object.entries(fields).reduce(
    (accumulator, currentValue) =>
        ({ ...accumulator, [currentValue[0]]: getDefaultValue(currentValue[1].type) }),
    {}
  );
};

const prepareValuesInfoObject = (fields = {}, reportType) => {
  const valuesCopy = cloneDeep(fields);

  for (let key in valuesCopy) {
    if (
      (Array.isArray(valuesCopy[key]) && !valuesCopy[key].length) ||
        valuesCopy[key] === null ||
      (valuesCopy[key] === null &&
        REPORT_GENERATOR_CONFIG.reportTypes[reportType].fields[key]
          .booleanItems)
    ) {
      delete valuesCopy[key];
    }
  }

  valuesCopy.reportType = reportType;

  return valuesCopy;
};

const FieldsBox = ({
  fields,
  setSearchInfoObject,
  reportType,
  disableGenerating,
}) => {
  const classes = useStyles();
  const [valuesInfo, setValuesInfo] = useState(generateValuesObject(fields));

  const createSelectField = (key, currentField, multiple) => {
    const onValueChange = (event) => {
      setValuesInfo({ ...valuesInfo, [key]: event.target.value });
    };

    return (
      <Grid item xs={3}>
        <FormControl fullWidth>
          <StyledInputLabel id={`${key}-label`}>
            { currentField.label }
          </StyledInputLabel>
          <Select
            color={"secondary"}
            labelId={`${key}-label`}
            id={key}
            value={valuesInfo[key]}
            renderValue={(selected) => multiple ? selected.join(', ') : selected}
            label={currentField.label}
            onChange={onValueChange}
            multiple={multiple}
          >
            {[
              !multiple && <MenuItem value={null} key={"none"}>
                None
              </MenuItem>,
              ...currentField.menuItems?.map((item) => {
                let itemName, itemValue;

                if (typeof item === "boolean") {
                  [itemName, itemValue] = [item ? "Yes" : "No", item];
                } else if (
                  currentField.displayValue &&
                  currentField.actualValue
                ) {
                  [itemName, itemValue] = [
                    currentField.displayValue(item),
                    currentField.actualValue(item),
                  ];
                } else {
                  [itemName, itemValue] = [item, item];
                }

                return (
                  <MenuItem value={itemValue} key={itemName}>
                    {multiple ? <Checkbox checked={valuesInfo[key].indexOf(itemValue) !== -1}/> : null}
                    {itemValue}
                  </MenuItem>
                );
              }),
            ]}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  const createDatePickedField = (key, label) => {
    return (
      <Grid item xs={3}>
        <DatePicker
          label={label}
          setDate={(value) => setValuesInfo({ ...valuesInfo, [key]: value })}
        />
      </Grid>
    );
  };

  const createCheckBoxField = (key, label) => {
    return (
      <Grid item xs={2}>
        <FormControlLabel control={<Checkbox defaultChecked />} label={label} />
      </Grid>
    );
  };

  const generateFields = () => {
    return (
      fields &&
      Object.entries(fields).map((field) => {
        switch (field[1].type) {
          case "date":
            return createDatePickedField(field[0], field[1].label);
          case "select":
            return createSelectField(field[0], field[1], false);
          case "multiselect":
            return createSelectField(field[0], field[1], true);
          case "checkbox":
            return createCheckBoxField(field[0], field[1].label);
        }
      })
    );
  };

  return (
    <Grid item container spacing={4}>
      <Grid item container spacing={2}>
        { generateFields() }
      </Grid>
      <Grid item container className={classes.box}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={disableGenerating}
          onClick={() =>
            setSearchInfoObject(prepareValuesInfoObject(valuesInfo, reportType))
          }
        >
          Generate Report
        </Button>
      </Grid>
    </Grid>
  );
};

export default FieldsBox;
