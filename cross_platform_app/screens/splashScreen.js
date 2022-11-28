import React from "react";
import { Text, View, SafeAreaView, StatusBar } from "react-native";
import { Fonts, Colors } from "../constant/styles";

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('OnBoarding');
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }} >
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...Fonts.white60Regular }}>
                    Welcome
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;