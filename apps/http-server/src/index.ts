import express, { Request, Response } from "express";
import employeeRoute from "./routes/employeeRoutes";
import organisationRoute from "./routes/organisationRoutes";
import authRoutes from "./routes/authRoutes";
import teamRoute from "./routes/teamRoutes";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error";
import cors, { CorsOptions } from "cors";
import { StatusCodes } from "http-status-codes";

const PORT = 8080;

const app = express();

const whitelist = ["http://localhost:5173"];

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

app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
