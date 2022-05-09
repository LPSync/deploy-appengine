import React, {memo} from "react";
import {Box, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {DebounceInput} from "react-debounce-input";
import ManagementTextField from "./ManagementTextField";

const useStyles = makeStyles((theme) => ({
  usersTitleBox: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const PermissionFilterSearchBox = ({title, permissionQuery, setPermissionQuery}) => {
  const classes = useStyles();
  return (
    <Box className={classes.usersTitleBox}>
      <Toolbar>
        <Box>
          <Typography>{title}</Typography>
        </Box>
        <Box flexGrow={1} />
        <Box>
          <DebounceInput
            id={`${title}-search-debounce`}
            label={`Search ${title}`}
            value={permissionQuery}
            required={false}
            debounceTimeout={500}
            onChange={(e) => setPermissionQuery(e.target.value)}
            element={ManagementTextField}
          />
        </Box>
      </Toolbar>
    </Box>
  )
}

export default memo(PermissionFilterSearchBox);