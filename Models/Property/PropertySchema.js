const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    project_name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    status: {
        type: String,
        enum: ["active", "deactive"],
        default: "active",
    },
});

const ProductModel = mongoose.model("Property", PropertySchema);

module.exports = ProductModel;
