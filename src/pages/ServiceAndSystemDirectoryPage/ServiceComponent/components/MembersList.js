import {Box, CircularProgress, Typography, makeStyles} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import FrontendRoutes from "../../../../data/constants/FrontendRoutes";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";
import {Tooltip} from "@mui/material";
import React from "react";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "inherit",
    "&:hover": {
      color: theme.palette.warning.main,
    },
  },
  groupList: {
    maxHeight: 290,
    overflowY: "auto",
    overflowX: "hidden",
  },
}));

const MembersList = ({loading, openHandler, groupMembers, title}) => {
  const classes = useStyles();

  if (!title) return <NoResultsTypography variant={"subtitle1"} />;

  return (
    <Tooltip
      arrow
      onOpen={openHandler}
      title={
        <Box className={classes.groupList}>
          {loading ? (
            <CircularProgress color={"inherit"} size={24} />
          ) : groupMembers?.length ? (
            groupMembers?.map((member, index) => (
              <Box key={index}>
                <NavLink
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.link}
                  to={FrontendRoutes.USER_DIRECTORY_PROFILE(member.userName)}
                >
                  <Typography
                    variant={"subtitle1"}
                  >{`${member.firstName} ${member.lastName}`}</Typography>
                </NavLink>
              </Box>
            ))
          ) : (
            <NoResultsTypography variant={"subtitle1"} />
          )}
        </Box>
      }
    >
      <div style={{display: "inline-block"}}>{title}</div>
    </Tooltip>
  );
};
export default MembersList;
