import { Section } from "./section.model";

export interface ConfigurationLine {
    id: string;
    code: string;
    viewType: string,
    lineType: string,
    time: string,
    createdDate: string,
    sections: Section[]
}