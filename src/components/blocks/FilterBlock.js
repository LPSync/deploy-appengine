import React, {memo} from "react";
import {Box, makeStyles} from "@material-ui/core";
import CustomCollapse from "../../components/blocks/CustomCollapse";
import ApplyFiltersButton from "../../components/buttons/ApplyFiltersButton";
import ResetFiltersButton from "../../components/buttons/ResetFilterButton";

const useStyles = makeStyles((theme) => ({
  filterBox: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    // flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  filterFields: {
    display: "flex",
    alignItems: "flex-end",
    // marginBottom: theme.spacing(3),
  },
  clearFilterBtn: {
    marginLeft: theme.spacing(2),
  },
  filterActionWrapper: {
    display: "flex",
  }
}));

const FilterBlock = ({
  filterOpen,
  handleClearFilters,
  handleFilterQuery,
  children,
}) => {
  const classes = useStyles();

  return (
    <CustomCollapse in={filterOpen}>
      <Box className={classes.filterBox}>
        <Box className={classes.filterFields}>
          {children}
        </Box>

        <div className={classes.filterActionWrapper}>
          <ApplyFiltersButton handleClick={handleFilterQuery} />

          <ResetFiltersButton
            handleClick={handleClearFilters}
            className={classes.clearFilterBtn}
          />
        </div>
      </Box>
    </CustomCollapse>
  );
};

export default memo(FilterBlock);
