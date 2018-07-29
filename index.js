const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BHNTF9lvhZ9TfAFxa6DqWIULl8TXCx0wwR102P8mcbztyNMSKSbTK2mrFt56WqFbCeovBY959EIhhjTLIdyyvck';
const privateVapidKey = 'i2H8bAeg53r01VOgQ3odmnKkm4F12wvPFbKJEDHiy6s';


webpush.setVapidDetails('mailto:jitendrak@test.com', publicVapidKey, privateVapidKey);

// subscribe route

app.post('/subscribe', (req, res) => {
    // Get push subscription object
    const subscription = req.body;

    // Send 201 status - resource created
    res.status(201).json({});

    // create payload
    const payload = JSON.stringify({
        title: 'Push Test'
    });

    // Pass object into send notification function
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));