import React, { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, BackHandler } from "react-native";
import CollapsingToolbar from "../../component/sliverAppBar";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

const AccountSettingScreen = ({ navigation }) => {

    const [state, setState] = useState({
        phoneDialog: false,
        phone: '6798382340',
        changePhone: '6798382340',
        emailDialog: false,
        email: 'bob@gmail.com',
        changeEmail: 'bob@gmail.com',
        passwordDialog: false,
        password: 'Zigbee9*',
        changePassword: 'Zigbee9*',
        isLogout: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        phoneDialog,
        phone,
        changePhone,
        emailDialog,
        email,
        changeEmail,
        passwordDialog,
        password,
        changePassword,
        isLogout,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <CollapsingToolbar
                leftItem={<MaterialIcons name="arrow-back-ios" size={25} color="black"
                    onPress={() => navigation.goBack()}
                />}
                element={
                    <Text style={{ ...Fonts.black25Bold }}>Account Settings</Text>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                childrenMinHeight={730}
                src={require('../../assets/images/appbar_bg.png')}>
                <View style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginTop: Sizes.fixPadding * 4.0
                }}>
                    {userPhoto()}
                    {userName()}
                    {editProfileText()}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ phoneDialog: true })}
                    >
                        {editInfo({ title: 'Phone Number', value: phone })}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ emailDialog: true })}
                    >
                        {editInfo({ title: 'Email', value: email })}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ passwordDialog: true })}
                    >
                        {editInfo({ title: 'Password', value: '******' })}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ isLogout: true })}
                    >
                        {logoutText()}
                    </TouchableOpacity>

                </View>
            </CollapsingToolbar>
            {editPhoneDialog()}
            {editEmailDialog()}
            {editPasswordDialog()}
            {logOutDialog()}
        </SafeAreaView>
    )

    function logOutDialog() {
        return (
            <Dialog.Container visible={isLogout}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        You sure want to logout?
                    </Text>
                    <View style={styles.cancelAndLogoutButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ isLogout: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                updateState({ isLogout: false })
                                navigation.navigate('SignIn')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function editPasswordDialog() {
        return (
            <Dialog.Container visible={passwordDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Your Password
                    </Text>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%',
                    }}>
                        <TextInput
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            placeholder='Old Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50,
                        width: '100%', marginTop: Sizes.fixPadding,
                    }}>
                        <TextInput
                            onChangeText={(value) => updateState({ changePassword: value })}
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            placeholder='New Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%',
                        marginTop: Sizes.fixPadding,
                    }}>
                        <TextInput
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            placeholder='Confirm New Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => updateState({ passwordDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                updateState({
                                    passwordDialog: false,
                                    password: changePassword,
                                })
                            }}
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>

        )
    }

    function editPhoneDialog() {
        return (
            <Dialog.Container visible={phoneDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Phone Number
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={changePhone}
                            onChangeText={(value) => updateState({ changePhone: value })}
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.okAndCancelButtonContainerStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ phoneDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                updateState({
                                    phoneDialog: false,
                                    phone: changePhone
                                })
                            }
                            }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function editEmailDialog() {
        return (
            <Dialog.Container visible={emailDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Email
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={changeEmail}
                            onChangeText={(value) => updateState({ changeEmail: value })}
                            style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={styles.okAndCancelButtonContainerStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ emailDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                updateState({
                                    emailDialog: false,
                                    email: changeEmail
                                })
                            }
                            }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.white15Bold }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function logoutText() {
        return (
            <View>
                <Text style={{
                    ...Fonts.redColor20Bold,
                    alignSelf: 'center', marginTop: Sizes.fixPadding
                }}>
                    Logout
                </Text>
                <View style={{ backgroundColor: '#F4473A', height: 1.0, marginVertical: Sizes.fixPadding }}></View>
            </View>
        )
    }

    function editInfo({ title, value }) {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{
                            ...Fonts.black17Bold,
                            marginTop: Sizes.fixPadding,
                            marginBottom: Sizes.fixPadding - 5.0
                        }}>
                            {title}
                        </Text>
                        <Text style={{ ...Fonts.gray15Bold }}>{value}</Text>
                    </View>
                    <MaterialIcons name="edit" size={30} color="#BDBDBD" />
                </View>
                <View style={{ backgroundColor: 'gray', height: 0.3, marginVertical: Sizes.fixPadding }}>
                </View>
            </View>
        )
    }

    function editProfileText() {
        return (
            <Text style={{ ...Fonts.gray18Bold, marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                Edit Profile
            </Text>
        )
    }

    function userName() {
        return (
            <Text style={{
                ...Fonts.black20Bold, alignSelf: 'center',
                marginTop: Sizes.fixPadding - 3.0
            }}>
                Bob Smith
            </Text>
        )
    }

    function userPhoto() {
        return (
            <Image
                source={require('../../assets/images/user_profile/user_2.jpg')}
                style={{ height: 110.0, width: 110.0, borderRadius: 55.0, alignSelf: 'center' }}
                resizeMode="cover"
            />
        )
    }
}

const styles = StyleSheet.create({
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    okButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    okAndCancelButtonContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding + 5.0
    },
    logOutButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    cancelAndLogoutButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
});

export default AccountSettingScreen;

