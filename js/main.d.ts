import { PowerpointDetails } from 'airppt-models/pptdetails';
export default class AirParser {
    private zipFile;
    constructor(zipFile: File);
    ParsePowerPoint(slideNumber: number): Promise<PowerpointDetails>;
    private getSlideElements;
}
