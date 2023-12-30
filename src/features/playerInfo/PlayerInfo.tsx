import { Heading, NativeTable, TableContainer, Tbody, Td, Th, Thead, Tr } from "@yamada-ui/react";
import { Player } from "../../types/player";

import { ratingColor } from "../../utils/rating";

interface RatingInfoProps{
  players: Player[];
}

export function PlayerInfo({players}: RatingInfoProps) {
  return (
    <>
      <Heading>プレイヤー</Heading>
      <TableContainer>
        <NativeTable>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>名前</Th>
              <Th isNumeric>レーティング</Th>
              <Th isNumeric>MAX</Th>
              <Th isNumeric>参加</Th>
              {["TOP", "JG", "MID", "ADC", "SUP"].map(lane => {
                return <Th key={lane} isNumeric>{lane}</Th>
              })}
              <Th isNumeric>勝利</Th>
              {["TOP", "JG", "MID", "ADC", "SUP"].map(lane => {
                return <Th key={lane} isNumeric>{lane}</Th>
              })}
            </Tr>
          </Thead>
          <Tbody>
            {players.sort((a, b) => b.rating-a.rating).map((player, index) => {
              const maxRating = Math.max(...player.ratingHistory);
              return <Tr key={index}>
                <Td>{index+1}</Td>
                <Td color={ratingColor(player.rating)} fontWeight="bold">{player.name}</Td>
                <Td isNumeric>{player.rating}</Td>
                <Td isNumeric>{maxRating}</Td>
                <Td isNumeric>{player.playCount[5]}</Td>
                {player.playCount.slice(0, 5).map((count, index) => {
                  return <Td key={`lane${index}`} isNumeric>{count}</Td>
                })}
                <Td isNumeric>{player.winCount[5]}</Td>
                {player.winCount.slice(0, 5).map((count, index) => {
                  return <Td key={`lane${index}`} isNumeric>{count}</Td>
                })}
              </Tr>
            })}
          </Tbody>
        </NativeTable>
      </TableContainer>
    </>
  );
}