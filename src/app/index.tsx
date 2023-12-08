import { FlatList, StyleSheet, View} from "react-native";
import DataListItem from "@components/core/DayListItem";
import { StatusBar } from "expo-status-bar";

const days = [...Array(24)].map((val, index) => index + 1);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.column}
        numColumns={2}
        renderItem={({ item }) => <DataListItem day={item} />}
      />
      
      <StatusBar style="auto"/>
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    gap: 10,
  },

  content: {
    gap: 10,
    padding: 10,
  },

  column: {
    gap: 10,
  },
});
