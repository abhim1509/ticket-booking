import { Router } from "express";
import {
  getEvent,
  createEvent,
  bookTicketForEvent,
} from "./src/controllers/event.controller.js";
const router = Router();

router.post("/event", createEvent);
router.get("/event/:eventId", getEvent);
router.put("/event", bookTicketForEvent);

export default router;
