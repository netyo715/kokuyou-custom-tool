import { Card, Container, Divider, Flex, HStack, Text, VStack, useBreakpoint } from "@yamada-ui/react";
import { Match } from "../../types/match";

interface MatchHistoryProps {
  matches: Match[]
}

export function MatchHistory({matches}: MatchHistoryProps) {
  return (
    <VStack>
      {matches.map((match, index) => {
        return <MatchCard key={`match${index}`} match={match}/>
      })}
    </VStack>
  )
}

interface MatchCardProps {
  match: Match,
}

function MatchCard({match}: MatchCardProps){
  const breakpoint = useBreakpoint();
  return (
    <Card>
      <Flex h="113">
        <Container p="0" w="5xs" bg={match.winners==="Blue"?"blue.200":"red.200"}/>
        <Container px="md" w="3xs" >
          {match.date.getMonth()+1 + "/" + match.date.getDate()}
        </Container>
        <Divider orientation="vertical" variant="solid" />
        <Container py="1" px="2" gap="0" bg={match.winners==="Blue"?"yellow.50":""}>
          {match.blue.players.map((name, index) => {
            return (
              <HStack key={`blue${index}`}>
                <Text fontSize="sm" w="2xs" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{name}</Text>
                {breakpoint!=="sm"&&breakpoint!=="md"
                  ?<Text fontSize="sm" w="4xs" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{match.blue.champions[index]}</Text>  
                  :""
                }
              </HStack>
            );
          })}
        </Container>
        <Divider orientation="vertical" variant="dashed"/>
        <Container py="1" px="2" gap="0" bg={match.winners==="Red"?"yellow.50":""}>
          {match.red.players.map((name, index) => {
            return (
              <HStack key={`red${index}`}>
                <Text fontSize="sm" w="3xs" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{name}</Text>
                {breakpoint!=="sm"&&breakpoint!=="md"
                  ?<Text fontSize="sm" w="4xs" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{match.red.champions[index]}</Text>  
                  :""
                }
              </HStack>
            );
          })}
        </Container>
      </Flex>
    </Card>
  );
}