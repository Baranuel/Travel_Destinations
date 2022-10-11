import mongoose from "mongoose";

const travel_schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [4, "Title need to be longer than 4 characters"]
    },
    country: {
        type: String,
    },
    location: {
        type: String,
    },
    dateFrom: {
        type: String,
        required: [true, "Pick a starting date"],
    },
    dateTo: {
        type: String,
        required : [true, "Pick a date for return"],
    },
    description: {
        type: String,
        minLength: [20, "Description needs to be longer"],
    },
});

const Travel = mongoose.model(
    "Travel",
    travel_schema,
    "travel_destination"
);

export default Travel;