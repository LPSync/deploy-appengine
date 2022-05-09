import React, {memo, useEffect, useState} from "react";
import TaskCloseButtonToolbar from "../../../../components/taskManager/TaskCloseButtonToolbar";
import {Box, makeStyles, Typography} from "@material-ui/core";
import TaskHeadingToolbar from "../../../../components/taskManager/TaskHeadingToolbar";
import CustomTextField from "../../../../components/inputs/CustomTextField";
import AlertBox from "../../../../components/AlertBox";
import CustomFormSelect from "../../../../components/inputs/CustomFormSelect";
import SelectBadgesBox from "./SelectBadgesBox";
import SelectedBadgeChipsBox from "../../../../components/badges/SelectedBadgeChipsBox";
import SaveAndClearButtons from "../../../../components/buttons/SaveAndClearButtons";
import {getValidationMessage} from "../../../../data/helper/helpers";
import {isEmpty} from "../../../../data/helper/validation";
import {CREATE_BADGE_RULE} from "../../../../operations/adminMutations/createBadgeRule";
import {useMutation} from "@apollo/client";
import {useHistory} from "react-router-dom";
import handleError from "../../../../data/handleError";
import {UPDATE_BADGE_RULE} from "../../../../operations/adminMutations/UpdateBadgeRule";

const useStyles = makeStyles((theme) => ({
  box: {overflowY: "auto"},
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },

  textField: {
    width: "40ch",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  criteriaBox: {
    display: "flex",
  },
}));

const AddEditDrawerContent = ({
  executeQuery,
  setIsDrawerOpen,
  isEditRule,
  editRule,
  ruleBadges,
  setIsEditRule,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [ruleName, setRuleName] = useState("");
  const [ruleNameError, setRuleNameError] = useState(false);
  const [criteriaFieldValue, setCriteriaFieldValue] = useState("");
  const [criteriaFieldValueError, setCriteriaFieldValueError] = useState(false);
  const [criteriaFilter, setCriteriaFilter] = useState("");
  const [criteriaFilterError, setCriteriaFilterError] = useState(false);
  const [criteriaInputValue, setCriteriaInputValue] = useState("");
  const [criteriaInputValueError, setCriteriaInputValueError] = useState(false);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [deletedBadges, setDeletedBadges] = useState([]);
  const criteriaFieldValueOptions = ["Job Title"];
  const criteriaFilterOptions = ["contains", "is"];

  useEffect(() => {
    if (isEditRule) {
      setRuleName(editRule?.ruleName);
      setCriteriaFieldValue(editRule?.criteriaFieldValue);
      setCriteriaFilter(editRule?.criteriaFilter);
      setCriteriaInputValue(editRule?.criteriaInputValue);
      setSelectedBadges([...ruleBadges]);
    }
  }, [isEditRule, editRule, ruleBadges]);

  const [createBadgeRule] = useMutation(CREATE_BADGE_RULE, {
    onCompleted: () => {
      handleOnClose();
    },
    onError: (error) => handleError(error)(history),
  });

  const [updateBadgeRule] = useMutation(UPDATE_BADGE_RULE, {
    onCompleted: () => {
      handleOnClose();
    },
    onError: (error) => handleError(error)(history),
  });

  const createRule = async (idList) => {
    setIsButtonsDisabled(true);
    await createBadgeRule({
      variables: {
        input: {
          ruleName: ruleName,
          criteriaFieldValue: criteriaFieldValue,
          criteriaFilter: criteriaFilter,
          criteriaInputValue: criteriaInputValue,
          badges: idList,
        },
      },
    });
  };

  const updateRule = async (idList) => {
    setIsButtonsDisabled(true);
    await updateBadgeRule({
      variables: {
        input: {
          id: editRule?.id,
          ruleName: ruleName,
          criteriaFieldValue: criteriaFieldValue,
          criteriaFilter: criteriaFilter,
          criteriaInputValue: criteriaInputValue,
          badges: idList,
          deleteBadges: deletedBadges,
        },
      },
    });
  };

  const handleAlert = (msg, open, severity) => {
    setAlertSeverity(severity);
    setAlertMessage(msg);
    setIsAlertOpen(open);
  };

  const handleOnClose = () => {
    if (isEditRule) {
      setIsEditRule(false);
    }
    setIsButtonsDisabled(false);
    setIsDrawerOpen(false);
    handleClear();
    executeQuery();
  };

  const handleRuleNameChange = (name) => {
    setRuleName(name);
    setRuleNameError(false);
    setIsAlertOpen(false);
  };

  const handleFieldValueChange = (field) => {
    setCriteriaFieldValue(field);
    setCriteriaFieldValueError(false);
    setIsAlertOpen(false);
  };

  const handleFilterChange = (filter) => {
    setCriteriaFilter(filter);
    setCriteriaFilterError(false);
    setIsAlertOpen(false);
  };

  const handleInputValueChange = (input) => {
    setCriteriaInputValue(input);
    setCriteriaInputValueError(false);
    setIsAlertOpen(false);
  };

  const handleDelete = (chip) => {
    setSelectedBadges((selectedBadges) =>
      selectedBadges.filter((bge) => bge?.id !== chip?.id)
    );
    if (isEditRule) {
      setDeletedBadges([...deletedBadges, chip?.id]);
    }
  };

  const handleClear = () => {
    setRuleName("");
    setCriteriaFieldValue("");
    setCriteriaFilter("");
    setCriteriaInputValue("");
    setSelectedBadges([]);

    if (isEditRule) {
      setDeletedBadges([]);
    }
    setIsAlertOpen(false);
  };

  const handleSave = async () => {
    const errorMessage =
      getValidationMessage(
        ruleName,
        [isEmpty],
        "Rule Name",
        setRuleNameError
      ) ||
      getValidationMessage(
        criteriaFieldValue,
        [isEmpty],
        "Field",
        setCriteriaFieldValueError
      ) ||
      getValidationMessage(
        criteriaFilter,
        [isEmpty],
        "Filter",
        setCriteriaFilterError
      ) ||
      getValidationMessage(
        criteriaInputValue,
        [isEmpty],
        "Input",
        setCriteriaInputValueError
      );

    if (errorMessage) {
      handleAlert(errorMessage, true, "warning");
    } else {
      let idList = [];

      if (isEditRule) {
        selectedBadges
          .filter(
            (selected) => !ruleBadges.some((saved) => selected.id === saved.id)
          )
          .map((bge) => {
            idList.push(bge.id);
          });

        await updateRule(idList);
      } else {
        selectedBadges.map((bge) => {
          idList.push(bge.id);
        });
        await createRule(idList);
      }
    }
  };

  return (
    <>
      <TaskCloseButtonToolbar handleClose={handleOnClose} />
      <Box>
        <TaskHeadingToolbar
          title={isEditRule ? "Edit Rule" : "Add a New Rule"}
        />
      </Box>
      {isAlertOpen && (
        <AlertBox severity={alertSeverity} message={alertMessage} />
      )}
      <Box m={1} className={classes.box}>
        <Box mt={2}>
          <Typography>
            <strong>Enter Rule Name:</strong>
          </Typography>
        </Box>
        <Box ml={2}>
          <form noValidate autoComplete="off">
            <CustomTextField
              required
              id="rule-name-input"
              label="Rule Name"
              error={ruleNameError}
              value={ruleName}
              onValueChange={handleRuleNameChange}
            />
          </form>
        </Box>
        <Box mt={2}>
          <Typography>
            <strong>Enter Rule:</strong>
          </Typography>
        </Box>
        <Box ml={2} className={classes.criteriaBox}>
          <Box mr={1}>
            <CustomFormSelect
              label={"Field"}
              value={criteriaFieldValue}
              options={criteriaFieldValueOptions}
              error={criteriaFieldValueError}
              onValueChange={handleFieldValueChange}
              width={"20ch"}
            />
          </Box>
          <Box mr={1}>
            <CustomFormSelect
              label={"Filter"}
              value={criteriaFilter}
              options={criteriaFilterOptions}
              error={criteriaFilterError}
              onValueChange={handleFilterChange}
              width={"12ch"}
            />
          </Box>
          <form noValidate autoComplete="off">
            <CustomTextField
              required
              small
              id="input-value-input"
              label="Input"
              error={criteriaInputValueError}
              value={criteriaInputValue}
              onValueChange={handleInputValueChange}
            />
          </form>
        </Box>

        <SelectBadgesBox
          handleAlert={handleAlert}
          selectedBadges={selectedBadges}
          setSelectedBadges={setSelectedBadges}
        />
        {selectedBadges?.length > 0 && (
          <>
            <SelectedBadgeChipsBox
              badges={selectedBadges}
              handleDelete={handleDelete}
            />
            <SaveAndClearButtons
              isButtonsDisabled={isButtonsDisabled}
              handleClear={handleClear}
              handleSave={handleSave}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default memo(AddEditDrawerContent);
