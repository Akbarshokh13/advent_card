import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewTaskInput from "@/components/day6/NewTaskInput";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [newTask, setNewTask] = useState("");

  const onItemPressed = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks];
      updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
      return updatedTasks;
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.page}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <FlatList
          contentContainerStyle={{ gap: 5, padding: 10 }}
          data={tasks}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => onItemPressed(index)}
              style={styles.taskContainer}
            >
              <MaterialCommunityIcons
                name={
                  item.isFinished
                    ? "checkbox-marked-circle-outline"
                    : "checkbox-blank-circle-outline"
                }
                size={24}
                color="dimgray"
              />
              <Text
                style={[
                  styles.taskTitle,
                  {
                    textDecorationLine: item.isFinished
                      ? "line-through"
                      : "none",
                  },
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
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
  taskContainer: {
    padding: 10,
    // margin: 8,
    // borderWidth: 1,
    // borderRadius: 6,
    paddingHorizontal: 10,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  taskTitle: {
    fontFamily: "InterSemi",
    fontSize: 15,
    color: "dimgray",
    flex: 1,
  },
});

export default TodoScrenn;
