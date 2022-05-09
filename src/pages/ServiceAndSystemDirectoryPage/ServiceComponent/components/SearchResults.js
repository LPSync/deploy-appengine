import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import SelectCircularProgress from "../../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  resultsBox: {
    position: "absolute",
    zIndex: 2,
    width: "60ch",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "20rem",
    overflow: "auto",
  },
}));

const SearchResults = ({resultsOpen, isResultsLoading, data, onClick}) => {
  const classes = useStyles();

  return (
    <Collapse in={resultsOpen} timeout="auto" unmountOnExit>
      <Box className={classes.resultsBox}>
        <Paper>
          {isResultsLoading && <SelectCircularProgress />}
          {data && (
            <>
              {data?.length === 0 ? (
                <Box m={1}>
                  <NoResultsTypography />
                </Box>
              ) : (
                <List>
                  {data?.map((service) => (
                    <React.Fragment key={service.id}>
                      <ListItem
                        key={service.id}
                        button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onClick(service.id)}
                      >
                        <ListItemText
                          primary={
                            <>
                              <Typography component={"div"} variant="subtitle1">
                                {service.name}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {data?.length > 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </>
          )}
        </Paper>
      </Box>
    </Collapse>
  );
};

export default SearchResults;
