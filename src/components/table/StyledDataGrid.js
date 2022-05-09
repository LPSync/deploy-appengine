import React, {memo} from "react";
import {Box, makeStyles} from "@material-ui/core";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";

const GRID_BOX_HEIGHT = 500,
  CONTENT_HEIGHT_COEFFICIENT = 1.3054830287;

const useStyles = makeStyles((theme) => ({
  noRowsOverlay: {
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: `${GRID_BOX_HEIGHT / CONTENT_HEIGHT_COEFFICIENT}px`,
    height: "100%",
  },
  toolbarButton: {
    color: theme.palette.secondary.main,
  },
  "@global": {
    "div[role=tooltip]": {
      ".MuiPaper-elevation1, & .MuiGridPanel-paper": {
        backgroundColor: theme.palette.background.light,
      },
    },
  },
  dataGrid: {
    "& .MuiCheckbox-colorPrimary.Mui-checked": {
      color: theme.palette.warning.main,
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: theme.palette.primary.light,
    },
    "& .MuiDataGrid-row.Mui-odd": {
      backgroundColor: theme.palette.background.default,
    },
    "& .MuiDataGrid-row": {
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    "& .MuiDataGrid-cell": {
      overflowX: "auto",
      overflowY: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "clip",
    },
  },
}));

const StyledDataGrid = ({rows, columns, ...props}) => {
  const classes = useStyles();

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton className={classes.toolbarButton} />
      <GridToolbarFilterButton className={classes.toolbarButton} />
      <GridToolbarDensitySelector className={classes.toolbarButton} />
      <GridToolbarExport className={classes.toolbarButton} />
    </GridToolbarContainer>
  );

  const NoRowsOverlay = () => (
    <Box className={classes.noRowsOverlay}>No results found</Box>
  );

  return (
    <DataGrid
      className={classes.dataGrid}
      columns={columns}
      rows={rows}
      components={{Toolbar: CustomToolbar, NoRowsOverlay}}
      {...props}
    />
  );
};

export default memo(StyledDataGrid);
