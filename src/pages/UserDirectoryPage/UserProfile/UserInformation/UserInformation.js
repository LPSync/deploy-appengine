import React, { useState, useContext, memo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UserOrgInfo from "./UserOrgInfo";
import UserDirectReportsList from "./UserDirectReportsList";
import {AuthUserContext} from "../../../../AuthUserContextProvider";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
  },
  rootPanel: {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const UserInformation = () => {
  const classes = useStyles();
  const userData = useSelector(state => state?.userDirectory.get("userData"));
  const {permUserDirectoryOrgDetailsView} = useContext(AuthUserContext);
  const [userInfoExpanded, setUserInfoExpanded] = useState("userPanel1");

  const handleUserInfoAccordionChange = (panel) => (event, isExpanded) => {
    setUserInfoExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={userInfoExpanded === "userPanel1"}
        onChange={handleUserInfoAccordionChange("userPanel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          classes={{
            root: classes.rootPanel,
          }}
        >
          <Typography component={"div"} className={classes.heading}>
            Organization Info
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{userData && <UserOrgInfo />}</AccordionDetails>
      </Accordion>
      {permUserDirectoryOrgDetailsView && (
        <UserDirectReportsList
          userInfoExpanded={userInfoExpanded}
          handleUserInfoAccordionChange={handleUserInfoAccordionChange}
        />
      )}
    </>
  );
};

export default memo(UserInformation);
