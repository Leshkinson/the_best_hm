"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const data_1 = require("../data");
exports.testingRouter = (0, express_1.Router)({});
//-------------------TESTING---------------//
exports.testingRouter.delete('/all-data', (req, res) => {
    (0, data_1.removeAllStartDate)();
    res.sendStatus(204);
});
