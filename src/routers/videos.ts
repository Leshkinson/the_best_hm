import {Request, Response, Router} from "express";
import {isValidBodyVideo} from "../validators";
import {HTTP_STATUSES} from "../http_statuses";
import {controlData} from "../data";


export const videosRouter = Router({})

//-------------------GET---------------//
videosRouter.get('/', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK200).send(controlData.getAllVideos())
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const findVideo = controlData.getVideoById(req.params.id)
    if (findVideo) {
        res.send(findVideo)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})

//-------------------DELETE---------------//
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = controlData.deleteVideoById(req.params.id)
    if (isDeleted) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})
//-------------------POST---------------//
videosRouter.post('/', (req: Request, res: Response) => {
    const arrErrors = isValidBodyVideo(req.body, 'POST')
    if (arrErrors.errorsMessages.length) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(arrErrors)
    } else {
        const newVideo = controlData.createNewVideo(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
    }

})

//-------------------PUT---------------//
videosRouter.put('/:id', (req: Request, res: Response) => {
    let video = controlData.getVideoById(req.params.id)
    if (video) {
        const arrErrors = isValidBodyVideo(req.body, 'PUT')
        if (arrErrors.errorsMessages.length) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send(arrErrors)
            return
        }
        controlData.changeVideo(req.params.id, req.body)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})

