import express from "express";
import { connectDB } from "./config/default.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; // Set port from environment or default to 5000

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.options("*", cors());

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local frontend
      "https://video-app-frontend-pearl.vercel.app", // Deployed frontend
    ],
    credentials: true, // Allow credentials like cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow OPTIONS method for preflight requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
  })
);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// Basic route to check server health
app.get("/", (req, res) => {
  res.json({ message: "Backend deployed successfully" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
