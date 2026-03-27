import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function RoomsMapViewScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const rooms = useMemo(
    () => [
      {
        id: 1,
        name: "Living Room",
        devices: 4,
        image: require("../../../assets/images/Nkoltuk.png"),
      },
      {
        id: 2,
        name: "Kitchen",
        devices: 1,
        image: require("../../../assets/images/Ntencere.png"),
      },
      {
        id: 3,
        name: "Bedroom",
        devices: 1,
        image: require("../../../assets/images/Ntencere.png"),
      },
      {
        id: 4,
        name: "Bathroom",
        devices: 2,
        image: require("../../../assets/images/Nkabin.png"),
      },
    ],
    []
  );

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleGoBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("HomeDashboard");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#24324A" />

      <View style={styles.container}>
        <View style={styles.topHeader}>
          <View style={styles.waveLine1} />
          <View style={styles.waveLine2} />
          <View style={styles.waveLine3} />

          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleGoBack}
              activeOpacity={0.75}
            >
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>All rooms</Text>
            </View>

            <TouchableOpacity style={styles.iconButton} activeOpacity={0.75}>
              <Entypo
                name="dots-three-horizontal"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchWrap}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            placeholderTextColor="#A0A9B8"
            style={styles.searchInput}
          />
          <Feather name="search" size={19} color="#A0A9B8" />
        </View>

        <View style={styles.content}>
          <View style={styles.roomsHeader}>
            <View style={styles.sectionTitleWrap}>
              <Text style={styles.sectionTitle}>Your Rooms</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{rooms.length}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.listViewButton}
              activeOpacity={0.8}
            >
              <Text style={styles.listViewText}>List View</Text>
              <Feather name="chevron-down" size={16} color="#2F80ED" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {filteredRooms.map((room) => (
              <TouchableOpacity
                key={room.id}
                style={styles.roomCard}
                activeOpacity={0.85}
                onPress={() => {
                  if (room.name === "Living Room") {
                    navigation.navigate("RoomDetail");
                  }
                }}
              >
                <View style={styles.roomTextWrap}>
                  <Text style={styles.roomTitle}>{room.name}</Text>

                  <View style={styles.roomBadge}>
                    <View style={styles.roomBadgeDot} />
                    <Text style={styles.roomBadgeText}>
                      {room.devices} {room.devices === 1 ? "device" : "devices"}
                    </Text>
                  </View>
                </View>

                <View style={styles.roomImageWrap}>
                  <Image
                    source={require("../../../assets/images/Gölge.png")}
                    style={styles.roomShadowImage}
                    resizeMode="contain"
                  />

                  <Image
                    source={room.image}
                    style={styles.roomImage}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </View>

        <View style={styles.homeIndicator} />
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
    height: 156,
    backgroundColor: "#24324A",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
    position: "relative",
    paddingTop: 18,
    paddingHorizontal: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    zIndex: 2,
  },

  iconButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  searchWrap: {
    marginTop: -12,
    marginHorizontal: 16,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EBF1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    zIndex: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: "#4B5563",
    fontFamily: "NotoSansRegular",
    marginRight: 10,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  roomsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
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

  listViewButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  listViewText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#2F80ED",
    fontFamily: "NotoSansRegular",
    marginRight: 4,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  roomCard: {
    minHeight: 106,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEFF4",
    marginBottom: 12,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
  },

  roomTextWrap: {
    zIndex: 2,
    width: "56%",
  },

  roomTitle: {
    fontSize: 20,
    lineHeight: 26,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  roomBadge: {
    marginTop: 10,
    minHeight: 28,
    alignSelf: "flex-start",
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

  roomImageWrap: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    width: "46%",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  roomShadowImage: {
    position: "absolute",
    right: -58,
    top: -18,
    width: 126,
    height: 150,
    zIndex: 0,
  },

  roomImage: {
    width: 124,
    height: 96,
    marginRight: 4,
    zIndex: 1,
  },

  bottomSpacer: {
    height: 18,
  },

});