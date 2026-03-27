import React from "react"
import { View, StyleSheet } from "react-native"

import AppText from "./AppText"
import spacing from "../../theme/spacing"

export default function AppHeader({ title }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg
  },
  title: {
    fontSize: 24,
    fontWeight: "600"
  }
})