export default class ZipHandler {
    private static zip;
    private static zipResult;
    static loadZip(zipFile: File): Promise<Boolean>;
    static parseSlideAttributes(fileName: any): Promise<any>;
    static getFileInZip(fileName: any): Promise<any>;
    private static fileToBuffer;
}
