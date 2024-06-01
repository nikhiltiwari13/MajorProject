const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listeningSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        url: String,
        filename: String,
    },
    price : Number,
    location : String,
    country : String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: String,
        enum: ["trending", "rooms", "iconic cities", "mountains", "castels", "amazing pool", "camping", "farm", "arctic"]
    }
});

listeningSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listeningSchema);
module.exports = Listing;