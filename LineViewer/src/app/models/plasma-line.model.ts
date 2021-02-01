import { PlasmaSection } from "./plasma-section.model";

export interface PlasmaLine {
    code: string;
    viewType: string, //change to enum
    lineType: string, //change to enum
    time: string,
    imageUrl: string,
    createdDate: string,
    sections: PlasmaSection[]
}