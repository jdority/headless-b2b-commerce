### B2B Commerce Headless Demo App

This is a React based single page app that can be used to demo a headless commerce environment for Salesforce B2B Commerce. This demo uses the v1 api.

Features:
View products in the product catalog
Place items in the cart, change quantities
Punch out to the B2B cart running in the community
Explore the REST API

To-do:
Connect to CMS API to diplay content (news widget)
Use the search API to find products 

The app is almost entirely client side. The server.js file has a single server side component to get around some CORS issues hitting Salesforce oauth endpoints (userinfo specifically). Aside from that, the app is running entirely in the browser.


## Setup Instructions

After cloining this repo, you will need to create a new connected app in your SDO
The connected app just needs to support logging in via OAuth:

![Connected App](/doc/2020-07-23_13-35-00.png)

This project uses oidc-client to manage the oauth flow for the app. The connected app scope should be set to api,profile,openid.  This app will use the OAuth2 implicit grant to authorize the user to use the Salesforce API.  This library supports using OIDC, but due to CORS challenges it isn't possible to use that with the community. 

The callback URL for a local deployment should be set to http://localhost:5000/signin-oidc

Update the /scripts/env.sh file to match your SDO configuration:
REACT_APP_AUTH_URL = the URL for your B2B community in your SDO
REACT_APP_IDENTITY_CLIENT_ID = the consumer key value for the connected app you created
REACT_APP_AUTH_ISSUER = same value as REACT_APP_AUTH_URL
REACT_APP_REDIRECT_URL = the callback URL of your connected app needs to match this value. Salesforce will send the user's access token to this endpoint, but if the values don't match you will get an error.

If you are deploying this to Heroku, you will need to set environment variables rather than 
set these values via the env.sh shell script.

use the `heroku config:set` command to set the variables. The screenshot below shows the values that will need to be set - same instructions as above, except point to your heroku URL instead of localhost:5000

![Heroku Config](/doc/2020-07-23_14-09-15.png)


You may need to create two of these - one for deploying to Heroku (if desired) and one for deploying locally.

## Post Install Setup Instructions

This demo uses Lauren Bailey as the demo user. For Lauren to have permission to use the API, we have to add the CC api to a permset

Have to add ccrz apex classes to a perm set. Open setup in the SDO:
   B2B Commerce for Customer Community Plus perm set: 
      Apex Class Access:
        add cc:ApiProductRest, cc:ApiCartRest

You will also want to change Lauren's e-mail address to your own and reset the password



## How to run this locally

`npm install`
`npm run startlocal`

open your browser to http://localhost:5000 and click the login link
once you're logged in, you can browse products, put things in the cart, and use the REST explorer

## How to run this on Heroku

`heroku create`
 setup your environment variables as specified above
`git push heroku master`
`heroku open`