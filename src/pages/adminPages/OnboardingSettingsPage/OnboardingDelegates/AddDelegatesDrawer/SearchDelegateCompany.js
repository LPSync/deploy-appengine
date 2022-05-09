import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
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
import CustomTextField from "../../../../../components/inputs/CustomTextField";
import SelectCircularProgress from "../../../../../components/circularProgress/SelectCircularProgress";
import NoResultsTypography from "../../../../../components/typographies/NoResultsTypography";
import { SEARCH_CONCUR_VENDORS } from "../../../../../operations/queries/searchConcurVendors";
import handleError from "../../../../../data/handleError";

const useStyles = makeStyles((theme) => ({}));

const SearchDelegateCompany = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { delegates, setDelegates, delegateUser } = props;
  const [isVendorSearchLoading, setIsVendorSearchLoading] = useState(false);
  const [searchVendorsQuery, setSearchVendorsQuery] = useState("");
  const [isVendorResultsOpen, setIsVendorResultsOpen] = useState(false);
  const [vendorData, setVendorData] = useState();

  const [executeVendorsSearch] = useLazyQuery(SEARCH_CONCUR_VENDORS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setVendorData(data.search_concur_vendors);
      setIsVendorSearchLoading(false);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (searchVendorsQuery?.length > 0) {
      executeVendorsSearch({ variables: { search: searchVendorsQuery } });
      setIsVendorResultsOpen(true);
    } else {
      setIsVendorResultsOpen(false);
      setVendorData([]);
      setIsVendorSearchLoading(false);
    }
  }, [searchVendorsQuery, executeVendorsSearch]);

  const searchVendorOnChange = (query) => {
    setIsVendorSearchLoading(true);
    setSearchVendorsQuery(query);
  };

  const handleVendorClick = (company) => {
    setDelegates([...delegates, { delegateCompany: company }]);
    setIsVendorResultsOpen(false);
    setSearchVendorsQuery("");
  };

  return (
    <div>
      <Box m={2}>
        <Box>
          <Typography>Search for a Company to Add</Typography>
          <CustomTextField
            required
            id="standard-basic"
            label="Search"
            variant="standard"
            size="small"
            autoComplete="off"
            value={searchVendorsQuery}
            onValueChange={searchVendorOnChange}
          />
        </Box>
        {searchVendorsQuery?.length > 0 && (
          <Collapse in={isVendorResultsOpen} timeout="auto" unmountOnExit>
            <Box className={classes.resultsBox}>
              <Paper>
                {isVendorSearchLoading ? (
                  <SelectCircularProgress />
                ) : vendorData?.length > 0 ? (
                  <List>
                    {vendorData?.map((vendor) => (
                      <React.Fragment key={vendor.id}>
                        <ListItem
                          key={vendor.id}
                          button
                          onClick={() => handleVendorClick(vendor.companyName)}
                        >
                          <ListItemText
                            primary={
                              <Typography component={"div"} variant="subtitle1">
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
    </div>
  );
};

export default SearchDelegateCompany;
