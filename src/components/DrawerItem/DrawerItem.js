//react components
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//styles
import {styles} from './DrawerItemStyle';

const DrawerItem = ({
  DrawerItemSvg,
  DrawerItemName,
  draweritemClick = () => {},
  count,
}) => {
  return (
    <TouchableOpacity onPress={draweritemClick}>
      <View style={styles.drawerItemView}>
        <View style={styles.drawerItemIcon}>{DrawerItemSvg}</View>
        <Text style={styles.drawerItemTextStyle}>{DrawerItemName}</Text>
        {count>0 ? (
          <View style={styles.countView}>
            <Text style={{...styles.drawerItemTextStyle,fontSize:10}}>{count}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default DrawerItem;
