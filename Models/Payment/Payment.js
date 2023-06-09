const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../Merchant/UserSchema");

const PaymentSchema = new Schema({
  Merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, "User id is required"],
    unique: true,
  },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  plan: {
    type: String,
    enum: ["SILVER", "GOLD", "PLATINUM"],
    required: true,
  },
  startDate: {
    type: Date,
    default: false,
  },
  endDate: {
    type: Date,
    default: false,
  },
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);

module.exports = PaymentModel;
