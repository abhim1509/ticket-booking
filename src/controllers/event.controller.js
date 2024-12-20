import { v4 as uuidv4 } from "uuid";
import { Event } from "../models/events.model.js";
import { Mutex } from "async-mutex";
export const createEvent = async (req, res) => {
  const { eventName, ticketNumbers, eventDate } = req.body;
  console.log("Inside create event");
  if (!eventName || !ticketNumbers || !eventDate) {
    res
      .status(400)
      .json({ status: false, message: "Required fields missing." });
  }

  try {
    let tickets = [];
    const eventId = `event-${uuidv4()}`;
    for (let i = 0; i < ticketNumbers; i++) {
      tickets.push({ ticketId: `ticket-${eventId}-${i}` });
    }

    const eventResponse = await Event.create({
      eventId,
      eventName,
      eventDate,
      tickets,
    });

    if (!eventResponse) {
      throw new Error("Creating event failed:" + JSON.stringify(eventResponse));
    }

    res.status(201).json({
      status: true,
      message: "Event created successfully.",
      data: eventResponse?.eventId,
    });
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).json({ status: false, message: "An error occurred." });
  }
};

export const getEvent = (req, res) => {};

export const bookTicketForEvent = async (req, res) => {
  const { eventId, ticketId, email } = req.body;
  console.log("Inside bookTicketForEvent");
  if (!eventId || !ticketId || !email) {
    return res
      .status(400)
      .json({ status: false, message: "Required fields missing." });
  }
  const mutex = new Mutex();
  const release = await mutex.acquire();
  try {
    const event = await Event.findOne({ eventId });

    const ticket = event.tickets.find((t) => {
      return t.ticketId === ticketId;
    });

    if (!ticket) {
      return res.status(404).json({
        status: false,
        message: "Ticket not found.",
      });
    }

    if (ticket.ticketStatus !== "available") {
      return res.status(400).json({
        status: true,
        message: "Ticket not available.",
      });
    }

    ticket.ticketStatus = "reserved";
    await event.save();

    res.status(201).json({
      status: true,
      message: "Ticket booked successfully.",
    });
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).json({ status: false, message: "An error occurred." });
  } finally {
    release();
  }
};
