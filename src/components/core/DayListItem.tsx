import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";

const days = [...Array(24)].map((val, index) => index + 1);

type DataListItem = {
  day: number;
}

export default function DataListItem({ day }: DataListItem) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{day}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#F9EDE3",
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#9b4521",
    borderRadius: 20,
  },

  text: {
    color: "#9b4521",
    fontSize: 75,
    fontFamily: 'AmaticBold' 
  },
});
