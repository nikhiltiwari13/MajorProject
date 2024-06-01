const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listing.js");
const {isLoggedIn, isOwner, validationListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const optionController = require("../controllers/option.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


// index route
router.get("/", wrapAsync(listingController.index))

// trending option
router.get("/trending", wrapAsync (optionController.trending));

// rooms option
router.get("/rooms", wrapAsync (optionController.rooms));

// iconicCities option
router.get("/iconicCities", wrapAsync (optionController.iconicCities));

// mountains option
router.get("/mountains", wrapAsync (optionController.mountains));

// castles optin
router.get("/castles", wrapAsync (optionController.castles));

// amazingPool option
router.get("/amazingPool", wrapAsync (optionController.amazingPool));

// camping option
router.get("/camping", wrapAsync (optionController.camping));

// farm option
router.get("/farm", wrapAsync (optionController.farm));

// arctic option
router.get("/arctic", wrapAsync (optionController.arctic));

// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//  create route
router.post("/",  isLoggedIn, upload.single("listing[image]"), validationListing, wrapAsync(listingController.createListing));

// show route
router.get("/:id", wrapAsync (listingController.showListing));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.renderEditForm));

// update route
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validationListing, wrapAsync (listingController.updateListing));

// delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync (listingController.deleteListing));

module.exports = router


