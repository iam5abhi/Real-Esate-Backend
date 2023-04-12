const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    Pid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
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

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
