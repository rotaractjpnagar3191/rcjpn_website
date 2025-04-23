import {
  createClient,
  handleRedirectCallback,
  protectAdminPage,
  getUser,
  logout
} from './src/utils/auth.js';

window.onload = async () => {
  // Initialize Auth0 client
  await createClient();

  // Handle the redirect callback after Auth0 login
  await handleRedirectCallback();

  // Protect the admin page by checking if the user is authenticated
  await protectAdminPage();

  // Get the authenticated user
  const user = await getUser();
  console.log("Logged in user:", user);

  // If not authenticated, trigger the Auth0 login
  if (!user) {
    login(); // Trigger Auth0 login flow
    return;
  }

  // If authenticated, load Netlify CMS dynamically
  loadNetlifyCMS();

  // Set up the logout button functionality
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
    });
  }
};

// Function to dynamically load the Netlify CMS script after authentication
const loadNetlifyCMS = () => {
  const netlifyCmsScript = document.createElement('script');
  netlifyCmsScript.src = "https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js";
  document.body.appendChild(netlifyCmsScript);
};

// Trigger the Auth0 login flow
const login = async () => {
  if (auth0Client) {
    await auth0Client.loginWithRedirect();
  }
};
