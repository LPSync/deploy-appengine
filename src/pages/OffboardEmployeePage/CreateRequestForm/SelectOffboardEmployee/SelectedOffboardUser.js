import React, {memo} from "react";
import {Box, Button, Container, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  selectedContainer: {
    width: "60ch",
    marginLeft: 0,
    border: "1px solid " + theme.palette.warning.main,
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
}));

const SelectedOffboardUser = ({userProfile, clearSelectedOffboardUser}) => {
  const classes = useStyles();

  return (
    <>
      <Box mt={2}>
        <Box mb={1} mt={2}>
          Selected:
        </Box>
        <Container m={1} className={classes.selectedContainer}>
          {userProfile?.firstName} {userProfile?.lastName} |{" "}
          {userProfile?.location} | {userProfile?.jobTitle}
        </Container>
      </Box>
      <Box mt={1}>
        <Button
          size="small"
          variant="contained"
          onClick={clearSelectedOffboardUser}
        >
          Clear Selected
        </Button>
      </Box>
    </>
  );
};
export default memo(SelectedOffboardUser);
