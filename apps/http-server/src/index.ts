import express, { Request, Response } from "express";
import employeeRoutes from "./routes/employeeRoutes";

const PORT = 3001;

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/employee", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
