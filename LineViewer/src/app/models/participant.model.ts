import { Line } from "./line.model";

export interface Participant {
    rotationNumber: string;
    name: string;         
    line: Line;
}