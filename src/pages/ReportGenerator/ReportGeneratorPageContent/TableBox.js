import React, {memo} from "react";
import {Grid} from "@material-ui/core";
import StyledDataGrid from "../../../components/table/StyledDataGrid";

const GRID_BOX_HEIGHT = 500;

const TableBox = ({tableData, tableColumnsOptions}) => {
  return (
    <Grid item container style={{height: GRID_BOX_HEIGHT}} xs={12}>
      <StyledDataGrid columns={tableColumnsOptions} rows={tableData} />
    </Grid>
  );
};

export default memo(TableBox);
