import React, { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, StyleSheet, BackHandler, Animated } from "react-native";
import HomeScreen from "../screens/home/homeScreen";
// import WishListScreen from "../screens/wishlist/wishListScreen";
// import SearchScreen from "../screens/search/searchScreen";
// import CoursesScreen from "../screens/course/coursesScreen";
import SettingScreen from "../screens/setting/settingScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from "../constant/styles";
import { useFocusEffect } from '@react-navigation/native';

const BottomTabBarScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        currentIndex: 1,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

    return (
        <View style={{ flex: 1 }}>
            {currentIndex == 1 ?
                <HomeScreen navigation={navigation} /> :
                 
                            <SettingScreen navigation={navigation} />
            }
            <View style={styles.bottomTabBarStyle}>
                {bottomTabBarItem({
                    index: 1,
                    icon: <MaterialIcons name="home" size={27} color={Colors.orangeColor} />,
                    title: 'Home'
                })}
                {/* {bottomTabBarItem({
                    index: 2,
                    icon: <MaterialIcons name="favorite-border" size={27} color={Colors.orangeColor} />,
                    title: 'Wishlist',
                })}
                {bottomTabBarItem({
                    index: 3,
                    icon: <MaterialIcons name="search" size={27} color={Colors.orangeColor} />,
                    title: 'Search'
                })}
                {bottomTabBarItem({
                    index: 4,
                    icon: <MaterialIcons name="library-books" size={27} color={Colors.orangeColor} />,
                    title: 'My Course'
                })} */}
                {bottomTabBarItem({
                    index: 5,
                    icon: <MaterialIcons name="settings" size={27} color={Colors.orangeColor} />,
                    title: 'Settings',
                })}
            </View>
            {
                backClickCount == 1
                    ?
                    <Animated.View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.white15Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </Animated.View>
                    :
                    null
            }
        </View>
    )

    function bottomTabBarItem({ index, icon, title }) {
        return (
            <TouchableOpacity activeOpacity={0.9}
                onPress={() =>
                    updateState({ currentIndex: index })
                }
            >
                {
                    currentIndex == index ?
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFEACC',
                            width: 300.0,
                            paddingVertical: Sizes.fixPadding,
                            borderRadius: Sizes.fixPadding * 4.0,
                        }}>
                            {icon}
                            <Text style={{ ...Fonts.orangeColor14Bold, marginLeft: Sizes.fixPadding * 2.0, }}>
                                {title}
                            </Text>
                        </View> :
                        icon
                }
            </TouchableOpacity>
        )
    }
}

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        borderTopColor: 'gray',
        borderTopWidth: 0.20,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})



