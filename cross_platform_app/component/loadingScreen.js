import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constant/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                SignikaNegative_Bold: require("../assets/fonts/SignikaNegative-Bold.ttf"),
                SignikaNegative_Regular: require("../assets/fonts/SignikaNegative-Regular.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;





