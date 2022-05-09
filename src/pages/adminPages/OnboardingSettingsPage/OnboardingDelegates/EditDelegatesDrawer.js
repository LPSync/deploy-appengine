import React, {useState, memo} from "react";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {Box, makeStyles, Typography} from "@material-ui/core";
import TaskCloseButtonToolbar from "../../../../components/taskManager/TaskCloseButtonToolbar";
import TaskHeadingToolbar from "../../../../components/taskManager/TaskHeadingToolbar";
import handleError from "../../../../data/handleError";
import {DELETE_ONBOARDING_DELEGATE} from "../../../../operations/adminMutations/deleteOnboardingDelegate";
import InfoBlock from "../../../../components/InfoBlock";
import DelegateChip from "../../../../components/chips/DelegateChip";

const useStyles = makeStyles(() => ({
  box: {overflowY: "auto"},
}));

const EditDelegatesDrawer = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const {refetch, selected, setIsDrawerOpen} = props;
  const {onboardingDelegates, userName} = selected;
  const [delArr, setDelArr] = useState(onboardingDelegates);

  const [deleteDel] = useMutation(DELETE_ONBOARDING_DELEGATE, {
    onError: (error) => handleError(error)(history),
  });

  const handleClose = () => {
    setIsDrawerOpen(false);
    refetch();
  };

  const handleDelete = (chip) => {
    deleteDel({
      variables: {
        id: parseInt(chip.id),
      },
    });

    setDelArr((delArr) =>
      delArr.filter((delegate) =>
        chip.delegateTo
          ? delegate.delegateTo !== chip.delegateTo
          : delegate.delegateCompany !== chip.delegateCompany
      )
    );
  };

  return (
    <div>
      <TaskCloseButtonToolbar handleClose={handleClose} />
      <Box className={classes.box}>
        <TaskHeadingToolbar
          title={`Edit ${userName?.toUpperCase()} Delegates`}
        />
      </Box>
      <InfoBlock>
        <Box m={2}>
          <Typography>
            To delete, click on the X on the chip. <br />
            <strong>
              Once you click on the X, it'll instantly be deleted.
            </strong>
          </Typography>
        </Box>
      </InfoBlock>
      <Box m={2}>
        <Typography>
          <strong>Delegate To and/or Company:</strong>
        </Typography>
        <Box mt={2}>
          {delArr?.length > 0 ? (
            delArr?.map((del) => (
              <DelegateChip
                key={del.id}
                delegate={del}
                onDelete={() => handleDelete(del)}
              />
            ))
          ) : (
            <Typography>No delegates</Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default memo(EditDelegatesDrawer);
