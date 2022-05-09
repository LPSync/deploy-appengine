import React, { memo } from "react";
import { Redirect } from "react-router-dom";

const LoginCallback = () => {
  // useEffect(() => {
  //   console.log("qwer")
  // }, []);
  return (
    <Redirect to={"/"}/>
  )
}

export default memo(LoginCallback);

// var OktaError = function OktaError(_ref) {
//   var error = _ref.error;
//   if (error.name && error.message) {
//     return /*#__PURE__*/React.createElement("p", null, error.name, ": ", error.message);
//   }
//
//   return /*#__PURE__*/React.createElement("p", null, "Error: ", error.toString());
// };
//
// var LoginCallback = function LoginCallback(_ref) {
//   var errorComponent = _ref.errorComponent;
//
//   var _useOktaAuth = useOktaAuth(),
//     oktaAuth = _useOktaAuth.oktaAuth,
//     authState = _useOktaAuth.authState;
//
//   var authStateReady = !authState.isPending;
//   var ErrorReporter = errorComponent || OktaError;
//   React.useEffect(function () {
//     oktaAuth.handleLoginRedirect();
//   }, [oktaAuth]);
//
//   if (authStateReady && authState.error) {
//     return /*#__PURE__*/React.createElement(ErrorReporter, {
//       error: authState.error
//     });
//   }
//   return null;
// };