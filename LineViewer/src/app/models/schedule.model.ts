import { Game } from "./game.model";

export interface Schedule {
    id: number;
    date: string;
    sport: string;
    division: string;
    title: string;
    games: Game[];
    imageUrl: string; 
    touched: boolean;
}