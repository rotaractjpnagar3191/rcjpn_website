let auth0Client;

// Function to create the Auth0 client
export const createClient = async () => {
  // Dynamically set the redirect URI based on environment or fallback to default
  const redirectUri = process.env.REDIRECT_URI || window.location.origin + '/static/admin/';

  // Initialize the Auth0 client with your Auth0 settings
  auth0Client = await createAuth0Client({
    domain: 'dev-kfgv1dzwf74ewm8f.us.auth0.com',
    client_id: 'gOkL9d9uCAFwwvmWvf1XqVeufsIf9Zvn',
    redirect_uri: redirectUri  // Use dynamic redirect URI
  });
};

// Function to start the login flow
export const login = async () => {
  // Start the login flow
  await auth0Client.loginWithRedirect();
};

// Function to logout from Auth0 and redirect to the admin page
export const logout = () => {
  auth0Client.logout({ returnTo: window.location.origin + '/static/admin/' });
};

// Function to handle the redirect callback after the login flow
export const handleRedirectCallback = async () => {
  if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
    try {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, '/static/admin/');
    } catch (error) {
      console.error('Auth0 redirect callback error:', error);
    }
  }
};

// Function to check if the user is authenticated
export const isAuthenticated = async () => {
  try {
    return await auth0Client.isAuthenticated();
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Function to retrieve the authenticated user's details
export const getUser = async () => {
  try {
    return await auth0Client.getUser();
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Function to protect the admin page (ensure user is authenticated)
export const protectAdminPage = async () => {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    // Redirect to Auth0 login if the user is not authenticated
    login();
  }
};
