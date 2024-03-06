import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Reanimated, { JumpingTransition } from "react-native-reanimated";
import { useTasks, type Task } from "./TasksContextProvider";

const AnimatedView = Animated.createAnimatedComponent(View);

const RightActions = ({
  dragAnimatedValue,
  task,
}: {
  dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
  task: Task;
}) => {
  const { deleteTask } = useTasks();
  const animatedStyle = {
    transform: [
      {
        translateX: dragAnimatedValue.interpolate({
          inputRange: [-40, 0],
          outputRange: [0, 40],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  return (
    <AnimatedView
      style={[
        {
          backgroundColor: "crimson",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 10,
        },
        animatedStyle,
      ]}
    >
      <MaterialCommunityIcons
        onPress={() => deleteTask(task.id)}
        name="delete"
        size={20}
        color="white"
      />
    </AnimatedView>
  );
};

type TaskListItem = {
  task: Task;
};

const TaskListItem = ({ task }: TaskListItem) => {
  const { changeIsFinished } = useTasks();
  return (
    <Reanimated.View layout={JumpingTransition}>
      <Swipeable
        renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
          <RightActions dragAnimatedValue={dragAnimatedValue} task={task} />
        )}
      >
        <Pressable
          onPress={() => changeIsFinished(task.id)}
          style={styles.taskContainer}
        >
          <MaterialCommunityIcons
            name={
              task.isFinished
                ? "checkbox-marked-circle-outline"
                : "checkbox-blank-circle-outline"
            }
            size={24}
            color={task.isFinished ? "gray" : "dimgray"}
          />
          <Text
            style={[
              styles.taskTitle,
              {
                textDecorationLine: task.isFinished ? "line-through" : "none",
                color: task.isFinished ? "gray" : "gray,",
              },
            ]}
          >
            {task.title}
          </Text>
        </Pressable>
      </Swipeable>
    </Reanimated.View>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
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
    flex: 1,
  },
});
