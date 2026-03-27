import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

export default function AllDevicesScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Smart Lamp",
      status: "connected",
      image: require("../../../assets/images/device-lamp.png"),
    },
    {
      id: 2,
      name: "Speaker",
      status: "not_connected",
      image: require("../../../assets/images/device-speaker.png"),
    },
    {
      id: 3,
      name: "Humidifier",
      status: "not_connected",
      image: require("../../../assets/images/device-humidifier.png"),
    },
  ]);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("ScheduleSummary");
  };

  const toggleDeviceStatus = (id) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id
          ? {
              ...device,
              status:
                device.status === "connected"
                  ? "not_connected"
                  : "connected",
            }
          : device
      )
    );
  };

  const handleContinue = () => {
    navigation.navigate("LinkDevice");
  };

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2F3A4E" />

      <View style={styles.container}>
        <View style={styles.darkHeader}>
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleGoBack}
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Create a new space</Text>
              <Text style={styles.headerSubtitle}>Connect your devices</Text>
            </View>

            <View style={styles.stepWrapper}>
              <Text style={styles.stepLabel}>Step</Text>
              <Text style={styles.stepValue}>4/7</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.homeCard}>
            <Image
              source={require("../../../assets/images/space-home.jpg")}
              style={styles.homeCardImage}
              resizeMode="cover"
            />

            <View style={styles.homeCardTextArea}>
              <Text style={styles.homeCardTitle}>My Home</Text>
              <Text style={styles.homeCardAddress}>
                11-5 Raddington Rd.
              </Text>
              <Text style={styles.homeCardAddress}>London, UK</Text>
            </View>
          </View>

          <View style={styles.searchWrapper}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="#9AA4B5"
              style={styles.searchInput}
            />
            <Feather name="search" size={20} color="#A7B0BF" />
          </View>

          <Text style={styles.sectionTitle}>Current devices nearby</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            {filteredDevices.map((device, index) => {
              const isConnected = device.status === "connected";

              return (
                <View key={device.id}>
                  <View style={styles.deviceRow}>
                    <View style={styles.deviceLeft}>
                      <Image
                        source={device.image}
                        style={styles.deviceImage}
                        resizeMode="contain"
                      />

                      <View>
                        <Text style={styles.deviceName}>{device.name}</Text>

                        <View style={styles.statusRow}>
                          <View
                            style={[
                              styles.statusDot,
                              isConnected
                                ? styles.statusDotConnected
                                : styles.statusDotDisconnected,
                            ]}
                          >
                            <Text
                              style={[
                                styles.statusDotSymbol,
                                isConnected
                                  ? styles.statusDotSymbolConnected
                                  : styles.statusDotSymbolDisconnected,
                              ]}
                            >
                              {isConnected ? "✓" : "−"}
                            </Text>
                          </View>

                          <Text
                            style={[
                              styles.statusText,
                              isConnected
                                ? styles.statusTextConnected
                                : styles.statusTextDisconnected,
                            ]}
                          >
                            {isConnected ? "connected" : "not connected"}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => toggleDeviceStatus(device.id)}
                      activeOpacity={0.8}
                    >
                      <AntDesign
                        name={isConnected ? "minus" : "plus"}
                        size={18}
                        color={isConnected ? "#9EB1CC" : "#2F80ED"}
                      />
                    </TouchableOpacity>
                  </View>

                  {index !== filteredDevices.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
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
    backgroundColor: "#F6F7FA",
  },

  container: {
    flex: 1,
    backgroundColor: "#F6F7FA",
  },

  darkHeader: {
    backgroundColor: "#2F3A4E",
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 112,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 35,
  },

  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  headerCenter: {
    alignItems: "center",
    flex: 1,
    marginTop: 6,
    paddingHorizontal: 8,
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
    fontSize: 18,
    lineHeight: 24,
    color: "#D8DEE8",
    fontFamily: "CatamaranSemiBold",
    textAlign: "center",
  },

  stepWrapper: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 52,
    paddingTop: 8,
    paddingBottom: 4,
  },

  stepLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: "#D6DDE8",
    fontFamily: "NotoSansRegular",
  },

  stepValue: {
    fontSize: 14,
    lineHeight: 15,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
    marginTop: 2,
    textAlign: "right",
  },

  contentCard: {
    flex: 1,
    marginTop: -84,
    marginHorizontal: 12,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    paddingTop: 18,
    paddingHorizontal: 16,
    overflow: "hidden",
  },

  homeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 12,
    shadowColor: "#A9B3C2",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  homeCardImage: {
    width: 92,
    height: 92,
    borderRadius: 18,
  },

  homeCardTextArea: {
    marginLeft: 16,
    flex: 1,
  },

  homeCardTitle: {
    fontSize: 24,
    lineHeight: 30,
    color: "#4A5361",
    fontFamily: "CatamaranBold",
  },

  homeCardAddress: {
    marginTop: 2,
    fontSize: 15,
    lineHeight: 22,
    color: "#8E98A8",
    fontFamily: "NotoSansRegular",
  },

  searchWrapper: {
    height: 54,
    borderWidth: 1,
    borderColor: "#DDE3EC",
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#4E5766",
    fontFamily: "NotoSansRegular",
    marginRight: 10,
  },

  sectionTitle: {
    marginTop: 22,
    fontSize: 16,
    lineHeight: 22,
    color: "#5B6575",
    fontFamily: "NotoSansMedium",
  },

  listContent: {
    paddingTop: 14,
    paddingBottom: 12,
  },

  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 84,
  },

  deviceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  deviceImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
  },

  deviceName: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4A5361",
    fontFamily: "NotoSansMedium",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  statusDotConnected: {
    backgroundColor: "#DDF6EA",
  },

  statusDotDisconnected: {
    backgroundColor: "#EEF1F6",
  },

  statusDotSymbol: {
    fontSize: 10,
    lineHeight: 10,
    fontFamily: "NotoSansMedium",
  },

  statusDotSymbolConnected: {
    color: "#5CCB92",
  },

  statusDotSymbolDisconnected: {
    color: "#B7C0CD",
  },

  statusText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "NotoSansRegular",
  },

  statusTextConnected: {
    color: "#5CCB92",
  },

  statusTextDisconnected: {
    color: "#8F98A8",
  },

  actionButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF1F5",
    marginVertical: 8,
  },

  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
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
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },
});