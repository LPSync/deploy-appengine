import {Box, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {Group, MoreVert, Person, Settings, Warning} from "@material-ui/icons";
import {Tooltip, Typography} from "@material-ui/core";
import TaskStatusBlock from "../../../../components/taskManager/TaskStatusBlock";
import {useStyles} from "./SaSListItemStyles";
import FrontendRoutes from "../../../../data/constants/FrontendRoutes";
import SaSFlag from "../SaSFlag";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";

const SaSListItem = ({data, openModal, ...props}) => {
  const typographyVariant = "subtitle1";
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e?.stopPropagation();
    setAnchorEl(null);
  };

  const handleModalOpen = (e) => {
    e?.stopPropagation();
    handleClose();
    openModal(data.team);
  };

  const redirectToService = (e) => {
    e.stopPropagation();
    history.push(`${FrontendRoutes.SERVICE_AND_SYSTEM_DIRECTORY}/${data.id}`);
  };

  const redirectToOwner = (e) => {
    e.stopPropagation();
    history.push(
      FrontendRoutes.USER_DIRECTORY_PROFILE(data.owner.email.split("@")[0])
    );
  };

  return (
    <Box {...props} className={classes.container} onClick={redirectToService}>
      <div className={`${classes.settings} ${classes.flag}`}>
        <SaSFlag type={data?.flag} />
      </div>
      <div className={classes.item}>
        <NavLink to={"/"} className={classes.link}>
          <Tooltip title={data.name}>
            <Typography
              className={classes.itemText}
              variant={typographyVariant}
            >
              {data?.name}
            </Typography>
          </Tooltip>
        </NavLink>
      </div>
      <div className={`${classes.item} ${classes.itemCenter}`}>
        <TaskStatusBlock taskStatus={Number(data.tier)} id={data.tier} />
      </div>
      <div className={classes.item}>
        <Settings />
        <Tooltip title={`Service: ${data.type ? data.type : "No Type"}`}>
          <Typography variant={typographyVariant} className={classes.itemText}>
            {`Service: ${data.type ? data.type : "No Type"}`}
          </Typography>
        </Tooltip>
      </div>
      <div className={classes.item}>
        <Person />
        <Tooltip title={data.owner?.name}>
          <Typography variant={typographyVariant} className={classes.itemText}>
            {data.owner?.name || <NoResultsTypography variant={"inherit"} />}
          </Typography>
        </Tooltip>
      </div>
      <div className={classes.item}>
        <Group />
        <Tooltip title={data.team}>
          <Typography variant={typographyVariant} className={classes.itemText}>
            {data.team || <NoResultsTypography variant={"inherit"} />}
          </Typography>
        </Tooltip>
      </div>
      <div className={classes.settings}>
        <div
          color={"inherit"}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className={classes.settingsIcon}
        >
          <MoreVert />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={redirectToService}>
            <Settings className={classes.icon} />
            <Typography variant={typographyVariant}>
              View Service Profile
            </Typography>
          </MenuItem>
          {data.owner && (
            <MenuItem onClick={redirectToOwner}>
              <Person className={classes.icon} />
              <Typography variant={typographyVariant}>
                View Owner Profile
              </Typography>
            </MenuItem>
          )}
          {data.team && (
            <MenuItem onClick={handleModalOpen}>
              <Group className={classes.icon} />
              <Typography variant={typographyVariant}>
                View Team Members
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </div>
    </Box>
  );
};
export default React.memo(SaSListItem);
