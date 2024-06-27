// //react components
// import React, {useState, useEffect} from 'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// //third parties
// // import TrackPlayer from 'react-native-track-player';
// // import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
// //styles
// import {styles} from './AudioPlayerStyle';
// //svg
// import PauseSvg from '../../assets/svg/play.svg';
// import PlaySvg from '../../assets/svg/audioplay.svg';
// import MoreSvg from '../../assets/svg/more-icon.svg';
// import {Server} from '../../global';
// const AudioPlayer = ({AudioUri}) => {
//   //states
//   //  const { position, duration } = useTrackPlayerProgress(250);
//   const [flag, setFlag] = useState(false);
//   //  const audioPercentage = (position / duration) * 100;
//   //function : music function
//   const musicData = {
//     id: 'trackId',
//     url: Server.BASE_URL + AudioUri,
//     title: 'brandnue',
//     artist: 'brandnue',
//   };
//   //function : audio function
//   const addAudio = async () => {
//     await TrackPlayer.setupPlayer();
//     // Add a track to the queue
//     await TrackPlayer.add(musicData);
//   };

//   const playAudio = async () => {
//     await TrackPlayer?.play();
//     setFlag(true);
//   };
//   const pauseAudio = async () => {
//     await TrackPlayer?.pause();
//     setFlag(false);
//   };
//   const stopAudio = async () => {
//     await TrackPlayer?.stop();
//   };
//   //useEffect
//   useEffect(() => {
//     // addAudio();
//     // return () => {
//     //   pauseAudio();
//     //   stopAudio();
//     // };
//   }, [AudioUri]);

//   //UI
//   return (
//     <View style={styles.audioPlayerView}>
//       {flag ? (
//         <TouchableOpacity onPress={() => pauseAudio()}>
//           <PauseSvg />
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity onPress={() => playAudio()}>
//           <PlaySvg />
//         </TouchableOpacity>
//       )}
//       <Text>{(position / 60).toFixed(2)}</Text>
//       <View style={styles.audioTimeDurationView}>
//         <View style={styles.audioProgressView}>
//           <View
//             style={{
//               ...styles.audioActiveProgress,
//               width: `${audioPercentage}%`,
//             }}
//           />
//           <View
//             style={{
//               ...styles.audioInAtiveProgress,
//               width: `${100 - audioPercentage}%`,
//             }}
//           />
//         </View>
//         <View
//           style={{...styles.audioActiveDotView, left: `${audioPercentage}%`}}
//         />
//       </View>
//       <Text>{(duration / 60).toFixed(2)}</Text>
//       <TouchableOpacity onPress={() => stopAudio()}>
//         <MoreSvg />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default React.memo(AudioPlayer);

import {View, Text} from 'react-native';
import React from 'react';
import {AudioPlayer as MusicPlayer} from 'react-native-simple-audio-player';
import {Colors, Server} from '../../global';
const AudioPlayer = ({AudioUri}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.BLACK + 'bb',
        borderRadius: 10,
        padding: 10,
      }}>
      <MusicPlayer url={Server.BASE_URL + AudioUri} />
    </View>
  );
};

export default AudioPlayer;
