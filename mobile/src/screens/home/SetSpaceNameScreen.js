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
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function SetSpaceNameScreen({ navigation }) {
  const [spaceName, setSpaceName] = useState("My Home");

  const route = useRoute();
  const { homeId } = route.params ?? {};

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("HomeOverview");
  };

  const handleSelectName = (name) => {
    setSpaceName(name);
  };

  const handleContinue = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axios.post(
        "http://192.168.1.108:5000/api/homes/create",
        { name: spaceName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdHomeId = res.data._id;

      navigation.navigate("ScheduleSummary", { homeId: createdHomeId });
    } catch (err) {
      console.log("HOME ERROR:", err.response?.data || err.message);
    }
  };

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
              <Text style={styles.headerSubtitle}>Add the first details</Text>
            </View>

            <View style={styles.stepWrapper}>
              <Text style={styles.stepLabel}>Step</Text>
              <Text style={styles.stepValue}>1/7</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.imageCard}>
            <Image
              source={require("../../../assets/images/space-home.jpg")}
              style={styles.spaceImage}
              resizeMode="cover"
            />

            <TouchableOpacity style={styles.imageActionButton}>
              <AntDesign name="picture" size={18} color="#6F7A8B" />
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>What’s your house name?</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                value={spaceName}
                onChangeText={setSpaceName}
                placeholder="My Home"
                placeholderTextColor="#A0A8B7"
                style={styles.input}
              />
            </View>

            <Text style={styles.helperText}>
              No inspiration? Try one of these names.
            </Text>

            <View style={styles.chipsRow}>
              <TouchableOpacity
                style={styles.chip}
                onPress={() => handleSelectName("Home")}
              >
                <Text style={styles.chipText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.chip}
                onPress={() => handleSelectName("Office")}
              >
                <Text style={styles.chipText}>Office</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.chipWide}
                onPress={() => handleSelectName("My happy place")}
              >
                <Text style={styles.chipText}>My happy place</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
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
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  darkHeader: {
    backgroundColor: "#2F3A4E",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 140,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 8,
  },

  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },

  headerCenter: {
    alignItems: "center",
    flex: 1,
    marginTop: 4,
    paddingHorizontal: 8,
  },

  headerTitle: {
    fontSize: 20,
    lineHeight: 30,
    color: "#FFFFFF",
    fontFamily: "NotoSans",
    textAlign: "center",
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 15,
    lineHeight: 24,
    color: "#FFFFFF",
    fontFamily: "",
    textAlign: "center",
  },

  stepWrapper: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 52,
    paddingTop: 2,
    paddingBottom: 4,
  },

  stepLabel: {
    fontSize: 15,
    lineHeight: 16,
    color: "#D6DDE8",
    fontFamily: "NotoSansRegular",
  },

  stepValue: {
    fontSize: 15,
    lineHeight: 24,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
    marginTop: 2,
    textAlign: "right",
  },

  contentCard: {
    flex: 1,
    marginTop: -112,
    paddingHorizontal: 18,
  },

  imageCard: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    padding: 5,
    position: "relative",
  },

  spaceImage: {
    width: "100%",
    height: 196,
    borderRadius: 21,
  },

  imageActionButton: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#9AA5B5",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  formSection: {
    marginTop: 18,
    paddingHorizontal: 2,
  },

  label: {
    fontSize: 16,
    lineHeight: 22,
    color: "#606B7B",
    fontFamily: "NotoSansMedium",
    marginBottom: 12,
  },

  inputWrapper: {
    height: 56,
    borderWidth: 1,
    borderColor: "#DDE3EC",
    borderRadius: 14,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  input: {
    fontSize: 16,
    color: "#576171",
    fontFamily: "NotoSansRegular",
  },

  helperText: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 21,
    color: "#6F7989",
    fontFamily: "NotoSansMedium",
  },

  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  chip: {
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#F3F6FA",
    borderWidth: 1,
    borderColor: "#E1E7F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  chipWide: {
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#F3F6FA",
    borderWidth: 1,
    borderColor: "#E1E7F0",
    alignItems: "center",
    justifyContent: "center",
  },

  chipText: {
    fontSize: 15,
    color: "#8A94A5",
    fontFamily: "NotoSansRegular",
  },

  bottomSection: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },

  continueButton: {
    height: 56,
    borderRadius: 14,
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