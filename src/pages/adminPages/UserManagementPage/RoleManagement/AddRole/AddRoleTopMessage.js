import React, {memo} from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "100%",
    "& > * + *": {marginTop: theme.spacing(2)},
  },
}));

const AddRoleTopMessage = ({isComplete}) => {
  const classes = useStyles();
  return (
    <Box>
      {isComplete && (
        <Box className={classes.alert} my={1}>
          <Alert severity="success">New role added</Alert>
        </Box>
      )}

      <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
        Add Role
      </Box>
      <Typography component={"div"} variant="subtitle1">
        Enter role name, role description and select the permissions for the
        role.
      </Typography>
    </Box>
  )
};

export default memo(AddRoleTopMessage);