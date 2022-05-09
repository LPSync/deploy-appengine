import React, {memo} from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import HtmlTooltip from "../../components/tooltips/HtmlTooltips";

const useStyles = makeStyles((theme) => ({
  info: {
    display: "flex",
    alignItems: "center",
  },
  number: {
    borderRadius: "50%",
    width: "34px",
    height: "34px",
    border: "2px solid" + theme.palette.text.primary,
    textAlign: "center",
    marginRight: "1rem",
    lineHeight: "28px",
    fontWeight: 600,
  },
  text: {
    fontSize: "1.15rem",
  },
  spanText: {
    "&:hover": {
      color: theme.palette.secondary.main,
      cursor: "help",
    },
  },
}));

const RequestInfoBoxItem = ({number, label, question, description}) => {
  const classes = useStyles();

  return (
    <Box my={1} className={classes.info}>
      <div className={classes.number}>{number}</div>

      <Typography className={classes.text}>
        {label}
        {" - "}

        <HtmlTooltip
          placement="right"
          title={<Typography color="inherit">{description}</Typography>}
        >
          <span className={classes.spanText}>
            <u>{question}</u>
          </span>
        </HtmlTooltip>
      </Typography>
    </Box>
  );
};

export default memo(RequestInfoBoxItem);
