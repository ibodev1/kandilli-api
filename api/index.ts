import app from "../app.js";
import indexRouter from "../routes/index.js";

app.use("/api/", indexRouter);

export { default } from "../app.js";
