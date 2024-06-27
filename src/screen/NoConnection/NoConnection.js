//react components
import React from 'react';
import {
    View, Text,
    Image, TouchableOpacity,
} from 'react-native';
//styles
import { styles } from "./NoConnectionStyle";

const NoConnection = ({  }) => {
    //function : imp function 
    const TryAgain = () => {
    }
    //useEffect
    //UI
    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Image
                    source={require("../../assets/Images/no-connection.png")}
                    style={styles.imageStyle}
                />
                <Text style={styles.primaryText}>Oops! We are not able to connect</Text>
                <Text style={styles.secondaryText}>Please check your internet connection</Text>
                <TouchableOpacity
                    onPress={() => TryAgain()}
                    style={styles.buttonStyles}>
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NoConnection;
