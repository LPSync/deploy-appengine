const OKTA_ISSUER = process.env.REACT_APP_OKTA_ISSUER;
const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/login/callback`;
const OKTA_TESTING_DISABLEHTTPSCHECK = false;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: OKTA_ISSUER,
    redirectUri: REDIRECT_URI,
    prompt: "none",
    scopes: ["openid", "profile", "email", "okta.users.read.self"],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
};
