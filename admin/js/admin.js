import { createClient, handleRedirectCallback, protectAdminPage } from './src/utils/auth.js';

window.onload = async () => {
  await createClient();
  await handleRedirectCallback();
  await protectAdminPage();
};

