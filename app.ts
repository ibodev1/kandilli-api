import process from 'node:process';
import express, {
	type Express,
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import cors from 'cors';
import helmet from 'helmet';

const PORT = process.env.PORT ?? 5000;

const app: Express = express();

app.set('port', PORT);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use((request: Request, response: Response, next: NextFunction) => {
	response.removeHeader('X-Powered-By');
	next();
});
app.use(express.urlencoded({extended: false}));

export default app;
