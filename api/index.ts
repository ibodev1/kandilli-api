import app from "../app";
import indexRouter from "../routes";

app.use("/api/", indexRouter);

export { default } from "../app";
