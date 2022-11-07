import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base'

interface Props extends IButtonProps {
  text: string
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({ text, type = 'PRIMARY', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      mt={12}
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.600' : 'yellow.600',
      }}
      _loading={{ _spinner: { color: 'black' } }}
      {...rest}
    >
      <Text
        textTransform="uppercase"
        color={type === 'SECONDARY' ? 'white' : 'black'}
        fontSize="sm"
        fontFamily="heading"
      >
        {text}
      </Text>
    </ButtonNativeBase>
  )
}
