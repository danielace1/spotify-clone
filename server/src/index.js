import express from "express";
import "dotenv/config";
import path from "path";
import { createServer } from "http";
import cors from "cors";
// import { withAuth } from "@clerk/clerk-sdk-node";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";

import { initializeSocket } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

httpServer.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
