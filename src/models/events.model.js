import mongoose, { version } from "mongoose";
import { ticketSchema } from "./tickets.model.js";

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  tickets: [ticketSchema],
  // version: { type: Number, default: 0 },
  reservedBy: { type: String },
  // updatedAt: { type: Date, default: Date.now() },
});

// eventSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

export const Event = mongoose.model("event", eventSchema);
