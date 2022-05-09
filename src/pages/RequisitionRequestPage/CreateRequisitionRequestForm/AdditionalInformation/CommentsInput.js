import React, {useContext} from "react";
import {Box, makeStyles, TextField, Typography} from "@material-ui/core";
import {RequisitionRequestContext} from "../../RequisitionRequestContextProvider";

const useStyles = makeStyles(() => ({
  textField: {
    width: "100%",
  },
}));

const CommentsInput = () => {
  const classes = useStyles();
  const {comments, setComments, commentsError, setCommentsError} = useContext(
    RequisitionRequestContext
  );

  const handleChange = (e) => {
    setComments(e.target.value);
    setCommentsError(false);
  };

  return (
    <Box>
      <Typography component={"div"}>
        Please provide the business reason for this request and ensure your
        Finance Partner is aligned.
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          color={"secondary"}
          id="comments"
          label="comments"
          multiline
          minRows={2}
          maxRows={4}
          error={commentsError}
          className={classes.textField}
          value={comments}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};

export default CommentsInput;
