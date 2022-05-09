// import React, { useEffect, useRef } from "react";
// import { useMutation } from "@apollo/client";
// import { useOktaAuth } from "@okta/okta-react";
// import * as OktaSignIn from "@okta/okta-signin-widget";
// import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
// import "./OktaSignInWidgetStyles.css";
// import { CREATE_LOG_ENTRY } from "../../operations/adminMutations/createLogEntry";
// import { ADD_PERMISSION_USER } from "../../operations/adminMutations/addPermissionUser";
// import config from "../../config";
// const publicIp = require("public-ip");
//
// const AdminOktaSignInWidget = () => {
//   const { oktaAuth } = useOktaAuth();
//   const widgetRef = useRef();
//
//   useEffect(() => {
//     if (!widgetRef.current) {
//       return false;
//     }
//
//     const { issuer, clientId, redirectUri, scopes } = config.oidc;
//     const widget = new OktaSignIn({
//       /**
//        * Note: when using the Sign-In Widget for an OIDC flow, it still
//        * needs to be configured with the base URL for your Okta Org. Here
//        * we derive it from the given issuer for convenience.
//        */
//       baseUrl: issuer,
//       clientId,
//       redirectUri,
//       logo: "https://storage.googleapis.com/lpsync/orange_lp_logo_300.png",
//       i18n: {
//         en: {
//           "primaryauth.title": "Sign in to LPSYNC",
//         },
//       },
//       authParams: {
//         // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
//         issuer,
//         scopes,
//       },
//     });
//
//     // Check for an existing authClient transaction
//     widget.authClient.session.exists().then(async (exists) => {
//       if (exists) {
//         // oktaAuth.signInWithRedirect();
//         widget.authClient.session.get().then((res) => {
//           if (res.status === "ACTIVE") {
//             widget.authClient.token
//               .getWithoutPrompt({
//                 responseType: "id_token", // or array of types
//                 sessionToken: "testSessionToken", // optional if the user has an existing Okta session
//               })
//               .then(async (res) => {
//                 var tokens = res.tokens;
//
//                 // Do something with tokens, such as
//                 widget.authClient.tokenManager.setTokens(tokens);
//                 oktaAuth.handleLoginRedirect(tokens);
//
//                 const ipAddress = await publicIp.v4();
//
//                 createLog(
//                   "info",
//                   `User Authenticated >> infoMsg: Success. ipAddress: ${ipAddress}`
//                 );
//
//                 addPermissionUser();
//               })
//               .catch((error) => console.error(error));
//             return;
//           }
//         });
//       } else {
//         widget
//           .showSignInToGetTokens({
//             el: widgetRef.current,
//             scopes,
//           })
//           .then(async (tokens) => {
//             // Add tokens to storage
//             const ipAddress = await publicIp.v4();
//             oktaAuth.handleLoginRedirect(tokens);
//             createLog(
//               "info",
//               `User Authenticated >> infoMsg: Success. ipAddress: ${ipAddress}`
//             );
//             addPermissionUser();
//           })
//           .catch((err) => {
//             oktaAuth.getUser().then((info) => {
//               const split = info.email.split("@");
//               const username = split[0];
//               createLog("alert", `errorMsg: ${err}`);
//             });
//             throw err;
//           });
//       }
//     });
//
//     return () => widget.remove();
//   }, [oktaAuth]);
//
//   const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);
//
//   const [addPermissionUser] = useMutation(ADD_PERMISSION_USER);
//
//   const createLog = (info, description) => {
//     createLogEntry({
//       variables: {
//         input: {
//           logType: "Authentication",
//           logNotification: info,
//           logDescription: description,
//         },
//       },
//     });
//   };
//
//   return (
//     <div>
//       <div ref={widgetRef} />
//     </div>
//   );
// };
//
// export default AdminOktaSignInWidget;
