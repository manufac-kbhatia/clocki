import express, { Request, Response } from "express";
import employeeRoute from "./routes/employeeRoutes";
import organisationRoute from "./routes/organisationRoutes";
import authRoutes from "./routes/authRoutes";
import teamRoute from "./routes/teamRoutes";
import clientRoute from "./routes/clientRoutes";
import projectRoute from "./routes/projectRoutes";
import timeSheetRoutes from "./routes/timeSheetRoutes";
import agentRoutes from "./routes/agentRoutes";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { config } from "dotenv";

config();
const PORT = 8080;

const app = express();

const whitelist = ["http://localhost:5173", "https://app-cloki.b-cdn.net"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: StatusCodes.OK,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use("/api/v1", employeeRoute);
app.use("/api/v1", organisationRoute);
app.use("/api/v1", teamRoute);
app.use("/api/v1", clientRoute);
app.use("/api/v1", projectRoute);
app.use("/api/v1", timeSheetRoutes);
app.use("/api/v1", agentRoutes);

app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
