import React, { useCallback } from 'react'
import { VStack, Icon, FlatList } from 'native-base'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { PollCard, PollCardProps } from '../components/PollCard'
import { api } from '../services/api'
import { Loading } from '../components/Loading'
import { EmptyPollList } from '../components/EmptyPoolList'

export function Polls() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [polls, setPolls] = React.useState<PollCardProps[]>([])
  async function fetchPolls() {
    try {
      setIsLoading(true)
      const response = await api.get('/polls')
      setPolls(response.data.polls)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPolls()
    }, [])
  )
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="My Polls" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          onPress={() => navigate('find')}
          text="Search poll with code"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
          px={5}
          mb={12}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPollList />}
        />
      )}
    </VStack>
  )
}
