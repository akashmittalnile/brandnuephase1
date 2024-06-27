//react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
//custom components
import ItemListingCard from '../../components/ItemListingCard/ItemListingCard';
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
//global
import {Colors, ScreenNames, Server} from '../../global';
//styles
import {styles} from './FavouriteMealsStyle';
//modal
import AddMealModal from '../../components/modal/AddMealModal/AddMealModal';
import MealQuantity from '../../components/modal/MealQuantity/MealQuantity';
//redux
import {connect} from 'react-redux';

const FavouriteMeals = ({navigation, userToken}) => {
  //hook : state
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [FavouriteMealData, setFavouriteMealData] = useState([]);
  const [mealQuantityModal, setmealQuantityModal] = useState(false);
  const [SelectedMealType, setSelectedMealType] = useState('');
  const [addMealModal, setaddMealModal] = useState(false);
  const [ItemName, setItemName] = useState('');
  //hook : modal states
  const [showLoader, setshowLoader] = useState(false);

  //function : navigation function
  const navigationToItemDetail = id =>
    navigation.navigate(ScreenNames.ITEM_DETAIL, {Id: id});
  //function : imp function
  const loadMoreData = () => {
    if (page <= lastPage) {
      getAllFavouriteMeals();
    }
  };
  //function : service function
  const getAllFavouriteMeals = async () => {
    setshowLoader(true);
    try {
      const paramsData = {
        page: page,
      };
      const {response, status} = await Server.getAPI(
        Server.FAVOURITE_LIST,
        userToken,
        paramsData,
      );
      if (status) {
        if (page == 1) {
          setFavouriteMealData(response.data.data);
          setLastPage(response.data.last_page);
        } else {
          setFavouriteMealData([...FavouriteMealData, ...response.data.data]);
        }
        setPage(page + 1);
      }
    } catch (error) {
      setFavouriteMealData([]);
      console.log('error in getAllFavouriteMeals', error);
    }
    setshowLoader(false);
  };
  //useEffect
  useEffect(() => {
    getAllFavouriteMeals();
    return () => {};
  }, []);
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Favorite Meals" />
      <View style={styles.mainView}>
        {FavouriteMealData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={FavouriteMealData}
            renderItem={({item, index}) => {
              return (
                <ItemListingCard
                  key={index}
                  Id={item.id}
                  isFavourite={item.is_favourite}
                  imageUrl={item?.recipe_image}
                  name={item.meal_title}
                  userToken={userToken}
                  viewDetailButtonPress={() => navigationToItemDetail(item.id)}
                  addButtonPress={() => {
                    setItemName(item.meal_title), setaddMealModal(true);
                  }}
                />
              );
            }}
            onEndReachedThreshold={0.5}
            onEndReached={loadMoreData}
            ListFooterComponent={({item, index}) => {
              return (
                <View
                  style={{
                    marginBottom: '10%',
                  }}>
                  {showLoader ? (
                    <ActivityIndicator
                      animating={showLoader}
                      size="large"
                      color={Colors.RED}
                    />
                  ) : null}
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <>
            <ActivityIndicator
              animating={showLoader}
              size="large"
              color="#f39322"
            />
            <Text style={styles.noDataFound}>No Favorite Meals Found </Text>
          </>
        )}
      </View>
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
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});

export default connect(mapStateToProps, null)(FavouriteMeals);
