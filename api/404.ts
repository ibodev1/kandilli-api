import {type Request, type Response} from 'express';

export default (request: Request, response: Response) => {
	response.status(404).json({message: 'Not Found!'});
};
