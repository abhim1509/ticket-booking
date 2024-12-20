import mongoose from "mongoose";

export const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true },
  ticketStatus: {
    type: String,
    enum: ["available", "reserved"],
    default: "available",
  },
});
