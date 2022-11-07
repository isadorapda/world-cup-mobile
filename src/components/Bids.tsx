import { FlatList } from 'native-base'
import React from 'react'
import { Alert } from 'react-native'
import { api } from '../services/api'
import { EmptyMyPollList } from './EmptyMyPoolList'
import { Loading } from './Loading'
import { Match, MatchProps } from './Match'

interface Props {
  pollId: string
  code: string
}

export function Bids({ pollId, code }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [match, setMatch] = React.useState<MatchProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = React.useState('')
  const [secondTeamPoints, setSecondTeamPoints] = React.useState('')
  async function fetchGames() {
    try {
      setIsLoading(true)
      const response = await api.get(`/polls/${pollId}/matches`)
      setMatch(response.data.matches)
    } catch (error) {
      Alert.alert("Sorry, we couldn't load the match's details")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleBidConfirm(matchId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return Alert.alert('What is your prediction for this match?')
      }
      await api.post(`/polls/${pollId}/matches/${matchId}/bids`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })
      Alert.alert('Done!', 'Your bids were confirmed.')

      fetchGames()
    } catch (error) {
      return Alert.alert(
        'Sorry',
        'We could not confirm your bid for the match.'
      )
    }
  }

  React.useEffect(() => {
    fetchGames()
  }, [pollId])

  if (isLoading) {
    return <Loading />
  }
  return (
    <FlatList
      data={match}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Match
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onBidConfirm={() => {
            handleBidConfirm(item.id)
          }}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />}
    />
  )
}
