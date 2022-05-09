import React, {memo, useCallback, useMemo, useState} from "react";
import {Box, Collapse, makeStyles} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {toSetArray} from "../../../data/helper/commonFunctions";
import SelectTextField from "../../../components/inputs/SelectTextfield";
import SmallDataTextField from "../../../components/inputs/SmallDataTextField";
import ResetFiltersButton from "../../../components/buttons/ResetFilterButton";
import ApplyFiltersButton from "../../../components/buttons/ApplyFiltersButton";
import {getLogDateString} from "../../../data/helper/DateTimezoneHelpers";
import AutocompleteTextField from "../../../components/inputs/AutocompleteTextField";

const useStyles = makeStyles((theme) => ({
  filterBox: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  filterSection: {
    display: "flex",
  },
  filterField: {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

const SystemLogsFilters = ({
  filterOpen,
  allLogsData,
  setIsFilterApplied,
  setLogsData,
}) => {
  const classes = useStyles();
  const [usernameFilter, setUsernameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [notificationFilter, setNotificationFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");

  const handleFilterQuery = () => {
    setIsFilterApplied(true);
    const filtered = allLogsData?.filter(
      (log) =>
        (!usernameFilter?.length || log.userId === usernameFilter) &&
        (!typeFilter?.length || log.logType === typeFilter) &&
        (!notificationFilter?.length ||
          log.logNotification === notificationFilter) &&
        (!dateFromFilter ||
          getLogDateString(log.logDateTime) >= dateFromFilter) &&
        (!dateToFilter || getLogDateString(log.logDateTime) <= dateToFilter)
    );
    setLogsData(filtered);
  };

  const handleClearFilters = useCallback(() => {
    setNotificationFilter("");
    setDateFromFilter("");
    setDateToFilter("");
    setUsernameFilter("");
    setTypeFilter("");
    setIsFilterApplied(false);
    setLogsData(allLogsData);
  }, [allLogsData]);

  const types = useMemo(
    () => allLogsData?.map((data) => data.logType),
    [allLogsData]
  );

  const usernames = useMemo(
    () => toSetArray(allLogsData?.map((data) => data.userId))?.sort(),
    [allLogsData]
  );

  const notifications = useMemo(
    () => allLogsData?.map((data) => data.logNotification),
    [allLogsData]
  );

  return (
    <Collapse in={filterOpen} timeout="auto" unmountOnExit>
      <Box className={classes.filterBox}>
        <div>
          {allLogsData && (
            <>
              <div className={classes.filterSection}>
                <SelectTextField
                  id="select-type"
                  label="Type"
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                  className={classes.filterField}
                  dataList={types}
                />
                <Autocomplete
                  id="select-username"
                  value={usernameFilter}
                  options={usernames}
                  getOptionLabel={(userId) => userId}
                  className={classes.filterField}
                  renderInput={(params) => (
                    <AutocompleteTextField
                      {...params}
                      label="Username"
                      size="small"
                    />
                  )}
                  onChange={(event, newValue) => setUsernameFilter(newValue)}
                />
                <SelectTextField
                  id="select-notification"
                  label="Notification"
                  value={notificationFilter}
                  onValueChange={setNotificationFilter}
                  className={classes.filterField}
                  dataList={notifications}
                />
              </div>

              <div className={classes.filterSection}>
                <SmallDataTextField
                  label="Log Entries Date From"
                  value={dateFromFilter}
                  onChange={(e) => setDateFromFilter(e.target.value)}
                />
                <SmallDataTextField
                  label="Log Entries Date To"
                  value={dateToFilter}
                  onChange={(e) => setDateToFilter(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        <div>
          <ResetFiltersButton handleClick={handleClearFilters} />

          <ApplyFiltersButton handleClick={handleFilterQuery} />
        </div>
      </Box>
    </Collapse>
  );
};

export default memo(SystemLogsFilters);
