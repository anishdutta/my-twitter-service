import express from 'express';
const app = express();
const port = 3000;
import routes from './routes/v1';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import mongoose from 'mongoose';
import config from './config/db.config';

let server: any;
mongoose.connect(config.mongoose.url).then(() => {
  console.log('Connected to MongoDB');
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/v1', routes);


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
