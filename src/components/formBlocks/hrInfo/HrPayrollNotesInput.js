import React, {memo} from "react";
import {Box} from "@material-ui/core";
import GridInputWrapper from "../../requestFormWrapper/GridInputWrapper";
import {NotesTextField} from "../../inputs/NotesTextField";

const HrPayrollNotesInput = ({...props}) => {
  return (
    <GridInputWrapper xsItemChild={7} title="Payroll notes">
      <Box>
        <NotesTextField id="hr-notes" placeholder="notes" {...props} />
      </Box>
    </GridInputWrapper>
  );
};

export default memo(HrPayrollNotesInput);
