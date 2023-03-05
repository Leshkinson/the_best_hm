import {Request, Response, Router} from "express";
import {controlData} from "../data";

export const testingRouter = Router({})

//-------------------TESTING---------------//
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    controlData.deleteAllVideos()
    res.sendStatus(204)
})