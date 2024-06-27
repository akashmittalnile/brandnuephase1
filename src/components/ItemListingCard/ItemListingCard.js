//react components
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
//global
import {Colors, Server} from '../../global';
//styles
import {styles} from './ItemListingCardStyle';
//svg
import FavUnfilledSvg from '../../assets/svg/favorite-outline.svg';
import FavfilledSvg from '../../assets/svg/favorite.svg';
//redux
import {connect} from 'react-redux';

const ItemListingCard = ({
  imageUrl,
  name,
  Id,
  addButtonPress = () => {},
  viewDetailButtonPress = () => {},
  userToken,
  isFavourite,
}) => {
  //States
  const [CheckFav, setCheckFav] = useState(isFavourite);

  //function : service function
  const heartclicked = async () => {
    try {
      const endPoint = `${Server.ADD_TO_FAVOURITE}${Id}`;
      const resp = await Server.postApiWithToken(userToken, endPoint, {});
      if (resp.data.is_favourite == 'true') {
        setCheckFav(true);
      } else {
        setCheckFav(false);
      }
    } catch (error) {
      console.error('error in heartclicked', error);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <View style={styles.imageTextView}>
        <Image
          source={{uri: `${Server.BASE_URL}${imageUrl}`}}
          style={styles.ImageStyle}
        />
        <View style={styles.TextView}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={addButtonPress}
              style={styles.ButtonStyle}>
              <Text style={styles.buttonText}>Add Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={viewDetailButtonPress}
              style={{
                ...styles.ButtonStyle,
                backgroundColor: Colors.LITEGREEN,
              }}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => heartclicked()}>
        {CheckFav == 1 ? <FavfilledSvg /> : <FavUnfilledSvg />}
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});

export default connect(mapStateToProps, null)(ItemListingCard);
