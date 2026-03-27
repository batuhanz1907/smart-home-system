import React, { useCallback, useMemo, useRef, useState } from "react";
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
  Dimensions,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MIN_SIZE = 0;
const MAX_SIZE = 100;
const TICK_SPACING = 16;
const INITIAL_SIZE = 20;

export default function SpaceTypeScreen({ navigation }) {
  const [roomName, setRoomName] = useState("Living room");
  const [unit, setUnit] = useState("m2");
  const [roomSize, setRoomSize] = useState(INITIAL_SIZE);

  const route = useRoute();
  const { homeId } = route.params ?? {};

  const scrollRef = useRef(null);
  const [rulerPadding, setRulerPadding] = useState(
    Dimensions.get("window").width / 2
  );
  const isLayoutDone = useRef(false);

  if (!homeId) {
    console.log("HOME ID YOK!");
  }

  const sizes = useMemo(() => {
    return Array.from(
      { length: MAX_SIZE - MIN_SIZE + 1 },
      (_, i) => MIN_SIZE + i
    );
  }, []);

  const onRulerLayout = useCallback(
    (e) => {
      if (isLayoutDone.current) return;

      isLayoutDone.current = true;

      const w = e.nativeEvent.layout.width;
      const padding = w / 2;
      setRulerPadding(padding);

      const index = roomSize - MIN_SIZE;

      setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: index * TICK_SPACING,
          animated: false,
        });
      }, 200);
    },
    [roomSize]
  );

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("SetSpaceName");
  };

  const saveRoom = async () => {
    if (!homeId) {
      throw new Error("homeId yok");
    }

    const token = await AsyncStorage.getItem("token");
    console.log("TOKEN:", token);

    return await axios.post(
      "http://192.168.1.108:5000/api/rooms",
      {
        name: roomName,
        size: roomSize,
        unit: unit,
        homeId: homeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / TICK_SPACING);
    const value = Math.min(MAX_SIZE, Math.max(MIN_SIZE, MIN_SIZE + index));
    setRoomSize(value);
  };

  const handleScrollEnd = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / TICK_SPACING);
    const value = Math.min(MAX_SIZE, Math.max(MIN_SIZE, MIN_SIZE + index));

    setRoomSize(value);

    scrollRef.current?.scrollTo({
      x: index * TICK_SPACING,
      animated: true,
    });
  };

  const handleSelectSize = (size) => {
    setRoomSize(size);

    const index = size - MIN_SIZE;
    scrollRef.current?.scrollTo({
      x: index * TICK_SPACING,
      animated: true,
    });
  };

  const handleContinue = async () => {
    try {
      const res = await saveRoom();

      console.log("BACKEND RESPONSE:", res.data);

      const room = res.data.room;

      navigation.navigate("LinkDevice", {
        roomId: room._id,
        homeId: homeId,
      });
    } catch (err) {
      console.log("ROOM ERROR:", err.response?.data || err.message);
    }
  };

  const renderTick = (size) => {
  const isMajor = size % 5 === 0;

  return (
    <TouchableOpacity
      key={size}
      activeOpacity={0.8}
      onPress={() => handleSelectSize(size)}
      style={[styles.tickTouch, { width: TICK_SPACING }]}
    >
      <View
        style={[
          styles.tick,
          isMajor && styles.tickMajor,
        ]}
      />
    </TouchableOpacity>
  );
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
              <Text style={styles.headerSubtitle}>Organise your space</Text>
            </View>

            <View style={styles.stepWrapper}>
              <Text style={styles.stepLabel}>Step</Text>
              <Text style={styles.stepValue}>3/7</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.topHandle} />

          <View style={styles.imageCard}>
            <Image
              source={require("../../../assets/images/room-cover.png")}
              style={styles.roomImage}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.imageActionButton}
              activeOpacity={0.8}
            >
              <AntDesign name="picture" size={18} color="#2F80ED" />
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>What’s your room name?</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                value={roomName}
                onChangeText={setRoomName}
                placeholder="Living room"
                placeholderTextColor="#A0A8B7"
                style={styles.input}
              />
            </View>

            <Text style={[styles.label, styles.secondLabel]}>
              What’s your room size?
            </Text>

            <View style={styles.unitRow}>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "m2" && styles.unitButtonActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setUnit("m2")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    unit === "m2" && styles.radioOuterActive,
                  ]}
                >
                  {unit === "m2" && <View style={styles.radioInner} />}
                </View>
                <Text
                  style={[
                    styles.unitButtonText,
                    unit === "m2" && styles.unitButtonTextActive,
                  ]}
                >
                  size in m²
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "ft2" && styles.unitButtonActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setUnit("ft2")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    unit === "ft2" && styles.radioOuterActive,
                  ]}
                >
                  {unit === "ft2" && <View style={styles.radioInner} />}
                </View>
                <Text
                  style={[
                    styles.unitButtonText,
                    unit === "ft2" && styles.unitButtonTextActive,
                  ]}
                >
                  size in ft²
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sizeValueWrapper}>
              <Text style={styles.sizeValue}>{roomSize}</Text>
              <Text style={styles.sizeUnit}>
                {unit === "m2" ? "m²" : "ft²"}
              </Text>
            </View>

            <View style={styles.rulerWrapper} onLayout={onRulerLayout}>
              <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{
                  paddingHorizontal: rulerPadding,
                  alignItems: "center",
                }}
                snapToInterval={TICK_SPACING}
                decelerationRate="fast"
                scrollEventThrottle={16}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleScrollEnd}
                onScrollEndDrag={handleScrollEnd}
              >
                {sizes.map(renderTick)}
              </ScrollView>

              <View pointerEvents="none" style={styles.centerIndicator} />
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
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
    marginTop: 10,
  },

  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  headerCenter: {
    alignItems: "center",
    flex: 1,
    marginTop: 4,
    paddingHorizontal: 8,
  },

  headerTitle: {
    fontSize: 20,
    lineHeight: 100,
    color: "#FFFFFF",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  headerSubtitle: {
    marginTop: -25,
    fontSize: 15,
    lineHeight: 24,
    color: "#D8DEE8",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  stepWrapper: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 52,
    paddingTop: 20,
    paddingBottom: 4,
  },

  stepLabel: {
    fontSize: 15,
    lineHeight: 55,
    color: "#D6DDE8",
    fontFamily: "NotoSansRegular",
  },

  stepValue: {
    fontSize: 12,
    lineHeight: 15,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
    marginTop: -15,
    textAlign: "right",
  },

  contentCard: {
    flex: 1,
    marginTop: -84,
    marginHorizontal: -1,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    overflow: "hidden",
  },

  topHandle: {
    alignSelf: "center",
    width: 70,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#BAC4D3",
    marginBottom: 14,
  },

  imageCard: {
    marginHorizontal: 30,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },

  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 24,
  },

  imageActionButton: {
    position: "absolute",
    top: 12,
    right: 12,
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  label: {
    fontSize: 16,
    lineHeight: 22,
    color: "#566171",
    fontFamily: "NotoSansMedium",
    marginBottom: 12,
  },

  secondLabel: {
    marginTop: 20,
  },

  inputWrapper: {
    height: 56,
    borderWidth: 1,
    borderColor: "#DDE3EC",
    borderRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  input: {
    fontSize: 18,
    color: "#576171",
    fontFamily: "NotoSansRegular",
  },

  unitRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  unitButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE3EC",
    backgroundColor: "#FFFFFF",
    marginRight: 12,
  },

  unitButtonActive: {
    borderColor: "#2F80ED",
    backgroundColor: "#FFFFFF",
  },

  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#C1C8D4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  radioOuterActive: {
    borderColor: "#2F80ED",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2F80ED",
  },

  unitButtonText: {
    fontSize: 16,
    color: "#9AA4B5",
    fontFamily: "NotoSansRegular",
  },

  unitButtonTextActive: {
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  sizeValueWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 22,
  },

  sizeValue: {
    fontSize: 52,
    lineHeight: 54,
    color: "#2F80ED",
    fontFamily: "CatamaranBold",
  },

  sizeUnit: {
    marginTop: 16,
    marginLeft: 4,
    fontSize: 16,
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  rulerWrapper: {
    marginTop: 8,
    height: 80,
    justifyContent: "center",
    overflow: "hidden",
  },

  tickTouch: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },

  tick: {
    width: 2,
    height: 20,
    borderRadius: 2,
    backgroundColor: "#D7E6FB",
  },

  tickMajor: {
    height: 36,
    width: 2,
  },

  centerIndicator: {
    position: "absolute",
    alignSelf: "center",
    width: 3,
    height: 52,
    borderRadius: 2,
    backgroundColor: "#2F80ED",
    top: 14,
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