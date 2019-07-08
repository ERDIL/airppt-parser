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
//handle all zip file actions here
const JSZip = require("jszip");
const xml2js = require("xml2js-es6-promise");
class ZipHandler {
    static loadZip(zipFile) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.zip.loadAsync(this.fileToBuffer(zipFile));
        });
    }
    static parseSlideAttributes(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            let presentationSlide = yield this.zipResult.file(fileName).async('text');
            let parsedPresentationSlide = yield xml2js(presentationSlide, {
                trim: true,
                preserveChildrenOrderForMixedContent: true
            });
            return parsedPresentationSlide;
        });
    }
    static getFileInZip(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = yield this.zipResult.file(fileName).async('base64');
            return file;
        });
    }
    static fileToBuffer(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let temporaryFileReader = new FileReader();
            return new Promise((resolve, reject) => {
                temporaryFileReader.onerror = () => {
                    temporaryFileReader.abort();
                    reject(new DOMException('Problem parsing input file.'));
                };
                temporaryFileReader.onload = function () {
                    resolve(this.result);
                };
                temporaryFileReader.readAsArrayBuffer(file);
            });
        });
    }
}
ZipHandler.zip = new JSZip();
exports.default = ZipHandler;
