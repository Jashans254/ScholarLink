import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb} from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import askRoutes from "./routes/askRoutes.js";
dotenv.config();
connectDb();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use("/api/users", userRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/loans", loanRoutes);


app.use("/api/recommendations", recommendationRoutes);

app.use("/api/chat",askRoutes)

// Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import path from 'path';
import { fileURLToPath } from 'url';

// These two lines help in ESM modules (if you use import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files
const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(frontendBuildPath));

// For any unknown routes, send back index.html (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});
