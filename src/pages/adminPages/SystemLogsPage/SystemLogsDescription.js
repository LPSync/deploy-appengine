import React, {memo, useRef} from "react";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  logDescription: {
    textAlign: "left",
    display: "box",
    lineClamp: 2,
    boxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  // tooltip: {
  //   maxWidth: props => props?.maxwidth,
  //   maxHeight: "90vh",
  // }
}));

const SystemLogsDescription = ({logDescription}) => {
  const textElementRef = useRef();
  // const [x, setX] = useState(300);
  // useEffect(() => {
  //   setX(textElementRef?.current?.scrollWidth);
  // }, [textElementRef]);

  const classes = useStyles(
    // {maxwidth: x}
  );

  return (
    // <Tooltip
    //   title={logDescription}
    //   classes={{ tooltip: classes.tooltip }}
    // >
    <Typography
      ref={textElementRef}
      component={"div"}
      variant={"subtitle2"}
      className={classes.logDescription}
    >
      {logDescription}{" "}
    </Typography>
    // </Tooltip>
  );
};

export default memo(SystemLogsDescription);