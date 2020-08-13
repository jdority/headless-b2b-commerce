const express = require('express');
const path = require('path');
const fetch = require('node-fetch')

const app = express();

app.use(express.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// An api endpoint that returns a short list of items
app.post('/api/userinfo', (req, res) => {
    const {
        endpoint,
        access_token
    } = req.body;

    const verb = 'GET';

    const props = {
        method: verb,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    }
    fetch(endpoint, props).then(
        response => response.json()
    ).then(json => {
        //console.log(json);
        res.send(json);
    })
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);