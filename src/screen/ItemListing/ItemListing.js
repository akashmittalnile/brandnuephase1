//import : react components
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
//import : custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import ItemListingCard from '../../components/ItemListingCard/ItemListingCard';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import SearchBar from '../../components/SearchBar/SearchBar';
//import : global
import {ScreenNames, Server} from '../../global';
//import : styles
import {styles} from './ItemListingStyle';
//import : modal
import AddMealModal from '../../components/modal/AddMealModal/AddMealModal';
import MealQuantity from '../../components/modal/MealQuantity/MealQuantity';
//import : redux
import {connect} from 'react-redux';

const ItemListing = ({navigation, userToken}) => {
  //hook : States
  const [showLoader, setshowLoader] = useState(false);
  const [SelectedMealType, setSelectedMealType] = useState('');
  const [addMealModal, setaddMealModal] = useState(false);
  const [mealQuantityModal, setmealQuantityModal] = useState(false);
  const [ItemListingData, setItemListingData] = useState([]);
  const [ItemName, setItemName] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [page, setpage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categoriesProducts, setCategoriesProducts] = useState([]);
  //function : navigation function
  const navigationToItemDetail = (id, MealName) =>
    navigation.navigate(ScreenNames.ITEM_DETAIL, {Id: id, MealName: MealName});
  //function : imp function
  const loadMore = () => {
    if (page <= lastPage) {
      if (Object.keys(selectedCategory).length > 0) {
        searchByCategory(selectedCategory.id);
      } else {
        getAllItemListing();
      }
    }
  };
  //function : service function
  const getAllItemListing = async () => {
    setshowLoader(true);
    try {
      const endPoint = `${Server.RECIPE_LIST}?page=${page}`;
      const {response} = await Server.getAPI(endPoint, userToken);
      if (response.status && response?.data?.data?.length > 0) {
        if (page == 1) {
          setItemListingData(response.data.data);
          setLastPage(response.data.last_page);
        } else {
          setItemListingData([...ItemListingData, ...response.data.data]);
        }
        setpage(page + 1);
      }
    } catch (error) {
      console.error('error in getAllItemListing', error);
    }
    setshowLoader(false);
  };
  const searchByName = async text => {
    try {
      const endPoint = `${Server.SEARCH_RECIPE}${text}`;
      const {response, status} = await Server.getAPI(endPoint, userToken);
      if (status) {
        setItemListingData(response.data.data);
      }
    } catch (error) {
      setItemListingData([]);
      console.error('error in searchByName', error);
    }
  };
  const searchByCategory = async id => {
    setshowLoader(true);
    try {
      const endPoint = `${Server.CATEGORY_RECIPE}${id}&page=${page}`;
      const {response} = await Server.getAPI(endPoint, userToken);
      if (response?.status && response?.data?.data?.length > 0) {
        if (page == 1) {
          setCategoriesProducts(response.data.data);
          setLastPage(response.data.last_page);
        } else {
          setCategoriesProducts([...categoriesProducts, ...response.data.data]);
        }
        setpage(page + 1);
      }
    } catch (error) {
      console.error('error in searchByCategory', error);
    }
    setshowLoader(false);
  };
  //function : render function
  const recipesListRender = ({item, index}) => {
    return (
      <ItemListingCard
        key={item.id}
        Id={item.id}
        isFavourite={item.is_favourite}
        imageUrl={item?.recipe_image?.url}
        name={item.meal_title}
        userToken={userToken}
        viewDetailButtonPress={() =>
          navigationToItemDetail(item.id, item.meal_title)
        }
        addButtonPress={() => {
          setItemName(item.meal_title), setaddMealModal(true);
        }}
      />
    );
  };
  //hook : useEffect
  useEffect(() => {
    getAllItemListing();
    return () => {
      setpage(1);
    };
  }, []);
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Recipes" />
      <View style={styles.mainView}>
        <SearchBar
          setValue={searchByName}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onPress={searchByCategory}
          setPage={setpage}
          setLastPage={setLastPage}
          SearchButtonPress={() => {
            setpage(1);
            getAllItemListing();
          }}
        />
        <View style={{height: 10}} />
        {ItemListingData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            refreshing={refresh}
            onRefresh={() => {
              setSelectedCategory({});
              getAllItemListing();
            }}
            data={
              Object.keys(selectedCategory).length > 0
                ? categoriesProducts
                : ItemListingData
            }
            renderItem={recipesListRender}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={loadMore}
          />
        ) : (
          <>
            <Text style={styles.NoDataTitleText}>No Data Available</Text>
          </>
        )}
      </View>
      <CustomLoader showLoader={showLoader} />
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

export default connect(mapStateToProps, null)(ItemListing);
