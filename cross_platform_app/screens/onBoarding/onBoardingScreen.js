import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity, Image,
    Dimensions,
    BackHandler,
    SafeAreaView,
    StatusBar,
    Animated
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const OnBoardingScreen = ({ navigation }) => {

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
        pageIndex: 0,
        backClickCount: 0
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { pageIndex, backClickCount } = state;

    const Square = ({ isLight, selected }) => {
        let backgroundColor;
        let width;
        let height;
        if (isLight) {
            backgroundColor = selected ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)';
            width = selected ? 12 : 7;
            height = selected ? 12 : 7;
        } else {
            backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        }
        return (
            <View
                style={{
                    width,
                    height,
                    borderRadius: width / 2,
                    backgroundColor,
                    marginHorizontal: 2,
                    backgroundColor: pageIndex == 2 ? 'transparent' : backgroundColor,
                }}
            />
        );
    };

    const Done = () => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => { navigation.navigate('SignIn') }}
            style={{ position: 'absolute', left: -80.0, top: -10.0 }}>
            <Text style={{
                ...Fonts.white16Bold
            }}>GET STARTED NOW
            </Text>
        </TouchableOpacity>
    );

    const getPageIndex = (pageIndex) => {
        updateState({ pageIndex, });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='rgba(0,0,0,0)' />
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#FAFAFA',
                        image: <Image source={require('../../assets/images/onboarding/1.jpg')}
                            resizeMode="contain"
                            style={{ width: '100%', height: 300.0 }} />,
                        title:
                            <View style={styles.titleContainerStyle}>
                                <Text style={{
                                    ...Fonts.black25Bold,
                                }}>Smart way to manage your garden.
                                </Text>
                            </View>,

                        subtitle:
                            <View style={styles.subTitleContainerStyle}>
                                <Text style={{ ...Fonts.gray16Regular, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                    {`A smart and innovative way to manage your farm and garden in Fiji`}
                                </Text>
                            </View>
                    },
                    {
                        backgroundColor: 'white',
                        image: <Image source={require('../../assets/images/onboarding/2.jpg')}
                            resizeMode="contain"
                            style={{ width: '100%', height: 300.0 }} />,

                        title:
                            <View style={styles.titleContainerStyle}>
                                <Text style={{
                                    textAlign: 'center',
                                    ...Fonts.black25Bold,
                                }}>Realtime data and insight
                                </Text>
                            </View>,
                        subtitle: <View style={styles.subTitleContainerStyle}>
                            <Text style={{ ...Fonts.gray16Regular, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                Monitor your soil moister in realtime. Turn on and off your watering machine using the app directly.
                            </Text>
                        </View>
                    },
                    {
                        backgroundColor: Colors.primaryColor,
                        image: <Image source={require('../../assets/images/onboarding/3.jpg')}
                            resizeMode="contain"
                            style={{ width: '100%', height: 300.0 }} />,
                        title:
                            <View style={styles.titleContainerStyle}>
                                <Text style={{
                                    textAlign: 'center',
                                    ...Fonts.black25Bold,
                                }}>Notification
                                </Text>
                            </View>,
                        subtitle: < View style={styles.subTitleContainerStyle}>
                            <Text style={{ ...Fonts.gray16Regular, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                Get notified when your garden needs water and moister.
                            </Text>
                        </View>
                    },
                ]
                }
                DotComponent={Square}
                DoneButtonComponent={Done}
                containerStyles={{ backgroundColor: '#FFFFFF' }}
                skipToPage={2}
                skipLabel={
                    < Text style={{ ...Fonts.primaryColor16Regular }}> SKIP</Text >}
                nextLabel={< Text style={{ ...Fonts.primaryColor16Regular }}> NEXT</Text >}
                bottomBarColor={pageIndex == 2 ? Colors.primaryColor : '#FAFAFA'}
                pageIndexCallback={getPageIndex}
            />
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
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    titleContainerStyle: {
        width: '100%',
        alignItems: 'center',
        bottom: width / 0.65,
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        position: 'absolute'
    },
    subTitleContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bottom: width / 2.0,
        position: 'absolute',
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
});

export default OnBoardingScreen;