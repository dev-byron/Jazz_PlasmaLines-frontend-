import { Section } from "./section.model";

export interface ConfigurationLine {
    id: string;
    code: string;
    name: string;
    viewType: string;
    lineType: string;
    viewTheme: string;
    screenTime: number;
    advertisingLapseTime: string;
    createdBy: any;
    time: string;
    createdDate: string;
    sections: Section[];
    advertisings: any
}