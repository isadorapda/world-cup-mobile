import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Alert, Share } from 'react-native'
import { HStack, VStack } from 'native-base'
import { Header } from '../components/Header'
import { api } from '../services/api'
import { PollCardProps } from '../components/PollCard'
import { PollHeader } from '../components/PollHeader'
import { EmptyMyPollList } from '../components/EmptyMyPoolList'
import { Option } from '../components/Option'
import { Bids } from '../components/Bids'
import { Loading } from '../components/Loading'

interface RouteProps {
  id: string
}

export function Details() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isSelected, setIsSelected] = React.useState<'bids' | 'ranking'>('bids')
  const [details, setDetails] = React.useState<PollCardProps>(
    {} as PollCardProps
  )
  const route = useRoute()
  const { id } = route.params as RouteProps

  async function handleCodeShare() {
    await Share.share({
      message: details.code,
    })
  }

  async function fetchPollDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/polls/${id}`)
      setDetails(response.data.poll)
    } catch (error) {
      Alert.alert("Sorry, we couldn't load the poll's details")
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchPollDetails()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={details.title}
        showBackButton
        showShareButton
        handleCodeShare={handleCodeShare}
      />
      {details._count?.participants > 0 ? (
        <VStack flex={1} px={5} mb={84}>
          <PollHeader data={details} />
          <HStack bg="gray.800" rounded="sm" p={1} mb={5}>
            <Option
              title="Your predictions"
              isSelected={isSelected === 'bids'}
              onPress={() => setIsSelected('bids')}
            />
            <Option
              title="Ranking"
              isSelected={isSelected === 'ranking'}
              onPress={() => setIsSelected('ranking')}
            />
          </HStack>
          <Bids pollId={details.id} code={details.code} />
        </VStack>
      ) : (
        <EmptyMyPollList code={details.code} />
      )}
    </VStack>
  )
}
