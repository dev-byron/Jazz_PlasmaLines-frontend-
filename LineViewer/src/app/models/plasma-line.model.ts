import { PlasmaSection } from "./plasma-section.model";

export interface PlasmaLineConfig {
    code: string;
    viewType: string,
    lineType: string,
    time: string,
    imageUrl: string,
    createdDate: string,
    sections: PlasmaSection[]
}