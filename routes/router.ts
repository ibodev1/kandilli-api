import express from 'express';
import indexRouter from './index.js';

const routes = express.Router();

routes.use('/', indexRouter);

export default routes;
