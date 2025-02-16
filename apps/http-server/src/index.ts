import express, { Request, Response } from "express";
import employee from "./routes/employeeRoutes";
import cookieParser from "cookie-parser";

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", employee);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
