import express from "express";
import { initializeDb } from "./src/utility/db_connectivity.js";
import router from "./routes.js";

initializeDb();
// Initialize Express app
const app = express();
const PORT = 3013;

// Middleware to parse JSON requests
app.use(express.json());

app.use("/", router);
// Routes
app.get("/", (req, res) => {
  res.send("App server started!");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Gracefully handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`UNCAUGHT EXCEPTION: ${JSON.stringify(err)}`);
  process.exit(1);
});

// Gracefully handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`UNCAUGHT REJECTION: ${JSON.stringify(err)}`);

  server.close(() => {
    process.exit(1);
  });
});
