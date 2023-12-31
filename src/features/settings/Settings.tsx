import { Button, Heading, Text, useLocalStorage, HStack, VStack, Input, Flex, Dialog, useDisclosure, useNotice } from "@yamada-ui/react";
import { useEffect, useState } from "react";

export function Settings() {
  const [dataURL, setDataURL, resetDataURL] = useLocalStorage<string>({
    key: "dataURL",
  });
  const [dataURLInput, setDataURLInput] = useState<string>("");
  const notice = useNotice();
  const { isOpen, onOpen, onClose } = useDisclosure({
    
  });

  useEffect(() => {
    setDataURLInput(dataURL??"");
  }, [dataURL])

  const onSaveDataURL = () => {
    setDataURL(dataURLInput);
    notice({
      title: "データ取得URLの保存",
      description: "保存が完了しました",
      status: "success",
      placement: "top-right",
    });
  };

  const resetAllLocalStrage = () => {
    resetDataURL();
  }

  return (
    <>
      <Flex direction="column" gap="md">
        <VStack>
          <Heading>データ取得URL</Heading>
          <HStack>
            <Input placeholder="データ取得URL" value={dataURLInput} onChange={(e) => setDataURLInput(e.target.value)} />
            <Button onClick={onSaveDataURL} colorScheme="primary">保存して更新</Button>
          </HStack>
        </VStack>
        <VStack>
          <Button onClick={onOpen} colorScheme="danger">全てのデータを削除する</Button>
          <Dialog
            isOpen={isOpen}
            header="全てのデータを削除"
            cancel="キャンセル"
            success={{ colorScheme: "danger", children: "削除" }}
            onClose={onClose}
            onSuccess={() => {
              resetAllLocalStrage();
              onClose();
            }}
          >
            <Text>削除を実行すると、このブラウザに保存された試合データと設定を全て削除します。</Text>
          </Dialog>
        </VStack>
      </Flex>
    </>
  );
}
