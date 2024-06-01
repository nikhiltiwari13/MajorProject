const { query } = require("express");
const Listing = require("../Models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = "pk.eyJ1IjoibmlraGlsLXRpd2FyaTEzNzUiLCJhIjoiY2x3b3dsaWNvMTVmNjJpcnpyYzgxNGo3ZyJ9.u8j0vjBKNCiqzWkeEoaDXw";
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
    .send()

    // let {title, description, image, price, location, country, category} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    let save = await newListing.save();
    // console.log(save);
    req.flash("success", "New Listing created!");
    res.redirect("/listings");
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    let list = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!list){
        req.flash("error", "Listing does not exist")
        res.redirect("/listings")
    }
    // console.log(list.owner)
    res.render("listings/show.ejs", {list})
}

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list){
        req.flash("error", "Listing does not exist")
        res.redirect("/listings")
    }

    let originalImageUrl = list.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", {list, originalImageUrl});
}

module.exports.updateListing = async (req, res) => {
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listings")
    }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing})

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings")
}