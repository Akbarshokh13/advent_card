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
import { Fontisto } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideOutLeft,
  SlideInRight,
} from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: "snowflake",
    title: "Welcome to #DEVember",
    description:
      "Monitor your spending and contribution, ensuring every penny aligns with your familys aspirations",
  },
  {
    icon: "react",
    title: "Learn and grow together",
    description: "Learn by building 24 projects with React Native and Expo",
  },
  {
    icon: "money-symbol",
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

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  const flingForward = Gesture.Fling();
  flingForward.direction(Directions.LEFT).onEnd(onContinue);

  const flingBackward = Gesture.Fling();
  flingBackward.direction(Directions.RIGHT).onEnd(onBack);

  const swipes = Gesture.Simultaneous(flingBackward, flingForward);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              { backgroundColor: index === screenIndex ? "#CEF202" : "gray" },
            ]}
          ></View>
        ))}
      </View>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <GestureDetector gesture={swipes}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.pageContent}
          key={screenIndex}
        >
          <Fontisto
            name={data.icon}
            size={150}
            style={styles.image}
            color="#CEF202"
          />

          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(50)}
              exiting={SlideOutLeft}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>
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
        </Animated.View>
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
    marginTop: 70,
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
