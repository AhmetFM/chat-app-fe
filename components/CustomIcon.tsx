import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export type CustomIconProps = {
  name: typeof Ionicons.defaultProps;
  color: string;
};

const CustomIcon = ({ name, color }: CustomIconProps) => {
  return (
    <View style={{ padding: 4, borderRadius: 6 }}>
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
};

export default CustomIcon;
