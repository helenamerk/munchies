import React from 'react';
import {createAppContainer} from 'react-navigation'; // 1.0.0-beta.27
import { createStackNavigator } from 'react-navigation-stack'

import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import DoneScreen from './screens/DoneScreen';
import MyWebViewScreen from './screens/MyWebViewScreen';
import OnboardingModals from './screens/OnboardingModals';
import colors from './config/colors';

// TODO:
import LoginScreen from './screens/LoginScreen';

const MainStack = createStackNavigator(
  {
    LoadingScreen: {
      screen: LoadingScreen,
    },
    HomeScreen: {
      screen: HomeScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    OnboardingModals: {
      screen: OnboardingModals,
    },
    DoneScreen: {
      screen: DoneScreen,
    },
  },
  {
    initialRouteName: 'LoadingScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.PURPLE,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

// use for modules potentially later
const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    // OnboardingModals: {
    //   screen: OnboardingModals,
    // },
    MyWebViewModal: {
      screen: MyWebViewScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
