import {Request, Response, Router} from "express";
import {arrDataVideos} from "../data";
import {isValidBodyVideo} from "../validators";
import {HTTP_STATUSES} from "../http_statuses";
export const videosRouter = Router({})

let arrVideos = arrDataVideos

//-------------------GET---------------//
videosRouter.get('/', (req:Request, res:Response) => {
    res.status(200).send(arrVideos)
})
videosRouter.get('/:id', (req:Request, res:Response) => {
    let id = req.params.id
    let findVideo = arrVideos.find((v) => v.id === id)
    if(findVideo){
        res.send(findVideo)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND)
    }
})

//-------------------DELETE---------------//
videosRouter.delete('/:id', (req:Request, res:Response) => {
    if(arrVideos.find(p=> p.id ===  req.params.id)){
        arrVideos = arrVideos.filter(p=> p.id !== req.params.id)
        res.send(HTTP_STATUSES.NO_CONTENT)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND)
    }
})
//-------------------POST---------------//
videosRouter.post('/', (req:Request, res:Response) => {
    const arrErrors = isValidBodyVideo(req.body, 'POST')
    if(arrErrors.length){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(arrErrors)
        return
    }
    const newProduct = {
        id: (+(new Date())).toString(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toString(),
        publicationDate: "2023-03-02T10:43:11.595Z",
        availableResolutions: req.body.availableResolutions
    }
    arrVideos.push(newProduct)

    res.status(HTTP_STATUSES.CREATED_201).send(newProduct)
})

//-------------------PUT---------------//
videosRouter.put('/:id', (req:Request, res:Response) => {
    let id = req.params.id
    let video = arrVideos.find(p=> p.id === id)
    if(video){
        const arrErrors = isValidBodyVideo(req.body, 'PUT')
        if(arrErrors.length){
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send(arrErrors)
            return
        }
            video.title = req.body.title
            video.author = req.body.author
            video.availableResolutions = req.body.availableResolutions
            video.canBeDownloaded = req.body.canBeDownloaded
            video.minAgeRestriction = req.body.minAgeRestriction
            video.publicationDate = req.body.publicationDate
            res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND)
    }
})
