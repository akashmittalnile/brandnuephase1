//react components
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
//custom components
import CustomLoader from '../CustomLoader/CustomLoader';
//styles
import {styles} from './SearchBarStyle';
//svg
import SearchSvg from '../../assets/svg/search.svg';
import DownSvg from '../../assets/svg/chevron-down.svg';
import UpSvg from '../../assets/svg/chevron-up.svg';
//redux
import {connect} from 'react-redux';
import {Server} from '../../global';

const SearchBar = ({
  setValue,
  userToken,
  selectedCategory,
  setSelectedCategory,
  setPage,
  setLastPage,
  SearchButtonPress = () => {},
  onPress = () => {},
}) => {
  //states
  const [showLoader, setshowLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  //function : service function
  const getCategoriesList = async () => {
    setshowLoader(true);
    try {
      const resp = await Server.getApiWithToken(userToken, Server.CATEGORIES);
      if (resp.data.status) {
        setCategories(resp.data.data);
        setshowLoader(false);
      }
    } catch (error) {
      console.error('error in getCategoriesList', error);
      setshowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <View style={styles.SearchBarView}>
        <TextInput
          onChangeText={text => setValue(text)}
          placeholder={
            Object.keys(selectedCategory).length === 0
              ? 'Search'
              : selectedCategory?.name
          }
          allowFontScaling={false}
          placeholderTextColor="#000000"
          style={styles.textInputStyle}
        />
        <TouchableOpacity
          onPress={() => {
            setIsOpen(false);
            SearchButtonPress();
            setSelectedCategory({});
          }}>
          <SearchSvg />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPage(1);
            setLastPage(0);
            getCategoriesList();
            setIsOpen(!isOpen);
          }}>
          {isOpen ? (
            <UpSvg height={30} width={30} stroke="#404962" />
          ) : (
            <DownSvg height={30} width={30} stroke="#404962" />
          )}
        </TouchableOpacity>
      </View>
      {isOpen ? (
        categories.length > 0 ? (
          categories.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setIsOpen(false);
                  setSelectedCategory(item);
                  onPress(item.id);
                }}
                style={{
                  ...styles.dropDownItems,
                  borderBottomWidth: categories.length - 1 == index ? 0 : 0.5,
                }}>
                <Text style={styles.dropDownText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <CustomLoader showLoader={showLoader} />
        )
      ) : null}
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(SearchBar);
