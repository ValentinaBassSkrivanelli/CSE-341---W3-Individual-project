// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Print the display name if available for 10 connections.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// async function listConnectionNames(auth) {
//   const service = google.people({version: 'v1', auth});
//   const res = await service.people.connections.list({
//     resourceName: 'people/me',
//     pageSize: 10,
//     personFields: 'names,emailAddresses',
//   });
//   const connections = res.data.connections;
//   if (!connections || connections.length === 0) {
//     console.log('No connections found.');
//     return;
//   }
//   console.log('Connections:');
//   connections.forEach((person) => {
//     if (person.names && person.names.length > 0) {
//       console.log(person.names[0].displayName);
//     } else {
//       console.log('No display name found for connection.');
//     }
//   });
// }

// authorize().then(listConnectionNames).catch(console.error);

// const {google} = require('googleapis');

// // Each API may support multiple versions. With this sample, we're getting
// // v3 of the blogger API, and using an API key to authenticate.
// const blogger = google.blogger({
//   version: 'v3',
//   auth: 'YOUR API KEY'
// });

// const params = {
//   blogId: '3213900'
// };

// // get the blog details
// blogger.blogs.get(params, (err, res) => {
//   if (err) {
//     console.error(err);
//     throw err;
//   }
//   console.log(`The blog url is ${res.data.url}`);
// });

// async function runSample() {
//   const res = await blogger.blogs.get(params);
//   console.log(`The blog url is ${res.data.url}`);
// }
// runSample().catch(console.error);

// const docs = require('@googleapis/docs')

// const auth = new docs.auth.GoogleAuth({
//   keyFilename: 'PATH_TO_SERVICE_ACCOUNT_KEY.json',
//     // Scopes can be specified either as an array or as a single, space-delimited string.
//   scopes: ['https://www.googleapis.com/auth/documents']
// });
// const authClient = await auth.getClient();

// const client = await docs.docs({
//     version: 'v1',
//     auth: authClient
// });

// const createResponse = await client.documents.create({
//     requestBody: {
//       title: 'Your new document!',
//     },
// });

// console.log(createResponse.data);