import React, { useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function SpaceOverviewScreen({ navigation }) {
  const route = useRoute();
  const { roomId, homeId } = route.params || {};

  const rooms = useMemo(
    () => [
      { id: 1, name: "Living Room", size: "20 m²" },
      { id: 2, name: "Kitchen", size: "12 m²" },
      { id: 3, name: "Bedroom", size: "16 m²" },
    ],
    []
  );

  const devices = useMemo(
    () => [
      {
        id: 1,
        name: "Smart Lamp",
        room: "Living Room",
        image: require("../../../assets/images/device-lamp.png"),
      },
      {
        id: 2,
        name: "Speaker",
        room: "Living Room",
        image: require("../../../assets/images/device-speaker.png"),
      },
      {
        id: 3,
        name: "Humidifier",
        room: "Living Room",
        image: require("../../../assets/images/airr.png"),
      },
    ],
    []
  );

  const members = useMemo(
    () => [
      {
        id: 1,
        name: "Albert Flores",
        email: "albert.flores@gmail.com",
        image: require("../../../assets/images/albert.png"),
        online: true,
      },
      {
        id: 2,
        name: "Annette Black",
        email: "annette.black@gmail.com",
        image: require("../../../assets/images/annette.png"),
        online: true,
      },
    ],
    []
  );

  const handleGoBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("LinkDevice", {
      roomId,
      homeId,
    });
  };

  const handleDone = () => {
    navigation.navigate("HomeDashboard", {
      roomId,
      homeId,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#24324A" />

      <View style={styles.container}>
        <View style={styles.topHeader}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleGoBack}
              activeOpacity={0.75}
            >
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle}>Create a new space</Text>
              <Text style={styles.headerSubtitle}>Confirm your choices</Text>
            </View>

            <View style={styles.stepWrap}>
              <Text style={styles.stepLabel}>Step</Text>
              <Text style={styles.stepValue}>7/7</Text>
            </View>
          </View>
        </View>

        <View style={styles.homeCardOverlay}>
          <View style={styles.homeCard}>
            <Image
              source={require("../../../assets/images/space-home.jpg")}
              style={styles.homeImage}
              resizeMode="cover"
            />

            <View style={styles.homeTextArea}>
              <Text style={styles.homeTitle}>My Home</Text>
              <Text style={styles.homeAddress}>11-5 Raddington Rd.</Text>
              <Text style={styles.homeAddress}>London, UK</Text>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mainContent}>
            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Rooms</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{rooms.length}</Text>
                </View>
              </View>

              <View style={styles.listCard}>
                {rooms.map((room, index) => (
                  <View key={room.id}>
                    <TouchableOpacity
                      style={styles.rowItem}
                      activeOpacity={room.name === "Living Room" ? 0.7 : 1}
                      onPress={() => {
                        if (room.name === "Living Room") {
                          navigation.navigate("RoomDetail", {
                            roomId,
                            homeId,
                          });
                        }
                      }}
                    >
                      <View>
                        <Text style={styles.primaryText}>{room.name}</Text>
                        <Text style={styles.secondaryText}>{room.size}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.moreButton}
                        activeOpacity={0.7}
                      >
                        <Entypo
                          name="dots-three-horizontal"
                          size={16}
                          color="#2F80ED"
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>

                    {index !== rooms.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Devices</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{devices.length}</Text>
                </View>
              </View>

              <View style={styles.listCard}>
                {devices.map((device, index) => (
                  <View key={device.id}>
                    <TouchableOpacity
                      style={styles.deviceRow}
                      activeOpacity={
                        device.name === "Speaker" || device.name === "Humidifier"
                          ? 0.7
                          : 1
                      }
                      onPress={() => {
                        if (device.name === "Speaker") {
                          navigation.navigate("DeviceDetail", {
                            roomId,
                            homeId,
                          });
                        }

                        if (device.name === "Humidifier") {
                          navigation.navigate("HumidifierDetail", {
                            roomId,
                            homeId,
                          });
                        }
                      }}
                    >
                      <View style={styles.deviceLeft}>
                        <View style={styles.deviceImageWrap}>
                          <Image
                            source={device.image}
                            style={styles.deviceImage}
                            resizeMode="contain"
                          />
                        </View>

                        <View>
                          <Text style={styles.primaryText}>{device.name}</Text>
                          <Text style={styles.secondaryText}>{device.room}</Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={styles.minusButton}
                        activeOpacity={0.7}
                      >
                        <Feather name="minus" size={16} color="#A5B0BE" />
                      </TouchableOpacity>
                    </TouchableOpacity>

                    {index !== devices.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Members</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{members.length}</Text>
                </View>
              </View>

              <View style={styles.listCard}>
                {members.map((member, index) => (
                  <View key={member.id}>
                    <View style={styles.deviceRow}>
                      <View style={styles.deviceLeft}>
                        <View style={styles.memberAvatarWrap}>
                          <Image
                            source={member.image}
                            style={styles.memberAvatar}
                            resizeMode="cover"
                          />
                          {member.online && <View style={styles.onlineDot} />}
                        </View>

                        <View>
                          <Text style={styles.primaryText}>{member.name}</Text>
                          <Text style={styles.secondaryText}>{member.email}</Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={styles.minusButton}
                        activeOpacity={0.7}
                      >
                        <Feather name="minus" size={16} color="#A5B0BE" />
                      </TouchableOpacity>
                    </View>

                    {index !== members.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            activeOpacity={0.85}
          >
            <Text style={styles.doneButtonText}>Done</Text>
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
    backgroundColor: "#F4F4F6",
  },

  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },

  topHeader: {
    height: 180,
    backgroundColor: "#24324A",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 14,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 20,
  },

  iconButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  headerTextWrap: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  headerTitle: {
    fontSize: 18,
    lineHeight: 28,
    color: "#FFFFFF",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 16,
    lineHeight: 22,
    color: "#DDE4EE",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  stepWrap: {
    alignItems: "flex-end",
    minWidth: 42,
    marginTop: 5,
  },

  stepLabel: {
    fontSize: 13,
    lineHeight: 34,
    color: "#D8E0EA",
    fontFamily: "NotoSansRegular",
  },

  stepValue: {
    marginTop: -4,
    fontSize: 13,
    lineHeight: 18,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  homeCardOverlay: {
    position: "absolute",
    top: 130,
    left: 16,
    right: 16,
    zIndex: 20,
    elevation: 8,
  },

  homeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#ADB7C5",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  homeImage: {
    width: 130,
    height: 130,
    borderRadius: 14,
  },

  homeTextArea: {
    marginLeft: 28,
    flex: 1,
  },

  homeTitle: {
    fontSize: 28,
    lineHeight: 32,
    color: "#4B5563",
    fontFamily: "CatamaranBold",
  },

  homeAddress: {
    fontSize: 14,
    lineHeight: 20,
    color: "#8A94A3",
    fontFamily: "NotoSansRegular",
    marginTop: 1,
  },

  scrollContent: {
    paddingTop: 88,
    paddingBottom: 20,
  },

  mainContent: {
    paddingHorizontal: 16,
  },

  sectionBlock: {
    marginTop: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#4E5867",
    fontFamily: "NotoSansMedium",
  },

  countBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E6E9EE",
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

  listCard: {
    backgroundColor: "#F7F7F8",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ECEEF2",
  },

  rowItem: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  deviceRow: {
    minHeight: 74,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  deviceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  primaryText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4A5361",
    fontFamily: "NotoSansMedium",
  },

  secondaryText: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 20,
    color: "#97A0AE",
    fontFamily: "NotoSansRegular",
  },

  moreButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  minusButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#E7EAF0",
  },

  deviceImageWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF1F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  deviceImage: {
    width: 26,
    height: 26,
  },

  memberAvatarWrap: {
    width: 40,
    height: 40,
    marginRight: 12,
    position: "relative",
  },

  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  onlineDot: {
    position: "absolute",
    right: -1,
    bottom: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22C55E",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  bottomArea: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
    backgroundColor: "#F4F4F6",
  },

  doneButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  doneButtonText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  homeIndicator: {
    alignSelf: "center",
    width: 120,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#0F172A",
    opacity: 0.15,
    marginTop: 14,
  },
});