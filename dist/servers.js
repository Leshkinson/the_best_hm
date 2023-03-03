"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidBodyVideo = void 0;
const CONST_1 = require("./CONST");
const ENUM_1 = require("./ENUM");
const isValidBodyVideo = (body, method) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = body;
    let errorsMessages = [];
    if (['PUT', 'POST'].includes(method)) {
        if (title) {
            if (typeof title !== 'string') {
                errorsMessages.push({
                    message: ENUM_1.ERRORS.InvalidDatType,
                    field: "title"
                });
            }
            if (title.length > 40) {
                errorsMessages.push({
                    message: "Максимум 40 символа.",
                    field: "title"
                });
            }
        }
        else {
            errorsMessages.push({
                message: "Поле title отсутствует.",
                field: "title"
            });
        }
        if (author) {
            if (typeof author !== 'string') {
                errorsMessages.push({
                    message: ENUM_1.ERRORS.InvalidDatType,
                    field: "author"
                });
            }
            if (author.length > 20) {
                errorsMessages.push({
                    message: "Максимум 20 символа.",
                    field: "author"
                });
            }
        }
        else {
            errorsMessages.push({
                message: "Поле title отсутствует.",
                field: "author"
            });
        }
        if (availableResolutions.length) {
            if (!availableResolutions.every(el => CONST_1.arrValidResolution.includes(el))) {
                errorsMessages.push({
                    message: ENUM_1.ERRORS.InvalidPermissions,
                    field: "availableResolutions"
                });
            }
        }
        else {
            errorsMessages.push({
                message: ENUM_1.ERRORS.EmptyArray,
                field: "availableResolutions"
            });
        }
    }
    if ('PUT' === method) {
        if (body.hasOwnProperty('canBeDownloaded') && typeof canBeDownloaded !== 'boolean') {
            errorsMessages.push({
                message: ENUM_1.ERRORS.InvalidDatType,
                field: "canBeDownloaded"
            });
        }
        if (minAgeRestriction < 1 || minAgeRestriction > 18) {
            errorsMessages.push({
                message: ENUM_1.ERRORS.WrongSize,
                field: "minAgeRestriction"
            });
        }
        if (!Date.parse(publicationDate)) {
            errorsMessages.push({
                message: ENUM_1.ERRORS.WrongFormat,
                field: "publicationDate"
            });
        }
    }
    return errorsMessages;
};
exports.isValidBodyVideo = isValidBodyVideo;
