import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import feed from './App/screens/feed';
import upload from './App/screens/upload';
import profile from './App/screens/profile';

const Main = createBottomTabNavigator(
  {
    feed: { screen: feed},
    Upload: { screen: upload},
    Profile: { screen: profile}
  }
)

export default createAppContainer(Main);