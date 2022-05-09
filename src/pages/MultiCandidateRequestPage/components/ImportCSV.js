import React, {memo, useRef} from "react";
import {Box, Button, Grid, makeStyles, TextField} from "@material-ui/core";
import RequestFormTypography from "../../../components/typographies/RequestFormTypography";
import {connect} from "react-redux";
import {
  setCSVData,
  setCSVFileError,
  setDefaultState
} from "../../../data/redux/multiCandidateRequest/multiCandidateRequestActions";
import {CSVReader} from "react-papaparse";
import {CSVFields} from "./TableOptions";

const useStyles = makeStyles(() => ({
  input: {
    overflowY: "auto"
  }
}));

const convertArrayToObject = (array, keys, itemNumber) => {
  const initialValue = {id: itemNumber + 1};
  return array?.reduce((obj, item, index) => {
    return {...obj, [keys[index]]: item?.trim()?.replace(/\s+/g, " ")};
  }, initialValue);
};

const ImportCSV = ({csvFileError, setCSVFileError, setCSVData, setDefaultState}) => {
  const buttonRef = useRef(null);
  const classes = useStyles();

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    setDefaultState();
    const parsedData = data?.slice(1)?.map(({data}, index) => convertArrayToObject(data, CSVFields, index));

    setCSVData(parsedData);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    setCSVFileError(err);
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    setDefaultState();
  };

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="* Select CSV to import" />
      </Grid>
      <Grid item xs={8}>
        <Box style={{display: "flex"}}>
          <CSVReader
            ref={buttonRef}
            onFileLoad={handleOnFileLoad}
            onError={handleOnError}
            noClick
            noDrag
            onRemoveFile={handleOnRemoveFile}
          >
            {({file}) => (
              <aside style={{display: "flex", flexDirection: "row"}}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{marginRight: "1em"}}
                  onClick={handleOpenDialog}
                >
                  Select
                </Button>
                <TextField
                  id="requisition-type"
                  error={!!csvFileError}
                  style={{width: "60ch", marginRight: "1em"}}
                  value={file && file.name || ""}
                  InputProps={{classes: {input: classes.input}}}
                  disabled
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{marginRight: "1em"}}
                  onClick={handleRemoveFile}
                  disabled={!file}
                >
                  Remove
                </Button>
              </aside>
            )}
          </CSVReader>
        </Box>
      </Grid>
    </Grid>
  );
};

export default connect(
  (state) => ({
    csvFileError: state.multiCandidateRequest.get("csvFileError")
  }),
  {setCSVData, setCSVFileError, setDefaultState}
)(memo(ImportCSV));
