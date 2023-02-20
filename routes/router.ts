import express from "express";
import indexRouter from "./index";

const routes = express.Router();

routes.use("/", indexRouter);

export default routes;
