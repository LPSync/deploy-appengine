import React, {useState, useEffect} from "react";
import {Box, makeStyles, ButtonGroup, Button} from "@material-ui/core";
import {
  BUTTON_TEXT_ALL,
  FTE_TRACKER_OPTIONS_BUTTONS,
  FTE_TRACKER_OPTIONS_BUTTONS_SELECTED,
  GENERATE_FTE_TRACKER_TABLE_COLUMNS,
  OKTA_STATUS_LABEL,
  SHIPPING_STATUS_LABEL,
} from "../../../../data/constants/FteTracker";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import StyledDataGrid from "../../../../components/table/StyledDataGrid";

const GRID_BOX_HEIGHT = 500;

const useStyles = makeStyles((theme) => ({
  buttonsBox: {
    display: "flex",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  fullDimensionsBox: {
    height: GRID_BOX_HEIGHT,
    width: "100%",
  },
}));

const FteCandidateTrackerTable = ({openDrawerHandler, data, loading}) => {
  const classes = useStyles();
  const [filterModel, setFilterModel] = useState({items: []});
  const [selectedButtons, setSelectedButtons] = useState(
    FTE_TRACKER_OPTIONS_BUTTONS_SELECTED
  );

  const refreshSelectedButtons = (currentFilterModel) => {
    const newButtonsOptionsObject = {...FTE_TRACKER_OPTIONS_BUTTONS_SELECTED};

    currentFilterModel.items.forEach((item) => {
      if (
        [SHIPPING_STATUS_LABEL, OKTA_STATUS_LABEL].includes(item.columnField)
      ) {
        newButtonsOptionsObject[item.columnField] = item.value;
      }
    });

    setSelectedButtons(newButtonsOptionsObject);
  };

  const handleFilterModelChange = (changedFilterModel) => {
    setFilterModel(changedFilterModel.filterModel);
  };

  const applyFilterModelChanges = (itemChanges, columnToRemoveFromFilter) => {
    const changedFilterModel = {...filterModel};

    if (columnToRemoveFromFilter) {
      const indexOfColumnToRemove = filterModel.items.findIndex(
        (item) => item.columnField === columnToRemoveFromFilter
      );

      if (indexOfColumnToRemove !== -1) {
        changedFilterModel.items.splice(indexOfColumnToRemove, 1);
      }
    } else {
      let existingColumnFieldIndex = filterModel.items.findIndex(
        (item) => item.columnField === itemChanges.columnField
      );

      if (existingColumnFieldIndex !== -1) {
        changedFilterModel.items.splice(
          existingColumnFieldIndex,
          1,
          itemChanges
        );
      } else {
        changedFilterModel.items.push(itemChanges);
      }
    }

    refreshSelectedButtons(changedFilterModel);
    setFilterModel(changedFilterModel);
  };

  const isButtonSelected = (buttonGroup, buttonText) => {
    return (
      selectedButtons[buttonGroup] === buttonText ||
      (buttonText === BUTTON_TEXT_ALL &&
        typeof selectedButtons[buttonGroup] === "boolean" &&
        !selectedButtons[buttonGroup])
    );
  };

  const getButtonsBox = () => {
    return (
      <Box className={classes.buttonsBox}>
        {Object.entries(FTE_TRACKER_OPTIONS_BUTTONS).map((buttonGroupEntry) => {
          return (
            <ButtonGroup disabled={loading}>
              {buttonGroupEntry[1].map((button) => {
                const [itemChanges, columnToRemoveFromFilter] =
                  typeof button.config === "string"
                    ? [null, button.config]
                    : [button.config, null];

                return (
                  <Button
                    variant={
                      isButtonSelected(buttonGroupEntry[0], button.label)
                        ? "contained"
                        : "outlined"
                    }
                    color={"secondary"}
                    onClick={() =>
                      applyFilterModelChanges(
                        itemChanges,
                        columnToRemoveFromFilter
                      )
                    }
                    disabled={button.disabled}
                  >
                    {button.label}
                  </Button>
                );
              })}
            </ButtonGroup>
          );
        })}
      </Box>
    );
  };

  const getFteCandidateTrackerTable = () => {
    return (
      <Box className={classes.fullDimensionsBox}>
        <StyledDataGrid
          rows={data}
          columns={GENERATE_FTE_TRACKER_TABLE_COLUMNS(openDrawerHandler)}
          filterModel={filterModel}
          onFilterModelChange={handleFilterModelChange}
        />
      </Box>
    );
  };

  return (
    <Box bgcolor="#FCFCFC" p={4} minWidth={1050}>
      <div className={classes.fullDimensionsBox}>
        {getButtonsBox()}
        {loading ? <LoadingCircle /> : getFteCandidateTrackerTable()}
      </div>
    </Box>
  );
};

export default FteCandidateTrackerTable;
