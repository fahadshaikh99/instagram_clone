import React from 'react';
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




const TabStack = createBottomTabNavigator(
  {
    feed: { screen: feed},
    Upload: { screen: upload},
    Profile: { screen: profile},
    Messages: {screen: MessagesScreen},
    Search: {screen: SearchScreen}
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

const App = createAppContainer(MainStack);

export default App;

// function Home() {
//   return (
//     <Tab.Navigator initialRouteName="Feed" 
//       activeColor="orange"
//       style={{ backgroundColor: 'tomato' }}
//     >
//       <Tab.Screen name="Feed" component={feed}
//       options={{
//       tabBarLabel: 'Feed',
//       tabBarColor: 'white',
//       title:'home',
//     }}
//       />
//       <Tab.Screen name="Upload" component={upload}
//         options={{
//           tabBarLabel: 'Upload',
//           tabBarColor: 'white',
//         }}
//       />
//       <Tab.Screen name="Search" component={SearchScreen} 
//        options={{
//         tabBarLabel: 'Search',
//         tabBarColor: 'white',
//       }}
//       />
//       <Tab.Screen name="Messages" component={MessagesScreen} 
//        options={{
//         tabBarLabel: 'Messages',
//         tabBarColor: 'white',
//       }}
//       />
//       <Tab.Screen name="Profile" component={profile} 
//        options={{
//         tabBarLabel: 'More',
//         tabBarColor: 'white',
//       }}
//       />
//     </Tab.Navigator>
//   );
// }

// const App = () => {
//   return (
//     <NavigationContainer>
//        <Tab.Navigator initialRouteName="Feed" 
//       activeColor="orange"
//       style={{ backgroundColor: 'tomato' }}
//     >
//       <Tab.Screen name="Feed" component={feed}
//       options={{
//       tabBarLabel: 'Feed',
//       tabBarColor: 'white',
//       title:'home',
//     }}
//       />
//       <Tab.Screen name="Upload" component={upload}
//         options={{
//           tabBarLabel: 'Upload',
//           tabBarColor: 'white',
//         }}
//       />
//       <Tab.Screen name="Search" component={SearchScreen} 
//        options={{
//         tabBarLabel: 'Search',
//         tabBarColor: 'white',
//       }}
//       />
//       <Tab.Screen name="Messages" component={MessagesScreen} 
//        options={{
//         tabBarLabel: 'Messages',
//         tabBarColor: 'white',
//       }}
//       />
//       <Tab.Screen name="Profile" component={profile} 
//        options={{
//         tabBarLabel: 'More',
//         tabBarColor: 'white',
//       }}
//       />
//     </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
//       {/* <Stack.Navigator >
//         <Stack.Screen name="Home" component={Home()}
//         options={{
//          headerShown: false
//         }}
//         />
//         <Stack.Screen name="Signup" component={SignUpScreen}
//         options={{
//           headerShown: false
//          }}
//         />
        
//       </Stack.Navigator> */}
  

