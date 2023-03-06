import {VideosType} from "./types";

export let arrDataVideos: Array<VideosType> = [
    {
        "id": '1',
        "title": "It is really funny video22",
        "author": "Jim Carry",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-03-02T10:43:11.595Z",
        "publicationDate": "2023-03-02T10:43:11.595Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        "id": '2',
        "title": "It is really crazy video",
        "author": "Ben Aflek",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-03-02T10:43:11.595Z",
        "publicationDate": "2023-03-02T10:43:11.595Z",
        "availableResolutions": [
            "B144"
        ]
    },
    {
        "id": '3',
        "title": "It is really strange video",
        "author": "Giliermo Deltoro",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-03-02T10:43:11.595Z",
        "publicationDate": "2023-03-02T10:43:11.595Z",
        "availableResolutions": [
            "R144"
        ]
    },
    {
        "id": '4',
        "title": "It is really mystic video",
        "author": "Giliermo Deltoro",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-03-02T10:43:11.595Z",
        "publicationDate": "2023-03-02T10:43:11.595Z",
        "availableResolutions": [
            "W144"
        ]
    },
]

export const controlData = {
    getAllVideos() {
        return arrDataVideos
    },
    getVideoById(id: string) {
        return arrDataVideos.find((it) => it.id === id)
    },
    createNewVideo(body: VideosType) {
        const newVideo = {
            id: (+(new Date())).toString(),
            title: body.title,
            author: body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toString(),
            publicationDate: "2023-03-02T10:43:11.595Z",
            availableResolutions: body.availableResolutions
        }
        arrDataVideos.push(newVideo)
        return newVideo
    },
    changeVideo(id: string, body: VideosType) {
        let video = arrDataVideos.find(it => it.id === id)
        if (video) {
            video.title = body.title
            video.author = body.author
            video.availableResolutions = body.availableResolutions
            video.canBeDownloaded = body.canBeDownloaded
            video.minAgeRestriction = body.minAgeRestriction
            video.publicationDate = body.publicationDate
        }
    },
    deleteVideoById(id: string) {
        if (arrDataVideos.find(it => it.id === id)) {
            arrDataVideos = arrDataVideos.filter(it => it.id !== id)
            return true
        } else {
            return false
        }
    },
    deleteAllVideos() {
        arrDataVideos = []
    }
}

