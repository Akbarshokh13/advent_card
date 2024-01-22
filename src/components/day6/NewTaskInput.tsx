import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Task } from "@/app/(days)/day6/todo";

type NewTaskInput = {
  onAdd: (newTask: Task) => void;
};

const NewTaskInput = ({ onAdd }: NewTaskInput) => {
  const [newTask, setNewTask] = useState("");

  return (
    <View style={styles.taskContainer}>
      <MaterialCommunityIcons
        name="checkbox-blank-circle-outline"
        size={24}
        color="dimgray"
      />
      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
        placeholder="Todo..."
        onEndEditing={() => {
          if (!newTask) {
            return;
          }
          onAdd({ title: newTask, isFinished: false });
          setNewTask("");
        }}
      />
    </View>
  );
};
export default NewTaskInput;

const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    fontFamily: "InterSemi",
    fontSize: 15,
    color: "dimgray",
    flex: 1,
  },
});
