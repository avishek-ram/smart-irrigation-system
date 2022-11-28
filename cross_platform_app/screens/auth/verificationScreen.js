import React, { useState, createRef } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    BackHandler
} from "react-native";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

const VerificationScreen = ({ navigation }) => {

    const [state, setState] = useState({ isLoading: false })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { isLoading } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <CollapsingToolbar
                element={
                    <Text style={{ ...Fonts.black25Bold, marginBottom: Sizes.fixPadding }}>
                        Enter 4 Digit OTP
                    </Text>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require('../../assets/images/appbar_bg.png')}>
                <View style={{
                    paddingTop: Sizes.fixPadding * 4.0,
                    paddingHorizontal: Sizes.fixPadding * 2.0
                }}>
                    <Text style={{ ...Fonts.gray14Regular, textAlign: 'center' }}>
                        Enter the OTP code from the phone we just sent you.
                    </Text>
                    {otpFields()}
                    {resendInfo()}
                    {submitButton()}
                </View>
                {loading()}
            </CollapsingToolbar>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('BottomTabScreen')}
                style={styles.submitButtonStyle}>
                <Text style={{ ...Fonts.black19Bold }}>Submit</Text>
            </TouchableOpacity>
        )
    }

    function resendInfo() {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                marginTop: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.gray14Regular }}>
                    Didn't receive OTP Code!
                </Text>
                <Text style={{ ...Fonts.black15Regular, marginLeft: Sizes.fixPadding }}>
                    Resend
                </Text>
            </View>
        )
    }

    function otpFields() {
        const secondTextInput = createRef();
        const thirdTextInput = createRef();
        const forthTextInput = createRef();
        return (
            <View style={styles.otpFieldsContainerStyle}>
                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        selectionColor={Colors.blackColor}
                        style={{ ...Fonts.black17Bold, }}
                        onChangeText={() => { secondTextInput.current.focus(); }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        selectionColor={Colors.blackColor}
                        style={{ ...Fonts.black17Bold, }}
                        ref={secondTextInput}
                        keyboardType="numeric"
                        onChangeText={() => { thirdTextInput.current.focus(); }}
                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        selectionColor={Colors.blackColor}
                        style={{ ...Fonts.black17Bold, }}
                        keyboardType="numeric"
                        ref={thirdTextInput}
                        onChangeText={() => { forthTextInput.current.focus(); }}

                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        selectionColor={Colors.blackColor}
                        style={{ ...Fonts.black17Bold, }}
                        keyboardType="numeric"
                        ref={forthTextInput}
                        onChangeText={() => {
                            updateState({ isLoading: true })
                            setTimeout(() => {
                                updateState({ isLoading: false })
                                navigation.navigate('BottomTabScreen');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <ActivityIndicator color={Colors.primaryColor} size="large" />
                    <Text style={{ ...Fonts.lightGrayColor17Bold, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
                        Please Wait...
                    </Text>
                </View>
            </Dialog.Container>
        );
    }
}

const styles = StyleSheet.create({
    textFieldContainerStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3.0,
        paddingLeft: Sizes.fixPadding - 3.0,
    },
    otpFieldsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 3.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding * 2.0
    }
})

export default VerificationScreen;