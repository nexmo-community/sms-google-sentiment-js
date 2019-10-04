# SMS Sentiment Analysis with Google Natural Language API

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://nexmo.dev/google-nexmo-sms-analysis-heroku)

This example uses Google Natural Language API to analyze SMS messages and determine the sentiment of the text.

SMS Messages sent through Nexmo will be sent to Google Natural Language API and a series of scores and tones returned to the console.

## Google Natural Language API

+ Reference: [https://cloud.google.com/natural-language/docs/sentiment-tutorial](https://cloud.google.com/natural-language/docs/sentiment-tutorial)
+ API Docs: [https://cloud.google.com/natural-language/docs/reference/rest/v1beta2/documents/analyzeSentiment](https://cloud.google.com/natural-language/docs/reference/rest/v1beta2/documents/analyzeSentiment)
+ GitHub: [https://github.com/googleapis/nodejs-language](https://github.com/googleapis/nodejs-language)

Enable the [Google Natural Language API](https://console.developers.google.com/apis/library/language.googleapis.com?q=sentiment&id=223648f2-2e7c-4acd-b0ca-782f9021a541) and create a service user with the `Project > Owner` role. Download the `google_creds.json` file for the service user. More information can be found here -> [https://cloud.google.com/natural-language/docs/reference/libraries](https://cloud.google.com/natural-language/docs/reference/libraries)

## Running the App

This sample app uses a `.env` file to provide the API key and URL.

Copy the provided `.env.example` file to a new file called `.env`:

```
cp .env.example > .env
```

Then update the values with the local file path of the `google_creds.json` file, and then save.

```
GOOGLE_APPLICATION_CREDENTIALS=
```

Also, expose the application to the internet using tools like [ngrok](https://ngrok.com/). To see how, [check out this guide](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr/).

### Using Docker

To run the app using Docker, run the following command in a terminal:

```
docker-compose up
```

This will create a new image with all the dependencies and run it at http://localhost:3000.

### Using Node

To run the app using node, run the following command in a terminal:

```
npm install && node index.js
```

This will install all the dependencies and run it at http://localhost:3000.

## Linking the app to Nexmo

For this example app a Nexmo number and SMS webhook setup is needed.

This can be achieved with the Nexmo CLI. Install the CLI by following [these instructions](https://github.com/Nexmo/nexmo-cli#installation).

### Rent a New Virtual Number

Renting a number will need to be in place. This can also be achieved using the CLI by running this command:

```
nexmo number:buy --country_code US
```

### Adding the SMS Webhook

Update the number created with the URL of the hosted or local server.

```
nexmo link:sms phone_number https://my-hostname/message
```

## Try it out

With the example Node application running in the terminal, send various SMS messages to the virtual number.  The terminal will output the response from Google Natural Language API.

## Extend
This app prints out to the console. For integration with an application, extend the `analyzeTone` function to suit your needs.
