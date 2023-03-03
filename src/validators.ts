import {BodyPutVideo, errorMessageType} from "./types";
import {arrValidResolution} from "./CONST";
import {ERRORS} from "./ENUM";

const checkLength = (str: string, fieldName: string, length: number, arrErrors: Array<errorMessageType>) => {
    if (str.length > length) {
        arrErrors.push({
            message: `Максимум ${length} символа.`,
            field: fieldName
        })
    }
}
const checkType = (field: any, fieldName: string, type: string, arrErrors: Array<errorMessageType>) => {
    if (typeof field !== type) {
        arrErrors.push({
            message: ERRORS.InvalidDatType,
            field: fieldName
        })
    }
}

const checkDate = (date: string, fieldName: string, arrErrors: Array<errorMessageType>) => {
    if (!Date.parse(date)) {
        arrErrors.push({
            message: ERRORS.WrongFormat,
            field: fieldName
        })
    }
}

const getErrorAboutEmpty = (fieldName: string, arrErrors: Array<errorMessageType>) => {
    arrErrors.push({
        message: `Поле ${fieldName} отсутствует.`,
        field: fieldName
    })
}


export const isValidBodyVideo = (body: BodyPutVideo, method: string) => {
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = body
    let errorsMessages: errorMessageType[] = []
    if (['PUT', 'POST'].includes(method)) {
        if (title) {
            checkType(title, 'title', 'string', errorsMessages)
            checkLength(title, 'title', 40, errorsMessages)
        } else {
            getErrorAboutEmpty('title', errorsMessages)
        }
        if (author) {
            checkType(author, 'author', 'string', errorsMessages)
            checkLength(author, 'author', 20, errorsMessages)
        } else {
            getErrorAboutEmpty('author', errorsMessages)
        }
        if (availableResolutions.length) {
            if (!availableResolutions.every(el => arrValidResolution.includes(el))) {
                errorsMessages.push({
                    message: ERRORS.InvalidPermissions,
                    field: "availableResolutions"
                })
            }
        } else {
            errorsMessages.push({
                message: ERRORS.EmptyArray,
                field: "availableResolutions"
            })
        }
    }
    if ('PUT' === method) {
        if (body.hasOwnProperty('canBeDownloaded')) {
            checkType(canBeDownloaded, 'canBeDownloaded', 'boolean', errorsMessages)
        }
        if (minAgeRestriction < 1 || minAgeRestriction > 18) {
            errorsMessages.push({
                message: ERRORS.WrongSize,
                field: "minAgeRestriction"
            })
        }
        checkDate(publicationDate, 'publicationDate', errorsMessages)
    }
    return errorsMessages
}