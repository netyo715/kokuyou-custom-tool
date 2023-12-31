import { Button, Center, Checkbox, Flex, HStack, Heading, Text, VStack, Wrap } from "@yamada-ui/react";
import { Player } from "../../types/player";
import { useImmer } from "use-immer";
import { useState } from "react";

interface TeamBuilderProps{
  players: Player[]
}

export function TeamBuilder({players}: TeamBuilderProps) {
  const [isChecked, updateIsChecked] = useImmer<{[key in string]: boolean}>({});
  const [teamBuildingResult, setTeamBuildingResult] = useState<string[][]>([[], []]);

  const buildTeam = (names: string[]) => {
    // ランダムに入れ替える
    const sortedNames = [...names].sort(() => 0.5 - Math.random());
    setTeamBuildingResult([sortedNames.slice(0, 5), sortedNames.slice(5)])
  }

  const bulidTeamOnClick = () => {
    let names = [];
    for(let name in isChecked){
      if(isChecked[name]) names.push(name);
    }
    let guestCount = 10-names.length;
    for (let i = 1; i <= guestCount; i++) {
      names.push(`ゲストユーザー ${i}`);
    }
    buildTeam(names);
  }

  let checkedNamesCount = 0;
  for(let name in isChecked){
    if(isChecked[name]) checkedNamesCount++;
  }

  return (
    <>
      <Heading>チーム分けツール</Heading>
      <Text>参加するプレイヤーを選ぶ</Text>
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
        <Button disabled={checkedNamesCount>10} onClick={bulidTeamOnClick} colorScheme="primary">チームを分ける</Button>
      </Flex>
      <Center>
        <HStack>
          {teamBuildingResult.map((team, index) => {
            return <VStack key={index}>
              <Text fontWeight="bold">チーム {index+1}</Text>
              {team.map(name => {
                return <Text key={name} w="xs">{name}</Text>
              })}
            </VStack>
          })}
        </HStack>
      </Center>
    </>
  );
}
