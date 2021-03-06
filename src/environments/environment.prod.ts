/**
 * environment object to set basic urls and firebase configuration
 */
const backend = 'https://pharos-api.ncats.io';

export const environment = {
  rendererUrl: `${backend}/render`,
  production: true,
  graphqlUrl: `${backend}/graphql`,
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  }
};

