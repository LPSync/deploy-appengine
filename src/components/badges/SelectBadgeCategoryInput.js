import React, {memo} from "react";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import BadgeTypes, {BadgeTypesObj} from "../../data/constants/BadgeTypes";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "30ch",
  },
}));

const SelectBadgeCategoryInput = ({value, onChange}) => {
  const classes = useStyles();
  return (
    <FormControl required variant="outlined" color={"secondary"}>
      <InputLabel id="select-badge-category">Badge Category</InputLabel>
      <Select
        labelId="select-badge-category-label"
        id="select-badge-category"
        value={value}
        onChange={onChange}
        className={classes.select}
        color={"secondary"}
        label={"Badge Category"}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {BadgeTypesObj?.filter(
          (badge) =>
            badge.idType !== BadgeTypes.SYSTEM_OWNER &&
            badge.idType !== BadgeTypes.TOVUTI
        ).map((option) => (
          <MenuItem key={option.idType} value={option.idType}>
            {option.nameType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(SelectBadgeCategoryInput);
