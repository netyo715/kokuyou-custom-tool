import { Match } from "../../types/match";

type MatchHistoryProps = {
  matches: Match[]
}

export function MatchHistory({matches}: MatchHistoryProps) {
  return (
    <>
    {matches.map((match, index) => {
      return <div key={index}>
        <span>{match.date.toDateString()}</span>
        {match.blue.players.map((player) => {
          return <span key={player}>{player}</span>
        })}
        {match.blue.champions.map((champion) => {
          return <span key={champion}>{champion}</span>
        })}
        {match.red.players.map((player) => {
          return <span key={player}>{player}</span>
        })}
        {match.red.champions.map((champion) => {
          return <span key={champion}>{champion}</span>
        })}
        <span>winners: {match.winners}</span>
      </div>   
    })}
    </>
  );
}
