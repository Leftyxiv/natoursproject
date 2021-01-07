const mongoose = require('mongoose');
//const Tour = require('./tourModel');

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
    {
      $math: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: 'rating' },
      },
    },
  ]);
  console.log(stats);
};

reviewSchema.pre('save', function (next) {
  //this points to current review
  this.constructor.Review.calcAverageRatings(this.tour);
  //Review object is not available before declaration and thats why we have the constructor
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

// GET /tour/:id/reviews
// POST to /tour/:id/reviews
// GET to /tour/:id/reviews/:id
