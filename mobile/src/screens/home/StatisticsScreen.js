import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import Svg, { Path, Circle, Line } from "react-native-svg";

const { width } = Dimensions.get("window");

const chartWidth = width - 88;
const chartHeight = 180;

export default function StatisticsScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Week");

  const chartPoints = useMemo(
    () => [
      { x: 0.0, y: 0.88 },
      { x: 0.08, y: 0.58 },
      { x: 0.16, y: 0.48 },
      { x: 0.24, y: 0.62 },
      { x: 0.32, y: 0.72 },
      { x: 0.40, y: 0.14 },
      { x: 0.50, y: 0.16 },
      { x: 0.60, y: 0.60 },
      { x: 0.68, y: 0.66 },
      { x: 0.76, y: 0.52 },
      { x: 0.84, y: 0.56 },
      { x: 0.92, y: 0.80 },
      { x: 1.0, y: 0.92 },
    ],
    []
  );

  const rooms = useMemo(
    () => [
      {
        id: 1,
        name: "Living room",
        devices: 4,
        usage: "20 kW",
        image: require("../../../assets/images/NNkoltuk.png"),
      },
      {
        id: 2,
        name: "Bedroom",
        devices: 3,
        usage: "10 kW",
        image: require("../../../assets/images/NNyatak.png"),
      },
    ],
    []
  );

  const scaledPoints = useMemo(() => {
    return chartPoints.map((p) => ({
      x: p.x * chartWidth,
      y: p.y * chartHeight,
    }));
  }, [chartPoints]);

  const buildSmoothPath = (points) => {
    if (!points.length) return "";
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;

      d += ` Q ${midX} ${current.y}, ${next.x} ${next.y}`;
    }

    return d;
  };

  const pathData = useMemo(() => buildSmoothPath(scaledPoints), [scaledPoints]);

  const activePoint = useMemo(() => {
    const point = scaledPoints[6]; // 0.50, 0.16 olan nokta
    return {
      x: point.x,
      y: point.y,
      label: "17 kW",
    };
  }, [scaledPoints]);

  const handleGoBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("HomeDashboard");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#273246" />

      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.iconButton}
              activeOpacity={0.8}
              onPress={handleGoBack}
            >
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Electricity Usage</Text>

            <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
              <Entypo
                name="dots-three-horizontal"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsRow}
            bounces={false}
          >
            {["Today", "Week", "Month", "Year", "Custom"].map((tab) => {
              const isActive = selectedTab === tab;

              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabButton, isActive && styles.tabButtonActive]}
                  activeOpacity={0.85}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      isActive && styles.tabButtonTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.chartWrap}>
            <View style={styles.chartGridWrap}>
              <View style={styles.yAxisLabels}>
                <Text style={styles.axisLabel}>20 kW</Text>
                <Text style={styles.axisLabel}>15 kW</Text>
                <Text style={styles.axisLabel}>10 kW</Text>
                <Text style={styles.axisLabel}>5 kW</Text>
                <Text style={styles.axisLabel}>0 kW</Text>
              </View>

              <View style={styles.chartArea}>
                <Svg width={chartWidth} height={chartHeight}>
                  {[0, 1, 2, 3, 4].map((lineIndex) => {
                    const y = (chartHeight / 4) * lineIndex;
                    return (
                      <Line
                        key={lineIndex}
                        x1="0"
                        y1={y}
                        x2={chartWidth}
                        y2={y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  <Path
                    d={pathData}
                    stroke="#0D83FF"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <Circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r="8"
                    fill="#24324A"
                    stroke="#84C0FF"
                    strokeWidth="3"
                  />

                  <Circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r="2.8"
                    fill="#FFFFFF"
                  />
                </Svg>

                <View
                  style={[
                    styles.tooltipWrap,
                    {
                      left: Math.max(0, activePoint.x - 26),
                      top: Math.max(0, activePoint.y - 38),
                    },
                  ]}
                >
                  <Text style={styles.tooltipText}>{activePoint.label}</Text>
                </View>
              </View>
            </View>

            <View style={styles.daysRow}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <Text key={`${day}-${index}`} style={styles.dayLabel}>
                  {day}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.statsCardsRow}>
            <View style={styles.statCardLarge}>
              <Text style={styles.statCardLabel}>This Week</Text>

              <View style={styles.statCardBottomRow}>
                <Text style={styles.statCardValue}>50 kW</Text>
                <Text style={styles.statCardPositive}>↗ +7.45%</Text>
              </View>
            </View>

            <View style={styles.statCardSmall}>
              <Text style={styles.statCardLabel}>Total Loss</Text>
              <Text style={styles.statCardValue}>30.2 kW</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />

          <View style={styles.sheetHeader}>
            <View style={styles.sheetLeft}>
              <TouchableOpacity
                style={styles.sheetBackButton}
                activeOpacity={0.8}
                onPress={handleGoBack}
              >
                <Feather name="arrow-left" size={18} color="#7D8796" />
              </TouchableOpacity>

              <Text style={styles.sheetTitle}>Rooms</Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sheetContent}
            bounces={false}
          >
            {rooms.map((room) => (
              <View key={room.id} style={styles.roomCard}>
                <View style={styles.roomImageSide}>
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

                <View style={styles.roomInfo}>
                  <Text style={styles.roomTitle}>{room.name}</Text>

                  <View style={styles.roomDevicesBadge}>
                    <View style={styles.roomDevicesDot} />
                    <Text style={styles.roomDevicesText}>
                      {room.devices} devices
                    </Text>
                  </View>
                </View>

                <View style={styles.roomDivider} />

                <Text style={styles.roomUsage}>{room.usage}</Text>
              </View>
            ))}

            <View style={styles.bottomSpacer} />
          </ScrollView>

          <View style={styles.homeIndicator} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#273246",
  },

  container: {
    flex: 1,
    backgroundColor: "#273246",
  },

  topSection: {
    backgroundColor: "#273246",
    paddingTop: 12,
    paddingBottom: 12,
  },

  headerRow: {
    height: 62,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  iconButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    lineHeight: 26,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  tabsRow: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 8,
  },

  tabButton: {
    minWidth: 62,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },

  tabButtonActive: {
    backgroundColor: "#F2BB45",
    borderColor: "#F2BB45",
  },

  tabButtonText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#FFFFFF",
    fontFamily: "NotoSansRegular",
  },

  tabButtonTextActive: {
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  chartWrap: {
    paddingHorizontal: 14,
    marginTop: 4,
  },

  chartGridWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  yAxisLabels: {
    width: 48,
    height: chartHeight,
    justifyContent: "space-between",
  },

  axisLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: "#8893A5",
    fontFamily: "NotoSansRegular",
  },

  chartArea: {
    flex: 1,
    height: chartHeight,
    position: "relative",
  },

  tooltipWrap: {
    position: "absolute",
    minWidth: 52,
    height: 24,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  tooltipText: {
    fontSize: 11,
    lineHeight: 14,
    color: "#2F3743",
    fontFamily: "NotoSansMedium",
  },

  daysRow: {
    marginLeft: 48,
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 3,
  },

  dayLabel: {
    width: 16,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 16,
    color: "#8893A5",
    fontFamily: "NotoSansRegular",
  },

  statsCardsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 14,
    justifyContent: "space-between",
  },

  statCardLarge: {
    flex: 1,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
    marginRight: 12,
  },

  statCardSmall: {
    width: 110,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
  },

  statCardLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: "#98A2B3",
    fontFamily: "NotoSansRegular",
  },

  statCardBottomRow: {
    marginTop: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  statCardValue: {
    fontSize: 16,
    lineHeight: 22,
    color: "#3E4754",
    fontFamily: "NotoSansBold",
  },

  statCardPositive: {
    fontSize: 12,
    lineHeight: 16,
    color: "#2CCB7F",
    fontFamily: "NotoSansMedium",
  },

  bottomSheet: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#F7F8FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    marginTop: 8,
  },

  sheetHandle: {
    alignSelf: "center",
    width: 72,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#BCC4CF",
    marginTop: 10,
  },

  sheetHeader: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 8,
  },

  sheetLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  sheetBackButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  sheetTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4A5361",
    fontFamily: "NotoSansMedium",
  },

  sheetContent: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 16,
    flexGrow: 1,
  },

  roomCard: {
    height: 108,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    shadowColor: "#101828",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  roomImageSide: {
    width: 118,
    height: "100%",
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  roomShadowImage: {
    position: "absolute",
    left: -48,
    top: -15,
    width: 150,
    height: 150,
    zIndex: 0,
  },

  roomImage: {
    position: "absolute",
    left: -6,
    top: 16,
    width: 110,
    height: 82,
    zIndex: 1,
  },

  roomInfo: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 12,
  },

  roomTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#4A5361",
    fontFamily: "NotoSansMedium",
  },

  roomDevicesBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    minHeight: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5EAF0",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  roomDevicesDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2F80ED",
    borderWidth: 3,
    borderColor: "#D7E8FF",
    marginRight: 6,
  },

  roomDevicesText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#8D97A6",
    fontFamily: "NotoSansRegular",
  },

  roomDivider: {
    width: 1,
    height: 54,
    backgroundColor: "#ECEFF3",
    marginRight: 18,
  },

  roomUsage: {
    fontSize: 18,
    lineHeight: 24,
    color: "#424B58",
    fontFamily: "NotoSansBold",
    minWidth: 64,
    textAlign: "right",
  },

  bottomSpacer: {
    height: 24,
  },

  homeIndicator: {
    alignSelf: "center",
    width: 110,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#0F1720",
    opacity: 0.12,
    marginBottom: 8,
  },
});
