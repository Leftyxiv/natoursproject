const mongoose = require('mongoose');
const dotenv = require('dotenv');
//LEAVING OFF AT 4:30 VIDE0 126
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  // eslint-disable-next-line no-console
  console.log('uncaught exception.... SHUTTING DOWN');
  // eslint-disable-next-line no-use-before-define
  server.close(() => {
    process.exit(1);
  });
});

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
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('db connected');
  });

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  // eslint-disable-next-line no-console
  console.log('unhandled rejection.... SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});
