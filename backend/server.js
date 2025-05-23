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
import qaRoutes from "./routes/qaRoutes.js";

app.use("/api/qa", qaRoutes);

// Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


