import React, {memo, useContext, useEffect} from "react";
import {Box, Button, makeStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Page from "../../../components/Page";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import NoPermissionsError from "../../../components/NoPermissionsError";
import {AuthUserContext} from "../../../AuthUserContextProvider";
import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import ThirdPartySearchResults from "./ThirdPartySearchResults";
import ThirdPartyDirectoryInfo from "./ThirdPartyDirectoryInfo";
import {connect} from "react-redux";
import ThirdPartySearchBlock from "./ThirdPartySearchBlock";
import {useLocation} from "react-router-dom";
import {setSearchQuery} from "../../../data/redux/thirdParty/thirdPartyActions";
import PageTitleBox from "../../../components/blocks/PageTitleBox";

const useStyles = makeStyles({
  page: {
    flex: "1 1 auto",
    height: "100%"
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end"
  }
});

const ThirdPartyDirectoryPageContent = ({searchQuery, setSearchQuery}) => {
  const classes = useStyles();
  const {permThirdPartyDirectoryView} = useContext(AuthUserContext);
  const location = useLocation();
  useEffect(() => {
    setSearchQuery("")
  }, [location]);

  return (
    <Page title="Third Party Directory | LPSYNC" className={classes.page}>
      <BreadcrumbHomeBox>
        <BreadcrumbText title={"THIRD PARTY DIRECTORY"} />
      </BreadcrumbHomeBox>

      <Box mx={3}>
        <PageTitleBox title="Third Party Directory" className={classes.headerBox}>
          {permThirdPartyDirectoryView && (
            <Button variant="outlined" disabled>
              <AddIcon /> Request New Third Party
            </Button>
          )}
        </PageTitleBox>

        {permThirdPartyDirectoryView ? (
          <>
            <ThirdPartySearchBlock />

            {searchQuery?.length
              ? <ThirdPartySearchResults />
              : <ThirdPartyDirectoryInfo />
            }
          </>
        ) : (
          <NoPermissionsError />
        )}
      </Box>
    </Page>
  );
};

export default connect(state => ({
  searchQuery: state.thirdParty.get("searchQuery")
}), {setSearchQuery})
(memo(ThirdPartyDirectoryPageContent));
