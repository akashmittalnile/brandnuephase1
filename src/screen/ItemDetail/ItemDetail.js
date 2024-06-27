//react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import ItemListView from '../../components/ItemListView/ItemListView';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
//third parties
import VideoPlayer from 'react-native-video-player';
import RenderHtml from 'react-native-render-html';
//global
import {Colors, Constant, Server} from '../../global';
//styles
import {styles} from './ItemDetailStyle';
//connect
import {connect, useDispatch} from 'react-redux';
//modal
import AddMealModal from '../../components/modal/AddMealModal/AddMealModal';
import MealQuantity from '../../components/modal/MealQuantity/MealQuantity';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import {CustomAlertAction} from '../../redux/actions/actions';

const ItemDetail = ({userToken, route}) => {
  //variables : route variable
  const Id = route.params.Id;
  const MealName = route.params.MealName;
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  //states : modal states
  const [addMealModal, setaddMealModal] = useState(false);
  const [mealQuantityModal, setmealQuantityModal] = useState(false);
  const [SelectedMealType, setSelectedMealType] = useState('');
  const [ItemName, setItemName] = useState('');
  //states
  const [ItemDetailData, setItemDetailData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  //function : service function
  const getItemDetailById = async () => {
    setShowLoader(true);
    try {
      const endPoint = `${Server.RECIPE_DETAIL}${Id}`;
      const resp = await Server.getApiWithToken(userToken, endPoint);
      if (resp.data.status) {
        // console.warn('resp--->', resp.data.data);
        setItemDetailData(resp.data.data);
      }
    } catch (error) {
      console.log('error in getItemDetailById', error);
    }
    setShowLoader(false);
  };
  const addToFavourite = async () => {
    setShowLoader(true);
    try {
      if (ItemDetailData?.is_favourite == 1) {
      } else {
        const endPoint = `${Server.ADD_TO_FAVOURITE}${Id}`;
        const resp = await Server.postApiWithToken(userToken, endPoint, {});
        if (resp.data.status) {
          dispatch(CustomAlertAction.showToast(resp.data.msg));
        }
      }
    } catch (error) {
      console.log('error in addToFavourite', error);
    }
    setShowLoader(false);
  };
  //useEffect
  useEffect(() => {
    getItemDetailById();
    return () => {};
  }, [route?.params?.Id]);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={ItemDetailData.meal_title} />
      <ScrollView style={styles.mainView}>
        {Object.keys(ItemDetailData).length > 0 ? (
          <>
            {ItemDetailData?.recipe_images?.length > 0
              ? ItemDetailData?.recipe_images?.map((item, index) => (
                  <View key={index} style={styles.ImageView}>
                    <Image
                      source={{uri: Server.BASE_URL + item.url}}
                      style={styles.imageStyle}
                    />
                  </View>
                ))
              : null}
            <Text style={styles.titleText} selectable={true}>
              {ItemDetailData.meal_title}
            </Text>
            <RenderHtml
              contentWidth={width}
              defaultTextProps={{allowFontScaling: false, selectable: true}}
              source={{html: `${ItemDetailData?.image_description}`}}
            />
            {/* <Text style={styles.descriptionText}>
              {ItemDetailData.image_description}
            </Text> */}
            <Text style={styles.descriptionText}>
              {ItemDetailData.meal_keyword}
            </Text>
            {ItemDetailData?.recipe_videos?.length > 0
              ? ItemDetailData?.recipe_videos?.map((item, index) => {
                  return (
                    <VideoPlayer
                      key={index}
                      video={{uri: `${Server.BASE_URL}${item.url}`}}
                      videoWidth={1600}
                      videoHeight={900}
                    />
                  );
                })
              : null}
            {ItemDetailData?.video_description == null ? null : (
              <RenderHtml
                contentWidth={width}
                defaultTextProps={{allowFontScaling: false}}
                source={{html: `${ItemDetailData?.video_description}`}}
              />
            )}

            <View style={{height: 10}} />
            {ItemDetailData?.recipe_audios?.length > 0 ? (
              <AudioPlayer AudioUri={ItemDetailData?.recipe_audios[0]?.url} />
            ) : null}
            {ItemDetailData?.audio_description == null ? null : (
              <RenderHtml
                contentWidth={width}
                defaultTextProps={{allowFontScaling: false}}
                source={{html: `${ItemDetailData?.audio_description}`}}
              />
            )}

            <ItemListView
              text="Add Meal"
              backgroundColor={Colors.LITEGREEN}
              onPress={() => {
                setaddMealModal(true), setItemName(MealName);
              }}
            />
            <ItemListView
              text="Add to Favorite"
              backgroundColor={Colors.ORANGE}
              onPress={() => addToFavourite()}
            />
            <View style={{height: 30}} />
          </>
        ) : null}
      </ScrollView>
      <AddMealModal
        visible={addMealModal}
        setVisible={setaddMealModal}
        setmealQuantityModal={setmealQuantityModal}
        setSelectedMealType={setSelectedMealType}
      />
      <MealQuantity
        visible={mealQuantityModal}
        setVisible={setmealQuantityModal}
        SelectedMealType={SelectedMealType}
        ItemName={ItemName}
      />
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(ItemDetail);
