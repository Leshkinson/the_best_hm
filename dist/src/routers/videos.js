"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const validators_1 = require("../validators");
const http_statuses_1 = require("../http_statuses");
const data_1 = require("../data");
exports.videosRouter = (0, express_1.Router)({});
//let arrVideo = arrDataVideos
//-------------------GET---------------//
exports.videosRouter.get('/', (req, res) => {
    res.status(200).send(data_1.arrDataVideos);
});
exports.videosRouter.get('/:id', (req, res) => {
    let id = req.params.id;
    let findVideo = data_1.arrDataVideos.find((v) => v.id === id);
    if (findVideo) {
        res.send(findVideo);
    }
    else {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND);
    }
});
//-------------------DELETE---------------//
exports.videosRouter.delete('/:id', (req, res) => {
    if (data_1.arrDataVideos.find(p => p.id === req.params.id)) {
        (0, data_1.changeStartDate)(data_1.arrDataVideos.filter(p => p.id !== req.params.id));
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT);
    }
    else {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND);
    }
});
//-------------------POST---------------//
exports.videosRouter.post('/', (req, res) => {
    const arrErrors = (0, validators_1.isValidBodyVideo)(req.body, 'POST');
    if (arrErrors.length) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(arrErrors);
        return;
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
    };
    (0, data_1.addedNewVideo)(newProduct);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newProduct);
});
//-------------------PUT---------------//
exports.videosRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    let video = data_1.arrDataVideos.find(p => p.id === id);
    if (video) {
        const arrErrors = (0, validators_1.isValidBodyVideo)(req.body, 'PUT');
        if (arrErrors.length) {
            res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send(arrErrors);
            return;
        }
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate;
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT);
    }
    else {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND);
    }
});
