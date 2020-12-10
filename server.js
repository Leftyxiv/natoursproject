const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('db connected');
  });

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

/*STRING FROM SHELL
mongo "mongodb+srv://cluster0.jycnh.mongodb.net/natours" --username manny
*/
