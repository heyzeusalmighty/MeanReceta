'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  yummlyAppId:    'xxxxxx',
  yummlyAppKey:   'xxxxxxxxxxxxxxxx',
  MONGOLAB_URI: 'mongodb://xxxx:xxxxxx@xxxxxxx.mongolab.com',

  //old database settings
  oldDatabaseUserName: 'xxxxxxxxxxxx',
  oldDatabasePassword: 'xxxxxxxxxxxx',
  oldDatabaseServer: 'xxxxxxxxxxxx',

  //BLOBBY STORAGES
  blobStorageEndpoint: 'xxxxxxxxxxxx',
  AZURE_STORAGE_ACCOUNT: '',
  AZURE_STORAGE_ACCESS_KEY: '', 
  AZURE_STORAGE_CONNECTION_STRING: 'xxxxxxxxxxxx',


  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
