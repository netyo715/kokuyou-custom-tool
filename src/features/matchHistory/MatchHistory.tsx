import { useLoading, useLocalStorage } from "@yamada-ui/react";
import axios from "axios";

export function MatchHistory() {
  const [dataURL, setDataURL, resetDataURL] = useLocalStorage<string>({
    key: "dataURL",
  });
  const { screen } = useLoading()
  const loadMatchData = async () => {
    if(dataURL===undefined){
      return;
    }
    
    screen.start();

    axios.get(dataURL!).then((response) => {
      console.log(response.data);
    }).catch(() => {

    }).finally(() => {
      screen.finish();
    });
  };
  return (
    <></>
  );
}
