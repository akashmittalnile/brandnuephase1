import {View, Text} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import {styles} from './PlanPreviewStyle';
import VideoPlayer from 'react-native-video-player';
import {Constant} from 'global/index';
const PlanPreview = () => {
  const videoPlayer = React.useRef();

  const goFullScreen = () => {
    if (videoPlayer.current) {
      videoPlayer.current.presentFullscreenPlayer();
    }
  };
  return (
    <View style={styles.container}>
      <VideoPlayer
        video={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        resizeMode="cover"
        videoWidth={Constant.windowWidth}
        videoHeight={Constant.windowHeight}
        thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
      />
    </View>
  );
};

export default PlanPreview;
