import process from "node:process";
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response
} from "express";
import cors from "cors";
import helmet from "helmet";

const PORT = process.env.PORT ?? 5000;

const app: Express = express();

app.set("port", PORT);
app.use(helmet());
app.use(cors());
// app.use((request: Request, response: Response, next: NextFunction) => {
//   const isHTTPS =
//     request.headers["x-forwarded-proto"] &&
//     request.headers["x-forwarded-proto"] === "https";
//   if (isHTTPS || process.env.VERCEL_ENV === "development") {
//     next();
//   } else if (request.method === "GET") {
//     response.redirect(
//       301,
//       "https://" + request.headers.host + request.originalUrl
//     );
//   } else {
//     response
//       .status(403)
//       .send("Please use HTTPS when submitting data to this server.");
//   }
// });
app.use(express.json());
app.use((request: Request, response: Response, next: NextFunction) => {
  response.removeHeader("X-Powered-By");
  next();
});
app.use(express.urlencoded({ extended: false }));

export default app;
