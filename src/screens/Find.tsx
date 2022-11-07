import { Heading, VStack, useToast } from 'native-base'
import { Alert } from 'react-native'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import React from 'react'
import { api } from '../services/api'
import { useNavigation } from '@react-navigation/native'

export function Find() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [code, setCode] = React.useState<string>('')
  const { navigate } = useNavigation()

  const toast = useToast()

  async function hendleFindPoll() {
    try {
      setIsLoading(true)
      if (!code.trim()) {
        Alert.alert('Code is required.')
      }
      await api.post('/polls/join', { code })
      toast.show({
        title: "GOAL! You've joined the poll successfully",
      })
      navigate('polls')
    } catch (error) {
      setIsLoading(false)
      if (
        error.response?.data?.message ===
        'Sorry, no poll match this code. Try a different one.'
      ) {
        return Alert.alert(`${error.response.data.message}`)
      }
      if (error.response?.data?.message === `You've already joined this poll`) {
        return Alert.alert(`${error.response.data.message}`)
      }
      throw error
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Search with code" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Search a poll by using {'\n'} your personal code
        </Heading>
        <Input
          mb={2}
          placeholder="Poll's code..."
          autoCapitalize="characters"
          maxLength={6}
          onChangeText={setCode}
        />
        <Button
          text="Search poll"
          onPress={hendleFindPoll}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
