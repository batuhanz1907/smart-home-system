import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

import colors from "../../theme/colors"
import radius from "../../theme/radius"
import spacing from "../../theme/spacing"

export default function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontWeight: "600"
  }
})