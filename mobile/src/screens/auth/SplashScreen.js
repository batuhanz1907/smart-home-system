import React from "react"
import { View, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"

import AppText from "../../components/common/AppText"
import AppButton from "../../components/common/AppButton"
import colors from "../../theme/colors"

export default function SplashScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../../assets/images/splash-home.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <AppText style={styles.title}>
          Easy living with your{"\n"}smart home 💡
        </AppText>

        <AppText style={styles.description}>
          Get your smart devices in one place and manage all of these with a
          few taps.
        </AppText>

        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={styles.dot} />

          <View style={styles.activeDotOuter}>
            <View style={styles.activeDotInner} />
          </View>

          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <AppButton
          title="Continue"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },

  imageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 8,
  },

  image: {
    width: 340,
    height: 440,
    marginLeft: 25,
  },

  content: {
    alignItems: "center",
    marginTop: -8,
  },

  title: {
  fontSize: 28,
  fontFamily: "CatamaranBold",
  textAlign: "center",
  color: "#344054",
  lineHeight: 38,
  marginBottom: 14,
},

  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#98A2B3",
    lineHeight: 22,
    maxWidth: 300,
  },

  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#D0D5DD",
    marginHorizontal: 5,
  },

  activeDotOuter: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: "transparent",
  },

  activeDotInner: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  buttonWrapper: {
    width: "100%",
    marginTop: 12,
  },
})