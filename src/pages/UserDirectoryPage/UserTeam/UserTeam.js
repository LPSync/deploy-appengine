import React, {memo, useContext, useEffect, useState} from "react";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {GET_DIRECT_REPORTS} from "../../../operations/queries/getDirectReports";
import handleError from "../../../data/handleError";
import {Box, Grid, makeStyles} from "@material-ui/core";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import UserToolbarTypography from "../../../components/typographies/ToolbarTypography";
import {GET_USER_BY_EMAIL} from "../../../operations/queries/getUserByEmail";
import UserTypography from "./UserTypography";
import UserGridItemWrapper from "./UserGridItemWrapper";
import UserLoadingCircle from "./UserLoadingCircle";

const useStyles = makeStyles(() => ({
  userTeamContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const UserTeam = () => {
  const {authUser} = useContext(AuthUserContext);
  const history = useHistory();
  const [manager, setManager] = useState(null);
  const [reportsData, setReportsData] = useState();
  const classes = useStyles();

  const [executeReportsSearch, {loading: reportsLoading}] = useLazyQuery(
    GET_DIRECT_REPORTS,
    {
      onCompleted: (data) => setReportsData(data?.get_direct_reports),
      onError: (error) => handleError(error)(history),
    }
  );

  const [executeSearch, {loading, data}] = useLazyQuery(GET_USER_BY_EMAIL, {
    onError: (error) => handleError(error)(history),
  });
  useEffect(() => {
    if(data){
      setManager(data.get_user_by_email?.[0])
    }
  }, [data])

  useEffect(() => {
    if (authUser?.profile?.email) {
      executeReportsSearch({variables: {search: authUser?.profile?.email}});
    }
  }, [authUser, executeReportsSearch]);

  useEffect(() => {
    if (authUser?.profile?.managerEmail) {
      executeSearch({variables: {search: authUser?.profile?.managerEmail}});
    }
  }, [authUser, executeSearch]);

  return (
    <Box>
      <PaperCardWrapper style={{overflow: "visible"}}>
        <UserToolbarTypography title="Your Team" />

        <Box px={3}>
          <Grid container className={classes.userTeamContainer}>
            <UserGridItemWrapper
              user={manager}
              title="Your Manager"
              noUserText="No manager Defined"
              loading={loading}
            />

            <UserGridItemWrapper user={authUser} title="You" />
          </Grid>

          {reportsLoading ? (
            <UserLoadingCircle />
          ) : (
            !!reportsData?.length && (
              <Box mt={1}>
                <UserTypography title="Your Direct Reports" />
                <Grid container className={classes.userTeamContainer}>
                  {reportsData?.map((user, id) => (
                    <UserGridItemWrapper key={id} user={user} />
                  ))}
                </Grid>
              </Box>
            )
          )}
        </Box>
      </PaperCardWrapper>
    </Box>
  );
};

export default memo(UserTeam);
