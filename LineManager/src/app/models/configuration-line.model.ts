import { Section } from "./section.model";

export interface ConfigurationLine {
    id: string;
    code: string;
    name: string;
    viewType: string;
    lineType: string;
    useAlternativeCodes: boolean;
    viewTheme: string;
    screenTime: number;
    advertisingLapseTime: number;
    createdBy: any;
    time: string;
    showOnlyNextEvents: boolean,
    createdDate: string;
    sections: Section[];
    advertisings: any
}