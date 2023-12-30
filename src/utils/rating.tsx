import { Rating, TrueSkill, expose } from "ts-trueskill";
import { Match } from "../types/match";
import { Player } from "../types/player";

export const calculateRating = (matches: Match[]) => {
  let trueskill = new TrueSkill();
  trueskill.drawProbability = 0;

  let ratings: {[player: string]: Rating} = {};
  let playerInfos: {[player: string]: {
    ratingHistory: number[],
    playCount: number[],
    winCount: number[],
  }} = {};

  // 全ユーザーのレート初期化
  matches.forEach(match => {
    match.blue.players.forEach(player => {
      if (player in ratings === false) {
        ratings[player] = new Rating();
        playerInfos[player] = {
          ratingHistory: [],
          playCount: [0, 0, 0, 0, 0, 0],
          winCount: [0, 0, 0, 0, 0, 0],
        };
      }
    });
    match.red.players.forEach(player => {
      if (player in ratings === false) {
        ratings[player] = new Rating();
        playerInfos[player] = {
          ratingHistory: [],
          playCount: [0, 0, 0, 0, 0, 0],
          winCount: [0, 0, 0, 0, 0, 0],
        };
      }
    });
  });

  // 試合毎にレート計算とレーン別試合数集計
  matches.forEach(match => {
    let blueRatings = match.blue.players.map(player => ratings[player]);
    let redRatings = match.red.players.map(player => ratings[player]);

    const [updatedBlueRatings, updatedRedRatings]: Rating[][] = trueskill.rate([blueRatings, redRatings], match.winners==="Blue"?[0, 1]:[1, 0]);
    
    match.blue.players.forEach((player, index) => {
      let info = playerInfos[player];
      ratings[player] = updatedBlueRatings[index];
      info.playCount[index] += 1;
      info.playCount[5] += 1;
      if(match.winners==="Blue"){
        info.winCount[index] += 1;
        info.winCount[5] += 1;
      }
    });
    match.red.players.forEach((player, index) => {
      let info = playerInfos[player];
      ratings[player] = updatedRedRatings[index];
      info.playCount[index] += 1;
      info.playCount[5] += 1;
      if(match.winners==="Red"){
        info.winCount[index] += 1;
        info.winCount[5] += 1;
      }
    });

    for(let player in ratings){
      playerInfos[player].ratingHistory.push(correctredRating(ratings[player]));
    }
  });

  // Playerオブジェクトにして返す
  let result: Player[] = [];
  for(let player in ratings){
    result.push({
      name: player,
      rating: correctredRating(ratings[player]),
      ...playerInfos[player],
    });
  }

  return result;
}

const correctredRating = (rating: Rating) => {
  let ret = expose(rating)*400;
  if(ret >= 400) return Math.floor(ret);
  return Math.floor(400/Math.exp((400-ret)/400));
}

export const ratingColor = (rating: number) => {
  if(rating < 400) return "neutral.950";
  if(rating < 800) return "orange.800";
  if(rating < 1200) return "green.800";
  if(rating < 1600) return "cyan.400";
  if(rating < 2000) return "blue.700";
  if(rating < 2400) return "yellow.600";
  if(rating < 2800) return "orange.600";
  if(rating < 3200) return "red.600";
  if(rating < 3600) return "emerald.400";
  if(rating < 4000) return "fuchsia.500";
  return "purple.700";
}