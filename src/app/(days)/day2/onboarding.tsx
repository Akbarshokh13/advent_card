import { useState } from "react";
import { Link, Stack, router } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureDetector, Gesture, Directions} from "react-native-gesture-handler";

const onboardingSteps = [
  {
    icon: "snowflake-4",
    title: "Welcome to #DEVember",
    description:
      " Monitor your spending and contribution, ensuring every penny aligns with your familys aspirations",
  },
  {
    icon: "cast-for-education",
    title: "Learn and grow together",
    description: "Learn by building 24 projects with React Native and Expo",
  },
  {
    icon: "people-arrows",
    title: "Education for children",
    description:
      "Contribute to the fundraser ''Education for children'' to help Save the Children",
  },
];

const onboarding = () => {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  const fling = Gesture.Fling(); 
  // fling.direction(Directions.RIGHT | Directions.LEFT);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
          <View
            style={[
              styles.stepIndicator,
              { backgroundColor: index === screenIndex ? "#CEF202" : "gray" },
            ]}
          ></View>
        ))}
      </View>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <GestureDetector gesture={fling}>
        <View style={styles.pageContent}>
          <Fontisto
            name="snowflake-4"
            size={100}
            style={styles.image}
            color="#CEF202"
          />

          <View style={styles.footer}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.description}>{data.description}</Text>
            <View style={styles.buttonsRow}>
              <Pressable>
                <Text onPress={endOnboarding} style={styles.buttonText}>
                  Skip
                </Text>
              </Pressable>
              <TouchableOpacity style={styles.button}>
                <Text onPress={onContinue} style={styles.buttonText}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#15141A",
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    gap: 5,
    padding: 60,
  },

  stepIndicator: {
    flex: 1,
    width: 100,
    height: 3,
    backgroundColor: "gray",
    margin: 5,
    borderRadius: 10,
  },

  pageContent: {
    padding: 20,
    flex: 1,
  },

  title: {
    color: "#FDFDFD",
    fontSize: 50,
    fontFamily: "InterBlack",
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: "gray",
    fontSize: 20,
    fontFamily: "Inter",
    lineHeight: 28,
  },
  image: {
    alignSelf: "center",
    margin: 20,
    marginTop: 50,
  },
  footer: {
    marginTop: "auto",
  },
  button: {
    backgroundColor: "#302E38",
    borderRadius: 50,
    flex: 1,
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  buttonText: {
    alignSelf: "center",
    color: "#FDFDFD",
    fontFamily: "InterSemi",
    fontSize: 16,
    padding: 16,
    paddingHorizontal: 25,
  },
});
