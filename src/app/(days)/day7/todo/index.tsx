import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Button,
  Text,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import NewTaskInput from "@/components/day7/NewTaskInput";
import TaskListItem from "@/components/day7/TaskListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import { useTasks, type Task } from "@/components/day7/TasksContextProvider";

const TodoScrenn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"All" | "Todo" | "Finished">("All");
  const headerHeight = useHeaderHeight();

  const { getFilteredTasks, numberOfCompletedTasks, numberOfTasks } =
    useTasks();

  const filteredTasks = getFilteredTasks(tab, searchQuery);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.page}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Todo",
          headerBackTitleVisible: false,
          headerRight: () => (
            <Text style={{ fontFamily: "InterBold", color: "dimgray" }}>
              {numberOfCompletedTasks} / {numberOfTasks}
            </Text>
          ),
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      <SafeAreaView
        edges={["bottom"]}
        style={{ flex: 1, paddingTop: headerHeight + 35 }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-around",
          }}
        >
          <Button title="All" onPress={() => setTab("All")} />
          <Button title="Todo" onPress={() => setTab("Todo")} />
          <Button title="Completed" onPress={() => setTab("Finished")} />
        </View>
        <FlatList
          contentContainerStyle={{ gap: 5, padding: 10 }}
          // keyExtractor={(item) => item.id}
          data={filteredTasks}
          renderItem={({ item }) => <TaskListItem task={item} />}
          ListFooterComponent={() => <NewTaskInput />}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default TodoScrenn;
