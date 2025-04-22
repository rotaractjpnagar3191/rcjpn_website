console.log("✅ auth.js loaded");
import createAuth0Client from '@auth0/auth0-spa-js';

let auth0Client;

// Initialize Auth0 Client
export const createClient = async () => {
  auth0Client = await createAuth0Client({
    domain: 'dev-kfgv1dzwf74ewm8f.us.auth0.com',  // Replace with your Auth0 domain
    client_id: 'gOkL9d9uCAFwwvmWvf1XqVeufsIf9Zvn',  // Replace with your Auth0 client ID
    redirect_uri: window.location.origin  // The URL to return to after login
  });
};

// Login function to redirect the user to Auth0's login page
export const login = async () => {
  await auth0Client.loginWithRedirect();
};

// Logout function to log out the user
export const logout = () => {
  auth0Client.logout({
    returnTo: window.location.origin  // URL to redirect after logging out
  });
};

// Handle Auth0 redirect callback after login
export const handleRedirectCallback = async () => {
  await auth0Client.handleRedirectCallback();
  window.history.replaceState({}, document.title, window.location.pathname);
};

// Get the authenticated user's information
export const getUser = async () => {
  return await auth0Client.getUser();
};

// Check if the user is authenticated
export const isAuthenticated = async () => {
  return await auth0Client.isAuthenticated();
};

// Protect the admin page by redirecting unauthenticated users to login
export const protectAdminPage = async () => {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    login();  // Redirect to login if not authenticated
  }
};
