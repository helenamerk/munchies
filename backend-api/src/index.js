import 'dotenv/config';
import express from 'express';
import Expo from 'expo-server-sdk';
import cors from 'cors';
import * as db from './queries';
import pool from './pool';

const app = express();
const expo = new Expo();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)

app.get('/munch/:id', db.getMunchById)
app.get('/munch_members/:id', db.getMunchMembers)

app.get('/venue/:id', db.getVenueById)

app.get('/friends/', db.getFriends)
app.get('/friends/:id', db.getUserFriends)

app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.post('/token', db.registerDeviceToken)
app.post('/munch', db.scheduleMunch)
app.post('/join_munch', db.joinMunch)


const handlePushTokens = (message, venue_id) => {
    let notifications = [];
    pool.query('SELECT push_token FROM registered_devices', (error, results) => {
        if (error) {
          throw error
        }

        console.log('selected just tokens')
        console.log(results.rows)

        for (let pushToken of results.rows) {
            pushToken = pushToken['push_token']
            console.log(pushToken)
            if (!Expo.isExpoPushToken(pushToken)) {
              console.error(`Push token ${pushToken} is not a valid Expo push token`);
              continue;
            }
            notifications.push({
              to: pushToken,
              sound: 'default',
              title: 'Message received!',
              body: message,
              data: { venue_id }
            })
          }

        let chunks = expo.chunkPushNotifications(notifications);
        (async () => {
            for (let chunk of chunks) {
            try {
                let receipts = await expo.sendPushNotificationsAsync(chunk);
                console.log(receipts);
            } catch (error) {
                console.error(error);
            }
            }
        })();
    });
    //response.status(200).json(results.rows)
}

app.post('/message', (req, res) => {
    handlePushTokens(req.body.message, req.body.munch_id);
    console.log(`Received message, ${req.body.message}`);
    res.send(`Received message, ${req.body.message}`);
});


app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);