"use strict";
const BoxConfig = require('./boxConfig');
const Box = require('box-node-sdk');
const fs = require('fs');
const path = require('path');

let BoxSdk = new Box({
  clientID: BoxConfig.clientId,
  clientSecret: BoxConfig.clientSecret,
  appAuth: {
    keyID: BoxConfig.jwtPublicKeyId,
    privateKey: (() => {
      let certPath = path.resolve("private_key.pem")
      return fs.readFileSync(certPath);
    })(),
    passphrase: BoxConfig.jwtPrivateKeyPassword
  }
});

let BoxAdminClient = BoxSdk.getAppAuthClient('enterprise', BoxConfig.enterpriseId);
BoxAdminClient._session.getAccessToken(function (err, token) {
    console.log(err);
  console.log(token);
});
