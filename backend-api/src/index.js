import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as db from './queries';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)

app.get('/friends/', db.getFriends)
app.get('/friends/:id', db.getUserFriends)

app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);