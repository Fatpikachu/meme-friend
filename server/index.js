import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());



app.get('/test', (req, res) => {
  console.log('got into test~')
  res.json({message: 'this workings~!'})
})

app.get('/', (req, res) => {
  res.send('hello to memeing friends~');
})


app.listen(port, () => {
  console.log(`Starting the server at port~ ${port}`);
})


