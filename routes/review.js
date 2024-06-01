const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const {validationreview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");


// post route
router.post("/", isLoggedIn, validationreview,  wrapAsync(reviewController.createReview));

// delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;