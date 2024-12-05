import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log("Server is running on port 5555"));
