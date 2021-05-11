<h1 align="center">
  <br>
  <a href="https://aledoux.net/natours"><img src="https://github.com/lgope/Natours/blob/master/public/img/logo-green-round.png" alt="Natours" width="200"></a>
  <br>
  Natours
  <br>
</h1>

<h4 align="center">An awesome tour booking site built on top of <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>.</h4>

 <p align="center">
 <a href="#deployed-version">Demo</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#demonstration">Demonstration</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#api-usage">API Usage</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#build-with">Build With</a> •
  <a href="#to-do">To-do</a> •
  <a href="#installation">Installation</a> • 
  <a href="#known-bugs">Known Bugs</a> • 
  <a href="#future-updates">Future Updates</a> • 
  <a href="#acknowledgement">Acknowledgement</a>
</p>

## Deployed Version
Live demo : aledoux.net/natours


## Key Features

* Authentication and Authorization
  - Login and logout
* Tour
  - Manage booking, check tours map, check users' reviews and rating
* User profile
  - Update username, photo, email, and password
* Credit card Payment


## How To Use

### Book a tour
* Login to the site
* Search for tours that you want to book
* Book a tour
* Proceed to the payment checkout page
* Enter the card details (Test Mood):
  ```
  - Card No. : 4242 4242 4242 4242
  - Expiry date: 02 / 22
  - CVV: 222
  ```
* Finished!



### Manage your booking

* Check the tour you have booked in "Manage Booking" page in your user settings. You'll be automatically redirected to this
  page after you have completed the booking.

### Update your profile

* You can update your own username, profile photo, email and password.



## API Usage
Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add: 
  ```
  - {{URL}} with your hostname as value (Eg. http://127.0.0.1:3000 or http://www.example.com)
  - {{password}} with your user password as value.
  ```

Check [Natours API Documentation](https://documenter.getpostman.com/view/13731155/TzRUA6mo) for more info.




## Build With

* [NodeJS](https://nodejs.org/en/) - JS runtime environment
* [Express](http://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
* [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
* [JSON Web Token](https://jwt.io/) - Security token
* [ParcelJS](https://parceljs.org/) - Blazing fast, zero configuration web application bundler
* [Stripe](https://stripe.com/) - Online payment API
* [Postman](https://www.getpostman.com/) - API testing
* [Mailtrap](https://mailtrap.io/) & [Sendgrid](https://sendgrid.com/) - Email delivery platform
* [Heroku](https://www.heroku.com/) - Cloud platform




## Installation
You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running
```
$ npm i
set your env variables
$ npm run watch:js
$ npm run build:js
$ npm run dev (for development)
$ npm run start:prod (for production)
$ npm run debug (for debug)
$ npm start
Setting up ESLint and Prettier in VS Code 👇
$ npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node
eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-react --save-dev
```


## Known Bugs
Feel free to email me at manny@aledoux if you run into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

