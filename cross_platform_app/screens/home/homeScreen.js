import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Image,
    BackHandler,
    ScrollView,
    TextInput,
    Alert
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, Headline, Chip, Snackbar, Switch } from 'react-native-paper';
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel-v4';
import CollapsingToolbar from "../../component/sliverAppBar";
import CircularProgress from 'react-native-circular-progress-indicator';
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Dialog from "react-native-dialog";

const width = Dimensions.get('window').width;

const itemWidth = Math.round(width * 0.7);


// PUSH NOTIFICATIONS


const HomeScreen = ({ navigation }) => {


    
  const [expoPushToken, setExpoPushToken] = useState("");
  const [state, setState] = React.useState("");


  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Irrigation Token",token);
      // await AsyncStorage.setItem("userIdentifier", token)

      setState({ expoPushToken: token });
      // alert(token);
      // console.log("token", token)
      // {console.log(new Date().toISOString())}
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(state)
    );
  }, []);


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <CollapsingToolbar
                rightItem={
                    <MaterialIcons
                        name="notifications"
                        size={25}
                        color="black"
                        onPress={() => navigation.navigate('Notification')}
                    />
                }
                element={
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center'
                    }}>
                        
                        <Text style={{ ...Fonts.black25Bold, fontSize: 20 }}><Text style={{ ...Fonts.black25Bold}}>Bula, Bob Smith</Text>{'\n'}Smart Irrigation Monitoring{'\n'}Mobile App</Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('AccountSetting')}
                        >
                            <Image
                                style={{ height: 80.0, width: 80.0, borderRadius: 40.0, }}
                                source={require('../../assets/images/user_profile/user_2.jpg')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require('../../assets/images/appbar_bg.png')}>
                <View style={{ paddingBottom: Sizes.fixPadding * 7.0 }}>
                    {autoScroller()}
                </View>
                <StatusBar backgroundColor="transparent" />
            </CollapsingToolbar>
        </SafeAreaView>

    )



    function autoScroller() {
        const [moist, setMoist] = useState(0);
        const [pumpstatus, setPumpstatus] = useState("off");
        const [visible, setVisible] = React.useState(false);
        const onToggleSnackBar = () => setVisible(!visible);
        const onDismissSnackBar = () => setVisible(false);
        const [state, setState] = React.useState(false);
        const [isSwitchOn, setIsSwitchOn] = React.useState(false);

        const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

          useEffect(() => {
            const interval = setInterval(() => {
                fetch('https://smartirrigationfiji.com/Home/getGardenMoisture?gardenid=1')
                // fetch('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1')
                .then((response) => response.json())
                .then((json) => setMoist(json))
                .catch((error) => console.error(error))
            }, 3000)
            return () => clearInterval(interval)
          }, []);

          const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

          const pumpOn = () => {
            // console.log(item)
            
                fetch('https://smartirrigationfiji.com/Home/togglepump?gardenid=1&forcetogglepump=true')
                // fetch('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1')
                .then((response) => response.json())
                .then((json) => setPumpstatus(json))
                .then(onToggleSnackBar())
                .catch((error) => console.log(error))
          };

          const pumpOff = () => {
            // console.log(item)
            
                fetch('https://smartirrigationfiji.com/Home/togglepump?gardenid=1&forcetogglepump=false')
                // fetch('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1')
                .then((response) => response.json())
                .then((json) => setPumpstatus(json))
                .then(onToggleSnackBar())
                .catch((error) => console.log(error))
          };

          const formdata = new FormData();

          formdata.append("gardenid", 1)
          formdata.append("preferredMoistureLevel", moistureValue)

          const moistureLevel = () => {
          fetch("https://smartirrigationfiji.com/Home/updatePreferedMoistureLevel", {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formdata
        })

            .then((response) => response.text())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> " + responseData
                )
            })
            .then(Alert.alert("Success","Moisture threshold updated!"), setState(false))
            .done();
        };

        console.log("state", state)
          
        console.log("Value", moist)
        console.log("PumpStatus", pumpstatus)
        console.log("Switch Status", isSwitchOn)
        

        const [moistureValue, setMoistureValue] = React.useState()
        console.log("Moisture Value", moistureValue)

        return (
            <ScrollView>
              <Dialog.Container visible={state}
                    contentStyle={styles.dialogContainerStyle}
                >
                    <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                        <Text style={{ ...Fonts.black20Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                            Set a moisture threshold for your garden (0-100%).
                        </Text>
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%', marginLeft: 20 }}>
                            <TextInput
                                // value={""}
                                onChangeText={(value) => setMoistureValue(value)}
                                style={{ ...Fonts.black15Bold, paddingBottom: Sizes.fixPadding }}
                            />
                        </View>
                        { moistureValue < 0 ? <View><Text style={{ color: "red"}}>Your preferred moisture value should be between 0 to 100%. Please amend your input.</Text></View> : moistureValue >100 ? <View><Text style={{ color: "red"}}>Your preferred moisture value should be between 0 to 100%. Please amend your input.</Text></View> : null}
                        <View style={styles.cancelAndLogoutButtonWrapStyle}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => setState(false)}
                                style={styles.cancelButtonStyle}
                            >
                                <Text style={{ ...Fonts.black15Bold }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9}
                                // onPress={() => {
                                //     Alert.alert("Success","Moisture threshold updated!"), setState(false)
                                // }}
                                onPress={() => moistureLevel()}
                                style={styles.logOutButtonStyle}
                            >
                                <Text style={{ ...Fonts.white15Bold }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Dialog.Container>
              <View style={styles.container}>
                <Snackbar
                  visible={visible}
                  onDismiss={onDismissSnackBar}
                  wrapperStyle={{ bottom: -580 }}
                  action={{
                    label: 'OK',
                    onPress: () => {
                      // Do something
                    },
                  }}>
                  Pump Status Updated!
                </Snackbar>
              </View>
            <Card style={{ marginVertical: 10, marginHorizontal: Sizes.fixPadding}}>
            <Card.Title title="Bobs Labasa Farm (Device: 1F)" subtitle="Lot 4, Nagigi, Labasa" />
            <Card.Content style={{ alignItems: 'center' }}>
                <CircularProgress
                    value={moist}
                    inActiveStrokeColor={'#2ecc71'}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={'#000'}
                    valueSuffix={'%'}
                    title={'Moisture'}
                />
            </Card.Content>
            <View style={{paddingBottom: 10}}>
            {/* <Chip icon="information" color="green" style={{ width: 160, marginLeft: 10 }}>Pump Status: On</Chip> */}
            <View style={{ marginHorizontal: 10}}>
              <View style={styles.containerNew}>
                <View>
                  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#ffc227" />
                </View>
                <View>
                  <Text style={{
                          fontSize: 17,
                          letterSpacing: 0.1,
                          marginTop: 5
                        }}>  Engage Manual Mode</Text>
                </View>
              </View>
            </View>
                { isSwitchOn && <View style={styles.containerNew}>
                  <View style={styles.itemAddons}>
                    <Button
                      mode="contained"
                      uppercase={false}
                      disabled={ pumpstatus === "onn" ? true : false}
                      style={{
                        borderRadius: 10,
                        height: "auto",
                        width: "auto",
                        marginHorizontal: 10,
                        // @ts-ignore
                        // backgroundColor: "green",
                        backgroundColor: pumpstatus === "onn" ? 'grey' : 'green',
                      }}
                      onPress={() => pumpOn()}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          letterSpacing: 0.1,
                          color: "white",
                        }}
                      >
                        { pumpstatus === "onn" ? 'PUMP IS ON' : 'Turn Pump On' }
                      </Text>
                    </Button>
                  </View>
                  <View style={styles.itemAddons}>
                    <Button
                      mode="contained"
                      uppercase={false}
                      disabled={ pumpstatus === "off" ? true : false}
                      style={{
                        borderRadius: 10,
                        height: "auto",
                        width: "auto",
                        marginHorizontal: 10,
                        // @ts-ignore
                        // backgroundColor: "#ffc227",
                        backgroundColor: pumpstatus === "off" ? 'grey' : '#ffc227',

                      }}
                      onPress={() => pumpOff()}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          letterSpacing: 0.1,
                          color: "black",
                        }}
                      >
                        { pumpstatus === "off" ? 'PUMP IS OFF' : 'Turn Pump Off' }
                      </Text>
                    </Button>
                  </View>
                </View>}
              </View>
              <Button
                mode="contained"
                uppercase={false}
                style={{
                borderRadius: 10,
                marginBottom: 20,
                height: "auto",
                width: "auto",
                marginHorizontal: 10,
                // @ts-ignore
                backgroundColor: "#1f76c5",
                }}
                onPress={() => setState(true)}
            >
                <Text
                style={{
                    fontSize: 17,
                    letterSpacing: 0.1,
                    color: "white",
                }}
                >
                Set Moisture Threshold
                </Text>
            </Button>
            </Card>

            <Card style={{ marginVertical: 10, marginHorizontal: Sizes.fixPadding}}>
            <Card.Title title="Bobs Suva Farm (Device: 2D)" subtitle="231 Wainmau Road, Suva" />
            <Card.Content style={{ alignItems: 'center' }}>
                <CircularProgress
                    value={moist}
                    inActiveStrokeColor={'#2ecc71'}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={'#000'}
                    valueSuffix={'%'}
                    title={'Moisture'}
                />
            </Card.Content>
            </Card>
            <Card style={{ marginVertical: 10, marginHorizontal: Sizes.fixPadding}}>
            <Card.Title title="Bobs Rakiraki Farm (Device: 5E)" subtitle="Lal Mitti, Rakiraki" />
            <Card.Content style={{ alignItems: 'center' }}>
                <CircularProgress
                    value={moist}
                    inActiveStrokeColor={'#2ecc71'}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={'#000'}
                    valueSuffix={'%'}
                    title={'Moisture'}
                />
            </Card.Content>
            </Card>
            <Card style={{ marginVertical: 10, marginHorizontal: Sizes.fixPadding}}>
            <Card.Title title="Bobs Ba Farm (Device: 7T)" subtitle="Village 6,Tauvegavega, Ba" />
            <Card.Content style={{ alignItems: 'center' }}>
                <CircularProgress
                    value={moist}
                    inActiveStrokeColor={'#2ecc71'}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={'#000'}
                    valueSuffix={'%'}
                    title={'Moisture'}
                />
            </Card.Content>
            </Card>
            <Card style={{ marginVertical: 10, marginHorizontal: Sizes.fixPadding}}>
            <Card.Title title="Bobs USP Farm (Device: 1W)" subtitle="Laucala Campus" />
            <Card.Content style={{ alignItems: 'center' }}>
                <CircularProgress
                    value={moist}
                    inActiveStrokeColor={'#2ecc71'}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={'#000'}
                    valueSuffix={'%'}
                    title={'Moisture'}
                />
            </Card.Content>
            </Card>
                
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    categoryContainerStyle: {
        width: 140.0,
        height: 140.0,
        borderRadius: 70.0,
        overflow: 'hidden',
        marginRight: Sizes.fixPadding + 5.0
    },
    containerNew: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start", // if you want to fill rows left to right
        paddingTop: "4%",
      },
      itemNew: {
        width: "33%", // is 50% of container width
      },
      itemAddons: {
        width: "50%", // is 50% of container width
      },
    categoryBlurContainerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.50)",
        width: 140.0,
        height: 140.0,
        borderRadius: 70.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    popularCoursesContainerStyle: {
        elevation: 1.0,
        width: 220.0,
        borderRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        overflow: 'hidden',
        marginRight: Sizes.fixPadding * 2.0
    },
    popularCoursesImageStyle: {
        width: 220.0,
        height: 150.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0
    },
    popularCoursesInformationContainerStyle: {
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    instructorsContainerStyle: {
        alignItems: 'center',
        elevation: 2.0,
        width: 180.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding * 2.0
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      zIndex: 99999999,
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
  },
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
});

export default HomeScreen;