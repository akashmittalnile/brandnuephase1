//react components
import React from 'react';
import {View, ScrollView} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import ItemListView from '../../components/ItemListView/ItemListView';
//styles
import {styles} from './DigitalLibraryItemStyle';
//global
import {Colors, ScreenNames} from '../../global';

const DigitalLibraryItem = ({navigation}) => {
  //function : navigation function
  const navigationToItemListing = () =>
    navigation.navigate(ScreenNames.ITEM_LISTING);
  const navigationToAddedMeal = () =>
    navigation.navigate(ScreenNames.ADDED_MEALS);
  const navigationToFavouriteMeals = () =>
    navigation.navigate(ScreenNames.FAVOURITE_MEALS);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Recipes" />
      <View style={styles.mainView}>
        <ItemListView
          text="Added Meals"
          backgroundColor={Colors.LITEGREEN}
          onPress={() => navigationToAddedMeal()}
        />
        <ItemListView
          text="Favorite Meals"
          backgroundColor={Colors.ORANGE}
          onPress={() => navigationToFavouriteMeals()}
        />
        <ItemListView
          text="Recipe List"
          onPress={() => navigationToItemListing()}
          backgroundColor={Colors.ORANGE}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: 250}} />
        </ScrollView>
      </View>
    </View>
  );
};

export default DigitalLibraryItem;
