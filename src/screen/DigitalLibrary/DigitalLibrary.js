//react components
import React, {useState} from 'react';
import {View} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import DigitalLibraryListItem from '../../components/DigitalLibraryListItem/DigitalLibraryListItem';
//styles
import {styles} from './DigitalLibraryStyle.js';
import {ScreenNames} from '../../global';
//svg
import RecipeSvg from '../../assets/svg/recipe.svg';
import ResourceSvg from '../../assets/svg/resources.svg';
import InstructionTempSvg from '../../assets/svg/instructional-templates.svg';
import InstructionVideoSvg from '../../assets/svg/instructional-video.svg';

const DigitalLibrary = ({navigation}) => {
  //function : navigation function
  const navigationToRecipePage = () => {
    navigation.navigate(ScreenNames.DIGITAL_LIBRARY_ITEM);
  };
  const navigationToLibraryItemsPage = headerName => {
    navigation.navigate(ScreenNames.DIGITAL_LIBRARY_ITEMS, {
      headerName: headerName,
    });
  };

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader
        headerName="Digital Library"
        IsNotification={true}
        IsDrawer={true}
      />
      <View style={styles.mainView}>
        <DigitalLibraryListItem
          Svg={<RecipeSvg />}
          name="Recipes"
          onPress={() => navigationToRecipePage()}
        />
        <DigitalLibraryListItem
          Svg={<ResourceSvg />}
          name="Resources/Guides"
          onPress={() => navigationToLibraryItemsPage('Resources/Guides')}
        />
        <DigitalLibraryListItem
          Svg={<InstructionTempSvg />}
          name="Instructional Templates"
          onPress={() =>
            navigationToLibraryItemsPage('Instructional Templates')
          }
        />
        <DigitalLibraryListItem
          Svg={<InstructionVideoSvg />}
          name="Instructional Videos"
          onPress={() => navigationToLibraryItemsPage('Instructional Videos')}
        />
      </View>
    </View>
  );
};

export default DigitalLibrary;
