import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import dummyTasks from "./dummyTasks";
// import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export type Task = {
  title: string;
  isFinished: boolean;
  id: string;
};

type TasksContext = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  changeIsFinished: (id: string) => void;
  deleteTask: (id: string) => void;
  getFilteredTasks: (tab: string, searchQuery: string) => Task[];
  addTask: (title: string) => Task | undefined;
  numberOfCompletedTasks: number;
  numberOfTasks: number;
};
const TasksContext = createContext<TasksContext>({
  tasks: [],
  setTasks: () => {},
  changeIsFinished: () => {},
  deleteTask: () => {},
  getFilteredTasks: () => [],
  addTask: () => undefined,
  numberOfCompletedTasks: 0,
  numberOfTasks: 0,
});

const TasksContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  const numberOfCompletedTasks = tasks.filter((t) => t.isFinished).length;
  const numberOfTasks = tasks.length;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [tasks]);

  const saveData = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonValue);
    } catch (e) {
      Alert.alert("error saving data");
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("tasks");
      if (jsonValue) {
        const loadedTasks = JSON.parse(jsonValue);
        setTasks(loadedTasks);
      }
    } catch (e) {
      Alert.alert("error reading data");
    } finally {
      setIsLoaded(true);
    }
  };

  const generateRandomId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8; // You can adjust the length of the ID as needed
    let randomId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  };

  const changeIsFinished = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id !== id
          ? task
          : {
              ...task,
              isFinished: !task.isFinished,
            }
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((t) => t.id !== id));
  };

  const getFilteredTasks = (tab: string, searchQuery: string) => {
    return tasks.filter((task) => {
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
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: generateRandomId(),
      title,
      isFinished: false,
    };
    setTasks((currentTasks) => [...currentTasks, newTask]);

    return newTask;
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        changeIsFinished,
        deleteTask,
        getFilteredTasks,
        addTask,
        numberOfCompletedTasks,
        numberOfTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;

export const useTasks = () => useContext(TasksContext);
