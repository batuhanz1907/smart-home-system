import React, { useMemo, useState } from "react"
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../store/auth/AuthContext"

import AppText from "../../components/common/AppText"
import AppButton from "../../components/common/AppButton"
import colors from "../../theme/colors"

export default function ResetPasswordScreen() {
  const navigation = useNavigation()
  const { login } = useAuth()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const hasMinLength = password.length >= 8
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`]/.test(password)
  const hasLowerAndUppercase =
    /[a-z]/.test(password) && /[A-Z]/.test(password)

  const strengthLevel = useMemo(() => {
    let level = 0
    if (hasMinLength) level += 1
    if (hasNumberOrSymbol) level += 1
    if (hasLowerAndUppercase) level += 1
    return level
  }, [hasMinLength, hasNumberOrSymbol, hasLowerAndUppercase])

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Şifreler uyuşmuyor")
      return
    }
    try {
      await fetch("http://192.168.1.108:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "reset@test.com" }),
      })
      login("fake-token", { email: "reset@test.com", name: "Reset User" })
    } catch (err) {
      console.log(err)
    }
  }

  const getRuleColor = (passed) => (passed ? "#22C55E" : "#98A2B3")
  const getRuleIcon = (passed) => (passed ? "✓" : "•")

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../../assets/images/login-home.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <AppText style={styles.title}>Reset password</AppText>

          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="New password"
              placeholderTextColor="#98A2B3"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.8}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="#98A2B3"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.strengthTrack}>
            <View
              style={[
                styles.strengthFill,
                strengthLevel === 0 && styles.strengthFillEmpty,
                strengthLevel === 1 && styles.strengthFillWeak,
                strengthLevel === 2 && styles.strengthFillMedium,
                strengthLevel === 3 && styles.strengthFillStrong,
              ]}
            />
          </View>

          <View style={styles.rulesWrapper}>
            <View style={styles.ruleRow}>
              <AppText
                style={[
                  styles.ruleIcon,
                  { color: getRuleColor(hasMinLength) },
                ]}
              >
                {getRuleIcon(hasMinLength)}
              </AppText>

              <AppText
                style={[
                  styles.ruleText,
                  { color: getRuleColor(hasMinLength) },
                ]}
              >
                Least 8 characters
              </AppText>
            </View>

            <View style={styles.ruleRow}>
              <AppText
                style={[
                  styles.ruleIcon,
                  { color: getRuleColor(hasNumberOrSymbol) },
                ]}
              >
                {getRuleIcon(hasNumberOrSymbol)}
              </AppText>

              <AppText
                style={[
                  styles.ruleText,
                  { color: getRuleColor(hasNumberOrSymbol) },
                ]}
              >
                Least one number (0-9) or symbol
              </AppText>
            </View>

            <View style={styles.ruleRow}>
              <AppText
                style={[
                  styles.ruleIcon,
                  { color: getRuleColor(hasLowerAndUppercase) },
                ]}
              >
                {getRuleIcon(hasLowerAndUppercase)}
              </AppText>

              <AppText
                style={[
                  styles.ruleText,
                  { color: getRuleColor(hasLowerAndUppercase) },
                ]}
              >
                Lowercase (a-z) and uppercase (A-Z)
              </AppText>
            </View>
          </View>

          <View style={styles.confirmWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm new password"
              placeholderTextColor="#98A2B3"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              activeOpacity={0.8}
            >
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={18}
                color="#98A2B3"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonWrapper}>
            <AppButton title="Continue" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },

  scrollContent: {
    alignItems: "center",
    paddingBottom: 24,
  },

  imageWrapper: {
    marginTop: 28,
    marginBottom: 10,
  },

  image: {
    width: 400,
    height: 310,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },

  title: {
    fontSize: 22,
    fontFamily: "CatamaranBold",
    textAlign: "center",
    marginBottom: 20,
    color: "#344054",
  },

  passwordWrapper: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  confirmWrapper: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: "NotoSansRegular",
  },

  strengthTrack: {
    width: "100%",
    height: 3,
    borderRadius: 999,
    backgroundColor: "#DCE3EC",
    overflow: "hidden",
    marginBottom: 14,
  },

  strengthFill: {
    height: "100%",
  },

  strengthFillEmpty: {
    width: "0%",
    backgroundColor: "transparent",
  },

  strengthFillWeak: {
    width: "33%",
    backgroundColor: "#F59E0B",
  },

  strengthFillMedium: {
    width: "66%",
    backgroundColor: "#F59E0B",
  },

  strengthFillStrong: {
    width: "100%",
    backgroundColor: "#22C55E",
  },

  rulesWrapper: {
    marginTop: 2,
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  ruleIcon: {
    width: 16,
    fontSize: 14,
    marginRight: 8,
    textAlign: "center",
  },

  ruleText: {
    fontSize: 14,
    fontFamily: "NotoSansRegular",
  },

  buttonWrapper: {
    marginTop: 30,
  },
})