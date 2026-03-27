import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const circleSize = Math.min(width * 0.8, 300);

export default function LinkDeviceScreen({ navigation }) {
  const route = useRoute();
  const { roomId, homeId } = route.params || {};

  const [deviceName, setDeviceName] = useState("Smart Lamp");
  const [selectedRoom, setSelectedRoom] = useState("Living room");

  const roomOptions = useMemo(
    () => ["Living room", "Kitchen", "Bedroom"],
    []
  );

  const handleGoBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("AllDevices", {
      roomId,
      homeId,
    });
  };

  const handleContinue = () => {
    navigation.navigate("SpaceOverview", {
      roomId,
      homeId,
      deviceName,
      selectedRoom,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#24324A" />

      <View style={styles.container}>
        <View style={styles.topHeader}>
          <View style={styles.waveCircle1} />
          <View style={styles.waveCircle2} />
          <View style={styles.waveCircle3} />

          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleGoBack}
              activeOpacity={0.75}
            >
              <Feather name="arrow-left" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle}>Link new device</Text>
              <Text style={styles.headerSubtitle}>
                Connect with your space
              </Text>
            </View>

            <TouchableOpacity style={styles.iconButton} activeOpacity={0.75}>
              <Entypo name="dots-three-horizontal" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.deviceHeroWrapper}>
          <View style={styles.deviceCircleOuter}>
            <View style={styles.deviceCircleMiddle}>
              <View style={styles.deviceCircleInner}>
                <Image
                  source={require("../../../assets/images/lamp-lamp.png")}
                  style={styles.deviceImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formSection}>
            <Text style={styles.label}>What is your device name?</Text>

            <TextInput
              value={deviceName}
              onChangeText={setDeviceName}
              placeholder="Enter device name"
              placeholderTextColor="#A2ACB9"
              style={styles.input}
            />

            <Text style={styles.label}>Where is your device located?</Text>

            <View style={styles.roomRow}>
              {roomOptions.map((room) => {
                const isSelected = selectedRoom === room;

                return (
                  <TouchableOpacity
                    key={room}
                    style={[
                      styles.roomButton,
                      isSelected && styles.roomButtonActive,
                    ]}
                    onPress={() => setSelectedRoom(room)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.roomButtonText,
                        isSelected && styles.roomButtonTextActive,
                      ]}
                    >
                      {room}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },

  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },

  topHeader: {
    height: 340,
    backgroundColor: "#24324A",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    paddingHorizontal: 18,
    paddingTop: 14,
    position: "relative",
  },

  waveCircle1: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(255,255,255,0.03)",
    top: 80,
    left: -90,
  },

  waveCircle2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.04)",
    top: 120,
    right: -60,
  },

  waveCircle3: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.03)",
    top: 30,
    right: 40,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 20,
    zIndex: 2,
  },

  iconButton: {
    width: 40,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTextWrap: {
    flex: 1,
    alignItems: "center",
    paddingTop: 18,
    paddingHorizontal: 10,
  },

  headerTitle: {
    fontSize: 20,
    lineHeight: 30,
    color: "#FFFFFF",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 16,
    lineHeight: 22,
    color: "#E3E9F2",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  deviceHeroWrapper: {
    position: "absolute",
    top: 145,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
    elevation: 20,
    pointerEvents: "none",
  },

  deviceCircleOuter: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#CFCFD4",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  deviceCircleMiddle: {
    width: circleSize * 0.84,
    height: circleSize * 0.84,
    borderRadius: (circleSize * 0.84) / 2,
    backgroundColor: "#F1F1F2",
    alignItems: "center",
    justifyContent: "center",
  },

  deviceCircleInner: {
    width: circleSize * 0.67,
    height: circleSize * 0.67,
    borderRadius: (circleSize * 0.67) / 2,
    backgroundColor: "#ECECEE",
    alignItems: "center",
    justifyContent: "center",
  },

  deviceImage: {
    width: circleSize * 0.52,
    height: circleSize * 0.52,
  },

  scrollContent: {
    paddingTop: circleSize * 0.72,
    paddingBottom: 20,
  },

  formSection: {
    paddingHorizontal: 24,
    marginTop: -70,
  },

  label: {
    fontSize: 16,
    lineHeight: 22,
    color: "#667180",
    fontFamily: "NotoSansMedium",
    marginBottom: 12,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#D5DBE4",
    borderRadius: 16,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 16,
    fontSize: 17,
    color: "#4B5563",
    fontFamily: "NotoSansRegular",
    marginBottom: 28,
  },

  roomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  roomButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: "#E8EDF3",
    borderWidth: 1,
    borderColor: "#D5DDE7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  roomButtonActive: {
    backgroundColor: "#F0B63A",
    borderColor: "#F0B63A",
  },

  roomButtonText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#7E8B9C",
    fontFamily: "NotoSansRegular",
    textAlign: "center",
  },

  roomButtonTextActive: {
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: "#F4F4F6",
  },

  continueButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  continueButtonText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },
});