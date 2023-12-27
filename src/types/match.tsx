import { ChampionName } from "../data/champion";

export type Match = {
  date: Date;
  players: string[][];
  champions: ChampionName[][];
  winners: "Blue"|"Red"
}