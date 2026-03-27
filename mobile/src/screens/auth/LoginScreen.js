import React, { useState } from "react"
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
import AsyncStorage from "@react-native-async-storage/async-storage"

import AppText from "../../components/common/AppText"
import AppButton from "../../components/common/AppButton"
import colors from "../../theme/colors"
import { useAuth } from "../../store/auth/AuthContext"

export default function LoginScreen() {
  const navigation = useNavigation()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleLogin = async () => {
    try {
      console.log("EMAIL:", email)
      console.log("PASSWORD:", password)
      const res = await fetch("http://192.168.1.108:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      })
      const data = await res.json()
      console.log("LOGIN STATUS:", res.status)
      console.log("LOGIN DATA:", data)
      if (res.ok) {
        await AsyncStorage.setItem("token", data.token)
        const homeRes = await fetch("http://192.168.1.108:5000/api/homes/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        })
        const homeData = await homeRes.json()
        login(data.token, data.user)
        // if (homeData) {
        //   navigation.navigate("HomeDashboard", {
        //     homeId: homeData._id,
        //   });
        // } else {
        //   navigation.navigate("SetSpaceName");
        // }
      } else {
        alert(data.message || "Login failed")
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err)
    }
  }

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../../assets/images/login-home.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <AppText style={styles.title}>Login</AppText>

          <AppText style={styles.subtitle}>
            Welcome back! Please enter your details.
          </AppText>

          <TextInput
            style={styles.input}
            placeholder="joe.doe@gmail.com"
            placeholderTextColor="#98A2B3"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#98A2B3"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="#98A2B3"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRemember(!remember)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, remember && styles.checkboxActive]} />
            <AppText style={styles.rememberText}>Remember information</AppText>
          </TouchableOpacity>

          <AppButton title="Login" onPress={handleLogin} />

          <TouchableOpacity
            style={styles.forgot}
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <AppText style={styles.forgotText}>Forget password?</AppText>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <AppText style={styles.or}>or</AppText>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("SocialLogin", { provider: "google" })
            }
          >
            <Image
              source={require("../../../assets/icons/google.png")}
              style={styles.icon}
            />
            <View style={styles.socialDivider} />
            <AppText style={styles.socialText}>Login with Google</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("SocialLogin", { provider: "facebook" })
            }
          >
            <Image
              source={require("../../../assets/icons/facebook.png")}
              style={styles.icon}
            />
            <View style={styles.socialDivider} />
            <AppText style={styles.socialText}>Login with Facebook</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("SocialLogin", { provider: "apple" })
            }
          >
            <Image
              source={require("../../../assets/icons/apple.png")}
              style={styles.icon}
            />
            <View style={styles.socialDivider} />
            <AppText style={styles.socialText}>Login with Apple</AppText>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <AppText style={styles.signupText}>First time here?</AppText>

            <TouchableOpacity>
              <AppText style={styles.signupLink}>Sign up for free</AppText>
            </TouchableOpacity>
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

  imageWrapper: {
    alignItems: "center",
    marginTop: 40,
  },

  image: {
    width: 400,
    height: 340,
  },

  card: {
    marginTop: 1,
    marginHorizontal: 2,
    backgroundColor: "white",
    borderRadius: 32,
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontFamily: "CatamaranBold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#667085",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontFamily: "NotoSansRegular",
  },

  passwordWrapper: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  passwordInput: {
    flex: 1,
    fontFamily: "NotoSansRegular",
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 4,
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  rememberText: {
    color: "#667085",
  },

  forgot: {
    alignItems: "center",
    marginTop: 30,
  },

  forgotText: {
    color: colors.primary,
    fontFamily: "NotoSansSemiBold",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E4E7EC",
  },

  or: {
    marginHorizontal: 10,
    color: "#667085",
  },

  socialButton: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },

  icon: {
    width: 20,
    height: 20,
  },

  socialDivider: {
    width: 1,
    height: 22,
    backgroundColor: "#E4E7EC",
    marginLeft: 14,
    marginRight: 14,
  },

  socialText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#344054",
    marginRight: 20,
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  signupText: {
    color: "#667085",
  },

  signupLink: {
    color: colors.primary,
    marginLeft: 4,
    fontFamily: "NotoSansSemiBold",
  },
})