import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Switch,
  TextInput,
  Modal,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function ScenesScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("All scenes");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [newSceneTitle, setNewSceneTitle] = useState("");
  const [newSceneSubtitle, setNewSceneSubtitle] = useState("");
  const [newSceneRoom, setNewSceneRoom] = useState("Living room");

  const [scenes, setScenes] = useState([
    {
      id: 1,
      title: "Morning coffee",
      subtitle: "Everyday | 08:15 AM - 09:00 AM",
      room: "Living room",
      enabled: false,
    },
    {
      id: 2,
      title: "Movie Night",
      subtitle: "Mon, Fri | 08:00 PM - 10:00 PM",
      room: "Living room",
      enabled: true,
    },
    {
      id: 3,
      title: "Sleeping",
      subtitle: "Everyday | 12:00 PM - 08:00 AM",
      room: "Living room",
      enabled: true,
    },
    {
      id: 4,
      title: "32th Birthday Kristin",
      subtitle: "July 30th | 07:00 PM - 10:00 PM",
      room: "Living room",
      enabled: false,
    },
  ]);

  const filters = useMemo(
    () => ["All scenes", "Living room", "Kitchen", "Bedroom"],
    []
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleScene = (id) => {
    setScenes((prev) =>
      prev.map((scene) =>
        scene.id === id ? { ...scene, enabled: !scene.enabled } : scene
      )
    );
  };

  const filteredScenes =
    selectedFilter === "All scenes"
      ? scenes
      : scenes.filter((scene) => scene.room === selectedFilter);

  const handleOpenAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
    setNewSceneTitle("");
    setNewSceneSubtitle("");
    setNewSceneRoom("Living room");
  };

  const handleAddScene = () => {
    if (!newSceneTitle.trim() || !newSceneSubtitle.trim()) {
      return;
    }

    const newScene = {
      id: Date.now(),
      title: newSceneTitle.trim(),
      subtitle: newSceneSubtitle.trim(),
      room: newSceneRoom,
      enabled: false,
    };

    setScenes((prev) => [newScene, ...prev]);
    handleCloseAddModal();
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
              <Text style={styles.headerTitle}>All scenarios</Text>
            </View>

            <TouchableOpacity style={styles.iconButton} activeOpacity={0.75}>
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
            contentContainerStyle={styles.filtersContent}
          >
            {filters.map((item) => {
              const isSelected = selectedFilter === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.filterChip,
                    isSelected && styles.filterChipActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedFilter(item)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.contentArea}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {filteredScenes.map((scene) => (
              <View
                key={scene.id}
                style={[
                  styles.sceneCard,
                  scene.enabled && styles.sceneCardActive,
                ]}
              >
                <View style={styles.sceneCardText}>
                  <Text style={styles.sceneTitle}>{scene.title}</Text>
                  <Text style={styles.sceneSubtitle}>{scene.subtitle}</Text>
                </View>

                <Switch
                  value={scene.enabled}
                  onValueChange={() => toggleScene(scene.id)}
                  trackColor={{ false: "#D5DCE6", true: "#2F80ED" }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#D5DCE6"
                />
              </View>
            ))}

            <TouchableOpacity
              style={styles.addSceneButton}
              activeOpacity={0.8}
              onPress={handleOpenAddModal}
            >
              <Feather name="plus" size={18} color="#2F80ED" />
              <Text style={styles.addSceneText}>Add new scene</Text>
            </TouchableOpacity>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </View>
      </View>

      <Modal
        visible={isAddModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseAddModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add new scene</Text>

            <TextInput
              value={newSceneTitle}
              onChangeText={setNewSceneTitle}
              placeholder="Scene name"
              placeholderTextColor="#9CA3AF"
              style={styles.modalInput}
            />

            <TextInput
              value={newSceneSubtitle}
              onChangeText={setNewSceneSubtitle}
              placeholder="Example: Everyday | 08:00 PM - 10:00 PM"
              placeholderTextColor="#9CA3AF"
              style={styles.modalInput}
            />

            <Text style={styles.modalLabel}>Room</Text>

            <View style={styles.modalRoomsRow}>
              {["Living room", "Kitchen", "Bedroom"].map((room) => {
                const isSelected = newSceneRoom === room;

                return (
                  <TouchableOpacity
                    key={room}
                    style={[
                      styles.modalRoomButton,
                      isSelected && styles.modalRoomButtonActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setNewSceneRoom(room)}
                  >
                    <Text
                      style={[
                        styles.modalRoomButtonText,
                        isSelected && styles.modalRoomButtonTextActive,
                      ]}
                    >
                      {room}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.8}
                onPress={handleCloseAddModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                activeOpacity={0.8}
                onPress={handleAddScene}
              >
                <Text style={styles.saveButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
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

  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },

  topHeader: {
    height: 200,
    backgroundColor: "#24324A",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: 14,
    overflow: "hidden",
    position: "relative",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 35,
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
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontFamily: "Catamaran",
    textAlign: "center",
  },

  filtersContent: {
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 18,
    gap: 10,
  },

  filterChip: {
    minHeight: 38,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  filterChipActive: {
    backgroundColor: "#F0B63A",
    borderColor: "#F0B63A",
  },

  filterChipText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#FFFFFF",
    fontFamily: "NotoSansRegular",
  },

  filterChipTextActive: {
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  contentArea: {
    flex: 1,
    backgroundColor: "#F4F4F6",
    paddingHorizontal: 16,
    paddingTop: 22,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  sceneCard: {
    minHeight: 70,
    borderRadius: 16,
    backgroundColor: "#FAFAFB",
    borderWidth: 1,
    borderColor: "#ECEFF4",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sceneCardActive: {
    borderColor: "#2F80ED",
    backgroundColor: "#FFFFFF",
  },

  sceneCardText: {
    flex: 1,
    paddingRight: 12,
  },

  sceneTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "NotoSansMedium",
  },

  sceneSubtitle: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: "#8B97A8",
    fontFamily: "NotoSansRegular",
  },

  addSceneButton: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  addSceneText: {
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 22,
    color: "#2F80ED",
    fontFamily: "NotoSansMedium",
  },

  bottomSpacer: {
    height: 30,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  modalCard: {
    width: "100%",
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    padding: 18,
  },

  modalTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: "#374151",
    fontFamily: "CatamaranBold",
    marginBottom: 14,
  },

  modalInput: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D8E0EA",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#4B5563",
    fontFamily: "NotoSansRegular",
    backgroundColor: "#FAFAFB",
    marginBottom: 12,
  },

  modalLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#5B6575",
    fontFamily: "NotoSansMedium",
    marginBottom: 10,
    marginTop: 2,
  },

  modalRoomsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 18,
  },

  modalRoomButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8E0EA",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  modalRoomButtonActive: {
    backgroundColor: "#2F80ED",
    borderColor: "#2F80ED",
  },

  modalRoomButtonText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#667180",
    fontFamily: "NotoSansRegular",
    textAlign: "center",
  },

  modalRoomButtonTextActive: {
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },

  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D8E0EA",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  cancelButtonText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#667180",
    fontFamily: "NotoSansMedium",
  },

  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#FFFFFF",
    fontFamily: "NotoSansMedium",
  },
});