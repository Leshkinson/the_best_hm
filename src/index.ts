import express from "express";
import bodyParser from "body-parser";
import {videosRouter} from "./routers/videos";
import {app} from "../setting";

const port = 3001




app.listen(port, () => {

    console.log(`http://localhost:${port}/`)
})