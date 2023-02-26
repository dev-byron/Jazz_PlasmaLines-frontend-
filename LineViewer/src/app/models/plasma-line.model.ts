import { Advertising } from "./advertising.model";
import { PlasmaSection } from "./plasma-section.model";

export interface PlasmaLineConfig {
    code: string;
    name: string;
    viewType: string;
    lineType: string;
    viewTheme: string;
    useAlternativeCodes: boolean;
    time: number;
    screenTime: number;
    advertisingLapseTime: number;
    showOnlyNextEvents: boolean;
    advertisings: Advertising[];
    createdDate: string,
    sections: PlasmaSection[]
}