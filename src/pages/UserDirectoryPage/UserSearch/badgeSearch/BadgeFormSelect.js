import React, { memo } from "react";
import { makeStyles } from "@material-ui/core";
import CustomFormSelect from "../../../../components/inputs/CustomFormSelect";
import { BadgeTypesObj } from "../../../../data/constants/BadgeTypes";

const useStyles = makeStyles(() => ({
  inputLabel: {
    transform: "translate(14px, 12px) scale(1)",
  },
}));

const BadgeFormSelect = ({value, onValueChange, selectClasses}) => {
  const classes = useStyles();

  return (
    <CustomFormSelect
      id="badge-category"
      label="Select Badge Category"
      inputLabelClasses={classes.inputLabel}
      color="secondary"
      selectClasses={selectClasses}
      value={value}
      onValueChange={onValueChange}
      options={BadgeTypesObj?.map(type => ({ value: type.idType, name: type.nameType }))}
    />
  );
};

export default memo(BadgeFormSelect);