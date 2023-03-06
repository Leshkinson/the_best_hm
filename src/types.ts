export type errorMessageType = {
    message: string
    field: string
}

export type BodyPutVideo = {
    title: string
    author: string
    availableResolutions: string[],
    "canBeDownloaded": boolean,
    "minAgeRestriction": number,
    "publicationDate": string
}
export type VideosType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null
    createdAt: string
    publicationDate: string
    availableResolutions: Array<string>
}

