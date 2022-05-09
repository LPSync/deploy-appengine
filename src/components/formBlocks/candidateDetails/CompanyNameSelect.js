import React, {memo, useCallback, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {SEARCH_CONCUR_VENDORS} from "../../../operations/queries/searchConcurVendors";
import SelectCircularProgress from "../../circularProgress/SelectCircularProgress";
import RequestFormLabel from "../../typographies/RequestFormTypography";
import CustomTextField from "../../inputs/CustomTextField";
import NoResultsTypography from "../../typographies/NoResultsTypography";
import useDebouncedChangeHandler from "../../../hooks/useDebouncedChangeHandler";

const useStyles = makeStyles((theme) => ({
  box: {position: "relative"},
  resultsBox: {
    position: "absolute",
    zIndex: 2,
    width: "60ch",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "20rem",
    overflow: "auto",
  },
  selectedContainer: {
    width: "80ch",
    marginLeft: 0,
    border: "1px solid " + theme.palette.warning.main,
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
}));

const CompanyNameSelect = ({
  selectedCompany,
  setSelectedCompany,
  selectedCompanyError,
  setSelectedCompanyError,
}) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const [vendorData, setVendorData] = useState();
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const [executeSearch] = useLazyQuery(SEARCH_CONCUR_VENDORS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setVendorData(data?.search_concur_vendors);
      setIsResultsLoading(false);
    },
  });

  useEffect(() => {
    if (searchQuery?.length > 0) {
      executeSearch({variables: {search: searchQuery}});
      setResultsOpen(true);
    } else if (searchQuery?.length === 0) {
      setResultsOpen(false);
      setVendorData("");
    }
  }, [executeSearch, searchQuery]);

  const handleClick = (selectedVendor) => {
    setSelectedCompany(selectedVendor);
    setSelectedCompanyError(false);
    setSearchQuery("");
  };

  const clearSelectedVendor = () => {
    setSelectedCompany("");
  };

  const searchOnChange = useCallback((query) => {
    setIsResultsLoading(true);
    setResultsOpen(true);
    setSearchQuery(query);
  }, []);

  const debouncedChangeHandler = useDebouncedChangeHandler(searchOnChange);
  useEffect(() => {debouncedChangeHandler(query)}, [query]);

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormLabel title="Search &amp; select company" />
      </Grid>
      <Grid item xs={8}>
        {!selectedCompany && (
          <Box my={2} className={classes.box}>
            <CustomTextField
              required
              id="standard-basic"
              label="Search"
              variant="standard"
              size="small"
              autoComplete="off"
              error={selectedCompanyError}
              value={query}
              onValueChange={setQuery}
            />

            {searchQuery?.length > 0 && (
              <Collapse in={resultsOpen} timeout="auto" unmountOnExit>
                <Box className={classes.resultsBox}>
                  <Paper>
                    {isResultsLoading ? (
                      <SelectCircularProgress />
                    ) : vendorData?.length > 0 ? (
                      <List>
                        {vendorData?.map((vendor) => (
                          <React.Fragment key={vendor.id}>
                            <ListItem
                              key={vendor.id}
                              button
                              onClick={() => handleClick(vendor.companyName)}
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    component={"div"}
                                    variant="subtitle1"
                                  >
                                    {vendor.companyName}
                                  </Typography>
                                }
                              />
                            </ListItem>
                            {vendorData?.length > 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Box m={1}>
                        <NoResultsTypography />
                      </Box>
                    )}
                  </Paper>
                </Box>
              </Collapse>
            )}
          </Box>
        )}
        {selectedCompany && (
          <>
            <Box mt={2}>
              <Box mb={1} mt={2}>
                Selected:
              </Box>
              <Container m={1} className={classes.selectedContainer}>
                {selectedCompany}
              </Container>
            </Box>
            <Box mt={1}>
              <Button
                size="small"
                variant="contained"
                onClick={clearSelectedVendor}
              >
                Clear Selected
              </Button>
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(CompanyNameSelect);
