import React from "react";
import { View } from "react-native";

export default function Snake({ snake }) {
  return (
    <>
      {snake.map((segment, index) => (
        <View
          key={index}
          style={{
            width: 20,
            height: 20,
            borderRadius: 6,
            backgroundColor: "blue",
            position: "absolute",
            top: segment.y * 20,
            left: segment.x * 20,
          }}
        />
      ))}
    </>
  );
}
