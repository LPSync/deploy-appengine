import React, {memo} from "react";
import {useHistory} from "react-router-dom";
import {Link, makeStyles} from "@material-ui/core";
import FrontendRoutes from "../data/constants/FrontendRoutes";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.secondary.main,
      cursor: "pointer",
    },
  },
  defaultLink: {
    color: theme.palette.text.primary,
  },
}));

const UserProfileLink = ({name, username}) => {
  const classes = useStyles();
  const history = useHistory();
  const isRob = username === "rob";
  const linkClass = isRob ? classes.defaultLink : classes.link;
  return (
    <Link
      color="inherit"
      underline={isRob ? "none" : "always"}
      onClick={() => !isRob &&
        history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(username))
      }
      className={linkClass}
    >
      {name}
    </Link>
  );
};

export default memo(UserProfileLink);
