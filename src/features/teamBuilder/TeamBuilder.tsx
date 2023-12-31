import { Button, Center, Checkbox, Flex, HStack, Heading, Text, VStack, Wrap } from "@yamada-ui/react";
import { Player } from "../../types/player";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";

interface TeamBuilderProps{
  players: Player[]
}

export function TeamBuilder({players}: TeamBuilderProps) {
  const [isChecked, updateIsChecked] = useImmer<{[key in string]: boolean}>({});
  const [teamBuildingResult, setTeamBuildingResult] = useState<string[][]>([[], []]);

  const buildTeam = () => {
    let checkedNames = [];
    for(let name in isChecked){
      if(isChecked[name]) checkedNames.push(name);
    }
    // ランダムに入れ替える
    checkedNames.sort((a, b) => 0.5 - Math.random());
    setTeamBuildingResult([checkedNames.slice(0, 5), checkedNames.slice(5)])
  }

  let checkedNamesCount = 0;
  for(let name in isChecked){
    if(isChecked[name]) checkedNamesCount++;
  }

  return (
    <>
      <Heading>チーム分けツール</Heading>
      <Text>参加するプレイヤーを10人選ぶ</Text>
      <Wrap p="md" gapY="md" gapX="lg" borderWidth="1" borderRadius="md">
        {players.map(player => {
          return <Checkbox
            key={player.name}
            isChecked={isChecked[player.name]}
            onChange={e => {updateIsChecked(draft =>{
              draft[player.name] = e.target.checked;
            })}}
            >
              {player.name}
            </Checkbox>
        })}
      </Wrap>
      <Flex justify="end">
        <Button disabled={checkedNamesCount!==10} onClick={buildTeam} colorScheme="primary">チームを分ける</Button>
      </Flex>
      <Center>
        <HStack>
          {teamBuildingResult.map((team, index) => {
            return <VStack key={index}>
              {team.map(name => {
                return <Text key={name}>{name}</Text>
              })}
            </VStack>
          })}
        </HStack>
      </Center>
    </>
  );
}
