import { Button, HStack, Text, useTheme, VStack } from 'native-base'
import { X, Check } from 'phosphor-react-native'
import { getName } from 'country-list'
import dayjs from 'dayjs'

import { Team } from './Team'

interface BidProps {
  id: string
  gameId: string
  createdAt: string
  participantId: string
  firstTeamPoints: number
  secondTeamPoints: number
}

export interface MatchProps {
  id: string
  date: string
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  bid: null | BidProps
}

interface Props {
  data: MatchProps
  onBidConfirm: () => void
  setFirstTeamPoints: (value: string) => void
  setSecondTeamPoints: (value: string) => void
}

export function Match({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onBidConfirm,
}: Props) {
  const { colors, sizes } = useTheme()
  const date = dayjs(data.date).format('DD MMMM YYYY [at] h:mm A')
  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <HStack
        position="relative"
        w="full"
        justifyContent="space-between"
        pb={2}
      >
        <Text
          color="gray.100"
          fontFamily="heading"
          fontSize="sm"
          w="1/2"
          textAlign="center"
          alignItems="center"
          pr={3}
        >
          {getName(data.firstTeamCountryCode).length > 14
            ? data.firstTeamCountryCode
            : getName(data.firstTeamCountryCode)}
        </Text>
        <Text
          color="gray.100"
          fontFamily="heading"
          fontSize="sm"
          position="absolute"
          w="full"
          textAlign="center"
        >
          vs.
        </Text>
        <Text
          color="gray.100"
          fontFamily="heading"
          fontSize="sm"
          w="1/2"
          textAlign="center"
          alignItems="center"
          pl={3}
        >
          {getName(data.secondTeamCountryCode).length > 14
            ? data.secondTeamCountryCode
            : getName(data.secondTeamCountryCode)}
        </Text>
      </HStack>
      <Text color="gray.200" fontSize="xs">
        {date}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
        />
      </HStack>

      {!data.bid && (
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          onPress={onBidConfirm}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRM PREDICTION
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}
    </VStack>
  )
}
