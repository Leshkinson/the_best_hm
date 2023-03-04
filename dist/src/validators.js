"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidBodyVideo = void 0;
const CONST_1 = require("./CONST");
const ENUM_1 = require("./ENUM");
const checkLength = (str, fieldName, length, arrErrors) => {
    if (str.length > length) {
        arrErrors.push({
            message: `Максимум ${length} символа.`,
            field: fieldName
        });
    }
};
const checkType = (field, fieldName, type, arrErrors) => {
    if (typeof field !== type) {
        arrErrors.push({
            message: ENUM_1.ERRORS.InvalidDatType,
            field: fieldName
        });
    }
};
const checkDate = (date, fieldName, arrErrors) => {
    if (!Date.parse(date)) {
        arrErrors.push({
            message: ENUM_1.ERRORS.WrongFormat,
            field: fieldName
        });
    }
};
const getErrorAboutEmpty = (fieldName, arrErrors) => {
    arrErrors.push({
        message: `Поле ${fieldName} отсутствует.`,
        field: fieldName
    });
};
const isValidBodyVideo = (body, method) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = body;
    let errorsMessages = [];
    if (['PUT', 'POST'].includes(method)) {
        if (title) {
            checkType(title, 'title', 'string', errorsMessages);
            checkLength(title, 'title', 40, errorsMessages);
        }
        else {
            getErrorAboutEmpty('title', errorsMessages);
        }
        if (author) {
            checkType(author, 'author', 'string', errorsMessages);
            checkLength(author, 'author', 20, errorsMessages);
        }
        else {
            getErrorAboutEmpty('author', errorsMessages);
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
        if (body.hasOwnProperty('canBeDownloaded')) {
            checkType(canBeDownloaded, 'canBeDownloaded', 'boolean', errorsMessages);
        }
        if (minAgeRestriction < 1 || minAgeRestriction > 18) {
            errorsMessages.push({
                message: ENUM_1.ERRORS.WrongSize,
                field: "minAgeRestriction"
            });
        }
        checkDate(publicationDate, 'publicationDate', errorsMessages);
    }
    return errorsMessages;
};
exports.isValidBodyVideo = isValidBodyVideo;
