import React, {memo, useState} from "react";
import {Box, makeStyles} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import TaskCloseButtonToolbar from "../../../../../components/taskManager/TaskCloseButtonToolbar";
import TaskHeadingToolbar from "../../../../../components/taskManager/TaskHeadingToolbar";
import EditBadgesTab from "./EditBadgesTab";
import AddBadgesTab from "./AddBadgesTab";
import {useQuery} from "@apollo/client";
import {GET_LPSYNC_USER_BADGES} from "../../../../../operations/queries/getLpsyncUserBadges";
import handleError from "../../../../../data/handleError";
import TabsPaper from "../../../../../components/tabs/TabsPaper";

const useStyles = makeStyles((theme) => ({
  box: {overflowY: "auto", maxHeight: "90vh"},
  paper: {backgroundColor: theme.palette.secondary.main},
}));

const tabName = "scrollable-auto";

const ManageMyBadgesDrawerContent = ({setIsDrawerOpen, handleBadgeQuery}) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);

  const {data, refetch} = useQuery(GET_LPSYNC_USER_BADGES, {
    fetchPolicy: "no-cache",
    onError: (error) => handleError(error)(history),
  });

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
    let dashView;
    if (newValue === 0) {
      dashView = "add-badges";
    } else if (newValue === 1) {
      dashView = "edit-badges";
      refetch();
    }
  };

  const handleOnClose = () => {
    handleBadgeQuery();
    setIsDrawerOpen(false);
  };

  const manageBadgesTabs = [
    {
      label: "Add Badges",
      content: <AddBadgesTab userBadgeData={data?.get_lpsync_user_badges} />,
    },
    {
      label: "Edit Badges",
      content: (
        <EditBadgesTab
          userBadgeData={data?.get_lpsync_user_badges}
          refetch={refetch}
        />
      ),
    },
  ];
  return (
    <>
      <TaskCloseButtonToolbar handleClose={handleOnClose} />
      <Box>
        <TaskHeadingToolbar title={"Manage My Badges"} />
      </Box>
      <Box className={classes.box}>
        <TabsPaper
          value={value}
          onChange={handleTabsChange}
          tabs={manageBadgesTabs}
          tabName={tabName}
          aria-label="manage badges tabs navigation"
          className={classes.paper}
          styled
        />
      </Box>
    </>
  );
};

export default memo(ManageMyBadgesDrawerContent);
