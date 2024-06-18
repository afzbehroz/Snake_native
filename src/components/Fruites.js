import { StyleSheet, Text } from "react-native";

function fixedFruite() {
  return "🍒";
}

export default function Fruites({ x, y }) {
  return <Text style={[{ top: y * 20, left: x * 20 }, styles.food]}>{fixedFruite()}</Text>;
}

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 7,
    position: 'absolute',
  },
});
