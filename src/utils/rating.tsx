import { Rating, TrueSkill, expose } from "ts-trueskill";
import { Match } from "../types/match";
import { Player } from "../types/player";

export const calculateRating = (matches: Match[]) => {
  let trueskill = new TrueSkill();
  trueskill.drawProbability = 0;

  let ratings: {[player: string]: Rating} = {};
  matches.forEach((match => {
    let blueRatings = match.blue.players.map(player => {
      if (player in ratings === false) ratings[player] = new Rating();
      return ratings[player];
    });
    let redRatings = match.red.players.map(player => {
      if (player in ratings === false) ratings[player] = new Rating();
      return ratings[player];
    });

    const [updatedBlueRatings, updatedRedRatings]: Rating[][] = trueskill.rate([blueRatings, redRatings], match.winners==="Blue"?[0, 1]:[1, 0]);
    
    match.blue.players.forEach((player, index) => {
      ratings[player] = updatedBlueRatings[index];
    });
    match.red.players.forEach((player, index) => {
      ratings[player] = updatedRedRatings[index];
    });
  }));

  let result: Player[] = [];
  for(let player in ratings){
    let rating = expose(ratings[player])*400;
    if(rating < 400) rating = 400/Math.exp((400-rating)/400)
    result.push({
      name: player,
      rating: Math.floor(rating),
    })
  }

  return result;
}