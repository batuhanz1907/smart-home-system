import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeEntryScreen from "../screens/home/HomeEntryScreen";
import WelcomeScreen from "../screens/home/WelcomeScreen";
import HomeOverviewScreen from "../screens/home/HomeOverviewScreen";
import SetSpaceNameScreen from "../screens/home/SetSpaceNameScreen";
import ScheduleCustomDateScreen from "../screens/home/ScheduleCustomDateScreen";
import ScheduleSummaryScreen from "../screens/home/ScheduleSummaryScreen";
import AllDevicesScreen from "../screens/home/AllDevicesScreen";
import LinkDeviceScreen from "../screens/home/LinkDeviceScreen";
import SpaceOverviewScreen from "../screens/home/SpaceOverviewScreen";
import DeviceDetailScreen from "../screens/home/DeviceDetailScreen";
import ScenesScreen from "../screens/home/ScenesScreen";
import RoomDetailScreen from "../screens/home/RoomDetailScreen";
import HumidifierDetailScreen from "../screens/home/HumidifierDetailScreen";
import HomeDashboardScreen from "../screens/home/HomeDashboardScreen";
import RoomsMapViewScreen from "../screens/home/RoomsMapViewScreen";
import ProfileScreen from "../screens/home/ProfileScreen";
import StatisticsScreen from "../screens/home/StatisticsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeEntry" component={HomeEntryScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="HomeOverview" component={HomeOverviewScreen} />
      <Stack.Screen name="SetSpaceName" component={SetSpaceNameScreen} />
      <Stack.Screen
        name="ScheduleCustomDate"
        component={ScheduleCustomDateScreen}
      />
      <Stack.Screen
        name="ScheduleSummary"
        component={ScheduleSummaryScreen}
      />
      <Stack.Screen
        name="AllDevices"
        component={AllDevicesScreen}
      />
      <Stack.Screen
        name="LinkDevice"
        component={LinkDeviceScreen}
      />
      <Stack.Screen
        name="SpaceOverview"
        component={SpaceOverviewScreen}
      />
      <Stack.Screen
        name="DeviceDetail"
        component={DeviceDetailScreen}
      />
      <Stack.Screen
        name="Scenes"
        component={ScenesScreen}
      />
      <Stack.Screen
        name="RoomDetail"
        component={RoomDetailScreen}
      />
      <Stack.Screen
        name="HumidifierDetail"
        component={HumidifierDetailScreen}
      />
      <Stack.Screen
        name="HomeDashboard"
        component={HomeDashboardScreen}
      />
      <Stack.Screen
        name="RoomsMapView"
        component={RoomsMapViewScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
      />
    </Stack.Navigator>
  );
}