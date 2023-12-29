import { ChampionName } from "../data/champion";

export type Match = {
  date: Date;
  blue: {
    players: string[],
    champions: ChampionName[],
  };
  red: {
    players: string[],
    champions: ChampionName[],
  };
  winners: "Blue"|"Red"
}