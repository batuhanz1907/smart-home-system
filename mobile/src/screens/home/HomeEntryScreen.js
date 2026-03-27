import React, { useEffect } from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export default function HomeEntryScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    const checkHome = async () => {
      try {
        const token = await AsyncStorage.getItem("token")

        if (!token) {
          navigation.replace("HomeOverview")
          return
        }

        const res = await fetch("http://192.168.1.108:5000/api/homes/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        const homeData = await res.json()

        if (homeData) {
          navigation.replace("HomeDashboard", {
            homeId: homeData._id,
          })
        } else {
          navigation.replace("HomeOverview")
        }
      } catch (err) {
        console.log("HOME ENTRY ERROR:", err)
        navigation.replace("HomeOverview")
      }
    }

    checkHome()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})