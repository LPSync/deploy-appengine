import React, {memo} from "react";
import {Box} from "@material-ui/core";
import CustomFormSelect from "../../inputs/CustomFormSelect";
import GridInputWrapper from "../../requestFormWrapper/GridInputWrapper";

const HrTerminationTypeSelect = ({...props}) => {
  return (
    <GridInputWrapper title="Termination is">
      <Box>
        <CustomFormSelect
          name="termination-reason"
          label="Termination"
          width={"25ch"}
          options={["Regrettable", "Non-Regrettable"]}
          {...props}
        />
      </Box>
    </GridInputWrapper>
  );
};

export default memo(HrTerminationTypeSelect);
