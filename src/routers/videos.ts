import {Request, Response, Router} from "express";
import {isValidBodyVideo} from "../validators";
import {HTTP_STATUSES} from "../http_statuses";
import {addedNewVideo, arrDataVideos, changeStartDate} from "../data";


export const videosRouter = Router({})
//let arrVideo = arrDataVideos


//-------------------GET---------------//
videosRouter.get('/', (req:Request, res:Response) => {
    res.status(200).send(arrDataVideos)
})
videosRouter.get('/:id', (req:Request, res:Response) => {
    let id = req.params.id
    let findVideo = arrDataVideos.find((v) => v.id === id)
    if(findVideo){
        res.send(findVideo)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})

//-------------------DELETE---------------//
videosRouter.delete('/:id', (req:Request, res:Response) => {
    if(arrDataVideos.find(p=> p.id ===  req.params.id)){
        changeStartDate(arrDataVideos.filter(p=> p.id !== req.params.id))
        res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
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
    addedNewVideo(newProduct)

    res.status(HTTP_STATUSES.CREATED_201).send(newProduct)
})

//-------------------PUT---------------//
videosRouter.put('/:id', (req:Request, res:Response) => {
    let id = req.params.id
    let video = arrDataVideos.find(p=> p.id === id)
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
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
    }
})

