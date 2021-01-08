const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'a review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'you must rate the tour to review it'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'a review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'a user is required'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//allows users to only leave one review
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.static.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    //match the tour id
    {
      $match: { tour: tourId },
    },
    //calculate statistics for that id
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: 'rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    //update the tour document in the database with the new calculations
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    //if no "stats" then set those to default
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  //use post because if you use pre the document has not been saved yet
  //this points to current review
  this.constructor.Review.calcAverageRatings(this.tour);
  //Review object is not available before declaration and thats why we have the constructor
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  //find the right review
  //pass the data to the post middleware by adding it to the "this"
  this.rev = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  //this.findOne will not work here since the query has already executed
  //saving the average rating after an update of a review
  await this.rev.constructor.calcAverageRatings(this.rev.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

// GET /tour/:id/reviews
// POST to /tour/:id/reviews
// GET to /tour/:id/reviews/:id
