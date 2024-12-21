import Redis from "ioredis";
import Redlock from "redlock";

// Connect to Redis
const redisClient = new Redis({
  port: 6380, // Custom port
  host: "127.0.0.1", // Redis server host
}); // Default Redis port 6379

// Setup Redlock
export const redlock = new Redlock([redisClient], {
  driftFactor: 0.01, // Time compensation for Redis clock drift
  retryCount: 10, // Number of retries to acquire the lock
  retryDelay: 200, // Time in ms between retries
});
