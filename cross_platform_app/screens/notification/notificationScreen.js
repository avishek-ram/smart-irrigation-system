import React, { useState, useRef } from 'react';
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Dimensions,
} from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const rowTranslateAnimatedValues = {};

const NotificationScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(
        [
            {
                key: '1',
                name: 'Moisture level is extremely low!',
                description: 'Please take necessary actions as the moisture level is extremely low compared to the threshold preferred. ',

            },
            {
                key: '2',
                name: 'Malfunction Alert',
                description: 'You smart watering device is having some unexpected behavior, please have your power level checked!',
            },
        ],
    );

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.name} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 130],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: '#F1F3F6' }}>
                <View style={styles.notificationContainerStyle}>
                    <View style={styles.notificationIconContainerStyle}>
                        <MaterialIcons name="notifications-none" size={35} color="black" />
                    </View>
                    <View style={{
                        marginLeft: Sizes.fixPadding * 2.0, width: width - 150,
                        justifyContent: 'space-between', height: 120.0,
                        paddingVertical: Sizes.fixPadding + 3.0
                    }}>
                        <Text numberOfLines={1} style={{ ...Fonts.black19Regular }}>
                            {data.item.name}
                        </Text>
                        <Text numberOfLines={3} style={{ ...Fonts.gray15Regular, }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerContainerStyle}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black"
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ ...Fonts.black19Bold, marginLeft: Sizes.fixPadding }}>
                    My Notifications
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={styles.container}>
                {header()}
                {listData.length == 0 ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F3F6' }}>
                        <Ionicons name="ios-notifications-off-outline" size={70} color="gray" />
                        <Text style={{ ...Fonts.gray17Bold, marginTop: Sizes.fixPadding * 2.0 }}>
                            No Notifications
                        </Text>
                    </View>
                    :
                    <SwipeListView
                        disableRightSwipe
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-Dimensions.get('window').width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                    />
                }
                <Snackbar
                    style={{ position: 'absolute', bottom: -10.0, left: -10.0, right: -10.0, backgroundColor: '#333333' }}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    {snackBarMsg}
                </Snackbar>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
    },
    notificationContainerStyle: {
        height: 120.0,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 2.0,
        paddingLeft: Sizes.fixPadding,
    },
    notificationIconContainerStyle: {
        height: 80.0,
        width: 80.0,
        backgroundColor: '#FFE0B2',
        borderRadius: 40.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#F1F3F6',
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        marginVertical: Sizes.fixPadding - 5.0,
    },
});

export default NotificationScreen;