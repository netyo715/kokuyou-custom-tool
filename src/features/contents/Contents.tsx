import { Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs, useLoading, useLocalStorage, useNotice } from "@yamada-ui/react";
import axios from "axios";
import { Settings } from "../settings/Settings";
import { useEffect, useState } from "react";
import { Match } from "../../types/match";
import { MatchHistory } from "../matchHistory/MatchHistory";
import { Player } from "../../types/player";
import { PlayerInfo } from "../playerInfo/PlayerInfo";
import { calculateRating } from "../../utils/rating";
import { TeamBuilder } from "../teamBuilder/TeamBuilder";

export function Contents() {
  const [dataURL] = useLocalStorage<string>({
    key: "dataURL",
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isEndInitialize, setIsEndInitialize] = useState<Boolean>(false);
  const [isLoadMatchSuccess, setIsLoadMatchSuccess] = useState<Boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(2);
  const notice = useNotice();

  const { screen } = useLoading()

  useEffect(() => {
    const dataURLOnChange = async () => {
      const isFetchSuccess = await loadMatchData();
      if (!isEndInitialize&&isFetchSuccess) setTabIndex(0);
      setIsEndInitialize(true);
    };
    if(dataURL){
      dataURLOnChange();
    }else{
      setIsLoadMatchSuccess(false);
    }
  }, [dataURL]);

  const loadMatchData = async () => {
    screen.start();

    let data: string[] = [];
    await axios.get(dataURL!).then((response) => {
      data = response.data;
      setMatches(response.data);
      setIsLoadMatchSuccess(true);
      notice({
        title: "データ取得",
        description: "試合データの取得に成功しました",
        status: "success",
        placement: "top-right",
      });
    }).catch(() => {
      setIsLoadMatchSuccess(false);
      setTabIndex(2);
      notice({
        title: "データ取得",
        description: "試合データの取得に失敗しました",
        status: "warning",
        placement: "top-right",
      });
      return false;
    }).finally(() => {
      screen.finish();
    });

    try{
      const matchData = data.map((row, index) => {
        return {
          date: new Date(row[0]),
          blue: {
            players: [
              row[1], row[3], row[5], row[7], row[9],
            ],
            champions: [
              row[2], row[4], row[6], row[8], row[10],
            ]
          },
          red: {
            players: [
              row[11], row[13], row[15], row[17], row[19],
            ],
            champions: [
              row[12], row[14], row[16], row[18], row[20],
            ]
          },
          winners: row[21],
        } as Match;
      });
      setMatches(matchData);
      setPlayers(calculateRating(matchData));
    }catch{
      setTabIndex(2);
      notice({
        title: "データ取得",
        description: "試合データの処理に失敗しました",
        status: "warning",
        placement: "top-right",
      });
      return false;
    }
    return true;
  };

  return (
    <Center bg="neutral.50" h="100dvh">
      <Container bg="white" p="0" h="full" w="full" maxW="1080px">
        <Tabs h="full" index={tabIndex} onChange={setTabIndex}>
          <TabList h="41px">
            <Tab isDisabled={!isLoadMatchSuccess} >対戦履歴</Tab>
            <Tab isDisabled={!isLoadMatchSuccess} >プレイヤー</Tab>
            <Tab isDisabled={!isLoadMatchSuccess} >チーム分け</Tab>
            <Tab>設定</Tab>
          </TabList>
          <TabPanels h="calc(100% - 41px)" overflowY="scroll">
            <TabPanel>
              <MatchHistory matches={matches}/>
            </TabPanel>
            <TabPanel>
              <PlayerInfo players={players}/>
            </TabPanel>
            <TabPanel>
              <TeamBuilder players={players}/>
            </TabPanel>
            <TabPanel>
              <Settings/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Center>
  );
}
