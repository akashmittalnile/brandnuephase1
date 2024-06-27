//react components
import React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
//styles
import {styles} from './TextInputstyle';

const TextInputArea = ({
  value,
  setValue,
  textInputTitle,
  textInputBottomText,
  placeholder,
  placeholderTextColor,
  TextInputBorder,
  TextInputWidth,
  linkText,
  required,
  linkButtonPress = () => {},
  anotherLinkButtonPress = () => {},
  keyboardType = 'default',
  maxLength = 10000,
  onSubmitEditing,
  myTextInputRef,
  AnotherLinkText,
  isSecure,
  multiline = false,
  textInputHeight = 40,
  hasViewBorder = false,
}) => {
  //UI
  return (
    <View
      style={{
        ...styles.textAreaView,
        borderWidth: hasViewBorder ? 0.5 : 0,
        width: TextInputWidth ? TextInputWidth : '100%',
      }}>
      {textInputTitle ? (
        <View style={styles.TextInputTitleView}>
          <Text style={styles.TextInputTitle}>
            {textInputTitle} {required ? '*' : null}
          </Text>
          <TouchableOpacity onPress={linkButtonPress}>
            <Text style={styles.linkTitle}>{linkText}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {AnotherLinkText ? (
        <TouchableOpacity onPress={anotherLinkButtonPress}>
          <Text style={styles.anotherlinkTitle}>{AnotherLinkText}</Text>
        </TouchableOpacity>
      ) : null}
      <TextInput
        value={value}
        multiline={multiline}
        ref={myTextInputRef}
        onChangeText={text => setValue(text)}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        allowFontScaling={false}
        keyboardType={keyboardType}
        secureTextEntry={isSecure ? true : false}
        style={{
          ...styles.TextInput,
          height: textInputHeight,

          borderWidth: TextInputBorder ? 0.5 : null,
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor?placeholderTextColor:'gray'}
      />
      {textInputBottomText ? (
        <Text style={styles.textInputBottomText}>{textInputBottomText}</Text>
      ) : null}
    </View>
  );
};

export default TextInputArea;
