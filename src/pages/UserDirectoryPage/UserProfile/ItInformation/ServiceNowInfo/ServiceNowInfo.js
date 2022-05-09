import React, {memo, useEffect} from "react";
import {useLazyQuery} from "@apollo/client";
import {Box, makeStyles, Typography} from "@material-ui/core";
import {GET_SERVICE_NOW_USER_GROUPS} from "../../../../../operations/queries/getServiceNowUserGroups";
import handleError from "../../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import ServiceNowTable from "./ServiceNowTable";

const useStyles = makeStyles(() => ({
  box: {width: "100%"},
  heading: {
    fontWeight: "bold",
  },
}));

const ServiceNowInfo = ({userData}) => {
  const classes = useStyles();
  const history = useHistory();

  const [executeSearch, {data}] = useLazyQuery(GET_SERVICE_NOW_USER_GROUPS, {
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (userData) {
      const searchData = userData?.profile?.email;
      executeSearch({
        variables: {search: searchData},
      });
    }
  }, [userData, executeSearch]);

  const groupsMembership =
    data?.get_service_now_user_groups?.groupsMembership || [];
  const groupsManage = data?.get_service_now_user_groups?.groupsManage || [];

  if (!groupsMembership.length && !groupsManage.length)
    return (
      <Box className={classes.box}>
        <Box ml={3}>
          <Typography component={"div"}>No Teams</Typography>
        </Box>
      </Box>
    );

  return (
    <Box className={classes.box}>
      {!!groupsManage.length && (
        <ServiceNowTable
          total={groupsManage.length}
          title={"Teams Managed"}
          titles={[
            "Team Name",
            "Parent Team",
            "Manager",
            "Unit Leader",
            "Created",
          ]}
          columns={groupsManage.map((g) => [
            g.name,
            g.parentGroup,
            g.manager,
            g.unitLeader,
            g.createdOn,
          ])}
        />
      )}
      {!!groupsMembership.length && (
        <ServiceNowTable
          total={groupsMembership.length}
          title={"Team Memberships"}
          titles={["Team Name", "Member Since"]}
          columns={groupsMembership.map((g) => [g.name, g.createdOn])}
        />
      )}
    </Box>
  );
};

export default connect(
  (state) => ({userData: state.userDirectory.get("userData")}),
  {}
)(memo(ServiceNowInfo));
