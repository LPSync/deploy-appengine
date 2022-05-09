import BreadcrumbHomeBox from "../../../components/breadcrumbs/BreadcrumbHomeBox";
import BreadcrumbText from "../../../components/breadcrumbs/BreadcrumbText";
import {Box, Button, makeStyles} from "@material-ui/core";
import PageTitleBox from "../../../components/blocks/PageTitleBox";
import Page from "../../../components/Page";
import React from "react";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
  page: {
    flex: "1 1 auto",
    height: "100%",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  root: {
    backgroundColor: "#000",
    color: "#fff",
  },
  pageNav: {
    display: "flex",
    justifyContent: "space-between",
  },
  pageNavButton: {
    marginRight: 18,
  },
});

const PageComponent = ({title, children, breadcrumbs, backButtonLink}) => {
  const classes = useStyles();
  return (
    <Page title={title} className={classes.page}>
      <BreadcrumbHomeBox>
        {breadcrumbs.map((item, index) => (
          <BreadcrumbText key={index} title={item} />
        ))}
      </BreadcrumbHomeBox>

      <Box mx={3} className={classes.pageNav}>
        <PageTitleBox title={title} className={classes.headerBox} />
        {backButtonLink && (
          <NavLink to={backButtonLink} className={classes.pageNavButton}>
            <Button style={{width: 100}} variant="outlined">
              BACK
            </Button>
          </NavLink>
        )}
      </Box>
      {children}
    </Page>
  );
};

export default PageComponent;
