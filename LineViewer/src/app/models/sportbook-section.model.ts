import { Schedule } from "./schedule.model";

export interface SportbookSection {
    sport: string;
    division: string;
    schedules: Schedule[]    
}