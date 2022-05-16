import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';
const port = process.env.PORT || 5000;
const app = express();
import configData from './config.json' assert {type: "json"};
import twilio from 'twilio';

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//twilio
// const twilio = require('twilio');
// const { accountSid, authToken, IMGUR_ID } = require('./config');
const client = new twilio(configData.accountSid, configData.authToken)

app.get('/test', (req, res) => {
  console.log('got into test~')
  res.json({message: 'this workings~!'})
})

app.get('/', (req, res) => {
  res.send('hello to memeing friends~');
})

app.get('/gallery', (req, res) => {
  fetch(`https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true&mature=false&album_previews=true`, {
      headers: {
        "Authorization": 'Client-ID ' + configData.IMGUR_ID,
      }
    })
    .then((memeData) => 
      memeData.json()
    )
    .then((memes) => {
      // console.log('the memeData: ', Array.isArray(memes))
      memes = memes.data.slice(0, 201);
      res.json(memes);
    })
})


app.get('/comments', async (req, res) => {
  const { id } = req.query;
  fetch(`https://api.imgur.com/3/gallery/${id}/comments/best`, {
      headers: {
        "Authorization": 'Client-ID ' + configData.IMGUR_ID,
      }
    })
    .then((result) => 
      result.json()
    )
    .then((comments) => {
      // console.log('comments in server~~, ', comments)
      return res.json(comments)
      }
    )
})

app.get('/send-text/:recipient', async (req, res) => {
  console.log('*********got into send text')
  const { txtMsg } = req.query;
  const { recipient } = req.params;
  console.log('send-text~, ', recipient, txtMsg);
  client.messages.create({
    body: txtMsg,
    to: recipient,
    from: '+14159410232'
  }).then(() => 
    res.sendStatus(200) 
  ).catch(() => 
    res.sendStatus(400)
  )
})

app.listen(port, () => {
  console.log(`Starting the server at port~ ${port}`);
})


