//react components
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
//third parties
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
//styles
import {styles} from './TrackingSheetStyle';
//redux
import {connect, useDispatch} from 'react-redux';
//svgs
import BackSvg from '../../assets/svg/arrow-left';
import DownloadSvg from '../../assets/svg/download.svg';
import {Server} from '../../global';
import {CustomAlertAction} from '../../redux/actions/actions';

const TrackingSheet = ({userToken, navigation}) => {
  const dispatch = useDispatch();
  //states
  const [pdfUrl, setPdfUrl] = useState('');

  //function : navigation function
  const goBack = () => navigation.goBack();
  //function : imp function
  const AskPermission = () => {
    if (Platform.OS === 'ios') {
      downloadTrackingSheet();
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'storage title',
            message: 'storage_permission',
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            downloadTrackingSheet();
          } else {
            dispatch(CustomAlertAction.showToast('Permission Denied'));
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log('error', err);
      }
    }
  };
  //function : service function
  const getTrackingSheet = async () => {
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.TRACKING_7_DAYS,
      );
      if (resp?.data?.status) {
        setPdfUrl(resp.data.data);
      }
    } catch (error) {
      console.log('error in getTrackingSheet', error);
    }
  };
  const downloadTrackingSheet = async () => {
    let DownloadDir =
      Platform.OS == 'ios'
        ? ReactNativeBlobUtil.fs.dirs.DocumentDir
        : ReactNativeBlobUtil.fs.dirs.DownloadDir;
    const {dirs} = ReactNativeBlobUtil.fs;
    const dirToSave =
      Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'BrandNUE',
      path: `${dirToSave}/trackingsheet.pdf`,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });
    Platform.OS == 'android'
      ? ReactNativeBlobUtil.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: `${DownloadDir}/trackingsheet.pdf`,
            description: 'BrandNUE',
            title: `trackingsheet.pdf`,
            mime: 'application/pdf',
            mediaScannable: true,
          },
        })
          .fetch('GET', `${pdfUrl}`)
          .catch(error => {
            console.warn(error.message);
          })
      : ReactNativeBlobUtil.config(configOptions)
          .fetch('GET', `${pdfUrl}`, {})
          .then(res => {
            if (Platform.OS === 'ios') {
              ReactNativeBlobUtil.fs.writeFile(
                configfb.path,
                res.data,
                'base64',
              );
              ReactNativeBlobUtil.ios.previewDocument(configfb.path);
            }
            console.log('The file saved to ', res);
          })
          .catch(e => {
            console.log('The file saved to ERROR', e.message);
          });
  };
  //useEffect
  useEffect(() => {
    getTrackingSheet();
    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => goBack()}>
          <BackSvg />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>Tracking Sheet</Text>
        <TouchableOpacity onPress={() => AskPermission()}>
          <DownloadSvg />
        </TouchableOpacity>
      </View>
      <Pdf
        source={{
          uri: pdfUrl,
        }}
        trustAllCerts={Platform.OS === 'ios' ? true : false}
        style={styles.pdf}
      />
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(TrackingSheet);
