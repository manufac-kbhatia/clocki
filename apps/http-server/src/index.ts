import express, { Request, Response } from "express";
import employeeRoute from "./routes/employeeRoutes";
import organisationRoute from "./routes/organisationRoutes";
import cookieParser from "cookie-parser";

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", employeeRoute);
app.use("/api/v1", organisationRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
