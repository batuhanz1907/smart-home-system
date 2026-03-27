import React from "react"
import { ActivityIndicator, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from "expo-font"

import RootNavigator from "./src/navigation/RootNavigator"
import { AuthProvider } from "./src/store/auth/AuthContext"

export default function App() {
  const [fontsLoaded] = useFonts({
    CatamaranRegular: require("./assets/fonts/Catamaran-Regular.ttf"),
    CatamaranMedium: require("./assets/fonts/Catamaran-Medium.ttf"),
    CatamaranSemiBold: require("./assets/fonts/Catamaran-SemiBold.ttf"),
    CatamaranBold: require("./assets/fonts/Catamaran-Bold.ttf"),

    NotoSansRegular: require("./assets/fonts/NotoSans-Regular.ttf"),
    NotoSansMedium: require("./assets/fonts/NotoSans-Medium.ttf"),
    NotoSansSemiBold: require("./assets/fonts/NotoSans-SemiBold.ttf"),
    NotoSansBold: require("./assets/fonts/NotoSans-Bold.ttf"),
  })

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}