import React from "react";
import { Text, View, Button } from "react-native";
import { Stack } from "expo-router";
import { Link } from "expo-router";

const DayDetailsScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Day 2: onBoarding" }} />
      <Text>Day details screen</Text>

      <Link href="/day2/onboarding" asChild >
      <Button title="Go to onboarding" />
      </Link>
    </View>
  );
};

export default DayDetailsScreen;
