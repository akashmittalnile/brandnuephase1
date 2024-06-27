/**
 * @format
 */
//import : react components
import React from 'react';
import {AppRegistry} from 'react-native';
//import : app file
import App from './App';
import {name as appName} from './app.json';
// //import : third parties
// import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

// //add this line to register the TrackPlayer
// TrackPlayer.registerPlaybackService(() => require('./service.js'));
