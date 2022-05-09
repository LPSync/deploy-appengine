import React, {memo, useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {Box, Button, Checkbox, CircularProgress, FormControlLabel, makeStyles} from "@material-ui/core";
import TaskCloseButtonToolbar from "../../../../components/taskManager/TaskCloseButtonToolbar";
import TaskHeadingToolbar from "../../../../components/taskManager/TaskHeadingToolbar";
import {CREATE_LAPTOP_OPTION} from "../../../../operations/adminMutations/createLaptopOption";
import handleError from "../../../../data/handleError";
import SaveIcon from "@material-ui/icons/Save";
import {toSetArray} from "../../../../data/helper/commonFunctions";
import LaptopField from "./LaptopField";
import MissedInputModal from "../../../../components/modals/MissedInputModal";

const useStyles = makeStyles((theme) => ({
  box: {overflowY: "auto"},
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.5rem",
  },
}));

const LaptopDrawer = ({onComplete, handleClose, selectedLaptop, isAdd, laptops, createLog}) => {
  const classes = useStyles();
  const history = useHistory();

  const [laptopType, setLaptopType] = useState(selectedLaptop?.laptopType || "");
  const [laptopLanguage, setLaptopLanguage] = useState(selectedLaptop?.laptopLanguage || "");
  const [laptopTypeError, setLaptopTypeError] = useState(false);
  const [laptopLanguageError, setLaptopLanguageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState(selectedLaptop?.laptopAvailability || false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const [createLaptop, {error, loading}] = useMutation(CREATE_LAPTOP_OPTION, {
    onCompleted: () => onComplete(),
    onError: (error) => handleError(error)(history),
  });

  if (error) {
    createLog(
      "alert",
      `Candidate Portal Setting >> Error - Laptop option upsert; errorMsg: ${error.message}`,
    );
  }

  const handleSave = async() => {
    if(!laptopLanguage){
      setLaptopLanguageError(true);
      return setErrorMessage("Laptop Language is missing!");
    }
    if(!laptopType){
      setLaptopTypeError(true);
      return setErrorMessage("Laptop Type is missing!");
    }
    if(laptops?.filter(laptop => laptop.laptopType === laptopType && laptop.laptopLanguage === laptopLanguage)?.length){
      return setErrorMessage("Laptop Option already exist!");
    }
    setIsButtonsDisabled(true);
      await createLaptop({
        variables: {
          input: {
            id: !isAdd ? selectedLaptop?.id : 0,
            laptopType,
            laptopLanguage,
            laptopAvailability: active,
          },
        },
      });
    createLog(
      "info",
      `Candidate Portal Setting >> Laptop option ${isAdd ? "added" : "updated"}; laptopInfo: ${
        laptopType} - ${laptopLanguage} ${active ? "active" : ""};`
    );
  };

  const laptopTypes = useMemo(() =>
      toSetArray(laptops?.map(laptop => laptop?.laptopType)),
    [laptops]);

  const laptopLanguages = useMemo(() =>
      toSetArray(laptops?.map(laptop => laptop?.laptopLanguage)),
    [laptops]);

  return (
    <div>
      <TaskCloseButtonToolbar handleClose={handleClose} />
      <Box m={1} className={classes.box}>
        <TaskHeadingToolbar title={`${isAdd ? "Add New" : "Update"} Select Laptop Option`} />
        <Box m={2} pt={1}>
          <Box mb={5}>
            <LaptopField
              error={laptopTypeError}
              setError={setLaptopTypeError}
              options={laptopTypes}
              value={laptopType}
              setValue={setLaptopType}
              label="Laptop Type"
            />
          </Box>
          <Box mb={5}>
            <LaptopField
              error={laptopLanguageError}
              setError={setLaptopLanguageError}
              options={laptopLanguages}
              value={laptopLanguage}
              setValue={setLaptopLanguage}
              label="Laptop Language"
            />
          </Box>
          <Box mb={5}>
            <FormControlLabel
              label={"Is Active?"}
              control={
                <Checkbox checked={active} onChange={event => setActive(event.target.checked)} />}
            />
          </Box>
        </Box>
        <Box m={3}>
          <Button
            color="secondary"
            variant="contained"
            disabled={isButtonsDisabled}
            onClick={handleSave}
          >
            {loading && <CircularProgress size={15} />}
            <SaveIcon className={classes.icon} />
            {isAdd ? "Add" : "Update"}
          </Button>
        </Box>
        <MissedInputModal
          modalMsg={errorMessage}
          open={!!errorMessage}
          handleClose={() => setErrorMessage("")}
        />
      </Box>
    </div>
  );
};

export default memo(LaptopDrawer);
