import {Request, Response, Router} from "express";
import {removeAllStartDate} from "../data";

export const testingRouter = Router({})

//-------------------TESTING---------------//
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    removeAllStartDate()
    res.sendStatus(204)
})