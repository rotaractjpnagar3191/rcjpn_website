import { createClient, handleRedirectCallback, protectAdminPage } from '.\C:\Github\rcjpn_website\src\utils\auth.js';

window.onload = async () => {
  // Initialize Auth0 client
  await createClient();

  // If the page was redirected after login, handle the callback
  await handleRedirectCallback();

  // Protect the admin page (check if the user is authenticated)
  protectAdminPage();
};
