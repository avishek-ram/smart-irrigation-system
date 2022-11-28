
import React, { useState } from "react";
import { Text, useWindowDimensions, } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import { Fonts, Colors } from "../constant/styles";
import CourseOverViewScreen from "../screens/courseOverView/courseOverViewScreen";
import CourseLessonsScreen from "../screens/courseLessons/courseLessonsScreen";

export default TabBarScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'OverView' },
        { key: 'second', title: 'Lessons' },
    ]);

    const layout = useWindowDimensions();

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <CourseOverViewScreen navigation={navigation} />;
            case 'second':
                return <CourseLessonsScreen navigation={navigation} />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.orangeColor, }}
                    tabStyle={{
                        width: layout.width / 2,
                    }}
                    style={{ backgroundColor: Colors.whiteColor, }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ ...Fonts.black17Bold }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
}


