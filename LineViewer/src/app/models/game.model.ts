import { Participant } from "./participant.model";
import { Total } from "./total.model";

export interface Game {
    id: string;
    time: string;
    participants: Participant[];
    total: Total;
  }