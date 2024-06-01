const Listing = require("./Models/listing.js");
const Review = require("./Models/review.js");
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema, reviewSchema} = require("./schema.js")

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
} 

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list.owner.equals(res.locals.currUser._id)){
        req.flash("error", "Permission denied");
        return res.redirect(`/listings/${id}`);
    }

    next();
}

module.exports.validationListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body)
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }
    else {
        next();
    }
}

module.exports.validationreview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body)
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }
    else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of review");
        return res.redirect(`/listings/${id}`);
    }

    next();
}