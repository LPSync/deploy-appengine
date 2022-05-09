import React, {memo} from "react";
import {useQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {GET_AUTH_TASKS} from "../../../operations/queries/getAuthTasks";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import TaskManagerTable from "./TaskManagerTable";
import handleError from "../../../data/handleError";
import RefreshButton from "../../../components/buttons/RefreshButton";
import {Toolbar, Box} from "@material-ui/core";

const MyTasks = () => {
  const history = useHistory();

  const {data, refetch} = useQuery(GET_AUTH_TASKS, {
    fetchPolicy: "cache-and-network",
    onError: (error) => handleError(error)(history),
  });

  return (
    <>
      {data ? (
        <>
          <Toolbar>
            <Box flexGrow={1} />
            <RefreshButton handleClick={() => refetch()} />
          </Toolbar>

          <TaskManagerTable data={data.get_auth_tasks} />
        </>
      ) : (
        <LoadingCircle text={"Loading tasks..."} />
      )}
    </>
  );
};

export default memo(MyTasks);
