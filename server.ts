import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express-serve-static-core";
import route from "./route/route";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "*" }));

app.use(route);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "INVALID REQUEST";

  res.status(statusCode).json({ error: message });
});
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
