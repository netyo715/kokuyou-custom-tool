import { Tab, TabPanel, Tabs, useLoading, useLocalStorage, useNotice } from "@yamada-ui/react";
import axios from "axios";
import { Settings } from "../settings/Settings";
import { useEffect, useState } from "react";
import { Match } from "../../types/match";
import { MatchHistory } from "../matchHistory/MatchHistory";

export function Contents() {
  const [dataURL, setDataURL, resetDataURL] = useLocalStorage<string>({
    key: "dataURL",
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [isEndInitialize, setIsEndInitialize] = useState<Boolean>(false);
  const [isLoadMatchSuccess, setIsLoadMatchSuccess] = useState<Boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(2);
  const notice = useNotice();

  const { screen } = useLoading()

  useEffect(() => {
    const loadMatchData = async () => {
      await fetchMatchData(!isEndInitialize);
      setIsEndInitialize(true);
    };
    if(dataURL) loadMatchData();
  }, [dataURL]);

  const fetchMatchData = async (changeTab?: boolean) => {
    let isLoadSuccess = false;
    screen.start();

    await axios.get(dataURL!).then((response) => {
      setMatches(response.data);
      setIsLoadMatchSuccess(true);
      setTabIndex(0);
      notice({
        title: "データ取得",
        description: "試合データの取得に成功しました",
        status: "success",
        placement: "top-right",
      });
      isLoadSuccess = true;
    }).catch(() => {
      setIsLoadMatchSuccess(false);
      setTabIndex(2);
      notice({
        title: "データ取得",
        description: "試合データの取得に失敗しました",
        status: "warning",
        placement: "top-right",
      });
    }).finally(() => {
      screen.finish();
    });
    return isLoadSuccess;
  };

  return (
    <main>
      <Tabs index={tabIndex} onChange={setTabIndex}>
        <Tab isDisabled={!isLoadMatchSuccess} >対戦履歴</Tab>
        <Tab isDisabled={!isLoadMatchSuccess} >レーティング</Tab>
        <Tab>設定</Tab>
        <TabPanel>
          <MatchHistory matches={matches}/>
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel>
          <Settings/>
        </TabPanel>
      </Tabs>
    </main>
  );
}
