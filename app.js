const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

//ERROR HANDLER IMPORTS
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//ROUTE HANDLERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARE
//DEV LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//SECURITY HHTP HEADERS
app.use(helmet());

//RATELIMIT REQUESTS FROM SAME IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

//READING DATA FROM THE BODY
app.use(express.json({ limit: '10kb' }));

//DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

//DATA SANITIZATION AGAINST XSS
app.use(xss());

//PARAMETER POLLUTION PREVENTION
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//SERVING STATIC FILES
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('hello from the middleware');
//   next();
// });

//TEST MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

//ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
