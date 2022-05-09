import React, {useEffect, useState, useContext, memo} from "react";
import {Box} from "@material-ui/core";
import Page from "../../components/Page";
import BreadcrumbText from "../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../components/NoPermissionsError";
import TaskManagerPageContent from "./TaskManagerPageContent";
import {AuthUserContext} from "../../AuthUserContextProvider";
import BreadcrumbHomeBox from "../../components/breadcrumbs/BreadcrumbHomeBox";
import PageTitleBox from "../../components/blocks/PageTitleBox";

const TaskManagerPage = () => {
  const {permTaskManagerViewAll, permTaskManagerViewTeam} = useContext(
    AuthUserContext
  );
  const [viewTaskPage, setViewTaskPage] = useState(false);

  useEffect(() => {
    if (permTaskManagerViewAll || permTaskManagerViewTeam) {
      setViewTaskPage(true);
    }
  }, [permTaskManagerViewAll, permTaskManagerViewTeam]);

  return (
    <Page title="Task Manager | LPSYNC">
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"TASK MANAGER"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Task Manager" />

        {viewTaskPage ? <TaskManagerPageContent /> : <NoPermissionsError />}
      </Box>
    </Page>
  );
};

export default memo(TaskManagerPage);
