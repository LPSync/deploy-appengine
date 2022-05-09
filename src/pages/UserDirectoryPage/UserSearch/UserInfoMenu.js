import React, { memo, useCallback, useState } from "react";
import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import { setOrgChartEmail } from "../../../data/redux/common/commonActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem",
  },
}));

const UserInfoMenu = ({ id, email, setOrgChartEmail }) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    event?.stopPropagation();
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleViewInOrg = (event) => {
    if (email) {
      setOrgChartEmail(email);
      history.push(FrontendRoutes.ORGANIZATION_CHART);
    }
    handleMenuClose();
    event?.stopPropagation();
  };

  const handleViewUserProfile = (event) => {
    if (email) {
      history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(email?.split("@")?.[0]));
    }
    handleMenuClose();
    event?.stopPropagation();
  };

  const copyEmailToClipboard = (event) => {
    if (email) {
      navigator.clipboard.writeText(email).then(function () {
        console.log("Async: Copying to clipboard was successful!");
      }, function (err) {
        console.error("Async: Could not copy text: ", err);
      });
    }
    handleMenuClose();
    event?.stopPropagation();
  };

  return (
    <>
      <IconButton onClick={handleMenuClick}><MoreVertIcon fontSize="medium" /></IconButton>
      <Menu
        id={`simple-menu-${id}`}
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewUserProfile}>
          <VisibilityIcon className={classes.icon} />
          View User Profile
        </MenuItem>
        <MenuItem onClick={copyEmailToClipboard}>
          <DraftsOutlinedIcon className={classes.icon} />
          Copy E-mail Address
        </MenuItem>
        <MenuItem onClick={handleViewInOrg}>
          <AccountTreeIcon className={classes.icon} />
          Show In Org Chart
        </MenuItem>
      </Menu>
    </>
  );
};

export default connect(() => ({}), { setOrgChartEmail })(memo(UserInfoMenu));