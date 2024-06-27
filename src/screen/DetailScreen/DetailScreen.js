//react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//third parties
import RenderHTML from 'react-native-render-html';
//global
import {ScreenNames, Server} from '../../global';
//styles
import {styles} from './DetailScreenStyle';
//redux
import {connect} from 'react-redux';

const DetailScreen = ({navigation, route, userToken}) => {
  //variables
  const {width} = useWindowDimensions();
  //variables : oute variables
  const id = route.params.id;
  const type = route.params.type;
  //states
  const [ItemDetail, setItemDetail] = useState({});
  //function : navigation function
  const gotoViewPdf = (url, title, type) => {
    navigation.navigate(ScreenNames.VIEW_PDF, {
      pdfUrl: url,
      pdfTitle: title,
      type: type,
    });
  };
  //function : imp function
  const handleTextLongPress = (event, string) => {
    // Copy the selected text to the clipboard
    // Clipboard.setString(string);
    console.log(`Copied "${string}" to clipboard`);
  };
  //function : service function
  const getDetailById = async () => {
    try {
      const endPoint = `${Server.INSTRUCTIONAL}/${type}/${id}`;
      const resp = await Server.getApiWithToken(userToken, endPoint);
      if (resp?.data?.status) {
        // console.warn('resp------>', resp.data.data);
        setItemDetail(resp?.data?.data);
      }
    } catch (error) {
      console.log('error in getDetailById', error);
    }
  };
  //useEffect
  useEffect(() => {
    getDetailById();
    return () => {};
  }, [userToken, id, type]);

  //UI
  if (type == 'video') {
    return (
      <View style={styles.container}>
        <SimpleHeader headerName={`Instructional ${type}s`} />
        {Object.keys(ItemDetail).length > 0 ? (
          <ScrollView style={styles.mainView}>
            <Text style={styles.titleStyle}>{ItemDetail.title}</Text>
            {/* <Text style={styles.descStyle}>{ItemDetail.description}</Text> */}
            <RenderHTML
              contentWidth={width}
              source={{html: `${ItemDetail?.description}`}}
              defaultTextProps={{selectable: true}}
              // onTextLongPress={handleTextLongPress}
            />
            <TouchableOpacity
              onPress={() =>
                gotoViewPdf(
                  ItemDetail.location_type == 'Local'
                    ? Server.BASE_URL + ItemDetail?.url
                    : ItemDetail?.url,
                  ItemDetail.title,
                  'VIDEO',
                )
              }
              style={styles.pdfViewStyle}>
              <Image
                resizeMode="contain"
                source={require('../../assets/Images/Video.png')}
                style={{height: 50, width: 50}}
              />
              <Text
                style={styles.pdfTextStyle}>{`${ItemDetail.title}.mp4`}</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <CustomLoader showLoader={true} />
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SimpleHeader headerName={`Instructional ${type}s`} />
        {Object.keys(ItemDetail).length > 0 ? (
          <ScrollView style={styles.mainView}>
            <Text style={styles.titleStyle}>{ItemDetail.title}</Text>
            <RenderHTML
              contentWidth={width}
              source={{html: `${ItemDetail?.description}`}}
              defaultTextProps={{selectable: true}}
            />
            {/* <Text style={styles.descStyle}>{ItemDetail.description}</Text> */}
            <TouchableOpacity
              onPress={() =>
                gotoViewPdf(ItemDetail?.url, ItemDetail.title, 'PDF')
              }
              style={styles.pdfViewStyle}>
              <Image
                source={{
                  uri: 'https://e7.pngegg.com/pngimages/571/47/png-clipart-adobe-acrobat-pdf-computer-icons-adobe-reader-edu-invest-adobe-pdf-text-logo.png',
                }}
                style={{height: 50, width: 50}}
              />
              <Text
                style={styles.pdfTextStyle}>{`${ItemDetail.title}.pdf`}</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <CustomLoader showLoader={true} />
        )}
      </View>
    );
  }
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(DetailScreen);
