import React, {useState} from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DevicesIcon from "@material-ui/icons/Devices";
import UserOktaInfo from "./UserOktaInfo";
import UserGoogleInfo from "./UserGoogleInfo";
import DevicesInfo from "./DevicesInfo";
import ServiceNowInfo from "./ServiceNowInfo";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
    display: "flex",
  },
  rootPanel: {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  iconContainer: {
    width: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(2),
  },
  iconFA: {
    fontSize: 24,
  },
  iconMUI: {
    fontSize: 28,
  },
}));

const ItInformation = () => {
  const classes = useStyles();
  const [itInfoExpanded, setItInfoExpanded] = useState("itPanel1");

  const handleItInfoAccordionChange = (panel) => (event, isExpanded) => {
    setItInfoExpanded(isExpanded ? panel : false);
  };

  return (
    <Box mb={4}>
      <Accordion
        expanded={itInfoExpanded === "itPanel1"}
        onChange={handleItInfoAccordionChange("itPanel1")}
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
            <div className={classes.iconContainer}>
              <FontAwesomeIcon icon="dot-circle" className={classes.iconFA} />
            </div>
            Okta Directory
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserOktaInfo />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={itInfoExpanded === "itPanel2"}
        onChange={handleItInfoAccordionChange("itPanel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          classes={{
            root: classes.rootPanel,
          }}
        >
          <Typography component={"div"} className={classes.heading}>
            <div className={classes.iconContainer}>
              <FontAwesomeIcon
                icon={["fab", "google"]}
                className={classes.iconFA}
              />
            </div>
            Google Workspace
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserGoogleInfo />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={itInfoExpanded === "itPanel3"}
        onChange={handleItInfoAccordionChange("itPanel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          classes={{
            root: classes.rootPanel,
          }}
        >
          <div className={classes.iconContainer}>
            <AccountCircleIcon fontSize="medium" className={classes.iconMUI} />
          </div>
          <Typography component={"div"} className={classes.heading}>
            ServiceNow
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ServiceNowInfo />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={itInfoExpanded === "itPanel4"}
        onChange={handleItInfoAccordionChange("itPanel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          classes={{
            root: classes.rootPanel,
          }}
        >
          <div className={classes.iconContainer}>
            <DevicesIcon fontSize="medium" className={classes.iconMUI} />
          </div>
          <Typography component={"div"} className={classes.heading}>
            Devices
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DevicesInfo />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ItInformation;
