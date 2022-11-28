import React, { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, } from "react-native";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from "@rneui/themed";

const SignUpScreen = ({ navigation }) => {

    const [state, setState] = useState({
        passwordVisible: false,
        confirmPasswordVisible: false,
        passwordFocus: false,
        confirmPasswordFocus: false,
        usernameFocus: false,
        emailFocus: false,
        phoneNumberFocus: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        passwordVisible,
        confirmPasswordVisible,
        passwordFocus,
        confirmPasswordFocus,
        usernameFocus,
        emailFocus,
        phoneNumberFocus,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <CollapsingToolbar
                leftItem={
                    <MaterialIcons name="arrow-back-ios" size={24} color={Colors.blackColor}
                        onPress={() => navigation.goBack()}
                    />
                }
                element={
                    <Text style={{ ...Fonts.black25Bold }}>Sign up</Text>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={80}
                toolbarMaxHeight={230}
                src={require('../../assets/images/appbar_bg.png')}>
                <View style={{
                    paddingVertical: Sizes.fixPadding * 7.0,
                    paddingHorizontal: Sizes.fixPadding * 2.0
                }}>
                    {userNameTextField()}
                    {emailTextField()}
                    {phoneNumberTextField()}
                    {passwordTextField()}
                    {confirmPasswordTextField()}
                    {signupButton()}
                </View>
            </CollapsingToolbar>
        </SafeAreaView>
    )

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Verification')}
                style={styles.signupButtonStyle}>
                <Text style={{ ...Fonts.black19Bold }}>Sign up</Text>
            </TouchableOpacity>
        )
    }

    function confirmPasswordTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Confirm password"
                secureTextEntry={!confirmPasswordVisible}
                style={{ ...Fonts.black17Regular, }}
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: confirmPasswordFocus ? Colors.primaryColor : "#898989", }}
                rightIcon={
                    <MaterialCommunityIcons
                        name={confirmPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color={confirmPasswordFocus ? Colors.primaryColor : "#898989"}
                        onPress={() => updateState({ confirmPasswordVisible: !confirmPasswordVisible })}
                    />
                }
                onFocus={() => updateState({ confirmPasswordFocus: true })}
                onBlur={() => updateState({ confirmPasswordFocus: false })}
            />
        )

    }

    function phoneNumberTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Phone number"
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: phoneNumberFocus ? Colors.primaryColor : "#898989", }}
                style={{ ...Fonts.black17Regular }}
                keyboardType="phone-pad"
                onFocus={() => updateState({ phoneNumberFocus: true })}
                onBlur={() => updateState({ phoneNumberFocus: false })}
            />
        )
    }

    function emailTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Email"
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: emailFocus ? Colors.primaryColor : "#898989", }}
                style={{ ...Fonts.black17Regular }}
                onFocus={() => updateState({ emailFocus: true })}
                onBlur={() => updateState({ emailFocus: false })}
                keyboardType="email-address"
            />
        )
    }

    function userNameTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Username"
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: usernameFocus ? Colors.primaryColor : "#898989", }}
                style={{ ...Fonts.black17Regular }}
                onFocus={() => updateState({ usernameFocus: true })}
                onBlur={() => updateState({ usernameFocus: false })}
            />
        )
    }

    function passwordTextField() {
        return (
            <Input
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                style={{ ...Fonts.black17Regular, }}
                selectionColor={Colors.primaryColor}
                inputContainerStyle={{ borderBottomColor: passwordFocus ? Colors.primaryColor : "#898989", }}
                rightIcon={
                    <MaterialCommunityIcons
                        name={passwordVisible ? "eye-off" : "eye"}
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
}

const styles = StyleSheet.create({
    signupButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0
    }
})

export default SignUpScreen;