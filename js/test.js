"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
//TO-DO: Write test for each shape and slide number and confirm
let pptParser = new main_1.default('./sample.pptx');
waitForParsing();
function waitForParsing() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield pptParser.ParsePowerPoint(8);
        console.log(JSON.stringify(result));
    });
}
