import React from "react"

import AuthNavigator from "./AuthNavigator"
import AppNavigator from "./AppNavigator"
import { useAuth } from "../store/auth/AuthContext"

export default function RootNavigator() {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />
}