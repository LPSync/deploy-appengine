import React, {memo, useState} from "react";
import UserImg from "../../../../components/UserImg";
import {Button, makeStyles, Popover, Typography} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles((theme) => ({
  imgDiv: {
    height: "6rem",
  },
  img: {
    width: "6rem",
    borderRadius: "10%",
    boxShadow: "0px 10px 25px 0px rgba(0, 0, 0, 0.3)",
  },
  typography: {
    padding: theme.spacing(2),
  },
  icon: {
    fontSize: "1.15rem",
  },
  link: {
    color: "white",
    textDecoration: "underline",
  },
}));

const UserImgPopover = ({email}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const preventDefault = (event) => event.preventDefault();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <UserImg
          email={email}
          imgClass={classes.img}
          imgDivClass={classes.imgDiv}
        />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          If you want to change your photo, <br />
          go to{" "}
          <a
            target="_blank"
            rel="noopener"
            href="https://myaccount.google.com/personal-info"
            aria-label="myaccount.google.com/personal-info"
            className={classes.link}
          >
            accounts.google.com <OpenInNewIcon className={classes.icon} />
          </a>
        </Typography>
      </Popover>
    </div>
  );
};

export default memo(UserImgPopover);
