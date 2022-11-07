import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import { New } from '../screens/New'
import { Polls } from '../screens/Polls'
import { Find } from '../screens/Find'
import { Details } from '../screens/Details'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, sizes } = useTheme()
  const size = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarLabelPosition: 'beside-icon',
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'ios' ? 0 : -10,
        },
        tabBarStyle: {
          position: 'absolute',
          height: 87,
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: 'New Poll',
        }}
      />
      <Screen
        name="polls"
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: 'My Polls',
        }}
      />
      <Screen
        name="find"
        component={Find}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}
