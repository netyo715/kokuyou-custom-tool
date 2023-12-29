import { Player } from "../../types/player";

interface RatingInfoProps{
  players: Player[];
}

export function RatingInfo({players}: RatingInfoProps) {
  return (
    <>
      <p>UI実装中</p>
      {players.map((player, index) => {
        return <p key={index}>{player.name}: {player.rating}</p>
      })}
    </>
  );
}