import React, {useCallback, useEffect, useRef} from "react";
import {useMutation} from "@apollo/client";
import {useOktaAuth} from "@okta/okta-react";
import * as OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import "./OktaSignInWidgetStyles.css";
import {CREATE_LOG_ENTRY} from "../../operations/mutations/createLogEntry";
import config from "../../config";
const publicIp = require("public-ip");

const OktaSignInWidget = () => {
  const {oktaAuth} = useOktaAuth();
  const widgetRef = useRef();

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = useCallback(
    (info, description) => {
      createLogEntry({
        variables: {
          input: {
            logType: "Authentication",
            logNotification: info,
            logDescription: description,
          },
        },
      });
    },
    [createLogEntry]
  );

  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    const {issuer, clientId, redirectUri, scopes} = config.oidc;
    const widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: issuer,
      clientId,
      redirectUri,
      logo: "https://storage.googleapis.com/lpsync/orange_lp_logo_300.png",
      i18n: {
        en: {
          "primaryauth.title": "Sign in to LPSYNC",
        },
      },
      authParams: {
        // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
        issuer,
        scopes,
      },
    });

    // Check for an existing authClient transaction
    widget.authClient.session.exists().then(async (exists) => {
      if (exists) {
        // oktaAuth.signInWithRedirect();
        widget.authClient.session.get().then((res) => {
          if (res.status === "ACTIVE") {
            widget.authClient.token
              .getWithoutPrompt({
                responseType: "id_token", // or array of types
                sessionToken: "testSessionToken", // optional if the user has an existing Okta session
              })
              .then(async (res) => {
                var tokens = res.tokens;

                // Do something with tokens, such as
                widget.authClient.tokenManager.setTokens(tokens);
                await oktaAuth.handleLoginRedirect(tokens);
              })
              .catch((error) => console.error(error));

            return;
          }
        });

        widget.authClient.authStateManager.subscribe(async (authState) => {
          if (authState.isAuthenticated) {
            const ipAddress = await publicIp.v4();
            createLog(
              "info",
              `User Authenticated >> infoMsg: Success. ipAddress: ${ipAddress}`
            );
          }
        });
      } else {
        widget
          .showSignInToGetTokens({
            el: widgetRef.current,
            scopes,
          })
          .then(async (tokens) => {
            // Add tokens to storage

            await oktaAuth.handleLoginRedirect(tokens);
          })
          .catch((err) => {
            oktaAuth.getUser().then(() => {
              createLog("alert", `errorMsg: ${err}`);
            });
            throw err;
          });

        widget.authClient.authStateManager.subscribe(async (authState) => {
          if (authState.isAuthenticated) {
            const ipAddress = await publicIp.v4();
            createLog(
              "info",
              `User Authenticated >> infoMsg: Success. ipAddress: ${ipAddress}`
            );
          }
        });
      }
    });

    return () => widget.remove();
  }, [oktaAuth, createLog]);

  return (
    <div>
      <div ref={widgetRef} />
    </div>
  );
};

export default OktaSignInWidget;
