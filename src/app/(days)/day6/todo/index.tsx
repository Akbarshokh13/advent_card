import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import NewTaskInput from "@/components/day6/NewTaskInput";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskListItem from "@/components/day6/TaskListItem";
import { useHeaderHeight } from "@react-navigation/elements";

export type Task = {
  title: string;
  isFinished: boolean;
};

const dummyTasks: Task[] = [
  {
    title: "Setup day15 structure",
    isFinished: false,
  },
  {
    title: "add new task",
    isFinished: true,
  },
  {
    title: "change the status of task",
    isFinished: false,
  },
  {
    title: "separete in 2 tabs: todo and complete",
    isFinished: false,
  },
  {
    title: "render a list of tasks",
    isFinished: true,
  },
];

const TodoScrenn = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"All" | "Todo" | "Finished">("All");
  const headerHeight = useHeaderHeight();

  const filteredTasks = tasks.filter((task) => {
    if (task.isFinished && tab === "Todo") {
      return false;
    }

    if (!task.isFinished && tab === "Finished") {
      return false;
    }

    if (!searchQuery) {
      return true;
    }

    return task.title
      .toLowerCase()
      .trim()
      .includes(searchQuery.toLowerCase().trim());
  });

  const onItemPressed = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks];
      updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
      return updatedTasks;
    });
  };

  const deleteTask = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

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
          keyExtractor={(item) => item.title}
          data={filteredTasks}
          renderItem={({ item, index }) => (
            <TaskListItem
              task={item}
              onItemPressed={() => onItemPressed(index)}
              onDelete={() => deleteTask(index)}
            />
          )}
          ListFooterComponent={() => (
            <NewTaskInput
              onAdd={(newTodo: Task) =>
                setTasks((currentTasks) => [...currentTasks, newTodo])
              }
            />
          )}
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
