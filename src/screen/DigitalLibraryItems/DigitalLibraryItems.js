//react components
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import ItemsList from '../../components/ItemsList/ItemsList';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//global
import {ScreenNames, Server} from '../../global';
//styles
import {styles} from './DigitalLibraryItemsStyle';
//redux
import {connect} from 'react-redux';

const DigitalLibraryItems = ({navigation, route, userToken}) => {
  //variables : route variables
  const headerName = route.params.headerName;
  //hook : States
  const [showLoader, setshowLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page, setpage] = useState(1);
  const [ListingData, setListingData] = useState([]);
  //function : navigation function
  const gotoDetail = (id, type) =>
    navigation?.navigate(ScreenNames.DETAIL_SCREEN, {id, type});
  //function : sevice function
  const getData = async page => {
    if (headerName == 'Resources/Guides') {
      try {
        const endpoint = `${Server.INSTRUCTIONAL_GUIDES}?page=${page}`;
        const resp = await Server.getApiWithToken(userToken, endpoint);
        if (resp?.data?.status) {
          return {
            status: true,
            response: resp?.data?.data?.data,
          };
        }
      } catch (error) {
        return {
          status: false,
          response: error,
        };
      }
    } else if (headerName == 'Instructional Templates') {
      try {
        const endPoint = `${Server.INSTRUCTIONAL_TEMPLATES}?page=${page}`;
        const resp = await Server.getApiWithToken(userToken, endPoint);
        if (resp?.data?.status) {
          return {
            status: true,
            response: resp?.data?.data?.data,
          };
        }
      } catch (error) {
        return {
          status: false,
          response: error,
        };
      }
    } else {
      try {
        const endPoint = `${Server.INSTRUCTIONAL_VIDEOS}?page=${page}`;
        const resp = await Server.getApiWithToken(userToken, endPoint);
        if (resp?.data?.status) {
          return {
            status: true,
            response: resp?.data?.data?.data,
          };
        }
      } catch (error) {
        return {
          status: false,
          response: error,
        };
      }
    }
  };
  const setListingDataFunction = async () => {
    setshowLoader(true);
    const {response, status} = await getData(page);
    if (status) {
      if (page == 1) {
        setListingData(response);
      } else {
        setListingData([...ListingData, ...response]);
      }
      setpage(page + 1);
    }
    setshowLoader(false);
  };
  const refreshFlControl = () => {
    setRefresh(true);
    setListingDataFunction();
    setRefresh(false);
  };
  //hook : useEffect
  useEffect(() => {
    setListingDataFunction();
    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={route?.params?.headerName} />
      <View style={styles.mainView}>
        {ListingData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '15%'}}
            data={ListingData}
            refreshing={refresh}
            onRefresh={refreshFlControl}
            renderItem={({item, index}) => {
              return (
                <ItemsList
                  key={index}
                  name={item.title}
                  onPress={() => gotoDetail(item.id, item.type)}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={setListingDataFunction}
          />
        ) : (
          <>
            <Text style={styles.NoDataTitleText}>No Data Available</Text>
          </>
        )}
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(DigitalLibraryItems);
