"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = require("../setting");
const port = 3002;
setting_1.app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
