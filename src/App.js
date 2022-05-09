import React from "react";
import {Provider as ReduxProvider} from "react-redux";
import AuthorizedApolloProvider from "./AuthorizedApolloProvider";
import {makeStyles, MuiThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faCircle,
  faCommentDots,
  faDotCircle,
  faUserMinus,
  faUserPlus,
  faCogs,
  faThumbtack,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import theme from "./theme";
import BodyLayout from "./layout/BodyLayout";
import AuthUserContextProvider from "./AuthUserContextProvider";
import store from "./data/redux/store";
import GlobalStyles from "./components/GlobalStyles";
import {SnackbarProvider} from "notistack";

library.add(
  fab,
  faCircle,
  faCommentDots,
  faDotCircle,
  faUserMinus,
  faUserPlus,
  faThumbtack,
  faCogs,
  faIdCard,
);

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  },
}));

const AppContent = () => {
  const classes = useStyles();

  return (
    <ReduxProvider store={store}>
      <AuthorizedApolloProvider>
        <AuthUserContextProvider>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider
            // maxSnack={4}
            // preventDuplicate
            // anchorOrigin={{
            //   vertical: 'top',
            //   horizontal: 'right',
            // }}
            //TransitionComponent={Slide}
            >
              <div className={classes.root}>
                <CssBaseline />
                <GlobalStyles />
                <BodyLayout />
              </div>
            </SnackbarProvider>
          </MuiThemeProvider>
        </AuthUserContextProvider>
      </AuthorizedApolloProvider>
    </ReduxProvider>
  );
};

export default AppContent;
