import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import LoadingScreen from "./component/loadingScreen";
import BottomTabBarScreen from "./component/bottomTabBarScreen";
import NotificationScreen from "./screens/notification/notificationScreen";
import AccountSettingsScreen from "./screens/accountSetting/accountSettingsScreen";
import SigninScreen from "./screens/auth/signinScreen";
import OnBoardingScreen from "./screens/onBoarding/onBoardingScreen";
import SplashScreen from "./screens/splashScreen";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="SignIn" component={SigninScreen} />
        <Stack.Screen name="BottomTabScreen" component={BottomTabBarScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="AccountSetting" component={AccountSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;