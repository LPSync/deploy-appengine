import React, {memo, useState} from "react";
import {InputAdornment, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GlobalSearchTypes from "../../../data/constants/GlobalSearchTypes";

const useStyles = makeStyles(() => ({
  textField: {
    width: "30vw",
    margin: "0 8px",
    "& .MuiFilledInput-input": {
      padding: 8,
    },
  },
  select: {
    width: 155,
    marginRight: 8,
    "& .MuiSelect-filled": {
      paddingTop: 6,
    },
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState(GlobalSearchTypes.ALL_SOURCES);

  return (
    <>
      <TextField
        id="global-search-text-field"
        variant="filled"
        color="secondary"
        autoComplete="off"
        value={searchQuery}
        InputProps={{
          startAdornment: (
            <InputAdornment style={{marginTop: 0}}>
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={classes.textField}
      />
      <Select
        id="select-global-search-type"
        value={searchType}
        onChange={e => setSearchType(e.target.value)}
        className={classes.select}
        variant="filled"
      >
        {Object.values(GlobalSearchTypes)?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default memo(SearchBar);