import React, {memo} from "react";
import {Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {setSelectedTaskIds} from "../../../data/redux/multiCandidateRequest/multiCandidateRequestActions";
import StyledDataGrid from "../../../components/table/StyledDataGrid";

const GRID_BOX_HEIGHT = 500;

const TableBox = ({
  tableData,
  tableColumnsOptions,
  selectedTaskIds,
  setSelectedTaskIds,
  ...props
}) => {
  return (
    <Grid item container style={{height: GRID_BOX_HEIGHT}} xs={12}>
      <StyledDataGrid
        columns={tableColumnsOptions}
        rows={tableData}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelection) => {
          process.env.REACT_APP_ENVIRONMENT === "staging"
            ? setSelectedTaskIds(newSelection)
            : setSelectedTaskIds(newSelection?.selectionModel);
        }}
        selectionModel={selectedTaskIds}
        {...props}
      />
    </Grid>
  );
};

export default connect(
  (state) => ({
    selectedTaskIds: state.multiCandidateRequest.get("selectedTaskIds"),
  }),
  {setSelectedTaskIds}
)(memo(TableBox));
