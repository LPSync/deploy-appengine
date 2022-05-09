import React, {memo, useMemo} from "react";
import {Box, Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  countContainer: {width: "100%", display: "flex", flexDirection: "row"},
  countBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  line: {
    borderRight: "2px solid #87889c",
    marginRight: theme.spacing(2),
  },
  countNum: {
    fontSize: "1.7rem",
  },
  countNumTitle: {
    fontSize: ".8rem",
  },
}));

const countBoxItems = (allTasks) => [
  {id: "pending", name: "Pending Approval", value: allTasks?.pendingApproval},
  {id: "scheduled", name: "Scheduled", value: allTasks?.scheduled},
  {id: "inProgress", name: " In Progress", value: allTasks?.inProgress},
];

const CountBox = (props) => {
  const {data} = props;
  const classes = useStyles();

  const boxItems = useMemo(() => data && countBoxItems(data), [data]);

  return (
    <>
      {data && (
        <Box className={classes.countContainer}>
          {boxItems?.map((item, id) => (
            <React.Fragment key={item.id}>
              <Box className={classes.countBox}>
                <Typography component={"div"} className={classes.countNum}>
                  {item.value}
                </Typography>
                <Typography component={"div"} className={classes.countNumTitle}>
                  {item.name}
                </Typography>
              </Box>
              {id + 1 < boxItems.length && <Box className={classes.line} />}
            </React.Fragment>
          ))}
        </Box>
      )}
    </>
  );
};

export default memo(CountBox);
