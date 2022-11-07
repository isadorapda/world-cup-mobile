import React from 'react'
import { Center, Text, Icon } from 'native-base'
import { Fontisto } from '@expo/vector-icons'
import { useAuth } from '../hooks/useAuth'
import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'

export function Signin() {
  const { signIn, isUserLoading } = useAuth()

  return (
    <Center flex={1} bgColor="gray.900">
      <Logo width={212} height={40} />
      <Button
        type="SECONDARY"
        text="Login with Google"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: 'white' } }}
      />
      <Text color="white" textAlign="center" width="4/5" mt={4}>
        We do not use any other personal information other than your e-mail to
        create your account.
      </Text>
    </Center>
  )
}
