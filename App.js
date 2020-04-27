import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import feed from './App/screens/feed';
import upload from './App/screens/upload';
import profile from './App/screens/profile';
import userProfile from './App/screens/userProfile';
import comments from './App/screens/comments';
import loginScreen from './App/screens/loginScreen';
import SignUpScreen from './App/screens/SignUpScreen';

const TabStack = createBottomTabNavigator(
  {
    feed: { screen: feed},
    Upload: { screen: upload},
    Profile: { screen: profile}
  }
)

const MainStack = createStackNavigator(
  {
      Home: { screen: TabStack},
      User: { screen: userProfile},
      Comments: { screen: comments},
      login: { screen: loginScreen},
      SignUp: { screen: SignUpScreen}
  },
  {
  initialRouteName: 'Home',
  mode: 'modal',
  headerMode: 'none',
  }
)

export default createAppContainer(MainStack);

