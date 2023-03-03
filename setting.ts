import express from "express";
import bodyParser from "body-parser";
import {videosRouter} from "./src/routers/videos";

export const app = express()

app.use(bodyParser.json())
app.use('/videos', videosRouter)