const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./models/tourModel');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

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
    console.log('db connection goooood');
  });

//readc json
const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete all the stuff
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
