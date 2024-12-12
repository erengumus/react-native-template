import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/tabs/HomeScreen';
import Tab2Screen from '../screens/tabs/Tab2Screen';
import Tab3Screen from '../screens/tabs/Tab3Screen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

// A constant function that defines icons
const getTabBarIcon = (routeName, color, size) => {
  let iconName;

  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Tab2':
      iconName = 'apps';
      break;
    case 'Tab3':
      iconName = 'star';
      break;
    case 'Profile':
      iconName = 'account';
      break;
    default:
      iconName = 'circle';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const HomeTab = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) =>
          getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: '#6200ea',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: t('home')}}
      />
      <Tab.Screen
        name="Tab2"
        component={Tab2Screen}
        options={{tabBarLabel: t('tab2')}}
      />
      <Tab.Screen
        name="Tab3"
        component={Tab3Screen}
        options={{tabBarLabel: t('tab3')}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: t('profile')}}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
