'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const language = require('@google-cloud/language');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${server.address().port} in ${app.settings.env} mode`);
});

// this is used with the heroku one-click install.
// if you are running locally, use GOOGLE_APPLICATION_CREDENTIALS to point to the file location
let config = null;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS === undefined) {
  config = {
    projectId: 'nexmo-extend',
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
  }
}

// Reading the inbound SMS messages
const handleRoute = (req, res) => {

  let params = req.body;

  if (req.method === "GET") {
    params = req.query
  }

  if (!params.to || !params.msisdn) {
    res.status(400).send({'error': 'This is not a valid inbound SMS message!'});
  } else {
    analyzeTone(params);
    res.status(200).end();
  }

};

// Using route here to allow for GET or POST from https://dashboard.nexmo.com/settings
app.route('/message')
  .get(handleRoute)
  .post(handleRoute)
  .all((req, res) => res.status(405).send());

// Google Cloud Sentiment Analysis
const client = new language.LanguageServiceClient();

function analyzeTone(params) {
  let document = {
    content: params.text,
    type: 'PLAIN_TEXT',
  };

  client.analyzeSentiment({document: document})
      .then(results => {
        console.log(results[0]);
      })
      .catch(err => {
        console.log('error', err);
      });
}
