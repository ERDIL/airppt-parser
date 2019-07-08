//handle all zip file actions here
import * as JSZip from 'jszip';
import * as xml2js from 'xml2js-es6-promise';

export default class ZipHandler {
  private static zip = new JSZip();
  private static zipResult: JSZip;

  public static async loadZip(zipFile: File): Promise<Boolean> {
    return await this.zip.loadAsync(this.fileToBuffer(zipFile));
  }

  public static async parseSlideAttributes(fileName) {
    let presentationSlide = await this.zipResult.file(fileName).async('text');
    let parsedPresentationSlide = await xml2js(presentationSlide, {
      trim: true,
      preserveChildrenOrderForMixedContent: true
    });

    return parsedPresentationSlide;
  }

  public static async getFileInZip(fileName) {
    let file = await this.zipResult.file(fileName).async('base64');
    return file;
  }

  private static async fileToBuffer(file) {
    let temporaryFileReader = new FileReader();
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = function() {
        resolve(this.result);
      };
      temporaryFileReader.readAsArrayBuffer(file);
    });
  }
}
