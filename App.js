import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import comments from './src/Screens/comments';
import feed from './src/Screens/feed';
import SignUpScreen from './src/Screens/SignUpScreen';
import loginScreen from './src/Screens/loginScreen';
import profile from './src/Screens/profile';
import userProfile from './src/Screens/userProfile';
import upload from './src/Screens/upload';
import SearchScreen from './src/Screens/SearchScreen';
import MessagesScreen from './src/Screens/MessagesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';


const TabStack = createBottomTabNavigator(
  {
    Feed: { screen: feed},
    Upload: { screen: upload},
    Messages: {screen: MessagesScreen},
    Search: {screen: SearchScreen},
    Profile: { screen: profile}
  },

)

const MainStack = createStackNavigator(
  {
      Home: { screen: TabStack},
      Comments: { screen: comments},
      login: { screen: loginScreen},
      SignUp: { screen: SignUpScreen},
      User: { screen: userProfile},
  },
  {
  initialRouteName: 'login',
  mode: 'modal',
  headerMode: 'none',
  }
)

const App = createAppContainer(MainStack);

export default App;


