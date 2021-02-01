import { PlasmaEvent } from "./plasma-event.model";

export interface PlasmaSection {
    name: string, 
    imageUrl: string, 
    events: PlasmaEvent[]
}