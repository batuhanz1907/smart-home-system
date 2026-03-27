import React, { useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const WEEK_OPTIONS = [
  { id: "everyday", label: "Every day" },
  { id: "weekdays", label: "Week days" },
  { id: "custom", label: "Custom date" },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getMonthDays(year, monthIndex) {
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  const days = [];

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, monthIndex, day);
    const weekDay = date.toLocaleDateString("en-US", { weekday: "short" });

    days.push({
      day,
      weekDay,
      id: `${year}-${monthIndex + 1}-${day}`,
    });
  }

  return days;
}

function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const displayHour = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${displayHour}:${displayMinutes}`;
}

function getPeriod(date) {
  return date.getHours() >= 12 ? "PM" : "AM";
}

function buildDateFromTimeString(timeString, period) {
  const [rawHour, rawMinute] = timeString.split(":");
  let hour = Number(rawHour);
  const minute = Number(rawMinute);

  if (period === "AM") {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour += 12;
  }

  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

export default function ScheduleCustomDateScreen({ navigation }) {
  const route = useRoute();
  const { roomId, homeId } = route.params || {};

  const now = new Date();
  const [selectedOption, setSelectedOption] = useState("custom");
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDays, setSelectedDays] = useState([now.getDate()]);

  const [timeOn, setTimeOn] = useState("11:15");
  const [timeOff, setTimeOff] = useState("01:15");
  const [periodOn, setPeriodOn] = useState("AM");
  const [periodOff, setPeriodOff] = useState("PM");

  const [showPicker, setShowPicker] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickerValue, setPickerValue] = useState(new Date());

  const monthDays = useMemo(() => getMonthDays(year, monthIndex), [year, monthIndex]);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("SetSpaceName");
  };

  const handlePrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((prev) => prev - 1);
    } else {
      setMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((prev) => prev + 1);
    } else {
      setMonthIndex((prev) => prev + 1);
    }
  };

  const handleToggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
    );
  };

  const openTimePicker = (field) => {
    const initialDate =
      field === "on"
        ? buildDateFromTimeString(timeOn, periodOn)
        : buildDateFromTimeString(timeOff, periodOff);

    setActiveField(field);
    setPickerValue(initialDate);
    setShowPicker(true);
  };

  const handleTimeChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (!selectedDate) {
      return;
    }

    setPickerValue(selectedDate);

    const formattedTime = formatTime(selectedDate);
    const formattedPeriod = getPeriod(selectedDate);

    if (activeField === "on") {
      setTimeOn(formattedTime);
      setPeriodOn(formattedPeriod);
    }

    if (activeField === "off") {
      setTimeOff(formattedTime);
      setPeriodOff(formattedPeriod);
    }
  };

  const handleIosPickerDone = () => {
    const formattedTime = formatTime(pickerValue);
    const formattedPeriod = getPeriod(pickerValue);

    if (activeField === "on") {
      setTimeOn(formattedTime);
      setPeriodOn(formattedPeriod);
    }

    if (activeField === "off") {
      setTimeOff(formattedTime);
      setPeriodOff(formattedPeriod);
    }

    setShowPicker(false);
  };

  const handleContinue = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axios.post(
        "http://192.168.1.108:5000/api/schedules",
        {
          roomId,
          homeId,
          selectedDays,
          timeOn,
          timeOff,
          periodOn,
          periodOff,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("SCHEDULE KAYDEDİLDİ:", res.data);

      navigation.navigate("SpaceOverview", { roomId, homeId });
    } catch (err) {
      console.log("SCHEDULE ERROR:", err.response?.data || err.message);
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
              <Text style={styles.headerTitle}>Create a new scenario</Text>
              <Text style={styles.headerSubtitle}>Schedule</Text>
            </View>

            <View style={styles.stepWrapper}>
              <Text style={styles.stepLabel}>Step</Text>
              <Text style={styles.stepValue}>2/7</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Schedule</Text>
            <Text style={styles.sectionSubtitle}>
              How often do you want it to be?
            </Text>

            <View style={styles.optionRow}>
              {WEEK_OPTIONS.map((option) => {
                const isActive = selectedOption === option.id;

                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[styles.optionChip, isActive && styles.optionChipActive]}
                    onPress={() => setSelectedOption(option.id)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        isActive && styles.optionChipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.monthHeader}>
              <View>
                <Text style={styles.monthTitle}>
                  {MONTHS[monthIndex]} {year}
                </Text>
                <Text style={styles.monthSubtitle}>Select the desired dates</Text>
              </View>

              <View style={styles.monthActions}>
                <TouchableOpacity
                  style={styles.monthArrowButton}
                  onPress={handlePrevMonth}
                >
                  <Feather name="chevron-left" size={20} color="#A7B0BF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.monthArrowButton}
                  onPress={handleNextMonth}
                >
                  <Feather name="chevron-right" size={20} color="#2F80ED" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.daysRow}
            >
              {monthDays.map((item) => {
                const isActive = selectedDays.includes(item.day);

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.dayCard, isActive && styles.dayCardActive]}
                    onPress={() => handleToggleDay(item.day)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.dayNumber, isActive && styles.dayNumberActive]}
                    >
                      {item.day}
                    </Text>
                    <Text
                      style={[styles.dayName, isActive && styles.dayNameActive]}
                    >
                      {item.weekDay}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Working time</Text>
            <Text style={styles.sectionSubtitle}>
              Select the desired time interval
            </Text>

            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Time On</Text>

              <View style={styles.timeControls}>
                <TouchableOpacity
                  style={styles.timeValueBox}
                  onPress={() => openTimePicker("on")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.timeValueText}>{timeOn}</Text>
                </TouchableOpacity>

                <View style={styles.periodSwitch}>
                  <TouchableOpacity
                    style={[
                      styles.periodButton,
                      periodOn === "AM" && styles.periodButtonActive,
                    ]}
                    onPress={() => setPeriodOn("AM")}
                  >
                    <Text
                      style={[
                        styles.periodButtonText,
                        periodOn === "AM" && styles.periodButtonTextActive,
                      ]}
                    >
                      AM
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.periodButton,
                      periodOn === "PM" && styles.periodButtonActive,
                    ]}
                    onPress={() => setPeriodOn("PM")}
                  >
                    <Text
                      style={[
                        styles.periodButtonText,
                        periodOn === "PM" && styles.periodButtonTextActive,
                      ]}
                    >
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Time Off</Text>

              <View style={styles.timeControls}>
                <TouchableOpacity
                  style={styles.timeValueBoxInactive}
                  onPress={() => openTimePicker("off")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.timeValueTextInactive}>{timeOff}</Text>
                </TouchableOpacity>

                <View style={styles.periodSwitch}>
                  <TouchableOpacity
                    style={[
                      styles.periodButton,
                      periodOff === "AM" && styles.periodButtonActive,
                    ]}
                    onPress={() => setPeriodOff("AM")}
                  >
                    <Text
                      style={[
                        styles.periodButtonText,
                        periodOff === "AM" && styles.periodButtonTextActive,
                      ]}
                    >
                      AM
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.periodButton,
                      periodOff === "PM" && styles.periodButtonActive,
                    ]}
                    onPress={() => setPeriodOff("PM")}
                  >
                    <Text
                      style={[
                        styles.periodButtonText,
                        periodOff === "PM" && styles.periodButtonTextActive,
                      ]}
                    >
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.homeIndicator} />
        </View>

        {showPicker && Platform.OS === "android" && (
          <DateTimePicker
            value={pickerValue}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {showPicker && Platform.OS === "ios" && (
          <View style={styles.iosPickerOverlay}>
            <View style={styles.iosPickerCard}>
              <View style={styles.iosPickerHeader}>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <Text style={styles.iosPickerCancel}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleIosPickerDone}>
                  <Text style={styles.iosPickerDone}>Done</Text>
                </TouchableOpacity>
              </View>

              <DateTimePicker
                value={pickerValue}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={handleTimeChange}
                style={styles.iosPicker}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },

  darkHeader: {
    backgroundColor: "#2F3A4E",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
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
    lineHeight: 28,
    color: "#FFFFFF",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 20,
    lineHeight: 24,
    color: "#FFFFFF",
    fontFamily: "NotoSans",
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
    fontSize: 12,
    lineHeight: 16,
    color: "#D6DDE8",
    fontFamily: "NotoSans",
  },

  stepValue: {
    fontSize: 13,
    lineHeight: 24,
    color: "#FFFFFF",
    fontFamily: "NotoSans",
    marginTop: 2,
    textAlign: "right",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 24,
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#384150",
    fontFamily: "CatamaranBold",
  },

  sectionSubtitle: {
    marginTop: 2,
    fontSize: 15,
    lineHeight: 22,
    color: "#8C96A8",
    fontFamily: "NotoSansRegular",
  },

  optionRow: {
    flexDirection: "row",
    marginTop: 18,
  },

  optionChip: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  optionChipActive: {
    backgroundColor: "#F2BC3D",
    borderColor: "#F2BC3D",
  },

  optionChipText: {
    fontSize: 15,
    color: "#8B95A7",
    fontFamily: "NotoSansRegular",
  },

  optionChipTextActive: {
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  divider: {
    height: 1,
    backgroundColor: "#E7EBF1",
    marginBottom: 22,
  },

  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  monthTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#586171",
    fontFamily: "CatamaranBold",
  },

  monthSubtitle: {
    marginTop: 2,
    fontSize: 15,
    lineHeight: 22,
    color: "#9AA4B5",
    fontFamily: "NotoSansRegular",
  },

  monthActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  monthArrowButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  daysRow: {
    paddingTop: 18,
    paddingRight: 20,
  },

  dayCard: {
    width: 46,
    height: 88,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E8EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  dayCardActive: {
    backgroundColor: "#EAF3FF",
    borderColor: "#CFE2FF",
  },

  dayNumber: {
    fontSize: 28,
    lineHeight: 34,
    color: "#5C6676",
    fontFamily: "CatamaranBold",
  },

  dayNumberActive: {
    color: "#2F80ED",
  },

  dayName: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 18,
    color: "#A5AEBD",
    fontFamily: "NotoSansRegular",
  },

  dayNameActive: {
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },

  timeLabel: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4E5766",
    fontFamily: "NotoSansMedium",
  },

  timeControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeValueBox: {
    width: 80,
    height: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#2F80ED",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  timeValueBoxInactive: {
    width: 80,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7EF",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  timeValueText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  timeValueTextInactive: {
    fontSize: 16,
    lineHeight: 22,
    color: "#6A7384",
    fontFamily: "NotoSansMedium",
  },

  periodSwitch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7EF",
    overflow: "hidden",
  },

  periodButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  periodButtonActive: {
    backgroundColor: "#2F80ED",
  },

  periodButtonText: {
    fontSize: 15,
    color: "#A2ACBC",
    fontFamily: "NotoSansMedium",
  },

  periodButtonTextActive: {
    color: "#FFFFFF",
  },

  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: "#F8F9FB",
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

  iosPickerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-end",
  },

  iosPickerCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 24,
  },

  iosPickerHeader: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
  },

  iosPickerCancel: {
    fontSize: 16,
    color: "#8A94A5",
    fontFamily: "NotoSansMedium",
  },

  iosPickerDone: {
    fontSize: 16,
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  iosPicker: {
    backgroundColor: "#FFFFFF",
  },
});