import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Task } from "@/app/(days)/day6/todo";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Reanimated, { JumpingTransition } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

const RightActions = ({
  dragAnimatedValue,
  onDelete,
}: {
  dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
  onDelete: () => void;
}) => {
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
        onPress={onDelete}
        name="delete"
        size={20}
        color="white"
      />
    </AnimatedView>
  );
};

type TaskListItem = {
  task: Task;
  onItemPressed: () => void;
  onDelete: () => void;
};

const TaskListItem = ({ task, onItemPressed, onDelete }: TaskListItem) => {
  return (
    <Reanimated.View layout={JumpingTransition}>
      <Swipeable
        renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
          <RightActions
            dragAnimatedValue={dragAnimatedValue}
            onDelete={onDelete}
          />
        )}
      >
        <Pressable onPress={onItemPressed} style={styles.taskContainer}>
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
