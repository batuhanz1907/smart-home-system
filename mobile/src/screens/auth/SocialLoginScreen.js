import React, { useState } from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { useRoute } from "@react-navigation/native"
import { useAuth } from "../../store/auth/AuthContext"
import AppText from "../../components/common/AppText"
import AppButton from "../../components/common/AppButton"

export default function SocialLoginScreen() {
  const route = useRoute()
  const { provider } = route.params
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const getTheme = () => {
    switch (provider) {
      case "google":
        return { 
          bg: "#fff", 
          text: "#202124", 
          accent: "#1a73e8",
          fontFamily: "Roboto"
        }
      case "facebook":
        return { 
          bg: "#fff", 
          text: "#1e2a3e", 
          accent: "#1877F2",
          fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif"
        }
      case "apple":
        return { 
          bg: "#fff", 
          text: "#1c1c1e", 
          accent: "#000",
          fontFamily: Platform.OS === "ios" ? "SF Pro Display" : "sans-serif-light"
        }
      default:
        return { bg: "#fff", text: "#000", accent: "#000", fontFamily: "System" }
    }
  }

  const theme = getTheme()

  const getProviderTitle = () => {
    switch (provider) {
      case "google":
        return "G"
      case "facebook":
        return "f"
      case "apple":
        return "Apple"
      default:
        return provider.charAt(0).toUpperCase()
    }
  }

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("http://192.168.1.108:5000/api/auth/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: email.split("@")[0],
          provider,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        login(data.token, data.user)
      } else {
        alert(data.message)
      }
    } catch (err) {
      console.log(err)
      alert("Connection error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.bg }]}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <AppText style={[
            styles.logoText, 
            { 
              color: theme.accent,
              fontFamily: theme.fontFamily
            }
          ]}>
            {getProviderTitle()}
          </AppText>
        </View>

        <View style={styles.headerContainer}>
          <AppText style={[styles.title, { color: theme.text }]}>
            {provider === "google" ? "Sign in" : 
             provider === "facebook" ? "Log in" : 
             "Sign in"}
          </AppText>
          <AppText style={[styles.subtitle, { color: theme.text + "99" }]}>
            to continue to {provider}
          </AppText>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: "#e8e8e8",
                  color: theme.text,
                  backgroundColor: "#fafafa"
                },
              ]}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: "#e8e8e8",
                  color: theme.text,
                  backgroundColor: "#fafafa"
                },
              ]}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>

          <TouchableOpacity style={styles.forgotButton}>
            <AppText style={[styles.forgotText, { color: theme.accent }]}>
              Forgot password?
            </AppText>
          </TouchableOpacity>

          <AppButton 
            title={loading ? "Signing in..." : "Continue"}
            onPress={handleSubmit}
            disabled={loading}
            style={[
              styles.button,
              { backgroundColor: theme.accent }
            ]}
            textStyle={styles.buttonText}
          />
          
          {loading && (
            <ActivityIndicator 
              style={styles.loader} 
              color={theme.accent} 
              size="small"
            />
          )}
        </View>

        <View style={styles.footerContainer}>
          <AppText style={[styles.footerText, { color: theme.text + "99" }]}>
            Don't have an account?{" "}
            <AppText style={[styles.signupText, { color: theme.accent }]}>
              Sign up
            </AppText>
          </AppText>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 40 : 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "600",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 40,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  loader: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -8 }],
  },
  footerContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
  },
  signupText: {
    fontSize: 14,
    fontWeight: "600",
  },
})