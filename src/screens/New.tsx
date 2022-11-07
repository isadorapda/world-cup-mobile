import React from 'react'
import { Alert } from 'react-native'
import { Heading, VStack, Text /*, useToast*/ } from 'native-base'
import { Header } from '../components/Header'
import Logo from '../assets/logo.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { api } from '../services/api'

export function New() {
  const [newPoll, setNewPoll] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  // const toast = useToast()
  async function handleCreatePoll() {
    if (!newPoll.trim()) {
      // return toast.show({
      //   title: "Hold on! Poll's name is required.",
      //   placement: 'top',
      // })
      Alert.alert('Hold on!', "Poll's name is required.")
    }
    try {
      setIsLoading(true)

      await api.post('/polls', { title: newPoll.toUpperCase() })
      Alert.alert('Yay', 'Your poll was successfully created.')
      setNewPoll('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Create new poll" />
      <VStack m={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Create you own poll and share with your friends!
        </Heading>
        <Input
          mb={2}
          placeholder="Name your poll..."
          value={newPoll}
          onChangeText={setNewPoll}
        />
        <Button
          text="Create my poll"
          onPress={handleCreatePoll}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize="sm" px={10} mt={4} textAlign="center">
          After creating your poll, you'll get a code that can be used for
          inviting others to participate.
        </Text>
      </VStack>
    </VStack>
  )
}
