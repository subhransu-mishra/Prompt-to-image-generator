import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import imageRouter from "./routes/imageRouter.js";

const PORT = process.env.PORT || 4000;
const app = express();

// List of allowed origins
const allowedOrigins = [
  "https://canvas-ai-client.onrender.com",
  "https://canvas-ai-4.vercel.app",
  "http://localhost:5173",
];

// Enhanced CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "token"],
  })
);

// Middleware to set CORS headers manually (optional)
app.use((req, res, next) => {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, token");
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
});

// Preflight request handling
app.options("*", cors());
app.use(express.json());

// Error handling for CORS
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({
      success: false,
      message: "Origin not allowed by CORS policy",
    });
  } else {
    next(err);
  }
});

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
})();

// Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API is working",
    version: "1.0.0",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
