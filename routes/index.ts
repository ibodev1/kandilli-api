import express, { type Request, type Response } from "express";
import { type Earthquake } from "../types/kandilli";
import getEarthquakeList from "../utilities/kandilli";

const indexRouter = express.Router();

indexRouter.get("/", async (request: Request, response: Response) => {
  try {
    const earthquakeList: Earthquake[] | undefined = await getEarthquakeList();
    var responseData: Earthquake[] | undefined = earthquakeList;
    if (request.query.sehir) {
      responseData = responseData?.filter(
        (deprem: Earthquake) => deprem.sehir === request.query.sehir
      );
    }

    if (
      request.query.limit &&
      Number(request.query.limit) >= 10 &&
      Number(request.query.limit) <= 500
    ) {
      responseData = responseData?.slice(0, Number(request.query.limit));
    } else {
      responseData = responseData?.slice(0, 100);
    }

    if (request.query.minml && Number(request.query.minml) > 0) {
      responseData = responseData?.filter(
        (deprem: Earthquake) =>
          parseFloat(deprem.ml) > Number(request.query.minml)
      );
    }

    if (request.query.sort) {
      const sortedBy: any = request.query.sort.toString();
      // @ts-ignore
      responseData = responseData?.sort((a, b) => b[sortedBy] - a[sortedBy]);
    }

    response.status(200).json(responseData);
  } catch (error: any) {
    response.status(400).end(error.toString());
  }
});

export default indexRouter;
