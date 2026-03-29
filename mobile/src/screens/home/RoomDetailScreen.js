import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function RoomDetailScreen({ navigation }) {
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [airEnabled, setAirEnabled] = useState(false);
  const [humidifierEnabled, setHumidifierEnabled] = useState(true);
  const [lampEnabled, setLampEnabled] = useState(false);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    // sonra bağlarız
  };

  const openTurnOffModal = (device) => {
    setSelectedDevice(device);
    setConfirmVisible(true);
  };

  const closeTurnOffModal = () => {
    setConfirmVisible(false);
    setSelectedDevice(null);
  };

  const confirmTurnOff = () => {
    if (!selectedDevice) return;

    if (selectedDevice.key === "lamp") {
      setLampEnabled(false);
    }

    if (selectedDevice.key === "speaker") {
      setSpeakerEnabled(false);
    }

    if (selectedDevice.key === "air") {
      setAirEnabled(false);
    }

    if (selectedDevice.key === "humidifier") {
      setHumidifierEnabled(false);
    }

    closeTurnOffModal();
  };

  const handleDeviceToggle = (
    deviceKey,
    isEnabled,
    setState,
    imageSource,
    title
  ) => {
    if (isEnabled) {
      openTurnOffModal({
        key: deviceKey,
        title,
        imageSource,
      });
      return;
    }

    setState(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#24324A" />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.heroCard}>
            <View style={styles.waveLine1} />
            <View style={styles.waveLine2} />
            <View style={styles.waveLine3} />

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.75}
              onPress={handleGoBack}
            >
              <Feather name="arrow-left" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.75}
              onPress={handleEdit}
            >
              <Feather name="edit-2" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <Image
              source={require("../../../assets/images/Nelipse.png")}
              style={styles.heroShadowImage}
              resizeMode="contain"
            />

            <View style={styles.heroImageWrap}>
              <Image
                source={require("../../../assets/images/Ngitar.png")}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.heroTextWrap}>
              <Text style={styles.roomTitle}>Living Room</Text>
              <Text style={styles.roomSubtitle}>4 devices</Text>
            </View>
          </View>

          <View style={styles.temperatureWrap}>
            <View style={styles.tempDropCard}>
              <MaterialCommunityIcons
                name="water-outline"
                size={30}
                color="#68A9FF"
              />
            </View>

            <View style={styles.temperatureCard}>
              <View style={styles.tempIconBoxSmall}>
                <Feather name="thermometer" size={23} color="#F0B63A" />
              </View>

              <View style={styles.tempTextWrap}>
                <Text style={styles.tempLabel}>
                  Current temperature in the Living Room
                </Text>
              </View>

              <Text style={styles.tempValue}>25°</Text>
            </View>
          </View>

          <View style={styles.devicesGrid}>
            <View style={styles.deviceCard}>
              <Image
                source={require("../../../assets/images/Gölge.png")}
                style={styles.deviceShadowImage}
                resizeMode="contain"
              />

              <TouchableOpacity
                style={[
                  styles.verticalSwitch,
                  lampEnabled && styles.verticalSwitchActive,
                ]}
                activeOpacity={0.85}
                onPress={() =>
                  handleDeviceToggle(
                    "lamp",
                    lampEnabled,
                    setLampEnabled,
                    require("../../../assets/images/Nlamp.png"),
                    "lights"
                  )
                }
              >
                <View
                  style={[
                    styles.verticalSwitchThumb,
                    lampEnabled
                      ? styles.verticalSwitchThumbBottom
                      : styles.verticalSwitchThumbTop,
                  ]}
                />
              </TouchableOpacity>

              <Image
                source={require("../../../assets/images/Nlamp.png")}
                style={styles.deviceImage}
                resizeMode="contain"
              />

              <Text style={styles.deviceTitle}>Smart Lamp</Text>
              <Text style={styles.deviceRoom}>Living Room</Text>
            </View>

            <View style={styles.deviceCard}>
              <Image
                source={require("../../../assets/images/Gölge.png")}
                style={styles.deviceShadowImage}
                resizeMode="contain"
              />

              <TouchableOpacity
                style={[
                  styles.verticalSwitch,
                  speakerEnabled && styles.verticalSwitchActive,
                ]}
                activeOpacity={0.85}
                onPress={() =>
                  handleDeviceToggle(
                    "speaker",
                    speakerEnabled,
                    setSpeakerEnabled,
                    require("../../../assets/images/Nspeaker.png"),
                    "speaker"
                  )
                }
              >
                <View
                  style={[
                    styles.verticalSwitchThumb,
                    speakerEnabled
                      ? styles.verticalSwitchThumbBottom
                      : styles.verticalSwitchThumbTop,
                  ]}
                />
              </TouchableOpacity>

              <Image
                source={require("../../../assets/images/Nspeaker.png")}
                style={styles.deviceImage}
                resizeMode="contain"
              />

              <Text style={styles.deviceTitle}>Speaker</Text>
              <Text style={styles.deviceRoom}>Living Room</Text>
            </View>

            <View style={styles.deviceCard}>
              <Image
                source={require("../../../assets/images/Gölge.png")}
                style={styles.deviceShadowImage}
                resizeMode="contain"
              />

              <TouchableOpacity
                style={[
                  styles.verticalSwitch,
                  airEnabled && styles.verticalSwitchActive,
                ]}
                activeOpacity={0.85}
                onPress={() =>
                  handleDeviceToggle(
                    "air",
                    airEnabled,
                    setAirEnabled,
                    require("../../../assets/images/Nair.png"),
                    "air conditioner"
                  )
                }
              >
                <View
                  style={[
                    styles.verticalSwitchThumb,
                    airEnabled
                      ? styles.verticalSwitchThumbBottom
                      : styles.verticalSwitchThumbTop,
                  ]}
                />
              </TouchableOpacity>

              <Image
                source={require("../../../assets/images/Nair.png")}
                style={styles.deviceImage}
                resizeMode="contain"
              />

              <Text style={styles.deviceTitle}>Air Conditioner</Text>
              <Text style={styles.deviceRoom}>Living Room</Text>
            </View>

            <View style={styles.deviceCard}>
              <Image
                source={require("../../../assets/images/Gölge.png")}
                style={styles.deviceShadowImage}
                resizeMode="contain"
              />

              <TouchableOpacity
                style={[
                  styles.verticalSwitch,
                  humidifierEnabled && styles.verticalSwitchActive,
                ]}
                activeOpacity={0.85}
                onPress={() =>
                  handleDeviceToggle(
                    "humidifier",
                    humidifierEnabled,
                    setHumidifierEnabled,
                    require("../../../assets/images/Nhumidifier.png"),
                    "humidifier"
                  )
                }
              >
                <View
                  style={[
                    styles.verticalSwitchThumb,
                    humidifierEnabled
                      ? styles.verticalSwitchThumbBottom
                      : styles.verticalSwitchThumbTop,
                  ]}
                />
              </TouchableOpacity>

              <Image
                source={require("../../../assets/images/Nhumidifier.png")}
                style={styles.deviceImage}
                resizeMode="contain"
              />

              <Text style={styles.deviceTitle}>Humidifier</Text>
              <Text style={styles.deviceRoom}>Living Room</Text>
            </View>
          </View>

          <View style={styles.playerCard}>
            <View style={styles.playerLeft}>
              <Image
                source={require("../../../assets/images/music-cover.png")}
                style={styles.playerCover}
                resizeMode="cover"
              />

              <View style={styles.playerTextWrap}>
                <Text style={styles.playerTitle}>As it was</Text>
                <Text style={styles.playerArtist}>Harry Styles</Text>
              </View>
            </View>

            <View style={styles.playerControls}>
              <TouchableOpacity activeOpacity={0.75}>
                <Feather name="skip-back" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.75} style={styles.pauseBtn}>
                <Feather name="pause" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.75}>
                <Feather name="skip-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>

      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={closeTurnOffModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              activeOpacity={0.75}
              onPress={closeTurnOffModal}
            >
              <Feather name="x" size={28} color="#7B8798" />
            </TouchableOpacity>

            <View style={styles.modalImageCircle}>
              <View style={styles.modalRingOne} />
              <View style={styles.modalRingTwo} />
              <View style={styles.modalRingThree} />
              {selectedDevice?.imageSource ? (
                <Image
                  source={selectedDevice.imageSource}
                  style={styles.modalDeviceImage}
                  resizeMode="contain"
                />
              ) : null}
            </View>

            <Text style={styles.modalTitle}>
              Manage your {selectedDevice?.title || "device"}
            </Text>

            <Text style={styles.modalDescription}>
              This space is reserved for the relevant body type content text
            </Text>

            <TouchableOpacity
              style={styles.modalPrimaryButton}
              activeOpacity={0.85}
              onPress={confirmTurnOff}
            >
              <Text style={styles.modalPrimaryButtonText}>Turn off</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              activeOpacity={0.85}
              onPress={closeTurnOffModal}
            >
              <Text style={styles.modalSecondaryButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  scrollContent: {
    paddingTop: 0,
    paddingBottom: 26,
  },

  heroCard: {
    height: 292,
    borderRadius: 28,
    backgroundColor: "#24324A",
    overflow: "hidden",
    position: "relative",
    marginHorizontal: 0,
  },

  backButton: {
    position: "absolute",
    left: 18,
    top: 50,
    zIndex: 3,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  editButton: {
    position: "absolute",
    right: 18,
    top: 50,
    zIndex: 3,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  heroShadowImage: {
    position: "absolute",
    right: -15,
    top: 65,
    width: 265,
    height: 255,
    zIndex: 0,
  },

  heroImageWrap: {
    position: "absolute",
    right: -15,
    top: 100,
    width: 248,
    height: 196,
    borderTopLeftRadius: 168,
    borderTopRightRadius: 150,
    overflow: "hidden",
    backgroundColor: "transparent",
    zIndex: 1,
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroTextWrap: {
    position: "absolute",
    left: 28,
    bottom: 24,
    zIndex: 2,
  },

  roomTitle: {
    fontSize: 18,
    lineHeight: 30,
    color: "#FFFFFF",
    fontFamily: "CatamaranBold",
  },

  roomSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 22,
    color: "#D7DFEA",
    fontFamily: "NotoSansRegular",
  },

  temperatureWrap: {
    marginTop: 18,
    marginRight: 20,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  tempDropCard: {
    width: 72,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#EEF5FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: -6,
  },

  temperatureCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    minHeight: 80,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#C5CEDA",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  tempIconBoxSmall: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  tempTextWrap: {
    flex: 1,
    paddingRight: 10,
  },

  tempLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#667180",
    fontFamily: "NotoSansRegular",
  },

  tempValue: {
    fontSize: 22,
    lineHeight: 28,
    color: "#4B5563",
    fontFamily: "NotoSansBold",
  },

  devicesGrid: {
    marginTop: 18,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  deviceCard: {
    width: "48.2%",
    minHeight: 178,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#CDD5DF",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  deviceShadowImage: {
    position: "absolute",
    left: -50,
    top: -46,
    width: 150,
    height: 150,
    zIndex: 0,
  },

  verticalSwitch: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#DDE3EB",
    alignItems: "center",
    paddingVertical: 3,
    justifyContent: "flex-start",
    zIndex: 3,
  },

  verticalSwitchActive: {
    backgroundColor: "#2F80ED",
  },

  verticalSwitchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },

  verticalSwitchThumbTop: {
    marginTop: 0,
  },

  verticalSwitchThumbBottom: {
    marginTop: 28,
  },

  deviceImage: {
    width: 42,
    height: 54,
    position: "absolute",
    left: 5,
    top: 10,
    zIndex: 1,
  },

  deviceTitle: {
    marginTop: 108,
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  deviceRoom: {
    marginTop: 3,
    fontSize: 14,
    lineHeight: 20,
    color: "#8B97A8",
    fontFamily: "NotoSansRegular",
  },

  playerCard: {
    marginTop: -10,
    marginHorizontal: 20,
    borderRadius: 18,
    backgroundColor: "#2F80ED",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#2F80ED",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  playerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },

  playerCover: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  playerTextWrap: {
    marginLeft: 12,
    flex: 1,
  },

  playerTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  playerArtist: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 20,
    color: "#DCEBFF",
    fontFamily: "NotoSansRegular",
  },

  playerControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  pauseBtn: {
    marginHorizontal: 16,
  },

  bottomSpacer: {
    height: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(36, 50, 74, 0.28)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  modalCard: {
    width: "100%",
    maxWidth: 440,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingTop: 22,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
    position: "relative",
  },

  modalCloseButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  modalImageCircle: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "#F3F5F8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    position: "relative",
  },

  modalRingOne: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#E5E9EF",
  },

  modalRingTwo: {
    position: "absolute",
    width: 126,
    height: 126,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "#E9EDF3",
  },

  modalRingThree: {
    position: "absolute",
    width: 156,
    height: 156,
    borderRadius: 78,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  modalDeviceImage: {
    width: 74,
    height: 74,
  },

  modalTitle: {
    fontSize: 22,
    lineHeight: 30,
    color: "#2E333A",
    fontFamily: "CatamaranBold",
    textAlign: "center",
  },

  modalDescription: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: "#7E8A9B",
    fontFamily: "NotoSansRegular",
    textAlign: "center",
    paddingHorizontal: 6,
  },

  modalPrimaryButton: {
    marginTop: 28,
    width: "100%",
    height: 62,
    borderRadius: 20,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  modalPrimaryButtonText: {
    fontSize: 17,
    lineHeight: 24,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  modalSecondaryButton: {
    marginTop: 16,
    width: "100%",
    height: 62,
    borderRadius: 20,
    backgroundColor: "#EEF0F3",
    alignItems: "center",
    justifyContent: "center",
  },

  modalSecondaryButtonText: {
    fontSize: 17,
    lineHeight: 24,
    color: "#7B8798",
    fontFamily: "NotoSansMedium",
  },
});
