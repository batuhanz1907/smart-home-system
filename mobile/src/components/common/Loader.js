import React from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"

import colors from "../../theme/colors"

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
})