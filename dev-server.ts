import app from "./app";
import logger from "morgan";
import routes from "./routes/router";

app.use(logger("dev"));
app.use("/", routes);

app.listen(app.get("port"), () => {
  console.log("Server started. Go to http://localhost:" + app.get("port"));
});
