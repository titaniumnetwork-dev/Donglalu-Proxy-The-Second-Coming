"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const sourceRandomization_1 = require("./controllers/sourceRandomization");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const dir_build = path.join(__dirname, 'static');
const pages = {
    'index': 'index.html',
    'test': 'test.html'
};
app.get('/:page?', async (req, res) => {
    const page = req.params.page || 'index';
    try {
        if (typeof dir_build === 'string' && typeof pages[page] === 'string') {
            const filePath = path.join(dir_build, pages[page]);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const paintedContents = await (0, sourceRandomization_1.paintSource)(fileContents);
            res.send(paintedContents);
        }
        else {
            res.status(500).send('Something went wrong');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});
app.use(express_1.default.static(dir_build));
app.listen(port, () => console.log("DLPCC is now up on " + port + ". Be sure to join our Discord at discord.gg/unblock!"));
//# sourceMappingURL=index.js.map