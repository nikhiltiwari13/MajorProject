const { query } = require("express");
const Listing = require("../Models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = "pk.eyJ1IjoibmlraGlsLXRpd2FyaTEzNzUiLCJhIjoiY2x3b3dsaWNvMTVmNjJpcnpyYzgxNGo3ZyJ9.u8j0vjBKNCiqzWkeEoaDXw";
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.trending = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/trending.ejs", {allListings})
}

module.exports.rooms = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/rooms.ejs", {allListings})
}

module.exports.iconicCities = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/rooms.ejs", {allListings})
}

module.exports.mountains = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/mountains.ejs", {allListings})
}

module.exports.castles = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/castles.ejs", {allListings})
}

module.exports.amazingPool = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/amazingPool.ejs", {allListings})
}

module.exports.camping = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/camping.ejs", {allListings})
}

module.exports.farm = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/farm.ejs", {allListings})
}

module.exports.arctic = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("options/arctic.ejs", {allListings})
}