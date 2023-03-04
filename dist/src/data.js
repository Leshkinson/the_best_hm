"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addedNewVideo = exports.changeStartDate = exports.removeAllStartDate = exports.arrDataVideos = void 0;
exports.arrDataVideos = [
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
];
const removeAllStartDate = () => {
    exports.arrDataVideos = [];
};
exports.removeAllStartDate = removeAllStartDate;
const changeStartDate = (data) => {
    exports.arrDataVideos = data;
};
exports.changeStartDate = changeStartDate;
const addedNewVideo = (video) => {
    exports.arrDataVideos.push(video);
};
exports.addedNewVideo = addedNewVideo;
