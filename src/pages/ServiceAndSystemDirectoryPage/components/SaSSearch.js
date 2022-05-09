import {Box, makeStyles} from "@material-ui/core";
import SearchTextField from "../../../components/inputs/SearchTextField";
import SelectTextField from "../../../components/inputs/SelectTextfield";
import LoadingButton from "../../../components/buttons/LoadingButton";
import React from "react";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchRow: {
    display: "flex",
    alignItems: "flex-end",
    marginRight: 14,
    flexGrow: 1,
  },
  select: {
    marginLeft: 14,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: 150,
    background: theme.palette.primary.main,
    "& .MuiSelect-select": {
      padding: 12,
      paddingRight: 24,
    },
  },
  search: {
    flexGrow: 1,
    "& .MuiInputBase-input": {
      padding: 12,
    },
    "& .MuiFilledInput-root": {
      background: theme.palette.primary.main,
    },
  },
}));

const SaSSearch = ({
  query,
  onChange,
  onSearch,
  onClose,
  queryType,
  setQueryType,
  loading,
  onBlur,
}) => {
  const classes = useStyles();
  const enterHandler = (key) => {
    if (key === "Enter") onSearch();
  };
  return (
    <Box className={classes.searchContainer} onBlur={onBlur}>
      <Box className={classes.searchRow}>
        <SearchTextField
          className={classes.search}
          margin="none"
          placeholder="Search by Tier, Owner, Team, Service Name or System Name"
          handleChange={onChange}
          value={query}
          onKeyPress={(e) => enterHandler(e.key)}
          handleClose={onClose}
        />
        <SelectTextField
          dataList={["All", "Systems", "Services"]}
          deleteFirst={true}
          value={queryType}
          className={classes.select}
          onValueChange={setQueryType}
        />
      </Box>
      <LoadingButton
        loading={loading}
        variant="contained"
        className={classes.searchButton}
        onClick={onSearch}
      >
        SEARCH
      </LoadingButton>
    </Box>
  );
};
export default SaSSearch;
