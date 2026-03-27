import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function OrbitWelcomeVisual() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.orbitOuter} />
      <View style={styles.orbitMiddle} />
      <View style={styles.orbitInner} />
      <View style={styles.orbitCore} />

      <View style={[styles.dot, styles.dotTop]} />
      <View style={[styles.dot, styles.dotLeft]} />
      <View style={[styles.dot, styles.dotRight]} />
      <View style={[styles.dot, styles.dotBottomLeft]} />
      <View style={[styles.dot, styles.dotBottomRight]} />

      <View style={[styles.deviceBubble, styles.lampBubble]}>
        <Image
          source={require("../../../assets/images/lamp.png")}
          style={styles.deviceIcon}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.deviceBubble, styles.sensorBubble]}>
        <Image
          source={require("../../../assets/images/sensor.png")}
          style={styles.deviceIcon}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.deviceBubble, styles.robotBubble]}>
        <Image
          source={require("../../../assets/images/robot.png")}
          style={styles.deviceIcon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../assets/images/avatar.png")}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 320,
    height: 320,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  orbitOuter: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },

  orbitMiddle: {
    position: "absolute",
    width: 258,
    height: 258,
    borderRadius: 129,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },

  orbitInner: {
    position: "absolute",
    width: 218,
    height: 218,
    borderRadius: 109,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },

  orbitCore: {
    position: "absolute",
    width: 176,
    height: 176,
    borderRadius: 88,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },

  dot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#E3E8EF",
    backgroundColor: "#FAFBFC",
  },

  dotTop: {
    top: 16,
    left: "50%",
    marginLeft: -6,
  },

  dotLeft: {
    left: 10,
    top: "50%",
    marginTop: -6,
  },

  dotRight: {
    right: 10,
    top: "50%",
    marginTop: -6,
  },

  dotBottomLeft: {
    left: 52,
    bottom: 50,
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  dotBottomRight: {
    right: 78,
    bottom: 86,
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  deviceBubble: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#AAB4C3",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: "#F2F4F7",
  },

  lampBubble: {
    top: 54,
    left: 36,
  },

  sensorBubble: {
    top: 56,
    right: 28,
  },

  robotBubble: {
    right: 52,
    bottom: 40,
  },

  deviceIcon: {
    width: 34,
    height: 34,
  },

  avatarContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
    overflow: "hidden",
    backgroundColor: "#F3F5F7",
  },

  avatar: {
    width: "100%",
    height: "100%",
  },
});