import React, {memo, useState} from "react";
import {Box, Collapse, makeStyles} from "@material-ui/core";
import TaskTypes from "../../../../data/constants/TaskTypes";
import ResetFiltersButton from "../../../../components/buttons/ResetFilterButton";
import ApplyFiltersButton from "../../../../components/buttons/ApplyFiltersButton";
import TaskStatuses from "../../../../data/constants/TaskStatuses";
import {connect} from "react-redux";
import SelectTextField from "../../../../components/inputs/SelectTextfield";
import SmallDataTextField from "../../../../components/inputs/SmallDataTextField";

const useStyles = makeStyles((theme) => ({
  filterBox: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  filterFields: {
    marginBottom: theme.spacing(3),
  },
  datesDiv: {display: "flex"},
  rowOneDiv: {display: "flex"},
}));

const FilterBox = ({filters, onFilterChange, filterOpen, setIsFilterApplied, allTasksData}) => {
  const classes = useStyles();
  const [taskTypeFilter, setTaskTypeFilter] = useState(filters.taskType);
  const [taskStatusFilter, setTaskStatusFilter] = useState(filters.taskStatus);
  const [taskCreatorFilter, setTaskCreatorFilter] = useState(filters.taskCreator);
  const [dateFromFilter, setDateFromFilter] = useState(filters.dateFrom);
  const [dateToFilter, setDateToFilter] = useState(filters.dateTo);
  const [dateFromError, setDateFromError] = useState(false);
  const [dateToError, setDateToError] = useState(false);
  const [taskData, setTaskData] = useState(null);

  const handleApply = () => {
    const newFilters = {
      ...filters,
      taskType: taskTypeFilter.toLowerCase(),
      taskStatus: taskStatusFilter.toLowerCase(),
      taskCreator: taskCreatorFilter.toLowerCase(),
      dateFrom: dateFromFilter,
      dateTo: dateToFilter,
      pageCount: 0,
    };
    onFilterChange(newFilters);
  };

  const handleDateFromChange = (e) => {
    setDateFromError(false);
    setDateFromFilter(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateToError(false);
    setDateToFilter(e.target.value);
  };

  const handleFilterQuery = () => {
    if (dateFromFilter && !dateToFilter) {
      setDateToError(true);
    } else if (!dateFromFilter && dateToFilter) {
      setDateFromError(true);
    } else if (!dateFromError && !dateToError) {
      handleApply();
    }
  };

  const handleClearFilters = () => {
    setTaskTypeFilter("");
    setTaskStatusFilter("");
    setTaskCreatorFilter("");
    setDateFromFilter("");
    setDateToFilter("");
    setDateToError(false);
    setDateFromError(false);
    setIsFilterApplied(false);
    setTaskData(allTasksData);
  };

  return (
    <Collapse in={filterOpen} timeout="auto" unmountOnExit>
      <Box className={classes.filterBox}>
        <div className={classes.filterFields}>
          <div className={classes.rowOneDiv}>
            <SelectTextField
              id="select-task-type"
              label="Task Type"
              value={taskTypeFilter}
              onValueChange={setTaskTypeFilter}
              dataList={Object.values(TaskTypes)}
            />
            <SelectTextField
              id="select-task-status"
              label="Task Status"
              value={taskStatusFilter}
              onValueChange={setTaskStatusFilter}
              dataList={Object.values(TaskStatuses)}
            />
            {taskData && (
              <SelectTextField
                id="select-task-creator"
                label="Task Creator"
                value={taskCreatorFilter}
                onValueChange={setTaskCreatorFilter}
                dataList={taskData.map((data) => data.taskCreatorUsername)}
              />
            )}
          </div>
          <div className={classes.datesDiv}>
            <SmallDataTextField
              label="Requested Date From"
              value={dateFromFilter}
              onChange={handleDateFromChange}
              error={dateFromError}
            />
            <SmallDataTextField
              label="Requested Date To"
              value={dateToFilter}
              onChange={handleDateToChange}
              error={dateToError}
            />
          </div>
        </div>
        <div>
          <ResetFiltersButton handleClick={handleClearFilters} small/>

          <ApplyFiltersButton handleClick={handleFilterQuery}/>
        </div>
      </Box>
    </Collapse>
  );
};

export default connect(
  state => ({allTasksData: state.taskManager.get("allTasksData")}),
  {})
(memo(FilterBox));
