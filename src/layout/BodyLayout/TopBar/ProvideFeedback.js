import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import {CREATE_FEEDBACK} from "../../../operations/mutations/createFeedback";
import {SEND_FEEDBACK_EMAIL} from "../../../operations/mutations/sendFeedbackEmail";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    fontSize: ".9rem",
  },
  heading: {
    fontSize: "1.15rem",
    fontWeight: 600,
  },
  dialog: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const ProvideFeedback = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [notesError, setNotesError] = useState(false);

  const [createFeedback] = useMutation(CREATE_FEEDBACK);

  const [sendFeedbackEmail] = useMutation(SEND_FEEDBACK_EMAIL);

  const runFeedbackEmail = () => {
    const mailDetails = `<table border='0' style='border: 0; width: 1%;' cellpadding='0' cellspacing='0'>
        <tbody>
        <tr>
        <td style='width: 100%; padding:0;'><img src='https://storage.googleapis.com/lpsync/email-lp-logo.png' width='252' height='54' /></td>
        </tr>
        <tr>
        <td style='width: 100%; padding:0;'>
        <h4 style='text-align: right;'>LPSync</h4>
        </td>
        </tr>
        </tbody>
        </table>
        
        <p>Hi Team, </p>
        <p>A feedback was submitted, please read below:</p>
        <p><strong>From:&nbsp;</strong>${name} - ${email}</p>
        <p><strong>Feedback:&nbsp;</strong> ${notes} </p>
        
        <p>This email has been sent automatically from LPSync. The address it has been sent from is not monitored. For further assistance contact <a href='mailto:itsupport@liveperson.com'>itsupport@liveperson.com</a>&nbsp;</p>
        `;

    sendFeedbackEmail({
      variables: {
        input: {
          body: mailDetails,
        },
      },
    });
  };

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setName("");
    setEmail("");
    setNotes("");
  };

  const handleNotes = (value) => {
    setNotes(value);
    setNotesError(false);
  };

  const handleDialogSubmit = () => {
    if (notes?.length === 0) {
      setNotesError(true);
    } else {
      createFeedback({
        variables: {
          input: {
            name: name,
            email: email,
            feedback: notes,
          },
        },
      });
      runFeedbackEmail();
      setName("");
      setEmail("");
      setNotes("");
      handleDialogClose();
    }
  };

  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };

  return (
    <>
      <MenuItem className={classes.menuItem} onClick={handleDialogClickOpen}>
        Provide Feedback
      </MenuItem>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="provide-feedback-title"
        onKeyDown={stopPropagationForTab}
      >
        <DialogTitle id="provide-feedback-title">Feedback Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We would love to hear your comments, suggestions, or problems with
            LPSync.
          </DialogContentText>
          <TextField
            onKeyDown={(e) => e.stopPropagation()}
            margin="dense"
            id="name"
            label="Name"
            helperText="optional"
            color="secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            onKeyDown={(e) => e.stopPropagation()}
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            helperText="optional"
            color="secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            required
            onKeyDown={(e) => e.stopPropagation()}
            error={notesError}
            id="feedback"
            label="Feedback"
            color="secondary"
            multiline
            minRows={4}
            maxRows={6}
            value={notes}
            onChange={(e) => handleNotes(e.target.value)}
            fullWidth
            variant="outlined"
          />{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleDialogSubmit}
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProvideFeedback;
