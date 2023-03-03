import request from 'supertest'
import {app} from "../setting";
import {arrDataVideos} from "../src/data";
import {HTTP_STATUSES} from "../src/http_statuses";






describe('/videos', () => {

    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('should return videos[]', async () => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK200,[...arrDataVideos])
    })

})