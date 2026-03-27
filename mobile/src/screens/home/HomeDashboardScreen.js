import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../store/auth/AuthContext";

export default function HomeDashboardScreen({ navigation, route }) {
  const { logout } = useAuth();

  const [lampOn, setLampOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(false);
  const [airOn, setAirOn] = useState(false);
  const [humidifierOn, setHumidifierOn] = useState(true);
  const [bedroomSpeakerOn, setBedroomSpeakerOn] = useState(false);
  const [aromaOn, setAromaOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [turnOffModalVisible, setTurnOffModalVisible] = useState(false);
  const [pendingTurnOffAction, setPendingTurnOffAction] = useState(null);
  const [selectedDeviceImage, setSelectedDeviceImage] = useState(null);

  const scrollRef = useRef(null);
  const [devicesAnchorY, setDevicesAnchorY] = useState(0);
  const [membersAnchorY, setMembersAnchorY] = useState(0);

  const devices = [
    {
      id: 1,
      name: "Smart Lamp",
      room: "Living Room",
      image: require("../../../assets/images/Nlamp.png"),
      state: lampOn,
      toggle: () => setLampOn(!lampOn),
    },
    {
      id: 2,
      name: "Speaker",
      room: "Living Room",
      image: require("../../../assets/images/Nspeaker.png"),
      state: speakerOn,
      toggle: () => setSpeakerOn(!speakerOn),
    },
    {
      id: 3,
      name: "Air Conditioner",
      room: "Living Room",
      image: require("../../../assets/images/Nair.png"),
      state: airOn,
      toggle: () => setAirOn(!airOn),
    },
    {
      id: 4,
      name: "Humidifier",
      room: "Living Room",
      image: require("../../../assets/images/Nhumidifier.png"),
      state: humidifierOn,
      toggle: () => setHumidifierOn(!humidifierOn),
    },
    {
      id: 5,
      name: "Speaker",
      room: "Bedroom",
      image: require("../../../assets/images/Nspeaker.png"),
      state: bedroomSpeakerOn,
      toggle: () => setBedroomSpeakerOn(!bedroomSpeakerOn),
    },
    {
      id: 6,
      name: "Aroma Diffuser",
      room: "Bedroom",
      image: require("../../../assets/images/Nhumidifier.png"),
      state: aromaOn,
      toggle: () => setAromaOn(!aromaOn),
    },
  ];

  const handleDeviceToggle = (currentState, toggleFn, deviceImage) => {
    if (currentState) {
      setSelectedDeviceImage(deviceImage);
      setPendingTurnOffAction(() => toggleFn);
      setTurnOffModalVisible(true);
      return;
    }

    toggleFn();
  };

  const handleConfirmTurnOff = () => {
    if (pendingTurnOffAction) {
      pendingTurnOffAction();
    }
    setTurnOffModalVisible(false);
    setPendingTurnOffAction(null);
    setSelectedDeviceImage(null);
  };

  const handleDismissTurnOff = () => {
    setTurnOffModalVisible(false);
    setPendingTurnOffAction(null);
    setSelectedDeviceImage(null);
  };

  const scrollToDevices = (animated = true) => {
    scrollRef.current?.scrollTo({
      y: Math.max(devicesAnchorY + 260, 0),
      animated,
    });
  };

  const scrollToMembers = (animated = true) => {
    scrollRef.current?.scrollTo({
      y: Math.max(membersAnchorY - 120, 0),
      animated,
    });
  };

  useEffect(() => {
    if (route?.params?.scrollTo === "devices" && devicesAnchorY >= 0) {
      const timer = setTimeout(() => {
        scrollToDevices(true);
      }, 180);
      return () => clearTimeout(timer);
    }

    if (route?.params?.scrollTo === "members" && membersAnchorY > 0) {
      const timer = setTimeout(() => {
        scrollToMembers(true);
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [route?.params?.scrollTo, devicesAnchorY, membersAnchorY]);

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const handleMenuNavigate = (screen) => {
    setMenuOpen(false);
    navigation.navigate(screen);
  };

  const handleMenuDevices = () => {
    setMenuOpen(false);
    setTimeout(() => {
      scrollToDevices(true);
    }, 120);
  };

  const handleMenuMembers = () => {
    setMenuOpen(false);
    setTimeout(() => {
      scrollToMembers(true);
    }, 120);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#24324A" />

      <View style={styles.screen}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.waveLine1} />
            <View style={styles.waveLine2} />
            <View style={styles.waveLine3} />

            <View style={styles.headerTop}>
              <TouchableOpacity
                style={styles.profileRow}
                activeOpacity={0.8}
                onPress={handleProfilePress}
              >
                <Image
                  source={require("../../../assets/images/avatar.png")}
                  style={styles.avatar}
                />

                <View>
                  <Text style={styles.welcomeLabel}>Welcome home,</Text>
                  <Text style={styles.welcomeName}>Kristin</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.headerIcons}>
                <TouchableOpacity
                  style={styles.headerIconButton}
                  activeOpacity={0.8}
                >
                  <Feather name="search" size={22} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.headerDivider} />

                <TouchableOpacity
                  style={styles.headerIconButton}
                  activeOpacity={0.8}
                  onPress={() => setMenuOpen(true)}
                >
                  <Ionicons
                    name="reorder-two-outline"
                    size={24}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.weatherCard}>
              <View style={styles.weatherLeft}>
                <Image
                  source={require("../../../assets/images/weather.png")}
                  style={styles.weatherIcon}
                  resizeMode="contain"
                />

                <View style={styles.weatherTempWrap}>
                  <Text style={styles.weatherLabel}>Partly Cloudy</Text>
                  <Text style={styles.weatherTemp}>23°</Text>
                </View>
              </View>

              <View style={styles.weatherRight}>
                <Text style={styles.weatherLabel}>Humidity</Text>
                <Text style={styles.weatherValue}>67%</Text>
              </View>
            </View>
          </View>

          <View style={styles.quickActionsRow}>
            <View style={styles.quickCard}>
              <View style={styles.quickIconWrapYellow}>
                <Image
                  source={require("../../../assets/images/ampul.png")}
                  style={styles.quickIconImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.quickTextWrap}>
                <Text style={styles.quickTitle}>All lights on</Text>
                <Text style={styles.quickSubtitle}>Home</Text>
              </View>
            </View>

            <View style={styles.quickCard}>
              <View style={styles.quickIconWrapPurple}>
                <Image
                  source={require("../../../assets/images/melodi.png")}
                  style={styles.quickIconImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.quickTextWrap}>
                <Text style={styles.quickTitle}>Play music</Text>
                <Text style={styles.quickSubtitle}>Living room</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View
              style={styles.devicesAnchor}
              onLayout={(event) => {
                setDevicesAnchorY(event.nativeEvent.layout.y);
              }}
            />

            <View style={styles.devicesHeader}>
              <View style={styles.sectionTitleWrap}>
                <Text style={styles.sectionTitle}>Your Devices</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{devices.length}</Text>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.8}>
                <Feather name="more-horizontal" size={20} color="#2F80ED" />
              </TouchableOpacity>
            </View>

            <View style={styles.devicesGrid}>
              {devices.map((device) => (
                <View key={device.id} style={styles.deviceCard}>
                  <Image
                    source={require("../../../assets/images/Gölge.png")}
                    style={styles.deviceShadowImage}
                    resizeMode="contain"
                  />

                  <TouchableOpacity
                    style={[
                      styles.verticalSwitch,
                      device.state && styles.verticalSwitchActive,
                    ]}
                    onPress={() =>
                      handleDeviceToggle(
                        device.state,
                        device.toggle,
                        device.image
                      )
                    }
                    activeOpacity={0.85}
                  >
                    <View
                      style={[
                        styles.switchThumb,
                        device.state
                          ? styles.switchThumbBottom
                          : styles.switchThumbTop,
                      ]}
                    />
                  </TouchableOpacity>

                  <Image
                    source={device.image}
                    style={styles.deviceImage}
                    resizeMode="contain"
                  />

                  <Text style={styles.deviceTitle}>{device.name}</Text>
                  <Text style={styles.deviceRoom}>{device.room}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.moreDevices}>add more devices...</Text>

            <View style={styles.roomsSection}>
              <View style={styles.roomsHeader}>
                <View style={styles.sectionTitleWrap}>
                  <Text style={styles.sectionTitle}>Your Rooms</Text>
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>4</Text>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("RoomsMapView")}
                  style={styles.mapViewButton}
                >
                  <Text style={styles.mapViewText}>map view</Text>
                  <Feather name="chevron-down" size={16} color="#2F80ED" />
                </TouchableOpacity>
              </View>

              <View style={styles.roomsMapCard}>
                <View style={styles.roomsTopBox}>
                  <View style={styles.roomItemCenter}>
                    <Image
                      source={require("../../../assets/icons/yatak.png")}
                      style={styles.roomIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.roomName}>Bedroom</Text>
                    <View style={styles.roomBadge}>
                      <View style={styles.roomBadgeDot} />
                      <Text style={styles.roomBadgeText}>3 devices</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.roomsHorizontalDividerTop} />

                <View style={styles.roomsMiddleBox}>
                  <View style={styles.roomItemCenter}>
                    <Image
                      source={require("../../../assets/icons/salon.png")}
                      style={styles.roomIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.roomName}>Living room</Text>
                    <View style={styles.roomBadge}>
                      <View style={styles.roomBadgeDot} />
                      <Text style={styles.roomBadgeText}>4 devices</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.roomsBottomRow}>
                  <View style={styles.roomsBottomLeftBox}>
                    <View style={styles.roomItemBottomLeft}>
                      <Image
                        source={require("../../../assets/icons/mutfak.png")}
                        style={styles.roomIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.roomName}>Kitchen</Text>
                      <View style={styles.roomBadge}>
                        <View style={styles.roomBadgeDot} />
                        <Text style={styles.roomBadgeText}>1 devices</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.roomsVerticalDivider} />

                  <View style={styles.roomsBottomRightBox}>
                    <View style={styles.roomItemBottomRight}>
                      <Image
                        source={require("../../../assets/icons/yatak.png")}
                        style={styles.roomIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.roomName}>Bathroom</Text>
                      <View style={styles.roomBadge}>
                        <View style={styles.roomBadgeDot} />
                        <Text style={styles.roomBadgeText}>2 devices</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={styles.membersAnchor}
              onLayout={(event) => {
                setMembersAnchorY(event.nativeEvent.layout.y);
              }}
            />

            <View style={styles.membersSection}>
              <View style={styles.membersHeader}>
                <View style={styles.sectionTitleWrap}>
                  <Text style={styles.sectionTitle}>Members</Text>
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>5</Text>
                  </View>
                </View>

                <TouchableOpacity activeOpacity={0.8}>
                  <Feather name="more-horizontal" size={20} color="#2F80ED" />
                </TouchableOpacity>
              </View>

              <View style={styles.membersCard}>
                <View style={styles.membersRow}>
                  <Image
                    source={require("../../../assets/images/1.png")}
                    style={styles.memberAvatar}
                  />
                  <Image
                    source={require("../../../assets/images/2.png")}
                    style={styles.memberAvatarOverlap}
                  />
                  <Image
                    source={require("../../../assets/images/3.png")}
                    style={styles.memberAvatarOverlap}
                  />
                  <Image
                    source={require("../../../assets/images/4.png")}
                    style={styles.memberAvatarOverlap}
                  />
                  <Image
                    source={require("../../../assets/images/5.png")}
                    style={styles.memberAvatarOverlap}
                  />

                  <TouchableOpacity style={styles.addMember} activeOpacity={0.8}>
                    <Feather name="plus" size={22} color="#2F80ED" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {menuOpen && (
          <View style={styles.menuOverlay}>
            <TouchableOpacity
              style={styles.menuBackdrop}
              activeOpacity={1}
              onPress={() => setMenuOpen(false)}
            />

            <View style={styles.sideMenu}>
              <View style={styles.sideMenuWave1} />
              <View style={styles.sideMenuWave2} />
              <View style={styles.sideMenuWave3} />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleMenuNavigate("HomeDashboard")}
              >
                <Text style={[styles.menuItemText, styles.menuItemActive]}>
                  Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleMenuNavigate("RoomsMapView")}
              >
                <Text style={styles.menuItemText}>Rooms</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleMenuDevices}
              >
                <Text style={styles.menuItemText}>Devices</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={handleMenuMembers}>
                <Text style={styles.menuItemText}>Members</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleMenuNavigate("Statistics")}
              >
                <Text style={styles.menuItemText}>Statistics</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleMenuNavigate("Profile")}
              >
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleMenuNavigate("ScheduleCustomDate")}
              >
                <Text style={styles.menuItemText}>Setting</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutRow}
                activeOpacity={0.8}
                onPress={handleLogout}
              >
                <Feather name="log-out" size={18} color="#AAB4C2" />
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Modal
          visible={turnOffModalVisible}
          transparent
          animationType="fade"
          onRequestClose={handleDismissTurnOff}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.turnOffModal}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                activeOpacity={0.8}
                onPress={handleDismissTurnOff}
              >
                <Feather name="x" size={16} color="#9AA4B2" />
              </TouchableOpacity>

              <View style={styles.modalImageWrap}>
                <Image
                  source={
                    selectedDeviceImage ||
                    require("../../../assets/images/device-lamp.png")
                  }
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.modalTitle}>Manage your lights</Text>
              <Text style={styles.modalText}>
                This space is reserved for the relevant{"\n"}body type content
              </Text>

              <TouchableOpacity
                style={styles.modalPrimaryButton}
                activeOpacity={0.85}
                onPress={handleConfirmTurnOff}
              >
                <Text style={styles.modalPrimaryButtonText}>Turn off</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSecondaryButton}
                activeOpacity={0.85}
                onPress={handleDismissTurnOff}
              >
                <Text style={styles.modalSecondaryButtonText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },

  screen: {
    flex: 1,
  },

  header: {
    backgroundColor: "#24324A",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 78,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
    position: "relative",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },

  welcomeLabel: {
    color: "#DDE5F0",
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "NotoSansRegular",
  },

  welcomeName: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "NotoSansMedium",
    marginTop: 2,
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerIconButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  headerDivider: {
    width: 1,
    height: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginHorizontal: 10,
  },

  weatherCard: {
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  weatherLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  weatherIcon: {
    width: 74,
    height: 74,
    marginRight: 12,
  },

  weatherTempWrap: {
    justifyContent: "center",
  },

  weatherTemp: {
    fontSize: 25,
    lineHeight: 24,
    color: "#FFFFFF",
    fontFamily: "NotoSansBold",
    marginTop: 2,
  },

  weatherLabel: {
    color: "#D6DFEA",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "NotoSansRegular",
  },

  weatherRight: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingRight: 14,
  },

  weatherValue: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 24,
    fontFamily: "NotoSansBold",
    marginTop: 2,
  },

  quickActionsRow: {
    marginTop: -42,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  quickCard: {
    width: "48.3%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#C8D1DD",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  quickIconWrapYellow: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFF7E8",
    borderWidth: 1,
    borderColor: "#F6D38A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  quickIconWrapPurple: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F7EFFF",
    borderWidth: 1,
    borderColor: "#E4CEF9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  quickIconImage: {
    width: 28,
    height: 28,
  },

  quickTextWrap: {
    flex: 1,
  },

  quickTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  quickSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#8B97A8",
    fontFamily: "NotoSansRegular",
    marginTop: 2,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 30,
  },

  devicesAnchor: {
    height: 1,
  },

  membersAnchor: {
    height: 1,
  },

  sectionTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "NotoSansMedium",
    color: "#4B5563",
  },

  countBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E7EBF0",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
  },

  countBadgeText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#7E8793",
    fontFamily: "NotoSansMedium",
  },

  devicesHeader: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  devicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  deviceCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    position: "relative",
    minHeight: 164,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#EEF1F5",

    shadowColor: "#101828",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  deviceShadowImage: {
    position: "absolute",
    left: -40,
    top: -32,
    width: 120,
    height: 124,
    zIndex: 0,
  },

  deviceImage: {
    width: 48,
    height: 48,
    position: "absolute",
    left: 2,
    top: 8,
    zIndex: 2,
  },

  deviceTitle: {
    marginTop: 86,
    fontSize: 15,
    lineHeight: 20,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  deviceRoom: {
    color: "#8B97A8",
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "NotoSansRegular",
  },

  verticalSwitch: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 28,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#DDE3EB",
    alignItems: "center",
    paddingVertical: 3,
    zIndex: 3,
  },

  verticalSwitchActive: {
    backgroundColor: "#2F80ED",
  },

  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },

  switchThumbTop: {
    marginTop: 0,
  },

  switchThumbBottom: {
    marginTop: 28,
  },

  moreDevices: {
    textAlign: "center",
    color: "#8B97A8",
    marginTop: 4,
    marginBottom: 12,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "NotoSansRegular",
  },

  roomsSection: {
    marginTop: 6,
  },

  roomsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  mapViewButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  mapViewText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#2F80ED",
    fontFamily: "NotoSansRegular",
    marginRight: 4,
  },

  roomsMapCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8EDF3",
  },

  roomsTopBox: {
    height: 156,
    alignItems: "center",
    justifyContent: "center",
  },

  roomsMiddleBox: {
    height: 224,
    alignItems: "center",
    justifyContent: "center",
  },

  roomsBottomRow: {
    flexDirection: "row",
    height: 140,
  },

  roomsBottomLeftBox: {
    width: "55%",
    alignItems: "center",
    justifyContent: "center",
  },

  roomsBottomRightBox: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },

  roomsHorizontalDividerTop: {
    height: 1,
    backgroundColor: "#E8EDF3",
  },

  roomsVerticalDivider: {
    width: 1,
    backgroundColor: "#E8EDF3",
  },

  roomItemCenter: {
    alignItems: "center",
    justifyContent: "center",
  },

  roomItemBottomLeft: {
    alignItems: "center",
    justifyContent: "center",
  },

  roomItemBottomRight: {
    alignItems: "center",
    justifyContent: "center",
  },

  roomIcon: {
    width: 16,
    height: 16,
  },

  roomName: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
    marginTop: 6,
  },

  roomBadge: {
    marginTop: 10,
    minHeight: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E8EF",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  roomBadgeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2F80ED",
    marginRight: 6,
    borderWidth: 3,
    borderColor: "#DDEBFF",
  },

  roomBadgeText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#7E8793",
    fontFamily: "NotoSansRegular",
  },

  membersSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E8EDF3",
    paddingTop: 16,
  },

  membersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  membersCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  membersRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  memberAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  memberAvatarOverlap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginLeft: -10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  addMember: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    backgroundColor: "#FFFFFF",
  },

  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    zIndex: 100,
  },

  menuBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.10)",
  },

  sideMenu: {
    width: 250,
    backgroundColor: "#F8FAFC",
    paddingTop: 54,
    paddingHorizontal: 18,
    position: "relative",
    overflow: "hidden",
  },

  menuItemText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#7E8793",
    fontFamily: "NotoSansRegular",
    marginBottom: 28,
  },

  menuItemActive: {
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  menuDivider: {
    height: 1,
    backgroundColor: "#E8EDF3",
    marginTop: 20,
    marginBottom: 24,
  },

  logoutRow: {
    position: "absolute",
    left: 18,
    bottom: 42,
    flexDirection: "row",
    alignItems: "center",
  },

  logoutText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#7E8793",
    fontFamily: "NotoSansRegular",
    marginLeft: 10,
  },

  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.18)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  turnOffModal: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
  },

  modalCloseButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  modalImageWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#F3F6FA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 12,
  },

  modalImage: {
    width: 60,
    height: 60,
  },

  modalTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#2F3743",
    fontFamily: "NotoSansMedium",
    textAlign: "center",
  },

  modalText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#98A2B3",
    fontFamily: "NotoSansRegular",
    textAlign: "center",
  },

  modalPrimaryButton: {
    marginTop: 18,
    width: "100%",
    height: 52,
    borderRadius: 14,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  modalPrimaryButtonText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  modalSecondaryButton: {
    marginTop: 10,
    width: "100%",
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EEF1F5",
    alignItems: "center",
    justifyContent: "center",
  },

  modalSecondaryButtonText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#7E8793",
    fontFamily: "NotoSansMedium",
  },
});