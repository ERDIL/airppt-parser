'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var expect = require('chai').expect;
let { AirParser } = require('../js/main.js');
//TO-DO: Write test for each shape and slide number and confirm
let pptParser = new AirParser('./sample.pptx');
waitForParsing();
function waitForParsing() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield pptParser.ParsePowerPoint(8);
        console.log(JSON.stringify(result));
    });
}
