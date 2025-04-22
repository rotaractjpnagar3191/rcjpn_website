console.log("✅ auth.js loaded");
import createAuth0Client from '../node_modules/@auth0/auth0-spa-js';

// /admin/js/src/utils/auth.js

let auth0Client;

// Initialize Auth0 Client
export const createClient = async () => {
  auth0Client = await createAuth0Client({
    domain: 'dev-kfgv1dzwf74ewm8f.us.auth0.com',
    client_id: 'gOkL9d9uCAFwwvmWvf1XqVeufsIf9Zvn',
    redirect_uri: window.location.origin,
  });
};

// Other functions like login, logout, etc.


// Other functions like login, logout, etc.


export const login = async () => {
  await auth0Client.loginWithRedirect();
};

export const logout = () => {
  auth0Client.logout({
    returnTo: window.location.origin + '/admin/'
  });
};

export const handleRedirectCallback = async () => {
  if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

export const getUser = async () => {
  return await auth0Client.getUser();
};

export const isAuthenticated = async () => {
  return await auth0Client.isAuthenticated();
};

export const protectAdminPage = async () => {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    login(); // should redirect to Auth0
  }
};



