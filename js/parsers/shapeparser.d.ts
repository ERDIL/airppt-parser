import { PowerpointElement, ElementType, SpecialityType } from "airppt-models/pptelement";
/**
 * Parse the shape types and etc.
 */
export default class ShapeParser {
    static determineShapeType(prst: any): ElementType;
    static determineSpecialityType(element: any): SpecialityType;
    static extractShapeElements(element: any): PowerpointElement["shape"];
}
