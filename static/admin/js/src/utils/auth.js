let auth0Client;

export const createClient = async () => {
  // Initialize the Auth0 client with your Auth0 settings
  auth0Client = await createAuth0Client({
    domain: 'dev-kfgv1dzwf74ewm8f.us.auth0.com',
    client_id: 'gOkL9d9uCAFwwvmWvf1XqVeufsIf9Zvn',
    redirect_uri: window.location.origin + '/admin/', // This should match your Auth0 redirect URL
  });
};

export const login = async () => {
  // Start the login flow
  await auth0Client.loginWithRedirect();
};

export const logout = () => {
  // Logout from Auth0 and redirect to the admin page
  auth0Client.logout({ returnTo: window.location.origin + '/admin/' });
};

export const handleRedirectCallback = async () => {
  // Handle the redirect callback after the login flow
  if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
    try {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, '/admin/');
    } catch (error) {
      console.error('Auth0 redirect callback error:', error);
    }
  }
};

export const isAuthenticated = async () => {
  // Check if the user is authenticated
  try {
    return await auth0Client.isAuthenticated();
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const getUser = async () => {
  // Retrieve the authenticated user's details
  try {
    return await auth0Client.getUser();
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const protectAdminPage = async () => {
  // Ensure that the user is authenticated
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    // Redirect to Auth0 login if the user is not authenticated
    login();
  }
};
