import app from "./app.js";
import logger from "morgan";
import routes from "./routes/router.js";

app.use(logger("dev"));
app.use("/", routes);

app.listen(app.get("port"), () => {
  console.log("Server started. Go to http://localhost:" + app.get("port"));
});
