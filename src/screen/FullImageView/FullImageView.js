//react components
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
//third parties
import ImageZoom from 'react-native-image-pan-zoom';
//global
import { Colors, Constant, Server } from '../../global';
//styles
import { styles } from "./FullImageViewStyle";
//svg
import CrossSvg from "../../assets/svg/x-black.svg";
import BackSvg from "../../assets/svg/arrow-left";


const FullImageView = ({ route, navigation }) => {
    //variables : route variables
    const image = route.params.image;
    //function : navigation function 
    const goBackToChat = () => navigation?.pop()
    //UI
    return (
        <>
            <View style={styles.headerStyle}>
                <View/>
                {/* <TouchableOpacity
                    onPress={() => goBackToChat()}
                >
                    <BackSvg />
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => goBackToChat()}
                >
                    <CrossSvg />
                </TouchableOpacity>
            </View>
            <ImageZoom
                style={styles.container}
                cropWidth={Constant.windowWidth}
                cropHeight={Constant.windowHeight}
                imageWidth={Constant.windowWidth - 20}
                imageHeight={Constant.windowHeight / 1.5}
            >

                <Image
                    resizeMode="contain"
                    style={styles.imageStyle}
                    source={{ uri: Server.BASE_URL + image }} />
            </ImageZoom>
        </>
    )
}

export default FullImageView;
