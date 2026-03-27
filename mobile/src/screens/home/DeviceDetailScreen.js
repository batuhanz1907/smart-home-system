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
import { Feather, Entypo } from "@expo/vector-icons";

const TOTAL_VOLUME_TICKS = 16;

export default function DeviceDetailScreen({ navigation }) {
  const [isOn, setIsOn] = useState(true);
  const [volume, setVolume] = useState(70);
  const [morningCoffeeEnabled, setMorningCoffeeEnabled] = useState(false);
  const [movieNightEnabled, setMovieNightEnabled] = useState(true);
  const [birthdayEnabled, setBirthdayEnabled] = useState(false);
  const [volumeTrackWidth, setVolumeTrackWidth] = useState(0);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const increaseVolume = () => {
    setVolume((prev) => Math.min(prev + 5, 100));
  };

  const decreaseVolume = () => {
    setVolume((prev) => Math.max(prev - 5, 0));
  };

  const updateVolumeFromTouch = (locationX) => {
    if (!volumeTrackWidth) return;

    const nextValue = Math.round((locationX / volumeTrackWidth) * 100);
    setVolume(Math.max(0, Math.min(100, nextValue)));
  };

  const volumePanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          updateVolumeFromTouch(event.nativeEvent.locationX);
        },
        onPanResponderMove: (event) => {
          updateVolumeFromTouch(event.nativeEvent.locationX);
        },
      }),
    [volumeTrackWidth]
  );

  const activeTicks = Math.round((volume / 100) * TOTAL_VOLUME_TICKS);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleGoBack}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={22} color="#8A97A8" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.deviceTitle}>Speaker</Text>
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
          <View style={styles.deviceImageSection}>
            <Image
              source={require("../../../assets/images/Ndaire.png")}
              style={styles.deviceCircleImage}
              resizeMode="contain"
            />

            <Image
              source={require("../../../assets/images/Naltgölge.png")}
              style={styles.deviceBottomShadow}
              resizeMode="contain"
            />

            <Image
              source={require("../../../assets/images/Nspeaker.png")}
              style={styles.deviceImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.row}>
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
                  isOn ? styles.customSwitchThumbOn : styles.customSwitchThumbOff,
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Battery</Text>

            <View style={styles.batteryRow}>
              <Text style={styles.batteryText}>90 %</Text>
              <Image
                source={require("../../../assets/images/batarya.png")}
                style={styles.batteryIcon}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volume</Text>

            <View style={styles.volumeCard}>
              <View
                style={[
                  styles.volumeFill,
                  {
                    width: `${volume}%`,
                  },
                ]}
              />

              <View style={styles.volumeOverlay}>
                <View style={styles.volumeLeft}>
                  <TouchableOpacity
                    style={styles.volumeAdjustButton}
                    activeOpacity={0.8}
                    onPress={decreaseVolume}
                  >
                    <Feather name="volume-2" size={28} color="#FFFFFF" />
                  </TouchableOpacity>

                  <View
                    style={styles.volumeTrackTouchArea}
                    onLayout={(event) =>
                      setVolumeTrackWidth(event.nativeEvent.layout.width)
                    }
                    {...volumePanResponder.panHandlers}
                  >
                    <View style={styles.ticksWrap}>
                      {Array.from({ length: TOTAL_VOLUME_TICKS }).map((_, index) => {
                        const isActive = index < activeTicks;
                        const isLarge = index % 2 === 0;

                        return (
                          <TouchableOpacity
                            key={index}
                            activeOpacity={0.9}
                            onPress={() => {
                              const nextVolume = Math.round(
                                ((index + 1) / TOTAL_VOLUME_TICKS) * 100
                              );
                              setVolume(nextVolume);
                            }}
                            style={styles.tickPressArea}
                          >
                            <View
                              style={[
                                styles.tickLine,
                                isLarge ? styles.tickLarge : styles.tickSmall,
                                isActive ? styles.tickActive : styles.tickInactive,
                              ]}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>

                <View style={styles.volumeRight}>
                  <Text style={styles.volumePercent}>{volume}%</Text>

                  <TouchableOpacity
                    style={styles.volumePlusButton}
                    activeOpacity={0.8}
                    onPress={increaseVolume}
                  >
                    <Feather name="plus" size={14} color="#8B97A8" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.appsHeader}>
              <View style={styles.appsTitleWrap}>
                <Text style={styles.sectionTitle}>Apps</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>1</Text>
                </View>
              </View>
            </View>

            <View style={styles.appCard}>
              <View style={styles.spotifyHeader}>
                <View>
                  <Text style={styles.appTitle}>Spotify</Text>
                  <Text style={styles.appSubtitle}>Living room</Text>
                </View>

                <Feather name="chevron-down" size={18} color="#6B7280" />
              </View>

              <Image
                source={require("../../../assets/images/Nmüzik.png")}
                style={styles.musicImage}
                resizeMode="cover"
              />

              <View style={styles.progressWrap}>
                <View style={styles.progressTrack} />
                <View style={styles.progressFill} />
                <View style={styles.progressThumb} />
                <Text style={styles.progressTime}>2:45 min</Text>
              </View>

              <View style={styles.musicBottom}>
                <View style={styles.songInfo}>
                  <Text style={styles.songTitle}>As it was</Text>
                  <Text style={styles.songArtist}>Harry Styles</Text>
                </View>

                <View style={styles.musicControls}>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Feather name="skip-back" size={20} color="#2F80ED" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.playButton}
                    activeOpacity={0.8}
                  >
                    <Feather name="pause" size={18} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.7}>
                    <Feather name="skip-forward" size={20} color="#2F80ED" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.sceneHeader}>
              <View style={styles.appsTitleWrap}>
                <Text style={styles.sectionTitle}>Scenes</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>3</Text>
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
                  <Text style={styles.sceneTitle}>Morning coffee</Text>
                  <Text style={styles.sceneSubtitle}>
                    Everyday | 08:15 AM - 09:00 AM
                  </Text>
                </View>

                <Switch
                  value={morningCoffeeEnabled}
                  onValueChange={setMorningCoffeeEnabled}
                  trackColor={{ false: "#D5DCE6", true: "#2F80ED" }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#D5DCE6"
                />
              </View>

              <View style={styles.sceneDivider} />

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
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 58,
    marginBottom: 8,
    zIndex: 20,
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
    marginLeft: 16,
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
    paddingBottom: 28,
  },

  deviceImageSection: {
    height: 420,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -42,
    marginBottom: 4,
    position: "relative",
    overflow: "hidden",
  },

  deviceCircleImage: {
    position: "absolute",
    width: 330,
    height: 435,
    top: -6,
    zIndex: 0,
  },

  deviceBottomShadow: {
    position: "absolute",
    width: 310,
    height: 44,
    bottom: 34,
    zIndex: 1,
  },

  deviceImage: {
    width: 250,
    height: 290,
    marginTop: 74,
    zIndex: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#E8EDF3",
    marginVertical: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 54,
  },

  rowLabel: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
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

  batteryRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  batteryText: {
    marginRight: 6,
    fontSize: 15,
    lineHeight: 20,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  batteryIcon: {
    width: 18,
    height: 18,
  },

  section: {
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  volumeCard: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#EEF2F7",
    overflow: "hidden",
    marginTop: 9,
    marginHorizontal: 12,
    position: "relative",
  },

  volumeFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#2F80ED",
  },

  volumeOverlay: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  volumeLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 16,
  },

  volumeAdjustButton: {
    marginRight: 18,
  },

  volumeTrackTouchArea: {
    flex: 1,
    justifyContent: "center",
    height: 68,
  },

  ticksWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
  },

  tickPressArea: {
    width: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  tickLine: {
    width: 2,
    borderRadius: 999,
  },

  tickLarge: {
    height: 22,
  },

  tickSmall: {
    height: 15,
  },

  tickActive: {
    backgroundColor: "#EAF3FF",
  },

  tickInactive: {
    backgroundColor: "#C8D0DB",
  },

  volumeRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  volumePercent: {
    fontSize: 18,
    lineHeight: 24,
    color: "#8B97A8",
    fontFamily: "NotoSansMedium",
  },

  volumePlusButton: {
    marginLeft: 10,
  },

  appsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  appsTitleWrap: {
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

  appCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    shadowColor: "#101828",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  spotifyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  appTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  appSubtitle: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    color: "#8B97A8",
    fontFamily: "NotoSansRegular",
  },

  musicImage: {
    width: "100%",
    height: 210,
    borderRadius: 16,
    marginTop: 12,
  },

  progressWrap: {
    position: "relative",
    marginTop: 16,
    paddingRight: 64,
    height: 20,
    justifyContent: "center",
  },

  progressTrack: {
    height: 3,
    borderRadius: 999,
    backgroundColor: "#D4DCE6",
    width: "100%",
  },

  progressFill: {
    position: "absolute",
    left: 0,
    top: 8.5,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#2F80ED",
    width: "42%",
  },

  progressThumb: {
    position: "absolute",
    left: "40%",
    top: 3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2F80ED",
  },

  progressTime: {
    position: "absolute",
    right: 0,
    top: 0,
    fontSize: 12,
    lineHeight: 18,
    color: "#8B97A8",
    fontFamily: "NotoSansRegular",
  },

  musicBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },

  songInfo: {
    flex: 1,
    paddingRight: 12,
  },

  songTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  songArtist: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    color: "#8B97A8",
    fontFamily: "NotoSansRegular",
  },

  musicControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  playButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 14,
  },

  sceneHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  seeAll: {
    fontSize: 13,
    lineHeight: 18,
    color: "#2F80ED",
    fontFamily: "NotoSansRegular",
  },

  scenesCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    shadowColor: "#101828",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
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