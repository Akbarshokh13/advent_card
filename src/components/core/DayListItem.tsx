import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

const days = [...Array(24)].map((val, index) => index + 1);

type DataListItem = {
  day: number;
}

export default function DataListItem({ day }: DataListItem) {
  return (
    <Link href={`/day${day}`} asChild >
    <Pressable style={styles.box}>
      <Text style={styles.text}>{day}</Text>

      
    </Pressable>
    </Link>
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
