import express, { Request, Response } from "express";
import employee from "./routes/employeeRoutes";

const PORT = 3001;

const app = express();

app.use("/api/v1", employee);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
