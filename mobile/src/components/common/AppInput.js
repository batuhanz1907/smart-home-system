import { TextInput, View } from "react-native";

export default function AppInput({ placeholder, secureTextEntry = false, value, onChangeText }) {
  return (
    <View
      style={{
        width: "100%",
        height: 54,
        borderWidth: 1,
        borderColor: "#D9E2F2",
        borderRadius: 14,
        justifyContent: "center",
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
      }}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#98A2B3"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={{
          fontSize: 15,
          color: "#111827",
        }}
      />
    </View>
  );
}