import {
  Box,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import TabPanelItem from "./components/TabPanelItem";
import {Tooltip} from "@mui/material";
import {useLazyQuery} from "@apollo/client";
import {GET_GROUP_MEMBERS} from "../../../operations/queries/getGroupMembers";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import MembersList from "./components/MembersList";

const useStyles = makeStyles((theme) => ({
  row: {display: "flex", marginBottom: 10},
  column: {display: "flex", flexDirection: "column"},
  top: {display: "flex", justifyContent: "space-between"},
  icon: {marginRight: 10},
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const People = ({data, loading}) => {
  const classes = useStyles();
  const [groupMembers, setGroupMembers] = useState(null);

  const [getGroupMembers, {loading: loadingGroupMembers}] = useLazyQuery(
    GET_GROUP_MEMBERS,
    {
      onCompleted: (data) => setGroupMembers(data.get_group_members),
      onError: (error) => console.log(error),
    }
  );

  const getGroupMembersHandler = () => {
    if (!groupMembers)
      getGroupMembers({
        variables: {
          group: data.team,
        },
      });
  };

  const getUsername = (email) => {
    if (email) {
      if (email.includes("@")) {
        const username = email.split("@")[0];
        return username;
      }
    }
    return null;
  };

  if (loading)
    return (
      <Box className={classes.loader}>
        <CircularProgress color="secondary" />
      </Box>
    );
  return (
    data && (
      <Box>
        <Typography variant={"subtitle1"}>
          <Box className={classes.top}>
            <Typography>People Associated with this Service</Typography>
            <Button disabled={true} variant="contained">
              Update
            </Button>
          </Box>

          <TabPanelItem
            title={"Team"}
            tooltip={"The team Responsible for this service."}
            contentType={"component"}
            content={
              <MembersList
                loading={loadingGroupMembers}
                openHandler={getGroupMembersHandler}
                title={data.team}
                groupMembers={groupMembers}
              />
            }
          />

          <TabPanelItem
            title={"Service Owner"}
            tooltip={"Who is responsible for this service."}
            content={data.owner?.name}
            link={getUsername(data.owner?.email)}
          />
          <TabPanelItem
            title={"Director"}
            tooltip={"Who is responsible for this service."}
            content={data.director?.name}
            link={getUsername(data.director?.email)}
          />
          <TabPanelItem
            title={"Manager"}
            tooltip={"Who is responsible for this service."}
            content={data.manager?.name}
            link={getUsername(data.manager?.email)}
          />
          <TabPanelItem
            title={"Change Approver"}
            tooltip={"Who is responsible for this service."}
            content={data.changeApprover?.name}
            link={getUsername(data.changeApprover?.email)}
          />
          <TabPanelItem
            title={"Change Approver Backup"}
            tooltip={"Who is responsible for this service."}
            content={data.changeApproverBackup?.name}
            link={getUsername(data.changeApproverBackup?.email)}
          />
          <TabPanelItem
            title={"QA Lead"}
            tooltip={"Who is responsible for this service."}
            content={data.qaLead?.name}
            link={getUsername(data.qaLead?.email)}
          />
        </Typography>
      </Box>
    )
  );
};
export default People;
