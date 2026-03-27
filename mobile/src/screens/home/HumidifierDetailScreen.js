import React, { useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Switch,
  PanResponder,
} from "react-native";
import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

const MIN_TEMP = 16;
const MAX_TEMP = 32;

const DIAL_SIZE = 252;
const DIAL_CENTER = DIAL_SIZE / 2;

const OUTER_RING_RADIUS = 84;
const OUTER_RING_STROKE = 34;

const KNOB_RADIUS = 84;
const KNOB_SIZE = 24;
const KNOB_HALF = KNOB_SIZE / 2;

const START_ANGLE = 0;
const END_ANGLE = 360;
const SWEEP_ANGLE = END_ANGLE - START_ANGLE;

export default function HumidifierDetailScreen({ navigation }) {
  const [isOn, setIsOn] = useState(true);
  const [temperature, setTemperature] = useState(24);
  const [selectedMode, setSelectedMode] = useState("Cold");
  const [movieNightEnabled, setMovieNightEnabled] = useState(true);
  const [birthdayEnabled, setBirthdayEnabled] = useState(false);

  const dialLayoutRef = useRef({ x: 0, y: 0, width: DIAL_SIZE, height: DIAL_SIZE });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const tempToRatio = (temp) => (temp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP);

  const ratioToTemp = (ratio) => {
    const mapped = MIN_TEMP + ratio * (MAX_TEMP - MIN_TEMP);
    return Math.round(mapped);
  };

  const normalizeAngle = (deg) => {
    let normalized = deg % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
  };

  const getBoundedAngleFromTouch = (x, y) => {
    const dx = x - DIAL_CENTER;
    const dy = y - DIAL_CENTER;

    let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
     if (deg < 0) deg += 360;


    return deg;
  };

  const updateTemperatureFromGesture = (pageX, pageY) => {
    const localX = pageX - dialLayoutRef.current.x;
    const localY = pageY - dialLayoutRef.current.y;

    const boundedAngle = getBoundedAngleFromTouch(localX, localY);
    const ratio = (boundedAngle - START_ANGLE) / SWEEP_ANGLE;
    setTemperature(ratioToTemp(ratio));
  };

  const ratio = tempToRatio(temperature);
  const angle = ratio * 360;

  const circumference = 2 * Math.PI * OUTER_RING_RADIUS;
  const progressLength = circumference * ratio;
  const fullArcLength = circumference * (SWEEP_ANGLE / 360);
  const progressArcLength = fullArcLength * ratio;
  const remainingArcLength = circumference - fullArcLength;

  const angleRad = ((angle - 90) * Math.PI) / 180;
  const knobX = DIAL_CENTER + KNOB_RADIUS * Math.cos(angleRad);
  const knobY = DIAL_CENTER + KNOB_RADIUS * Math.sin(angleRad);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          updateTemperatureFromGesture(
            evt.nativeEvent.pageX,
            evt.nativeEvent.pageY
          );
        },
        onPanResponderMove: (evt) => {
          updateTemperatureFromGesture(
            evt.nativeEvent.pageX,
            evt.nativeEvent.pageY
          );
        },
      }),
    []
  );

  const modes = [
    {
      key: "Cold",
      label: "Cold",
      icon: (
        <MaterialCommunityIcons
          name="snowflake"
          size={20}
          color={selectedMode === "Cold" ? "#FFFFFF" : "#98A2B3"}
        />
      ),
    },
    {
      key: "Wind",
      label: "Wind",
      icon: (
        <Feather
          name="wind"
          size={20}
          color={selectedMode === "Wind" ? "#FFFFFF" : "#98A2B3"}
        />
      ),
    },
    {
      key: "Sleep",
      label: "Sleep",
      icon: (
        <MaterialCommunityIcons
          name="sleep"
          size={20}
          color={selectedMode === "Sleep" ? "#FFFFFF" : "#98A2B3"}
        />
      ),
    },
    {
      key: "Schedule",
      label: "Schedule",
      icon: (
        <Feather
          name="clock"
          size={20}
          color={selectedMode === "Schedule" ? "#FFFFFF" : "#98A2B3"}
        />
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7F8" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleGoBack}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={21} color="#8D99AA" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.deviceTitle}>Air Conditioner</Text>
            <Text style={styles.deviceRoom}>Living room</Text>
          </View>

          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Entypo
              name="dots-three-horizontal"
              size={18}
              color="#A5B0BE"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.heroSection}>
            <Image
              source={require("../../../assets/images/Ndaire.png")}
              style={styles.heroCircleImage}
              resizeMode="contain"
            />

            <View style={styles.statusInlineWrap}>
              <Text style={styles.rowLabel}>Status</Text>

              <TouchableOpacity
                style={[styles.customSwitch, isOn && styles.customSwitchActive]}
                activeOpacity={0.85}
                onPress={() => setIsOn((prev) => !prev)}
              >
                <Text
                  style={[
                    styles.customSwitchText,
                    isOn && styles.customSwitchTextActive,
                  ]}
                >
                  {isOn ? "ON" : "OFF"}
                </Text>

                <View
                  style={[
                    styles.customSwitchThumb,
                    isOn
                      ? styles.customSwitchThumbOn
                      : styles.customSwitchThumbOff,
                  ]}
                />
              </TouchableOpacity>
            </View>

            <Image
              source={require("../../../assets/images/Naltgölge.png")}
              style={styles.heroBottomShadow}
              resizeMode="contain"
            />

            <Image
              source={require("../../../assets/images/Nairbig.png")}
              style={styles.deviceImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Set Temperature</Text>

            <View style={styles.temperatureArea}>
              <View
                style={styles.tempDialWrap}
                onLayout={(event) => {
                  event.target.measureInWindow((x, y, width, height) => {
                    dialLayoutRef.current = { x, y, width, height };
                  });
                }}
              >
                <Svg
                  width={DIAL_SIZE}
                  height={DIAL_SIZE}
                  style={styles.tempSvg}
                >
                 <Circle
                    cx={DIAL_CENTER}
                    cy={DIAL_CENTER}
                    r={OUTER_RING_RADIUS}
                    stroke="#2F80ED"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progressLength} ${circumference}`}
                    transform={`rotate(-90 ${DIAL_CENTER} ${DIAL_CENTER})`}
                  />
                </Svg>

                <View style={styles.tempInnerCircle}>
                  <Image
                    source={require("../../../assets/images/Nnokta.png")}
                    style={styles.tempDotsImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.tempValue}>{temperature}°C</Text>
                </View>

                <View
                  style={[
                    styles.tempKnobOuter,
                    {
                      left: knobX - KNOB_HALF,
                      top: knobY - KNOB_HALF,
                    },
                  ]}
                  {...panResponder.panHandlers}
                >
                  <View style={styles.tempKnobInner} />
                </View>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.modeRow}
            >
              {modes.map((mode) => {
                const isSelected = selectedMode === mode.key;

                return (
                  <TouchableOpacity
                    key={mode.key}
                    style={[
                      styles.modeCard,
                      isSelected && styles.modeCardActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedMode(mode.key)}
                  >
                    {mode.icon}
                    <Text
                      style={[
                        styles.modeText,
                        isSelected && styles.modeTextActive,
                      ]}
                    >
                      {mode.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sceneHeader}>
              <View style={styles.scenesTitleWrap}>
                <Text style={styles.sectionTitle}>Scenes</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>2</Text>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Scenes")}
              >
                <Text style={styles.seeAll}>see all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.scenesCard}>
              <View style={styles.sceneItem}>
                <View style={styles.sceneTextWrap}>
                  <Text style={styles.sceneTitle}>Movie Night</Text>
                  <Text style={styles.sceneSubtitle}>
                    Mon, Fri | 08:00 PM - 10:00 PM
                  </Text>
                </View>

                <Switch
                  value={movieNightEnabled}
                  onValueChange={setMovieNightEnabled}
                  trackColor={{ false: "#D5DCE6", true: "#2F80ED" }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#D5DCE6"
                />
              </View>

              <View style={styles.sceneDivider} />

              <View style={styles.sceneItem}>
                <View style={styles.sceneTextWrap}>
                  <Text style={styles.sceneTitle}>32th Birthday Kristin</Text>
                  <Text style={styles.sceneSubtitle}>
                    July 30th | 07:00 PM - 10:00 PM
                  </Text>
                </View>

                <Switch
                  value={birthdayEnabled}
                  onValueChange={setBirthdayEnabled}
                  trackColor={{ false: "#D5DCE6", true: "#2F80ED" }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#D5DCE6"
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F8",
  },

  container: {
    flex: 1,
    backgroundColor: "#F7F7F8",
    paddingHorizontal: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 2,
  },

  iconButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 15,
  },

  deviceTitle: {
    fontSize: 17,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  deviceRoom: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    color: "#8B97A8",
    fontFamily: "NotoSansRegular",
  },

  scrollContent: {
    paddingBottom: 24,
  },

  heroSection: {
    height: 230,
    justifyContent: "center",
    position: "relative",
    marginTop: 6,
    overflow: "hidden",
  },

  heroCircleImage: {
    position: "absolute",
    right: -105,
    top: -18,
    width: 340,
    height: 340,
    zIndex: 0,
  },

  heroBottomShadow: {
    position: "absolute",
    right: -50,
    bottom: 8,
    width: 240,
    height: 26,
    zIndex: 1,
  },

  statusInlineWrap: {
    position: "absolute",
    left: 10,
    top: 72,
    zIndex: 5,
  },

  rowLabel: {
    fontSize: 18,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
    marginBottom: 12,
  },

  customSwitch: {
    width: 74,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#D5DCE6",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  customSwitchActive: {
    backgroundColor: "#2F80ED",
  },

  customSwitchText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#6B7280",
    fontFamily: "NotoSansMedium",
  },

  customSwitchTextActive: {
    color: "#FFFFFF",
  },

  customSwitchThumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },

  customSwitchThumbOn: {
    marginLeft: 2,
  },

  customSwitchThumbOff: {
    marginRight: 2,
  },

  deviceImage: {
    width: 280,
    height: 300,
    position: "absolute",
    right: -80,
    top: -30,
    zIndex: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#E8EDF3",
    marginVertical: 10,
  },

  section: {
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  temperatureArea: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 20,
  },

  tempDialWrap: {
    width: DIAL_SIZE,
    height: DIAL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  tempSvg: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  tempInnerCircle: {
    width: 138,
    height: 138,
    borderRadius: 69,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
  },

  tempDotsImage: {
    position: "absolute",
    width: 108,
    height: 108,
    zIndex: 0,
  },

  tempValue: {
    fontSize: 28,
    lineHeight: 30,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
    zIndex: 1,
  },

  tempKnobOuter: {
    position: "absolute",
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_HALF,
    backgroundColor: "rgba(47, 128, 237, 0.18)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },

  tempKnobInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2F80ED",
  },

  modeRow: {
    paddingRight: 14,
  },

  modeCard: {
    width: 66,
    minHeight: 62,
    borderRadius: 14,
    backgroundColor: "#F8F8F9",
    borderWidth: 1,
    borderColor: "#EAEEF3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    paddingVertical: 10,
  },

  modeCardActive: {
    backgroundColor: "#2F80ED",
    borderColor: "#2F80ED",
    shadowColor: "#2F80ED",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  modeText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
    color: "#667180",
    fontFamily: "NotoSansRegular",
    textAlign: "center",
  },

  modeTextActive: {
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  sceneHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  scenesTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E9EDF2",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
  },

  countText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#7F8A98",
    fontFamily: "NotoSansMedium",
  },

  seeAll: {
    fontSize: 13,
    lineHeight: 18,
    color: "#2F80ED",
    fontFamily: "NotoSansRegular",
  },

  scenesCard: {
    backgroundColor: "#F8F8F9",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#EEF1F5",
  },

  sceneItem: {
    minHeight: 74,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sceneTextWrap: {
    flex: 1,
    paddingRight: 12,
  },

  sceneTitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  sceneSubtitle: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
    color: "#8B97A8",
    fontFamily: "NotoSansRegular",
  },

  sceneDivider: {
    height: 1,
    backgroundColor: "#E8EDF3",
  },

  bottomSpacer: {
    height: 24,
  },
});