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
//require("module-alias/register");
const ziphandler_1 = require("./helpers/ziphandler");
const elementparser_1 = require("./parsers/elementparser");
const format = require("string-template");
class AirParser {
    constructor(zipFile) {
        this.zipFile = zipFile;
    }
    ParsePowerPoint(slideNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            //open Powerpoint File
            yield ziphandler_1.default.loadZip(this.zipFile);
            let slideShowGlobals = yield ziphandler_1.default.parseSlideAttributes('ppt/presentation.xml');
            let slideShowTheme = yield ziphandler_1.default.parseSlideAttributes('ppt/theme/theme1.xml');
            let pptElementParser = new elementparser_1.default(slideShowGlobals, slideShowTheme);
            //only get slideAttributes for one slide and return as array
            let parsedSlideElements = yield this.getSlideElements(pptElementParser, slideNumber);
            let pptDetails = {
                slideShowGlobals,
                slideShowTheme,
                powerPointElements: parsedSlideElements,
                inputPath: this.zipFile.name
            };
            return pptDetails;
            //TO-DO: Add option to parse All Slides by Default
            //TO-DO: Return the total # as part of a meta property
        });
    }
    getSlideElements(PPTElementParser, slideNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            //Get all of Slide Shapes and Elements
            let slideAttributes = yield ziphandler_1.default.parseSlideAttributes(format('ppt/slides/slide{0}.xml', slideNumber));
            //Contains references to links,images and etc on a Slide
            let slideRelations = yield ziphandler_1.default.parseSlideAttributes(format('ppt/slides/_rels/slide{0}.xml.rels', slideNumber));
            //PROBLEM: Layering Order not Preserved, Shapes Render First, Need to fix
            let slideShapes = slideAttributes['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'] || [];
            let slideImages = slideAttributes['p:sld']['p:cSld'][0]['p:spTree'][0]['p:pic'] || [];
            let allSlideElements = slideShapes.concat(slideImages);
            let allParsedSlideElements = [];
            for (let slideElement of allSlideElements) {
                let pptElement = PPTElementParser.getProcessedElement(slideElement, slideRelations);
                //throwout any undrenderable content
                if (pptElement) {
                    allParsedSlideElements.push(pptElement);
                }
            }
            return allParsedSlideElements;
        });
    }
}
exports.default = AirParser;
