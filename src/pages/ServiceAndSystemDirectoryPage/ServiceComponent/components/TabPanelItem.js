import {Box, Tooltip, makeStyles} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import React from "react";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";
import {NavLink} from "react-router-dom";
import FrontendRoutes from "../../../../data/constants/FrontendRoutes";

const useStyles = makeStyles({
  container: {display: "flex", marginBottom: 10},
  content: {flex: "1 1 20%", display: "flex", alignItems: "flex-start"},
  tooltip: {marginRight: 10},
  icon: {width: "0.8em", height: "0.8em", marginRight: 10},
  leftContent: {flex: "1 1 80%", paddingLeft: 15},
  link: {color: "inherit", textDecoration: "underline"},
  row: {display: "flex", alignItems: "center"},
});

const TabPanelItem = ({tooltip, title, content, contentType, link}) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.row}>
          <Tooltip title={tooltip} className={classes.tooltip}>
            <InfoIcon className={classes.icon} />
          </Tooltip>
          {title}
        </Box>
      </Box>
      <Box className={classes.leftContent}>
        {content ? (
          contentType === "component" ? (
            content
          ) : (
            <NavLink
              to={link ? FrontendRoutes.USER_DIRECTORY_PROFILE(link) : null}
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              {content}
            </NavLink>
          )
        ) : (
          <NoResultsTypography variant="subtitle1" />
        )}
      </Box>
    </Box>
  );
};
export default TabPanelItem;
