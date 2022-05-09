import React, { memo } from "react";
import ColorCheckbox from "./ColorCheckbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const CustomCheckbox = ({ ...props }) => {
  return (
    <ColorCheckbox
      icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
      checkedIcon={<CheckBoxIcon fontSize="small"/>}
      {...props}
    />
  );
};

export default memo(CustomCheckbox);