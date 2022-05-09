import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {Box, Divider, makeStyles, Typography} from "@material-ui/core";
import TaskCloseButtonToolbar from "../../../../../components/taskManager/TaskCloseButtonToolbar";
import TaskHeadingToolbar from "../../../../../components/taskManager/TaskHeadingToolbar";
import handleError from "../../../../../data/handleError";
import {CREATE_ONBOARDING_DELEGATES} from "../../../../../operations/adminMutations/createOnboardingDelegates";
import SearchDelegateCompany from "./SearchDelegateCompany";
import SearchDelegateTo from "./SearchDelegateTo";
import InfoBlock from "../../../../../components/InfoBlock";
import SearchDelegateUser from "./SearchDelegateUser";
import DelegateChip from "../../../../../components/chips/DelegateChip";
import SaveAndClearButtons from "../../../../../components/buttons/SaveAndClearButtons";

const useStyles = makeStyles(() => ({
  box: {overflowY: "auto"},
}));

const AddDelegatesDrawer = ({refetch, setIsDrawerOpen}) => {
  const classes = useStyles();
  const history = useHistory();
  const [delegateUser, setDelegateUser] = useState("");
  const [delegates, setDelegates] = useState([]);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const [createDelegates] = useMutation(CREATE_ONBOARDING_DELEGATES, {
    onCompleted: () => onComplete(),
    onError: (error) => handleError(error)(history),
  });

  const onComplete = () => {
    refetch();
    setIsButtonsDisabled(false);
    setIsDrawerOpen(false);
  };

  const handleSave = async () => {
    setIsButtonsDisabled(true);
    await createDelegates({
      variables: {
        user: delegateUser,
        input: delegates,
      },
    });
  };

  const handleClear = () => {
    setDelegateUser("");
    setDelegates([]);
  };

  const handleDelete = (chip) => {
    setDelegates((delegates) =>
      delegates.filter((delegate) =>
        chip.delegateTo
          ? delegate.delegateTo !== chip.delegateTo
          : delegate.delegateCompany !== chip.delegateCompany
      )
    );
  };

  return (
    <div>
      <TaskCloseButtonToolbar handleClose={() => setIsDrawerOpen(false)} />
      <Box className={classes.box}>
        <TaskHeadingToolbar title={"Add Onboarding Delegates"} />
        <InfoBlock>
          <Box m={2}>
            <ol>
              <li>
                Search and select delegate user (can be new/old to the
                Onboarding Delegates table)
              </li>
              <li>
                Search for a user and/or a company (multiple can be selected) to
                add
              </li>
              <li>Click the SAVE button</li>
            </ol>
          </Box>
        </InfoBlock>
        <Box m={2}>
          <SearchDelegateUser
            delegateUser={delegateUser}
            setDelegateUser={setDelegateUser}
          />
        </Box>
        {delegateUser?.length > 0 && (
          <Box>
            <Box mb={5}>
              <SearchDelegateTo
                delegates={delegates}
                setDelegates={setDelegates}
                delegateUser={delegateUser}
              />
            </Box>
            <Box mb={5}>
              <SearchDelegateCompany
                delegates={delegates}
                setDelegates={setDelegates}
                delegateUser={delegateUser}
              />
            </Box>
            <Divider />
            <Box m={2}>
              {delegates?.length > 0 && (
                <>
                  <Typography>
                    <strong>To be added:</strong>
                  </Typography>
                  <Box mb={5}>
                    {delegates?.map((del) => (
                      <DelegateChip
                        key={
                          del.delegateTo ? del.delegateTo : del.delegateCompany
                        }
                        delegate={del}
                        onDelete={() => handleDelete(del)}
                      />
                    ))}
                  </Box>
                  <SaveAndClearButtons
                    handleClear={handleClear}
                    handleSave={handleSave}
                    isButtonsDisabled={isButtonsDisabled}
                  />
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default memo(AddDelegatesDrawer);
