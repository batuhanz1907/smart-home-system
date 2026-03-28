import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const COUNTRY_CODES = [
  { code: "+49", flag: "🇩🇪", label: "Germany" },
  { code: "+90", flag: "🇹🇷", label: "Turkey" },
  { code: "+1", flag: "🇺🇸", label: "United States" },
  { code: "+44", flag: "🇬🇧", label: "United Kingdom" },
  { code: "+33", flag: "🇫🇷", label: "France" },
];

export default function ProfileScreen({ navigation }) {
  const [fullName, setFullName] = useState("Kristin Jones");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phone, setPhone] = useState("30 901820");
  const [email, setEmail] = useState("kristin@gmail.com");
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  const handleGoBack = () => {
    try {
      if (navigation?.canGoBack && navigation.canGoBack()) {
        navigation.goBack();
        return;
      }
    } catch (error) {
      console.log("goBack error:", error);
    }

    if (navigation?.navigate) {
      navigation.navigate("HomeDashboard");
    }
  };

  const handleOpenPhotoOptions = () => {
    setPhotoModalVisible(true);
  };

  const handleViewPhoto = () => {
    setPhotoModalVisible(false);
    console.log("View photo clicked");
  };

  const handleUploadPhoto = () => {
    setPhotoModalVisible(false);
    console.log("Upload photo clicked");
  };

  const handleRemovePhoto = () => {
    setPhotoModalVisible(false);
    console.log("Remove photo clicked");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F6" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={handleGoBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Feather name="arrow-left" size={22} color="#4B5563" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Account informations</Text>

          <View style={styles.avatarSection}>
            <Image
              source={require("../../../assets/images/Ndaire.png")}
              style={styles.profileRings}
              resizeMode="contain"
            />

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.avatarPressArea}
              onPress={handleOpenPhotoOptions}
            >
              <View style={styles.avatarWrap}>
                <Image
                  source={require("../../../assets/images/avatar.png")}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              activeOpacity={0.8}
              onPress={handleOpenPhotoOptions}
            >
              <Feather name="image" size={20} color="#2F80ED" />
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#9AA4B2"
            />

            <Text style={styles.label}>Phone</Text>
            <View style={styles.phoneInputWrap}>
              <TouchableOpacity
                style={styles.flagSection}
                activeOpacity={0.8}
                onPress={() => setCountryModalVisible(true)}
              >
                <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                <Feather name="chevron-down" size={16} color="#A0A9B8" />
              </TouchableOpacity>

              <View style={styles.phoneDivider} />

              <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>

              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.phoneInput}
                placeholder="Phone"
                placeholderTextColor="#9AA4B2"
                keyboardType="phone-pad"
              />
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9AA4B2"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={countryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCountryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setCountryModalVisible(false)}
          />

          <View style={styles.countryModal}>
            {COUNTRY_CODES.map((item) => (
              <TouchableOpacity
                key={`${item.code}-${item.label}`}
                style={styles.countryItem}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedCountry(item);
                  setCountryModalVisible(false);
                }}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <Text style={styles.countryLabel}>{item.label}</Text>
                <Text style={styles.countryCode}>{item.code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal
        visible={photoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View style={styles.photoModalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setPhotoModalVisible(false)}
          />

          <View style={styles.photoModalCard}>
            <Text style={styles.photoModalTitle}>Profile Photo</Text>

            <TouchableOpacity
              style={styles.photoOption}
              activeOpacity={0.8}
              onPress={handleViewPhoto}
            >
              <Feather name="eye" size={18} color="#4B5563" />
              <Text style={styles.photoOptionText}>View photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoOption}
              activeOpacity={0.8}
              onPress={handleUploadPhoto}
            >
              <Feather name="upload" size={18} color="#4B5563" />
              <Text style={styles.photoOptionText}>Upload photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoOption}
              activeOpacity={0.8}
              onPress={handleRemovePhoto}
            >
              <Feather name="trash-2" size={18} color="#E25555" />
              <Text style={[styles.photoOptionText, styles.removeText]}>
                Remove photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              activeOpacity={0.8}
              onPress={() => setPhotoModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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

  scrollContent: {
    paddingBottom: 30,
  },

  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 18,
  },

  backButton: {
    width: 40,
    height: 40,
    marginTop: 12,
    marginLeft: -6,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  headerTitle: {
    marginTop: 2,
    fontSize: 28,
    lineHeight: 34,
    color: "#4B5563",
    fontFamily: "CatamaranBold",
    textAlign: "center",
  },

  avatarSection: {
    height: 320,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    position: "relative",
  },

  profileRings: {
    position: "absolute",
    width: 300,
    height: 300,
    zIndex: 0,
  },

  avatarPressArea: {
    zIndex: 1,
    borderRadius: 100,
  },

  avatarWrap: {
    width: 168,
    height: 168,
    borderRadius: 84,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },

  avatar: {
    width: "100%",
    height: "100%",
  },

  uploadButton: {
    position: "absolute",
    bottom: 38,
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#B8C2CF",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    zIndex: 2,
  },

  formSection: {
    marginTop: 8,
  },

  label: {
    fontSize: 18,
    lineHeight: 24,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
    marginBottom: 10,
    marginTop: 14,
  },

  input: {
    height: 58,
    borderWidth: 1,
    borderColor: "#D8E0EA",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 17,
    color: "#4B5563",
    fontFamily: "NotoSansRegular",
  },

  phoneInputWrap: {
    height: 58,
    borderWidth: 1,
    borderColor: "#D8E0EA",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  flagSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },

  flagText: {
    fontSize: 22,
    marginRight: 6,
  },

  phoneDivider: {
    width: 1,
    height: 26,
    backgroundColor: "#E3E8EF",
    marginRight: 10,
  },

  countryCodeText: {
    fontSize: 17,
    color: "#4B5563",
    fontFamily: "NotoSansRegular",
    marginRight: 8,
  },

  phoneInput: {
    flex: 1,
    fontSize: 17,
    color: "#4B5563",
    fontFamily: "NotoSansRegular",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 26,
    backgroundColor: "rgba(15, 23, 42, 0.14)",
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  countryModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 8,
    shadowColor: "#101828",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  countryFlag: {
    fontSize: 22,
    marginRight: 12,
  },

  countryLabel: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansRegular",
  },

  countryCode: {
    fontSize: 15,
    lineHeight: 20,
    color: "#7E8793",
    fontFamily: "NotoSansMedium",
  },

  photoModalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.18)",
  },

  photoModalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },

  photoModalTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
    marginBottom: 12,
    textAlign: "center",
  },

  photoOption: {
    height: 54,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "#F8FAFC",
    marginTop: 10,
  },

  photoOptionText: {
    marginLeft: 12,
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansRegular",
  },

  removeText: {
    color: "#E25555",
  },

  cancelButton: {
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF3F8",
    marginTop: 16,
  },

  cancelButtonText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },
});
