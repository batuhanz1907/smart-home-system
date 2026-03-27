import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import OrbitWelcomeVisual from "../../components/home/OrbitWelcomeVisual";

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate("HomeOverview");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.visualSection}>
          <OrbitWelcomeVisual />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>Hello, Kristin!</Text>
          <Text style={styles.subtitle}>Good morning, welcome back.</Text>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <View style={styles.homeIndicator} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingTop: -20,
    paddingBottom: 10,
  },

  visualSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  textSection: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100,
  },

  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    color: "#3E4652",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: "#8B96A8",
  },

  bottomSection: {
    paddingBottom: 20,
  },

  button: {
    width: "100%",
    height: 56,
    borderRadius: 14,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});