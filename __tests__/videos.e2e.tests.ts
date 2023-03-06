import request from 'supertest'
import {app} from "../setting";
import {HTTP_STATUSES} from "../src/http_statuses";
import {isValidBodyVideo} from "../src/validators";
import {BodyPutVideo, VideosType} from "../src/types";
import {ERRORS} from "../src/ENUM";
import {controlData} from "../src/data";

const testDataForPut = {
    "title": 'Karl Marx',
    "author": "Dia",
    "availableResolutions": ["P2160"],
    "canBeDownloaded": true,
    "minAgeRestriction": 17,
    "publicationDate": "2023-03-02T10:43:11.595Z"
}

const testDateForPost = {
    "title": "It is really interesting book",
    "author": "",
    "availableResolutions": [
        "P144"
    ]
}

describe('/videos', () => {

    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('GET, should return videos[]', async () => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK200, [...controlData.getAllVideos()])
    })

    it('POST, trying to create a video without an author', async () => {
        const arrErrors = isValidBodyVideo(testDateForPost as BodyPutVideo, 'POST')
        await request(app)
            .post('/videos')
            .send(testDateForPost)
            .expect(HTTP_STATUSES.BAD_REQUEST_400, arrErrors)
    })

    it('PUT, trying to change video with wrong id', async () => {
        await request(app)
            .put('/videos' + 111)
            .send(testDataForPut)
            .expect(HTTP_STATUSES.NOT_FOUND)
    })

    it('PUT, trying to change video with not valid title', async () => {
        await request(app)
            .put('/videos/' + 4)
            .send({...testDataForPut, title: 213})
            .expect(HTTP_STATUSES.BAD_REQUEST_400, {
                errorsMessages:
                    [{
                        message: ERRORS.InvalidDatType,
                        field: "title"
                    }]
            })
    })

    it('PUT, trying to change video with empty availableResolutions', async () => {
        await request(app)
            .put('/videos/' + 4)
            .send({...testDataForPut, availableResolutions: []})
            .expect(HTTP_STATUSES.BAD_REQUEST_400, {
                errorsMessages: [{
                    message: ERRORS.EmptyArray,
                    field: "availableResolutions"
                }]
            })
    })

    it('PUT, successful video change', async () => {
        await request(app)
            .put('/videos/' + 4)
            .send(testDataForPut)
            .expect(HTTP_STATUSES.NO_CONTENT)

        expect(controlData.getAllVideos().filter(el => el.id === '4')[0].title).toBe("Karl Marx")

    })

    it('DELETE, trying remove video with wrong id', async () => {
        const arrLength = controlData.getAllVideos().length
        await request(app)
            .delete('/videos/' + 111)
            .send(testDataForPut)
            .expect(HTTP_STATUSES.NOT_FOUND)

        await request(app)
            .get('/videos')
        expect(arrLength).toBe(arrLength)
    })

    it('DELETE, successful remove video', async () => {
        await request(app)
            .delete('/videos/' + 1)
            .send(testDataForPut)
            .expect(HTTP_STATUSES.NO_CONTENT)
    })
})