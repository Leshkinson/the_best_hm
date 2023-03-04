import express from "express";
import bodyParser from "body-parser";
import {videosRouter} from "./src/routers/videos";
import {testingRouter} from "./src/routers/testing";

export const app = express()

app.use(bodyParser.json())
app.use('/videos', videosRouter)
app.use('/testing', testingRouter)