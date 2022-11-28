import React, { useState, useCallback } from "react";
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { Input } from "@rneui/themed";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const SigninScreen = ({ navigation }) => {

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
        passwordVisible: false,
        passwordFocus: false,
        usernameFocus: false,
        backClickCount: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        passwordVisible,
        passwordFocus,
        usernameFocus,
        backClickCount,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <CollapsingToolbar
                element={<Text style={{ ...Fonts.black25Bold }}>Sign in</Text>}
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require('../../assets/images/appbar_bg.png')}>
                <View style={{
                    paddingVertical: Sizes.fixPadding * 7.0,
                    paddingHorizontal: Sizes.fixPadding * 2.0
                }}>
                    {userNameTextField()}
                    {passwordTextField()}
                    {signinButton()}
                    {signUpText()}
                    {forgotPasswordText()}
                    {loginWithFacebookButton()}
                    {loginWithGoogleButton()}
                </View>
            </CollapsingToolbar>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.white15Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function loginWithGoogleButton() {
        return (
            <View>
                <View style={styles.loginWithGoogleButtonStyle}>
                    <Image source={require('../../assets/images/google.png')}
                        style={{ height: 30.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.black19Bold, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Log in with Google
                    </Text>
                </View>
            </View>
        )
    }

    function loginWithFacebookButton() {
        return (
            <View>
                <View style={styles.loginWithFacebookButtonStyle}>
                    <Image source={require('../../assets/images/facebook.png')}
                        style={{ height: 30.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.white19Bold, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Log in with Facebook
                    </Text>
                </View>
            </View>
        )
    }

    function forgotPasswordText() {
        return (
            <Text style={{ ...Fonts.gray18Bold, textAlign: 'center' }}>
                Forgot your password?
            </Text>
        )
    }

    function signUpText() {
        return (
            <Text style={{
                ...Fonts.gray18Bold, textAlign: 'center',
                marginTop: Sizes.fixPadding - 5.0,
                marginBottom: Sizes.fixPadding
            }}>
                Sign up
            </Text>
        )
    }

    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('BottomTabScreen')}
                style={styles.signinButtonStyle}>
                <Text style={{ ...Fonts.black19Bold }}>Sign in</Text>
            </TouchableOpacity>
        )
    }

    function passwordTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry={passwordVisible ? false : true}
                style={{ ...Fonts.black17Regular, }}
                inputContainerStyle={{ borderBottomColor: passwordFocus ? Colors.primaryColor : "#898989", }}
                rightIcon={
                    <MaterialCommunityIcons name={passwordVisible ? "eye-off" : "eye"}
                        size={24}
                        color={passwordFocus ? Colors.primaryColor : "#898989"}
                        onPress={() => updateState({ passwordVisible: !passwordVisible })}
                    />
                }
                onFocus={() => updateState({ passwordFocus: true })}
                onBlur={() => updateState({ passwordFocus: false })}
            />
        )
    }

    function userNameTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Username"
                inputContainerStyle={{ borderBottomColor: usernameFocus ? Colors.primaryColor : "#898989", }}
                style={{ ...Fonts.black17Regular }}
                onFocus={() => updateState({ usernameFocus: true })}
                onBlur={() => updateState({ usernameFocus: false })}
            />
        )
    }
}

const styles = StyleSheet.create({
    signinButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        backgroundColor: '#3B5998',
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 3.5
    },
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 2.5
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

export default SigninScreen;