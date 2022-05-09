import React, {memo, useMemo} from "react";
import {MenuItem} from "@material-ui/core";
import {toSetArray} from "../../data/helper/commonFunctions";
import AutoTextField from "./AutoTextField";

const SelectTextField = ({dataList, onValueChange, deleteFirst, valueLabelMapper, ...props}) => {
  const sortedOptions = useMemo(() => toSetArray(dataList)?.sort(), [dataList]);

  return (
    <AutoTextField
      select
      onChange={(e) => onValueChange(e.target.value)}
      {...props}
    >
      {!deleteFirst && (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      )}
      {sortedOptions?.map((value) => (
          <MenuItem key={value} value={value}>
            {valueLabelMapper
              ? valueLabelMapper(value)
              : value
            }
          </MenuItem>
        ))}
    </AutoTextField>
  );
};

export default memo(SelectTextField);
