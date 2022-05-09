import React, {memo} from "react";
import {CircularProgress, makeStyles} from "@material-ui/core";
import InfiniteScroll from "./InfinityScroll";

const useStyles = makeStyles(() => ({
  scrollLoader: {
    overflow: "unset"
  },
  infinityScrollLoader: {
    width: "100px",
    height: "100px",
    margin: "auto",
    padding: "50px",
  }
}))

const CustomInfiniteScroll = ({children, ...props}) => {
  const classes = useStyles();

  return (
    <InfiniteScroll
      className={classes.scrollLoader}
      loader={
        <div className={classes.infinityScrollLoader}>
          <CircularProgress color="secondary"/>
        </div>
      }
      {...props}
    >
      {children}
    </InfiniteScroll>
  );
};

export default memo(CustomInfiniteScroll);