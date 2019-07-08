import { expect } from 'chai';
import AirParser from './main';
const fs = require('fs');

//TO-DO: Write test for each shape and slide number and confirm
let pptParser = new AirParser(new File([''], './tests/sample.pptx'));

waitForParsing();

async function waitForParsing() {
  let result = await pptParser.ParsePowerPoint(8);
  console.log(JSON.stringify(result));
}
