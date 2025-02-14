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
  'https://canvas-ai-4-git-main-subhransu-sekhar-mishras-projects.vercel.app',
  'https://canvas-ai-4.vercel.app',
  'http://localhost:5173',
  // Add any other domains you need
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Error handling for CORS
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({
      success: false,
      message: 'Origin not allowed by CORS policy'
    });
  } else {
    next(err);
  }
});

app.use(express.json());

// Connect to MongoDB
try {
  await connectDB();
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}

// Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    status: "success", 
    message: "API is working",
    version: "1.0.0"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});