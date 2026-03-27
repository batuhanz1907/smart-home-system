import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../store/auth/AuthContext";

export default function HomeOverviewScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useAuth();

  const handleContinue = () => {
    navigation.navigate("SetSpaceName");
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const handleMenuNavigate = (screen, params) => {
    closeMenu();
    navigation.navigate(screen, params);
  };

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profileWrap}
            activeOpacity={0.8}
            onPress={handleProfilePress}
          >
            <Image
              source={require("../../../assets/images/avatar.png")}
              style={styles.avatar}
              resizeMode="cover"
            />

            <View>
              <Text style={styles.welcomeText}>Welcome home,</Text>
              <Text style={styles.nameText}>Kristin</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="search" size={20} color="#6B7485" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.iconButton} onPress={openMenu}>
              <Ionicons name="reorder-two-outline" size={24} color="#6B7485" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={require("../../../assets/images/home-home.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>
            Looks like you have no{"\n"}spaces set up.
          </Text>

          <Text style={styles.subtitle}>
            Add your house and start your smart life
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.homeIndicator} />
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalWrapper}>
          <Pressable style={styles.overlay} onPress={closeMenu} />

          <View style={styles.sideMenu}>
            <View style={styles.menuHeader}></View>

            <View style={styles.menuList}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuNavigate("HomeDashboard")}
              >
                <Text style={styles.menuItemText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuNavigate("RoomsMapView")}
              >
                <Text style={styles.menuItemText}>Rooms</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  handleMenuNavigate("HomeDashboard", { scrollTo: "devices" })
                }
              >
                <Text style={styles.menuItemText}>Devices</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  handleMenuNavigate("HomeDashboard", { scrollTo: "members" })
                }
              >
                <Text style={styles.menuItemText}>Members</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuNavigate("Statistics")}
              >
                <Text style={styles.menuItemText}>Statistics</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuNavigate("Profile")}
              >
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuNavigate("ScheduleCustomDate")}
              >
                <Text style={styles.menuItemText}>Setting</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={18} color="#98A2B3" />
              <Text style={styles.logoutText}>Log out</Text>
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
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },

  profileWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },

  welcomeText: {
    fontSize: 14,
    color: "#9AA4B5",
    fontFamily: "NotoSansRegular",
  },

  nameText: {
    fontSize: 18,
    color: "#434C59",
    fontFamily: "CatamaranBold",
    lineHeight: 22,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  divider: {
    width: 1,
    height: 22,
    backgroundColor: "#E7EBF1",
    marginHorizontal: 8,
  },

  imageWrapper: {
    alignItems: "center",
    marginTop: 178,
  },

  image: {
    width: 270,
    height: 210,
  },

  textSection: {
    alignItems: "center",
    marginTop: 34,
  },

  title: {
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center",
    color: "#3F4754",
    fontFamily: "CatamaranBold",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#8F98A8",
    fontFamily: "NotoSansRegular",
  },

  button: {
    marginTop: "auto",
    height: 56,
    borderRadius: 14,
    backgroundColor: "#2F80ED",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "NotoSansMedium",
  },

  modalWrapper: {
    flex: 1,
    flexDirection: "row",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
  },

  sideMenu: {
    width: "78%",
    backgroundColor: "#FFFFFF",
    paddingTop: 0,
    paddingHorizontal: 24,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
  },

  menuHeader: {
    marginBottom: 10,
  },

  menuProfileWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },

  menuWelcomeText: {
    fontSize: 14,
    color: "#9AA4B5",
    fontFamily: "NotoSansRegular",
  },

  menuNameText: {
    fontSize: 18,
    color: "#434C59",
    fontFamily: "CatamaranBold",
    lineHeight: 22,
  },

  menuList: {
    marginTop: 4,
  },

  menuItem: {
    paddingVertical: 16,
  },

  menuItemText: {
    fontSize: 17,
    color: "#8A94A6",
    fontFamily: "NotoSansMedium",
  },

  menuItemActive: {
    color: "#2F80ED",
  },

  menuDivider: {
    height: 1,
    backgroundColor: "#E7EBF1",
    marginTop: 12,
    marginBottom: 18,
  },

  logoutRow: {
    marginTop: "auto",
    marginBottom: 36,
    flexDirection: "row",
    alignItems: "center",
  },

  logoutText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#98A2B3",
    fontFamily: "NotoSansMedium",
  },
});