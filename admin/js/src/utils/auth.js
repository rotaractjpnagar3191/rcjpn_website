let auth0Client;

export const createClient = async () => {
  auth0Client = await createAuth0Client({
    domain: 'dev-kfgv1dzwf74ewm8f.us.auth0.com',
    client_id: 'gOkL9d9uCAFwwvmWvf1XqVeufsIf9Zvn',
    redirect_uri: window.location.origin + '/admin/'
  });
};

export const login = async () => {
  await auth0Client.loginWithRedirect();
};

export const logout = () => {
  auth0Client.logout({ returnTo: window.location.origin + '/admin/' });
};

export const handleRedirectCallback = async () => {
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/admin/");
  }
};

export const isAuthenticated = async () => {
  return await auth0Client.isAuthenticated();
};

export const getUser = async () => {
  return await auth0Client.getUser();
};

export const protectAdminPage = async () => {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    login();
  }
};
